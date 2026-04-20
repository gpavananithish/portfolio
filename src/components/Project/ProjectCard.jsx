import React from "react";
import { FaGithub, FaImage, FaExternalLinkAlt } from "react-icons/fa";
import "./Projects.css";

const ProjectCard = ({ proj }) => {

  return (
    <div className="project_card">
      {/* Project Image Section */}
      <div className="project_image">
        <div className="project_image_wrapper">
          {/* Clickable Image */}
          <a href={proj.liveLink} target="_blank" rel="noreferrer">
            <img src={proj.image} alt={proj.name} className="main_proj_img" loading="lazy" />
          </a>
        </div>

        {/* Top Right Icons */}
        <div className="project_icons">
          {/* View Images */}
          <a href={proj.galleryLink} target="_blank" rel="noreferrer" title="View Images">
            <div className="icon_wrapper"><FaImage /></div>
          </a>

          {/* GitHub */}
          <a href={proj.gitLink} target="_blank" rel="noreferrer" title="GitHub">
            <div className="icon_wrapper"><FaGithub /></div>
          </a>

          {/* Live Link */}
          <a href={proj.liveLink} target="_blank" rel="noreferrer" title="Live Project">
            <div className="icon_wrapper"><FaExternalLinkAlt /></div>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="project_content">
        <h2 className="project_title">
          <span>{proj.name}</span> – {proj.tagline}
        </h2>

        <p className="project_description">
          {proj.desc}
        </p>

        <h3 className="tech_title">Tech Stack</h3>

        <div className="techStackGrid">
          {proj.techStack.map((tech, index) => (
            <div 
              key={index} 
              className="techChip" 
              style={{ 
                "--tech-color": tech.color,
                "--tech-color-alpha": `${tech.color}33`
              }}
            >
              <span className="techIcon" style={{ color: tech.color }}>{tech.icon}</span>
              <span className="techName">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* NEW Mobile Action Bar (Only visible on mobile) */}
        <div className="mobile_action_container">
          <h3 className="tech_title action_title">Quick Actions</h3>
          <div className="mobile_links">
            <a href={proj.gitLink} target="_blank" rel="noreferrer" className="mob_btn github" title="GitHub">
              <FaGithub />
            </a>
            <a href={proj.liveLink} target="_blank" rel="noreferrer" className="mob_btn live" title="Live Project">
              <FaExternalLinkAlt />
            </a>
            <a href={proj.galleryLink} target="_blank" rel="noreferrer" className="mob_btn gallery" title="View Images">
              <FaImage />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

