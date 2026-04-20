import React, { useEffect, useRef } from "react";
import { RiInfoCardLine } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import ScrollMouse from "../ui/ScrollMouse";
import { HashLink } from "react-router-hash-link";
import { FaRegFileCode } from "react-icons/fa";
import { LuMonitorSmartphone } from "react-icons/lu";
import { TbDeviceMobileCheck } from "react-icons/tb";
import { RiDatabase2Line } from "react-icons/ri";
import gsap from "gsap";
import SectionHeading from "../ui/SectionHeading";
import "./About.css";

const About = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRefs = useRef([]);
  const btnRef = useRef(null);
  const fillRef = useRef(null);
  const shineRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Initial mount animations
    const tl = gsap.timeline();
    
    tl.fromTo(leftRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "+=0.2"
    )
    .fromTo(rightRefs.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.4"
    );

    // Button Hover Animation
    const btn = btnRef.current;
    const fill = fillRef.current;
    const shine = shineRef.current;
    const text = textRef.current;

    if (btn && fill && shine && text) {
      gsap.set(fill, { scale: 0, xPercent: -50, yPercent: -50 });
      gsap.set(shine, { x: "-150%", skewX: -20 });

      const onMouseEnter = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.set(fill, { x: x, y: y });
        const hoverTextColor = getComputedStyle(btn).getPropertyValue('--btn-hover-color').trim() || "#ffffff";
        
        gsap.to(fill, { scale: 2.5, duration: 1, ease: "power3.out" });
        gsap.to(btn, { scale: 1.05, duration: 0.3, ease: "power2.out", color: hoverTextColor });
        gsap.to(text, { color: hoverTextColor, duration: 0.2 });
        gsap.fromTo(shine, 
          { x: "-150%", skewX: -20 },
          { x: "250%", duration: 0.6, ease: "power1.inOut" }
        );
      };

      const onMouseLeave = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(fill, { scale: 0, x: x, y: y, duration: 1, ease: "power2.out" });
        gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.out", color: "inherit" });
        gsap.to(text, { color: "inherit", duration: 0.2 });
      };

      btn.addEventListener("mouseenter", onMouseEnter);
      btn.addEventListener("mouseleave", onMouseLeave);

      return () => {
        btn.removeEventListener("mouseenter", onMouseEnter);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, []);

  return (
    <div id="about" ref={containerRef}>
      <SectionHeading 
        icon={<RiInfoCardLine />} 
        title="About Me" 
        subtitle="Bridging the gap between imagination and reality through code."
      />
      <div className="aboutPage">
        <div className="abtLeft" ref={leftRef}>
          <p>Hello! </p>
          <p className="summary">
            I'm a Aspiring Software Developer with hands-on experience in
            creating responsive and user-friendly web applications using React
            and Django. Having Strong exposure to Python, Java, JavaScript and
            SQL . Passionate about learning new technologies, Implementing and
            continuously improving my skills.
            <br />
            <br />
            <a href="/MyResume.pdf" ref={btnRef} className="btn btn-light" download="GPN_CV.pdf">
              <span className="btn-fill" ref={fillRef}></span>
              <span className="btn-shine" ref={shineRef}></span>
              <span className="btn-text" ref={textRef}>
                <FiDownload className="me-3" />
                Download CV
              </span>
            </a>
          </p>
        </div>
        <div className="abtRight">
          <aside ref={el => rightRefs.current[0] = el}>
            <FaRegFileCode className="abtIcon" />
            <h4>Efficient Code</h4>
            <span>Writing Maintainable and Scalable Code</span>
          </aside>
          <aside ref={el => rightRefs.current[1] = el}>
            <LuMonitorSmartphone className="abtIcon" />
            <h4>Web Applications</h4>
            <span>Building Dynamic and Interactive Applications</span>
          </aside>
          <aside ref={el => rightRefs.current[2] = el}>
            <RiDatabase2Line className="abtIcon" />
            <h4>Database</h4>
            <span> Designing and Managing Databases</span>
          </aside>
          <aside ref={el => rightRefs.current[3] = el}>
            <TbDeviceMobileCheck className="abtIcon" />
            <h4>Responsive Design</h4>
            <span>Creating Adaptable Interfaces for Devices</span>
          </aside>
        </div>
      </div>
      <HashLink className="scroll-link" to="/#study">
        <ScrollMouse text1="Scroll down" text2="View Education" />
      </HashLink>
    </div>
  );
};

export default About;
