import { Friend } from "../types/index";
import { motion } from 'framer-motion';
import { X, MessageCircle, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WishDisplayProps {
  friend: Friend;
  isVisible: boolean;
  onClose: () => void;
}

const questionConfig = [
  {
    key: 'importantMoment' as const,
    icon: '✨',
    title: 'The moment I realized you are an important presence in my life',
    color: 'from-violet-500 to-purple-500'
  },
  {
    key: 'personalityEmojis' as const,
    icon: '😊',
    title: 'Your personality in 5 emojis',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    key: 'hiddenTrait' as const,
    icon: '🔍',
    title: 'Something about you that you don\'t realize about yourself is',
    color: 'from-indigo-500 to-violet-500'
  },
  {
    key: 'warningLabel' as const,
    icon: '⚠️',
    title: 'A warning label for you',
    color: 'from-orange-500 to-red-500'
  },
  {
    key: 'neverChange' as const,
    icon: '💎',
    title: 'What I hope never changes about you',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    key: 'futureAdvice' as const,
    icon: '🌟',
    title: 'This is my advice for your future',
    color: 'from-purple-500 to-pink-500'
  },
  {
    key: 'birthdayWish' as const,
    icon: '🎂',
    title: 'My wish for your birthday and beyond is',
    color: 'from-pink-500 to-rose-500'
  }
];

export function WishDisplay({ friend, isVisible, onClose }: WishDisplayProps) {
  const handleSayThanks = () => {
    const thankYouMessage = "Thank you so much for the warm wishes! 💕";
    
    if (friend.contact.type === 'whatsapp') {
      const phoneNumber = friend.contact.value.replace(/[^\d]/g, '');
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(thankYouMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else if (friend.contact.type === 'email') {
      const emailUrl = `mailto:${friend.contact.value}?subject=${encodeURIComponent('Thank you for the birthday wishes!')}&body=${encodeURIComponent(thankYouMessage)}`;
      window.open(emailUrl, '_blank', 'noopener,noreferrer');
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

  // Use responses if available, otherwise fall back to simple wish
  const hasResponses = friend.responses && Object.values(friend.responses).some(response => response);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ y: "20px", opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: "20px", opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] my-auto"
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-violet-50 border-2 border-violet-200 shadow-2xl flex flex-col h-full glass-effect card-glow">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCloseClick}
            className="absolute top-2 right-2 z-30 bg-white/90 hover:bg-white shadow-lg border border-violet-200 hover:border-violet-300 transition-colors duration-200"
          >
            <X className="h-4 w-4 text-gray-600" />
          </Button>

          {/* Header with Friend Image - Fixed */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="relative flex-shrink-0"
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
                <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1 section-heading">{friend.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-lg text-sm font-medium">
                    {friend.group}
                  </div>
                  <div className="text-white/90 text-sm flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    Special Message
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 space-y-4"
            >
              {hasResponses ? (
                /* New Question-Answer Format */
                <div className="space-y-4">
                  {questionConfig.map((question, index) => {
                    const response = friend.responses?.[question.key];
                    if (!response) return null;

                    return (
                      <motion.div
                        key={question.key}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="group"
                      >
                        <Card className="bg-white/70 backdrop-blur-sm border border-violet-100 hover:border-violet-200 transition-all duration-300 hover:shadow-md glass-effect birthday-card-hover magic-hover">
                          <CardContent className="p-4">
                            {/* Question Header */}
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`
                                text-2xl p-2 rounded-full bg-gradient-to-r ${question.color} 
                                bg-opacity-10 flex-shrink-0 group-hover:scale-110 transition-transform duration-300
                              `}>
                                {question.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className={`
                                  font-semibold text-sm mb-2 bg-gradient-to-r ${question.color} 
                                  bg-clip-text text-transparent leading-relaxed section-heading
                                `}>
                                  {question.title}
                                </h4>
                                <div className="bg-white/80 rounded-lg p-3 shadow-inner border border-violet-50">
                                  <p className="text-gray-700 leading-relaxed text-sm">
                                    {response}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                /* Fallback to Original Wish Format */
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-inner border border-violet-100">
                  <div className="flex items-start gap-3">
                    <div className="text-4xl text-violet-300 leading-none">"</div>
                    <p className="text-gray-700 leading-relaxed flex-1 pt-2">
                      {friend.wish}
                    </p>
                    <div className="text-4xl text-violet-300 leading-none self-end">"</div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Fixed Action Buttons at Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-shrink-0 p-6 pt-0 bg-white/80"
          >
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSayThanks}
                className="flex-1 gap-2 bg-white/80 hover:bg-white border-violet-200 hover:border-violet-300 transition-colors duration-200"
              >
                <MessageCircle className="h-4 w-4 text-violet-500" />
                Say Thanks!
              </Button>
            </div>

            {/* Contact Type Indicator */}
            <p className="text-xs text-muted-foreground text-center mt-3">
              Will open {friend.contact.type === 'whatsapp' ? 'WhatsApp' : 'Email'} to send thanks
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-200/30 to-transparent pointer-events-none" 
               style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%)' }} />
          
          {/* Floating Elements */}
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