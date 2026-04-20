
import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
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
import { ThemeProvider } from "./context/ThemeContext.jsx";


import Cursor from "./components/Cursor/Cursor.jsx";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer.jsx";

import QuickActions from "./components/ui/QuickActions.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset scroll to top on refresh
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Added a small delay for better loader feel

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Cursor />
        <QuickActions />
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
      </BrowserRouter>


    </ThemeProvider>
  );
}

export default App;
