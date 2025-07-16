import { useEffect, useState, useRef } from 'react';

interface WoodenCursorProps {
  position: { x: number; y: number };
}

export const WoodenCursor = ({ position }: WoodenCursorProps) => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: string }>>([]);
  const trailIdCounterRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);
  const [internalPosition, setInternalPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Use requestAnimationFrame for smoother cursor updates
  useEffect(() => {
    let lastKnownPosition = { x: 0, y: 0 };
    
    const updateCursorPosition = () => {
      setInternalPosition(lastKnownPosition);
      
      // Update trail with guaranteed unique ID
      const uniqueId = `${Date.now()}-${trailIdCounterRef.current++}`;
      const newTrail = { x: lastKnownPosition.x, y: lastKnownPosition.y, id: uniqueId };
      setTrail(prev => [...prev.slice(-5), newTrail]);
      
      rafRef.current = requestAnimationFrame(updateCursorPosition);
    };
    
    // Start the animation loop
    rafRef.current = requestAnimationFrame(updateCursorPosition);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Capture mouse position but don't update state directly
      // This prevents React rendering bottlenecks
      lastKnownPosition = {
        x: Math.max(0, Math.min(e.clientX, window.innerWidth)),
        y: Math.max(0, Math.min(e.clientY, window.innerHeight))
      };
      setIsVisible(true);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Only hide if mouse truly leaves the window
      if (e.clientY <= 0 || e.clientX <= 0 || 
          e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setIsVisible(false);
      }
    };

    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Use capture phase to ensure our handlers run first
    document.addEventListener('mousemove', handleMouseMove, { passive: true, capture: true });
    document.addEventListener('mouseenter', handleMouseEnter, { capture: true });
    document.addEventListener('mouseleave', handleMouseLeave, { capture: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      // Clean up all event listeners and cancel animation frame
      document.removeEventListener('mousemove', handleMouseMove, { capture: true });
      document.removeEventListener('mouseenter', handleMouseEnter, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave, { capture: true });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Fallback to prop position if internal position is not set
  // Use internal position which is based on clientX/Y (viewport-relative)
  const cursorX = internalPosition.x || position.x;
  const cursorY = internalPosition.y || position.y;

  // Always show cursor if we have any valid position
  const shouldShow = isVisible && (cursorX > 0 || cursorY > 0);

  return (
    <>
      {/* Main Wooden Cursor */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 pointer-events-none mix-blend-multiply"
        style={{
          left: `${cursorX - 16}px`,
          top: `${cursorY - 16}px`,
          zIndex: 9999,
          opacity: shouldShow ? 1 : 0,
          transition: 'opacity 0.2s ease-out',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)' // Force GPU acceleration
        }}
      >
        <div className="w-full h-full bg-wood-primary rounded-full shadow-lg border-2 border-wood-secondary/30">
          <div className="w-full h-full bg-gradient-to-br from-warm-orange/40 to-wood-primary rounded-full animate-pulse opacity-70" />
        </div>
      </div>

      {/* Wooden Aura Effect */}
      <div
        className="fixed w-24 h-24 pointer-events-none opacity-20"
        style={{
          left: `${cursorX - 48}px`,
          top: `${cursorY - 48}px`,
          zIndex: 9998,
          opacity: shouldShow ? 0.2 : 0,
          transition: 'opacity 0.2s ease-out',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)' // Force GPU acceleration
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-warm-orange/60 to-transparent animate-pulse wood-texture" />
      </div>

      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-3 h-3 pointer-events-none bg-wood-secondary/60 rounded-full"
          style={{
            left: `${point.x - 6}px`,
            top: `${point.y - 6}px`,
            zIndex: 9997,
            opacity: shouldShow ? (index / trail.length) * 0.6 : 0,
            transform: `scale(${(index / trail.length) * 0.6 + 0.4}) translateZ(0)`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </>
  );
};