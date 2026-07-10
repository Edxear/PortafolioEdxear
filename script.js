const root = document.documentElement;
const revealNodes = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const menuToggle = document.getElementById("menu-toggle");
const topNav = document.getElementById("topnav");
const styleToggle = document.getElementById("style-toggle");
const styleToggleLabel = styleToggle?.querySelector(".theme-toggle-text");
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = themeToggle?.querySelector(".theme-toggle-text");
const particlesRoot = document.getElementById("particles-js");
const languageSwitch = document.getElementById("lang-switch");
const languageButtons = document.querySelectorAll("[data-lang-btn]");
const i18nNodes = document.querySelectorAll("[data-i18n]");
const educationClusters = document.querySelectorAll(".education-cluster");
const educationToggleAllButton = document.getElementById("education-toggle-all");

const THEME_KEY = "portfolio-theme";
const STYLE_KEY = "portfolio-style";
const LANG_KEY = "portfolio-language";
const SUPPORTED_LANGUAGES = ["es", "en", "pt"];

let currentLanguage = "es";
let currentStyle = "default";
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
    style_toggle: "Cambiar estilo visual",
    style_mode_argentina: "Modo Argentina",
    style_mode_classic: "Modo Clasico",
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
    style_toggle: "Switch visual style",
    style_mode_argentina: "Argentina mode",
    style_mode_classic: "Classic mode",
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
    style_toggle: "Alternar estilo visual",
    style_mode_argentina: "Modo Argentina",
    style_mode_classic: "Modo Classico",
    lang_switch_label: "Mudar idioma",
  },
};

const applyVisualStyle = (style, shouldPersist = true) => {
  currentStyle = style === "argentina" ? "argentina" : "default";

  if (currentStyle === "argentina") {
    document.body.setAttribute("data-style", "argentina");
  } else {
    document.body.removeAttribute("data-style");
  }

  initParticles(document.body.getAttribute("data-theme") || "light");

  if (styleToggle) {
    const isArgentina = currentStyle === "argentina";
    styleToggle.setAttribute("aria-pressed", String(isArgentina));
    styleToggle.setAttribute("aria-label", getText("style_toggle"));
    if (styleToggleLabel) {
      styleToggleLabel.textContent = isArgentina ? getText("style_mode_classic") : getText("style_mode_argentina");
    }
  }

  if (shouldPersist) {
    localStorage.setItem(STYLE_KEY, currentStyle);
  }
};

const extendedTranslations = {
  es: {
    title: "Exequiel Dearmas | Portfolio",
    text: {
      "#hero .hero-text": "Perfil orientado a equipos de desarrollo, primeras oportunidades IT y colaboraciones que necesiten una base tecnica seria en frontend, React, backend y aprendizaje continuo aplicado a productos web reales.",
      "#hero .hero-metrics div:nth-child(1) dt": "Base",
      "#hero .hero-metrics div:nth-child(1) dd": "Coderhouse",
      "#hero .hero-metrics div:nth-child(2) dt": "Ubicacion",
      "#hero .hero-metrics div:nth-child(2) dd": "Gualeguaychu, AR",
      "#hero .hero-metrics div:nth-child(3) dt": "Enfoque",
      "#hero .hero-metrics div:nth-child(3) dd": "Web + Backend",
      "#hero .hero-metrics div:nth-child(3) small": "Interfaces claras y logica solida",
      ".floating-card-main .card-label": "Perfil",
      ".floating-card-main h2": "Full stack para equipos y clientes",
      ".floating-card-main p": "Exequiel Dearmas es mi identidad real y profesional para presentar una evolucion tecnica enfocada en productos web reales y bien resueltos.",
      ".floating-card-side .card-label": "Contacto",
      "#profile .section-heading .eyebrow": "Perfil",
      "#profile .section-heading h2": "Una base tecnica en crecimiento, con foco claro en desarrollo",
      "#profile .section-heading > p:last-child": "Mi objetivo es construir y evolucionar mi perfil alrededor del desarrollo web, con foco en participar en proyectos reales y aportar con una mirada profesional amplia.",
      "#profile .profile-card:nth-child(1) .prompt-title": "Datos clave",
      "#profile .profile-card:nth-child(2) .prompt-title": "Enlaces",
      "#profile .profile-link-download": "Descargar CV",
      "#profile .profile-card-wide .prompt-title": "Stack en formacion",
      "#about .section-heading .eyebrow": "Sobre mi",
      "#about .section-heading h2": "Desarrollo full stack con enfoque tecnico y mirada profesional amplia",
      "#about .section-heading > p:last-child": "Estoy construyendo mi camino como desarrollador full stack, combinando una base practica en desarrollo web, JavaScript, React y backend con una mentalidad de aprendizaje continuo. Me interesa crear productos funcionales, claros y bien estructurados, cuidando tanto la experiencia de usuario como la logica que sostiene cada aplicacion.",
      "#about .about-card:nth-child(1) .prompt-title": "Para equipos y recruiters",
      "#about .about-card:nth-child(1) p": "Desarrollo interfaces claras y backend funcional para acelerar entregas, bajar friccion tecnica y sumar valor desde el primer sprint.",
      "#about .about-card:nth-child(2) .prompt-title": "Para clientes y colaboraciones",
      "#about .about-card:nth-child(2) p": "Construyo soluciones web orientadas a resultados: presencia profesional, navegacion simple y conversion en canales clave de contacto.",
      "#about .about-card:nth-child(3) .prompt-title": "Fortalezas actuales",
      "#about .about-card:nth-child(3) p": "Perfil full stack en evolucion constante: frontend, React, backend y QA con enfoque practico para resolver problemas reales de negocio.",
      "#projects .section-heading .eyebrow": "Proyectos destacados",
      "#projects .section-heading h2": "Casos recientes: IntegraSalud y TitanMaq",
      "#projects .section-heading > p:last-child": "Dos implementaciones con objetivos distintos: experiencia de reservas en salud y presencia corporativa industrial, ambas con foco en claridad de interfaz, arquitectura ordenada y buena respuesta en mobile.",
      "#projects .project-feature:nth-child(1) .project-actions a:nth-child(1)": "Ver demo",
      "#projects .project-feature:nth-child(1) .project-actions a:nth-child(2)": "Ver GitHub",
      "#projects .project-feature:nth-child(1) .project-content > p": "Sistema demo para gestion de turnos y seguimiento clinico con dos recorridos de usuario (administrativo y paciente), orientado a validar flujos, roles y consistencia visual.",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(1) h3": "Stack principal",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(1) p": "Base de interfaz y logica:",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(2) h3": "Valor de producto",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(2) p": "Escenario simulado para:",
      "#projects .project-feature:nth-child(1) .project-pitch": "IntegraSalud es un demo de sistema de reservas medicas con recorridos diferenciados por rol, interfaz moderna y estructura modular orientada a evolucionar hacia una plataforma clinica mas amplia.",
      "#projects .project-feature:nth-child(2) .project-actions a:nth-child(1)": "Ver deploy",
      "#projects .project-feature:nth-child(2) .project-content > p": "Objetivo principal: presentar catalogo y soluciones, facilitar contacto comercial y soporte, guiar al usuario entre paginas clave con una navegacion consistente y reforzar la percepcion de marca.",
      "#projects .project-feature:nth-child(2) .project-metric-card h3": "Fuente total",
      "#projects .project-feature:nth-child(2) .project-metric-card p": "Vista de distribucion total:",
      "#projects .project-feature:nth-child(2) .project-pitch": "TitanMaq es una web corporativa multipagina desarrollada con HTML, SCSS y JavaScript, enfocada en presentar productos y servicios de maquinaria pesada con experiencia responsive y consistente. Incluye layout reutilizable con parciales, compilacion Sass, QA automatizada y un chatbot contextual para asistencia comercial y tecnica.",
      "#education .section-heading > p:last-child": "La base academica visible combina cursos de Coderhouse y Santander Open Academy, con progresion desde desarrollo web hasta arquitectura backend, Python aplicado e introduccion a testing QA.",
      "#contact .eyebrow": "Disponibilidad",
      "#contact h2": "Disponible para practicas IT, equipos en crecimiento y colaboraciones web",
      "#contact .cta-copy p:last-child": "Si buscas un perfil con base real en frontend, React, backend y capacidad de aprendizaje sostenido, puedo aportar compromiso, criterio tecnico y una comunicacion clara para seguir creciendo dentro de un equipo.",
      ".footer p:nth-child(2)": "Portfolio personal con foco en desarrollo full stack, formacion validada y disponibilidad para nuevas oportunidades.",
      ".footer-legal": "Derechos reservados. Edxear 2026"
    },
    html: {
      "#profile .detail-list li:nth-child(1)": "<strong>Nombre:</strong> Exequiel Dearmas",
      "#profile .detail-list li:nth-child(2)": "<strong>Alias:</strong> Edxear",
      "#profile .detail-list li:nth-child(3)": "<strong>Ciudad:</strong> Gualeguaychu, Entre Rios, Argentina",
      "#profile .detail-list li:nth-child(4)": "<strong>Codigo postal:</strong> 2820",
      "#profile .detail-list li:nth-child(5)": "<strong>Institucion:</strong> Coderhouse",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(1)": "<strong>Enfoque funcional:</strong> acceso por perfil, circuito de reservas y base para modulos medicos operativos.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(2)": "<strong>UX/UI:</strong> layout claro, tema claro/oscuro, jerarquia de acciones y componentes de formulario legibles.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(3)": "<strong>Alcance demo:</strong> gestion, recetas, historial, laboratorio y teleconsulta representados para navegacion guiada.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(4)": "<strong>Escalabilidad:</strong> estructura pensada para crecer por modulos y sostener integraciones de servicios clinicos.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(1)": "<strong>Tecnologias:</strong> HTML5, SCSS + CSS compilado, JavaScript, Bootstrap 5, Font Awesome, AOS y Node.js para build y QA.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(2)": "<strong>Arquitectura:</strong> sitio estatico multipagina con parciales reutilizables para header/footer inyectados por JavaScript.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(3)": "<strong>Funcionalidades:</strong> navegacion unificada, contenido por area de negocio, formularios y chatbot contextual comercial/tecnico.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(4)": "<strong>Mejoras UX:</strong> espaciados mas coherentes, CTAs integrados en tarjetas y tratamiento visual de imagenes para branding industrial.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(5)": "<strong>Mantenimiento:</strong> compilacion SCSS, watch en desarrollo, checklist QA sobre HTML y scripts de optimizacion de imagenes."
    }
  },
  en: {
    title: "Exequiel Dearmas | Portfolio",
    text: {
      "#hero .hero-text": "Profile focused on development teams, first IT opportunities and collaborations that need a serious technical foundation in frontend, React, backend and continuous learning applied to real web products.",
      "#hero .hero-metrics div:nth-child(1) dt": "Base",
      "#hero .hero-metrics div:nth-child(1) dd": "Coderhouse",
      "#hero .hero-metrics div:nth-child(2) dt": "Location",
      "#hero .hero-metrics div:nth-child(2) dd": "Gualeguaychu, AR",
      "#hero .hero-metrics div:nth-child(3) dt": "Focus",
      "#hero .hero-metrics div:nth-child(3) dd": "Web + Backend",
      "#hero .hero-metrics div:nth-child(3) small": "Clear interfaces and solid logic",
      ".floating-card-main .card-label": "Profile",
      ".floating-card-main h2": "Full stack for teams and clients",
      ".floating-card-main p": "Exequiel Dearmas is my real and professional identity to present a technical evolution focused on real, well-solved web products.",
      ".floating-card-side .card-label": "Contact",
      "#profile .section-heading .eyebrow": "Profile",
      "#profile .section-heading h2": "A growing technical base with clear development focus",
      "#profile .section-heading > p:last-child": "My goal is to build and evolve my profile around web development, focused on participating in real projects and contributing with a broad professional perspective.",
      "#profile .profile-card:nth-child(1) .prompt-title": "Key details",
      "#profile .profile-card:nth-child(2) .prompt-title": "Links",
      "#profile .profile-link-download": "Download CV",
      "#profile .profile-card-wide .prompt-title": "Training stack",
      "#about .section-heading .eyebrow": "About me",
      "#about .section-heading h2": "Full stack development with technical focus and broad professional vision",
      "#about .section-heading > p:last-child": "I am building my path as a full stack developer, combining practical web development foundations, JavaScript, React and backend with a continuous-learning mindset. I am interested in creating functional, clear and well-structured products, taking care of both user experience and underlying logic.",
      "#about .about-card:nth-child(1) .prompt-title": "For teams and recruiters",
      "#about .about-card:nth-child(1) p": "I build clear interfaces and practical backend solutions to speed up delivery, reduce friction and add value from sprint one.",
      "#about .about-card:nth-child(2) .prompt-title": "For clients and collaborations",
      "#about .about-card:nth-child(2) p": "I create result-oriented web solutions: stronger brand presence, simple navigation and better conversion on key contact channels.",
      "#about .about-card:nth-child(3) .prompt-title": "Current strengths",
      "#about .about-card:nth-child(3) p": "Full stack profile in constant growth: frontend, React, backend and QA with a practical focus on solving real business problems.",
      "#projects .section-heading .eyebrow": "Featured projects",
      "#projects .section-heading h2": "Recent cases: IntegraSalud and TitanMaq",
      "#projects .section-heading > p:last-child": "Two implementations with different goals: healthcare booking experience and industrial corporate presence, both focused on interface clarity, clean architecture and strong mobile response.",
      "#projects .project-feature:nth-child(1) .project-actions a:nth-child(1)": "View demo",
      "#projects .project-feature:nth-child(1) .project-actions a:nth-child(2)": "View GitHub",
      "#projects .project-feature:nth-child(1) .project-content > p": "Demo system for appointment management and clinical tracking with two user flows (admin and patient), aimed at validating flows, roles and visual consistency.",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(1) h3": "Main stack",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(1) p": "Interface and logic base:",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(2) h3": "Product value",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(2) p": "Simulated scenario to:",
      "#projects .project-feature:nth-child(1) .project-pitch": "IntegraSalud is a medical booking system demo with role-based flows, modern interface and modular structure designed to evolve into a broader clinical platform.",
      "#projects .project-feature:nth-child(2) .project-actions a:nth-child(1)": "View deploy",
      "#projects .project-feature:nth-child(2) .project-content > p": "Main objective: present catalog and solutions, facilitate commercial contact and support, guide users through key pages with consistent navigation and strengthen brand perception.",
      "#projects .project-feature:nth-child(2) .project-metric-card h3": "Total source",
      "#projects .project-feature:nth-child(2) .project-metric-card p": "Total distribution view:",
      "#projects .project-feature:nth-child(2) .project-pitch": "TitanMaq is a multipage corporate website built with HTML, SCSS and JavaScript, focused on presenting heavy machinery products and services with a consistent responsive experience. It includes reusable layout with partials, Sass compilation, automated QA and a contextual chatbot for commercial and technical support.",
      "#education .section-heading > p:last-child": "The visible academic base combines Coderhouse and Santander Open Academy courses, progressing from web development to backend architecture, applied Python and an introduction to QA testing.",
      "#contact .eyebrow": "Availability",
      "#contact h2": "Available for IT internships, growing teams and web collaborations",
      "#contact .cta-copy p:last-child": "If you are looking for a profile with a real frontend, React and backend base plus sustained learning capacity, I can contribute commitment, technical judgment and clear communication to keep growing within a team.",
      ".footer p:nth-child(2)": "Personal portfolio focused on full stack development, validated training and availability for new opportunities.",
      ".footer-legal": "All rights reserved. Edxear 2026"
    },
    html: {
      "#profile .detail-list li:nth-child(1)": "<strong>Name:</strong> Exequiel Dearmas",
      "#profile .detail-list li:nth-child(2)": "<strong>Alias:</strong> Edxear",
      "#profile .detail-list li:nth-child(3)": "<strong>City:</strong> Gualeguaychu, Entre Rios, Argentina",
      "#profile .detail-list li:nth-child(4)": "<strong>Postal code:</strong> 2820",
      "#profile .detail-list li:nth-child(5)": "<strong>Institution:</strong> Coderhouse",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(1)": "<strong>Functional focus:</strong> role-based access, booking flow and a base for operational medical modules.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(2)": "<strong>UX/UI:</strong> clear layout, light/dark mode, action hierarchy and readable form components.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(3)": "<strong>Demo scope:</strong> management, prescriptions, history, lab and telemedicine represented for guided navigation.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(4)": "<strong>Scalability:</strong> structure designed to grow by modules and support clinical service integrations.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(1)": "<strong>Technologies:</strong> HTML5, SCSS + compiled CSS, JavaScript, Bootstrap 5, Font Awesome, AOS and Node.js for build and QA.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(2)": "<strong>Architecture:</strong> multipage static site with reusable partials for header/footer injected via JavaScript.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(3)": "<strong>Features:</strong> unified navigation, business-area content, forms and contextual commercial/technical chatbot.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(4)": "<strong>UX improvements:</strong> more coherent spacing, integrated CTAs in cards and visual treatment of images for industrial branding.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(5)": "<strong>Maintenance:</strong> SCSS compilation, dev watch, QA checklist for HTML and image optimization scripts."
    }
  },
  pt: {
    title: "Exequiel Dearmas | Portfolio",
    text: {
      "#hero .hero-text": "Perfil orientado para equipes de desenvolvimento, primeiras oportunidades em TI e colaboracoes que precisem de base tecnica solida em frontend, React, backend e aprendizado continuo aplicado a produtos web reais.",
      "#hero .hero-metrics div:nth-child(1) dt": "Base",
      "#hero .hero-metrics div:nth-child(1) dd": "Coderhouse",
      "#hero .hero-metrics div:nth-child(2) dt": "Localizacao",
      "#hero .hero-metrics div:nth-child(2) dd": "Gualeguaychu, AR",
      "#hero .hero-metrics div:nth-child(3) dt": "Foco",
      "#hero .hero-metrics div:nth-child(3) dd": "Web + Backend",
      "#hero .hero-metrics div:nth-child(3) small": "Interfaces claras e logica solida",
      ".floating-card-main .card-label": "Perfil",
      ".floating-card-main h2": "Full stack para equipes e clientes",
      ".floating-card-main p": "Exequiel Dearmas e minha identidade real e profissional para apresentar uma evolucao tecnica focada em produtos web reais e bem resolvidos.",
      ".floating-card-side .card-label": "Contato",
      "#profile .section-heading .eyebrow": "Perfil",
      "#profile .section-heading h2": "Base tecnica em crescimento com foco claro em desenvolvimento",
      "#profile .section-heading > p:last-child": "Meu objetivo e construir e evoluir meu perfil em torno do desenvolvimento web, com foco em participar de projetos reais e contribuir com uma visao profissional ampla.",
      "#profile .profile-card:nth-child(1) .prompt-title": "Dados principais",
      "#profile .profile-card:nth-child(2) .prompt-title": "Links",
      "#profile .profile-link-download": "Baixar CV",
      "#profile .profile-card-wide .prompt-title": "Stack em formacao",
      "#about .section-heading .eyebrow": "Sobre mim",
      "#about .section-heading h2": "Desenvolvimento full stack com foco tecnico e visao profissional ampla",
      "#about .section-heading > p:last-child": "Estou construindo meu caminho como desenvolvedor full stack, combinando base pratica em desenvolvimento web, JavaScript, React e backend com mentalidade de aprendizado continuo. Tenho interesse em criar produtos funcionais, claros e bem estruturados, cuidando tanto da experiencia do usuario quanto da logica que sustenta cada aplicacao.",
      "#about .about-card:nth-child(1) .prompt-title": "Para equipes e recrutadores",
      "#about .about-card:nth-child(1) p": "Desenvolvo interfaces claras e backend funcional para acelerar entregas, reduzir atrito tecnico e gerar valor desde o primeiro sprint.",
      "#about .about-card:nth-child(2) .prompt-title": "Para clientes e colaboracoes",
      "#about .about-card:nth-child(2) p": "Crio solucoes web orientadas a resultado: presenca profissional, navegacao simples e melhor conversao nos principais canais de contato.",
      "#about .about-card:nth-child(3) .prompt-title": "Fortalezas atuais",
      "#about .about-card:nth-child(3) p": "Perfil full stack em evolucao constante: frontend, React, backend e QA com foco pratico em resolver problemas reais de negocio.",
      "#projects .section-heading .eyebrow": "Projetos em destaque",
      "#projects .section-heading h2": "Casos recentes: IntegraSalud e TitanMaq",
      "#projects .section-heading > p:last-child": "Duas implementacoes com objetivos diferentes: experiencia de reservas em saude e presenca corporativa industrial, ambas com foco em clareza de interface, arquitetura organizada e boa resposta em mobile.",
      "#projects .project-feature:nth-child(1) .project-actions a:nth-child(1)": "Ver demo",
      "#projects .project-feature:nth-child(1) .project-actions a:nth-child(2)": "Ver GitHub",
      "#projects .project-feature:nth-child(1) .project-content > p": "Sistema demo para gestao de turnos e acompanhamento clinico com dois fluxos de usuario (administrativo e paciente), orientado a validar fluxos, papeis e consistencia visual.",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(1) h3": "Stack principal",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(1) p": "Base de interface e logica:",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(2) h3": "Valor de produto",
      "#projects .project-feature:nth-child(1) .project-metric-card:nth-child(2) p": "Cenario simulado para:",
      "#projects .project-feature:nth-child(1) .project-pitch": "IntegraSalud e um demo de sistema de reservas medicas com fluxos por perfil, interface moderna e estrutura modular orientada a evoluir para uma plataforma clinica mais ampla.",
      "#projects .project-feature:nth-child(2) .project-actions a:nth-child(1)": "Ver deploy",
      "#projects .project-feature:nth-child(2) .project-content > p": "Objetivo principal: apresentar catalogo e solucoes, facilitar contato comercial e suporte, guiar o usuario entre paginas-chave com navegacao consistente e reforcar a percepcao de marca.",
      "#projects .project-feature:nth-child(2) .project-metric-card h3": "Fonte total",
      "#projects .project-feature:nth-child(2) .project-metric-card p": "Visao de distribuicao total:",
      "#projects .project-feature:nth-child(2) .project-pitch": "TitanMaq e um site corporativo multipagina desenvolvido com HTML, SCSS e JavaScript, focado em apresentar produtos e servicos de maquinario pesado com experiencia responsiva e consistente. Inclui layout reutilizavel com parciais, compilacao Sass, QA automatizada e chatbot contextual para assistencia comercial e tecnica.",
      "#education .section-heading > p:last-child": "A base academica visivel combina cursos da Coderhouse e Santander Open Academy, com progressao desde desenvolvimento web ate arquitetura backend, Python aplicado e introducao a testing QA.",
      "#contact .eyebrow": "Disponibilidade",
      "#contact h2": "Disponivel para estagios TI, equipes em crescimento e colaboracoes web",
      "#contact .cta-copy p:last-child": "Se voce busca um perfil com base real em frontend, React, backend e capacidade de aprendizado continuo, posso contribuir com comprometimento, criterio tecnico e comunicacao clara para continuar crescendo dentro de uma equipe.",
      ".footer p:nth-child(2)": "Portfolio pessoal com foco em desenvolvimento full stack, formacao validada e disponibilidade para novas oportunidades.",
      ".footer-legal": "Direitos reservados. Edxear 2026"
    },
    html: {
      "#profile .detail-list li:nth-child(1)": "<strong>Nome:</strong> Exequiel Dearmas",
      "#profile .detail-list li:nth-child(2)": "<strong>Apelido:</strong> Edxear",
      "#profile .detail-list li:nth-child(3)": "<strong>Cidade:</strong> Gualeguaychu, Entre Rios, Argentina",
      "#profile .detail-list li:nth-child(4)": "<strong>CEP:</strong> 2820",
      "#profile .detail-list li:nth-child(5)": "<strong>Instituicao:</strong> Coderhouse",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(1)": "<strong>Foco funcional:</strong> acesso por perfil, fluxo de reservas e base para modulos medicos operacionais.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(2)": "<strong>UX/UI:</strong> layout claro, modo claro/escuro, hierarquia de acoes e componentes de formulario legiveis.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(3)": "<strong>Escopo demo:</strong> gestao, receitas, historico, laboratorio e teleconsulta representados para navegacao guiada.",
      "#projects .project-feature:nth-child(1) .project-list li:nth-child(4)": "<strong>Escalabilidade:</strong> estrutura pensada para crescer por modulos e sustentar integracoes de servicos clinicos.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(1)": "<strong>Tecnologias:</strong> HTML5, SCSS + CSS compilado, JavaScript, Bootstrap 5, Font Awesome, AOS e Node.js para build e QA.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(2)": "<strong>Arquitetura:</strong> site estatico multipagina com parciais reutilizaveis para header/footer injetados via JavaScript.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(3)": "<strong>Funcionalidades:</strong> navegacao unificada, conteudo por area de negocio, formularios e chatbot contextual comercial/tecnico.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(4)": "<strong>Melhorias UX:</strong> espacamentos mais coerentes, CTAs integradas em cards e tratamento visual de imagens para branding industrial.",
      "#projects .project-feature:nth-child(2) .project-list li:nth-child(5)": "<strong>Manutencao:</strong> compilacao SCSS, watch em desenvolvimento, checklist QA em HTML e scripts de otimizacao de imagens."
    }
  }
};

const applyExtendedTranslations = () => {
  const dictionary = extendedTranslations[currentLanguage] || extendedTranslations.es;

  if (dictionary.title) {
    document.title = dictionary.title;
  }

  Object.entries(dictionary.text || {}).forEach(([selector, value]) => {
    const node = document.querySelector(selector);
    if (node) {
      node.textContent = value;
    }
  });

  Object.entries(dictionary.html || {}).forEach(([selector, value]) => {
    const node = document.querySelector(selector);
    if (node) {
      node.innerHTML = value;
    }
  });
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
  if (styleToggle) {
    styleToggle.setAttribute("aria-label", getText("style_toggle"));
    if (styleToggleLabel) {
      styleToggleLabel.textContent = currentStyle === "argentina" ? getText("style_mode_classic") : getText("style_mode_argentina");
    }
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

  applyExtendedTranslations();

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
  const isArgentina = document.body.getAttribute("data-style") === "argentina";
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const particleColor = isArgentina
    ? (isDark ? "#9fdfff" : "#0f1720")
    : (isDark ? "#ff9447" : "#d94e1a");
  const lineColor = isArgentina
    ? (isDark ? "#7bcfff" : "#121821")
    : (isDark ? "#ff7a2f" : "#e96f25");

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
        value: isArgentina ? (isDark ? 0.4 : 0.36) : (isDark ? 0.34 : 0.3),
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
        opacity: isArgentina ? (isDark ? 0.34 : 0.3) : (isDark ? 0.32 : 0.24),
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
            opacity: isArgentina ? (isDark ? 0.42 : 0.38) : (isDark ? 0.42 : 0.32),
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

applyTheme("light");
localStorage.setItem(THEME_KEY, "light");

applyVisualStyle("argentina", true);

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

if (styleToggle) {
  styleToggle.addEventListener("click", () => {
    const nextStyle = currentStyle === "argentina" ? "default" : "argentina";
    applyVisualStyle(nextStyle, true);
  });
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