import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import { WoodenFigure, woodenFigures } from '@/components/WoodenFigureCards';
import { RetroVision } from '@/components/RetroVision';
import { WoodenCursor } from '@/components/WoodenCursor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<WoodenFigure | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisionActive, setIsVisionActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  // Additional product images (would come from a database in a real app)
  const productImages = [
    { id: 0, url: product?.image || "" },
    { id: 1, url: product?.image || "" }, // In a real app, these would be different angles
    { id: 2, url: product?.image || "" }
  ];

  // Features for this product
  const features = [
    "Hand-crafted from sustainable premium wood",
    "NFC-enabled for digital content access",
    "Unlocks exclusive creator content",
    "Limited edition collectible",
    "Join the StikaDewDu community"
  ];

  // Specifications
  const specifications = [
    { name: "Material", value: "Premium Oak/Birch/Pine" },
    { name: "Height", value: "15-20 cm" },
    { name: "Weight", value: "250-350g" },
    { name: "Finish", value: "Natural wood oil" },
    { name: "Connectivity", value: "NFC-enabled" }
  ];

  useEffect(() => {
    // Find the product by ID
    if (id) {
      const foundProduct = woodenFigures.find(fig => fig.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [id]);

  const handlePreOrder = () => {
    toast({
      title: "Pre-order Successful!",
      description: (
        <div className="space-y-2">
          <p>{`Your ${product?.name} will be reserved for the next batch. You'll get exclusive access to creator content when it ships!`}</p>
          <Link to="/dashboard" className="inline-flex items-center gap-1 text-warm-orange hover:underline font-medium">
            Go to My Collection <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ),
      variant: "default",
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream via-wood-light to-sage flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-wood-primary mb-4">Product not found</h2>
          <Link to="/" className="text-warm-orange hover:underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-cream via-wood-light to-sage overflow-hidden relative cursor-none wood-texture"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <WoodenCursor position={mousePosition} />
      

      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--warm-orange)/0.1),transparent_70%)]" />
 
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-8 bg-wood-primary/10 backdrop-blur-md border-2 border-wood-primary/20 rounded-xl px-4 py-2 hover:bg-wood-primary/20 transition-all duration-300 wooden-glow"
        >
          <ArrowLeft className="w-4 h-4 text-wood-primary" />
          <span className="text-wood-primary font-medium">Back to collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl overflow-hidden wooden-glow wood-texture h-[500px]">
              <img
                src={productImages[selectedImage].url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 justify-center">
              {productImages.map((img, index) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-3 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-warm-orange scale-110 wooden-glow' 
                      : 'border-wood-primary/30 opacity-70'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-warm-orange" />
                <span className="text-wood-secondary font-medium">{product.rarity}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-wood-primary mb-2 font-comfortaa">{product.name}</h1>
              <p className="text-xl text-wood-secondary mb-4 font-fredoka">{product.type}</p>
              <p className="text-3xl font-bold text-wood-primary font-comfortaa mb-6">{product.price}</p>
              <p className="text-wood-secondary/90 text-lg mb-8 font-fredoka">{product.description}</p>

              {/* Pre-order Section */}
              <div className="bg-wood-primary/10 backdrop-blur-md border-2 border-wood-primary/20 rounded-2xl p-6 mb-8 wooden-glow">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-warm-orange rounded-full animate-pulse" />
                  <span className="text-warm-orange font-medium">Limited Pre-order Available</span>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex border-2 border-wood-primary/30 rounded-xl overflow-hidden">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 bg-cream/50 text-wood-primary hover:bg-wood-primary/20 transition-colors"
                    >
                      -
                    </button>
                    <div className="px-6 py-2 bg-cream/80 text-wood-primary font-medium">
                      {quantity}
                    </div>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 bg-cream/50 text-wood-primary hover:bg-wood-primary/20 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <span className="text-wood-secondary">
                    Only <span className="font-bold text-warm-orange">12</span> left in stock
                  </span>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={handlePreOrder}
                    className="flex-1 bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-6 px-8 rounded-2xl
                      transition-all duration-300 transform hover:scale-105 active:scale-95 font-fredoka wooden-glow"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Pre-order Now
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="bg-cream/50 border-2 border-wood-primary/30 text-wood-primary rounded-2xl
                      transition-all duration-300 hover:bg-wood-primary/10"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Traits */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wood-primary font-comfortaa">Unique Traits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {product.traits.map((trait, index) => (
                  <div 
                    key={index} 
                    className="bg-cream/60 backdrop-blur-sm border-2 border-wood-primary/20 rounded-xl p-3 text-center"
                  >
                    <span className="text-wood-primary/90 font-medium font-fredoka">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wood-primary font-comfortaa">Features</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 bg-warm-orange/20 rounded-full p-1">
                      <Check className="w-4 h-4 text-warm-orange" />
                    </div>
                    <span className="text-wood-secondary font-fredoka">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-wood-primary font-comfortaa">Specifications</h3>
              <div className="bg-cream/60 backdrop-blur-sm border-2 border-wood-primary/20 rounded-xl overflow-hidden">
                {specifications.map((spec, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between py-3 px-4 ${
                      index < specifications.length - 1 ? 'border-b border-wood-primary/10' : ''
                    }`}
                  >
                    <span className="text-wood-secondary/80 font-fredoka">{spec.name}</span>
                    <span className="text-wood-primary font-medium font-fredoka">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <RetroVision isActive={isVisionActive} mousePosition={mousePosition} />
    </div>
  );
};

export default ProductDetail;
