import usePortfolioEffects from "./hooks/usePortfolioEffects";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import JourneySection from "./sections/JourneySection";
import WorkSection from "./sections/WorkSection";
import ContactSection from "./sections/ContactSection";

export default function App() {
  usePortfolioEffects();

  return (
    <div>
      <a
        href=""
        target="_blank"
        aria-label="Chat WhatsApp"
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 hoverable group"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
        <i className="fab fa-whatsapp text-3xl leading-none z-10 group-hover:rotate-12 transition-transform"></i>
      </a>

      <button
        id="scrollToTopBtn"
        aria-label="Scroll to Top"
        className="fixed bottom-28 right-8 z-50 w-12 h-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/20 rounded-full flex items-center justify-center text-slate-600 dark:text-white shadow-lg translate-y-20 opacity-0 transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-1 hoverable focus:outline-none"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <div className="bg-slate-50 text-slate-800 dark:bg-dark dark:text-slate-200 transition-colors duration-500 selection:bg-primary selection:text-white overflow-x-hidden">
        <div className="fixed inset-0 z-[1] bg-noise pointer-events-none opacity-40 mix-blend-overlay"></div>
        <div id="toast-container" className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none"></div>
        <div className="fixed inset-0 z-0 bg-grid-pattern pointer-events-none"></div>
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-20 z-0"></div>

        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <JourneySection />
        <WorkSection />
        <ContactSection />
      </div>
    </div>
  );
}
