export interface Friend {
  id: number;
  name: string;
  group: string;
  avatar: string;
  wish: string; // Keep this for backward compatibility
  responses?: {
    importantMoment?: string;
    personalityEmojis?: string;
    hiddenTrait?: string;
    warningLabel?: string;
    neverChange?: string;
    futureAdvice?: string;
    birthdayWish?: string;
  };
  contact: {
    type: "email" | "whatsapp";
    value: string;
  };
}