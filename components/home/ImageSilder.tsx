import React, { useState, useRef } from 'react';

const ImageSlider = ({ left, right, largeLine }: { left: string, right: string, largeLine?: boolean }) => {
  const [position, setPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    draggingRef.current = true;
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
      className="relative"
      ref={sliderRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <div className="select-none pointer-events-none w-full h-full">
        <div className="w-full h-full rounded-sm overflow-hidden">
          <img src={right} alt="Image 1" className="object-cover w-full h-full" />
        </div>
        <div
          className="absolute w-full h-full left-0 top-0 rounded-sm overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img src={left} alt="Image 2" className="object-cover w-full h-full" />
        </div>
      </div>
      <div
        className="absolute top-0 left-0 cursor-pointer"
        style={{
          left: `${position}%`,
          width: '1px',
          height: '100%',
          backgroundColor: '#5B70F8',
          ...largeLine && {
            height: 'calc(100% + 40px)',
            transform: 'translateY(-20px)',
          },
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ImageSlider;
