/* ---- Mobile menu ---- */
const navMenu = document.querySelector(".nav-menu");
const hamburger = document.querySelector(".hamburger");

if (navMenu && hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!navMenu.contains(target) && !hamburger.contains(target)) {
      navMenu.classList.remove("open");
    }
  });
}

/* ---- Scroll-reveal ---- */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0 && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

/* ---- Card glow follow cursor ---- */
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
    card.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
  });
});

/* ---- Typing effect for hero h1 ---- */
const heroH1 = document.querySelector(".hero h1[data-typed]");

if (heroH1) {
  const fullText = heroH1.getAttribute("data-typed");
  heroH1.textContent = "";
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  heroH1.appendChild(cursor);

  let i = 0;
  function typeChar() {
    if (i < fullText.length) {
      heroH1.insertBefore(document.createTextNode(fullText[i]), cursor);
      i++;
      setTimeout(typeChar, 32);
    } else {
      setTimeout(() => cursor.remove(), 2000);
    }
  }
  setTimeout(typeChar, 400);
}
