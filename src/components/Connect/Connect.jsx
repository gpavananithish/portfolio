import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaLinkedinIn, FaGithub, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../ui/SectionHeading";
import "./Connect.css";

gsap.registerPlugin(ScrollTrigger);

const Connect = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Info items stagger
      gsap.from(".infoItem", {
        scrollTrigger: {
          trigger: ".contactInfo",
          start: "top 80%",
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });

      // Form animation
      gsap.from(".contactForm", {
        scrollTrigger: {
          trigger: ".contactForm",
          start: "top 80%",
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate successful submission
    setShowSuccess(true);
    
    // Reset form
    if (formRef.current) {
      formRef.current.reset();
    }

    // Hide message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <section id="connect" className="connectSection" ref={sectionRef}>
      <SectionHeading 
        icon={<FaEnvelope />} 
        title="Connect With Me" 
        subtitle="Feel free to reach out for collaborations or just a friendly hello."
      />

      <div className="connectContainer">
        <div className="contactInfo">
          <div className="infoCard">
            <h3>Get in Touch</h3>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
            
            <div className="infoList">
              <div className="infoItem">
                <div className="iconBox"><FaEnvelope /></div>
                <div className="infoText">
                  <label>Email Me</label>
                  <a href="mailto:pavana9542@gmail.com">pavana9542@gmail.com</a>
                </div>
              </div>
              
              <div className="infoItem">
                <div className="iconBox"><FaPhoneAlt /></div>
                <div className="infoText">
                  <label>Call Me</label>
                  <a href="tel:+919542693558">+91 9542693558 </a>
                </div>
              </div>

              <div className="infoItem">
                <div className="iconBox"><FaMapMarkerAlt /></div>
                <div className="infoText">
                  <label>Location</label>
                  <span>Nandyal, Andhra Pradesh, India</span>
                </div>
              </div>
            </div>

            <div className="socialLinks">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="connectSocialIcon linkedin"><FaLinkedinIn /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="connectSocialIcon github"><FaGithub /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="connectSocialIcon instagram"><FaInstagram /></a>
              <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="connectSocialIcon whatsapp"><FaWhatsapp /></a>
            </div>

          </div>
        </div>

        <div className="contactForm">
          {showSuccess && (
            <div className="successOverlay">
              <div className="successMessage">
                <FaCheckCircle className="successIcon" />
                <h4>Message Sent!</h4>
                <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button className="closeSuccess" onClick={() => setShowSuccess(false)}>Dismiss</button>
              </div>
            </div>
          )}
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="formGroup">
              <input type="text" name="user_name" placeholder="Your Name" required />
            </div>
            <div className="formGroup">
              <input type="email" name="user_email" placeholder="Your Email" required />
            </div>
            <div className="formGroup">
              <input type="text" name="subject" placeholder="Subject" required />
            </div>
            <div className="formGroup">
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="submitBtn">
              <span>Send Message</span>
              <RiSendPlaneFill />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Connect;
