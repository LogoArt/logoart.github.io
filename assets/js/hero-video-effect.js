// スクロール量に応じてガラス効果と明るさを調整（フェードアウトは廃止）
window.addEventListener('DOMContentLoaded', function() {
  // 新しい固定背景動画とエフェクト用要素を取得
  const video = document.querySelector('.fixed-bg-video video');
  const glass = document.querySelector('.fixed-bg-video .overlay-glass');
  const hero = document.querySelector('.index-hero');
  const profile = document.querySelector('.index-profile');

  if (!video || !glass || !hero || !profile) return;

  function updateEffect() {
    const heroRect = hero.getBoundingClientRect();
    const profileRect = profile.getBoundingClientRect();
    const windowH = window.innerHeight;
    // heroの下端からprofileの下端までの距離
    const total = profileRect.bottom - heroRect.top;
    // 現在のスクロール量
    const scrolled = Math.max(0, window.scrollY - hero.offsetTop);
    // 0〜1で進捗
    const progress = Math.min(1, scrolled / total);
    // blur: 0〜18px, brightness: 1〜0.7
    const blur = 0 + 18 * progress;
    const brightness = 1 - 0.5 * progress;
    glass.style.backdropFilter = `blur(${blur}px) brightness(${brightness})`;
    glass.style.background = `rgba(255,255,255,${0.08 + 0.22 * progress})`;
    video.style.filter = `brightness(${1 - 0.15 * progress})`;
  }

  function toggleVideoFixed() {
    const profileRect = profile.getBoundingClientRect();
    const videoBox = document.querySelector('.fixed-bg-video');
    if (!videoBox) return;
    // フェードアウトは行わず、常に表示・pointerEventsも固定
    videoBox.style.opacity = '1';
    videoBox.style.pointerEvents = 'auto';
  }

  window.addEventListener('scroll', updateEffect);
  window.addEventListener('resize', updateEffect);
  updateEffect();

  window.addEventListener('scroll', toggleVideoFixed);
  window.addEventListener('resize', toggleVideoFixed);
  toggleVideoFixed();
});

