import { Friend } from "./types/index";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CentralAvatar } from './components/CentralAvatar';
import { FriendsCarousel } from './components/FriendsCarousel';
import { WishDisplay } from './components/WishDisplay';
import { Gallery } from './components/Gallery';
import './styles/globals.css'

// Mock data for friends and family - Updated with contact info
const friendsData = [
  // Fam Jam (3 people)
  { id: 1, name: "Mom", group: "Fam Jam", avatar: "woman portrait", wish: "Happy birthday my sweetest daughter! You bring so much joy to our family. May this year be filled with endless happiness and beautiful memories! 🎂💕", contact: { type: "whatsapp" as const, value: "+919876543210" } },
  { id: 2, name: "Dad", group: "Fam Jam", avatar: "man portrait", wish: "To my amazing daughter, happy birthday! I'm so proud of the wonderful person you've become. Here's to another year of adventures! 🎉", contact: { type: "email" as const, value: "dad@family.com" } },
  { id: 3, name: "Sarah (Sister)", group: "Fam Jam", avatar: "young woman", wish: "Happy birthday to the best sister ever! Thanks for always being there for me. Can't wait to celebrate with you! 🎈", contact: { type: "whatsapp" as const, value: "+919876543211" } },
  
  // Langotiyas (3 people)
  { id: 4, name: "Priya", group: "Langotiyas", avatar: "childhood friend", wish: "Happy birthday to my oldest friend! From playground adventures to now - our friendship has stood the test of time! 🌟", contact: { type: "whatsapp" as const, value: "+919876543212" } },
  { id: 5, name: "Arjun", group: "Langotiyas", avatar: "school friend", wish: "Happy birthday! Remember when we used to trade lunch snacks? Those were the days! Hope you have the best day ever! 🍎", contact: { type: "email" as const, value: "arjun@email.com" } },
  { id: 6, name: "Kavya", group: "Langotiyas", avatar: "young girl friend", wish: "Happy birthday BFF! From sleepovers to secret diaries - we've shared it all! Love you forever! 💕", contact: { type: "whatsapp" as const, value: "+919876543213" } },
  
  // Nathkhat Neighborhood (11 people)
  { id: 7, name: "Mrs. Sharma", group: "Nathkhat Neighborhood", avatar: "neighbor woman", wish: "Happy birthday dear! I've watched you grow up into such a wonderful young woman. The neighborhood is lucky to have you! 🏠", contact: { type: "email" as const, value: "sharma@neighborhood.com" } },
  { id: 8, name: "Rohit Uncle", group: "Nathkhat Neighborhood", avatar: "neighbor guy", wish: "Happy birthday beta! Thanks for always being so kind and bringing such positive energy to our street! 🌻", contact: { type: "whatsapp" as const, value: "+919876543214" } },
  { id: 9, name: "Meera Aunty", group: "Nathkhat Neighborhood", avatar: "latina woman", wish: "Happy birthday bachcha! You're such a sweet girl. May your birthday be filled with love and laughter! 🎉", contact: { type: "email" as const, value: "meera@email.com" } },
  { id: 10, name: "Grandfather Ji", group: "Nathkhat Neighborhood", avatar: "elderly neighbor", wish: "Happy birthday young lady! Your smile always brightens my day when I see you around the neighborhood! 😊", contact: { type: "email" as const, value: "grandpa@family.com" } },
  { id: 11, name: "Ananya", group: "Nathkhat Neighborhood", avatar: "neighbor teen", wish: "Happy birthday didi! You're like the cool older sister I never had. Hope your day is absolutely perfect! ✨", contact: { type: "whatsapp" as const, value: "+919876543215" } },
  { id: 12, name: "The Guptas", group: "Nathkhat Neighborhood", avatar: "family portrait", wish: "Happy birthday from the Gupta family! You've always been so wonderful to our kids. Have a fantastic day! 👨‍👩‍👧‍👦", contact: { type: "email" as const, value: "guptas@family.com" } },
  { id: 13, name: "Sunita Aunty", group: "Nathkhat Neighborhood", avatar: "middle aged woman", wish: "Happy birthday sweetie! Your positive attitude is contagious. Wishing you all the happiness in the world! 🌈", contact: { type: "whatsapp" as const, value: "+919876543216" } },
  { id: 14, name: "Vikram Bhaiya", group: "Nathkhat Neighborhood", avatar: "hispanic man", wish: "Happy birthday! Thanks for always lending a helping hand. You're one of the good ones! 🙌", contact: { type: "email" as const, value: "vikram@email.com" } },
  { id: 15, name: "Pooja (Dog Walker)", group: "Nathkhat Neighborhood", avatar: "woman with dog", wish: "Happy birthday! Bruno and I always look forward to seeing you on our walks. You're the sweetest! 🐕", contact: { type: "whatsapp" as const, value: "+919876543217" } },
  { id: 16, name: "Ravi Chacha", group: "Nathkhat Neighborhood", avatar: "elderly man", wish: "Happy birthday beta! Your parents raised such a wonderful daughter. May you achieve all your dreams! 🙏", contact: { type: "email" as const, value: "ravi@email.com" } },
  { id: 17, name: "Neha", group: "Nathkhat Neighborhood", avatar: "young neighbor", wish: "Happy birthday! Thanks for always helping me with my homework. You're the best tutor ever! 📚", contact: { type: "whatsapp" as const, value: "+919876543218" } },
  
  // Work Chums (8 people)
  { id: 18, name: "Rebecca (Boss)", group: "Work Chums", avatar: "professional woman", wish: "Happy birthday! You're such a valuable team member. Hope you take some time to celebrate yourself today! 💼", contact: { type: "email" as const, value: "rebecca@company.com" } },
  { id: 19, name: "David", group: "Work Chums", avatar: "coworker man", wish: "Happy birthday colleague! Thanks for making work fun and always being so helpful. Enjoy your special day! 🎂", contact: { type: "email" as const, value: "david@company.com" } },
  { id: 20, name: "Sneha", group: "Work Chums", avatar: "indian woman professional", wish: "Happy birthday! Your creativity and positive energy make our workplace so much better. Have an amazing day! 🌟", contact: { type: "whatsapp" as const, value: "+919876543219" } },
  { id: 21, name: "Mark", group: "Work Chums", avatar: "business man", wish: "Happy birthday! From coffee breaks to project deadlines - you're an awesome teammate! 🎊", contact: { type: "email" as const, value: "mark@company.com" } },
  { id: 22, name: "Coffee Club Crew", group: "Work Chums", avatar: "office group", wish: "Happy birthday from your coffee club crew! Thanks for always bringing the best treats. We appreciate you! ☕", contact: { type: "email" as const, value: "coffeeclub@company.com" } },
  { id: 23, name: "Jennifer", group: "Work Chums", avatar: "professional woman 2", wish: "Happy birthday! Your dedication and teamwork inspire us all. Hope your day is as amazing as you are! 🌟", contact: { type: "email" as const, value: "jennifer@company.com" } },
  { id: 24, name: "Ahmed", group: "Work Chums", avatar: "middle eastern man", wish: "Happy birthday! Thanks for always being there to help solve the trickiest problems. You're a lifesaver! 🚀", contact: { type: "whatsapp" as const, value: "+919876543220" } },
  { id: 25, name: "Lisa", group: "Work Chums", avatar: "young professional", wish: "Happy birthday! Our lunch conversations always brighten my day. Hope yours is filled with joy! 🥳", contact: { type: "email" as const, value: "lisa@company.com" } },
  
  // Study Buddies (5 people)
  { id: 26, name: "Emma", group: "Study Buddies", avatar: "college student woman", wish: "Happy birthday bestie! College wouldn't have been the same without you. Here's to our lifelong friendship! 🥳", contact: { type: "whatsapp" as const, value: "+919876543221" } },
  { id: 27, name: "Jake", group: "Study Buddies", avatar: "college student man", wish: "Happy birthday! Those late-night study sessions and pizza runs were legendary. Hope your day is as awesome as you are! 🍕", contact: { type: "email" as const, value: "jake@college.edu" } },
  { id: 28, name: "Mia", group: "Study Buddies", avatar: "student with glasses", wish: "Happy birthday gorgeous! From dorm room dance parties to graduation - what a journey! Love you tons! 💃", contact: { type: "whatsapp" as const, value: "+919876543222" } },
  { id: 29, name: "Alex", group: "Study Buddies", avatar: "young man casual", wish: "Happy birthday! Thanks for being such an amazing friend through all the ups and downs of college life! 🎓", contact: { type: "email" as const, value: "alex@college.edu" } },
  { id: 30, name: "Lily", group: "Study Buddies", avatar: "cheerful woman", wish: "Happy birthday sweetie! Our friendship means the world to me. Can't wait to catch up soon! 💫", contact: { type: "whatsapp" as const, value: "+919876543223" } }
];

const groupColors = {
  "Fam Jam": "bg-gradient-to-br from-violet-50 to-violet-100 border-violet-200",
  "Langotiyas": "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200", 
  "Nathkhat Neighborhood": "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200",
  "Work Chums": "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
  "Study Buddies": "bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200"
};

export default function App() {
  const [selectedFriend, setSelectedFriend] = useState<Friend>(friendsData[0]);
  const [showWish, setShowWish] = useState(false);

  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriend(friend);
    setShowWish(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent mb-2">
          🎉 Happy Birthday! 🎉
        </h1>
        <p className="text-muted-foreground">
          30 special people sent you birthday wishes!
        </p>
      </motion.div>

      {/* Central Avatar */}
      <CentralAvatar />

      {/* Friends Carousel */}
      <FriendsCarousel 
        friends={friendsData}
        groupColors={groupColors}
        onFriendSelect={handleFriendSelect}
        selectedFriend={selectedFriend}
      />

      {/* Wish Display */}
      <WishDisplay 
        friend={selectedFriend}
        isVisible={showWish}
        onClose={() => setShowWish(false)}
      />

      {/* Gallery - Replaces ShareButtons */}
      <Gallery />

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-12 px-4"
      >
        <p className="text-sm text-muted-foreground">
          Made with 💖 for the most amazing birthday girl
        </p>
      </motion.div>
    </div>
  );
}