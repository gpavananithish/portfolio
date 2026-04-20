import React, { useEffect, useRef } from "react";
import { FaRegFileCode } from "react-icons/fa";
import { SiHtml5, SiCss3, SiPython, SiDjango, SiSqlite, SiGooglegemini, SiReact, SiJavascript } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import SectionHeading from "../ui/SectionHeading";
import "./Projects.css";

import { 
  liver_project, isa_project, weather_project 
} from "../../assets/images";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project_card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            once: true, // Only trigger once to save resources
          },
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: "power2.out",
          clearProps: "all",
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const projects = [
    {
      name: "Liver Cirrhosis Predictor",
      tagline: "AI Healthcare diagnostic platform",
      desc: "An advanced healthcare diagnostic suite that leverages Machine Learning models to predict liver cirrhosis staging with high accuracy. The platform integrates 'Dr. Qwen', an empathetic AI medical consultant, to provide patients with actionable insights, medical report analysis, and emotional support throughout their diagnostic journey.",
      image: liver_project,
      gitLink: "https://github.com/gpavananithish/liver_ai_app",
      liveLink: "https://pavan0550w.pythonanywhere.com/",
      galleryLink: "#",
      features: [
        "ML-based Cirrhosis Staging Predictor",
        "Empathetic AI Consultant (Dr. Qwen)",
        "Medical PDF Report Analysis & OCR",
        "Automated Health Trend Dashboards",
        "Real-time Prognosis Visualization",
        "Secure Patient Data Management"
      ],
      techStack: [
        { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
        { name: "CSS", icon: <SiCss3 />, color: "#1572B6" },
        { name: "Python", icon: <FaPython />, color: "#3776AB" },
        { name: "Django", icon: <SiDjango />, color: "#092E20" },
        { name: "SQLite", icon: <SiSqlite />, color: "#003B57" },
        { name: "Gemini", icon: <SiGooglegemini />, color: "#0077b6" },
        { name: "React", icon: <SiReact />, color: "#61DAFB" },
      ],
    },
    {
      name: "Indian Space Agency (ISA)",
      tagline: "Exploring India's cosmic achievements",
      desc: "A sophisticated educational gateway designed to showcase India's proudest moments in space exploration. It features a high-fidelity interactive solar system, detailed tracking of missions like Mangalyaan and Chandrayaan, and a comprehensive database for astronomical phenomena and satellite technology.",
      image: isa_project,
      gitLink: "https://github.com/gpavananithish/ISA",
      liveLink: "https://gpavananithish.github.io/ISA/",
      galleryLink: "#",
      features: [
        "Advanced Glassmorphism UI/UX",
        "Interactive 3D Solar System exploration",
        "Comprehensive Galaxy & Satellite database",
        "Indian Space History & Mission Timeline",
        "Celestial Event Tracking System",
        "Educational Planetary Resources"
      ],
      techStack: [
        { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
        { name: "CSS", icon: <SiCss3 />, color: "#1572B6" },
        { name: "JS", icon: <SiJavascript />, color: "#F7DF1E" },
      ],
    },
    {
      name: "Weather Forecast (WFC)",
      tagline: "Real-time cinematic weather tracking",
      desc: "A high-performance weather intelligence application that delivers cinematic climate visualization. Utilizing professional-grade APIs, it offers hyper-localized forecasting with integrated storm safety protocols and dynamic background rendering that responds to real-time atmospheric conditions.",
      image: weather_project,
      gitLink: "https://github.com/gpavananithish/WFC",
      liveLink: "https://gpavananithish.github.io/WFC/",
      galleryLink: "#",
      features: [
        "Cinematic Dynamic Backgrounds",
        "Real-Time Accuracy (OpenWeatherMap)",
        "Emergency Monsoon/Storm Protocols",
        "Localized Forecasting Engine",
        "Atmospheric Condition Rendering",
        "Safety Guidelines & Live Alerts"
      ],
      techStack: [
        { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
        { name: "CSS", icon: <SiCss3 />, color: "#1572B6" },
        { name: "JS", icon: <SiJavascript />, color: "#F7DF1E" },
      ],
    }
  ];

  return (
    <div id="projects" ref={containerRef}>
      <SectionHeading 
        icon={<FaRegFileCode />} 
        title="Featured Projects" 
        subtitle="A collection of my recent work and open-source contributions."
      />
      <div className="projCards">
        {projects.map((proj, index) => (
          <ProjectCard key={index} proj={proj} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
