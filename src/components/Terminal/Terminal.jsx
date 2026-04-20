import React, { useState, useEffect, useRef } from "react";
import { RiTerminalBoxLine, RiCommandLine } from "react-icons/ri";
import { FaTerminal } from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import "./Terminal.css";

const Terminal = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", content: "GPN-OS [Version 1.0.42]" },
    { type: "output", content: "Initialization complete. All systems nominal." },
    { type: "output", content: "Type 'help' for the global command registry." },
  ]);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const projectDetails = {
    live: "LIVER CIRRHOSIS PREDICTOR: AI diagnostic platform using ML to predict staging. Tech: Django, React, Python, SQLite, Gemini AI.",
    spac: "INDIAN SPACE AGENCY (ISA): Educational gateway for cosmic achievements with 3D solar system. Tech: HTML5, CSS3, JavaScript (Glassmorphism).",
    weather: "WEATHER FORECAST (WFC): Cinematic real-time weather tracking using OpenWeatherMap API. Tech: HTML, CSS, JS, GSAP Animations."
  };

  const commands = {
    help: "REGISTRY: [info] [tech] [work] [expe] [cert] [mail] [edu ] [sys ] [cls ] [exit]",
    info: "Gunda Pavana Nithish: Full-stack Developer specialized in Python & React. Passionate about AI integration and high-fidelity UI.",
    tech: "PYTHON, JAVA, JAVASCRIPT, REACT, DJANGO, SQLITE, GSAP, CSS3, HTML5, GIT, AWS(Basic).",
    work: "PROJECTS: [live] - ML Staging, [spac] - 3D Solar, [weather] - GSAP Forecast. Use 'work [name]'.",
    expe: "EXPERIENCE:\n1. Wipro (Jan 24 - Present): Java Full Stack Intern\n2. Octanet (Jun 23 - Aug 23): Web Development Intern",
    cert: "CREDENTIALS: AWS Cloud Found., Python Ess., NPTEL Java (Elite), Oracle Cloud Infra Found.",
    edu : "EDUCATION: B.Tech in CSE @ Vignan's Lara (CGPA: 8.51). Inter @ Sri Chaitanya (97.8%).",
    mail: "CONNECT: pavana9542@gmail.com | +91 9542693558 | LinkedIn: @pavana-nithish",
    sys : "KERNEL: GPN-v1.0 | UPTIME: Active | NODE: React_Environment | STATUS: Accepting Opportunities",
    cls : "CLEAR_COMMAND"
  };

  const scrollToBottom = () => {
    const body = document.getElementById("terminalBody");
    if (body) body.scrollTop = body.scrollHeight;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const fullCmd = input.toLowerCase().trim();
    const args = fullCmd.split(" ");
    const cmd = args[0];

    if (cmd === "exit") {
      onClose();
      return;
    }

    if (fullCmd === "") return;

    const newHistory = [...history, { type: "input", content: `gpndev@portfolio:~$ ${input}` }];

    if (cmd === "cls") {
      setHistory([]);
    } else if (cmd === "work" && args[1] && projectDetails[args[1]]) {
      newHistory.push({ type: "output", content: projectDetails[args[1]] });
      setHistory(newHistory);
    } else if (commands[cmd]) {
      if (cmd === "help") {
        newHistory.push({ type: "output", isHelp: true });
      } else {
        newHistory.push({ type: "output", content: commands[cmd] });
      }
      setHistory(newHistory);
    } else {
      newHistory.push({ type: "output", content: `ERR_404: Command '${cmd}' not recognized. Try 'help'.` });
      setHistory(newHistory);
    }

    setInput("");
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window full-screen mac-style" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-top-bar">
          <div className="mac-dots">
            <span className="mac-dot close" onClick={onClose}></span>
            <span className="mac-dot minimize"></span>
            <span className="mac-dot maximize"></span>
          </div>
          <span className="window-label">GPN: ~ (cli)</span>
          <div className="right-controls">
            <button className="mac-close-text" onClick={onClose}>Close [esc]</button>
          </div>
        </div>
        <div className="terminal-body" id="terminalBody" onClick={() => inputRef.current?.focus()}>
          {history.map((line, index) => (
            <div key={index} className={`terminal-line ${line.type}`}>
              {line.isHelp ? (
                <div className="command-grid">
                  <div className="grid-item"><span>info</span> - Summary</div>
                  <div className="grid-item"><span>tech</span> - Stack</div>
                  <div className="grid-item"><span>work</span> - Projects</div>
                  <div className="grid-item"><span>expe</span> - Experience</div>
                  <div className="grid-item"><span>cert</span> - Credentials</div>
                  <div className="grid-item"><span>edu </span> - Academia</div>
                  <div className="grid-item"><span>mail</span> - Contact</div>
                  <div className="grid-item"><span>sys </span> - OS Info</div>
                  <div className="grid-item"><span>cls </span> - Clear</div>
                  <div className="grid-item"><span>exit</span> - Close App</div>
                </div>
              ) : (
                line.content.split('\n').map((l, i) => <div key={i}>{l}</div>)
              )}
            </div>
          ))}
          
          <form className="terminal-input-form" onSubmit={handleCommand}>
            <span className="terminal-prompt">gpndev@portfolio:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="terminal-input"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
