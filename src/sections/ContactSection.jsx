export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-spy py-24 md:py-32 relative overflow-hidden bg-slate-100 dark:bg-[#080808]"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter leading-tight reveal-on-scroll">
              Let's build something amazing.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Legendary.
              </span>
            </h2>
            <p className="text-slate-500 mb-8 text-lg reveal-on-scroll delay-100">
              Whether you have a project in mind or just want to say hello, my inbox is always open.
            </p>
            <div className="space-y-4 text-left hidden lg:block reveal-on-scroll delay-200">
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                <i className="fas fa-envelope text-primary w-6"></i>
                <span>pranavdurge7604@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
                <i className="fas fa-map-marker-alt text-primary w-6"></i>
                <span>India</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-surface p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-white/10 reveal-on-scroll delay-300">
            <form className="space-y-6" id="contact-form">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white hoverable magnetic-btn"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white hoverable magnetic-btn"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white hoverable magnetic-btn"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg hoverable magnetic-btn focus:outline-none"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-24 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 reveal-on-scroll">
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="https://www.linkedin.com/in/pranav-durge-750682259?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="hover:text-primary transition-colors hoverable focus:outline-none magnetic-btn">LinkedIn</a>
            <a href="https://www.instagram.com/pranavdurge77?igsh=dHVtaWl3a3ltbmQx" className="hover:text-primary transition-colors hoverable focus:outline-none magnetic-btn">Instagram</a>
            <a href="https://github.com/Pranav-Labs07" className="hover:text-primary transition-colors hoverable focus:outline-none magnetic-btn">GitHub</a>
          </div>
          <div>
            &copy; <span id="year">2026</span> Pranav. All rights reserved.
          </div>
        </footer>
      </div>
    </section>
  );
}
