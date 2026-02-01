"use client";

import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    const header = document.getElementById('header-inner');
    if (!header) return;

    const scrolledClass = 'bg-white/60 backdrop-blur-md shadow-md gap-12 py-0 w-max px-6';
    const defaultClass = 'w-full sm:px-4';
    const threshold = header.clientHeight || 60;

    const onScroll = () => {
      if (window.scrollY > threshold) {
        header.classList.add(...scrolledClass.split(' '));
        header.classList.remove(...defaultClass.split(' '));
      } else {
        header.classList.remove(...scrolledClass.split(' '));
        header.classList.add(...defaultClass.split(' '));
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll(); // 初始化

    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [])

  return null;
}
