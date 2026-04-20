import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import ScrollMouse from "../ui/ScrollMouse.jsx";
import { GiSkills } from "react-icons/gi";
import SectionHeading from "../ui/SectionHeading";

// Icon Imports
import { 
  SiC, 
  SiCplusplus, 
  SiPython, 
  SiJavascript, 
  SiHtml5, 
  SiCss3, 
  SiBootstrap, 
  SiMysql, 
  SiMongodb, 
  SiDjango, 
  SiEclipseide, 
  SiGithub,
  SiSqlite,
} from "react-icons/si";
import { TbUserCheck } from "react-icons/tb";
import { FaJava, FaReact, FaGitAlt } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { RiGeminiFill } from "react-icons/ri";
import { DiDatabase } from "react-icons/di";

import SkillButton from "./SkillButton";
import "./Skills.css";

const Skills = () => {
  const skillsData = {
    c: { name: "C", icon: <SiC />, color: "#A8B9CC" },
    cpp: { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
    java: { name: "Java", icon: <FaJava />, color: "#f8981d" },
    python: { name: "Python", icon: <SiPython />, color: "#3776AB" },
    html: { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
    css: { name: "CSS", icon: <SiCss3 />, color: "#1572B6" },
    bootstrap: { name: "Bootstrap", icon: <SiBootstrap />, color: "#7952B3" },
    javascript: { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
    sql: { name: "SQL", icon: <DiDatabase />, color: "#4479A1" },
    mysql: { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
    sqlite: { name: "SQLite3", icon: <SiSqlite />, color: "#003B57" },
    mongodb: { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    django: { name: "Django", icon: <SiDjango />, color: "#092E20" },
    react: { name: "React", icon: <FaReact />, color: "#61DAFB" },
    vscode: { name: "VS Code", icon: <VscVscode />, color: "#007ACC" },
    eclipse: { name: "Eclipse", icon: <SiEclipseide />, color: "#2C2255" },
    git: { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
    github: { name: "GitHub", icon: <SiGithub />, color: "#181717" },
    testing: { name: "Manual-Testing", icon: <TbUserCheck />, color: "#E33332" },
    gemini: { name: "Gemini-AI", icon: <RiGeminiFill />, color: "#4facfe" },
  };

  const skillSet = [
    { skillType: "All", skills: Object.values(skillsData) },
    { skillType: "Languages", skills: [skillsData.cpp, skillsData.c, skillsData.java, skillsData.python, skillsData.javascript, skillsData.sql] },
    { skillType: "Frontend", skills: [skillsData.html, skillsData.css, skillsData.bootstrap, skillsData.javascript, skillsData.react] },
    { skillType: "Backend", skills: [skillsData.python, skillsData.django, skillsData.java] },
    { skillType: "Databases", skills: [skillsData.sql, skillsData.mysql, skillsData.mongodb, skillsData.sqlite] },
    { skillType: "Tools", skills: [skillsData.vscode, skillsData.eclipse, skillsData.git, skillsData.github, skillsData.gemini, skillsData.testing] },
  ];

  const [activeType, setActiveType] = useState("All");
  const [activeSkills, setActiveSkills] = useState(skillSet[0].skills);

  const getMarqueeSkills = (skills) => {
    // Repeat the skills array enough times to ensure smooth infinite scrolling
    const minItems = 20; 
    let repeated = [...skills];
    while (repeated.length < minItems) {
      repeated = [...repeated, ...skills];
    }
    return [...repeated, ...repeated]; // Double for translateX(-50%)
  };

  const allSkills = Object.values(skillsData);
  const half = Math.ceil(allSkills.length / 2);
  const mobileRow1 = allSkills.slice(0, half);
  const mobileRow2 = allSkills.slice(half);

  return (
    <div id="skills">
      <SectionHeading 
        icon={<GiSkills />} 
        title="Technical Skills" 
      />
      
      {/* Filters (Desktop Only) */}
      <div className="skillType desktopOnly">
        {skillSet.map((item, index) => (
          <SkillButton
            key={index}
            type={item.skillType}
            active={activeType === item.skillType}
            onClick={() => {
              setActiveType(item.skillType);
              setActiveSkills(item.skills);
            }}
          />
        ))}
      </div>

      <div className="skillValues">
        {/* Desktop View: Single Filtered Row */}
        <div 
          className="skillTrack desktopTrack row-1" 
          style={{ "--duration": `${getMarqueeSkills(activeSkills).length * 1.5}s` }}
        >
          {getMarqueeSkills(activeSkills).map((skill, index) => (
            <div key={index} className="skillValue" style={{ '--skill-color': skill.color }}>
              <div className="skillIcon" style={{ color: skill.color }}>{skill.icon}</div>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Mobile View: Dual All-Skills Rows */}
        <div className="mobileTracks">
          <div 
            className="skillTrack row-1" 
            style={{ "--duration": `${mobileRow1.length * 5}s` }}
          >
            {getMarqueeSkills(mobileRow1).map((skill, index) => (
              <div key={index} className="skillValue" style={{ '--skill-color': skill.color }}>
                <div className="skillIcon" style={{ color: skill.color }}>{skill.icon}</div>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
          <div 
            className="skillTrack row-2" 
            style={{ "--duration": `${mobileRow2.length * 5}s` }}
          >
            {getMarqueeSkills(mobileRow2).map((skill, index) => (
              <div key={index} className="skillValue" style={{ '--skill-color': skill.color }}>
                <div className="skillIcon" style={{ color: skill.color }}>{skill.icon}</div>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HashLink className="scroll-link" to="/#projects">
        <ScrollMouse text1="Scroll down" text2="View My Projects" />
      </HashLink>
    </div>
  );
};

export default Skills;
