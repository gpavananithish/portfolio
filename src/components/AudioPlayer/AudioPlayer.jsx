import React from 'react';
import { useMusic } from '../../context/MusicContext';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const { isPlaying, togglePlay } = useMusic();

  return (
    <div 
      id="music-button" 
      className={`music-btn ${isPlaying ? 'playing' : 'paused'}`} 
      onClick={(e) => {
        e.stopPropagation();
        togglePlay();
      }}
      style={{ display: 'flex', transition: '0.3s ease' }}
    >
      <div className="bars">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default AudioPlayer;
