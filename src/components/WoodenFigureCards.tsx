import { useState } from 'react';
import { Heart, Star, Sparkles, Crown, Zap, Vault } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WoodenFigureCardsProps {
  mousePosition: { x: number; y: number };
}

export interface WoodenFigure {
  id: number;
  name: string;
  type: string;
  rarity: string;
  price: string;
  description: string;
  image: string;
  traits: string[];
  exclusiveContent: number;
}

export const woodenFigures: WoodenFigure[] = [
  {
    id: 1,
    name: "StikaDeux Genesis",
    type: "OG Edition",
    rarity: "Legendary",
    price: "$99.99",
    description: "The original revolutionary companion that started it all. Unlocks exclusive behind-the-scenes content from the StikaDeux collective and early access to future revolutionary releases. This content exists nowhere else in the universe.",
    image: "/images/original.png",
    traits: ["Founding Revolutionary", "Exclusive Vault Access", "Forever Ownership"],
    exclusiveContent: 12
  },
  {
    id: 2,
    name: "StikaDeux Stream Crown",
    type: "Streamer University",
    rarity: "Epic",
    price: "$129.99",
    description: "Kai Cenat's digital dynasty edition unlocks his secret content vault with unreleased gaming sessions, personal vlogs, and exclusive community events. Content that will never be available on any platform or streaming service.",
    image: "/images/kai_cenat.png",
    traits: ["Stream Vault Access", "Personal Messages", "Community Crown"],
    exclusiveContent: 18
  },
  {
    id: 3,
    name: "StikaDeux Sonic Seraph",
    type: "Rap Deity",
    rarity: "Ultra Rare",
    price: "$149.99",
    description: "Doja Cat's musical mystique edition unlocks her exclusive sonic universe with unreleased tracks, behind-the-scenes studio footage, and personal artistic creations. This content will never exist on any streaming platform.",
    image: "/images/doja_cat.png",
    traits: ["Unreleased Music Vault", "Studio Secrets", "Artist's Personal Gallery"],
    exclusiveContent: 24
  }
];

export const WoodenFigureCards = ({ mousePosition }: WoodenFigureCardsProps) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const handleCardClick = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return <Crown className="w-4 h-4 text-warm-orange" />;
      case 'Epic':
        return <Zap className="w-4 h-4 text-warm-orange" />;
      case 'Ultra Rare':
        return <Sparkles className="w-4 h-4 text-warm-orange" />;
      default:
        return <Star className="w-4 h-4 text-warm-orange" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-5xl">
      {woodenFigures.map(figure => (
        <div
          key={figure.id}
          className="relative group perspective-1000 float-animation"
          style={{ 
            perspective: '1000px',
            animationDelay: `${figure.id * 0.2}s`
          }}
        >
          <div
            className={`relative w-full h-96 transition-all duration-700 preserve-3d cursor-pointer
              ${flippedCards.has(figure.id) ? 'rotate-y-180' : ''}`}
            onClick={() => handleCardClick(figure.id)}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden
              bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 group-hover:border-warm-orange/60
              transition-all duration-300 wooden-glow wood-texture">
              <div className="relative h-full">
                <img
                  src={figure.image}
                  alt={figure.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-primary/60 via-transparent to-transparent rounded-t-2xl" />
                
                {/* Revolutionary Badge */}
                <div className="absolute top-4 right-4 bg-warm-orange/20 backdrop-blur-sm rounded-full px-2 py-1 border border-warm-orange/30">
                  <span className="text-xs font-bold text-warm-orange">REV</span>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cream to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    {getRarityIcon(figure.rarity)}
                    <span className="text-sm text-wood-secondary font-medium font-fredoka">{figure.rarity}</span>
                  </div>
                  <h3 className="text-xl font-bold text-wood-primary mb-2 font-comfortaa">{figure.name}</h3>
                  <p className="text-wood-secondary text-sm mb-3 font-fredoka">{figure.type}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-wood-primary font-comfortaa">{figure.price}</span>
                    <div className="flex items-center gap-2">
                      <Vault className="w-4 h-4 text-warm-orange" />
                      <span className="text-xs text-warm-orange font-medium">{figure.exclusiveContent}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl
              bg-cream/90 backdrop-blur-md border-3 border-warm-orange/60 p-6 wood-texture">
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-warm-orange" />
                  <span className="text-warm-orange font-medium font-fredoka">Revolutionary Traits</span>
                </div>
                
                <h3 className="text-xl font-bold text-wood-primary mb-3 font-comfortaa">{figure.name}</h3>
                <p className="text-wood-secondary/90 text-sm mb-4 flex-1 font-fredoka">{figure.description}</p>
                
                <div className="space-y-2 mb-4">
                  {figure.traits.map((trait, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-warm-orange rounded-full" />
                      <span className="text-wood-primary/90 text-sm font-fredoka">{trait}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 mb-4 p-2 bg-warm-orange/10 rounded-lg">
                  <Vault className="w-4 h-4 text-warm-orange" />
                  <span className="text-wood-primary text-sm font-fredoka">
                    <strong>{figure.exclusiveContent}</strong> exclusive vault items
                  </span>
                </div>
                
                <Link 
                  to={`/product/${figure.id}`}
                  className="block w-full bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-3 px-4 rounded-2xl
                  text-center transition-all duration-300 transform hover:scale-105 active:scale-95 font-fredoka wooden-glow"
                >
                  Join Revolution
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};