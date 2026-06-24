export default function Navbar() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-6">
        <nav className="bg-white/70 dark:bg-surface/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-full px-6 py-3 flex items-center gap-10 shadow-sm transition-all duration-300 w-full max-w-2xl justify-between md:justify-start reveal-on-scroll">
          <a
            href="#"
            className="text-2xl font-bold font-display tracking-tight text-slate-900 dark:text-white hoverable magnetic-btn focus:outline-none relative z-20"
          >
            Pranav<span className="text-primary">.</span>
          </a>

          <div
            className="hidden md:flex items-center gap-8 text-md font-medium ml-auto relative z-20"
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

          <div className="flex items-center gap-3 md:ml-4 border-l border-slate-200 dark:border-white/10 pl-4 md:pl-8 relative z-20">
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

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-2 opacity-0 pointer-events-none transition-all duration-300"
      >
        <a href="#home" className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable">Home</a>
        <a href="#about" className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable">About</a>
        <a href="#work" className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable">Project</a>
        <a href="#writing" className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable">Writing</a>
        <a href="#contact" className="text-3xl font-display font-bold mobile-link hover:text-primary hoverable">Contact</a>
        <button
          id="close-menu"
          aria-label="Close menu"
          className="absolute top-8 right-8 text-slate-500 hover:text-black dark:hover:text-white hoverable"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
      </div>
    </>
  );
}
