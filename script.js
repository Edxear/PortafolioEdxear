const root = document.documentElement;
const revealNodes = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const themeToggle = document.getElementById("theme-toggle");

// Dark/Light Mode Handler
const initTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);
};

const toggleTheme = () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  
  if (newTheme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", newTheme);
};

initTheme();
if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

const revealNode = (node) => {
  node.classList.add("is-visible");
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealNode(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealNodes.forEach((node, index) => {
  node.style.setProperty("--reveal-index", String(index));
  revealObserver.observe(node);
});

if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target && target.classList.contains("reveal")) {
    revealNode(target);
  }
}

// Fallback: if a section never intersects enough, keep content visible.
window.setTimeout(() => {
  revealNodes.forEach((node) => {
    if (!node.classList.contains("is-visible")) {
      revealNode(node);
    }
  });
}, 1400);

window.addEventListener("pointermove", (event) => {
  const x = `${(event.clientX / window.innerWidth) * 100}%`;
  const y = `${(event.clientY / window.innerHeight) * 100}%`;
  root.style.setProperty("--pointer-x", x);
  root.style.setProperty("--pointer-y", y);
});

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const bounds = card.getBoundingClientRect();
    const offsetX = event.clientX - bounds.left;
    const offsetY = event.clientY - bounds.top;
    const rotateY = ((offsetX / bounds.width) - 0.5) * 10;
    const rotateX = (0.5 - (offsetY / bounds.height)) * 10;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});