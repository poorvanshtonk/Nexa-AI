export interface Message {
  id: number;
  sender: "user" | "nexa";
  text: string;
  timestamp: string;
}