import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Mock gallery data - simplified to just photos
const galleryData = {
  photos: [
    {
      id: 'photo-1',
      src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop',
      title: 'Beautiful Moment 1'
    },
    {
      id: 'photo-2', 
      src: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=800&fit=crop',
      title: 'Birthday Celebration'
    },
    {
      id: 'photo-3',
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
      title: 'Sweet Memories'
    },
    {
      id: 'photo-4',
      src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=800&fit=crop',
      title: 'Happy Times'
    },
    {
      id: 'photo-5',
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
      title: 'Joyful Celebration'
    },
    {
      id: 'photo-6',
      src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=800&fit=crop',
      title: 'Precious Moments'
    },
    {
      id: 'photo-7',
      src: 'https://images.unsplash.com/photo-1551301425-68e4e0d6d4a6?w=800&h=800&fit=crop',
      title: 'Cherished Memory'
    },
    {
      id: 'photo-8',
      src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=800&fit=crop&q=80',
      title: 'Beautiful Day'
    }
  ]
};

export function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    setShowPhotoViewer(true);
  };

  const closePhotoViewer = () => {
    setShowPhotoViewer(false);
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % galleryData.photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + galleryData.photos.length) % galleryData.photos.length);
    }
  };

  const handlePhotoViewerBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePhotoViewer();
    }
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="px-4 mb-12"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="inline-block text-3xl mb-2"
            >
              📸
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent mb-2">
              Memory Lane
            </h2>
            <p className="text-muted-foreground mb-6">
              Beautiful moments captured throughout the years - Click photos to view in full size
            </p>
          </motion.div>

          {/* Photo Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            style={{ y }}
          >
            {/* Mobile-First Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {galleryData.photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                  onClick={() => handlePhotoClick(index)}
                >
                  <Card className="overflow-hidden bg-gradient-to-br from-white to-violet-50 border border-violet-200 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative aspect-square overflow-hidden">
                        <ImageWithFallback
                          src={photo.src}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-2"
                          >
                            <ZoomIn className="h-5 w-5 text-violet-600" />
                          </motion.div>
                        </div>

                        {/* Subtle Corner Decoration */}
                        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-violet-200/30 to-transparent" 
                             style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%)' }} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating Decorations */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ 
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 1.5
              }}
              className="absolute text-violet-300 text-xl pointer-events-none"
              style={{
                top: `${10 + i * 25}%`,
                left: `${5 + i * 20}%`
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Photo Viewer Modal */}
      <AnimatePresence>
        {showPhotoViewer && selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={handlePhotoViewerBackdrop}
          >
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={closePhotoViewer}
              className="absolute top-4 right-4 z-[70] bg-white/90 hover:bg-white shadow-lg border-2 border-violet-200"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation Buttons - Enhanced for mobile */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevPhoto}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[70] bg-white/95 hover:bg-white shadow-lg border-2 border-violet-200 w-12 h-12 md:w-10 md:h-10"
            >
              <ChevronLeft className="h-5 w-5 md:h-4 md:w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextPhoto}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[70] bg-white/95 hover:bg-white shadow-lg border-2 border-violet-200 w-12 h-12 md:w-10 md:h-10"
            >
              <ChevronRight className="h-5 w-5 md:h-4 md:w-4" />
            </Button>

            {/* Photo Container - Fixed sizing */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full flex items-center justify-center p-4 pb-20"
            >
              <div className="relative max-w-full max-h-full">
                <ImageWithFallback
                  src={galleryData.photos[selectedPhotoIndex].src}
                  alt={galleryData.photos[selectedPhotoIndex].title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
                
                {/* Floating Hearts - Kept */}
                {[...Array(2)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -15, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 1
                    }}
                    className="absolute text-pink-400 text-lg pointer-events-none"
                    style={{
                      top: `${10 + i * 20}%`,
                      right: `${5 + i * 10}%`
                    }}
                  >
                    💖
                  </motion.div>
                ))}
              </div>
            </motion.div>
            {/* Photo Info - Now positioned absolutely at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 z-[60]"
            >
              <h3 className="text-white font-bold text-lg mb-1">
                {galleryData.photos[selectedPhotoIndex].title}
              </h3>
              <p className="text-white/80 text-sm">
                Photo {selectedPhotoIndex + 1} of {galleryData.photos.length}
              </p>
            </motion.div>
            {/* Photo Counter - Moved up to avoid overlap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg z-[60]"
            >
              <span className="text-sm font-medium text-gray-800">
                {selectedPhotoIndex + 1} / {galleryData.photos.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}