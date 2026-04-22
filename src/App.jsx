import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Components
import Header from "./components/Header/Header.jsx";
import About from "./components/About/About.jsx";
import Skills from "./components/Skills/Skills.jsx";
import Projects from "./components/Project/Projects.jsx";
import Experience from "./components/Project/Experience.jsx";
import Certifications from "./components/Certifications/Certifications.jsx";
import Loader from "./components/Loader/Loader.jsx";
import Study from "./components/Study/Study.jsx";
import Connect from "./components/Connect/Connect.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Cursor from "./components/Cursor/Cursor.jsx";
import QuickActions from "./components/ui/QuickActions.jsx";
import Terminal from "./components/Terminal/Terminal.jsx";

// Context
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { MusicProvider, useMusic } from "./context/MusicContext.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset scroll to top on refresh
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <MusicProvider>
        <AppContent loading={loading} setLoading={setLoading} />
      </MusicProvider>
    </ThemeProvider>
  );
}

const AppContent = ({ loading, setLoading }) => {
  const { isTerminalOpen, closeTerminal } = useMusic();

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {loading && (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="page-content"
        >
          <Cursor />
          <QuickActions />
          {isTerminalOpen && <Terminal onClose={closeTerminal} />}
          <div className="page-animate">
            <Header />
            <About />
            <Study />
            <Experience />
            <Certifications />
            <Skills />
            <Projects />
            <Connect />
            <Footer />
          </div>
        </motion.div>
      )}
    </BrowserRouter>
  );
};

export default App;
