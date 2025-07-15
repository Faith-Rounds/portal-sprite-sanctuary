
import { useState } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface WoodenFigureCardsProps {
  mousePosition: { x: number; y: number };
}

interface WoodenFigure {
  id: number;
  name: string;
  type: string;
  rarity: string;
  price: string;
  description: string;
  image: string;
  traits: string[];
}

const woodenFigures: WoodenFigure[] = [
  {
    id: 1,
    name: "Sage the Wise",
    type: "Ancient Guardian",
    rarity: "Legendary",
    price: "$89.99",
    description: "Hand-carved from century-old oak, Sage brings ancient wisdom to your digital space with interactive storytelling.",
    image: "photo-1618160702438-9b02ab6515c9",
    traits: ["Wisdom Keeper", "Story Teller", "Ancient Knowledge"]
  },
  {
    id: 2,
    name: "Luna the Dreamer",
    type: "Night Companion",
    rarity: "Epic",
    price: "$64.99",
    description: "Crafted from moonlit birch, Luna guides peaceful dreams and creates calming ambient experiences.",
    image: "photo-1466721591366-2d5fba72006d",
    traits: ["Dream Guide", "Night Vision", "Peaceful Aura"]
  },
  {
    id: 3,
    name: "Spark the Creator",
    type: "Innovation Spirit",
    rarity: "Rare",
    price: "$42.99",
    description: "Born from lightning-struck pine, Spark ignites creativity and brings playful energy to digital interactions.",
    image: "photo-1535268647677-300dbf3d78d1",
    traits: ["Creative Spark", "Innovation", "Playful Energy"]
  },
  {
    id: 4,
    name: "Grove the Protector",
    type: "Forest Guardian",
    rarity: "Epic",
    price: "$67.99",
    description: "Carved from ancient redwood, Grove stands as a digital sentinel, protecting your online presence with natural grace.",
    image: "photo-1493962853295-0fd70327578a",
    traits: ["Digital Guardian", "Nature's Strength", "Protective Presence"]
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  src={`https://images.unsplash.com/${figure.image}?auto=format&fit=crop&w=400&h=300`}
                  alt={figure.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-primary/60 via-transparent to-transparent rounded-t-2xl" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cream to-transparent">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-warm-orange" />
                    <span className="text-sm text-wood-secondary font-medium font-fredoka">{figure.rarity}</span>
                  </div>
                  <h3 className="text-xl font-bold text-wood-primary mb-2 font-comfortaa">{figure.name}</h3>
                  <p className="text-wood-secondary text-sm mb-3 font-fredoka">{figure.type}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-wood-primary font-comfortaa">{figure.price}</span>
                    <Heart className="w-6 h-6 text-warm-orange hover:text-soft-pink transition-colors cursor-pointer" />
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
                  <span className="text-warm-orange font-medium font-fredoka">Retro Traits</span>
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
                
                <button className="w-full bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-3 px-4 rounded-2xl
                  transition-all duration-300 transform hover:scale-105 active:scale-95 font-fredoka wooden-glow">
                  Adopt Companion
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
