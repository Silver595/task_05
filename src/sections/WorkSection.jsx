export default function WorkSection() {
  return (
    <section id="work" className="section-spy py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 reveal-on-scroll">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-slate-900 dark:text-white">
            Projects<span className="text-primary">.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xs text-left md:text-right">
            A combination of business strategy, aesthetic design, and clean code.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-16 reveal-on-scroll delay-100" id="portfolio-filters">
          <button className="filter-btn active px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all hoverable magnetic-btn" data-filter="all">All</button>
          <button className="filter-btn px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all hoverable magnetic-btn" data-filter="design">Frontend</button>
          <button className="filter-btn px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all hoverable magnetic-btn" data-filter="dev">Full Stack Development</button>
          <button className="filter-btn px-5 py-2 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all hoverable magnetic-btn" data-filter="mobile">DevOps</button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-32" id="projects-grid">

          {/* Project 1 - Portfolio */}
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
                <img src="/images/portfolio.png" loading="lazy" width="1200" height="900" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img" alt="Project 1" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
              <div>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Portfolio</h3>
                <p className="text-slate-500 text-sm">UI/UX Design • Web Development</p>
              </div>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
              </span>
            </div>
          </article>

          {/* Project 2 - Game Dashboard */}
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
                <img src="/images/portfolio.png" loading="lazy" width="1200" height="900" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img" alt="Project 2" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
              <div>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Game Dashboard</h3>
                <p className="text-slate-500 text-sm">Dashboard • React App</p>
              </div>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
              </span>
            </div>
          </article>

          {/* Project 3 - Protofilio */}
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
                <img src="/images/Capture d'écran 2025-10-22 182207.png" loading="lazy" width="1200" height="900" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img" alt="Project 3" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
              <div>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Protofilio</h3>
                <p className="text-slate-500 text-sm">Branding • Website</p>
              </div>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
              </span>
            </div>
          </article>

          {/* Project 4 - Three-Tier Architecture */}
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
                <img src="/images/three tier arch.png" loading="lazy" width="1200" height="900" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 parallax-img" alt="Project 4" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4 relative z-10">
              <div>
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors">Three-Tier Architecture</h3>
                <p className="text-slate-500 text-sm">• AWS • EC2 • RDS • VPC • Nginx • Node.js • MySQL • ALB • NAT Gateway</p>
              </div>
              <span className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                <i className="fas fa-plus group-hover:rotate-90 transition-transform"></i>
              </span>
            </div>
          </article>
        </div>

        {/* Project Modal */}
        <div id="project-modal" className="hidden fixed inset-0 z-[999] flex items-center justify-center">
          <div id="modal-backdrop" className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300"></div>
          <div id="modal-content" className="relative bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-[90%] p-6 scale-95 opacity-0 transition-all duration-300 overflow-y-auto max-h-[90vh]">
            <button id="close-modal" className="absolute top-4 right-4 text-xl">✕</button>
            <img id="modal-image" className="w-full rounded-xl mb-4" alt="" />
            <h2 id="modal-title" className="text-3xl font-bold mb-2"></h2>
            <p id="modal-category" className="text-primary mb-4"></p>
            <p id="modal-desc" className="text-slate-600 dark:text-slate-300"></p>
          </div>
        </div>
      </div>
    </section>
  );
}
