document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.index-swiper', {
      loop: true,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      a11y: {
        enabled: true,
        prevSlideMessage: '前のスライド',
        nextSlideMessage: '次のスライド',
        firstSlideMessage: '最初のスライド',
        lastSlideMessage: '最後のスライド',
        paginationBulletMessage: 'スライドに移動',
      },
      keyboard: {
        enabled: true,
      },
      simulateTouch: true,
      speed: 700,
    });
  });
  