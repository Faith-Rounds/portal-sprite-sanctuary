
import { useEffect, useRef } from 'react';

interface FloatingWoodenElementsProps {
  mousePosition: { x: number; y: number };
}

export const FloatingWoodenElements = ({ mousePosition }: FloatingWoodenElementsProps) => {
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
      
      const maxDistance = 250;
      const influence = Math.max(0, 1 - distance / maxDistance);
      
      const moveX = (deltaX / distance) * influence * 25;
      const moveY = (deltaY / distance) * influence * 25;
      const rotateX = (deltaY / distance) * influence * 15;
      const rotateY = (deltaX / distance) * influence * 15;
      const scale = 1 + influence * 0.2;
      
      element.style.transform = `
        translate3d(${moveX}px, ${moveY}px, 0)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
    });
  }, [mousePosition]);

  const shapes = [
    { type: 'cube', delay: 0 },
    { type: 'cylinder', delay: 0.5 },
    { type: 'sphere', delay: 1 },
    { type: 'pyramid', delay: 1.5 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {shapes.map((shape, index) => (
        <div
          key={index}
          ref={el => elementsRef.current[index] = el!}
          className={`absolute w-16 h-16 bg-wood-primary/15 backdrop-blur-md border-2 border-wood-secondary/30 rounded-2xl
            transition-all duration-300 ease-out float-animation wooden-glow`}
          style={{
            left: `${15 + (index * 18)}%`,
            top: `${25 + (index * 12)}%`,
            animationDelay: `${shape.delay}s`,
            boxShadow: '0 8px 32px hsl(var(--wood-primary) / 0.2)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-warm-orange/30 to-wood-secondary/30 wood-texture" />
          {/* Inner wooden grain effect */}
          <div className="absolute inset-2 rounded-xl bg-cream/10 animate-pulse wood-texture" 
               style={{ animationDelay: `${shape.delay + 1}s` }} />
        </div>
      ))}
    </div>
  );
};
