import { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaToggleOn, FaToggleOff, FaUserTie } from "react-icons/fa";
import { RiLinkedinBoxLine } from "react-icons/ri";
import { IoIosFlashOff } from "react-icons/io";
import { FaLaptopCode, FaGripLinesVertical, FaCode } from "react-icons/fa6";
import { FiGithub, FiPhoneOutgoing, FiSun, FiMoon } from "react-icons/fi";
import { MdOutlineCases } from "react-icons/md";
import { TbMessagePlus } from "react-icons/tb";
import { IoMailOutline } from "react-icons/io5";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { Typewriter } from "react-simple-typewriter";
import ScrollMouse from "../ui/ScrollMouse.jsx";
import { IoSchoolOutline } from "react-icons/io5";
import { PiCertificate } from "react-icons/pi";
import "./Header.css";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { AnimatedThemeToggler } from "../ui/AnimatedThemeToggler";
import { useMusic } from "../../context/MusicContext";
import { RiTerminalBoxFill } from "react-icons/ri";
import AudioPlayer from "../AudioPlayer/AudioPlayer";


function Header() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showBg, setShowBg] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openTerminal } = useMusic();
  const isClickingRef = useRef(false);

  const menuItems = [
    {
      hash: "#about",
      label: "About",
      icon: <FontAwesomeIcon icon={faAddressCard} />,
    },
    { hash: "#study", label: "Study", icon: <IoSchoolOutline /> },
    { hash: "#experience", label: "Profile", icon: <FaUserTie /> },
    {
      hash: "#certifications",
      label: "Certifications",
      icon: <PiCertificate />,
    },
    { hash: "#skills", label: "Skills", icon: <MdOutlineCases /> },
    { hash: "#projects", label: "Projects", icon: <FaLaptopCode /> },
    { hash: "#connect", label: "Connect", icon: <TbMessagePlus /> },
  ];

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      // Don't update based on scroll position if the user just clicked a nav link
      if (isClickingRef.current) return;
      
      // Offset so the item highlights when it comes into view (approx 200px from top)
      const scrollPosition = window.scrollY + 250; 
      
      let currentIndex = -1;
      
      // Check from bottom to top to find the deepest section we have scrolled past
      for (let i = menuItems.length - 1; i >= 0; i--) {
        const sectionId = menuItems[i].hash.substring(1);
        const section = document.getElementById(sectionId);
        
        if (section && section.offsetTop <= scrollPosition) {
          currentIndex = i;
          break;
        }
      }

      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
        setShowBg(true);
      } else {
        // If we are above all sections
        setActiveIndex(-1);
        setShowBg(false);
      }
    };

    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isClickingRef.current = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollEnd);
    setTimeout(handleScroll, 100); // Check on initial load

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollEnd);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleNavClick = (index) => {
    isClickingRef.current = true;
    setActiveIndex(index);
    setShowBg(true);
  };

  return (
    <>
      <header className="header">
        <div className="left">
          <HashLink
            to="/#"
            style={{ textDecoration: "none", color: "var(--text-color)" }}
          >
            <span>&gt;&gt;</span>
            {/* <span className="name">&#608;&#420;&#627;</span> */}
            <span className="nameLogo">
              <span className="mainName">GPN<span className="devSuffix">.dev/</span></span>
              <span className="subName">Developer</span>
            </span>
            {/* <span>&gt;&gt;</span> */}
          </HashLink>
        </div>

        <div className="middle">
          {menuItems.map((item, index) => (
            <HashLink
              key={item.hash}
              to={`/${item.hash}`}
              className={
                "iconLink " + (activeIndex === index ? "active" : "")
              }
              onClick={() => handleNavClick(index)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </HashLink>
          ))}

          {/* Sliding Background */}
          <div
            className={`bg ${showBg ? "show" : ""}`}
            style={{
              transform: `translateX(${activeIndex * 76.5}px)`,
            }}
          ></div>
        </div>

        <div className="right">
          <NavLink
            to="https://mail.google.com/mail/?view=cm&fs=1&to=pavana9542@gmail.com"
            target="_blank"
            className="socialLink mailLink"
          >
            <IoMailOutline className="socialIcon" />
          </NavLink>
          <NavLink
            to="https://github.com/gpavananithish"
            target="_blank"
            className="socialLink githubLink"
          >
            <FiGithub className="socialIcon" />
          </NavLink>
          <NavLink
            to="https://linkedin.com/in/pavana-nithish"
            target="_blank"
            className="socialLink linkedinLink"
          >
            <RiLinkedinBoxLine className="socialIcon" />
          </NavLink>

          <div className="mobile-header-controls">
            <button 
              className="mobile-action-btn terminal-trigger" 
              onClick={openTerminal}
              title="Open Terminal"
            >
              <RiTerminalBoxFill />
            </button>
            <div className="mobile-action-btn music-trigger">
              <AudioPlayer />
            </div>
          </div>

          <AnimatedThemeToggler />
        </div>
      </header>
      <div className="myInfo">
        <div className="main-hero-content">
          <h1 className="hero-greeting h6">Hi, I'm</h1>
          <h1 className="display-5 hero-name">Gunda Pavana Nithish</h1>
          <div className="typewriter-wrapper">
            <span className="u">
              <Typewriter
                className="typewriter"
                words={[
                  "Programmer",
                  "Software Developer ",
                  "UI/UX Designer",
                  "Gamer",
                ]}
                loop={true}
                cursor={false}
                typeSpeed={60}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
            <span className="dollar">|</span>
          </div>

          <div className="myLinks d-flex justify-content-center gap-3">
            <HashLink className="btn btn-primary myBtn1" to="/#projects">
              <FaCode className="me-3 rounded-5" />
              View Projects
            </HashLink>
            <HashLink className="btn btn-light myBtn2" to="/#connect">
              <FiPhoneOutgoing className="me-3" />
              Contact Me
            </HashLink>
          </div>
        </div>

        <div className="hero-scroll-container">
          <HashLink className="scroll-link hero-scroll" to="/#about">
            <ScrollMouse text1="Scroll down" text2="Explore About" />
          </HashLink>
        </div>
      </div>
    </>
  );
}

export default Header;
