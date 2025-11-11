import { Conversation } from "../../types/conversation";
import { Message } from "../../types/message";

const API_URL = process.env.NEXT_PUBLIC_CONVERSATIONS_API_URL as string;

export const conversationsApi = {
  // Create new conversation
  async create(
    agentId: string,
    userId: string = "temp-user"
  ): Promise<Conversation> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentId, userId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create conversation");
    }

    return response.json();
  },

  // Get all conversations for agent
  async getByAgent(
    agentId: string,
    userId: string = "temp-user"
  ): Promise<Conversation[]> {
    const response = await fetch(
      `${API_URL}/agent/${agentId}?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch conversations");
    }

    return response.json();
  },

  // Get messages for a conversation
  async getMessages(conversationId: string): Promise<Message[]> {
    const response = await fetch(`${API_URL}/${conversationId}/messages`);

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    return response.json();
  },

  // Delete conversation
  async delete(conversationId: string): Promise<void> {
    const response = await fetch(`${API_URL}/${conversationId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete conversation");
    }
  },

  // Check if agent has previous conversations
  async checkPreviousChats(
    agentId: string,
    userId: string = "temp-user"
  ): Promise<{ hasChats: boolean; conversations: Conversation[] }> {
    const conversations = await this.getByAgent(agentId, userId);
    return {
      hasChats: conversations.length > 0,
      conversations,
    };
  },
};
