
import { useEffect, useRef } from 'react';

interface FloatingElementsProps {
  mousePosition: { x: number; y: number };
}

export const FloatingElements = ({ mousePosition }: FloatingElementsProps) => {
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const elements = elementsRef.current;
    
    elements.forEach((element, index) => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = mousePosition.x - centerX;
      const deltaY = mousePosition.y - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      const maxDistance = 300;
      const influence = Math.max(0, 1 - distance / maxDistance);
      
      const moveX = (deltaX / distance) * influence * 30;
      const moveY = (deltaY / distance) * influence * 30;
      const rotateX = (deltaY / distance) * influence * 20;
      const rotateY = (deltaX / distance) * influence * 20;
      const scale = 1 + influence * 0.3;
      
      element.style.transform = `
        translate3d(${moveX}px, ${moveY}px, 0)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
    });
  }, [mousePosition]);

  const shapes = [
    { type: 'sphere', delay: 0 },
    { type: 'cube', delay: 0.5 },
    { type: 'pyramid', delay: 1 },
    { type: 'torus', delay: 1.5 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {shapes.map((shape, index) => (
        <div
          key={index}
          ref={el => elementsRef.current[index] = el!}
          className={`absolute w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl
            transition-all duration-300 ease-out animate-pulse`}
          style={{
            left: `${20 + (index * 20)}%`,
            top: `${30 + (index * 15)}%`,
            animationDelay: `${shape.delay}s`,
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-300/20 to-emerald-500/20" />
          {/* Inner glow effect */}
          <div className="absolute inset-2 rounded-xl bg-white/5 animate-pulse" 
               style={{ animationDelay: `${shape.delay + 1}s` }} />
        </div>
      ))}
    </div>
  );
};
