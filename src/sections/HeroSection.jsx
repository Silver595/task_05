export default function HeroSection() {
  return (
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
              <div className="hero-heading-line overflow-hidden pb-2">
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
                className="group relative px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold overflow-hidden hover:scale-[1.02] transition-transform shadow-xl shadow-primary/10 hoverable magnetic-btn focus:outline-none"
              >
                <span className="relative z-10">See My Work</span>
                <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-slate-200 dark:border-white/20 hover:border-primary hover:text-primary transition-colors hoverable focus:outline-none"
                aria-label="Scroll to contact"
              >
                <i className="fas fa-arrow-down animate-bounce leading-none"></i>
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

        {/* Social links */}
        <div className="flex gap-4 text-2xl text-slate-600 dark:text-slate-400 relative z-10 mt-8 justify-center lg:justify-start">
          <a href="https://github.com/Pranav-Labs07" className="hover:text-primary transition-colors hover:scale-110 transform">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/pranav-durge-750682259?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="hover:text-primary transition-colors hover:scale-110 transform">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/pranavdurge77?igsh=dHVtaWl3a3ltbmQx" className="hover:text-primary transition-colors hover:scale-110 transform">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
