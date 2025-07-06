document.addEventListener('DOMContentLoaded', () => {
  const swiperNameEl = document.querySelector(".swiper-name");

  const workTitles = [
    "GRAPHIC",
    "LOGO DESIGN",
    "POSTER DESIGN",
    "TYPOGRAPHY",
    "FONT",
    "PROJECT",
  ];

  // アニメーション付きで作品名更新
  function updateSwiperName(index) {
    swiperNameEl.classList.remove("fade-up"); // 一旦非表示

    // ちょっと遅らせて再表示
    setTimeout(() => {
      const realIndex = index % workTitles.length;
      swiperNameEl.textContent = workTitles[realIndex];
      swiperNameEl.classList.add("fade-up");
    }, 50); // ← 少し待ってからfade-upを付け直すことで再アニメーション
  }

  const swiper = new Swiper(".mySwiper", {
    loop: true,
    speed: 600,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    on: {
      init: function () {
        updateSwiperName(this.realIndex);
      },
      slideChange: function () {
        updateSwiperName(this.realIndex);
      }
    }
  });
});
