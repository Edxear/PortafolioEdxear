const root = document.documentElement;
const revealNodes = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const menuToggle = document.getElementById("menu-toggle");
const topNav = document.getElementById("topnav");
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = themeToggle?.querySelector(".theme-toggle-text");
const particlesRoot = document.getElementById("particles-js");

const THEME_KEY = "portfolio-theme";

const initParticles = (theme) => {
  if (!particlesRoot || typeof window.particlesJS !== "function") {
    return;
  }

  const isDark = theme === "dark";
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const particleColor = isDark ? "#ff9447" : "#d94e1a";
  const lineColor = isDark ? "#ff7a2f" : "#e96f25";

  particlesRoot.innerHTML = "";
  window.particlesJS("particles-js", {
    particles: {
      number: {
        value: isTouch ? 62 : 92,
        density: {
          enable: true,
          value_area: isTouch ? 1080 : 920,
        },
      },
      color: {
        value: particleColor,
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: isDark ? 0.34 : 0.3,
        random: true,
      },
      size: {
        value: isTouch ? 2.1 : 2.4,
        random: true,
      },
      line_linked: {
        enable: true,
        distance: isTouch ? 118 : 144,
        color: lineColor,
        opacity: isDark ? 0.32 : 0.24,
        width: 1,
      },
      move: {
        enable: true,
        speed: isTouch ? 1.5 : 1.9,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: {
          enable: !isTouch,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 168,
          line_linked: {
            opacity: isDark ? 0.42 : 0.32,
          },
        },
        push: {
          particles_nb: isTouch ? 2 : 3,
        },
      },
    },
    retina_detect: true,
  });
};

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  document.body.setAttribute("data-theme", resolvedTheme);
  initParticles(resolvedTheme);

  if (themeToggle) {
    const isDark = resolvedTheme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    if (themeLabel) {
      themeLabel.textContent = isDark ? "Modo claro" : "Modo oscuro";
    }
  }
};

const storedTheme = localStorage.getItem(THEME_KEY);
applyTheme(storedTheme || getSystemTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystemThemeChange = (event) => {
    const saved = localStorage.getItem(THEME_KEY);
    if (!saved) {
      applyTheme(event.matches ? "dark" : "light");
    }
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", onSystemThemeChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(onSystemThemeChange);
  }
}

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

const revealVariants = ["reveal-up", "reveal-left", "reveal-right", "reveal-zoom"];

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
    threshold: 0.06,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealNodes.forEach((node, index) => {
  node.style.setProperty("--reveal-index", String(index));
  node.classList.add(revealVariants[index % revealVariants.length]);
  revealObserver.observe(node);
});

if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target && target.classList.contains("reveal")) {
    revealNode(target);
  }
}

window.setTimeout(() => {
  revealNodes.forEach((node) => {
    if (!node.classList.contains("is-visible")) {
      revealNode(node);
    }
  });
}, 1600);

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