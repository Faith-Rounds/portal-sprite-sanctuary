
import { useEffect, useRef, useState } from 'react';
import { WoodenCursor } from '@/components/WoodenCursor';
import { FloatingWoodenElements } from '@/components/FloatingWoodenElements';
import { WoodenPortalSystem } from '@/components/WoodenPortalSystem';
import { WoodenFigureCards } from '@/components/WoodenFigureCards';
import { RetroVision } from '@/components/RetroVision';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisionActive, setIsVisionActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-cream via-wood-light to-sage overflow-hidden relative cursor-none wood-texture"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <WoodenCursor position={mousePosition} />
      
      {/* Retro Vision Toggle */}
      <button
        onClick={() => setIsVisionActive(!isVisionActive)}
        className="fixed top-6 right-6 z-50 group bg-wood-primary/10 backdrop-blur-md border-2 border-wood-primary/20 rounded-2xl p-4 hover:bg-wood-primary/20 transition-all duration-300 transform hover:scale-110 wooden-glow"
      >
        <Sparkles className={`w-6 h-6 text-wood-primary transition-all duration-300 ${isVisionActive ? 'text-warm-orange scale-125' : ''}`} />
        <div className="absolute inset-0 rounded-2xl bg-warm-orange/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--warm-orange)/0.1),transparent_70%)]" />
      
      {/* Floating Wooden Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-wood-primary/40 rounded-full animate-pulse float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <FloatingWoodenElements mousePosition={mousePosition} />
      <WoodenPortalSystem mousePosition={mousePosition} isVisionActive={isVisionActive} />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <header className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold font-comfortaa text-wood-primary mb-6 tracking-wider">
              <span className="bg-gradient-to-r from-wood-primary via-wood-secondary to-warm-orange bg-clip-text text-transparent">
                STIKA
              </span>
              <br />
              <span className="text-wood-secondary/90">DEW-DU</span>
            </h1>
            <p className="text-xl md:text-2xl text-wood-secondary/80 mb-8 leading-relaxed font-fredoka">
              Where retro-inspired wooden figures meet next-generation web interactions
            </p>
            <div className="flex justify-center">
              <div className="bg-wood-primary/10 backdrop-blur-md border-2 border-wood-primary/20 rounded-3xl p-8 max-w-md wooden-glow">
                <p className="text-wood-primary/90 text-lg font-fredoka">
                  Hover your cursor to interact with our wooden companions. 
                  Click anywhere to create magical ripples in the digital wood grain.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Wooden Figures Section */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold font-comfortaa text-wood-primary text-center mb-12">
              <span className="bg-gradient-to-r from-warm-orange to-wood-primary bg-clip-text text-transparent">
                Wooden Companions
              </span>
            </h2>
            <WoodenFigureCards mousePosition={mousePosition} />
          </div>
        </section>
      </div>

      <RetroVision isActive={isVisionActive} mousePosition={mousePosition} />
    </div>
  );
};

export default Index;
