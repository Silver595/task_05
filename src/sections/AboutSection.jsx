export default function AboutSection() {
  return (
    <section
      id="about"
      className="section-spy py-20 bg-white/50 dark:bg-white/5 border-y border-slate-200 dark:border-white/5 backdrop-blur-sm relative z-10"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-12 reveal-on-scroll">
          About Me<span className="text-primary">.</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[450px] md:w-[950px]">
          {/* Main Technologies */}
          <div className="bento-card spotlight-card col-span-2 md:col-span-2 bg-slate-100 dark:bg-surface border border-slate-200 dark:border-white/10 rounded-3xl p-8 relative overflow-hidden group hoverable reveal-on-scroll">
            <div className="spotlight-overlay"></div>
            <div className="z-10 relative">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Main Technologies</h3>
            </div>
            <div className="absolute bottom-10 left-0 w-full overflow-hidden">
              <div className="marquee">
                <div className="marquee-content">
                  {[...Array(1)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8 px-6">
                      <img src="https://skillicons.dev/icons?i=java&theme=light" alt="Java" />
                      <img src="https://skillicons.dev/icons?i=python&theme=light" alt="Python" />
                      <img src="https://skillicons.dev/icons?i=js&theme=light" alt="JavaScript" />
                      <img src="https://skillicons.dev/icons?i=html&theme=light" alt="HTML" />
                      <img src="https://skillicons.dev/icons?i=css&theme=light" alt="CSS" />
                      <img src="https://skillicons.dev/icons?i=react&theme=light" alt="React" />
                      <img src="https://skillicons.dev/icons?i=nodejs&theme=light" alt="Node.js" />
                      <img src="https://skillicons.dev/icons?i=tailwind&theme=light" alt="Tailwind" />
                      <img src="https://skillicons.dev/icons?i=express&theme=light" alt="Express" />
                      <img src="https://skillicons.dev/icons?i=mongodb&theme=light" alt="MongoDB" />
                      <img src="https://skillicons.dev/icons?i=mysql&theme=light" alt="MySQL" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location / Time */}
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
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Local Time</p>
              <p id="local-time" className="text-3xl font-display font-bold font-mono">00:00</p>
            </div>
          </div>

          {/* Tools */}
          <div className="bento-card spotlight-card col-span-2 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex flex-col justify-center gap-6 hoverable reveal-on-scroll delay-200 md:h-[214px] md:w-[629px]">
            <div className="spotlight-overlay"></div>
            <div className="absolute top-6 left-6 z-10">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tools</h3>
            </div>
            <div className="absolute bottom-10 left-0 w-full overflow-hidden">
              <div className="reverse">
                <div className="marquee-content">
                  {[...Array(1)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8 px-6">
                      <img src="https://skillicons.dev/icons?i=github&theme=light" alt="GitHub" />
                      <img src="https://skillicons.dev/icons?i=git&theme=light" alt="Git" />
                      <img src="https://skillicons.dev/icons?i=postman&theme=light" alt="Postman" />
                      <img src="https://skillicons.dev/icons?i=docker&theme=light" alt="Docker" />
                      <img src="https://skillicons.dev/icons?i=jenkins&theme=light" alt="Jenkins" />
                      <img src="https://skillicons.dev/icons?i=aws&theme=light" alt="AWS" />
                      <img src="https://skillicons.dev/icons?i=figma&theme=light" alt="Figma" />
                      <img src="https://skillicons.dev/icons?i=kubernetes&theme=light" alt="Kubernetes" />
                      <img src="https://skillicons.dev/icons?i=linux&theme=light" alt="Linux" />
                      <img src="https://skillicons.dev/icons?i=vercel&theme=light" alt="Vercel" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Open for Projects */}
          <div className="bento-card spotlight-card col-span-1 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-center gap-6 hoverable reveal-on-scroll delay-200">
            <div className="spotlight-overlay"></div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-1 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                Open for Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
