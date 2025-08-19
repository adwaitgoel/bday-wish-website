export interface Friend {
  id: number;
  name: string;
  group: string;
  avatar: string;
  wish: string;
  contact: {
    type: "email" | "whatsapp";
    value: string;
  };
}
