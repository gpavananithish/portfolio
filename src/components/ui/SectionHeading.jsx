import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SectionHeading.css";

gsap.registerPlugin(ScrollTrigger);

const SectionHeading = ({ number, icon, title, subtitle }) => {
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal line expansion (centralized)
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
          },
          transformOrigin: "center",
        }
      );

      // Icon float animation
      gsap.to(iconRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, headingRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="section-heading-container" ref={headingRef}>
      <div className="section-heading-content">
        <div className="heading-main">
          <div className="icon-wrapper" ref={iconRef}>
            {icon}
          </div>
          <h2 className="heading-title">
            <span className="title-text">{title}</span>
          </h2>
        </div>
        <div className="heading-line-container">
          <div className="heading-line" ref={lineRef}></div>
          <div className="heading-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
