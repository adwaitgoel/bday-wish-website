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
  
  // Langotiyas (3 people)
  { 
    id: 2, 
    name: "Hri", 
    group: "Langotiyas", 
    avatar: "/hritika-wishcard.jpeg", 
    wish: "Happy birthday!",
    responses: {
      importantMoment: "One of my core memories with Sanju takes me back to our graduation days when I first met her through Isha. From the very beginning, there was something about her nature that felt so familiar, almost like a reflection of myself. During lectures, instead of paying attention, we would get completely lost in watching cooking videos together. Break times became our ritual: sharing one fried rice and half dry Manchurian, laughing endlessly over the smallest things. Somewhere between those stolen laughs, shared meals, and hours spent side by side, I realized how naturally she had become such an important part of my life. It wasn’t one big moment but a thousand little ones—the ease of our bond, the way our similarities made us instant best friends, and how being with her always felt like being at home. That’s when I knew Sanju wasn’t just a friend from college—she was someone I was meant to hold onto for life.",
      personalityEmojis: "😎😼🧚🏻🌼🍟🥺",
      hiddenTrait: " Something about her that she probably doesn’t even realize about herself is how deeply she feels everything and everyone—she gets emotionally attached in ways that show her heart is bigger than she knows. She can play the role of a mom, scolding you when needed, yet also be the most practical advisor with sarcasm dripping through every word. That mix of softness and strength is what makes her so rare",
      warningLabel: "Warning: Once Sanju’s in your life, her caring heart, emotional depth, and badass carefree spirit won’t ever let you go.",
      neverChange: " she is truly sarvagun sampann—perfect in every way, just as she is. I wouldn’t want a single thing to be different, especially our friendship, which I hope stays exactly the same forever. 💖",
      futureAdvice: "Stay kind, strong, and unstoppable, Always share your triple chicken schezwan fried rice with me—non-negotiable!!!",
      birthdayWish: "My wish for her birthday and beyond is that she always stays as caring, giving, and beautifully herself as she is today. I hope she continues to chase her dreams fearlessly, laugh without limits, love deeply, and find happiness in even the smallest moments. May she always know her worth, never lose her carefree  spirit, and be surrounded by people who love her just the way she deserves."
    },
    contact: { type: "whatsapp" as const, value: "+918424005804" } 
  },
  { 
    id: 3, 
    name: "Isha", 
    group: "Langotiyas", 
    avatar: "/isha-wishcard.jpeg", 
    wish: "Happy birthday!",
    responses: {
      importantMoment: "When you started sending images of the dishes you cooked during UG years and started talking all things food, I knew it then this is going to go a long long way🫶🏻",
      personalityEmojis: "🍗🌮🌭🌯🥐🍕🥖🥗🍜🍟🍤🍥🥯🏋️‍♀️🥰🥰",
      hiddenTrait: "Ywhen someone is craving some delish food they can turn to you for reccos, when they are sad they can turn to you to be consoled, when they want a hug they can run to you, when they want to get someone beaten up you are a call away, so to be precise you are an all in one package ",
      warningLabel: "GUNDI HAI BEWARE",
      neverChange: "“Isha shatap” “Isha yaar” basically i hope i can always irritate you easily",
      futureAdvice: "you will manifest everything you desire so relax and eat some chimken",
      birthdayWish: "Stay happy and hyper because that gives me some entertainment🤡"
    },
    contact: { type: "whatsapp" as const, value: "+918976340033" } 
  },
  { 
    id: 4, 
    name: "Prarthana", 
    group: "Langotiyas", 
    avatar: "/prarthana-wishcard.jpeg", 
    wish: "Happy birthday!",
    responses: {
      importantMoment: "I think one of the best moments which we had together during our “Bachpan” days was the Slap videos which we made in Bldg 1 Lobby !! Wish I could upload that video here😂 Also the dances we did together during Ganpati. Core memories 🫶🏻 ",
      personalityEmojis: "💖🎀👩‍🍳💥🥹",
      hiddenTrait: "She honestly has everything you’d admire in a perfect lady—super smart, absolutely gorgeous, emotionally tuned in, and sharp as a knife. She cooks so well, dances with such grace, and somehow balances confidence with the sweetest kind of compassion and humility. You are whole Vibe 💥",
      warningLabel: "Explosive Charm Alert ‼️ ",
      neverChange: "Hope you never change the intensity with which you do things, love that quality of yours!",
      futureAdvice: "Hope your vision board comes to life and whatever you have manifested for your future becomes into reality super soon ✨",
      birthdayWish: "Happy Birthday Sanjana 🫶🏻 25 looks fabulous on you! Keep shining and Slaying! "
    },
    contact: { type: "whatsapp" as const, value: "+919920055537" } 
  },
  
  // Nathkhat Neighborhood (11 people)
  { 
    id: 5, 
    name: "Archieee", 
    group: "Nathkhat Neighborhood", 
    avatar: "/archie-wishcard.jpeg", 
    wish: "Happy birthday!",
    responses: {
      importantMoment: "Sanjana was never Sanjana to me she was always my chiichii. To manny memories and laughter together. More like an elder sister and cricket buddies forever. There was never a particular moment when I realised that she is an important person in my life, I just knew that no matter what I’ll always have my chichi since childhood. ",
      personalityEmojis: "🤓🍗🍔🍕🥟❤️😂",
      hiddenTrait: "sab pata hai chichi ko kuch realize kar ne ki zarurat nahi hai🤣🤭",
      warningLabel: "Bas aab bhaiyaa ko Paris se wapis aane do sab bata dungi apni masti 😁😁",
      neverChange: "I hope that you never change you laugher and mast mast hugs when you see me 😋",
      futureAdvice: "shaadi karo yarr basss or kuch nahi cahiyeh  🙏🏻🙏🏻 mujhe bhi future sangeet practice ki tension hai 😭😭",
      birthdayWish: "Happiest Birthday Chiichii ❤️ Love you sab se zada and ek chummi bhi meri taraf se, keep smiling and have a wonderful year ahead. You will always have me no matter what. ❤️🎁🎈💋🥳🎊"
    },
    contact: { type: "email" as const, value: "graciassanjana@gmail.com" } 
  },
  { 
    id: 6, 
    name: "Preeti", 
    group: "Nathkhat Neighborhood", 
    avatar: "/gallery-image-16.jpg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "When I met Sanjana for the first time it took sometime to get comfortable and get to know her, then vibe match hogayi and since then we have been hi-5ing and laughing around:) can’t wait to jog together too hopefully soon enough",
      personalityEmojis: "✨🤓😂🦋🤪",
      hiddenTrait: "You’re very fun to be with at all times for two reasons- (1) whoever you are with you are very genuine, open(happy to explain more irl) (2)you treat each and everyone w care",
      warningLabel: "Error 404 sometimes; to funny to be with you might end up getting a good friend ",
      neverChange: "The way she never stops laughing and making everyone laugh too",
      futureAdvice: "Stay the same:) and take less stress",
      birthdayWish: "Wishing you a very happy birthday and I hope you have a great day- today, tomorrow and always:)) oh and thank you for caring about the little things I care about too like a lip gloss🤪"
    },
    contact: {  type: "email" as const, value: "graciassanjana@gmail.com"} 
  },
  { 
    id: 7, 
    name: "Ashish", 
    group: "Nathkhat Neighborhood", 
    avatar: "/gallery-image-4.jpeg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "She’s really fond of my son Ranveer and the moment she saw her for the first time she started crying and couldn’t stop it. I cant forget that moment. Lovely she is ❤️",
      personalityEmojis: "😂🤗😎🫶🏻❤️",
      hiddenTrait: "Still a kid at heart.",
      warningLabel: "Level 25 reached- response only after 8hrs of sleep.",
      neverChange: "Her energy and kid at heart ",
      futureAdvice: "Always stay joyful as you are right now.",
      birthdayWish: "May god give you all the happiness, health and success in the world ❤️"
    },
    contact: { type: "whatsapp" as const, value: "+918108781616" } 
  },
  { 
    id: 8, 
    name: "Adway", 
    group: "Nathkhat Neighborhood", 
    avatar: "/adway-wishcard.jpg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "When bhaiya introduced me to her",
      personalityEmojis: "🍟😇🥹😹🤭",
      hiddenTrait: "Being in their own world and not letting others ruin it",
      warningLabel: "Maaru kya",
      neverChange: "Her kindness",
      futureAdvice: "To accept Snowy is actually Sheru 😈",
      birthdayWish: "Happy 25, you're getting OLD day by day so enjoy to the fullest "
    },
    contact: { type: "whatsapp" as const, value: "+919137944854" } 
  },
  { 
    id: 9, 
    name: "Khooshi", 
    group: "Nathkhat Neighborhood", 
    avatar: "/khooshi-wishcard.jpeg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "Ive always looked upto you as my elder sister because youve always protected me cared for me and looked after me although i dont remember our first meet because we were so young but yeah since i knew you were my person.",
      personalityEmojis: "❤️🧿🌸💃🏻🥵",
      hiddenTrait: "Her beauty ",
      warningLabel: "Caution - she’s pretty but she’s dangerous ",
      neverChange: "That im her little sister ",
      futureAdvice: "That she never loses her spark ",
      birthdayWish: "Firstly a very happy birthday I wish I was there with you to celebrate you today but unfortunately I cant make it i hope you enjoy your day and love is always with you. I LOVE YOU!!!"
    },
    contact: { type: "whatsapp" as const, value: "+918779228288" } 
  },
  
  // Work Chums (8 people)
  { 
    id: 18, 
    name: "Shrruti", 
    group: "Work Chums", 
    avatar: "/shrruti-wishcard.jpeg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "The moment I truly felt that she was going to be a very important person in my life was when I realized how she was there for me through literally everything — from drafting emails, to helping me pick jewellery at the shop, to teaming up with me at work. I still remember how she motivated me during one of the toughest phases of my life just a few months ago. The way she randomly surprises me with thoughtful gifts, the way she always puts her heart into everything — it all speaks volumes about the kind of person she is. One beautiful memory I’ll never forget is she saw me crying at the washroom and I told her please leave me alone for sometime, I went down for lunch and I come to my desk to receive my favourite red velvet cake…This gesture itself speaks volumes… That day I realised she is gonna be in my heart forever. I’ve never met someone as thoughtful as her in my life. I love you, Gundi. And please, never stop bringing in that tapori slang. Yours truly, Chota Don / Chikini / and every other funny name you’ve ever given me 😂",
      personalityEmojis: "😎🫶🧚🏻‍♀️🌻🌍⭐️",
      hiddenTrait: "She doesn’t even realize sometimes how much she has taught me. Even in the most random conversations, the moment she starts speaking, I end up learning something new — something that stays with me. Be it about haircare, skincare, workouts, music, outfits, or so much more, she has this effortless way of passing on little gems of wisdom without even trying. I truly wish the child in you always stays alive… and that you keep pampering me even more. ❤️",
      warningLabel: "1)Highly addictive personality. May cause excessive laughter, pampering, and lifelong attachment. 2) Tapori slang enthusiast. Exposure may cause permanent slang adoption.",
      neverChange: "I hope the child in you always stays alive. May you always remain as grounded as you are today, spreading love and joy wherever you go. And most importantly… never stop loving me. ❤️",
      futureAdvice: "Never lose your kindness, but don’t forget to protect your own heart too.",
      birthdayWish: "Happy 25th, my Gundi ❤️ May this year bring you endless happiness, success, and love. I hope you always stay as thoughtful, kind, and full of life as you are today. Keep chasing your dreams, pampering me 😜, and never let go of that childlike spark that makes you so unique. Here’s to the most beautiful chapter of your life yet. I love you the most🌍"
    },
    contact: { type: "whatsapp" as const, value: "+919653214412" } 
  },
  { 
    id: 19, 
    name: "Shourya", 
    group: "Work Chums", 
    avatar: "/gallery-image-5.jpeg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "Obviously it all Started coz of Suminter where each of my friends told me that be with Sanju she’s the most amazing person u ll meet… and yes suminter made me realise that how fun,jhalli,caring and adorable person you are",
      personalityEmojis: "🐣🧿💪🥺💀",
      hiddenTrait: "You have the potential to make everyone happy unknowingly….people around you genuinely loves you coz of ur kindness.",
      warningLabel: "Brooo your instant expressions which u don’t realise but people understand what u wanna convey 😂(Have observed alot of this with ur Manager)",
      neverChange: "Your love and care towards the people you genuinely adore.",
      futureAdvice: "Pursue what ur heart says don’t try to keep everyone happy.",
      birthdayWish: "Wishing you the best of 25th Birthday my cutieee hope you you achieve everything you have prayed and wished for and wanna see you get married soon with lots of kids 🤭. Be the same you are Sanju u are a gem of person 😘♥️"
    },
    contact: { type: "whatsapp" as const, value: "+917887496220" } 
  },
  { 
    id: 20, 
    name: "Saptak", 
    group: "Work Chums", 
    avatar: "/saptak-wishcard.jpg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "This was the moment I realized you were going to be an important person and a life long friend in my life ❣️ - the day you surprised me with that cute little bat signed by Virat Kohli! 🏏 I still don’t know how you figured out I’m such a crazy RCB + Virat fan, but that gift is still in my showcase right beside my trophies and medals. That’s when I knew you’re someone who notices the little things and makes them extra special. And of course, how can I forget all the masti, the random trips, Bhandardara, and Garbett Plateau. Too many memories, too much fun. I hope you will plan the trek again 🔜 🚶‍♂️⛰️. Wishing you the happiest birthday Sanju 🎂🥂🥳 let’s keep making more crazy, unforgettable moments together! And yaa, keep up with your minning 😜. It suits you 'Miss Perfectionist'.",
      personalityEmojis: "✨😇🎁😂🌍🎶💃⛰️💖         ✨ – lights up every room with positivity  😇 – kind and caring  🎁 – thoughtful, always surprises people with meaningful gestures  😂 – fun-loving, full of laughter  🌍 – loves exploring, travel, and new experiences  🎶 – enjoys vibes, music, and masti  💃 – lively and energetic  ⛰️ – adventure/trek lover  💖 – big-hearted and genuine",
      hiddenTrait: "Something about you that you probably don’t even realize about yourself is how effortlessly you make people feel seen, cared for, and special. It’s in the little things you do - like remembering likes and dislikes, planning surprises, or bringing laughter that leave a lasting mark on everyone around you.",
      warningLabel: "💥 Explosive Combo!Sweet as sugar, sharp as chili.",
      neverChange: "I hope never changes about you is your crazy combo of sweet + savage - because only you can yell at someone and still make them feel special at the same time 😅💖.",
      futureAdvice: "Stay the same crazy, adventurous, sweet-savage person you are, but also keep surprising yourself the way you surprise others - because you deserve just as much joy.",
      birthdayWish: "My wish for her birthday and beyond is unlimited good food, crazy recipes to try, and zero calories to worry about."
    },
    contact: { type: "whatsapp" as const, value: "+919726101900" } 
  },
  { 
    id: 21, 
    name: "Dhanashree", 
    group: "Work Chums", 
    avatar: "/gallery-image-14.jpg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "Our bond grew so strong, and we began to share so many wonderful memories, that I can't quite pinpoint the moment you became such an important part of my life.",
      personalityEmojis: "🙂‍↔️🫣🤨💓🧐",
      hiddenTrait: "You always find good in people and has a way of truly understanding them.",
      warningLabel: ".",
      neverChange: "Sanju stay as you are !! ",
      futureAdvice: ".",
      birthdayWish: "I wish you get all the things you've ever wished to have."
    },
    contact: { type: "email" as const, value: "dhanashreethakare13@gmail.com" } 
  },
  { 
    id: 22, 
    name: "Omkar", 
    group: "Work Chums", 
    avatar: "/omkar-wishcard.jpeg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "1st June,2024 was the day when we actually got to bond really well on our trip to Bhandardara with our other ‘Chums’ and then it was confirmed as a lifetime friendship. Before that I was actually scared of her rebellious behaviour thinking that hum log kbhi friends nhi bn payenge but LOL…….Here we are! Now I am a part of her ‘Fav Ppl at Work’ List and it makes me happy to have a friend like her who is no-filter just like me ",
      personalityEmojis: "💪🏻(Fitness Freak)🍗(Loves Chicken)🤨( Always ready to jump into fights)🤓(Chasmish)😤 (Rebellious) 👶(loves babies)",
      hiddenTrait: "Well planned hota uska sb kuch…I believe aisa kuch nhi hoga jo she doesn’t realise about herself",
      warningLabel: "Gussa thoda kam kro saasu Ji",
      neverChange: "That she’s so empathetic and kind towards everyone ",
      futureAdvice: "Sanju, life mein jo bhi ho, jyada stress na liya kr",
      birthdayWish: "You are deserving of all the love, wealth and success in the world and I affirm you have it all."
    },
    contact: { type: "whatsapp" as const, value: "+917744838610" } 
  },
  { 
    id: 23, 
    name: "Idris", 
    group: "Work Chums", 
    avatar: "idris-wishcard.jpeg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: ".",
      personalityEmojis: "👩‍🍳🍗😡🧹🤑",
      hiddenTrait: "Even when she gets frustrated, her empathy and the way she helps others makes people feel lighter and more comforted than she knows",
      warningLabel: "Khilayegi like Annapurna Devi, hasayegi like Hera Pheri, par gussa aaya toh full Kabir Singh mode.",
      neverChange: "Her nature or we can say her desire to feed others",
      futureAdvice: "Keep cooking up amazing food, dropping perfect memes at the right time, and spreading your energy everywhere you go. Also take less stress of work and deadlines and keep on enjoying between the deadlines",
      birthdayWish: "My wish for her would be again around food. Keep on learning and making more and more delicious food also may god help you to open your dream cafe/restaurant in Marol. Be happy be cheerful and keep on Sharing memes."
    },
    contact: { type: "whatsapp" as const, value: "+919427574112" } 
  },
  { 
    id: 24, 
    name: "Bhagyashree", 
    group: "Work Chums", 
    avatar: "middle eastern woman", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "I still remember how I used to share all the office drama with you and Shruti 😅. I really like how you always stand by what’s right — right is right and wrong is wrong. And honestly, the word ‘HARI OM!’ will always remind me of you 🤣🤣",
      personalityEmojis: "😊🤔😏😭😡",
      hiddenTrait: "Very moody personality she has.kab konsi cheez se chid jaye no idea🤗",
      warningLabel: "Suminter se nikal jaldi🤣",
      neverChange: "Your Fair-minded nature",
      futureAdvice: "Be as you are🤗",
      birthdayWish: "I am looking forward stay at your AIRBNB soon😁"
    },
    contact: { type: "whatsapp" as const, value: "+918454819651" } 
  },
  
  // Study Buddies (5 people)
  { 
    id: 26, 
    name: "Shristi", 
    group: "Study Buddies", 
    avatar: "/shristi-wishcard.JPG", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "Remember when we reconnected and started going on long walks together in village? And strawberry juices we shared? 😊🤩",
      personalityEmojis: "🤓🏏👯💪🧚‍♀️👩‍🍳🦸‍♀️",
      hiddenTrait: "She is an incredibly kind-hearted person who used to prioritise others' feelings above her own, but this has changed over time, and I'm happy it worked out well.",
      warningLabel: "25 year Side Effects: Increased Daydreaming About Wedding Dresses, Babies, and Future Homes 🏠💕🤣🙈",
      neverChange: "Her kindness, maturity and prioritizing her happiness",
      futureAdvice: "Get married to this amazing guy, can't wait to dance on your wedding day, though you didn't dance on mine 😤😕 Keep that passion alive! open a cafe – I'll invest, you bring the passion ☕️💡",
      birthdayWish: "Have a happy and peaceful life with good health "
    },
    contact: { type: "whatsapp" as const, value: "+919619698612" }
  },
  { 
    id: 27, 
    name: "Calvin", 
    group: "Study Buddies", 
    avatar: "/calvin-wishcard.jpg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "A person with the most amazing skill of 'getting shit done'. Man it is so hard to keep up with your life, but you always stay on top of it. I asked for your notes once because I had missed class, the level of detail in those notes was the moment that I realized you are very important 🤣🤣.. Not just academically, you surprise me every time with how much effort you can put into things. Whether it be a class presentation or packing your multiple layer tiffin or packing cup noodles for a Rajkot Trip or dressing up a saree and looking absolutely gorgeous at Magathane metro station... you never settled for sub par.",
      personalityEmojis: "😻🍜🍗👩‍🍳💪",
      hiddenTrait: "You are stronger than you think you are...(Not physical strength)",
      warningLabel: "Hangry warning",
      neverChange: "her smile",
      futureAdvice: "There's long way to go....You are doing just fine. Be Patient, goods things are on the way",
      birthdayWish: "I wish the best for you, and i pray that you never get stuck up in life."
    },
    contact: { type: "whatsapp" as const, value: "+919820410740" } 
  },
  { 
    id: 28, 
    name: "Aditi", 
    group: "Study Buddies", 
    avatar: "/aditi-wishcard.jpeg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "When we were attending ‘online’ lectures during Covid and that fact that we used to just communicate by giving each other looks, I, in that exact moment knew Sanju is someone I want to run to for everything! ",
      personalityEmojis: "❤️🤑🧚🏼‍♀️🫶🏻👩‍🍳",
      hiddenTrait: "Sanju doesn’t realise how she is a sister-like-figure to me and how every little thing she does means so much to me on days when I miss home too much! ",
      warningLabel: "Highly contagious giggles",
      neverChange: "Her heart, gold.",
      futureAdvice: "Good things take time.",
      birthdayWish: "..endless joy, a love that feels like home, and success in everything she dreams of. Happy birthday, meri pyaari sanjuu ❤️ It is true when people say that you always find the best people when you expect them the least and finding you was one such instance. Thankyou for always always being my rock, scolding me when it was needed, caring for me, making me laugh, feeding us with all the yummy food, teaching us all the crazy subjects, hosting us so lovingly always, for always going that extra mile for us and for all the little things you do for me! Bombay and so many other things wouldn't have been possible without you! You'll always be the first online friend I talked and gossiped to in XIMR and I'm so glad we could continue that offline too. I have had the best memories with you and I hope to make so many more. You're the bessst. Here's to more gossip sessions and overeating. Just know that you'll always have me right next to youu and I've always got your back, no matter what 🦋 I love you so muchhh ❤️🧿"
    },
    contact: { type: "whatsapp" as const, value: "+918237699206" } 
  },
  { 
    id: 29, 
    name: "Nikita", 
    group: "Study Buddies", 
    avatar: "young woman casual", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "I think when we spent more time in group projects is when i realized how wonderful you are Sanju🥰",
      personalityEmojis: "🥰🤭😇❤️😈",
      hiddenTrait: "She is super strong and her dedication to any task is truly admirable!",
      warningLabel: "Her looks can kill",
      neverChange: "Her personality",
      futureAdvice: "Keep being herself and never change. She is perfect just the way she is",
      birthdayWish: "Happiest 25th Birthday Sanju, may all your dreams and aspirations come true❤️"
    },
    contact: { type: "whatsapp" as const, value: "+919820256959" } 
  },
{ 
    id: 30, 
    name: "Stacie", 
    group: "Study Buddies", 
    avatar: "/gallery-image-21.jpg", 
    wish: "Happy birthday",
    responses: {
      importantMoment: "This was the moment I realized you were going to be an important person in my life — when you made sure I wasn’t left out even though I wasn’t really part of the group. The way you included me so effortlessly and made me feel like I belonged is something I’ll never forget. That little act of kindness became a core memory for me, and from then on I knew you was someone truly special. Even though we don’t always get to see each other physically, you’ve always been there for me — and that means the world.",
      personalityEmojis: "😎🌭🫶🏻🏕️🧥",
      hiddenTrait: "You are inspiring!",
      warningLabel: "Get married sooon",
      neverChange: "One thing I never want you to change is the way you make everyone feel included. No matter who it is, you always make sure nobody feels left out—and that kindness is what makes you truly special",
      futureAdvice: "My only advice for your future—please start that food business soon, because the world deserves your cooking… and also so I can eat for free! And if you need a partner, you know I am in from day One!",
      birthdayWish: "Happy Birthday, my love! 🎉✨ Wishing you the best future filled with happiness, success, and endless blessings. You’ve already found your perfect partner, and I hope together you build the most beautiful life, full of love, laughter, and unforgettable memories. 💖"
    },
    contact: { type: "whatsapp" as const, value: "+919082320802" } 
  },

  // Fam Jam (3 people)
  { 
    id: 100, 
    name: "Adwait", 
    group: "Fam Jam", 
    avatar: "adwait-wishcard.jpeg", 
    wish: "Happy birthday!",
    responses: {
      importantMoment: "You know someone is dearly important when you feel within yourself a sense of content, limitless fulfillment and a feeling of being whole. This is what you evoked in me when the universe blessed me with your presence. The purity of your heart etched in me an unforgettable moment, a contract of ages, set in stone. A certain café that housed us that evening, witnessed your acknowledgement, a nimble nod of commitment, and a humble acceptance of the looming inevitable. I knew again how important you were to me in that instance, a moment of courage that birthed the love we embrace today. To witness selflessness, up and close in every action, big or small, can be an elevating experience and I wish to keep at it, with you!",
      personalityEmojis: "♥️😎🍟🍗👸🏻💤💃🏻🥹✨🧠😂🧿💖🌸",
      hiddenTrait: "You are a source of inspiration for many, fueled from the immense potential you possess. The possibilities are endless when you realize what you are truly capable of 💪",
      warningLabel: "⚠️Danger⚠️: Excessive exposure to killer sense of humor 💣 and unparalleled angelic beauty ✨",
      neverChange: "The honesty and originality of your psyche. Continue being a beacon of purist thinking and staying true to yourself.",
      futureAdvice: "Belief in yourself as you do in the ones that matter to you. Grab every opportunity that presents itself to you after creating many more. Prototype that plan, make that move that moves you back.",
      birthdayWish: "Wishing you an extremely happy birthday and beyond! You have made an entire quarter of a century a pleasant experience and granted a sense of belonging and purpose to many around you. May the universe guide you and protect you as you continue to celebrate life and live your dreams 🌸 I wish you all the love and prosperity on this 25th birthday, and wish to celebrate with you, all the others yet to come!!"
    },
    contact: { type: "whatsapp" as const, value: "+919004682363" } 
  }
];

const groupColors = {
  "Fam Jam": "bg-gradient-to-br from-rose-50 via-pink-50 to-violet-100 border-rose-200/60 shadow-rose-100/50",
  "Langotiyas": "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 border-sky-200/60 shadow-sky-100/50", 
  "Nathkhat Neighborhood": "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 border-emerald-200/60 shadow-emerald-100/50",
  "Work Chums": "bg-gradient-to-br from-amber-50 via-orange-50 to-red-100 border-amber-200/60 shadow-amber-100/50",
  "Study Buddies": "bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-100 border-purple-200/60 shadow-purple-100/50"
};

export default function App() {
  const [selectedFriend, setSelectedFriend] = useState<Friend>(friendsData[0]);
  const [showWish, setShowWish] = useState(false);

  const handleFriendSelect = (friend: Friend) => {
    setSelectedFriend(friend);
    setShowWish(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-purple-50 birthday-gradient floating-particles">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 px-4 relative"
      >
        {/* Floating birthday elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 360],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ 
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8
            }}
            className="absolute text-2xl pointer-events-none"
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${10 + (i * 15)}%`
            }}
          >
            {['🎈', '🎉', '✨', '🎂', '🌟', '💫'][i]}
          </motion.div>
        ))}
        
        <motion.h1 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold gradient-text birthday-title celebration-text mb-4 relative"
        >
           ✨ Happy Birthday! ✨
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-blue-500/20 -z-10" />
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground subtitle-elegant"
        >
          <span className="relative z-10">The special ones sent you birthday wishes!</span>
          <motion.span
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 2, delay: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500"
          />
        </motion.p>
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