import { useEffect } from "react";

function usePortfolioEffects() {
  useEffect(() => {
    const timers = [];
    const cleanups = [];
    const add = (target, event, handler, options) => {
      if (!target) return;
      target.addEventListener(event, handler, options);
      cleanups.push(() => target.removeEventListener(event, handler, options));
    };

    const preloader = document.getElementById("preloader");
    timers.push(
      setTimeout(() => {
        preloader?.classList.add("hide");
        timers.push(
          setTimeout(() => {
            if (preloader) preloader.style.display = "none";
          }, 600),
        );
      }, 1000),
    );

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const updateTime = () => {
      const timeDisplay = document.getElementById("local-time");
      if (timeDisplay) {
        timeDisplay.textContent = new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const applyThemeIcon = () => {
      if (!themeToggle) return;
      themeToggle.innerHTML = html.classList.contains("dark")
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    };

    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    applyThemeIcon();

    add(themeToggle, "click", () => {
      html.classList.toggle("dark");
      localStorage.theme = html.classList.contains("dark") ? "dark" : "light";
      applyThemeIcon();
    });

    const menu = document.getElementById("mobile-menu");
    const toggleMenu = () => {
      if (!menu) return;
      const isOpen = menu.style.opacity === "1";
      menu.style.opacity = isOpen ? "0" : "1";
      menu.style.pointerEvents = isOpen ? "none" : "auto";
    };

    add(document.getElementById("mobile-menu-btn"), "click", toggleMenu);
    add(document.getElementById("close-menu"), "click", toggleMenu);
    document
      .querySelectorAll(".mobile-link")
      .forEach((link) => add(link, "click", toggleMenu));

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const sections = Array.from(document.querySelectorAll(".section-spy"));
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));

    const onScroll = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn?.classList.remove("translate-y-20", "opacity-0");
      } else {
        scrollToTopBtn?.classList.add("translate-y-20", "opacity-0");
      }

      let current = "";
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.getAttribute("id") || "";
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("text-primary", "dark:text-white", "font-bold");
        link.classList.add("text-slate-600", "dark:text-slate-400");
        if (current && link.getAttribute("href")?.includes(current)) {
          link.classList.add("text-primary", "dark:text-white", "font-bold");
          link.classList.remove("text-slate-600", "dark:text-slate-400");
        }
      });
    };
    add(window, "scroll", onScroll, { passive: true });
    add(scrollToTopBtn, "click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );

    const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
    const projects = Array.from(document.querySelectorAll(".project-item"));
    filterBtns.forEach((button) => {
      add(button, "click", () => {
        filterBtns.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        const filterValue = button.getAttribute("data-filter");

        projects.forEach((project) => {
          const categories = (
            project.getAttribute("data-filter-category") || ""
          ).split(" ");
          if (filterValue === "all" || categories.includes(filterValue || "")) {
            project.style.display = "block";
            project.classList.add("reveal-on-scroll", "is-visible");
          } else {
            project.style.display = "none";
            project.classList.remove("reveal-on-scroll", "is-visible");
          }
        });
      });
    });

    if (window.matchMedia("(min-width: 768px)").matches) {
      document.querySelectorAll(".project-card").forEach((card) => {
        add(card, "mousemove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -3;
          const rotateY = ((x - centerX) / centerX) * 3;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        });
        add(card, "mouseleave", () => {
          card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
        });
      });

      document.querySelectorAll(".magnetic-btn").forEach((button) => {
        add(button, "mousemove", (event) => {
          const rect = button.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        add(button, "mouseleave", () => {
          button.style.transform = "translate(0px, 0px)";
        });
      });
    }

    const onParallaxScroll = () => {
      document.querySelectorAll(".parallax-img").forEach((img) => {
        const rect = img.parentElement?.getBoundingClientRect();
        if (!rect) return;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const yPos = (window.innerHeight - rect.top) * 0.08;
          img.style.transform = `translateY(${yPos - 20}px) scale(1.1)`;
        }
      });
    };
    add(window, "scroll", onParallaxScroll, { passive: true });

    const modal = document.getElementById("project-modal");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modalContent = document.getElementById("modal-content");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalImage = document.getElementById("modal-image");
    const modalDesc = document.getElementById("modal-desc");

    const openModal = (data) => {
      if (modalTitle) modalTitle.textContent = data.title || "";
      if (modalCategory) modalCategory.textContent = data.category || "";
      if (modalImage) modalImage.src = data.image || "";
      if (modalDesc) modalDesc.textContent = data.desc || "";

      modal?.classList.remove("hidden");
      timers.push(
        setTimeout(() => {
          modalBackdrop?.classList.remove("opacity-0");
          modalContent?.classList.remove("scale-95", "opacity-0");
          modalContent?.classList.add("scale-100", "opacity-100");
        }, 10),
      );
      document.body.style.overflow = "hidden";
    };

    const hideModal = () => {
      modalBackdrop?.classList.add("opacity-0");

      modalContent?.classList.remove("scale-100", "opacity-100");

      modalContent?.classList.add("scale-95", "opacity-0");

      setTimeout(() => {
        modal?.classList.add("hidden");

        document.body.style.overflow = "auto";
        document.documentElement.style.overflow = "auto";
      }, 300);
    };

    document.querySelectorAll(".project-trigger").forEach((trigger) => {
      add(trigger, "click", () => {
        openModal({
          title: trigger.dataset.title,
          category: trigger.dataset.category,
          image: trigger.dataset.image,
          desc: trigger.dataset.desc,
        });
      });
    });
    add(document.getElementById("close-modal"), "click", hideModal);
    add(modalBackdrop, "click", hideModal);
    add(document, "keydown", (event) => {
      if (event.key === "Escape") hideModal();
    });

    const toastContainer = document.getElementById("toast-container");
    const showToast = (message, type = "success") => {
      if (!toastContainer) return;
      const toast = document.createElement("div");
      const icon =
        type === "success"
          ? '<i class="fas fa-check-circle"></i>'
          : '<i class="fas fa-exclamation-circle"></i>';
      const colorClass =
        type === "success"
          ? "bg-slate-900 text-white dark:bg-white dark:text-black"
          : "bg-red-500 text-white";
      toast.className = `flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm toast-enter toast-enter-active ${colorClass}`;
      toast.innerHTML = `${icon} <span>${message}</span>`;
      toastContainer.appendChild(toast);

      timers.push(
        setTimeout(() => {
          toast.classList.remove("toast-enter-active");
          toast.classList.add("toast-exit-active");
          timers.push(setTimeout(() => toast.remove(), 300));
        }, 3000),
      );
    };

    add(document.getElementById("contact-form"), "submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const button = form.querySelector("button");
      const originalText = button.innerHTML;
      button.innerHTML =
        '<i class="fas fa-circle-notch animate-spin"></i> Sending...';
      button.disabled = true;

      timers.push(
        setTimeout(() => {
          showToast("Message sent successfully. I will contact you soon.");
          form.reset();
          button.innerHTML = originalText;
          button.disabled = false;
        }, 1500),
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((el) => observer.observe(el));

    document.querySelectorAll(".spotlight-card").forEach((card) => {
      add(card, "mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      });
    });

    return () => {
      clearInterval(timeInterval);
      timers.forEach(clearTimeout);
      cleanups.forEach((cleanup) => cleanup());
      observer.disconnect();
      document.body.style.overflow = "";
    };
  }, []);
}
export default function App() {
  usePortfolioEffects();

  return (
    <div>    <a href="" target="_blank" aria-label="Chat WhatsApp"
        class="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 hoverable magnetic-btn group">
        <span class="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
        <i class="fab fa-whatsapp text-3xl leading-none z-10 group-hover:rotate-12 transition-transform"></i>
    </a>
      <button id="scrollToTopBtn" aria-label="Gulir ke Atas"
        class="fixed bottom-28 right-8 z-50 w-12 h-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/20 rounded-full flex items-center justify-center text-slate-600 dark:text-white shadow-lg translate-y-20 opacity-0 transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-1 hoverable focus:outline-none">
        <i class="fas fa-arrow-up"></i>
    </button>
    <div className="bg-slate-50 text-slate-800 dark:bg-dark dark:text-slate-200 transition-colors duration-500 selection:bg-primary selection:text-white overflow-x-hidden ">
      <div className="fixed inset-0 z-[1] bg-noise pointer-events-none opacity-40 mix-blend-overlay"></div>
      <div
        id="toast-container"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none"
      ></div>

      <div className="fixed inset-0 z-0 bg-grid-pattern pointer-events-none"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-20 z-0"></div>

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
        <nav className="bg-white/70 dark:bg-surface/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-sm transition-all duration-300 w-full max-w-4xl justify-between md:justify-start reveal-on-scroll">
          <a
            href="#"
            className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white hoverable magnetic-btn focus:outline-none relative z-20"
          >
            Pranav<span className="text-primary">.</span>
          </a>

          <div
            className="hidden md:flex items-center gap-6 text-sm font-medium ml-auto relative z-20"
            id="desktop-menu"
          >
            <a
              href="#home"
              className="nav-link text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors hoverable magnetic-btn"
            >
              Home
            </a>
            <a
              href="#about"
              className="nav-link text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors hoverable magnetic-btn"
            >
              About
            </a>
            <a
              href="#work"
              className="nav-link text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors hoverable magnetic-btn"
            >
              Project
            </a>
            <a
              href="#contact"
              className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xs hover:scale-105 transition-transform hoverable magnetic-btn"
            >
              Hire Me
            </a>
          </div>

          <div className="flex items-center gap-3 md:ml-4 border-l border-slate-200 dark:border-white/10 pl-4 md:pl-6 relative z-20">
            <button
              id="theme-toggle"
              aria-label="Toggle dark mode"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors hoverable magnetic-btn focus:outline-none"
            >
              <i className="fas fa-moon"></i>
            </button>
            <button
              id="mobile-menu-btn"
              aria-label="Open menu"
              className="md:hidden text-slate-900 dark:text-white p-1 hoverable magnetic-btn focus:outline-none"
            >
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 opacity-0 pointer-events-none transition-all duration-300"
      >
        <a
          href="#home"
          className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable"
        >
          Home
        </a>
        <a
          href="#about"
          className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable"
        >
          About
        </a>
        <a
          href="#work"
          className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable"
        >
          Project
        </a>
        <a
          href="#writing"
          className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable"
        >
          Writing
        </a>
        <a
          href="#contact"
          className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable"
        >
          Contact
        </a>
        <button
          id="close-menu"
          aria-label="Close menu"
          className="absolute top-8 right-8 text-slate-500 hover:text-black dark:hover:text-white hoverable"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
      </div>

      <section
        id="home"
        className="section-spy relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Enthusiastic For SDE role
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.1] md:leading-[0.9] tracking-tight mb-6 text-slate-900 dark:text-white">
                <div className="hero-heading-line overflow-hidden">
                  <span className="block">Code.</span>
                </div>

                <div className="hero-heading-line overflow-hidden pb-2 ">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary animate-gradient-x bg-[length:200%_auto] text-[88px]">
                    Containerize.
                  </span>
                  <span className="text-emerald-300">Deploy.</span>
                </div>

                <div className="hero-heading-line overflow-hidden text-md">
                  <span className="block">Scale.</span>
                </div>
              </h1>
              <p className="hero-description text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto lg:mx-0 mb-10 leading-relaxed">
                Currently aquiring the knowledge of the{" "}
                <span className="text-slate-900 dark:text-white font-semibold">
                  Devops and Cloud
                </span>{" "}
                with AWS.
              </p>

              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#"
                  projects
                  className="group relative px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold overflow-hidden hover:scale-[1.02] transition-transform shadow-xl shadow-primary/10 hoverable magnetic-btn focus:outline-none"
                >
                  <span className="relative z-10">See My Work</span>
                  <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </a>
                <a
                  href="#contact"
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 dark:border-white/20 hover:border-primary hover:text-primary transition-colors hoverable magnetic-btn focus:outline-none"
                  aria-label="Scroll to contact"
                >
                  <i className="fas fa-arrow-down animate-bounce"></i>
                </a>
              </div>
            </div>

            <div className="hero-image-container relative h-[400px] md:h-[600px] flex items-center justify-center order-1 lg:order-2 perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="hero-circle-outer absolute w-64 h-64 md:w-96 md:h-96 border border-slate-200 dark:border-white/10 rounded-full animate-spin-slow"></div>
              <div className="hero-circle-middle absolute w-48 h-48 md:w-72 md:h-72 border border-dashed border-slate-300 dark:border-white/20 rounded-full animate-spin-slow [animation-direction:reverse]"></div>

              <div className="hero-profile-img hero-image-glow relative w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl animate-[float_6s_ease-in-out_infinite] z-10 group cursor-pointer hoverable magnetic-btn">
                <img
                  src="/images/photo.jpeg"
                  alt="Pranav"
                  width="800"
                  height="800"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="section-spy py-20 bg-white/50 dark:bg-white/5 border-y border-slate-200 dark:border-white/5 backdrop-blur-sm relative z-10"
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-12 reveal-on-scroll">
            About Me
            <span className="text-primary">.</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[450px] md:w-[950px]">
            <div className="bento-card spotlight-card col-span-2 md:col-span-2 bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-3xl p-8 relative overflow-hidden group hoverable reveal-on-scroll">
              <div className="spotlight-overlay"></div>
              <div className="z-10 relative">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Main Technologies
                </h3>
              </div>

              <div className="absolute bottom-10 left-0 w-full overflow-hidden">
                <div className="marquee">
                  <div className="marquee-content">
                    {[...Array(1)].map((_, i) => (
                      <div key={i} className="flex items-center gap-8 px-6">
                        <img src="https://skillicons.dev/icons?i=java&theme=light" />
                        <img src="https://skillicons.dev/icons?i=python&theme=light" />
                        <img src="https://skillicons.dev/icons?i=js&theme=light" />
                        <img src="https://skillicons.dev/icons?i=html&theme=light" />
                        <img src="https://skillicons.dev/icons?i=css&theme=light" />
                        <img src="https://skillicons.dev/icons?i=react&theme=light" />
                        <img src="https://skillicons.dev/icons?i=nodejs&theme=light" />
                        <img src="https://skillicons.dev/icons?i=tailwind&theme=light" />
                        <img src="https://skillicons.dev/icons?i=express&theme=light" />
                        <img src="https://skillicons.dev/icons?i=mongodb&theme=light" />
                        <img src="https://skillicons.dev/icons?i=mysql&theme=light" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bento-card spotlight-card col-span-1 bg-slate-900 text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden hoverable reveal-on-scroll delay-100">
              <div className="spotlight-overlay"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-3xl opacity-30 rounded-full"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 text-2xl animate-spin-slow">
                  <i className="fas fa-location-dot"></i>
                </div>
                <h3 className="text-xl font-bold mb-1">Based in</h3>
                <p className="text-slate-400">India</p>
              </div>
              <div className="relative z-10">
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                  Local Time
                </p>
                <p
                  id="local-time"
                  className="text-3xl font-display font-bold font-mono"
                >
                  00:00
                </p>
              </div>
            </div>

            <div className="bento-card spotlight-card col-span-2 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-center gap-6 hoverable reveal-on-scroll delay-200 md:h-[214px] md:w-[629px]">
              <div className="spotlight-overlay"></div>
              <div className="absolute top-6 left-6 z-10">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Tools
                </h3>
              </div>
              <div className="absolute bottom-10 left-0 w-full overflow-hidden">
                <div className="reverse">
                  <div className="marquee-content">
                    {[...Array(1)].map((_, i) => (
                      <div key={i} className="flex items-center gap-8 px-6">
                        <img src="https://skillicons.dev/icons?i=github&theme=light" />
                        <img src="https://skillicons.dev/icons?i=git&theme=light" />
                        <img src="https://skillicons.dev/icons?i=postman&theme=light" />
                        <img src="https://skillicons.dev/icons?i=docker&theme=light" />
                        <img src="https://skillicons.dev/icons?i=jenkins&theme=light" />
                        <img src="https://skillicons.dev/icons?i=aws&theme=light" />
                        <img src="https://skillicons.dev/icons?i=figma&theme=light" />
                        <img src="https://skillicons.dev/icons?i=kubernetes&theme=light" />
                        <img src="https://skillicons.dev/icons?i=linux&theme=light" />
                        <img src="https://skillicons.dev/icons?i=vercel&theme=light" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bento-card spotlight-card col-span-1 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-center gap-6 hoverable reveal-on-scroll delay-200">
              <div className="spotlight-overlay"></div>
              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 px-1 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                  Open for Projects
                </span>
              </div>
              <div
                id="skills"
                className="flex gap-4 text-2xl text-slate-600 dark:text-slate-400 relative z-10"
              >
                <a
                  href="#"
                  className="hover:text-primary transition-colors hover:scale-110 transform"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="#"
                  className="hover:text-primary transition-colors hover:scale-110 transform"
                >
                  <i className="fab fa-linkedin"></i>
                </a>

                <a
                  href="#"
                  className="hover:text-primary transition-colors hover:scale-110 transform"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-spy py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Skills<span className="text-primary">.</span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Providing comprehensive digital solutions to help your business
              grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group hoverable reveal-on-scroll spotlight-card">
              <div className="spotlight-overlay"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 text-2xl group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                <i className="fas fa-layer-group"></i>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3 relative z-10">
                UI/UX Design
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                Creating intuitive and visually engaging interfaces, focused on
                a seamless user experience.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group hoverable reveal-on-scroll delay-100 spotlight-card">
              <div className="spotlight-overlay"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 text-2xl group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                <i className="fas fa-code"></i>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3 relative z-10">
                Development
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                Building real world problem solving and high-performance
                websites with applications using modern technologies like React,
                Node.js, and Tailwind CSS, mongodb, Socket.io.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group hoverable reveal-on-scroll delay-200 spotlight-card">
              <div className="spotlight-overlay"></div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 text-2xl group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                <i className="fas fa-cloud"></i>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white mb-3 relative z-10">
                Master In Cloud Architecture
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed relative z-10">
                Building scalable cloud-native solutions with AWS, Docker,
                Kubernetes, and Jenkins. Passionate about automating
                infrastructure and delivering reliable applications from code to
                cloud.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="journey"
        className="section-spy py-24 bg-slate-50 dark:bg-[#080808]"
      >
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-16 text-center reveal-on-scroll">
            Journey<span className="text-primary">.</span>
          </h2>

          <div className="relative border-l border-slate-200 dark:border-white/10 ml-4 md:ml-10 space-y-12">
            <div className="relative pl-8 md:pl-12 group reveal-on-scroll">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-primary transition-colors ring-4 ring-transparent group-hover:ring-primary/20"></span>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-2">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  Frontend Developer
                </h3>
                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 w-fit">
                  Jan-2025
                </span>
              </div>
              <p className="text-primary font-medium mb-2">Tech</p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                Designed some Frontend projects without dedication.
              </p>
            </div>

            <div className="relative pl-8 md:pl-12 group reveal-on-scroll delay-100">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-primary transition-colors ring-4 ring-transparent group-hover:ring-primary/20"></span>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-2">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  Full-Stack Developer
                </h3>
                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 w-fit">
                  Oct-2025
                </span>
              </div>
              <p className="text-primary font-medium mb-2">Building Sites </p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                Built projects like kuber and RideWithUs which solves real world
                Problems.
              </p>
            </div>

            <div className="relative pl-8 md:pl-12 group reveal-on-scroll delay-200">
              <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-primary transition-colors ring-4 ring-transparent group-hover:ring-primary/20"></span>
              <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-2">
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  DevOps/ Cloud Engineer{" "}
                </h3>
                <span className="text-xs font-bold px-2 py-1 rounded bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300 w-fit">
                  Jan 2026 - Ongoing
                </span>
              </div>
              <p className="text-primary font-medium mb-2">MCA</p>
              <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                Specializing in cloud architecture and DevOps practices with
                hands-on experience in AWS, Docker, Kubernetes, and Jenkins.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="section-spy py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal-on-scroll">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">
              Projects
              <br />
              Selected<span className="text-primary">.</span>
            </h2>
            <p className="text-slate-500 text-sm md:text-base max-w-xs text-left md:text-right">
              A combination of business strategy, aesthetic design, and clean
              code.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-4 mb-16 reveal-on-scroll delay-100"
            id="portfolio-filters"
          >
            <button
              className="filter-btn active px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all hoverable magnetic-btn"
              data-filter="all"
            >
              All
            </button>
            <button
              className="filter-btn px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all hoverable magnetic-btn"
              data-filter="design"
            >
              Frontend
            </button>
            <button
              className="filter-btn px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all hoverable magnetic-btn"
              data-filter="dev"
            >
              Full Stack Development
            </button>
            <button
              className="filter-btn px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all hoverable magnetic-btn"
              data-filter="mobile"
            >
              DevOps
            </button>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-32"
            id="projects-grid"
          >
            <article
              className="project-item spotlight-card group cursor-pointer project-trigger hoverable reveal-on-scroll"
              data-filter-category="dev design"
              data-title="Kuber"
              data-category="UI/UX Design • Development"
              data-image="/images/kuber.jpg"
              data-desc="A premium fashion e-commerce platform. Headless CMS architecture with a Next.js frontend."
            >
              <div className="spotlight-overlay"></div>
              <div className="project-card relative w-full aspect-[4/3] bg-slate-200 dark:bg-surface rounded-2xl overflow-hidden mb-6 preserve-3d transition-transform duration-300 shadow-lg group-hover:shadow-xl border border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 overflow-hidden transform-gpu">
                  <img
                    src="/images/portfolio.png"
                    loading="lazy"
                    width="1200"
                    height="900"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img"
                    alt="Project 1"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                    Portfolio
                  </h3>
                  <p className="text-slate-500 text-sm">
                    UI/UX Design • Web Development
                  </p>
                </div>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
                </span>
              </div>
            </article>

            <article
              className="project-item spotlight-card group cursor-pointer md:mt-24 project-trigger hoverable reveal-on-scroll delay-100"
              data-filter-category="dev"
              data-title="Game Dashboard"
              data-category="Dashboard • React App"
              data-image="/images/Game Dashboard Design.jpg"
              data-desc="A real-time financial dashboard. Interactive data visualizations built with D3.js."
            >
              <div className="spotlight-overlay"></div>
              <div className="project-card relative w-full aspect-[4/3] bg-slate-200 dark:bg-surface rounded-2xl overflow-hidden mb-6 preserve-3d transition-transform duration-300 shadow-lg group-hover:shadow-xl border border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 overflow-hidden transform-gpu">
                  <img
                    src="/images/portfolio.png"
                    loading="lazy"
                    width="1200"
                    height="900"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img"
                    alt="Project 2"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                    Game Dashboard
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Dashboard • React App
                  </p>
                </div>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
                </span>
              </div>
            </article>

            <article
              className="project-item spotlight-card group cursor-pointer project-trigger hoverable reveal-on-scroll"
              data-filter-category="design"
              data-title="Protofolio"
              data-category="Branding • Website"
              data-image="/images/Capture d'écran 2025-10-22 182207.png"
              data-desc="A complete rebranding of an architecture firm. Minimalist grid layout and subtle animations."
            >
              <div className="spotlight-overlay"></div>
              <div className="project-card relative w-full aspect-[4/3] bg-slate-200 dark:bg-surface rounded-2xl overflow-hidden mb-6 preserve-3d transition-transform duration-300 shadow-lg group-hover:shadow-xl border border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 overflow-hidden transform-gpu">
                  <img
                    src="/images/Capture d'écran 2025-10-22 182207.png"
                    loading="lazy"
                    width="1200"
                    height="900"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img"
                    alt="Project 3"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                    Protofilio
                  </h3>
                  <p className="text-slate-500 text-sm">Branding • Website</p>
                </div>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
                </span>
              </div>
            </article>

            <article
              className="project-item spotlight-card group cursor-pointer md:mt-24 project-trigger hoverable reveal-on-scroll delay-100"
              data-filter-category="mobile design"
              data-title="FitTrack Pro"
              data-category="Mobile Design • Flutter"
              data-image="/images/Task manager app.jpg"
              data-desc="A task management app focused on clean planning, mobile-first interactions, and simple productivity workflows."
            >
              <div className="spotlight-overlay"></div>
              <div className="project-card relative w-full aspect-[4/3] bg-slate-200 dark:bg-surface rounded-2xl overflow-hidden mb-6 preserve-3d transition-transform duration-300 shadow-lg group-hover:shadow-xl border border-slate-200 dark:border-white/5">
                <div className="absolute inset-0 overflow-hidden transform-gpu">
                  <img
                    src="/images/three tier arch.png"
                    loading="lazy"
                    width="1200"
                    height="900"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img"
                    alt="Project 4"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                    Three-Tier Architecture
                  </h3>
                  <p className="text-slate-500 text-sm">
                    • AWS • EC2 • RDS • VPC • Nginx • Node.js • MySQL • ALB •
                    NAT Gateway
                  </p>
                </div>
                <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                  <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div
        id="project-modal"
        className="hidden fixed inset-0 z-[999] flex items-center justify-center"
      >
        <div
          id="modal-backdrop"
          className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300"
        ></div>

        <div
          id="modal-content"
          className="relative bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-[90%] p-6 scale-95 opacity-0 transition-all duration-300 overflow-y-auto max-h-[90vh]"
        >
          <button id="close-modal" className="absolute top-4 right-4 text-xl">
            ✕
          </button>

          <img id="modal-image" className="w-full rounded-xl mb-4" alt="" />

          <h2 id="modal-title" className="text-3xl font-bold mb-2"></h2>

          <p id="modal-category" className="text-primary mb-4"></p>

          <p id="modal-desc" className="text-slate-600 dark:text-slate-300"></p>
        </div>
      </div>
    </div>
    </div>
  );
}
