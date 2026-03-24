import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  threshold?: number;
}

export function ScrollReveal({ 
  children,  
  // direction = 'up', 
  delay = 0,
  threshold = 0.1 
}: ScrollRevealProps) {
  const [, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: unobserve after revealing
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // const directionClass = {
  //   up: '',
  //   left: 'reveal-left',
  //   right: 'reveal-right',
  //   scale: 'reveal-scale'
  // }[direction];

  return (
    <div
      ref={ref}
      className="reveal-hidden reveal-visible pt-[0px] pb-[0px] ml-[0px] mr-[0px] mt-[50px] mb-[50px]"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
