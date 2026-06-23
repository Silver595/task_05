import { useState, useRef } from "react";
import usePortfolioEffects from "./hooks/usePortfolioEffects";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import SkillsSection from "./sections/SkillsSection";
import JourneySection from "./sections/JourneySection";
import WorkSection from "./sections/WorkSection";
import ContactSection from "./sections/ContactSection";
// import RailwayJourney from "./sections/RailwayJourney";

export default function App() {
  usePortfolioEffects();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleMusicClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div>
            <div
  onClick={handleMusicClick}
  className="fixed bottom-8 right-8 z-[60] cursor-pointer"
>
  <div
    className={`music-disk ${
      isPlaying ? "music-disk-playing" : ""
    }`}
  >
    <div className="music-disk-center"></div>
  </div>

  <audio ref={audioRef} src="/music.mp4" />
</div>
      </div>

      <button
        id="scrollToTopBtn"
        aria-label="Scroll to Top"
        className="fixed bottom-28 right-8 z-50 w-12 h-12 bg-white dark:bg-surface border border-slate-200 dark:border-white/20 rounded-full flex items-center justify-center text-slate-600 dark:text-white shadow-lg translate-y-20 opacity-0 transition-all duration-300 hover:border-primary hover:text-primary hover:-translate-y-1 hoverable focus:outline-none"
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <div className="bg-slate-50 text-slate-800 dark:bg-dark dark:text-slate-200 transition-colors duration-500 selection:bg-primary selection:text-white overflow-x-hidden">
        <div className="fixed inset-0 z-[1] bg-noise pointer-events-none opacity-40 mix-blend-overlay"></div>
        <div
          id="toast-container"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none"
        ></div>
        <div className="fixed inset-0 z-0 bg-grid-pattern pointer-events-none"></div>
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-20 z-0"></div>

        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <JourneySection />
        {/* <div><RailwayJourney /></div> */}
        <WorkSection />
        <ContactSection />
      </div>
    </div>
  );
}
