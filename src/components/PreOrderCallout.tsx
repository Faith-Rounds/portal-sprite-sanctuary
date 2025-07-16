import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export const PreOrderCallout = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thank you for your interest!",
        description: "We'll notify you when pre-orders open for StikaDewDu collectibles.",
        variant: "default",
      });
      setEmail('');
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wood-primary/10 via-cream/50 to-warm-orange/10 border-3 border-wood-primary/30 p-8 md:p-12 wooden-glow">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--warm-orange)/0.1),transparent_70%)]" />
      <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-warm-orange/10 rounded-full blur-3xl" />
      <div className="absolute -left-24 -top-24 w-64 h-64 bg-wood-primary/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warm-orange/20 text-warm-orange font-medium mb-6">
            <Clock className="w-4 h-4" />
            <span>Limited Time Offer</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-wood-primary mb-4 font-comfortaa">
            Pre-order Your <span className="text-warm-orange">StikaDewDu</span> Today
          </h2>
          
          <p className="text-wood-secondary text-lg mb-6 font-fredoka">
            Be among the first to own these unique wooden companions with interactive digital features.
            Reserve yours now before they're gone!
          </p>
          
          <ul className="space-y-3 mb-8">
            {[
              "Early bird discount: 15% off retail price",
              "Free exclusive wooden display stand",
              "Priority shipping when released",
              "Digital certificate of authenticity"
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 bg-warm-orange/20 rounded-full p-1">
                  <Check className="w-4 h-4 text-warm-orange" />
                </div>
                <span className="text-wood-secondary font-fredoka">{benefit}</span>
              </li>
            ))}
          </ul>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-cream/70 border-wood-primary/30 focus:border-warm-orange"
              required
            />
            <Button 
              type="submit"
              className="bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-2 px-6 rounded-xl
                transition-all duration-300 transform hover:scale-105 active:scale-95 font-fredoka wooden-glow"
            >
              Get Notified
            </Button>
          </form>
        </div>
        
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-warm-orange/30 to-wood-primary/30 rounded-full blur-xl transform scale-90 animate-pulse" />
            <div className="relative bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-6 wooden-glow wood-texture">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-wood-primary font-comfortaa">Pre-order Bundle</h3>
                  <span className="text-lg font-bold text-warm-orange font-comfortaa">$199.99</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-wood-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-wood-primary font-bold">3x</span>
                    </div>
                    <div>
                      <p className="text-wood-primary font-medium">StikaDewDu Collectibles</p>
                      <p className="text-wood-secondary/80 text-sm">Any 3 figures of your choice</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-warm-orange/10 rounded-lg flex items-center justify-center">
                      <span className="text-warm-orange font-bold">1x</span>
                    </div>
                    <div>
                      <p className="text-wood-primary font-medium">Display Stand</p>
                      <p className="text-wood-secondary/80 text-sm">Premium wooden showcase</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-wood-secondary/10 rounded-lg flex items-center justify-center">
                      <span className="text-wood-secondary font-bold">1x</span>
                    </div>
                    <div>
                      <p className="text-wood-primary font-medium">Digital Extras</p>
                      <p className="text-wood-secondary/80 text-sm">NFT ownership certificate</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-wood-primary/20">
                  <Link 
                    to="/product/1" 
                    className="flex items-center justify-center gap-2 w-full bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-3 px-4 rounded-xl
                      transition-all duration-300 transform hover:scale-105 active:scale-95 font-fredoka wooden-glow"
                  >
                    View Bundle Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrderCallout;
