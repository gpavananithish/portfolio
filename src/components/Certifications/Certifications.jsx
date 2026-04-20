import React, { useEffect, useRef } from "react";
import CertCard from "./CertCard";
import { PiCertificate } from "react-icons/pi";
import { FaHtml5, FaJava, FaPython } from "react-icons/fa6";
import { SiCisco } from "react-icons/si";
import { HashLink } from "react-router-hash-link";
import ScrollMouse from "../ui/ScrollMouse.jsx";
import SectionHeading from "../ui/SectionHeading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Certifications.css";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".certCard");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            clearProps: "all",
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const certs = [
    {
      title: "HTML5 - The Language",
      issuer: "Infosys | Springboard",
      date: "Feb 20, 2024",
      icon: <FaHtml5 />,
      color: "#E34F26",
      link: "https://drive.google.com/file/d/1SwmAoOltBxGBsQGStQX4LaRCBMl0s_fj/view?usp=drive_link",
    },
    {
      title: "Programming In Java",
      issuer: "NPTEL | IIT Kharagpur",
      date: "Oct 2023",
      score: "Elite (75%)",
      icon: <FaJava />,
      color: "#f8981d",
      link: "https://drive.google.com/file/d/1oRS8D5gNljhzQ7CFMJTO0uR3Xrtd4hd3/view?usp=drive_link",
    },
    {
      title: "Programming Essentials in Python",
      issuer: "Cisco | Networking Academy",
      date: "March 2, 2024",
      icon: <SiCisco />,
      color: "#049ca4",
      link: "https://drive.google.com/file/d/1kLr-8lc77r1_2JPEBu7qF4LtquVzUXl1/view?usp=drive_link",
    },
    {
      title: "The Joy Of Computing Using Python",
      issuer: "NPTEL | IIT Madras",
      date: "Oct 2023",
      score: "Elite (83%)",
      icon: <FaPython />,
      color: "#3776AB",
      link: "https://drive.google.com/file/d/1NU7_p740-TiciYYtVDYa8K1gEwG9CZ-L/view?usp=drive_link",
    },
  ];

  return (
    <div id="certifications" ref={containerRef} style={{ opacity: 1, visibility: 'visible' }}>
      <SectionHeading 
        icon={<PiCertificate />} 
        title="Certifications" 
        subtitle="Validating my expertise through global certifications."
      />
      <div className="certGrid">
        {certs.map((cert, index) => (
          <CertCard key={index} cert={cert} />
        ))}
      </div>
      <HashLink className="scroll-link" to="/#skills">
        <ScrollMouse text1="Scroll down" text2="View Tech Skills" />
      </HashLink>
    </div>
  );
};

export default Certifications;
