import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import SliderButton from '@/assets/icon/SliderButton';

const ImageSlider = ({ left, right, largeLine }: {
  left: string,
  right: string,
  largeLine?: boolean,
}) => {
  const [position, setPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    setPosition(50);
  }, [left]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    draggingRef.current = true;
    handleMouseMove(e.nativeEvent);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current || !sliderRef.current) return;

    const sliderWidth = sliderRef.current.clientWidth;
    const offsetX = e.clientX - sliderRef.current.getBoundingClientRect().left;
    const newPosition = Math.min(Math.max((offsetX / sliderWidth) * 100, 0), 100);
    setPosition(newPosition);
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="relative w-full"
      ref={sliderRef}
      style={{
        paddingTop: '58%'
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute inset-0 select-none w-full h-full rounded-sm overflow-hidden cursor-pointer"
      >
        <div className="w-full h-full pointer-events-none">
          <Image
            src={right}
            fill
            alt="Image 1"
            className="object-cover w-full h-full"
          />
        </div>
        <div
          className="absolute w-full h-full left-0 top-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={left}
            fill
            alt="Image 2"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div
        className="absolute w-[1rem] top-0 left-0 cursor-pointer"
        style={{
          left: `calc(${position}% - 0.5rem)`,
          height: '100%',
          ...largeLine && {
            height: 'calc(100% + 40px)',
            transform: 'translateY(-20px)',
          },
        }}
      >
        <div className="w-[2px] h-full bg-[#5B70F8] absolute top-0 left-[50%] transform -translate-x-1/2"></div>
        <div className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-[50%] shadow-gray-950 shadow-2xl'>
          <SliderButton />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
