const root = document.documentElement;
const revealNodes = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const menuToggle = document.getElementById("menu-toggle");
const topNav = document.getElementById("topnav");

if (menuToggle && topNav) {
  const closeMobileMenu = () => {
    topNav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const willOpen = !topNav.classList.contains("is-open");
    topNav.classList.toggle("is-open", willOpen);
    menuToggle.classList.toggle("is-open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
  });

  topNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 720) {
        closeMobileMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

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