'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAudio } from '@/components/AudioProvider';

const GrowingButtons = () => {
  const [clickCount, setClickCount] = useState(0);
  const [leftButtonSize, setLeftButtonSize] = useState(1);
  const rightButtonText = useMemo(() => ['拒绝', '再给你一次机会', '能不能给人家个机会嘛','欲擒故纵，我懂','保证你每天都会很开心','零花钱都给你', '再好好想想，女人'], []);
  const [gifYOffset, setGifYOffset] = useState(0); // Control the Y position of the GIF
  const { play } = useAudio();
  
  // Array of available GIFs
  const gifs = useMemo(() => [
    'cutie.gif',
    'flower.gif',
    'circle.gif',
    'nerve.gif',
    'song.gif',
    'car.gif',
    'trait.gif',
  ], []);

  const MAX_CLICK_COUNT = 6;
  
  // Current GIF based on clickCount
  const currentGif = useMemo(() => {
    return gifs[Math.min(clickCount, MAX_CLICK_COUNT) % gifs.length];
  }, [clickCount, gifs]);

  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const [leftButtonHeight, setLeftButtonHeight] = useState(0);

  // Calculate the button width once when it mounts or when size changes
  useEffect(() => {
    if (leftButtonRef.current) {
      const baseHeight = leftButtonRef.current.offsetHeight;
      setLeftButtonHeight(baseHeight * leftButtonSize);
    }
  }, [leftButtonSize]);

  // Ensure audio plays on user interaction
  const ensureAudioPlays = useCallback(() => {
    play();
  }, [play]);

  useEffect(() => {
    ensureAudioPlays();
  });

  // Add useEffect to prevent scrolling
  useEffect(() => {
    // Disable scrolling when component mounts
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Adjust GIF Y position based on click count
  useEffect(() => {
    // Move the GIF upward as click count increases
    setGifYOffset(prevOffset => Math.min(prevOffset - 5, -50));
  }, [clickCount]);

  const handleRightButtonClick = useCallback(() => {
    setClickCount(prevCount => prevCount + 1);
    setLeftButtonSize(prevSize => prevSize + 1);
    ensureAudioPlays();
  }, [ensureAudioPlays]);

  // Memoize the text to display based on click count
  const currentRightButtonText = useMemo(() => {
    return rightButtonText[Math.min(clickCount, MAX_CLICK_COUNT) % rightButtonText.length];
  }, [clickCount, rightButtonText]);

  // Add function to prevent scrolling when using the mouse wheel
  const preventScroll = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  // Memoize styles to avoid recalculation on every render
  const leftButtonStyle = useMemo(() => ({
    transform: `scale(${leftButtonSize})`,
    bottom: `calc(100% - ${leftButtonHeight / 2 + 0}px)`,
    zIndex: 10
  }), [leftButtonSize, leftButtonHeight]);

  const rightButtonStyle = useMemo(() => ({
  
    bottom: `calc(100% - ${leftButtonHeight + 30}px)`,
    minWidth: 'max-content',
    zIndex: 5
  }), [leftButtonHeight]);

  const gifContainerStyle = useMemo(() => ({
    transform: `translateY(${gifYOffset}px)`,
    transition: 'transform 0.5s ease-out'
  }), [gifYOffset]);

  return (
    <div 
      className="flex flex-col items-center gap-8 w-full"
      onWheel={preventScroll}
      onClick={ensureAudioPlays}
    > 
      <div 
        className="relative w-[200px] h-[200px] mb-4" 
        style={gifContainerStyle}
      >
        <Image
          src={`/gif/${currentGif}`}
          alt="Animation"
          fill
          style={{ objectFit: "contain" }}
          priority
        />
        <div className="absolute -bottom-20 left-0 right-0 text-center p-2 text-black font-bold">
          {"可以和Catherine妹妹当每天都能聊天的好朋友吗？"}
        </div>
      </div>
      
      <div className="relative flex items-center justify-center w-full max-w-md h-24">
        <Button 
          ref={leftButtonRef}
          className="absolute bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md"
          style={leftButtonStyle}
          onClick={() => {
            ensureAudioPlays();
            window.location.href = '/ending';
          }}
        >
          答应
        </Button>
        
        <Button 
          className="absolute bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md whitespace-nowrap overflow-visible"
          style={rightButtonStyle}
          onClick={handleRightButtonClick}
        >
          {currentRightButtonText}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(GrowingButtons);
