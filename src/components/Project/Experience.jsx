import { useEffect, useRef } from "react";
import { RiSuitcaseFill } from "react-icons/ri";
import { FaJava, FaHtml5, FaCss3Alt, FaJs, FaReact } from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { SiSpring, SiSpringboot, SiHibernate } from "react-icons/si";

import ExpCard from "./ExpCard";
import ScrollMouse from "../ui/ScrollMouse.jsx";
import SectionHeading from "../ui/SectionHeading";
import "./Experience.css";
import { HashLink } from "react-router-hash-link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".expCard", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all",
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const exp1 = {
    compName: "KodNest Technologies",
    role: "Full Stack Developer Trainee",
    duration: "Sept 2025 - Present",
    location: "Virtual",
    description: [
      "Learning fundamentals of core full-stack technologies.",
      "Implementing and Gaining Hands-on Experience on Back-end Languages and Databases.",
      "Strengthening Logical thinking and Technical Skills through practicing on Coding-Platforms.",
      "Collaborating with peers to develop and deploy functional web applications.",
      "Applying software development best practices to write clean and maintainable code.",
    ],
    techStack: [
      { skName: "Core Java", skIcon: <FaJava />, color: "#f8981d" },
      { skName: "Spring", skIcon: <SiSpring />, color: "#6DB33F" },
      { skName: "Spring Boot", skIcon: <SiSpringboot />, color: "#6DB33F" },
      { skName: "Hibernate", skIcon: <SiHibernate />, color: "#59666C" },
      { skName: "React", skIcon: <FaReact />, color: "#61DAFB" },
      { skName: "SQL", skIcon: <GrMysql />, color: "#4479a1" },
    ],
  };

  const exp2 = {
    compName: "Octanet Services",
    role: "Web Developer",
    duration: "June 2023 - Aug 2023",
    location: "Virtual",
    description: [
      "Learned fundamentals of Web Development.",
      "Gained Hands-on Experience on core Front-end Technologies.",
      "Developed simple User Interfaces and Responsive Web Pages using HTML, CSS, and JavaScript.",
    ],
    techStack: [
      { skName: "HTML", skIcon: <FaHtml5 />, color: "#e34f26" },
      { skName: "CSS", skIcon: <FaCss3Alt />, color: "#1572b6" },
      { skName: "JS", skIcon: <FaJs />, color: "#f7df1e" },
    ],
  };

  return (
    <div id="experience" ref={containerRef}>
      <SectionHeading 
        icon={<RiSuitcaseFill />} 
        title="Experience" 
        subtitle="Exploring my professional growth and industrial internships."
      />
      <div className="expCards">
        <ExpCard exp={exp1} />
        <ExpCard exp={exp2} />
      </div>
      <HashLink className="scroll-link" to="/#certifications">
        <ScrollMouse text1="Scroll down" text2="View Certificates" />
      </HashLink>
    </div>
  );
};

export default Experience;
