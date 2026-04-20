import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';
import musicFile from '../../assets/Audio/vikramBgm.mp3';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Initial volume
    }
  }, []);

  return (
    <>
      <audio 
        ref={audioRef} 
        src={musicFile} 
        loop
        style={{ display: 'none' }} 
      />
      <div 
        id="music-button" 
        className={`music-btn ${isPlaying ? 'playing' : 'paused'}`} 
        onClick={togglePlay}
        style={{ display: 'flex', transition: '0.3s ease' }}
      >
        <div className="bars">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
