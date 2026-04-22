import React from 'react';
import { RiTerminalBoxFill } from 'react-icons/ri';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import { useMusic } from '../../context/MusicContext';
import './QuickActions.css';

const QuickActions = () => {
  const { openTerminal } = useMusic();

  return (
    <div className="quick-actions-container">
      {/* Standalone Action Buttons for Desktop */}
      <div className="action-btn music-trigger" title="Toggle Music">
         <AudioPlayer />
      </div>
      
      <div 
        className="action-btn terminal-trigger" 
        title="Open Terminal"
        onClick={openTerminal}
      >
        <RiTerminalBoxFill />
      </div>
    </div>
  );
};

export default QuickActions;
