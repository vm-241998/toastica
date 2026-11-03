
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
