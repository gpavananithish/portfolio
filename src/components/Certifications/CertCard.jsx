import { LuSquareArrowOutUpRight } from "react-icons/lu";
import './Certifications.css';

const CertCard = ({ cert }) => {
  const { title, issuer, date, score, link, icon, color } = cert;

  return (
    <div className="certCard">
      <div className="certCardContent">
        <div className="certIcon" style={{ color: color }}>
          {icon}
        </div>
        <div className="certInfo">
          <h3 className="certTitle">{title}</h3>
          <p className="certIssuer">{issuer}</p>
          <div className="certMeta">
            <span className="certDate">{date}</span>
            {score && <span className="certScore">{score}</span>}
          </div>
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="certLink"
          style={{ 
            backgroundColor: color, 
            '--glow-color': color // Pass color to CSS for glow
          }} 
          aria-label={`View ${title} certificate`}
        >
          <span>View Certificate</span>
          <LuSquareArrowOutUpRight className="btnIcon" />
        </a>
      </div>
    </div>
  );
};

export default CertCard;
