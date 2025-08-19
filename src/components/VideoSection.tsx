import { motion } from 'framer-motion';
import { Play, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Friend {
  id: number;
  name: string;
  group: string;
  avatar: string;
  wish: string;
  hasVideo: boolean;
}

interface VideoSectionProps {
  friends: Friend[];
}

export function VideoSection({ friends }: VideoSectionProps) {
  const handleVideoClick = (friend: Friend) => {
    // In a real app, this would open a video player
    alert(`Playing video message from ${friend.name}! 🎬\n\n(In a real implementation, this would open the video player)`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="px-4 mb-12"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-4xl mb-2"
          >
            🎬
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Video Messages
          </h2>
          <p className="text-muted-foreground">
            {friends.length} special people recorded video wishes for you!
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="cursor-pointer group overflow-hidden hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-red-50 border-red-200"
                onClick={() => handleVideoClick(friend)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-300">
                        <ImageWithFallback
                          src={`https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&q=1&auto=format`}
                          alt={`${friend.name} avatar`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        📹
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm">{friend.name}</CardTitle>
                      <Badge variant="outline" className="text-xs bg-red-50 border-red-200">
                        {friend.group}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden mb-3 group-hover:shadow-md transition-shadow">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10" />
                    
                    {/* Play Button */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg group-hover:bg-red-600 transition-colors">
                        <Play className="h-5 w-5 ml-1" fill="currentColor" />
                      </div>
                    </motion.div>

                    {/* Video Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      0:{String(Math.floor(Math.random() * 45) + 15).padStart(2, '0')}
                    </div>

                    {/* Sparkle Effects */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.7
                        }}
                        className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                        style={{
                          top: `${20 + i * 30}%`,
                          left: `${10 + i * 40}%`
                        }}
                      />
                    ))}
                  </div>

                  {/* Video Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {friend.wish.slice(0, 80)}...
                  </p>
                </CardContent>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none"
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2">
            <Users className="h-4 w-4 text-red-600" />
            <span className="text-sm text-red-700">
              {friends.length} video messages • Total runtime: ~{Math.floor(friends.length * 1.5)} minutes
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}