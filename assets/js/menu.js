function setFadeUpAnimation(targets, baseDelay = 0.45, step = 0.05) {
  targets.forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.animationDelay = (baseDelay + step * i) + 's';
  });
}

function resetFadeUpAnimation(targets) {
  targets.forEach(el => {
    el.classList.remove('fade-up');
    el.style.animationDelay = '';
    el.style.opacity = '';
    el.style.transform = '';
  });
}

function initMenu() {
  const toggleButton = document.getElementById('toggleButton');
  const navArea = document.getElementById('navArea');
  const overlay = document.getElementById('overlay');
  const body = document.body;

  if (!toggleButton || !navArea || !overlay) return;

  const toggleMenu = () => {
    navArea.classList.toggle('open');
    toggleButton.classList.toggle('open');
    body.classList.toggle('no-scroll');

    // ハンバーガーメニューのfade-up-waitアニメーションをリセットして再付与
    const menuLinks = navArea.querySelectorAll('.glass-menu .fade-up-wait');
    resetFadeUpAnimation(menuLinks);
    if (navArea.classList.contains('open')) {
      setFadeUpAnimation(menuLinks);
    }
  };

  toggleButton.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  document.querySelectorAll('.glass-menu a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });
}

function initScrollTopButton() {
  const topButton = document.querySelector(".top-button");
  const profile = document.querySelector("#profile");

  if (!topButton || !profile) return;

  const profileOffsetTop = profile.offsetTop;

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    if (scrollY >= profileOffsetTop - 100) {
      topButton.classList.add("visible");
    } else {
      topButton.classList.remove("visible");
    }
  });
}

/* === 追加: Intersection Observerで.fade-up-waitを監視 & animation-delay自動付与（親トリガー方式） === */
document.addEventListener('DOMContentLoaded', function() {
  // 親要素（.contest-content, .profile-info など）を監視し、子.fade-up-waitに順delay＋fade-upを付与
  document.querySelectorAll('.contest-content, .profile-info, .profile').forEach(parent => {
    const children = parent.querySelectorAll('.fade-up-wait');
    if (!children.length) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setFadeUpAnimation(children);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    observer.observe(parent);
  });
});
/* === ↑ここまで自動追加 === */