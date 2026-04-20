import React from "react";

import { FaRegBuilding } from "react-icons/fa";
import { FiToggleLeft, FiToggleRight } from "react-icons/fi";

import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import "./Experience.css";
const ExpCard = ({ exp }) => {
  return (
    <div className="expCard">
      <div className="expCardContent">
        <div className="expHeader">
          <div className="roleInfo">
            <h2>{exp.role}</h2>
            <div className="compDetails">
              <span className="compName">
                <FaRegBuilding className="expIcon" /> {exp.compName}
              </span>
              <span className="duration">
                <IoCalendarOutline className="expIcon" /> {exp.duration}
              </span>
              <span className="location">
                <IoLocationOutline className="expIcon" /> {exp.location}
              </span>
            </div>
          </div>
        </div>

        <div className="expBody">
          <div className="expDesc">
            <ul>
              {exp.description.map((desc, idx) => (
                <li key={idx}>{desc}</li>
              ))}
            </ul>
          </div>
          
          <div className="expTech">
            <h4>Tech Stack</h4>
            <div className="techGrid">
              {exp.techStack.map((skill, idx) => (
                <div key={idx} className="techItem" style={{ "--skill-color": skill.color }}>
                  <span className="techIcon" style={{ color: skill.color }}>
                    {skill.skIcon}
                  </span>
                  <span className="techName">{skill.skName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ExpCard;
