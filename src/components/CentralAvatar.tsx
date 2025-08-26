import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CentralAvatar() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="px-4 mb-12"
    >
      <div className="relative max-w-2xl mx-auto">
        {/* Main Avatar - Flush with background, no card wrapper */}
        <motion.div
          animate={{ 
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative aspect-square w-full max-w-md mx-auto overflow-hidden"
        >
          {/* Avatar Image - No overlays or veils */}
          <ImageWithFallback
            src="/sanjana-hero-section-image.png"
            alt="Birthday Girl"
            className="w-full h-full object-contain"
          />
          
          {/* Simple Birthday Title - positioned below image */}
          <div className="absolute -bottom-12 left-0 right-0 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent"
            >
              🎂 Birthday Girl 🎂
            </motion.h2>
          </div>
        </motion.div>

        {/* Minimal Floating Elements - Only key birthday items */}
        <motion.div
          animate={{ 
            y: [0, -12, 0],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-4 right-8 text-3xl z-10"
        >
          🎂
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -6, 6, 0]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -top-2 left-8 text-3xl z-10"
        >
          🎈
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 10, -5, 0]
          }}
          transition={{ 
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/4 -right-6 text-2xl z-10"
        >
          🎁
        </motion.div>

        {/* Subtle Confetti - Reduced to just 3 pieces */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -15, 0],
              x: [0, Math.sin(i) * 8, 0],
              rotate: [0, 180, 360],
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{ 
              duration: 3 + (i * 0.5),
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            className="absolute text-xl z-10"
            style={{
              top: `${30 + (i * 20)}%`,
              left: `${20 + (i * 30)}%`,
              color: ['#93c5fd', '#c4b5fd', '#a78bfa'][i]
            }}
          >
            🎊
          </motion.div>
        ))}

        {/* Gentle Sparkles - Just 2 for minimal effect */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 0.1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 2.5,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 bg-white z-10"
            style={{
              top: `${25 + (i * 35)}%`,
              right: `${15 + (i * 25)}%`,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}