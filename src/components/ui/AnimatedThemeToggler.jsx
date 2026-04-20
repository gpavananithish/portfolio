import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { flushSync } from 'react-dom';
import gsap from 'gsap';
import './AnimatedThemeToggler.css';

export function AnimatedThemeToggler({ className = "", duration = 400 }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const buttonRef = useRef(null);
  const iconRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current || !iconRef.current) return;
    
    // Get button dimensions and raw mouse position
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate center distance (-1 to +1 range roughly)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (x - centerX) / centerX;
    const moveY = (y - centerY) / centerY;

    // Slight parallax movement (adjust max distance as needed)
    gsap.to(iconRef.current, {
      x: moveX * 5,
      y: moveY * 5,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!iconRef.current) return;
    // Reset position smoothly
    gsap.to(iconRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleToggle = async (e) => {
    e.preventDefault();
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
      });
    }).ready;

    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <button
      ref={buttonRef}
      className={`simple-theme-toggle ${isDark ? 'dark' : 'light'} ${className}`}
      onClick={handleToggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Toggle Theme"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div ref={iconRef} className="simple-theme-toggle__icon" style={{ display: 'flex' }}>
            {isDark ? (
              <FiMoon size={22} color="#ffffff" />
            ) : (
              <FiSun size={22} color="#f3a600ff" />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
