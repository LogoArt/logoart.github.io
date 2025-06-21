
window.addEventListener('scroll', function () {
    const logo = document.querySelector('.ku-logo');
    const hereSection = document.querySelector('.here');
    const nav = document.querySelector('.header-nav'); // ← 追加
  
    if (!logo || !hereSection || !nav) return;
  
    if (window.scrollY > hereSection.offsetHeight) {
      logo.classList.add('dark');
      nav.classList.add('dark'); // ← 追加
    } else {
      logo.classList.remove('dark');
      nav.classList.remove('dark'); // ← 追加
    }
  });  