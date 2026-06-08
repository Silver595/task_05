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

    // add(document.getElementById("mobile-menu-btn"), "click", toggleMenu);
    // add(document.getElementById("close-menu"), "click", toggleMenu);
    // document
    //   .querySelectorAll(".mobile-link")
    //   .forEach((link) => add(link, "click", toggleMenu));

    // const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    // const sections = Array.from(document.querySelectorAll(".section-spy"));
    // const navLinks = Array.from(document.querySelectorAll(".nav-link"));

   
    // const onParallaxScroll = () => {
    //   document.querySelectorAll(".parallax-img").forEach((img) => {
    //     const rect = img.parentElement?.getBoundingClientRect();
    //     if (!rect) return;
    //     if (rect.top < window.innerHeight && rect.bottom > 0) {
    //       const yPos = (window.innerHeight - rect.top) * 0.08;
    //       img.style.transform = `translateY(${yPos - 20}px) scale(1.1)`;
    //     }
    //   });
    // };
    // add(window, "scroll", onParallaxScroll, { passive: true });

    // const modal = document.getElementById("project-modal");
    // const modalBackdrop = document.getElementById("modal-backdrop");
    // const modalContent = document.getElementById("modal-content");
    // const modalTitle = document.getElementById("modal-title");
    // const modalCategory = document.getElementById("modal-category");
    // const modalImage = document.getElementById("modal-image");
    // const modalDesc = document.getElementById("modal-desc");

    // const openModal = (data) => {
    //   if (modalTitle) modalTitle.textContent = data.title || "";
    //   if (modalCategory) modalCategory.textContent = data.category || "";
    //   if (modalImage) modalImage.src = data.image || "";
    //   if (modalDesc) modalDesc.textContent = data.desc || "";

    //   modal?.classList.remove("hidden");
    //   timers.push(
    //     setTimeout(() => {
    //       modalBackdrop?.classList.remove("opacity-0");
    //       modalContent?.classList.remove("scale-95", "opacity-0");
    //       modalContent?.classList.add("scale-100", "opacity-100");
    //     }, 10),
    //   );
    //   document.body.style.overflow = "hidden";
    // };

    // const hideModal = () => {
    //   modalBackdrop?.classList.add("opacity-0");
    //   modalContent?.classList.remove("scale-100", "opacity-100");
    //   modalContent?.classList.add("scale-95", "opacity-0");
    //   timers.push(
    //     setTimeout(() => {
    //       modal?.classList.add("hidden");
    //       document.body.style.overflow = "";
    //     }, 300),
    //   );
    // };

    // document.querySelectorAll(".project-trigger").forEach((trigger) => {
    //   add(trigger, "click", () => {
    //     openModal({
    //       title: trigger.dataset.title,
    //       category: trigger.dataset.category,
    //       image: trigger.dataset.image,
    //       desc: trigger.dataset.desc,
    //     });
    //   });
    // });
    // add(document.getElementById("close-modal"), "click", hideModal);
    // add(modalBackdrop, "click", hideModal);
    // add(document, "keydown", (event) => {
    //   if (event.key === "Escape") hideModal();
    // });

    // const toastContainer = document.getElementById("toast-container");
    // const showToast = (message, type = "success") => {
    //   if (!toastContainer) return;
    //   const toast = document.createElement("div");
    //   const icon =
    //     type === "success"
    //       ? '<i class="fas fa-check-circle"></i>'
    //       : '<i class="fas fa-exclamation-circle"></i>';
    //   const colorClass =
    //     type === "success"
    //       ? "bg-slate-900 text-white dark:bg-white dark:text-black"
    //       : "bg-red-500 text-white";
    //   toast.className = `flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm toast-enter toast-enter-active ${colorClass}`;
    //   toast.innerHTML = `${icon} <span>${message}</span>`;
    //   toastContainer.appendChild(toast);

    //   timers.push(
    //     setTimeout(() => {
    //       toast.classList.remove("toast-enter-active");
    //       toast.classList.add("toast-exit-active");
    //       timers.push(setTimeout(() => toast.remove(), 300));
    //     }, 3000),
    //   );
    // };

    // add(document.getElementById("contact-form"), "submit", (event) => {
    //   event.preventDefault();
    //   const form = event.target;
    //   const button = form.querySelector("button");
    //   const originalText = button.innerHTML;
    //   button.innerHTML =
    //     '<i class="fas fa-circle-notch animate-spin"></i> Sending...';
    //   button.disabled = true;

    //   timers.push(
    //     setTimeout(() => {
    //       showToast("Message sent successfully. I will contact you soon.");
    //       form.reset();
    //       button.innerHTML = originalText;
    //       button.disabled = false;
    //     }, 1500),
    //   );
    // });

    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         entry.target.classList.add("is-visible");
    //         observer.unobserve(entry.target);
    //       }
    //     });
    //   },
    //   { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    // );
    // document
    //   .querySelectorAll(".reveal-on-scroll")
    //   .forEach((el) => observer.observe(el));

    // document.querySelectorAll(".spotlight-card").forEach((card) => {
    //   add(card, "mousemove", (event) => {
    //     const rect = card.getBoundingClientRect();
    //     card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    //     card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
    //   });
    // });

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

  // return (
  //   <div className="bg-slate-50 text-slate-800 dark:bg-dark dark:text-slate-200 transition-colors duration-500 selection:bg-primary selection:text-white overflow-x-hidden">
  //     <div className="fixed inset-0 z-[1] bg-noise pointer-events-none opacity-40 mix-blend-overlay"></div>
  //     <div
  //       id="preloader"
  //       className="fixed inset-0 z-[9999] bg-slate-50 dark:bg-dark flex items-center justify-center"
  //     >
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="relative w-16 h-16">
  //           <div className="absolute inset-0 border-4 border-slate-200 dark:border-white/10 rounded-full"></div>
  //           <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
  //         </div>
  //         <span className="text-sm font-bold tracking-widest uppercase animate-pulse">
  //           Loading...
  //         </span>
  //       </div>
  //     </div>

  //     <div
  //       id="toast-container"
  //       className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none"
  //     ></div>

  //     <div className="fixed inset-0 z-0 bg-grid-pattern pointer-events-none"></div>
  //     <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-20 z-0"></div>

  //     <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6">
  //       <nav className="bg-white/70 dark:bg-surface/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-sm transition-all duration-300 w-full max-w-4xl justify-between md:justify-start reveal-on-scroll">
  //         <a
  //           href="#"
  //           className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white hoverable magnetic-btn focus:outline-none relative z-20"
  //         >
  //           Pranav<span className="text-primary">.</span>
  //         </a>

  //         <div
  //           className="hidden md:flex items-center gap-6 text-sm font-medium ml-auto relative z-20"
  //           id="desktop-menu"
  //         >
  //           <a
  //             href="#home"
  //             className="nav-link text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors hoverable magnetic-btn"
  //           >
  //             Home
  //           </a>
  //           <a
  //             href="#about"
  //             className="nav-link text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors hoverable magnetic-btn"
  //           >
  //             About
  //           </a>
  //           <a
  //             href="#work"
  //             className="nav-link text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors hoverable magnetic-btn"
  //           >
  //             Project
  //           </a>
  //           <a
  //             href="#writing"
  //             className="nav-link text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors hoverable magnetic-btn"
  //           >
  //             Writing
  //           </a>
  //           <a
  //             href="#contact"
  //             className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold text-xs hover:scale-105 transition-transform hoverable magnetic-btn"
  //           >
  //             Hire Me
  //           </a>
  //         </div>

  //         <div className="flex items-center gap-3 md:ml-4 border-l border-slate-200 dark:border-white/10 pl-4 md:pl-6 relative z-20">
  //           <button
  //             id="theme-toggle"
  //             aria-label="Toggle dark mode"
  //             className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors hoverable magnetic-btn focus:outline-none"
  //           >
  //             <i className="fas fa-moon"></i>
  //           </button>
  //           <button
  //             id="mobile-menu-btn"
  //             aria-label="Open menu"
  //             className="md:hidden text-slate-900 dark:text-white p-1 hoverable magnetic-btn focus:outline-none"
  //           >
  //             <i className="fas fa-bars text-lg"></i>
  //           </button>
  //         </div>
  //       </nav>
  //     </header>

      
     

     

      

      

     

     

    

     

    

      
  //   </div>
  // );
}
