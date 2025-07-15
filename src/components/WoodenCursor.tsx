
import { useEffect, useState } from 'react';

interface WoodenCursorProps {
  position: { x: number; y: number };
}

export const WoodenCursor = ({ position }: WoodenCursorProps) => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const newTrail = {
      x: position.x,
      y: position.y,
      id: Date.now()
    };

    setTrail(prev => [...prev.slice(-6), newTrail]);
  }, [position]);

  return (
    <>
      {/* Main Wooden Cursor */}
      <div
        className="fixed w-8 h-8 pointer-events-none z-[100] mix-blend-multiply"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="w-full h-full bg-wood-primary rounded-full shadow-lg border-2 border-wood-secondary/30">
          <div className="w-full h-full bg-gradient-to-br from-warm-orange/40 to-wood-primary rounded-full animate-pulse opacity-70" />
        </div>
      </div>

      {/* Wooden Aura Effect */}
      <div
        className="fixed w-24 h-24 pointer-events-none z-[99] opacity-20"
        style={{
          left: position.x - 48,
          top: position.y - 48,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-warm-orange/60 to-transparent animate-pulse wood-texture" />
      </div>

      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-3 h-3 pointer-events-none z-[98] bg-wood-secondary/60 rounded-full"
          style={{
            left: point.x - 6,
            top: point.y - 6,
            opacity: (index / trail.length) * 0.6,
            transform: `scale(${(index / trail.length) * 0.6 + 0.4})`,
            transition: 'all 0.3s ease-out'
          }}
        />
      ))}
    </>
  );
};
