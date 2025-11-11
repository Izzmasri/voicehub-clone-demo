export interface Conversation {
  _id: string;
  agentId: string;
  userId: string;
  status: "active" | "closed";
  title: string;
  startedAt: string;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
}
