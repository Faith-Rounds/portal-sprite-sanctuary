
import { useEffect, useRef, useState } from 'react';
import { MysticCursor } from '@/components/MysticCursor';
import { FloatingElements } from '@/components/FloatingElements';
import { PortalSystem } from '@/components/PortalSystem';
import { CreatureCards } from '@/components/CreatureCards';
import { MysticalVision } from '@/components/MysticalVision';
import { Eye } from 'lucide-react';

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
      className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 overflow-hidden relative cursor-none"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <MysticCursor position={mousePosition} />
      
      {/* Mystical Vision Button */}
      <button
        onClick={() => setIsVisionActive(!isVisionActive)}
        className="fixed top-6 right-6 z-50 group bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-4 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
        style={{
          boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
        }}
      >
        <Eye className={`w-6 h-6 text-white transition-all duration-300 ${isVisionActive ? 'text-emerald-300 scale-125' : ''}`} />
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </button>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
      
      {/* Floating Mystical Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300/60 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <FloatingElements mousePosition={mousePosition} />
      <PortalSystem mousePosition={mousePosition} isVisionActive={isVisionActive} />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <header className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-wider">
              <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-300 bg-clip-text text-transparent">
                MYSTICAL
              </span>
              <br />
              <span className="text-white/90">REALM</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Enter the portal to discover magical companions from otherworldly dimensions
            </p>
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-md">
                <p className="text-white/90 text-lg">
                  Move your cursor to interact with the mystical elements around you. 
                  Click anywhere to create dimensional ripples.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Creatures Section */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
              <span className="bg-gradient-to-r from-emerald-300 to-white bg-clip-text text-transparent">
                Mystical Companions
              </span>
            </h2>
            <CreatureCards mousePosition={mousePosition} />
          </div>
        </section>
      </div>

      <MysticalVision isActive={isVisionActive} mousePosition={mousePosition} />
    </div>
  );
};

export default Index;
