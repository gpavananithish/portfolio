import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
import musicFile from '../assets/Audio/Man of Steel.mp3';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create the audio instance once
    audioRef.current = new Audio(musicFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playMusic = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Autoplay blocked or audio error:", err);
      });
    }
  };

  const pauseMusic = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const openTerminal = () => setIsTerminalOpen(true);
  const closeTerminal = () => setIsTerminalOpen(false);

  return (
    <MusicContext.Provider value={{ 
      isPlaying, togglePlay, playMusic, pauseMusic, 
      isTerminalOpen, openTerminal, closeTerminal 
    }}>
      {children}
    </MusicContext.Provider>
  );
};
