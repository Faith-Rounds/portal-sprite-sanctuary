
import { useState, useEffect } from 'react';

interface Portal {
  x: number;
  y: number;
  id: number;
  size: number;
}

interface WoodenPortalSystemProps {
  mousePosition: { x: number; y: number };
  isVisionActive: boolean;
}

export const WoodenPortalSystem = ({ mousePosition, isVisionActive }: WoodenPortalSystemProps) => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [ripples, setRipples] = useState<Portal[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Create ripple effect
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
        size: 0
      };
      setRipples(prev => [...prev, newRipple]);

      // Create portal if vision is active
      if (isVisionActive) {
        const newPortal = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now() + 1,
          size: 0
        };
        setPortals(prev => [...prev, newPortal]);
      }

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 2000);

      // Remove portal after longer duration
      if (isVisionActive) {
        setTimeout(() => {
          setPortals(prev => prev.filter(p => p.id !== newRipple.id + 1));
        }, 8000);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isVisionActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Wooden Ripple Effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
          }}
        >
          <div className="w-24 h-24 border-2 border-warm-orange/60 rounded-full animate-ping wood-texture" />
          <div className="absolute inset-2 border border-wood-secondary/40 rounded-full animate-ping" 
               style={{ animationDelay: '0.3s' }} />
          <div className="absolute inset-4 border border-sage/60 rounded-full animate-ping" 
               style={{ animationDelay: '0.6s' }} />
        </div>
      ))}

      {/* Dimensional Wood Portals */}
      {portals.map(portal => (
        <div
          key={portal.id}
          className="absolute"
          style={{
            left: portal.x - 75,
            top: portal.y - 75,
          }}
        >
          {/* Outer Portal Ring */}
          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-wood-primary/40 to-warm-orange/40 animate-spin-slow wood-texture">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-cream/30 to-transparent" />
          </div>
          
          {/* Inner Portal */}
          <div className="absolute inset-4 rounded-full bg-gradient-radial from-warm-orange/50 via-wood-secondary/30 to-transparent animate-pulse">
            <div className="w-full h-full rounded-full backdrop-blur-sm border-2 border-wood-primary/40 wood-texture" />
          </div>
          
          {/* Portal Core */}
          <div className="absolute inset-12 rounded-full bg-cream/20 backdrop-blur-md animate-pulse" 
               style={{ animationDuration: '3s' }}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-sage/40 to-warm-orange/40 wood-texture" />
          </div>
        </div>
      ))}
    </div>
  );
};
