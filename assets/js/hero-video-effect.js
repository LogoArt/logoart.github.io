window.addEventListener('DOMContentLoaded', function() {
  // index.html用
  let video = document.querySelector('.fixed-bg-video video');
  let glass = document.querySelector('.fixed-bg-video .overlay-glass');
  let hero = document.querySelector('.index-hero');
  let profile = document.querySelector('.index-profile');

  // kusunoki-fes.html用（クラス名や構造に合わせて調整）
  if (!video) video = document.querySelector('.project-section .project-hero-img');
  if (!glass) glass = document.querySelector('.project-section .overlay-glass');
  // hero: kusunoki-fes.htmlでは#heroセクションを優先
  if (!hero) hero = document.querySelector('.project-section#hero') || document.querySelector('.project-section#about');
  if (!profile) profile = document.querySelector('.project-section#content');

  if (!video || !glass || !hero || !profile) return;

  function updateEffect() {
    // kusunoki-fes.html用: heroが#heroなら発火タイミングを調整
    if (hero.id === 'hero') {
      const heroRect = hero.getBoundingClientRect();
      const profileRect = profile.getBoundingClientRect();
      const windowH = window.innerHeight;
      const triggerY = windowH * 0.7;
      const heroBottomY = heroRect.bottom;
      let progress = 0;
      if (heroBottomY < triggerY) {
        const total = profileRect.bottom - triggerY;
        progress = Math.min(1, (triggerY - heroBottomY) / total);
        progress = Math.max(0, progress);
      }
      const blur = 0 + 18 * progress;
      const brightness = 1 - 0.1 * progress;
      glass.style.backdropFilter = `blur(${blur}px) brightness(${brightness})`;
      glass.style.background = `rgba(255,255,255,${0.08 + 0.22 * progress})`;
      video.style.filter = `brightness(${1 - 0.15 * progress})`;
    } else {
      // index.htmlや従来のロジック
      const heroRect = hero.getBoundingClientRect();
      const profileRect = profile.getBoundingClientRect();
      const total = profileRect.bottom - heroRect.top;
      const scrolled = Math.max(0, window.scrollY - hero.offsetTop);
      const progress = Math.min(1, scrolled / total);
      const blur = 0 + 18 * progress;
      const brightness = 1 - 0.1 * progress;
      glass.style.backdropFilter = `blur(${blur}px) brightness(${brightness})`;
      glass.style.background = `rgba(255,255,255,${0.08 + 0.22 * progress})`;
      if (video.tagName === 'VIDEO') {
        video.style.filter = `brightness(${1 - 0.15 * progress})`;
      } else {
        video.style.filter = `brightness(${1 - 0.15 * progress})`;
      }
    }
  }

  function toggleVideoFixed() {
    if (glass) {
      glass.style.opacity = '1';
      glass.style.pointerEvents = 'auto';
    }
  }

  window.addEventListener('scroll', updateEffect);
  window.addEventListener('resize', updateEffect);
  updateEffect();

  window.addEventListener('scroll', toggleVideoFixed);
  window.addEventListener('resize', toggleVideoFixed);
  toggleVideoFixed();
});