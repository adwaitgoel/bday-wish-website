import { motion } from 'framer-motion';
import { Share2, MessageCircle, Mail, Copy, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { toast } from 'sonner';

interface Friend {
  id: number;
  name: string;
  group: string;
  avatar: string;
  wish: string;
}

interface ShareButtonsProps {
  selectedWish: Friend;
}

export function ShareButtons({ selectedWish }: ShareButtonsProps) {
  const shareUrl = window.location.href;
  const shareText = `Check out this amazing birthday wish website! ${selectedWish.name} sent such a sweet message. 🎂✨`;

  const handleShare = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    let url = '';
    
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'messenger':
        url = `https://m.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'email':
        url = `mailto:?subject=Amazing Birthday Wishes!&body=${encodedText}%0A%0A${encodedUrl}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
        toast.success('Link copied to clipboard! 📋');
        return;
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: 'Birthday Wishes Website',
            text: shareText,
            url: shareUrl
          });
        } else {
          handleShare('copy');
        }
        return;
    }
    
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      toast.success(`Opening ${platform}... 🚀`);
    }
  };

  const shareOptions = [
    {
      id: 'native',
      label: 'Share',
      icon: Share2,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Share with friends'
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Share on WhatsApp'
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: 'bg-violet-500 hover:bg-violet-600',
      description: 'Send via email'
    },
    {
      id: 'copy',
      label: 'Copy Link',
      icon: Copy,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: 'Copy to clipboard'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="px-4 mb-8"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 border-2 border-violet-200 shadow-lg">
          <CardContent className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block text-3xl mb-2"
              >
                💝
              </motion.div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Share the Love!
              </h3>
              <p className="text-sm text-muted-foreground">
                Let others see these beautiful birthday wishes
              </p>
            </div>

            {/* Current Selection Preview */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white/80 rounded-lg p-4 mb-6 border border-violet-100"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-violet-400 flex items-center justify-center text-white text-sm">
                  {selectedWish.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-800">
                  Currently viewing: {selectedWish.name}'s wish
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">
                "{selectedWish.wish.slice(0, 100)}..."
              </p>
            </motion.div>

            {/* Share Buttons Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {shareOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => handleShare(option.id)}
                    className={`
                      w-full h-auto p-4 flex flex-col gap-2 
                      bg-white/80 hover:bg-white 
                      border-2 border-violet-200 hover:border-violet-300
                      group transition-all duration-300
                    `}
                  >
                    <div className={`
                      w-10 h-10 rounded-full ${option.color} 
                      flex items-center justify-center
                      group-hover:scale-110 transition-transform
                    `}>
                      <option.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {option.label}
                    </span>
                    <span className="text-xs text-muted-foreground text-center">
                      {option.description}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Fun Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-violet-500" />
                <span>Spreading birthday joy • Made with love</span>
                <Heart className="h-4 w-4 text-violet-500" />
              </div>
            </motion.div>

            {/* Floating Elements */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.8
                }}
                className="absolute text-violet-300 text-sm pointer-events-none"
                style={{
                  top: `${10 + i * 20}%`,
                  right: `${5 + i * 15}%`
                }}
              >
                ✨
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}