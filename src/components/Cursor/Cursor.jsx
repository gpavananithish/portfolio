import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "../../context/ThemeContext";
import "./Cursor.css";

const Cursor = () => {
  const { theme } = useTheme();
  
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const audioCtxRef = useRef(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const playClickSound = () => {
    // Haptics (Vibration)
    // Mi / Xiaomi haptics are often described as "crisp" and "strong" (Linear Motor).
    // A slightly longer, punchier vibration (20ms) usually simulates this better than the super-subtle 10ms.
    if (navigator.vibrate) {
      navigator.vibrate(20); 
    }

    // Sound (Web Audio API)
    // "Glassy / Techy" Tick
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // "Mi" Profile:
      // Sine wave for a clean, digital "glass" sound.
      oscillator.type = "sine"; 

      // High pitch start (1500Hz) dropping rapidly. 
      // This creates that "chirp" or "tick" typical of Android system sounds.
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.05);

      // Volume envelope: Extremely snappy
      gainNode.gain.setValueAtTime(0.5, ctx.currentTime); 
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.5);

    } catch (e) {
      // Ignore audio errors
    }
  };

  useEffect(() => {
    // GSAP QuickTo: Optimized for mouse movement
    // "Kite" physics settings
    
    // 1. Thread (Arrow) - Responsive
    const xToCursor = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3.out" });
    
    // 2. Kite (Disc) - Floaty / Drifting
    // duration: 1.5s = long delay/drag like a kite in air
    // ease: power3.out = smooth natural decay
    const xToDot = gsap.quickTo(dotRef.current, "x", { duration: 1.2, ease: "power3.out" });
    const yToDot = gsap.quickTo(dotRef.current, "y", { duration: 1.2, ease: "power3.out" });
    
    const mouse = { x: 0, y: 0 };
    
    // Center initially
    xToCursor(window.innerWidth / 2);
    yToCursor(window.innerHeight / 2);
    xToDot(window.innerWidth / 2);
    yToDot(window.innerHeight / 2);
    
    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Update GSAP targets
      xToCursor(mouse.x);
      yToCursor(mouse.y);
      xToDot(mouse.x);
      yToDot(mouse.y);
      
      if (!isVisible) setIsVisible(true);
    };
    
    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);
    
    const handleHoverEvents = (e) => {
       const target = e.target.closest("a, button, [role='button'], input, select, textarea, [data-cursor='hover']");
       setIsHovering(!!target);
    };

    const handleMouseDown = () => {
      playClickSound();
    };

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerleave", handleLeave);
    document.addEventListener("pointerenter", handleEnter);
    document.addEventListener("pointerover", handleHoverEvents);
    document.addEventListener("pointerout", handleHoverEvents);
    document.addEventListener("pointerdown", handleMouseDown);
    
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("pointerenter", handleEnter);
      document.removeEventListener("pointerover", handleHoverEvents);
      document.removeEventListener("pointerout", handleHoverEvents);
      document.removeEventListener("pointerdown", handleMouseDown);
    };
  }, [isVisible]);

  // Dynamic Classes based on state
  const cursorClasses = `custom-cursor ${!isVisible ? "is-hidden" : ""} ${isHovering ? "is-hovering" : ""}`;
  const dotClasses = `cursor-dot ${!isVisible ? "is-hidden" : ""} ${isHovering ? "is-hovering" : ""}`;

  return (
    <>
      <div ref={cursorRef} className={cursorClasses}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 49 62"
          aria-hidden="true"
        >
          <path
            fill="#9ff0edff"
            d="M48.06 39.546 2.14.38C1.424-.232.337.395.508 1.32l10.96 59.35c.168.903 1.36 1.123 1.838.34l11.406-18.694a1 1 0 0 1 .83-.48l21.893-.53c.917-.023 1.322-1.165.624-1.76Z"
          ></path>
        </svg>
      </div>
      <div ref={dotRef} className={dotClasses}>
        <span className="dot-text">CLICK</span>
      </div>
    </>
  );
};

export default Cursor;
