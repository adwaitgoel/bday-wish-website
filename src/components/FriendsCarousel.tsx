import { Friend } from "../types/index";

interface FriendsCarouselProps {
  friends: Friend[];
  groupColors: Record<string, string>;
  onFriendSelect: (friend: Friend) => void;
  selectedFriend: Friend;
}
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';



const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipeConfidenceThreshold = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function FriendsCarousel({ friends, groupColors, onFriendSelect, selectedFriend }: FriendsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % friends.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + friends.length) % friends.length);
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipeConfidenceThreshold(offset.x, velocity.x);

    if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
      nextSlide();
    } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
      prevSlide();
    }
  };

  const handleCardClick = (friend: Friend) => {
    onFriendSelect(friend);
  };

  // Auto-advance carousel every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentFriend = friends[currentIndex];
  const progressPercentage = ((currentIndex + 1) / friends.length) * 100;

  return (
    <div className="px-4 mb-12">
      <div className="max-w-2xl mx-auto">
        {/* Main Card Container */}
        <div className="relative h-96 md:h-[28rem] overflow-hidden">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-lg border-2 border-violet-200 hover:border-violet-300 transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white shadow-lg border-2 border-violet-200 hover:border-violet-300 transition-colors duration-200"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Friend Image Cards */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              onClick={() => handleCardClick(currentFriend)}
              className="absolute inset-0 cursor-pointer"
            >
              <Card className={`
                h-full mx-8 md:mx-12 
                ${groupColors[currentFriend.group]} 
                border-2 shadow-xl hover:shadow-2xl 
                transition-all duration-500 overflow-hidden
                group hover:scale-[1.02]
                glass-effect card-glow birthday-card-hover magic-hover
              `}>
                <CardContent className="p-0 h-full relative">
                  {/* Friend Image - Removed hover zoom and tint overlay */}
                  <div className="relative h-full overflow-hidden">
                    {/* Removed the purple tint overlay div */}
                    <ImageWithFallback
                      src={currentFriend.avatar}
                      alt={`${currentFriend.name}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    
                    {/* Group Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/90 text-gray-800 border-0 shadow-lg backdrop-blur-sm"
                      >
                        {currentFriend.group}
                      </Badge>
                    </div>

                    {/* Click to view wish indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute top-4 left-4 z-20"
                    >
                      <div className="bg-violet-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                        Click to view wish 💌
                      </div>
                    </motion.div>
                    
                    {/* Name at bottom - with subtle gradient for text readability */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg text-center mb-2 section-heading celebration-text"
                      >
                        {currentFriend.name}
                      </motion.h3>
                      
                      {/* Decorative heart */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-center text-violet-300 text-xl"
                      >
                        💖
                      </motion.div>
                    </div>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-white/10 backdrop-blur-sm" 
                       style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 backdrop-blur-sm" 
                       style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
                  
                  {/* Floating sparkles */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.7
                      }}
                      className="absolute text-violet-300 text-lg pointer-events-none z-10"
                      style={{
                        top: `${20 + (i * 20)}%`,
                        right: `${10 + (i * 15)}%`
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar - Enhanced visibility */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="relative">
            {/* Background track - more visible */}
            <div className="w-full h-2 bg-slate-300 rounded-full shadow-inner" />
            {/* Progress fill - enhanced gradient */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-0 left-0 h-2 rounded-full shadow-sm"
              style={{
                background: `linear-gradient(90deg, 
                  rgb(59 130 246) 0%, 
                  rgb(124 58 237) 50%, 
                  rgb(147 51 234) 100%)`
              }}
            />
          </div>
        </div>

        {/* Card Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-4"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full px-4 py-2 shadow-sm">
            <span className="text-sm font-medium text-gray-700">
              {currentIndex + 1} of {friends.length}
            </span>
            <span className="text-violet-500">•</span>
            <span className="text-xs text-muted-foreground">
              Click card to read wish
            </span>
          </div>
        </motion.div>

        {/* Quick Jump Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-4 gap-2 flex-wrap"
        >
          {Object.entries(groupColors).map(([group, colorClass], groupIndex) => {
            const groupFriends = friends.filter(f => f.group === group);
            const firstFriendIndex = friends.findIndex(f => f.group === group);
            
            return (
              <button
                key={group}
                onClick={() => {
                  setDirection(firstFriendIndex > currentIndex ? 1 : -1);
                  setCurrentIndex(firstFriendIndex);
                }}
                className={`
                  px-3 py-1 rounded-full text-xs transition-all duration-300 magic-hover
                  ${currentFriend.group === group 
                    ? 'birthday-button text-white shadow-md pulse-glow' 
                    : 'bg-white/80 text-gray-600 hover:bg-violet-100 birthday-card-hover'
                  }
                `}
              >
                {group}
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
