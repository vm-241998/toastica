
// Smooth Autoplay Carousel for Zayana Hero
(() => {
    const track = document.getElementById("zayanaTrack");
    const thumbsContainer = document.getElementById("zayanaThumbs");

    if (!track) return;

    const slides = [...track.querySelectorAll(".slide")];
    const thumbs = thumbsContainer
        ? [...thumbsContainer.querySelectorAll(".thumb")]
        : [];

    const totalSlides = slides.length;

    if (!totalSlides) return;

    let currentIndex = 0;
    let autoplayTimer = null;

    const updateCarousel = () => {
        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        thumbs.forEach((thumb, index) => {
            const active = index === currentIndex;

            thumb.classList.toggle("active", active);
            thumb.setAttribute("aria-pressed", active);
        });
    };

    const goToSlide = (index) => {
        currentIndex = (index + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoplay();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    };

    const stopAutoplay = () => {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
    };

    const startAutoplay = () => {
        stopAutoplay();

        autoplayTimer = setInterval(nextSlide, 3500);
    };

    const resetAutoplay = () => {
        startAutoplay();
    };

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            goToSlide(index);
        });
    });

    const carousel = track.closest(".carousel");

    if (carousel) {
        carousel.addEventListener("mouseenter", stopAutoplay);
        carousel.addEventListener("mouseleave", startAutoplay);
    }

    updateCarousel();
    startAutoplay();
})();

(() => {
    document.querySelectorAll(".product-gallery-section").forEach(gallery => {
        const thumbsContainer = gallery.querySelector(".gallery-thumbs");
        const mainImage = gallery.querySelector(".gallery-main img");

        if (!thumbsContainer || !mainImage) return;

        const thumbs = [...thumbsContainer.querySelectorAll(".gallery-thumb")];
        if (!thumbs.length || thumbs[0].hasAttribute("data-gallery-image")) return;

        const image = mainImage.getAttribute("src");
        if (!image) return;

        const alt = mainImage.getAttribute("alt") || "";
        const thumbConfigs = [
            { label: `Show full ${alt} image`, scale: "1", origin: "center center", alt: `Full ${alt} view` },
            { label: `Show center view of ${alt} image`, scale: "1", origin: "center 42%", alt: `${alt} center view` },
            { label: `Show lower view of ${alt} image`, scale: "1", origin: "center 82%", alt: `${alt} lower view` }
        ];

        gallery.style.backgroundColor = "transparent";
        const main = mainImage.closest(".gallery-main");
        main.style.backgroundColor = "transparent";
        mainImage.style.backgroundColor = "transparent";
        mainImage.style.transition = "transform 0.3s ease";

        let mainLink = mainImage.closest("a");
        if (!mainLink) {
            mainLink = document.createElement("a");
            mainLink.className = "d-block";
            mainImage.parentNode.insertBefore(mainLink, mainImage);
            mainLink.appendChild(mainImage);
        }
        mainLink.target = "_blank";
        mainLink.rel = "noopener noreferrer";

        const configureThumb = (thumb, config) => {
            const thumbImage = thumb.querySelector("img");
            thumb.style.backgroundColor = "transparent";
            thumb.dataset.galleryImage = image;
            thumb.dataset.galleryAlt = config.alt;
            thumb.dataset.galleryScale = config.scale;
            thumb.dataset.galleryOrigin = config.origin;
            thumb.setAttribute("aria-label", config.label);
            thumb.setAttribute("aria-pressed", "false");
            thumbImage.alt = config.alt;
            thumbImage.style.transform = `scale(${config.scale})`;
            thumbImage.style.transformOrigin = config.origin;
        };

        configureThumb(thumbs[0], thumbConfigs[0]);
        thumbs[0].classList.add("active");

        thumbConfigs.slice(1).forEach(config => {
            const thumb = thumbs[0].cloneNode(true);
            thumb.classList.remove("active");
            configureThumb(thumb, config);
            thumbsContainer.appendChild(thumb);
        });

        mainLink.href = image;
        mainLink.setAttribute("aria-label", `Open ${alt} image in full size`);

        thumbsContainer.querySelectorAll(".gallery-thumb[data-gallery-image]").forEach(thumb => {
            thumb.addEventListener("click", () => {
                mainLink.href = thumb.dataset.galleryImage;
                mainImage.src = thumb.dataset.galleryImage;
                mainImage.alt = thumb.dataset.galleryAlt;
                mainImage.style.transform = `scale(${thumb.dataset.galleryScale})`;
                mainImage.style.transformOrigin = thumb.dataset.galleryOrigin;
                mainLink.setAttribute("aria-label", `Open ${mainImage.alt} image in full size`);

                thumbsContainer.querySelectorAll(".gallery-thumb").forEach(item => {
                    item.classList.remove("active");
                    item.setAttribute("aria-pressed", "false");
                });
                thumb.classList.add("active");
                thumb.setAttribute("aria-pressed", "true");
            });
        });

        thumbs[0].setAttribute("aria-pressed", "true");
    });
})();
