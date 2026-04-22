import { motion } from "framer-motion";
import { HiArrowLongRight } from "react-icons/hi2";
import { useMusic } from "../../context/MusicContext";
import "./Loader.css";

const Loader = ({ onComplete }) => {
  const { playMusic } = useMusic();

  const handleExplore = () => {
    playMusic();
    onComplete();
  };

  return (
    <motion.div 
      className="loaderScreen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      <div className="loader-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="welcome-text"
        >
          <h1 className="main-title">Welcome to my profile</h1>
          <p className="subtitle">Crafting digital experiences with passion & precision.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button className="explore-btn" onClick={handleExplore}>
            Explore
            <HiArrowLongRight className="btn-icon" />
            <div className="btn-glow"></div>
          </button>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="bg-gradient-orb orb-1"></div>
      <div className="bg-gradient-orb orb-2"></div>
      <div className="bg-gradient-orb orb-3"></div>
    </motion.div>
  );
};

export default Loader;
