import React, { useState } from 'react';
import { RiTerminalBoxFill, RiMusic2Fill, RiCloseLine, RiApps2Fill } from 'react-icons/ri';
import Terminal from '../Terminal/Terminal';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './QuickActions.css';

const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className={`quick-actions-container ${isOpen ? 'active' : ''}`}>
        <div className="action-items">
          <div 
            className="action-btn terminal-trigger" 
            title="Open Terminal"
            onClick={() => {
              setIsTerminalOpen(true);
              setIsOpen(false);
            }}
          >
            <RiTerminalBoxFill />
          </div>
          
          <div className="action-btn music-trigger" title="Toggle Music">
             <AudioPlayer />
          </div>
        </div>

        <button className="main-toggle-btn" onClick={toggleMenu} title="Menu">
          {isOpen ? <RiCloseLine /> : <RiApps2Fill />}
        </button>
      </div>

      {isTerminalOpen && (
        <Terminal onClose={() => setIsTerminalOpen(false)} />
      )}
    </>
  );
};

export default QuickActions;
