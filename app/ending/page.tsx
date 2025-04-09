'use client'

import Image from 'next/image';
import { useEffect } from 'react';
import { useAudio } from '@/components/AudioProvider';

export default function Ending() {
  const { play } = useAudio();
  
  // Ensure music continues on this page
  useEffect(() => {
    play();
  }, [play]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-8">不许反悔啦，周末一起出来玩吧(⁎⁍̴̛ᴗ⁍̴̛⁎)!</h1>
      <Image 
        src="/gif/ending.gif" 
        alt="Ending celebration" 
        width={400} 
        height={400}
        className="rounded-lg"
      />
    </div>
  );
}
