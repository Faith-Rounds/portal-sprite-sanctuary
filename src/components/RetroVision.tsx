
interface RetroVisionProps {
  isActive: boolean;
  mousePosition: { x: number; y: number };
}

export const RetroVision = ({ isActive, mousePosition }: RetroVisionProps) => {
  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Vision Overlay */}
      <div className="absolute inset-0 bg-wood-primary/20 backdrop-blur-sm" />
      
      {/* Vision Circle */}
      <div
        className="absolute w-80 h-80 rounded-full border-4 border-warm-orange/60 pointer-events-none"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
          background: 'radial-gradient(circle, hsl(var(--warm-orange)/0.15) 0%, transparent 70%)',
          boxShadow: 'inset 0 0 80px hsl(var(--warm-orange)/0.4), 0 0 80px hsl(var(--warm-orange)/0.3)'
        }}
      >
        <div className="absolute inset-6 rounded-full border-2 border-wood-secondary/40 animate-pulse" />
        <div className="absolute inset-12 rounded-full border border-cream/50 animate-pulse wood-texture" 
             style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Retro Symbols */}
      <div
        className="absolute w-8 h-8 pointer-events-none"
        style={{
          left: mousePosition.x + 140,
          top: mousePosition.y - 140,
        }}
      >
        <div className="w-full h-full text-warm-orange text-2xl animate-spin-slow opacity-80 font-comfortaa">
          ⚡
        </div>
      </div>
      
      <div
        className="absolute w-6 h-6 pointer-events-none"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y + 110,
        }}
      >
        <div className="w-full h-full text-wood-secondary text-xl animate-pulse opacity-60 font-comfortaa">
          ◆
        </div>
      </div>
      
      <div
        className="absolute w-10 h-10 pointer-events-none"
        style={{
          left: mousePosition.x + 180,
          top: mousePosition.y + 90,
        }}
      >
        <div className="w-full h-full text-sage text-3xl animate-bounce opacity-70 font-comfortaa">
          ✨
        </div>
      </div>
    </div>
  );
};
