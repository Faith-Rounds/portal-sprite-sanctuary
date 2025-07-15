
import { useState } from 'react';
import { Heart, Star, Sparkles } from 'lucide-react';

interface CreatureCardsProps {
  mousePosition: { x: number; y: number };
}

interface Creature {
  id: number;
  name: string;
  type: string;
  rarity: string;
  price: string;
  description: string;
  image: string;
  abilities: string[];
}

const creatures: Creature[] = [
  {
    id: 1,
    name: "Luna the Moon Guardian",
    type: "Celestial Spirit",
    rarity: "Legendary",
    price: "$89.99",
    description: "A mystical guardian that watches over dreams and protects against nightmares.",
    image: "photo-1470813740244-df37b8c1edcb",
    abilities: ["Dream Protection", "Lunar Healing", "Starlight Vision"]
  },
  {
    id: 2,
    name: "Sage the Forest Keeper",
    type: "Nature Elemental",
    rarity: "Epic",
    price: "$64.99",
    description: "Ancient wisdom flows through this forest spirit, bringing harmony to nature.",
    image: "photo-1472396961693-142e6e269027",
    abilities: ["Nature Communion", "Healing Herbs", "Forest Whispers"]
  },
  {
    id: 3,
    name: "Glow the Light Weaver",
    type: "Light Sprite",
    rarity: "Rare",
    price: "$42.99",
    description: "A playful sprite that dances through twilight, weaving threads of pure light.",
    image: "photo-1500673922987-e212871fec22",
    abilities: ["Light Manipulation", "Twilight Dance", "Illumination"]
  },
  {
    id: 4,
    name: "Echo the Mountain Spirit",
    type: "Earth Guardian",
    rarity: "Epic",
    price: "$67.99",
    description: "A wise mountain dweller with the power to move earth and stone with gentle whispers.",
    image: "photo-1501854140801-50d01698950b",
    abilities: ["Stone Shaping", "Mountain Call", "Earth Tremor"]
  }
];

export const CreatureCards = ({ mousePosition }: CreatureCardsProps) => {
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
      {creatures.map(creature => (
        <div
          key={creature.id}
          className="relative group perspective-1000"
          style={{ perspective: '1000px' }}
        >
          <div
            className={`relative w-full h-96 transition-all duration-700 preserve-3d cursor-pointer
              ${flippedCards.has(creature.id) ? 'rotate-y-180' : ''}`}
            onClick={() => handleCardClick(creature.id)}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden
              bg-white/10 backdrop-blur-md border border-white/20 group-hover:border-emerald-300/40
              transition-all duration-300">
              <div className="relative h-full">
                <img
                  src={`https://images.unsplash.com/${creature.image}?auto=format&fit=crop&w=400&h=300`}
                  alt={creature.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-emerald-300 font-medium">{creature.rarity}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{creature.name}</h3>
                  <p className="text-emerald-200 text-sm mb-3">{creature.type}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{creature.price}</span>
                    <Heart className="w-6 h-6 text-emerald-300 hover:text-red-400 transition-colors cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl
              bg-white/10 backdrop-blur-md border border-emerald-300/40 p-6">
              <div className="h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                  <span className="text-emerald-300 font-medium">Mystical Abilities</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">{creature.name}</h3>
                <p className="text-white/80 text-sm mb-4 flex-1">{creature.description}</p>
                
                <div className="space-y-2 mb-4">
                  {creature.abilities.map((ability, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-300 rounded-full" />
                      <span className="text-white/90 text-sm">{ability}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-4 rounded-xl
                  transition-all duration-300 transform hover:scale-105 active:scale-95">
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
