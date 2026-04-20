import React from "react";
import { LuBookCheck } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { GrScorecard } from "react-icons/gr";
import { SiGooglestreetview } from "react-icons/si";
import { FaGraduationCap, FaSchool } from "react-icons/fa6";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";

import "./Study.css";

const StudyCard = ({ std, index }) => {
  const isLeft = index % 2 === 0;

  // Select a contextual icon based on the index or degree
  const getMainIcon = () => {
    if (index === 0) return <FaGraduationCap />;
    if (index === 1) return <HiOutlineBuildingLibrary />;
    return <FaSchool />;
  };

  return (
    <div className={`timeline-item ${isLeft ? "left-item" : "right-item"}`}>
      <div className="timeline-dot" style={{ borderColor: std.color }}>
        <div className="timeline-dot-inner" style={{ backgroundColor: std.color }}></div>
      </div>
      <div className="timeline-line">
        <div className="timeline-line-progress" style={{ backgroundColor: std.color }}></div>
      </div>
      
      <div className="timeline-content stdCard">
        <div className="stdCard-inner">
          {/* REFINED Inset-shadow header */}
          <a 
            href={std.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="card-header"
          >
          <div className="header-main-icon" style={{ color: std.color }}>
            {getMainIcon()}
          </div>
          <div className="map-hint">
            <SiGooglestreetview />
            <span>Click for Location</span>
          </div>
        </a>

        <div className="stdCard-details">
          <div className="course-badge" style={{ backgroundColor: `${std.color}10`, color: std.color, borderColor: `${std.color}30` }}>
             {std.course}
          </div>
          
          <h4 className="school-name">{std.name}</h4>
          
          <div className="info-grid">
            <div className="info-item">
              <IoCalendarOutline className="info-icon" />
              <span>{std.duration}</span>
            </div>
            
            <div className="info-item">
              <GrScorecard className="info-icon" />
              <span className="score-text">{std.score}</span>
            </div>
            
            <div className="info-item">
              <SiGooglestreetview className="info-icon" />
              <span>{std.loc}</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCard;
