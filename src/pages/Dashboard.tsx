import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Check, 
  Clock, 
  Play, 
  Music, 
  Video, 
  Image, 
  Lock, 
  Unlock,
  QrCode,
  Sparkles,
  Zap,
  Star,
  Crown,
  Home,
  Archive,
  Settings,
  User,
  Trophy,
  Vault,
  Menu,
  X
} from 'lucide-react';
import { WoodenCursor } from '@/components/WoodenCursor';
import { RetroVision } from '@/components/RetroVision';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { woodenFigures } from '@/components/WoodenFigureCards';

interface CollectibleItem {
  id: string;
  name: string;
  type: string;
  image: string;
  verified: boolean;
  dateAdded: string;
  exclusiveContent: ExclusiveContent[];
}

interface ExclusiveContent {
  id: string;
  title: string;
  type: 'video' | 'music' | 'image';
  thumbnail: string;
  url: string;
  creator: string;
  description: string;
  dateReleased: string;
}

const Dashboard = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisionActive, setIsVisionActive] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [collectibleId, setCollectibleId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const { toast } = useToast();

  // Revolutionary mock data for user's collectibles
  const [myCollectibles, setMyCollectibles] = useState<CollectibleItem[]>([
    {
      id: 'STIKA-REV-1234',
      name: 'StikaDeux Genesis',
      type: "Revolutionary Edition",
      image: '/images/original.png',
      verified: true,
      dateAdded: '2025-06-10',
      exclusiveContent: [
        {
          id: 'content-1',
          title: 'Genesis Manifesto: The Revolution Begins',
          type: 'video',
          thumbnail: '/images/original.png',
          url: '#',
          creator: 'StikaDeux Collective',
          description: 'Witness the birth of a new era in collectibles. This exclusive documentary reveals how StikaDeux is revolutionizing the relationship between creators and collectors forever.',
          dateReleased: '2025-06-15'
        },
        {
          id: 'content-2',
          title: 'Revolutionary Collector\'s Vault Guide',
          type: 'image',
          thumbnail: '/images/original.png',
          url: '#',
          creator: 'StikaDeux Collective',
          description: 'Your complete guide to unlocking the infinite potential of your StikaDeux collection and accessing content that exists nowhere else in the universe.',
          dateReleased: '2025-06-12'
        }
      ]
    }
  ]);

  // Handle mouse movement for custom cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate new collectible based on ID - Revolutionary Edition
  const generateCollectibleFromId = (id: string): CollectibleItem | null => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    if (id.includes('KAI')) {
      const kaiProduct = woodenFigures.find(fig => fig.name.includes('Kai'));
      if (kaiProduct) {
        return {
          id,
          name: `${kaiProduct.name} - StikaDeux Edition`,
          type: 'Creator Revolution',
          image: kaiProduct.image,
          verified: true,
          dateAdded: currentDate,
          exclusiveContent: [
            {
              id: `content-kai-1`,
              title: 'Kai\'s Secret Vault: Unreleased Gaming Sessions',
              type: 'video',
              thumbnail: kaiProduct.image,
              url: '#',
              creator: 'Kai Cenat',
              description: 'Step into Kai\'s private world with never-before-seen gaming content, behind-the-scenes moments, and exclusive interactions with fans. This content will never be available anywhere else.',
              dateReleased: currentDate
            },
            {
              id: `content-kai-2`,
              title: 'The Real Kai: Unfiltered Studio Chronicles',
              type: 'video',
              thumbnail: kaiProduct.image,
              url: '#',
              creator: 'Kai Cenat',
              description: 'Experience raw, uncut footage of Kai\'s creative process, personal thoughts, and the real moments that happen when the cameras "officially" stop rolling.',
              dateReleased: currentDate
            },
            {
              id: `content-kai-3`,
              title: 'Kai\'s Personal Message to You',
              type: 'video',
              thumbnail: kaiProduct.image,
              url: '#',
              creator: 'Kai Cenat',
              description: 'A personal thank you message from Kai exclusively for StikaDeux collectors. Each message contains unique easter eggs and personal stories.',
              dateReleased: currentDate
            }
          ]
        };
      }
    } else if (id.includes('DOJA')) {
      const dojaProduct = woodenFigures.find(fig => fig.name.includes('Doja'));
      if (dojaProduct) {
        return {
          id,
          name: `${dojaProduct.name} - StikaDeux Edition`,
          type: 'Musical Revolution',
          image: dojaProduct.image,
          verified: true,
          dateAdded: currentDate,
          exclusiveContent: [
            {
              id: `content-doja-1`,
              title: 'Doja\'s Lost Tracks: The Vault Collection',
              type: 'music',
              thumbnail: dojaProduct.image,
              url: '#',
              creator: 'Doja Cat',
              description: 'Discover unreleased tracks that will never see streaming platforms. These are Doja\'s most experimental and personal works, exclusively for StikaDeux revolutionaries.',
              dateReleased: currentDate
            },
            {
              id: `content-doja-2`,
              title: 'Studio Secrets: Creating Musical Magic',
              type: 'video',
              thumbnail: dojaProduct.image,
              url: '#',
              creator: 'Doja Cat',
              description: 'Go behind the curtain and witness Doja\'s creative genius in action. See how hits are born and experience the raw creative energy that powers her music.',
              dateReleased: currentDate
            },
            {
              id: `content-doja-3`,
              title: 'Doja\'s Digital Art Gallery',
              type: 'image',
              thumbnail: dojaProduct.image,
              url: '#',
              creator: 'Doja Cat',
              description: 'Explore Doja\'s private collection of digital artworks, sketches, and visual concepts that inspired her music. These pieces exist only in the StikaDeux universe.',
              dateReleased: currentDate
            }
          ]
        };
      }
    } else if (id.includes('STIKA')) {
      const originalProduct = woodenFigures.find(fig => fig.name.includes('StikaDeux') || fig.name.includes('Original'));
      if (originalProduct) {
        return {
          id,
          name: `${originalProduct.name} - StikaDeux Revolution`,
          type: 'Genesis Edition',
          image: originalProduct.image,
          verified: true,
          dateAdded: currentDate,
          exclusiveContent: [
            {
              id: `content-stika-1`,
              title: 'The Future of Collecting: Revolutionary Previews',
              type: 'image',
              thumbnail: originalProduct.image,
              url: '#',
              creator: 'StikaDeux Collective',
              description: 'Get exclusive early access to upcoming revolutionary releases. See the future of collectibles before anyone else and secure your place in history.',
              dateReleased: currentDate
            },
            {
              id: `content-stika-2`,
              title: 'Founder\'s Circle: Behind the Revolution',
              type: 'video',
              thumbnail: originalProduct.image,
              url: '#',
              creator: 'StikaDeux Collective',
              description: 'Join the inner circle and discover how StikaDeux is changing the world. Access exclusive founder insights and revolutionary strategies.',
              dateReleased: currentDate
            }
          ]
        };
      }
    }
    
    return null;
  };

  // Revolutionary verification process
  const handleVerifyCollectible = async () => {
    if (!collectibleId.trim()) {
      toast({
        title: "Revolution Interrupted",
        description: "Enter your StikaDeux ID to join the content revolution",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    setVerificationStep(1);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerificationStep(2);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      setVerificationStep(3);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newCollectible = generateCollectibleFromId(collectibleId);

      if (newCollectible) {
        setMyCollectibles(prev => [...prev, newCollectible]);
        toast({
          title: "Welcome to the Revolution! 🚀",
          description: `${newCollectible.name} has been added to your vault. Exclusive content unlocked forever!`,
          variant: "default",
        });
        setCollectibleId('');
        setActiveTab('collection');
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid StikaDeux ID. Check your collectible and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Revolutionary Error",
        description: "Something disrupted the process. The revolution continues - try again!",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
      setVerificationStep(0);
    }
  };

  // Content type icon mapping
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'music':
        return <Music className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  // Sidebar menu items
  const sidebarItems = [
    { id: 'overview', name: 'Overview', icon: Home },
    { id: 'collection', name: 'My Collection', icon: Archive },
    { id: 'add', name: 'Add Collectible', icon: Plus },
    { id: 'content', name: 'Exclusive Vault', icon: Vault },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  // Get verification step info
  const getVerificationStepInfo = (step: number) => {
    switch (step) {
      case 1:
        return {
          icon: <QrCode className="w-12 h-12 text-warm-orange animate-pulse" />,
          title: "Scanning Your Revolution...",
          description: "Connecting to your StikaDeux and unlocking your exclusive content vault."
        };
      case 2:
        return {
          icon: <Zap className="w-12 h-12 text-warm-orange animate-pulse" />,
          title: "Verifying Authenticity...",
          description: "Confirming your place in the StikaDeux revolution through our quantum-secured verification."
        };
      case 3:
        return {
          icon: <Crown className="w-12 h-12 text-green-600" />,
          title: "Unlocking Your Vault...",
          description: "Welcome to the revolution! Your exclusive content is being added to your permanent collection."
        };
      default:
        return {
          icon: <Star className="w-12 h-12 text-warm-orange" />,
          title: "Ready to Revolutionize",
          description: "Enter your StikaDeux ID to unlock exclusive content that exists nowhere else."
        };
    }
  };

  const stepInfo = getVerificationStepInfo(verificationStep);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-cream via-wood-light to-sage relative cursor-none wood-texture flex"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <WoodenCursor position={mousePosition} />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--warm-orange)/0.1),transparent_70%)]" />
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-cream/90 backdrop-blur-xl border-r-3 border-wood-primary/30 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Logo and Header */}
          <div className="flex items-center justify-between p-6 border-b border-wood-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-wood-primary rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-cream" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-wood-primary font-comfortaa">StikaDeux</h1>
                <p className="text-xs text-wood-secondary font-fredoka">Revolution Dashboard</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 font-fredoka ${
                    activeTab === item.id
                      ? 'bg-wood-primary text-cream shadow-lg'
                      : 'text-wood-secondary hover:bg-wood-primary/10 hover:text-wood-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-wood-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warm-orange/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-warm-orange" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-wood-primary font-comfortaa">Revolutionary</p>
                <p className="text-xs text-wood-secondary font-fredoka">{myCollectibles.length} collectibles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-cream/50 backdrop-blur-md border-b border-wood-primary/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <Link 
              to="/" 
              className="flex items-center gap-2 text-wood-secondary hover:text-wood-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium font-fredoka">Back to Store</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-wood-primary font-comfortaa">Total Vault Items</p>
              <p className="text-lg font-bold text-warm-orange font-fredoka">
                {myCollectibles.reduce((sum, collectible) => sum + collectible.exclusiveContent.length, 0)}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-wood-primary font-comfortaa mb-2">Welcome to Your Revolution</h2>
                <p className="text-wood-secondary font-fredoka">Manage your StikaDeux collection and exclusive content vault</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-6 wooden-glow wood-texture">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-wood-primary/20 rounded-xl flex items-center justify-center">
                      <Archive className="w-6 h-6 text-wood-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-wood-primary font-comfortaa">{myCollectibles.length}</p>
                      <p className="text-wood-secondary font-fredoka">Collectibles</p>
                    </div>
                  </div>
                </div>

                <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-6 wooden-glow wood-texture">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-warm-orange/20 rounded-xl flex items-center justify-center">
                      <Vault className="w-6 h-6 text-warm-orange" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-wood-primary font-comfortaa">
                        {myCollectibles.reduce((sum, collectible) => sum + collectible.exclusiveContent.length, 0)}
                      </p>
                      <p className="text-wood-secondary font-fredoka">Exclusive Items</p>
                    </div>
                  </div>
                </div>

                <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-6 wooden-glow wood-texture">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                      <Crown className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-wood-primary font-comfortaa">
                        {myCollectibles.filter(c => c.verified).length}
                      </p>
                      <p className="text-wood-secondary font-fredoka">Verified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-6 wooden-glow wood-texture">
                <h3 className="text-xl font-bold text-wood-primary font-comfortaa mb-4">Recent Revolutionary Activity</h3>
                <div className="space-y-3">
                  {myCollectibles.slice(0, 3).map(collectible => (
                    <div key={collectible.id} className="flex items-center gap-3 p-3 bg-cream/50 rounded-xl">
                      <img src={collectible.image} alt={collectible.name} className="w-12 h-12 object-contain rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium text-wood-primary font-comfortaa">{collectible.name}</p>
                        <p className="text-sm text-wood-secondary font-fredoka">Added {collectible.dateAdded}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-warm-orange font-fredoka">{collectible.exclusiveContent.length} items</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Collection Tab */}
          {activeTab === 'collection' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-wood-primary font-comfortaa mb-2">My Revolution</h2>
                <p className="text-wood-secondary font-fredoka">Your verified StikaDeux collectibles</p>
              </div>

              {myCollectibles.length === 0 ? (
                <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-8 text-center wooden-glow wood-texture">
                  <div className="w-16 h-16 bg-warm-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-warm-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-wood-primary mb-2 font-comfortaa">Your Revolution Awaits</h3>
                  <p className="text-wood-secondary mb-6 font-fredoka">Add your first StikaDeux to unlock exclusive content that will be yours forever.</p>
                  <Button 
                    onClick={() => setActiveTab('add')}
                    className="bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-2 px-6 rounded-xl transition-all duration-300 font-fredoka wooden-glow"
                  >
                    Start Revolution
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {myCollectibles.map(collectible => (
                    <div 
                      key={collectible.id}
                      className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl overflow-hidden wooden-glow wood-texture"
                    >
                      <div className="relative h-48">
                        <img 
                          src={collectible.image} 
                          alt={collectible.name}
                          className="w-full h-full object-contain p-4"
                        />
                        <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm rounded-full p-2 border-2 border-wood-primary/30">
                          {collectible.verified ? (
                            <Crown className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-amber-500" />
                          )}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs bg-warm-orange/20 text-warm-orange px-2 py-1 rounded-full font-medium">
                            {collectible.type}
                          </span>
                          <span className="text-xs bg-wood-primary/10 text-wood-primary px-2 py-1 rounded-full">
                            ID: {collectible.id.slice(-4)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-wood-primary mb-1 font-comfortaa">{collectible.name}</h3>
                        <p className="text-wood-secondary/80 text-sm mb-4 font-fredoka">Revolutionized on {collectible.dateAdded}</p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-wood-secondary font-medium">
                            {collectible.exclusiveContent.length} vault items
                          </span>
                          <Button 
                            onClick={() => setActiveTab('content')}
                            className="bg-wood-primary/10 hover:bg-wood-primary/20 text-wood-primary font-medium py-1 px-3 rounded-lg text-sm transition-all duration-300"
                          >
                            Access Vault
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add Collectible Tab */}
          {activeTab === 'add' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-wood-primary font-comfortaa mb-2">Join the Revolution</h2>
                <p className="text-wood-secondary font-fredoka">Add a new StikaDeux to unlock exclusive content</p>
              </div>

              <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-8 wooden-glow wood-texture max-w-2xl">
                <h3 className="text-2xl font-bold text-wood-primary mb-6 font-comfortaa">Register New Collectible</h3>
                
                {isVerifying ? (
                  <div className="space-y-8">
                    <div className="flex flex-col items-center justify-center py-8">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-warm-orange/20 flex items-center justify-center mb-6">
                          {stepInfo.icon}
                        </div>
                        <div className="absolute -bottom-2 right-0 w-8 h-8 bg-cream rounded-full border-2 border-wood-primary/30 flex items-center justify-center">
                          <span className="font-bold text-wood-primary">{verificationStep}/3</span>
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-wood-primary mb-2 font-comfortaa">
                        {stepInfo.title}
                      </h4>
                      
                      <p className="text-wood-secondary text-center max-w-md font-fredoka">
                        {stepInfo.description}
                      </p>
                    </div>
                    
                    <div className="w-full bg-wood-primary/10 rounded-full h-2 mb-6">
                      <div 
                        className="bg-warm-orange h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(verificationStep / 3) * 100}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="collectible-id" className="block text-wood-primary font-medium">
                        StikaDeux Revolutionary ID
                      </label>
                      <Input
                        id="collectible-id"
                        placeholder="Enter your StikaDeux ID (e.g., STIKA-1234, KAI-5678, DOJA-9012)"
                        value={collectibleId}
                        onChange={(e) => setCollectibleId(e.target.value)}
                        className="bg-cream/70 border-wood-primary/30 focus:border-warm-orange"
                        onKeyPress={(e) => e.key === 'Enter' && handleVerifyCollectible()}
                      />
                      <p className="text-wood-secondary/80 text-sm font-fredoka">
                        Your revolutionary ID is etched on your StikaDeux or found in your digital receipt.
                      </p>
                    </div>
                    
                    <div className="flex flex-col space-y-4">
                      {[
                        "Enter your StikaDeux Revolutionary ID",
                        "Verify authenticity through quantum security", 
                        "Unlock exclusive content vault forever"
                      ].map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-warm-orange/20 flex items-center justify-center">
                            <span className="font-bold text-warm-orange">{index + 1}</span>
                          </div>
                          <span className="text-wood-primary font-medium">{step}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={handleVerifyCollectible}
                      disabled={!collectibleId.trim() || isVerifying}
                      className="w-full bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-3 px-6 rounded-xl transition-all duration-300 font-fredoka wooden-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isVerifying ? 'Revolutionizing...' : 'Join the Revolution'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Exclusive Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-wood-primary font-comfortaa mb-2">Exclusive Vault</h2>
                <p className="text-wood-secondary font-fredoka">Your permanent collection of exclusive creator content</p>
              </div>

              {myCollectibles.length === 0 ? (
                <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-8 text-center wooden-glow wood-texture">
                  <div className="w-16 h-16 bg-warm-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-warm-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-wood-primary mb-2 font-comfortaa">Your Vault Awaits</h3>
                  <p className="text-wood-secondary mb-6 font-fredoka">Add StikaDeux collectibles to unlock exclusive creator content.</p>
                  <Button 
                    onClick={() => setActiveTab('add')}
                    className="bg-wood-primary hover:bg-wood-secondary text-cream font-bold py-2 px-6 rounded-xl transition-all duration-300 font-fredoka wooden-glow"
                  >
                    Start Collecting
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {myCollectibles.flatMap(collectible => 
                    collectible.exclusiveContent.map(content => (
                      <div 
                        key={content.id}
                        className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl overflow-hidden wooden-glow wood-texture group"
                      >
                        <div className="relative h-48">
                          <img 
                            src={content.thumbnail} 
                            alt={content.title}
                            className="w-full h-full object-contain p-4"
                          />
                          <div className="absolute inset-0 bg-wood-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button className="bg-warm-orange hover:bg-warm-orange/80 text-cream rounded-full w-12 h-12 flex items-center justify-center">
                              <Play className="w-6 h-6" />
                            </Button>
                          </div>
                          <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm rounded-full p-2 border-2 border-wood-primary/30">
                            {getContentTypeIcon(content.type)}
                          </div>
                          <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm rounded-full px-3 py-1 border-2 border-wood-primary/30 text-xs font-medium text-wood-primary">
                            EXCLUSIVE
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs bg-warm-orange/20 text-warm-orange px-2 py-1 rounded-full font-medium">
                              {collectible.name}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-wood-primary mb-1 font-comfortaa">{content.title}</h3>
                          <p className="text-wood-secondary text-sm mb-3 font-fredoka">By {content.creator}</p>
                          <p className="text-wood-secondary/80 text-sm mb-4 font-fredoka line-clamp-2">{content.description}</p>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-wood-secondary/70 text-xs">
                              Yours forever
                            </span>
                            <Button
                              className="bg-wood-primary hover:bg-wood-secondary text-cream font-medium py-1 px-4 rounded-lg text-sm transition-all duration-300"
                              onClick={() => {
                                toast({
                                  title: "Accessing Exclusive Content 🚀",
                                  description: `Opening ${content.title} from your permanent vault...`,
                                });
                              }}
                            >
                              {content.type === 'music' ? 'Play' : content.type === 'video' ? 'Watch' : 'View'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Other tabs can be added here */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-wood-primary font-comfortaa mb-2">Revolutionary Achievements</h2>
                <p className="text-wood-secondary font-fredoka">Track your progress in the StikaDeux revolution</p>
              </div>
              <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-8 text-center wooden-glow wood-texture">
                <Trophy className="w-16 h-16 text-warm-orange mx-auto mb-4" />
                <h3 className="text-xl font-bold text-wood-primary mb-2 font-comfortaa">Coming Soon</h3>
                <p className="text-wood-secondary font-fredoka">Achievement system is being revolutionized!</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-wood-primary font-comfortaa mb-2">Revolution Settings</h2>
                <p className="text-wood-secondary font-fredoka">Customize your StikaDeux experience</p>
              </div>
              <div className="bg-cream/80 backdrop-blur-md border-3 border-wood-primary/30 rounded-3xl p-8 text-center wooden-glow wood-texture">
                <Settings className="w-16 h-16 text-warm-orange mx-auto mb-4" />
                <h3 className="text-xl font-bold text-wood-primary mb-2 font-comfortaa">Coming Soon</h3>
                <p className="text-wood-secondary font-fredoka">Revolutionary settings panel in development!</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <RetroVision isActive={isVisionActive} mousePosition={mousePosition} />
    </div>
  );
};

export default Dashboard;