
import { useState, useEffect } from 'react';

interface Portal {
  x: number;
  y: number;
  id: number;
  size: number;
}

interface PortalSystemProps {
  mousePosition: { x: number; y: number };
  isVisionActive: boolean;
}

export const PortalSystem = ({ mousePosition, isVisionActive }: PortalSystemProps) => {
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
      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
          }}
        >
          <div className="w-24 h-24 border-2 border-emerald-300/60 rounded-full animate-ping" />
          <div className="absolute inset-2 border border-white/40 rounded-full animate-ping" 
               style={{ animationDelay: '0.3s' }} />
          <div className="absolute inset-4 border border-emerald-200/60 rounded-full animate-ping" 
               style={{ animationDelay: '0.6s' }} />
        </div>
      ))}

      {/* Dimensional Portals */}
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
          <div className="w-36 h-36 rounded-full bg-gradient-to-r from-emerald-400/30 to-emerald-600/30 animate-spin-slow">
            <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          
          {/* Inner Portal */}
          <div className="absolute inset-4 rounded-full bg-gradient-radial from-emerald-300/40 via-emerald-500/20 to-transparent animate-pulse">
            <div className="w-full h-full rounded-full backdrop-blur-sm border border-emerald-300/30" />
          </div>
          
          {/* Portal Core */}
          <div className="absolute inset-12 rounded-full bg-white/10 backdrop-blur-md animate-pulse" 
               style={{ animationDuration: '3s' }}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-200/40 to-emerald-400/40" />
          </div>
        </div>
      ))}
    </div>
  );
};
