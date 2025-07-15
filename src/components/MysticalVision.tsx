
interface MysticalVisionProps {
  isActive: boolean;
  mousePosition: { x: number; y: number };
}

export const MysticalVision = ({ isActive, mousePosition }: MysticalVisionProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Vision Overlay */}
      <div className="absolute inset-0 bg-emerald-950/30 backdrop-blur-sm" />
      
      {/* Vision Circle */}
      <div
        className="absolute w-96 h-96 rounded-full border-4 border-emerald-300/60 pointer-events-none"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
          boxShadow: 'inset 0 0 100px rgba(16,185,129,0.3), 0 0 100px rgba(16,185,129,0.3)'
        }}
      >
        <div className="absolute inset-8 rounded-full border-2 border-emerald-200/40 animate-pulse" />
        <div className="absolute inset-16 rounded-full border border-white/30 animate-pulse" 
             style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Mystical Runes */}
      <div
        className="absolute w-8 h-8 pointer-events-none"
        style={{
          left: mousePosition.x + 150,
          top: mousePosition.y - 150,
        }}
      >
        <div className="w-full h-full text-emerald-300 text-2xl animate-spin-slow opacity-80">
          ✧
        </div>
      </div>
      
      <div
        className="absolute w-6 h-6 pointer-events-none"
        style={{
          left: mousePosition.x - 180,
          top: mousePosition.y + 120,
        }}
      >
        <div className="w-full h-full text-emerald-200 text-xl animate-pulse opacity-60">
          ❋
        </div>
      </div>
      
      <div
        className="absolute w-10 h-10 pointer-events-none"
        style={{
          left: mousePosition.x + 200,
          top: mousePosition.y + 100,
        }}
      >
        <div className="w-full h-full text-white text-3xl animate-bounce opacity-70">
          ✦
        </div>
      </div>
    </div>
  );
};
