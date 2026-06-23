export default function SkillsSection() {
  return (
    <section id="services" className="section-spy py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Skills<span className="text-primary">.</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Providing comprehensive digital solutions to help your business grow.
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
              Creating intuitive and visually engaging interfaces, focused on a seamless user experience.
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
              Building real world problem solving and high-performance websites with applications using modern technologies like React, Node.js, and Tailwind CSS, mongodb, Socket.io.
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
              Building scalable cloud-native solutions with AWS, Docker, Kubernetes, and Jenkins. Passionate about automating infrastructure and delivering reliable applications from code to cloud.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
