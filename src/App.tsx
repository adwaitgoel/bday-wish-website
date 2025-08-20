import { Friend } from "./types/index";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CentralAvatar } from './components/CentralAvatar';
import { FriendsCarousel } from './components/FriendsCarousel';
import { WishDisplay } from './components/WishDisplay';
import { Gallery } from './components/Gallery';
import './styles/globals.css'

// Mock data for friends and family - Updated with contact info and detailed responses
const friendsData = [
  // Fam Jam (3 people)
  { 
    id: 1, 
    name: "Mom", 
    group: "Fam Jam", 
    avatar: "woman portrait", 
    wish: "Happy birthday my sweetest daughter! You bring so much joy to our family. May this year be filled with endless happiness and beautiful memories! 🎂💕",
    responses: {
      importantMoment: "The day you were born, of course! But truly, it was watching you help that lost child find their parents at the mall when you were just 8. That's when I knew you had the kindest heart.",
      personalityEmojis: "🌟💕🤗🎨✨",
      hiddenTrait: "You don't realize how much your quiet acts of kindness inspire everyone around you. You think you're just being normal, but you're extraordinary.",
      warningLabel: "Warning: Will make you laugh until your stomach hurts, may cause spontaneous hugs, and will always have snacks ready.",
      neverChange: "Your ability to see the good in everyone and your way of making everyone feel like they belong in our family.",
      futureAdvice: "Always trust your heart, beta. It has never led you wrong. And remember, home is always here when you need it.",
      birthdayWish: "I wish for you a lifetime filled with as much joy as you've brought to my life. May you always know how deeply loved you are. Happy birthday, my precious daughter! 💖"
    },
    contact: { type: "whatsapp" as const, value: "+919876543210" } 
  },
  { 
    id: 2, 
    name: "Dad", 
    group: "Fam Jam", 
    avatar: "man portrait", 
    wish: "To my amazing daughter, happy birthday! I'm so proud of the wonderful person you've become. Here's to another year of adventures! 🎉",
    responses: {
      importantMoment: "When you graduated college and I saw you walk across that stage. All those years of hard work, and there you were - my little girl who had become this incredible woman.",
      personalityEmojis: "💪🎯📚💡🌈",
      hiddenTrait: "You have this incredible ability to solve problems that others can't even see. You're like a quiet superhero, always finding ways to make things better.",
      warningLabel: "Caution: May challenge you to be your best self, will remember every important detail about your life, and gives the world's best bear hugs.",
      neverChange: "Your determination and the way you never give up on people you care about. You're my hero in so many ways.",
      futureAdvice: "Take calculated risks, princess. Some of my best decisions seemed scary at first. Trust your intelligence - it's one of your greatest gifts.",
      birthdayWish: "I hope this year brings you adventures that challenge you and achievements that make you proud. You deserve every wonderful thing life has to offer! 🚀"
    },
    contact: { type: "email" as const, value: "dad@family.com" } 
  },
  { 
    id: 3, 
    name: "Sarah (Sister)", 
    group: "Fam Jam", 
    avatar: "young woman", 
    wish: "Happy birthday to the best sister ever! Thanks for always being there for me. Can't wait to celebrate with you! 🎈",
    responses: {
      importantMoment: "When I was crying about my first heartbreak and you dropped everything to come over with ice cream and terrible movies. That's when I knew you weren't just my sister - you were my best friend.",
      personalityEmojis: "🤪🎭💃🍕🦄",
      hiddenTrait: "You're way funnier than you think you are! Your random observations about life crack me up, but you never realize when you're being hilarious.",
      warningLabel: "Warning: May cause uncontrollable laughter, sudden cravings for adventures, and an overwhelming urge to be a better person.",
      neverChange: "The way you can make any situation better just by being you. Even our worst days become funny stories when you're around.",
      futureAdvice: "Stop overthinking everything! You're amazing just as you are. Also, please keep being weird - the world needs more people like you.",
      birthdayWish: "I hope this year is filled with all the random adventures your heart desires and that you finally realize how awesome you are! Love you, sis! 🎂💕"
    },
    contact: { type: "whatsapp" as const, value: "+919876543211" } 
  },
  
  // Langotiyas (3 people)
  { 
    id: 4, 
    name: "Priya", 
    group: "Langotiyas", 
    avatar: "childhood friend", 
    wish: "Happy birthday to my oldest friend! From playground adventures to now - our friendship has stood the test of time! 🌟",
    responses: {
      importantMoment: "Remember when we got lost trying to find that 'secret garden' behind the school? You kept me calm and made it into an adventure. That's when I knew we'd be friends forever.",
      personalityEmojis: "🌻🦋📖🎪🌙",
      hiddenTrait: "You have this magical way of making ordinary moments feel special. You don't even realize you do it, but you turn everyday life into little celebrations.",
      warningLabel: "Caution: May spontaneously burst into childhood memories, will always remember your favorite things, and gives the most thoughtful gifts.",
      neverChange: "Your sense of wonder and the way you find magic in the smallest things. You still look at the world like we did when we were seven.",
      futureAdvice: "Keep that beautiful imagination of yours alive! The world tries to make us too serious, but your creativity is your superpower.",
      birthdayWish: "I hope this year brings you as many beautiful surprises as you've brought into my life over all these years. Here's to many more adventures, bestie! 🌟✨"
    },
    contact: { type: "whatsapp" as const, value: "+919876543212" } 
  },
  { 
    id: 5, 
    name: "Arjun", 
    group: "Langotiyas", 
    avatar: "school friend", 
    wish: "Happy birthday! Remember when we used to trade lunch snacks? Those were the days! Hope you have the best day ever! 🍎",
    responses: {
      importantMoment: "The day you stood up to that bully who was picking on me in 5th grade. You were half his size but you had twice the courage. That's my friend right there!",
      personalityEmojis: "🦸‍♀️🎮🍟😎🚀",
      hiddenTrait: "You're incredibly brave, but you think you're just being normal. You've always been the one to speak up when something isn't right.",
      warningLabel: "Alert: May challenge you to video game competitions, will always share food, and has an endless supply of random facts.",
      neverChange: "Your loyalty and the way you always have your friends' backs. Plus, you still have the best snacks - some things never change!",
      futureAdvice: "Keep being the person who stands up for what's right. The world needs more people like you who aren't afraid to do the right thing.",
      birthdayWish: "Hope your birthday is as epic as those legendary lunch trades we used to do! May this year level up everything in your life! 🎮🎂"
    },
    contact: { type: "email" as const, value: "arjun@email.com" } 
  },
  { 
    id: 6, 
    name: "Kavya", 
    group: "Langotiyas", 
    avatar: "young girl friend", 
    wish: "Happy birthday BFF! From sleepovers to secret diaries - we've shared it all! Love you forever! 💕",
    responses: {
      importantMoment: "During that sleepover when we were 12 and I told you my biggest secret. You didn't judge, you just hugged me and said 'so what, you're still my best friend.' That's true friendship.",
      personalityEmojis: "💖🦄🌸📱✨",
      hiddenTrait: "You're the most loyal person I know, but you don't realize how rare that is. You love people with your whole heart, and that's beautiful.",
      warningLabel: "Warning: Will remember every inside joke from childhood, may cause nostalgic crying sessions, and always has the best gossip.",
      neverChange: "The way you love people completely and fiercely. You make everyone feel like they're your most important person.",
      futureAdvice: "Never let anyone dim your sparkle! You were born to shine bright, and anyone who doesn't see that doesn't deserve you.",
      birthdayWish: "I hope this year is filled with as much magic as those sleepovers where we planned our whole futures! Dream big, beautiful! 💖✨"
    },
    contact: { type: "whatsapp" as const, value: "+919876543213" } 
  },
  
  // Nathkhat Neighborhood (11 people)
  { 
    id: 7, 
    name: "Mrs. Sharma", 
    group: "Nathkhat Neighborhood", 
    avatar: "neighbor woman", 
    wish: "Happy birthday dear! I've watched you grow up into such a wonderful young woman. The neighborhood is lucky to have you! 🏠",
    responses: {
      importantMoment: "When you were 15 and you organized that fundraiser for my husband's medical bills. You went door to door, so determined to help. That's when I knew what a special soul you are.",
      personalityEmojis: "🌺👵💕🏡🌞",
      hiddenTrait: "You have an old soul's wisdom but a young heart's enthusiasm. You see solutions where others see problems.",
      warningLabel: "Caution: Will bring unexpected gifts, may offer unsolicited but excellent life advice, and gives the warmest hugs on the block.",
      neverChange: "Your respectful nature and the way you treat everyone with dignity, regardless of their age or status. You were raised so well.",
      futureAdvice: "Always remember where you came from, beta. Your roots keep you grounded while your dreams help you soar.",
      birthdayWish: "May you always find your way back home, no matter how far life takes you. This neighborhood will always be proud of you! 🏠💕"
    },
    contact: { type: "email" as const, value: "sharma@neighborhood.com" } 
  },
  { 
    id: 8, 
    name: "Rohit Uncle", 
    group: "Nathkhat Neighborhood", 
    avatar: "neighbor guy", 
    wish: "Happy birthday beta! Thanks for always being so kind and bringing such positive energy to our street! 🌻",
    responses: {
      importantMoment: "When you helped me fix my car that day and refused to take any money. You said 'neighbors help neighbors, Uncle.' That's the India I grew up in.",
      personalityEmojis: "🔧😊🌻🚗💪",
      hiddenTrait: "You have natural leadership qualities but you're too humble to see it. People naturally look to you when they need help or guidance.",
      warningLabel: "Alert: May fix things you didn't know were broken, will always wave when passing by, and remembers everyone's birthdays.",
      neverChange: "Your helpful nature and the respect you show to elders. You make us all believe in the goodness of the younger generation.",
      futureAdvice: "Keep your hands busy and your heart open, beta. There's no problem that can't be solved with patience and hard work.",
      birthdayWish: "May your life run as smoothly as a well-tuned engine, and may you always find people willing to help you as you help others! 🚗🎂"
    },
    contact: { type: "whatsapp" as const, value: "+919876543214" } 
  },
  { 
    id: 9, 
    name: "Meera Aunty", 
    group: "Nathkhat Neighborhood", 
    avatar: "latina woman", 
    wish: "Happy birthday bachcha! You're such a sweet girl. May your birthday be filled with love and laughter! 🎉",
    responses: {
      importantMoment: "When you complimented my cooking at the building society function and asked for the recipe. Most young people just politely eat, but you genuinely appreciated it.",
      personalityEmojis: "🍛💕😋🏡👩‍🍳",
      hiddenTrait: "You have a gift for making people feel valued and appreciated. You see the effort people put in, even when others don't notice.",
      warningLabel: "Warning: Will feed you until you burst, may share family recipes, and always asks about your family with genuine interest.",
      neverChange: "Your appreciation for home-cooked food and traditional values. You bridge the gap between generations beautifully.",
      futureAdvice: "Remember to slow down and enjoy life's simple pleasures - a good meal, good company, and good conversation.",
      birthdayWish: "May your life be as rich and flavorful as the best home-cooked meal, filled with love and shared with people who matter! 🍛💕"
    },
    contact: { type: "email" as const, value: "meera@email.com" } 
  },
  { 
    id: 10, 
    name: "Grandfather Ji", 
    group: "Nathkhat Neighborhood", 
    avatar: "elderly neighbor", 
    wish: "Happy birthday young lady! Your smile always brightens my day when I see you around the neighborhood! 😊",
    responses: {
      importantMoment: "Every morning when you smile and say 'Good morning, Grandpa Ji' during my walk. In a world where people barely acknowledge each other, you always see me.",
      personalityEmojis: "🌅😊🚶‍♂️💫🙏",
      hiddenTrait: "You have the rare gift of making people feel seen and valued. You don't realize how much your simple greetings mean to people like me.",
      warningLabel: "Notice: Will share stories from 'back in my day,' may offer life wisdom during casual conversations, and believes in the power of small kindnesses.",
      neverChange: "Your respect for elders and the genuine warmth in your smile. You represent hope for humanity's future.",
      futureAdvice: "Life is long, beta. Be patient with yourself and others. The best things come to those who treat people with kindness.",
      birthdayWish: "May you live a life so full of joy that your smile never fades, and may you always find reasons to greet each new day with hope! 🌅💫"
    },
    contact: { type: "email" as const, value: "grandpa@family.com" } 
  },
  { 
    id: 11, 
    name: "Ananya", 
    group: "Nathkhat Neighborhood", 
    avatar: "neighbor teen", 
    wish: "Happy birthday didi! You're like the cool older sister I never had. Hope your day is absolutely perfect! ✨",
    responses: {
      importantMoment: "When I was having trouble with some girls at school and you gave me advice that actually worked. You understood what it was like to be my age.",
      personalityEmojis: "✨🎭📱💃🌟",
      hiddenTrait: "You're way cooler than you think you are! You have this effortless style and confidence that I totally admire.",
      warningLabel: "Alert: May give amazing fashion advice, will always have the latest trends, and somehow makes everything look effortless.",
      neverChange: "The way you're kind to younger people without being condescending. You treat me like an equal, which means everything.",
      futureAdvice: "Don't let anyone dull your sparkle, didi! You're going to do amazing things, and I can't wait to see what you achieve.",
      birthdayWish: "I hope this year brings you everything you've been dreaming of and more! You deserve all the happiness in the world! ✨🎂"
    },
    contact: { type: "whatsapp" as const, value: "+919876543215" } 
  },
  { 
    id: 12, 
    name: "The Guptas", 
    group: "Nathkhat Neighborhood", 
    avatar: "family portrait", 
    wish: "Happy birthday from the Gupta family! You've always been so wonderful to our kids. Have a fantastic day! 👨‍👩‍👧‍👦",
    responses: {
      importantMoment: "When our little Arjun was crying because he lost his ball and you spent an hour helping him look for it. You treat children with such patience and kindness.",
      personalityEmojis: "👨‍👩‍👧‍👦💕🏠🎈✨",
      hiddenTrait: "You have a natural way with children - they trust you instantly. You'd make an amazing parent someday if that's what you choose.",
      warningLabel: "Caution: Will be adopted by every family in the neighborhood, may be asked to babysit frequently, and children will follow you around.",
      neverChange: "Your patience with children and the way you listen to them like their opinions matter. You make them feel important.",
      futureAdvice: "Whatever path you choose in life, don't forget the impact you have on the next generation. You're shaping young minds.",
      birthdayWish: "May your life be filled with as much joy as you bring to our children, and may you always have reasons to celebrate! 🎈👨‍👩‍👧‍👦"
    },
    contact: { type: "email" as const, value: "guptas@family.com" } 
  },
  { 
    id: 13, 
    name: "Sunita Aunty", 
    group: "Nathkhat Neighborhood", 
    avatar: "middle aged woman", 
    wish: "Happy birthday sweetie! Your positive attitude is contagious. Wishing you all the happiness in the world! 🌈",
    responses: {
      importantMoment: "During the lockdown when you started that WhatsApp group to check on all the elderly neighbors. You kept our spirits up when times were tough.",
      personalityEmojis: "🌈💫📱🤗☀️",
      hiddenTrait: "You're a natural community builder. You bring people together without even trying, and you make everyone feel included.",
      warningLabel: "Warning: May organize impromptu neighborhood gatherings, will check on you when you're sick, and spreads positivity wherever she goes.",
      neverChange: "Your ability to find silver linings and your genuine care for your community. You make the world a brighter place.",
      futureAdvice: "Keep spreading that sunshine energy, beta! The world needs more people like you who choose to see the good in everything.",
      birthdayWish: "May your days be as bright as the joy you bring to others, and may every rainbow lead you to something wonderful! 🌈✨"
    },
    contact: { type: "whatsapp" as const, value: "+919876543216" } 
  },
  { 
    id: 14, 
    name: "Vikram Bhaiya", 
    group: "Nathkhat Neighborhood", 
    avatar: "hispanic man", 
    wish: "Happy birthday! Thanks for always lending a helping hand. You're one of the good ones! 🙌",
    responses: {
      importantMoment: "When you helped me move my furniture without being asked and then refused dinner as payment. You said helping neighbors is just what good people do.",
      personalityEmojis: "💪🏠🤝😎🔧",
      hiddenTrait: "You have this quiet strength that people naturally gravitate towards. You're the person everyone calls when they need real help.",
      warningLabel: "Alert: Will appear with tools when you need help, may fix problems you didn't ask him to fix, and never accepts payment for favors.",
      neverChange: "Your willingness to help without expecting anything in return and your reliable, steady presence in the neighborhood.",
      futureAdvice: "Keep being the person others can count on, but don't forget to ask for help when you need it too. We're all here for you.",
      birthdayWish: "May you always find people as generous and helpful as you are, and may your kindness come back to you tenfold! 🙌💪"
    },
    contact: { type: "email" as const, value: "vikram@email.com" } 
  },
  { 
    id: 15, 
    name: "Pooja (Dog Walker)", 
    group: "Nathkhat Neighborhood", 
    avatar: "woman with dog", 
    wish: "Happy birthday! Bruno and I always look forward to seeing you on our walks. You're the sweetest! 🐕",
    responses: {
      importantMoment: "The day Bruno got loose and you helped me catch him. You were so calm and gentle, and Bruno trusted you immediately. Animals are great judges of character.",
      personalityEmojis: "🐕❤️🌳🚶‍♀️🌸",
      hiddenTrait: "You have this calming energy that even animals can sense. You'd be amazing working with animals or in any healing profession.",
      warningLabel: "Caution: Will stop to pet every dog on the street, may share too many cute animal videos, and always has dog treats in her pocket.",
      neverChange: "Your gentle spirit and the way you connect with all living things. The world needs more people with your kind heart.",
      futureAdvice: "Trust your instincts about people - they're usually right. Your intuitive nature is one of your greatest gifts.",
      birthdayWish: "May your path always be filled with wagging tails, warm sunshine, and the simple joys that make life beautiful! 🐕🌞"
    },
    contact: { type: "whatsapp" as const, value: "+919876543217" } 
  },
  { 
    id: 16, 
    name: "Ravi Chacha", 
    group: "Nathkhat Neighborhood", 
    avatar: "elderly man", 
    wish: "Happy birthday beta! Your parents raised such a wonderful daughter. May you achieve all your dreams! 🙏",
    responses: {
      importantMoment: "When you touched my feet during Diwali and asked for blessings. In today's world, finding young people who respect traditions while being modern is rare.",
      personalityEmojis: "🙏🌺📚🎯💫",
      hiddenTrait: "You balance tradition and modernity beautifully. You honor where you come from while embracing where you're going.",
      warningLabel: "Notice: Will offer blessings during important life events, may share wisdom from past generations, and believes in the power of good values.",
      neverChange: "Your respect for elders and traditions, combined with your progressive thinking. You're the bridge between generations.",
      futureAdvice: "Remember your roots, beta, but don't be afraid to grow tall. The strongest trees have deep roots and high branches.",
      birthdayWish: "May you achieve everything your heart desires while staying true to the values that make you special. Blessings always! 🙏✨"
    },
    contact: { type: "email" as const, value: "ravi@email.com" } 
  },
  { 
    id: 17, 
    name: "Neha", 
    group: "Nathkhat Neighborhood", 
    avatar: "young neighbor", 
    wish: "Happy birthday! Thanks for always helping me with my homework. You're the best tutor ever! 📚",
    responses: {
      importantMoment: "When I was struggling with math and you explained it in a way that finally made sense. You didn't make me feel stupid for not understanding - you just found a different way to teach it.",
      personalityEmojis: "📚🤓💡👩‍🏫⭐",
      hiddenTrait: "You're an amazing teacher! You have this gift for explaining things simply and patiently. You should seriously consider education as a career.",
      warningLabel: "Alert: Will turn any study session into fun learning, may use creative examples to explain difficult concepts, and celebrates every small victory.",
      neverChange: "Your patience and the way you make learning feel less scary. You help people believe in themselves.",
      futureAdvice: "Don't underestimate your teaching abilities! You have a gift for helping others learn and grow - that's incredibly valuable.",
      birthdayWish: "I hope this year brings you as much success as you've helped me achieve in school. You deserve all the good grades in life! 📚🎂"
    },
    contact: { type: "whatsapp" as const, value: "+919876543218" } 
  },
  
  // Work Chums (8 people)
  { 
    id: 18, 
    name: "Rebecca (Boss)", 
    group: "Work Chums", 
    avatar: "professional woman", 
    wish: "Happy birthday! You're such a valuable team member. Hope you take some time to celebrate yourself today! 💼",
    responses: {
      importantMoment: "During that challenging project last quarter when you stepped up and took on extra responsibilities without being asked. That's when I knew you were leadership material.",
      personalityEmojis: "💼🎯⚡🌟💡",
      hiddenTrait: "You underestimate your leadership potential. Others naturally turn to you for guidance, but you don't see it yet.",
      warningLabel: "Professional Notice: May exceed expectations regularly, will volunteer for challenging projects, and raises the bar for everyone around her.",
      neverChange: "Your work ethic and the way you support your teammates. You make everyone around you better at their jobs.",
      futureAdvice: "Start thinking about where you want to be in 5 years. You have the potential to go far - start planning your path upward.",
      birthdayWish: "I hope this year brings you the recognition and opportunities you deserve. Your career trajectory is exciting to watch! 🚀💼"
    },
    contact: { type: "email" as const, value: "rebecca@company.com" } 
  },
  { 
    id: 19, 
    name: "David", 
    group: "Work Chums", 
    avatar: "coworker man", 
    wish: "Happy birthday colleague! Thanks for making work fun and always being so helpful. Enjoy your special day! 🎂",
    responses: {
      importantMoment: "When I was new and overwhelmed, and you offered to help me learn the systems. You made my first months so much easier.",
      personalityEmojis: "😄🤝💻🎯☕",
      hiddenTrait: "You're the glue that holds our team together. You don't realize how much smoother everything runs because of your collaborative spirit.",
      warningLabel: "Workplace Alert: May make Monday mornings bearable, will share coffee and office snacks, and somehow makes spreadsheets seem less terrible.",
      neverChange: "Your willingness to help new people and your positive attitude that makes even stressful days manageable.",
      futureAdvice: "Keep building those relationships! Your people skills are just as valuable as your technical skills - maybe more so.",
      birthdayWish: "Hope your birthday is as awesome as those coffee break conversations that get us through the workweek! 🎂☕"
    },
    contact: { type: "email" as const, value: "david@company.com" } 
  },
  { 
    id: 20, 
    name: "Sneha", 
    group: "Work Chums", 
    avatar: "indian woman professional", 
    wish: "Happy birthday! Your creativity and positive energy make our workplace so much better. Have an amazing day! 🌟",
    responses: {
      importantMoment: "When you presented that creative solution to the client problem that had stumped all of us. Your innovative thinking saved the day!",
      personalityEmojis: "🎨💡✨🌈🚀",
      hiddenTrait: "You don't realize how much your creative energy inspires the rest of us to think outside the box. You make work feel less like work.",
      warningLabel: "Creative Alert: May come up with brilliant ideas at random moments, will add color to boring presentations, and makes brainstorming sessions actually fun.",
      neverChange: "Your creative perspective and the way you approach problems from angles no one else considers. Innovation needs people like you.",
      futureAdvice: "Don't let corporate life dim your creativity! The business world needs more people who think like artists.",
      birthdayWish: "May this year bring you projects that let your creativity shine and recognition for the innovative thinker you are! 🎨🌟"
    },
    contact: { type: "whatsapp" as const, value: "+919876543219" } 
  },
  { 
    id: 21, 
    name: "Mark", 
    group: "Work Chums", 
    avatar: "business man", 
    wish: "Happy birthday! From coffee breaks to project deadlines - you're an awesome teammate! 🎊",
    responses: {
      importantMoment: "During that crazy deadline last month when we were all stressed, and you kept everyone's spirits up with your humor and calm energy.",
      personalityEmojis: "😎⚡🎯💼🤝",
      hiddenTrait: "You're a natural stress-buster. Even when you're stressed yourself, you somehow manage to keep everyone else calm and focused.",
      warningLabel: "Productivity Warning: May make deadlines seem less scary, will crack jokes during tense meetings, and somehow gets things done while having fun.",
      neverChange: "Your ability to stay cool under pressure and your talent for making high-stress situations feel manageable.",
      futureAdvice: "Trust your instincts about people and projects. Your judgment is usually spot-on, even when you doubt yourself.",
      birthdayWish: "Hope your birthday is stress-free and full of the same positive energy you bring to our team every day! 🎊💼"
    },
    contact: { type: "email" as const, value: "mark@company.com" } 
  },
  { 
    id: 22, 
    name: "Coffee Club Crew", 
    group: "Work Chums", 
    avatar: "office group", 
    wish: "Happy birthday from your coffee club crew! Thanks for always bringing the best treats. We appreciate you! ☕",
    responses: {
      importantMoment: "When you started bringing homemade cookies to our coffee breaks. That's when we realized you're not just a colleague - you're someone who cares about making people happy.",
      personalityEmojis: "☕🍪💕👥🌞",
      hiddenTrait: "You have this amazing ability to create community wherever you go. You turn coworkers into friends without even trying.",
      warningLabel: "Social Alert: Will remember everyone's coffee preferences, may organize surprise celebrations, and somehow knows exactly what treats people like.",
      neverChange: "Your thoughtfulness and the way you make everyone feel included. You're the heart of our little work family.",
      futureAdvice: "Never underestimate the power of small kindnesses! You make people's days better, and that's incredibly valuable.",
      birthdayWish: "May your special day be as sweet as all the treats you bring us, and may your kindness come back to you in wonderful ways! ☕🎂"
    },
    contact: { type: "email" as const, value: "coffeeclub@company.com" } 
  },
  { 
    id: 23, 
    name: "Jennifer", 
    group: "Work Chums", 
    avatar: "professional woman 2", 
    wish: "Happy birthday! Your dedication and teamwork inspire us all. Hope your day is as amazing as you are! 🌟",
    responses: {
      importantMoment: "When I was having doubts about that big presentation and you offered to practice with me until I felt confident. Your support meant everything.",
      personalityEmojis: "🌟💪📊🎯💕",
      hiddenTrait: "You're an incredible mentor, but you don't see it. People naturally come to you for advice because you give thoughtful, honest feedback.",
      warningLabel: "Professional Notice: Will go above and beyond to help teammates succeed, may stay late to help others finish projects, and gives constructive feedback that actually helps.",
      neverChange: "Your genuine desire to see others succeed and your collaborative approach that makes everyone feel valued.",
      futureAdvice: "Start recognizing your leadership qualities! You're already mentoring people - it's time to embrace that role officially.",
      birthdayWish: "I hope this year brings you opportunities to lead and inspire even more people. You have so much wisdom to share! 🌟💼"
    },
    contact: { type: "email" as const, value: "jennifer@company.com" } 
  },
  { 
    id: 24, 
    name: "Ahmed", 
    group: "Work Chums", 
    avatar: "middle eastern man", 
    wish: "Happy birthday! Thanks for always being there to help solve the trickiest problems. You're a lifesaver! 🚀",
    responses: {
      importantMoment: "When that system crashed right before the client demo and you worked through the night to fix it. Your problem-solving skills are legendary!",
      personalityEmojis: "🔧💡🚀🎯⚡",
      hiddenTrait: "You have this incredible ability to stay calm when everything is falling apart. You're our secret weapon for crisis management.",
      warningLabel: "Technical Alert: May solve problems you didn't know existed, will work through lunch to fix critical issues, and somehow makes complex things seem simple.",
      neverChange: "Your analytical mind and your willingness to tackle the problems everyone else runs away from. You're irreplaceable.",
      futureAdvice: "Don't forget to take credit for your achievements! You solve big problems - make sure people know it was you.",
      birthdayWish: "May this year bring you challenges worthy of your skills and recognition for being the problem-solving genius you are! 🚀💡"
    },
    contact: { type: "whatsapp" as const, value: "+919876543220" } 
  },
  { 
    id: 25, 
    name: "Lisa", 
    group: "Work Chums", 
    avatar: "young professional", 
    wish: "Happy birthday! Our lunch conversations always brighten my day. Hope yours is filled with joy! 🥳",
    responses: {
      importantMoment: "When I was going through a tough time personally and you listened without judgment during our lunch breaks. Your friendship means more than you know.",
      personalityEmojis: "🌻💬🤗📱✨",
      hiddenTrait: "You're an amazing listener. People naturally open up to you because you make them feel heard and understood.",
      warningLabel: "Friendship Alert: Will remember details about your life that you forgot you shared, gives the best advice over lunch, and somehow always knows when you need someone to talk to.",
      neverChange: "Your empathy and the way you make people feel comfortable being themselves. You're the friend everyone needs at work.",
      futureAdvice: "Consider roles that involve working with people directly. Your emotional intelligence is a rare and valuable skill.",
      birthdayWish: "Hope your day is filled with as much warmth and joy as you bring to our everyday conversations! 🥳🌻"
    },
    contact: { type: "email" as const, value: "lisa@company.com" } 
  },
  
  // Study Buddies (5 people)
  { 
    id: 26, 
    name: "Emma", 
    group: "Study Buddies", 
    avatar: "/sample_image_wisher1.png", 
    wish: "Happy birthday bestie! College wouldn't have been the same without you. Here's to our lifelong friendship! 🥳",
    responses: {
      importantMoment: "It was during our first finals week when you stayed up all night helping me study for chemistry. That's when I knew you were more than just a study partner - you were a true friend.",
      personalityEmojis: "😂🌟💪🤗🎨",
      hiddenTrait: "You have this incredible ability to make everyone feel heard and valued, even when you're going through your own challenges.",
      warningLabel: "Warning: May cause excessive laughter, sudden urges to be more productive, and uncontrollable feelings of happiness.",
      neverChange: "Your genuine curiosity about everyone's stories and your way of celebrating the smallest victories.",
      futureAdvice: "Trust your instincts more - they've never led you wrong. And remember, it's okay to take up space in the world.",
      birthdayWish: "I hope this new year brings you all the adventures you've been dreaming about and the confidence to chase every single one of them. Happy birthday, bestie! 🎂✨"
    },
    contact: { type: "whatsapp" as const, value: "+919876543221" }
  },
  { 
    id: 27, 
    name: "Jake", 
    group: "Study Buddies", 
    avatar: "/sample_image_wisher1.png", 
    wish: "Happy birthday! Those late-night study sessions and pizza runs were legendary. Hope your day is as awesome as you are! 🍕",
    responses: {
      importantMoment: "When I was stressed about failing calculus and you convinced me to talk to the professor with you. Your support gave me the courage I needed.",
      personalityEmojis: "🍕🎮📚😎🚀",
      hiddenTrait: "You're braver than you think you are. You always push yourself and others to do things that seem scary but end up being worth it.",
      warningLabel: "Study Alert: Will turn any study session into a pizza party, may challenge you to late-night gaming sessions, and somehow makes even calculus fun.",
      neverChange: "Your loyalty and the way you make everything an adventure. Even studying with you felt like we were on some epic quest.",
      futureAdvice: "Keep taking those calculated risks! Some of your 'crazy' ideas have been the best ones. Trust your adventurous spirit.",
      birthdayWish: "Hope your birthday is as epic as those legendary all-nighters we pulled! May this year be your best adventure yet! 🍕🚀"
    },
    contact: { type: "email" as const, value: "jake@college.edu" } 
  },
  { 
    id: 28, 
    name: "Mia", 
    group: "Study Buddies", 
    avatar: "student with glasses", 
    wish: "Happy birthday gorgeous! From dorm room dance parties to graduation - what a journey! Love you tons! 💃",
    responses: {
      importantMoment: "When I was crying over that breakup sophomore year and you showed up with ice cream and turned it into an impromptu dance party. You saved my whole semester!",
      personalityEmojis: "💃🌈✨🎭🍦",
      hiddenTrait: "You have this magical ability to turn any bad situation into something fun and memorable. You're like sunshine in human form.",
      warningLabel: "Fun Alert: May spontaneously break into dance, will turn your room into a party venue, and somehow makes even finals week feel celebratory.",
      neverChange: "Your infectious energy and the way you can make anyone laugh, even when they want to cry. You're pure joy.",
      futureAdvice: "Never let anyone tell you to tone down your enthusiasm! The world needs more people who love life as much as you do.",
      birthdayWish: "May your birthday be one giant dance party and may this year bring you countless reasons to celebrate! 💃🎂"
    },
    contact: { type: "whatsapp" as const, value: "+919876543222" } 
  },
  { 
    id: 29, 
    name: "Alex", 
    group: "Study Buddies", 
    avatar: "young man casual", 
    wish: "Happy birthday! Thanks for being such an amazing friend through all the ups and downs of college life! 🎓",
    responses: {
      importantMoment: "When I was questioning everything about my major and my future, and you listened to me vent for hours without trying to fix everything. Sometimes people just need to be heard.",
      personalityEmojis: "🎓💭🤝🎯📖",
      hiddenTrait: "You're incredibly wise for your age. You see things clearly and give advice that actually helps, but you don't realize how much people value your perspective.",
      warningLabel: "Wisdom Alert: May offer profound insights during casual conversations, will remember important details about your life, and gives advice that actually works.",
      neverChange: "Your thoughtfulness and the way you really listen when people talk. You make people feel understood in a world where everyone's just waiting for their turn to speak.",
      futureAdvice: "Don't underestimate your ability to help people figure things out. You have a gift for seeing situations clearly.",
      birthdayWish: "Hope this year brings you the clarity and success you've helped so many of us find. You deserve amazing things! 🎓✨"
    },
    contact: { type: "email" as const, value: "alex@college.edu" } 
  },
  { 
    id: 30, 
    name: "Lily", 
    group: "Study Buddies", 
    avatar: "cheerful woman", 
    wish: "Happy birthday sweetie! Our friendship means the world to me. Can't wait to catch up soon! 💫",
    responses: {
      importantMoment: "When we got assigned as random roommates freshman year and you immediately made me feel at home. Moving away from family was scary, but you made our dorm feel like home.",
      personalityEmojis: "💫🏠💕📱🌸",
      hiddenTrait: "You have this natural ability to make spaces feel welcoming and people feel comfortable. You're like a human version of a warm hug.",
      warningLabel: "Comfort Alert: Will make any space feel like home, may send care packages when you're stressed, and remembers exactly how you like your coffee.",
      neverChange: "Your nurturing spirit and the way you take care of everyone around you. You make friendship feel effortless and natural.",
      futureAdvice: "Remember to take care of yourself too! You're so good at caring for others, but make sure you're getting the love you give.",
      birthdayWish: "May your birthday be filled with all the love and care you constantly give to others. You deserve to be celebrated! 💫🎂"
    },
    contact: { type: "whatsapp" as const, value: "+919876543223" } 
  }
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

      {/* Gallery */}
      <Gallery />

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center py-12 px-4"
      >
        <p className="text-sm text-muted-foreground">
          Made with 💖 for the most amazing 
        </p>
      </motion.div>
    </div>
  );
}