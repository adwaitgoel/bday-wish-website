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
      src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Beautiful Moment 1'
    },
    {
      id: 'photo-2', 
      src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Birthday Celebration'
    },
    {
      id: 'photo-3',
      src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Sweet Memories'
    },
    {
      id: 'photo-4',
      src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Happy Times'
    },
    {
      id: 'photo-5',
      src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Joyful Celebration'
    },
    {
      id: 'photo-6',
      src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Precious Moments'
    },
    {
      id: 'photo-7',
      src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      title: 'Cherished Memory'
    },
    {
      id: 'photo-8',
      src: 'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent mb-2 gradient-text section-heading celebration-text">
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
                  <Card className="overflow-hidden bg-gradient-to-br from-white to-violet-50 border border-violet-200 shadow-md hover:shadow-lg transition-all duration-300 glass-effect birthday-card-hover magic-hover">
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

      {/* Photo Viewer Modal - ULTRA SIMPLE */}
      <AnimatePresence>
        {showPhotoViewer && selectedPhotoIndex !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            {/* Close Button - Fixed at top */}
            <button
              onClick={closePhotoViewer}
              className="fixed top-6 right-6 z-[100] bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors duration-200"
            >
              <X className="h-6 w-6 text-gray-800" />
            </button>

            {/* Navigation Buttons - Fixed positioning */}
            <button
              onClick={prevPhoto}
              className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors duration-200"
            >
              <ChevronLeft className="h-6 w-6 text-gray-800" />
            </button>

            <button
              onClick={nextPhoto}
              className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors duration-200"
            >
              <ChevronRight className="h-6 w-6 text-gray-800" />
            </button>

            {/* Click to close backdrop */}
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={closePhotoViewer}
            />

            {/* Content */}
            <div className="relative z-[90] max-w-4xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center">
              {/* Image */}
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                src={galleryData.photos[selectedPhotoIndex].src}
                alt={galleryData.photos[selectedPhotoIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl mb-4"
              />

              {/* Photo Info */}
              <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4 text-center">
                <h3 className="text-white font-bold text-lg mb-1">
                  {galleryData.photos[selectedPhotoIndex].title}
                </h3>
                <p className="text-white/80 text-sm">
                  Photo {selectedPhotoIndex + 1} of {galleryData.photos.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}