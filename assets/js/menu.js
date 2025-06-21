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