import React, { useRef } from "react";
import gsap from "gsap";

const SkillButton = ({ type, active, onClick }) => {
  const btnRef = useRef(null);
  const fillRef = useRef(null);
  const shineRef = useRef(null);
  const textRef = useRef(null);

  const handleMouseEnter = (e) => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    const shine = shineRef.current;
    const text = textRef.current;
    if (!btn || !fill || !shine || !text) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Determine target color based on theme
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? "#000000" : "#ffffff";

    gsap.killTweensOf([fill, text, shine]);
    
    gsap.set(fill, { x, y, scale: 0, opacity: 1 });
    gsap.to(fill, { 
      scale: 3, 
      duration: 0.5, 
      ease: "power2.out" 
    });
    
    gsap.to(text, { 
      color: textColor, 
      duration: 0.2, 
      ease: "none" 
    });

    gsap.fromTo(shine, 
      { x: "-150%", skewX: -20 },
      { x: "250%", duration: 0.6, ease: "power1.inOut" }
    );
  };

  const handleMouseLeave = (e) => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    const text = textRef.current;
    if (!btn || !fill || !text) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.killTweensOf([fill, text]);
    
    gsap.to(fill, { 
      scale: 0, 
      x, 
      y, 
      duration: 0.4, 
      ease: "power2.inOut",
      onComplete: () => gsap.set(fill, { opacity: 0 }) 
    });
    
    gsap.to(text, { 
      color: "", // Resets to CSS color
      duration: 0.2,
      ease: "none"
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`skillTypeBtn ${active ? "active" : ""}`}
    >
      <span className="btn-fill" ref={fillRef}></span>
      <span className="btn-shine" ref={shineRef}></span>
      <span className="btn-text" ref={textRef}>{type}</span>
    </button>
  );
};

export default SkillButton;
