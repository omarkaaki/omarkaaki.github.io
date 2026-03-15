const navMenu = document.querySelector(".nav-menu");
const hamburger = document.querySelector(".hamburger");

if (navMenu && hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    if (!navMenu.contains(target) && !hamburger.contains(target)) {
      navMenu.classList.remove("open");
    }
  });
}
