export interface Message {
  _id?: string; // Optional because new messages don't have ID yet
  conversationId?: string;
  sender: "USER" | "AGENT" | "user" | "agent"; // Allow both for compatibility
  text: string;
  timestamp: Date | string;
}
