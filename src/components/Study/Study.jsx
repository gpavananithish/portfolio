import React, { useEffect, useRef } from "react";
import StudyCard from "./StudyCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoSchoolOutline } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";
import ScrollMouse from "../ui/ScrollMouse.jsx";
import SectionHeading from "../ui/SectionHeading";
import "./Study.css";

gsap.registerPlugin(ScrollTrigger);

const Study = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".timeline-item");
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
              toggleClass: "active",
            },
          }
        );

        const progressLine = item.querySelector(".timeline-line-progress");
        if (progressLine) {
          gsap.fromTo(
            progressLine,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 60%",
                end: "bottom 60%",
                scrub: 0.5,
              },
            }
          );
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const std1 = {
    name: "Vignan's Lara Institute of Technology & Science",
    course: "B.Tech in CSE",
    duration: "Sept 2021 - April 2025",
    score: "CGPA : 8.51",
    loc: "Vadlamudi, AP",
    color: "#2ad9e6",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Vignan%27s+Lara+Institute+of+Technology+%26+Science+Vadlamudi",
  };
  const std2 = {
    name: "Sri Chaitanya Junior College",
    course: "Intermediate - MPC",
    duration: "June 2019 - April 2021",
    score: "Percentage : 97.80",
    loc: "Hyderabad, TG",
    color: "#4facfe",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Chaitanya+Educational+Institutions+Medhaswi+Bhavan+Hyderabad",
  };
  const std3 = {
    name: "Sri Chaitanya Techno School",
    course: "SSC",
    duration: "July 2018 - May 2019",
    score: "GPA : 10.00",
    loc: "Nandyal, AP",
    color: "#10b981",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Sri+Chaitanya+Techno+School+Nandyal",
  };

  return (
    <div id="study">
      <SectionHeading 
        icon={<IoSchoolOutline />} 
        title="Education" 
        subtitle="My academic journey and continuous learning process."
      />
      <div className="timeline-container" ref={timelineRef}>
        <StudyCard std={std1} index={0} />
        <StudyCard std={std2} index={1} />
        <StudyCard std={std3} index={2} />
      </div>
      <HashLink className="scroll-link" to="/#experience">
        <ScrollMouse text1="Scroll down" text2="View Experience" />
      </HashLink>
    </div>
  );
};

export default Study;
