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
  let rafId = 0;
  card.addEventListener("mousemove", (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", (e.clientX - rect.left) + "px");
      card.style.setProperty("--mouse-y", (e.clientY - rect.top) + "px");
      rafId = 0;
    });
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
      setTimeout(typeChar, 50);
    } else {
      setTimeout(() => cursor.remove(), 2000);
    }
  }
  setTimeout(typeChar, 400);
}

/* ---- Terminal typing animation ---- */
const terminalBody = document.getElementById("terminal-body");

if (terminalBody) {
  const items = terminalBody.querySelectorAll(".terminal-line, .terminal-output");
  let idx = 0;
  function showNextLine() {
    if (idx < items.length) {
      items[idx].classList.add("typed");
      const el = items[idx];
      /* scroll the terminal body to keep the latest line visible */
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      idx++;
      /* prompt lines appear fast, commands/output slightly slower */
      const delay = el.classList.contains("terminal-output") ? 350 : 180;
      setTimeout(showNextLine, delay);
    }
  }
  /* start after a short delay so the hero loads first */
  setTimeout(showNextLine, 800);
}
