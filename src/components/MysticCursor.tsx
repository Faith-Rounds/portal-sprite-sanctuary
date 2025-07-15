
import { useEffect, useState } from 'react';

interface MysticCursorProps {
  position: { x: number; y: number };
}

export const MysticCursor = ({ position }: MysticCursorProps) => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const newTrail = {
      x: position.x,
      y: position.y,
      id: Date.now()
    };

    setTrail(prev => [...prev.slice(-8), newTrail]);
  }, [position]);

  return (
    <>
      {/* Main Cursor */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-[100] mix-blend-difference"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="w-full h-full bg-white rounded-full shadow-lg">
          <div className="w-full h-full bg-emerald-300 rounded-full animate-pulse opacity-70" />
        </div>
      </div>

      {/* Magnetic Field Effect */}
      <div
        className="fixed w-32 h-32 pointer-events-none z-[99] opacity-30"
        style={{
          left: position.x - 64,
          top: position.y - 64,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-emerald-300/40 to-transparent animate-pulse" />
      </div>

      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-2 h-2 pointer-events-none z-[98] bg-emerald-300/60 rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: (index / trail.length) * 0.8,
            transform: `scale(${(index / trail.length) * 0.8 + 0.2})`,
            transition: 'all 0.3s ease-out'
          }}
        />
      ))}
    </>
  );
};
