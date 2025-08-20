import { Friend } from "../types/index";
import { motion } from 'framer-motion';
import { X, MessageCircle, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface WishDisplayProps {
  friend: Friend;
  isVisible: boolean;
  onClose: () => void;
}

export function WishDisplay({ friend, isVisible, onClose }: WishDisplayProps) {
  const handleSayThanks = () => {
    const thankYouMessage = "Thank you so much for the warm wishes! 💕";
    
    if (friend.contact.type === 'whatsapp') {
      // Format phone number and create WhatsApp URL
      const phoneNumber = friend.contact.value.replace(/[^\d]/g, ''); // Remove non-digits
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(thankYouMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else if (friend.contact.type === 'email') {
      // Create email URL
      const emailUrl = `mailto:${friend.contact.value}?subject=${encodeURIComponent('Thank you for the birthday wishes!')}&body=${encodeURIComponent(thankYouMessage)}`;
      window.open(emailUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Birthday wish from ${friend.name}`,
        text: friend.wish,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(
        `Birthday wish from ${friend.name}: ${friend.wish}\n\nSent with love from your birthday website! 🎂`
      );
      alert('Wish copied to clipboard!');
    }
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="w-full max-w-lg"
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-violet-50 border-2 border-violet-200 shadow-2xl">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCloseClick}
            className="absolute top-2 right-2 z-30 bg-white/90 hover:bg-white shadow-lg border border-violet-200 hover:border-violet-300"
          >
            <X className="h-4 w-4 text-gray-600" />
          </Button>

          <CardContent className="p-0">
            {/* Header with Friend Image */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent z-10" />
                <ImageWithFallback
                  src={friend.avatar}
                  alt={`${friend.name}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Friend info overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1">{friend.name}</h3>
                  <div className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
                    {friend.group}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Wish Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-inner border border-violet-100 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-4xl text-violet-300 leading-none">"</div>
                  <p className="text-gray-700 leading-relaxed flex-1 pt-2">
                    {friend.wish}
                  </p>
                  <div className="text-4xl text-violet-300 leading-none self-end">"</div>
                </div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSayThanks}
                  className="flex-1 gap-2 bg-white/80 hover:bg-white border-violet-200 hover:border-violet-300"
                >
                  <MessageCircle className="h-4 w-4 text-violet-500" />
                  Say Thanks!
                </Button>
              </motion.div>

              {/* Contact Type Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mt-3"
              >
                <p className="text-xs text-muted-foreground">
                  Will open {friend.contact.type === 'whatsapp' ? 'WhatsApp' : 'Email'} to send thanks
                </p>
              </motion.div>
            </motion.div>
          </CardContent>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-200/50 to-transparent" 
               style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%)' }} />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-200/50 to-transparent"
               style={{ clipPath: 'polygon(0 50%, 0 100%, 50% 100%)' }} />
          
          {/* Floating Hearts */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.7
              }}
              className="absolute text-violet-400 text-xs pointer-events-none"
              style={{
                top: `${20 + i * 25}%`,
                right: `${5 + i * 10}%`
              }}
            >
              💖
            </motion.div>
          ))}
        </Card>
      </motion.div>
    </motion.div>
  );
}
