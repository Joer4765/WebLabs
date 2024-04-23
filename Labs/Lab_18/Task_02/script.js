let swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    keyboard: {
        enabled: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 2500,
        pauseOnMouseEnter: true,
    },
});

document.getElementById('swiper-config-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const transitionDuration = document.getElementById('transition-duration').value;
    const autoplay = document.getElementById('autoplay').checked;
    const showArrows = document.getElementById('show-arrows').checked;
    const showPagination = document.getElementById('show-pagination').checked;

    // Update Swiper configuration
    swiper.params.speed = parseInt(transitionDuration, 10);
    swiper.params.autoplay.enabled = autoplay;
    swiper.params.navigation.enabled = showArrows;
    swiper.params.pagination.enabled = showPagination;

    // Update Swiper components visibility
    document.querySelector('.swiper-button-next').style.display = showArrows ? 'block' : 'none';
    document.querySelector('.swiper-button-prev').style.display = showArrows ? 'block' : 'none';
    document.querySelector('.swiper-pagination').style.display = showPagination ? 'block' : 'none';

    // Restart Swiper to apply changes
    swiper.update();
    if (autoplay) {
        swiper.autoplay.start();
    } else {
        swiper.autoplay.stop();
    }
});