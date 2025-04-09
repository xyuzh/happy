'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/bg.mp3');
    
    if (audioRef.current) {
      audioRef.current.loop = true;
      
      // Try to play audio (may be blocked by browser autoplay policy)
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Auto-play was prevented
            setIsPlaying(false);
            console.log("Autoplay prevented. User interaction needed to play audio.");
          });
      }
    }

    // Set up document-level click handler to enable audio
    const handleDocumentClick = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Could not play audio:", err));
      }
    };

    document.addEventListener('click', handleDocumentClick);

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const play = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Could not play audio:", err));
    }
  };

  const pause = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider; 