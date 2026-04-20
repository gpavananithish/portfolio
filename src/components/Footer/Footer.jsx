import React from "react";
import { HashLink } from "react-router-hash-link";
import { FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaReact } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footerMain">
      <div className="footerContainer">
        {/* Column 1: About */}
        <div className="footerCol aboutCol">
          <h2 className="footerLogo">Gunda Pavana Nithish</h2>
          <p className="footerBio">
            A passionate Software Developer dedicated to building high-performance, design-forward applications that solve real-world problems.
          </p>
          <div className="footerContactBrief">
            <div className="briefItem">
              <FaMapMarkerAlt /> 
              <span>Nandyal, Andhra Pradesh, India</span>
            </div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footerCol linksCol">
          <h3>Quick Links</h3>
          <ul className="footerNav">
            <li><HashLink to="/#header">Home</HashLink></li>
            <li><HashLink to="/#about">About Me</HashLink></li>
            <li><HashLink to="/#study">Education</HashLink></li>
            <li><HashLink to="/#experience">Experience</HashLink></li>
            <li><HashLink to="/#certifications">Certifications</HashLink></li>
            <li><HashLink to="/#projects">Projects</HashLink></li>
            <li><HashLink to="/#connect">Contact</HashLink></li>
          </ul>
        </div>

        {/* Column 3: Social & Contact */}
        <div className="footerCol socialCol">
          <h3>Get In Touch</h3>
          <div className="contactDetails">
            <a href="mailto:pavana9542@gmail.com" className="contactLink">
              <FaEnvelope /> pavana9542@gmail.com
            </a>
            <a href="tel:+919542693558" className="contactLink">
              <FaPhoneAlt /> +91 95426 93558
            </a>
          </div>
          <div className="footerSocials">
            <a href="https://linkedin.com/in/pavana-nithish" target="_blank" rel="noreferrer" className="sLink linkedin"><FaLinkedinIn /></a>
            <a href="https://github.com/gpavananithish" target="_blank" rel="noreferrer" className="sLink github"><FaGithub /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="sLink instagram"><FaInstagram /></a>
            <a href="https://wa.me/919542693558" target="_blank" rel="noreferrer" className="sLink whatsapp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <div className="bottomLine"></div>
        <div className="footerCredit">
          <p className="copyright">
            &copy; {currentYear} <span className="highlight">Gunda Pavana Nithish</span>
          </p>
          <p className="madeWith">
            Made with React<FaReact className="reactIcon" />
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
