// Language toggle for the resume. English is the default; the selected language is persisted.
(() => {
  const storageKey = "resume-language";
  const defaultLanguage = "en";
  const supportedLanguages = ["en", "fr"];
  const toggle = document.querySelector(".language-toggle");

  if (!toggle) return;

  const content = {
    en: {
      documentTitle: "Resume - MOURTALLA TOURE",
      metaDescription:
        "Resume of Mourtalla Toure - Software Engineer focused on backend development, web and mobile applications, and data analysis.",
      skipLink: "Skip to main content",
      role: "Software Engineer",
      domain: "Backend · Data",
      contactLabel: "Contact information",
      educationHeading: "EDUCATION",
      educationTitles: [
        "Bachelor's in Computer Science - Application Development (Web, Mobile & Gaming)",
        "Data Analysis Certificate",
      ],
      educationDates: ["Nov 2023 – Present", "Completed Oct 2024"],
      educationMore: "Online courses - MOOCs & self-directed learning",
      projectsHeading: "PROJECTS",
      projectLinks: "View project",
      projectsMore: "View more on GitHub",
      projects: [
        {
          date: "May 2026",
          title: "jwebgen - Jakarta Servlet/JSP Scaffolding CLI",
          stack: "Node.js · Java · Jakarta Servlet · JSP · Maven · npm · Shell & Node Scripts",
          tasks: [
            "Built and published a cross-platform CLI (npm) that scaffolds Jakarta Servlet/JSP WAR projects with a standard Maven layout",
            "Generated Node.js (.mjs) and Shell scripts to automate build, deploy (Tomcat/WildFly), live-reload dev, and environment setup",
            "Shipped with GitHub Actions CI on Linux, macOS, and Windows, plus semantic-release for automated npm publishing",
          ],
        },
        {
          date: "Oct 2025",
          title: "CEC - Equal Opportunity Card Management Platform",
          stack: "Angular · Node.js · Express · MongoDB",
          tasks: [
            "Designed and implemented REST APIs with Node.js/Express for card registration and admin workflows",
            "Modeled MongoDB schemas and built the server-side business logic",
            "Integrated an Angular front-end with interactive admin dashboards",
          ],
        },
        {
          date: "Jan 2025",
          title: "GOTA - Telecom Operators & Subscribers Management",
          stack: "Python",
          tasks: [
            "Built a Python application to manage telecom operators and subscribers",
            "Designed data models and CRUD operations for operator and subscriber records",
            "Implemented business logic for subscription and operator relationship management",
          ],
        },
        {
          date: "Jan 2025",
          title: "User Settings Panel",
          stack: "HTML · CSS · Bootstrap",
          tasks: [
            "Created a responsive profile management interface with HTML/CSS and Bootstrap",
            "Implemented forms for user preferences, profile updates, and security settings",
            "Applied component-based layout patterns for maintainable UI structure",
          ],
        },
      ],
      sidebarLabel: "Profile sidebar",
      summaryHeading: "SUMMARY",
      summary:
        "Software Engineer building web and mobile applications, with solid experience in server-side development, REST APIs, and database design. I write clean, maintainable code, work comfortably in Linux environments, and apply data analysis skills to support informed technical decisions. Collaborative and detail-oriented, with hands-on experience in Agile/Scrum workflows.",
      strengthsHeading: "STRENGTHS",
      strengths: [
        "Strong problem-solving and analytical thinking",
        "Clear communication and effective teamwork",
        "Quick learner with a structured, detail-oriented approach",
        "Ability to translate requirements into maintainable code",
        "Self-motivated in collaborative academic projects",
      ],
      skillsHeading: "SKILLS",
      skillGroups: [
        ["Languages", "C, Java, Python, PHP, JavaScript, TypeScript, SQL, Swift"],
        ["Backend & APIs", "Django, Laravel, Node.js, Express, JSP & Servlet, REST APIs"],
        ["Web & Mobile", "React, Angular, HTML/CSS, Bootstrap, Tailwind, Swift (iOS)"],
        ["Data & Databases", "MySQL, MongoDB, Data Analysis (Python)"],
        ["DevOps & Tools", "Git, Linux, GitHub Actions (CI/CD), Agile/Scrum"],
      ],
      languagesHeading: "LANGUAGES",
      spokenLanguages: [
        ["English", "Intermediate"],
        ["French", "Fluent"],
        ["Wolof", "Fluent"],
      ],
      interestsHeading: "INTERESTS",
      interests: [
        [
          "Coding for Social Impact",
          "Passionate about using software to solve meaningful problems - from civic platforms to tools that improve everyday life for communities.",
        ],
        [
          "Tech Industry Evolution",
          "Actively following emerging trends in AI, cloud computing, and modern development practices to stay current and grow as an engineer.",
        ],
        [
          "Gaming",
          "Enthusiast of strategy and adventure games - a creative outlet that sharpens problem-solving, patience, and strategic thinking.",
        ],
      ],
      download: "Download",
      downloadLabel: "Download resume as PDF",
      toggleLabel: "Switch language to French",
      newTab: "opens in new tab",
    },
    fr: {
      documentTitle: "Resume - MOURTALLA TOURE",
      metaDescription:
        "Resume de Mourtalla Toure - Ingénieur logiciel orienté backend, applications web et mobiles, et analyse de données.",
      skipLink: "Aller au contenu principal",
      role: "Ingénieur logiciel",
      domain: "Backend · Données",
      contactLabel: "Coordonnées",
      educationHeading: "FORMATION",
      educationTitles: [
        "Licence en informatique - Développement d'applications (web, mobile et jeux)",
        "Certificat en analyse de données",
      ],
      educationDates: ["Nov. 2023 – Aujourd'hui", "Obtenu en oct. 2024"],
      educationMore: "Cours en ligne - MOOCs et apprentissage autonome",
      projectsHeading: "PROJETS",
      projectLinks: "Voir le projet",
      projectsMore: "Voir plus sur GitHub",
      projects: [
        {
          date: "Mai 2026",
          title: "jwebgen - CLI de génération de projets Jakarta Servlet/JSP",
          stack: "Node.js · Java · Jakarta Servlet · JSP · Maven · npm · scripts Shell et Node",
          tasks: [
            "Conception et publication d'un CLI multiplateforme (npm) générant des projets WAR Jakarta Servlet/JSP avec une structure Maven standard",
            "Génération de scripts Node.js (.mjs) et Shell pour automatiser le build, le déploiement (Tomcat/WildFly), le live reload et la configuration d'environnement",
            "Mise en place d'une CI GitHub Actions sur Linux, macOS et Windows, avec semantic-release pour la publication npm automatisée",
          ],
        },
        {
          date: "Oct. 2025",
          title: "CEC - Plateforme de gestion de la Carte d'égalité des chances",
          stack: "Angular · Node.js · Express · MongoDB",
          tasks: [
            "Conception et implémentation d'API REST avec Node.js/Express pour l'enregistrement des cartes et les workflows d'administration",
            "Modélisation des schémas MongoDB et développement de la logique métier côté serveur",
            "Intégration d'un front-end Angular avec des tableaux de bord administrateur interactifs",
          ],
        },
        {
          date: "Janv. 2025",
          title: "GOTA - Gestion des opérateurs télécoms et des abonnés",
          stack: "Python",
          tasks: [
            "Développement d'une application Python pour gérer les opérateurs télécoms et les abonnés",
            "Conception des modèles de données et des opérations CRUD pour les enregistrements opérateurs et abonnés",
            "Implémentation de la logique métier liée aux abonnements et aux relations avec les opérateurs",
          ],
        },
        {
          date: "Janv. 2025",
          title: "User Settings Panel",
          stack: "HTML · CSS · Bootstrap",
          tasks: [
            "Création d'une interface responsive de gestion de profil avec HTML/CSS et Bootstrap",
            "Implémentation de formulaires pour les préférences utilisateur, la mise à jour du profil et les paramètres de sécurité",
            "Application de patterns de mise en page orientés composants pour une interface maintenable",
          ],
        },
      ],
      sidebarLabel: "Colonne de profil",
      summaryHeading: "PROFIL",
      summary:
        "Ingénieur logiciel spécialisé dans le développement d'applications web et mobiles, avec une solide expérience en développement côté serveur, API REST et conception de bases de données. J'écris du code propre et maintenable, je travaille efficacement dans les environnements Linux et j'utilise l'analyse de données pour appuyer les décisions techniques. Collaboratif et rigoureux, avec une expérience pratique des méthodes Agile/Scrum.",
      strengthsHeading: "ATOUTS",
      strengths: [
        "Résolution de problèmes et esprit analytique",
        "Communication claire et travail d'équipe efficace",
        "Apprentissage rapide avec une approche structurée et rigoureuse",
        "Capacité à transformer des besoins en code maintenable",
        "Autonomie et implication dans les projets académiques collaboratifs",
      ],
      skillsHeading: "COMPÉTENCES",
      skillGroups: [
        ["Langages", "C, Java, Python, PHP, JavaScript, TypeScript, SQL, Swift"],
        ["Backend et API", "Django, Laravel, Node.js, Express, JSP et Servlet, API REST"],
        ["Web et mobile", "React, Angular, HTML/CSS, Bootstrap, Tailwind, Swift (iOS)"],
        ["Données et bases de données", "MySQL, MongoDB, analyse de données (Python)"],
        ["DevOps et outils", "Git, Linux, GitHub Actions (CI/CD), Agile/Scrum"],
      ],
      languagesHeading: "LANGUES",
      spokenLanguages: [
        ["Anglais", "Intermédiaire"],
        ["Français", "Courant"],
        ["Wolof", "Courant"],
      ],
      interestsHeading: "CENTRES D'INTÉRÊT",
      interests: [
        [
          "Code à impact social",
          "Intérêt marqué pour les solutions logicielles utiles aux communautés, des plateformes citoyennes aux outils qui améliorent le quotidien.",
        ],
        [
          "Évolution de l'industrie tech",
          "Veille active sur l'IA, le cloud computing et les pratiques modernes de développement pour rester à jour et progresser comme ingénieur.",
        ],
        [
          "Jeux vidéo",
          "Goût pour les jeux de stratégie et d'aventure, qui renforcent la créativité, la patience et la résolution de problèmes.",
        ],
      ],
      download: "Télécharger",
      downloadLabel: "Télécharger le resume en PDF",
      toggleLabel: "Passer en anglais",
      newTab: "s'ouvre dans un nouvel onglet",
    },
  };

  function savedLanguage() {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      // Ignore storage errors; the toggle still works for the current page view.
    }
  }

  function setText(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  }

  function setAttribute(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
  }

  function setLeadingText(element, text) {
    if (!element) return;

    const textNode = Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) {
      textNode.nodeValue = text;
      return;
    }

    element.prepend(document.createTextNode(text));
  }

  function translateEducation(translations) {
    document.querySelectorAll(".education-entry").forEach((entry, index) => {
      setLeadingText(entry.querySelector("h3 a"), translations.educationTitles[index]);
      setLeadingText(entry.querySelector("p:last-child a"), translations.educationDates[index]);
    });
  }

  function translateProjects(translations) {
    document.querySelectorAll(".project-item").forEach((project, index) => {
      const projectContent = translations.projects[index];
      if (!projectContent) return;

      setTextIn(project, ".project-date time", projectContent.date);
      setTextIn(project, "h3", projectContent.title);
      setTextIn(project, ".project-stack", projectContent.stack);
      project.querySelectorAll(".project-tasks li").forEach((item, itemIndex) => {
        item.textContent = projectContent.tasks[itemIndex] || "";
      });
      setLeadingText(project.querySelector("a[href*='github.com']"), translations.projectLinks);
    });
  }

  function setTextIn(root, selector, text) {
    const element = root.querySelector(selector);
    if (element) element.textContent = text;
  }

  function translateList(selector, values) {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.textContent = values[index] || "";
    });
  }

  function translateSkillGroups(translations) {
    document.querySelectorAll(".skill-group").forEach((group, index) => {
      const [heading, text] = translations.skillGroups[index] || [];
      setTextIn(group, "h3", heading || "");
      setTextIn(group, "p", text || "");
    });
  }

  function translateSpokenLanguages(translations) {
    document.querySelectorAll(".languages .langues > div").forEach((language, index) => {
      const [name, level] = translations.spokenLanguages[index] || [];
      const paragraphs = language.querySelectorAll("p");
      if (paragraphs[0]) paragraphs[0].textContent = name || "";
      if (paragraphs[1]) paragraphs[1].textContent = level || "";
    });
  }

  function translateInterests(translations) {
    document.querySelectorAll(".interest-item").forEach((interest, index) => {
      const [heading, text] = translations.interests[index] || [];
      setTextIn(interest, "h3", heading || "");
      setTextIn(interest, "p", text || "");
    });
  }

  function translateHiddenNewTabLabels(translations) {
    document.querySelectorAll(".visually-hidden").forEach((element) => {
      element.textContent = element.textContent.replace(
        /\((opens in new tab|s'ouvre dans un nouvel onglet)\)/g,
        `(${translations.newTab})`
      );
    });
  }

  function applyLanguage(language) {
    const activeLanguage = supportedLanguages.includes(language) ? language : defaultLanguage;
    const translations = content[activeLanguage];
    const metaDescription = document.querySelector('meta[name="description"]');

    document.documentElement.lang = activeLanguage;
    document.title = translations.documentTitle;
    if (metaDescription) metaDescription.content = translations.metaDescription;

    setText(".skip-link", translations.skipLink);
    setText(".job-title p:first-child", translations.role);
    setText(".job-title p:last-child", translations.domain);
    setAttribute(".contact-info", "aria-label", translations.contactLabel);
    setAttribute(".left", "aria-label", translations.sidebarLabel);
    setText("#education-heading", translations.educationHeading);
    setText(".education-more", translations.educationMore);
    setText("#projects-heading", translations.projectsHeading);
    setText("#summary-heading", translations.summaryHeading);
    setText(".summary p", translations.summary);
    setText("#strengths-heading", translations.strengthsHeading);
    setText("#skills-heading", translations.skillsHeading);
    setText("#languages-heading", translations.languagesHeading);
    setText("#interests-heading", translations.interestsHeading);
    setLeadingText(document.querySelector(".projects-more a"), translations.projectsMore);
    setLeadingText(document.querySelector(".download-text"), translations.download);
    setAttribute(".download-fab", "aria-label", translations.downloadLabel);

    translateEducation(translations);
    translateProjects(translations);
    translateList(".strengths-list li", translations.strengths);
    translateSkillGroups(translations);
    translateSpokenLanguages(translations);
    translateInterests(translations);
    translateHiddenNewTabLabels(translations);

    toggle.dataset.lang = activeLanguage;
    toggle.setAttribute("aria-label", translations.toggleLabel);
    toggle.setAttribute("aria-pressed", String(activeLanguage === "fr"));
  }

  let scrollTicking = false;

  function updateToggleVisibility() {
    const shouldHide = window.scrollY > 80 && !toggle.matches(":focus-visible");
    toggle.classList.toggle("is-hidden", shouldHide);
  }

  window.addEventListener(
    "scroll",
    () => {
      if (scrollTicking) return;
      scrollTicking = true;

      requestAnimationFrame(() => {
        scrollTicking = false;
        updateToggleVisibility();
      });
    },
    { passive: true }
  );

  toggle.addEventListener("focus", () => toggle.classList.remove("is-hidden"));

  const initialLanguage = supportedLanguages.includes(savedLanguage()) ? savedLanguage() : defaultLanguage;
  applyLanguage(initialLanguage);
  updateToggleVisibility();

  toggle.addEventListener("click", () => {
    const nextLanguage = toggle.dataset.lang === "fr" ? "en" : "fr";
    applyLanguage(nextLanguage);
    storeLanguage(nextLanguage);
  });
})();
