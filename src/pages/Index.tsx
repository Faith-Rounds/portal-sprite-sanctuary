import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { WoodenCursor } from '@/components/WoodenCursor';
// FloatingWoodenElements removed as requested
import { WoodenPortalSystem } from '@/components/WoodenPortalSystem';
import { WoodenFigureCards } from '@/components/WoodenFigureCards';
import { RetroVision } from '@/components/RetroVision';
import { PreOrderCallout } from '@/components/PreOrderCallout';
import { Sparkles, ShoppingCart, ArrowRight, Crown, Zap, Vault, Infinity, Menu, X } from 'lucide-react';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisionActive, setIsVisionActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const companionsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  // Move the ref outside of useEffect to follow React's Rules of Hooks
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Use requestAnimationFrame for smoother updates
    const updateMousePosition = () => {
      setMousePosition(mousePositionRef.current);
      requestAnimationFrame(updateMousePosition);
    };
    
    // Start the animation loop
    const rafId = requestAnimationFrame(updateMousePosition);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Use clientX and clientY for viewport-relative coordinates
      // Add bounds checking to ensure cursor stays within viewport
      mousePositionRef.current = {
        x: Math.max(0, Math.min(e.clientX, window.innerWidth)),
        y: Math.max(0, Math.min(e.clientY, window.innerHeight))
      };
    };

    const handleScroll = () => {
      // Limit scroll effects to prevent excessive whitespace
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = Math.min(window.scrollY, maxScroll);
      setScrollY(currentScroll);
    };

    // Use capture phase to ensure our handlers run first
    document.addEventListener('mousemove', handleMouseMove, { passive: true, capture: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove, { capture: true });
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-cream via-wood-light to-sage overflow-x-hidden relative cursor-none wood-texture"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Only WoodenCursor - no conflicts */}
      <WoodenCursor position={mousePosition} />

      {/* Background Effects with Controlled Parallax */}
      <div 
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--warm-orange)/0.1),transparent_70%)] pointer-events-none"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />
      
      {/* Floating Wooden Particles with Controlled Movement */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-wood-primary/40 rounded-full animate-pulse float-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
            }}
          />
        ))}
      </div>

      {/* FloatingWoodenElements removed as requested */}
      <WoodenPortalSystem mousePosition={mousePosition} isVisionActive={isVisionActive} />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Mobile-Responsive Header */}
        <header className="flex justify-between items-center py-4 px-4 md:py-6 md:px-8 relative z-20">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-wood-primary rounded-lg flex items-center justify-center">
              <Crown className="w-3 h-3 md:w-5 md:h-5 text-cream" />
            </div>
            <h1 className="text-lg md:text-2xl font-bold text-wood-primary font-comfortaa">StikaDeux</h1>
            <span className="text-xs bg-warm-orange/20 text-warm-orange px-2 py-1 rounded-full font-medium">REV</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-wood-primary hover:text-warm-orange transition-colors font-medium">Revolution</a>
            <Link to="/dashboard" className="text-wood-primary hover:text-warm-orange transition-colors font-medium">My Vault</Link>
            <a href="#collection" className="text-wood-primary hover:text-warm-orange transition-colors font-medium">Companions</a>
            <a href="#" className="text-wood-primary hover:text-warm-orange transition-colors font-medium">Join</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-wood-primary hover:text-warm-orange transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-cream/95 backdrop-blur-md border-b border-wood-primary/20 z-30 py-4">
            <nav className="flex flex-col space-y-3 px-4">
              <a href="#" className="text-wood-primary hover:text-warm-orange transition-colors font-medium py-2">Revolution</a>
              <Link to="/dashboard" className="text-wood-primary hover:text-warm-orange transition-colors font-medium py-2">My Vault</Link>
              <a href="#collection" className="text-wood-primary hover:text-warm-orange transition-colors font-medium py-2">Companions</a>
              <a href="#" className="text-wood-primary hover:text-warm-orange transition-colors font-medium py-2">Join</a>
            </nav>
          </div>
        )}

        {/* Revolutionary Hero Section with Reduced Parallax */}
        <section 
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-4 py-8 md:px-6 md:py-12"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            pointerEvents: 'auto' // Ensure mouse events work properly
          }}
        >
          <div className="text-center max-w-5xl">
            <div className="flex items-center justify-center gap-2 mb-4 md:mb-6 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <Zap className="w-4 h-4 md:w-6 md:h-6 text-warm-orange animate-pulse" />
              <span className="text-warm-orange font-bold font-fredoka text-sm md:text-lg tracking-wider">THE COLLECTIBLES REVOLUTION</span>
              <Zap className="w-4 h-4 md:w-6 md:h-6 text-warm-orange animate-pulse" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold font-comfortaa text-wood-primary mb-4 md:mb-6 tracking-wider scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
              <span className="bg-gradient-to-r from-wood-primary via-wood-secondary to-warm-orange bg-clip-text text-transparent">
                STIKA
              </span>
              <br />
              <span className="text-wood-secondary/90">DEUX</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-wood-secondary/80 mb-3 md:mb-4 leading-relaxed font-fredoka scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300">
              Revolutionary wooden collectibles that unlock exclusive creator content
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-warm-orange/90 mb-6 md:mb-8 leading-relaxed font-fredoka font-medium scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-400">
              🚀 Content that exists nowhere else • Forever yours • Never expires
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mt-6 md:mt-8 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-500">
              <Link to="/product/1" className="bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 wooden-glow text-base md:text-lg">
                <Crown className="w-4 h-4 md:w-5 md:h-5" />
                Join the Revolution
              </Link>
              <a href="#collection" className="bg-cream/50 backdrop-blur-md border-2 border-wood-primary/20 hover:bg-cream/70 text-wood-primary font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-base md:text-lg">
                See Companions
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <Link to="/dashboard" className="bg-warm-orange hover:bg-warm-orange/80 text-cream font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 wooden-glow text-base md:text-lg">
                My Vault
                <Vault className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
            
            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-600">
              <div className="bg-cream/60 backdrop-blur-md border border-wood-primary/20 rounded-2xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Infinity className="w-4 h-4 md:w-5 md:h-5 text-warm-orange" />
                  <span className="font-bold text-wood-primary font-comfortaa text-sm md:text-base">Forever Yours</span>
                </div>
                <p className="text-wood-secondary text-xs md:text-sm font-fredoka">Once unlocked, exclusive content is permanently yours</p>
              </div>
              
              <div className="bg-cream/60 backdrop-blur-md border border-wood-primary/20 rounded-2xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-warm-orange" />
                  <span className="font-bold text-wood-primary font-comfortaa text-sm md:text-base">Exclusive Universe</span>
                </div>
                <p className="text-wood-secondary text-xs md:text-sm font-fredoka">Content that will never exist anywhere else</p>
              </div>
              
              <div className="bg-cream/60 backdrop-blur-md border border-wood-primary/20 rounded-2xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-4 h-4 md:w-5 md:h-5 text-warm-orange" />
                  <span className="font-bold text-wood-primary font-comfortaa text-sm md:text-base">Revolutionary</span>
                </div>
                <p className="text-wood-secondary text-xs md:text-sm font-fredoka">Bridging physical and digital worlds forever</p>
              </div>
            </div>
          </div>
        </section>

        {/* Revolutionary Companions Section */}
        <section 
          ref={companionsRef}
          id="collection" 
          className="px-4 py-16 md:px-6 md:py-20"
        >
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="text-center mb-8 md:mb-12 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-comfortaa text-wood-primary mb-4">
                <span className="bg-gradient-to-r from-warm-orange to-wood-primary bg-clip-text text-transparent">
                  Revolutionary Companions
                </span>
              </h2>
              <p className="text-lg md:text-xl text-wood-secondary font-fredoka max-w-3xl mx-auto leading-relaxed">
                Each StikaDeux companion unlocks a universe of exclusive content from your favorite creators. 
                Music, videos, art, and more that will never be available on any platform or streaming service.
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-2 h-2 bg-warm-orange rounded-full animate-pulse"></div>
                <span className="text-warm-orange font-medium font-fredoka text-xs md:text-sm">PHYSICAL + DIGITAL REVOLUTION</span>
                <div className="w-2 h-2 bg-warm-orange rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Updated Companion Names */}
            <div className="w-full max-w-6xl mx-auto mb-8 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                <div className="bg-cream/80 backdrop-blur-md border-2 border-wood-primary/30 rounded-2xl p-4 md:p-6 text-center wooden-glow">
                  <Crown className="w-8 h-8 md:w-10 md:h-10 text-warm-orange mx-auto mb-3" />
                  <h3 className="text-lg md:text-xl font-bold text-wood-primary font-comfortaa mb-2">StikaDeux Genesis</h3>
                  <p className="text-wood-secondary text-sm font-fredoka">The original revolutionary companion</p>
                </div>
                
                <div className="bg-cream/80 backdrop-blur-md border-2 border-wood-primary/30 rounded-2xl p-4 md:p-6 text-center wooden-glow">
                  <Zap className="w-8 h-8 md:w-10 md:h-10 text-warm-orange mx-auto mb-3" />
                  <h3 className="text-lg md:text-xl font-bold text-wood-primary font-comfortaa mb-2">StikaDeux Stream Crown</h3>
                  <p className="text-wood-secondary text-sm font-fredoka">Kai Cenat's digital dynasty edition</p>
                </div>
                
                <div className="bg-cream/80 backdrop-blur-md border-2 border-wood-primary/30 rounded-2xl p-4 md:p-6 text-center wooden-glow">
                  <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-warm-orange mx-auto mb-3" />
                  <h3 className="text-lg md:text-xl font-bold text-wood-primary font-comfortaa mb-2">StikaDeux Sonic Seraph</h3>
                  <p className="text-wood-secondary text-sm font-fredoka">Doja Cat's musical mystique edition</p>
                </div>
              </div>
            </div>
            
            {/* WoodenFigureCards Display */}
            <div className="w-full max-w-6xl mx-auto scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300">
              <WoodenFigureCards mousePosition={mousePosition} />
            </div>
            
            {/* Mobile-Optimized Fallback */}
            <div className="mt-6 md:mt-8 text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-400">
              <p className="text-wood-secondary font-fredoka text-sm md:text-base">
                Ready to revolutionize your collection? Each companion opens a portal to exclusive content.
              </p>
            </div>
          </div>
        </section>
        
        {/* Revolutionary Call to Action */}
        <section className="px-4 py-16 md:px-6 md:py-20 bg-cream/30 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="max-w-7xl mx-auto">
            <PreOrderCallout />
          </div>
        </section>
        
        {/* Revolutionary Features Section */}
        <section 
          ref={featuresRef}
          className="px-4 py-16 md:px-6 md:py-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12 scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-comfortaa text-wood-primary mb-4">
                <span className="bg-gradient-to-r from-warm-orange to-wood-primary bg-clip-text text-transparent">
                  The StikaDeux Revolution
                </span>
              </h2>
              <p className="text-lg md:text-xl text-wood-secondary font-fredoka max-w-3xl mx-auto">
                We're revolutionizing collectibles by creating permanent bridges between physical items and exclusive digital content.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  icon: <Crown className="w-6 h-6 md:w-8 md:h-8 text-warm-orange" />,
                  title: "Exclusive Content Universe",
                  description: "Each StikaDeux unlocks content from creators that will NEVER be available anywhere else. Music tracks, videos, art, and personal messages exclusively for revolutionaries like you."
                },
                {
                  icon: <Infinity className="w-6 h-6 md:w-8 md:h-8 text-warm-orange" />,
                  title: "Forever Ownership",
                  description: "Once you unlock content, it's yours forever. No monthly fees, no expiration dates, no platform changes. Your exclusive content vault is permanent and always accessible."
                },
                {
                  icon: <Zap className="w-6 h-6 md:w-8 md:h-8 text-warm-orange" />,
                  title: "Revolutionary Technology",
                  description: "Handcrafted sustainable wood meets cutting-edge technology. Each companion features embedded quantum-secured verification that connects to your permanent content vault."
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-6 md:p-8 wooden-glow wood-texture group hover:scale-105 transition-all duration-300 scroll-animate opacity-0 translate-y-8"
                  style={{ 
                    transitionDelay: `${(index * 200) + 200}ms`,
                    transitionDuration: '700ms',
                    transitionTimingFunction: 'ease-out'
                  }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-warm-orange/20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-wood-primary mb-3 md:mb-4 font-comfortaa">{feature.title}</h3>
                  <p className="text-wood-secondary/90 font-fredoka leading-relaxed text-sm md:text-base">{feature.description}</p>
                </div>
              ))}
            </div>
            
            {/* Revolutionary Promise */}
            <div className="mt-12 md:mt-16 bg-warm-orange/10 border-2 border-warm-orange/30 rounded-3xl p-6 md:p-8 text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700 ease-out delay-700">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-warm-orange" />
                <h3 className="text-xl md:text-2xl font-bold text-wood-primary font-comfortaa">Our Revolutionary Promise</h3>
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-warm-orange" />
              </div>
              <p className="text-base md:text-lg text-wood-secondary font-fredoka max-w-4xl mx-auto leading-relaxed">
                Every StikaDeux is your key to exclusive creator content that exists nowhere else in the universe. 
                Once unlocked, this content is yours forever - no subscriptions, no limits, no expiration dates. 
                This is the future of collecting, where physical meets digital in perfect harmony.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-6 text-warm-orange font-medium font-fredoka text-sm md:text-base">
                <span>✨ Forever Yours</span>
                <span>🚀 Exclusive Universe</span>
                <span>🔥 Revolutionary</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer Section to Prevent Whitespace */}
        <footer className="px-4 py-8 md:px-6 md:py-12 bg-wood-primary/5">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-wood-primary rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-cream" />
              </div>
              <span className="text-xl font-bold text-wood-primary font-comfortaa">StikaDeux</span>
              <span className="text-xs bg-warm-orange/20 text-warm-orange px-2 py-1 rounded-full font-medium">REVOLUTION</span>
            </div>
            <p className="text-wood-secondary font-fredoka text-sm">
              © 2025 StikaDeux. Revolutionizing collectibles forever.
            </p>
          </div>
        </footer>
      </div>

      <RetroVision isActive={isVisionActive} mousePosition={mousePosition} />
    </div>
  );
};

export default Index;