const root = document.documentElement;
const revealNodes = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const menuToggle = document.getElementById("menu-toggle");
const topNav = document.getElementById("topnav");
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = themeToggle?.querySelector(".theme-toggle-text");
const particlesRoot = document.getElementById("particles-js");
const languageSwitch = document.getElementById("lang-switch");
const languageButtons = document.querySelectorAll("[data-lang-btn]");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const educationClusters = document.querySelectorAll(".education-cluster");
const educationToggleAllButton = document.getElementById("education-toggle-all");

const THEME_KEY = "portfolio-theme";
const LANG_KEY = "portfolio-language";
const SUPPORTED_LANGUAGES = ["es", "en", "pt"];

let currentLanguage = "es";
let areAllClustersOpen = false;

const translations = {
  es: {
    nav_profile: "Perfil",
    nav_about: "Sobre mi",
    nav_projects: "Proyectos",
    nav_education: "Formacion",
    hero_eyebrow: "Desarrollador Full Stack",
    hero_cta_about: "Sobre mi",
    hero_cta_education: "Ver formacion",
    education_eyebrow: "Formacion y certificados",
    education_title: "Ruta de aprendizaje construida en web, frontend y backend",
    education_chip_fullstack: "Full Stack",
    education_chip_backend: "Backend",
    education_chip_python: "Python",
    education_chip_qa: "QA",
    education_chip_total: "11 certificaciones finalizadas",
    education_toggle_all_show: "Ver todo",
    education_toggle_all_hide: "Ocultar todo",
    cluster_fullstack_title: "Ruta Full Stack",
    cluster_fullstack_count: "3 certificados",
    cluster_python_title: "Especializacion y desafios",
    cluster_python_count: "4 certificados",
    cluster_backend_title: "Ruta Backend",
    cluster_backend_count: "3 certificados",
    cluster_qa_title: "Testing QA",
    cluster_qa_count: "1 certificado",
    cert_react_meta: "16 horas · 8 semanas · Finalizado 08/10/2025",
    cert_js_meta: "20 horas · 10 semanas · Finalizado 05/08/2025",
    cert_web_meta: "38 horas · 10 semanas · Finalizado 14/05/2025",
    cert_py_ai_title: "Python: desarrollo inteligente con IA",
    cert_py_ai_meta: "8 horas · 2 modulos · Finalizado 17/11/2025",
    cert_py_data_title: "Aprende analisis de datos",
    cert_py_data_meta: "Certificacion complementaria · Python",
    cert_py_challenge_title: "Desafio de programacion Python",
    cert_py_challenge_meta: "Certificacion complementaria · Python",
    cert_py_level2_title: "Domina Python Nivel 2",
    cert_py_level2_meta: "Certificacion complementaria · Python avanzado",
    cert_backend3_title: "Backend III: Testing y Escalabilidad Flex",
    cert_backend3_meta: "8 horas · 8 semanas · Finalizado 02/06/2026",
    cert_backend2_meta: "16 horas · 8 semanas · Finalizado 10/03/2026",
    cert_backend1_title: "Programacion Backend I",
    cert_backend1_meta: "18 horas · 9 semanas · Finalizado 05/01/2026",
    cert_qa_title: "Proyeccion Profesional en Testing QA",
    cert_qa_meta: "Workshop certificado · Completado 08/04/2026",
    cta_email: "Escribirme por email",
    cta_whatsapp: "Hablar por WhatsApp",
    cta_linkedin: "Ver LinkedIn",
    cta_github: "Ver GitHub",
    menu_toggle: "Abrir menu",
    theme_toggle: "Cambiar tema",
    theme_mode_dark: "Modo oscuro",
    theme_mode_light: "Modo claro",
    lang_switch_label: "Cambiar idioma",
  },
  en: {
    nav_profile: "Profile",
    nav_about: "About",
    nav_projects: "Projects",
    nav_education: "Education",
    hero_eyebrow: "Full Stack Developer",
    hero_cta_about: "About me",
    hero_cta_education: "View education",
    education_eyebrow: "Education and certificates",
    education_title: "Learning path built across web, frontend and backend",
    education_chip_fullstack: "Full Stack",
    education_chip_backend: "Backend",
    education_chip_python: "Python",
    education_chip_qa: "QA",
    education_chip_total: "11 completed certificates",
    education_toggle_all_show: "Show all",
    education_toggle_all_hide: "Hide all",
    cluster_fullstack_title: "Full Stack Track",
    cluster_fullstack_count: "3 certificates",
    cluster_python_title: "Specialization and challenges",
    cluster_python_count: "4 certificates",
    cluster_backend_title: "Backend Track",
    cluster_backend_count: "3 certificates",
    cluster_qa_title: "QA Testing",
    cluster_qa_count: "1 certificate",
    cert_react_meta: "16 hours · 8 weeks · Completed 10/08/2025",
    cert_js_meta: "20 hours · 10 weeks · Completed 08/05/2025",
    cert_web_meta: "38 hours · 10 weeks · Completed 05/14/2025",
    cert_py_ai_title: "Python: smart development with AI",
    cert_py_ai_meta: "8 hours · 2 modules · Completed 11/17/2025",
    cert_py_data_title: "Learn data analysis",
    cert_py_data_meta: "Complementary certificate · Python",
    cert_py_challenge_title: "Python programming challenge",
    cert_py_challenge_meta: "Complementary certificate · Python",
    cert_py_level2_title: "Master Python Level 2",
    cert_py_level2_meta: "Complementary certificate · Advanced Python",
    cert_backend3_title: "Backend III: Testing and Flex Scalability",
    cert_backend3_meta: "8 hours · 8 weeks · Completed 06/02/2026",
    cert_backend2_meta: "16 hours · 8 weeks · Completed 03/10/2026",
    cert_backend1_title: "Backend Programming I",
    cert_backend1_meta: "18 hours · 9 weeks · Completed 01/05/2026",
    cert_qa_title: "Professional Projection in QA Testing",
    cert_qa_meta: "Certified workshop · Completed 04/08/2026",
    cta_email: "Email me",
    cta_whatsapp: "Chat on WhatsApp",
    cta_linkedin: "View LinkedIn",
    cta_github: "View GitHub",
    menu_toggle: "Open menu",
    theme_toggle: "Toggle theme",
    theme_mode_dark: "Dark mode",
    theme_mode_light: "Light mode",
    lang_switch_label: "Change language",
  },
  pt: {
    nav_profile: "Perfil",
    nav_about: "Sobre mim",
    nav_projects: "Projetos",
    nav_education: "Formacao",
    hero_eyebrow: "Desenvolvedor Full Stack",
    hero_cta_about: "Sobre mim",
    hero_cta_education: "Ver formacao",
    education_eyebrow: "Formacao e certificados",
    education_title: "Trilha de aprendizado em web, frontend e backend",
    education_chip_fullstack: "Full Stack",
    education_chip_backend: "Backend",
    education_chip_python: "Python",
    education_chip_qa: "QA",
    education_chip_total: "11 certificados concluidos",
    education_toggle_all_show: "Ver tudo",
    education_toggle_all_hide: "Ocultar tudo",
    cluster_fullstack_title: "Trilha Full Stack",
    cluster_fullstack_count: "3 certificados",
    cluster_python_title: "Especializacao e desafios",
    cluster_python_count: "4 certificados",
    cluster_backend_title: "Trilha Backend",
    cluster_backend_count: "3 certificados",
    cluster_qa_title: "Testing QA",
    cluster_qa_count: "1 certificado",
    cert_react_meta: "16 horas · 8 semanas · Concluido em 08/10/2025",
    cert_js_meta: "20 horas · 10 semanas · Concluido em 05/08/2025",
    cert_web_meta: "38 horas · 10 semanas · Concluido em 14/05/2025",
    cert_py_ai_title: "Python: desenvolvimento inteligente com IA",
    cert_py_ai_meta: "8 horas · 2 modulos · Concluido em 17/11/2025",
    cert_py_data_title: "Aprenda analise de dados",
    cert_py_data_meta: "Certificacao complementar · Python",
    cert_py_challenge_title: "Desafio de programacao Python",
    cert_py_challenge_meta: "Certificacao complementar · Python",
    cert_py_level2_title: "Domine Python Nivel 2",
    cert_py_level2_meta: "Certificacao complementar · Python avancado",
    cert_backend3_title: "Backend III: Testing e Escalabilidade Flex",
    cert_backend3_meta: "8 horas · 8 semanas · Concluido em 02/06/2026",
    cert_backend2_meta: "16 horas · 8 semanas · Concluido em 10/03/2026",
    cert_backend1_title: "Programacao Backend I",
    cert_backend1_meta: "18 horas · 9 semanas · Concluido em 05/01/2026",
    cert_qa_title: "Projecao Profissional em Testing QA",
    cert_qa_meta: "Workshop certificado · Concluido em 08/04/2026",
    cta_email: "Escrever por email",
    cta_whatsapp: "Falar por WhatsApp",
    cta_linkedin: "Ver LinkedIn",
    cta_github: "Ver GitHub",
    menu_toggle: "Abrir menu",
    theme_toggle: "Alternar tema",
    theme_mode_dark: "Modo escuro",
    theme_mode_light: "Modo claro",
    lang_switch_label: "Mudar idioma",
  },
};

const resolveLanguage = (lang) => {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    return lang;
  }
  return "es";
};

const detectLanguage = () => {
  const browserLanguage = (navigator.languages && navigator.languages[0]) || navigator.language || "es";
  const normalized = browserLanguage.toLowerCase();

  if (normalized.startsWith("pt")) {
    return "pt";
  }
  if (normalized.startsWith("en")) {
    return "en";
  }
  return "es";
};

const getText = (key) => {
  const dictionary = translations[currentLanguage] || translations.es;
  return dictionary[key] || translations.es[key] || "";
};

const updateLanguageButtons = () => {
  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.langBtn === currentLanguage);
  });
};

const updateThemeToggleLabel = () => {
  const isDark = (document.body.getAttribute("data-theme") || "light") === "dark";
  if (themeLabel) {
    themeLabel.textContent = isDark ? getText("theme_mode_light") : getText("theme_mode_dark");
  }
  if (themeToggle) {
    themeToggle.setAttribute("aria-label", getText("theme_toggle"));
  }
  if (menuToggle) {
    menuToggle.setAttribute("aria-label", getText("menu_toggle"));
  }
  if (languageSwitch) {
    languageSwitch.setAttribute("aria-label", getText("lang_switch_label"));
  }
};

const updateEducationToggleAllLabel = () => {
  if (!educationToggleAllButton) {
    return;
  }
  educationToggleAllButton.textContent = areAllClustersOpen ? getText("education_toggle_all_hide") : getText("education_toggle_all_show");
};

const applyLanguage = (language, shouldPersist = true) => {
  currentLanguage = resolveLanguage(language);
  document.documentElement.setAttribute("lang", currentLanguage);

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    const value = getText(key);
    if (value) {
      node.textContent = value;
    }
  });

  updateLanguageButtons();
  updateThemeToggleLabel();
  updateEducationToggleAllLabel();

  if (shouldPersist) {
    localStorage.setItem(LANG_KEY, currentLanguage);
  }
};

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
    updateThemeToggleLabel();
  }
};

const storedTheme = localStorage.getItem(THEME_KEY);
applyTheme(storedTheme || getSystemTheme());

const storedLanguage = localStorage.getItem(LANG_KEY);
applyLanguage(storedLanguage || detectLanguage(), true);

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

if (languageButtons.length > 0) {
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const lang = button.dataset.langBtn;
      applyLanguage(lang, true);
    });
  });
}

if (educationClusters.length > 0) {
  educationClusters.forEach((cluster, index) => {
    cluster.open = index === 0;
  });
  areAllClustersOpen = false;
  updateEducationToggleAllLabel();

  educationClusters.forEach((cluster) => {
    cluster.addEventListener("toggle", () => {
      if (areAllClustersOpen) {
        const openedCount = Array.from(educationClusters).filter((item) => item.open).length;
        if (openedCount !== educationClusters.length) {
          areAllClustersOpen = false;
        }
        updateEducationToggleAllLabel();
        return;
      }

      if (cluster.open) {
        educationClusters.forEach((otherCluster) => {
          if (otherCluster !== cluster) {
            otherCluster.open = false;
          }
        });
      } else {
        const hasAnyOpen = Array.from(educationClusters).some((item) => item.open);
        if (!hasAnyOpen) {
          cluster.open = true;
        }
      }

      updateEducationToggleAllLabel();
    });
  });

  if (educationToggleAllButton) {
    educationToggleAllButton.addEventListener("click", () => {
      if (!areAllClustersOpen) {
        educationClusters.forEach((cluster) => {
          cluster.open = true;
        });
        areAllClustersOpen = true;
      } else {
        educationClusters.forEach((cluster, index) => {
          cluster.open = index === 0;
        });
        areAllClustersOpen = false;
      }
      updateEducationToggleAllLabel();
    });
  }
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