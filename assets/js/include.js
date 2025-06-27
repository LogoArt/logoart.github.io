document.addEventListener("DOMContentLoaded", () => {
  const includeElement = (selector, url, callback) => {
    const element = document.querySelector(selector);
    if (element) {
      fetch(url)
        .then(res => res.text())
        .then(data => {
          element.innerHTML = data;
          if (typeof callback === "function") callback();
        });
    }
  };

  // header 読み込み → menuやtop-buttonの動作を有効化
  includeElement("#header", "header.html", () => {
    initMenu();               // ハンバーガーメニュー動作
    initScrollTopButton();    // スクロールに応じてtop-button表示
    window.addEventListener('resize', initScrollTopButton); // ウィンドウサイズ変更時にも再初期化
  });

  // footer 読み込み（初期化不要ならそのままでOK）
  includeElement("#footer", "footer.html", () => {
    if (typeof initFadeUpObserver === "function") initFadeUpObserver();
  });
});

//About Profile boderline
document.addEventListener('DOMContentLoaded', function() {
  const targets = document.querySelectorAll('.profile-info');
  const options = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('inview-border');
      }
    });
  }, options);
  targets.forEach(target => observer.observe(target));
});
