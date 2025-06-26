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

function initFadeUpObserver() {
  document.querySelectorAll('.contest-content, .profile-info, .profile, .menu-list, .note').forEach(parent => {
    const children = parent.querySelectorAll('.fade-up-wait');
    if (!children.length) return;
    let threshold = parent.classList.contains('menu-list') || parent.classList.contains('note') ? 0.2 : 0.5;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
          setFadeUpAnimation(children);
          // profile-image拡大アニメーション
          const image = parent.querySelector('.profile-image');
          if (image && !image.classList.contains('profile-image-zoom')) {
            image.classList.add('profile-image-zoom');
          }
          // profile-rightフェードインアニメーション
          const right = parent.querySelector('.profile-right');
          if (right && !right.classList.contains('profile-right-fade')) {
            right.classList.add('profile-right-fade');
          }
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: [threshold] });
    observer.observe(parent);
  });
}