import { useEffect } from "react";

export default function usePortfolioEffects() {
  useEffect(() => {
    const timers = [];
    const cleanups = [];
    const add = (target, event, handler, options) => {
      if (!target) return;
      target.addEventListener(event, handler, options);
      cleanups.push(() => target.removeEventListener(event, handler, options));
    };

    // Preloader
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

    // Year
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    // Local time clock
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

    // Theme toggle
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

    // Mobile menu
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

    // Scroll: scroll-to-top btn + active nav link
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

    // Project filter
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

    // 3D tilt + magnetic buttons (desktop only)
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

    // Parallax scroll
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

    // Project modal
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

    // Toast notifications
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

    // Contact form submission
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

    // Intersection observer for reveal-on-scroll
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

    // Spotlight cards mouse tracking
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
