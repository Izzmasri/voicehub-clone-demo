"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Repeat, Loader2, Trash2 } from "lucide-react";
import { Agent } from "../../types/agent";
import { Conversation } from "../../types/conversation";
import { ChatInterface } from "./chat-interface";
import { conversationsApi } from "../../lib/api/conversations-api";

interface ChatDrawerProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
}

export function ChatDrawer({ agent, open, onClose }: ChatDrawerProps) {
  const [view, setView] = useState<"options" | "conversations" | "chat">(
    "options"
  );
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setView("options");
    setSelectedConversationId(null);
    onClose();
  };

  const handleTextChat = async () => {
    if (!agent) return;

    setIsLoading(true);
    try {
      // Check if there are previous conversations
      const { hasChats, conversations: existingConvs } =
        await conversationsApi.checkPreviousChats(agent._id);

      if (hasChats) {
        // Show conversation list
        setConversations(existingConvs);
        setView("conversations");
      } else {
        // No previous chats, create new one immediately
        await createNewConversation();
      }
    } catch (error) {
      console.error("Failed to check conversations:", error);
      alert("Failed to load conversations");
    } finally {
      setIsLoading(false);
    }
  };

  const createNewConversation = async () => {
    if (!agent) return;

    setIsLoading(true);
    try {
      const newConv = await conversationsApi.create(agent._id);
      setSelectedConversationId(newConv._id);
      setView("chat");
    } catch (error) {
      console.error("Failed to create conversation:", error);
      alert("Failed to create conversation");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueChat = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setView("chat");
  };

  const handleDeleteConversation = async (conversationId: string) => {
    if (!window.confirm("Delete this conversation?")) return;

    try {
      await conversationsApi.delete(conversationId);
      // Remove from list
      setConversations(conversations.filter((c) => c._id !== conversationId));

      // If no conversations left, go back to options
      if (conversations.length === 1) {
        setView("options");
      }
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      alert("Failed to delete conversation");
    }
  };

  const handleBackToOptions = () => {
    setView("options");
    setSelectedConversationId(null);
  };

  const handleBackToConversations = () => {
    setView("conversations");
    setSelectedConversationId(null);
  };

  // Reset view when drawer closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setView("options");
        setSelectedConversationId(null);
        setConversations([]);
      }, 300); // Wait for close animation
    }
  }, [open]);

  if (!agent) return null;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-3">
        <SheetHeader className="shrink-0">
          <SheetTitle className="flex items-center justify-center">
            <span>
              {view === "options" && agent.name}
              {view === "conversations" && "Previous Conversations"}
              {view === "chat" && "Text Chat"}
            </span>
          </SheetTitle>
        </SheetHeader>

        {/* Options View */}
        {view === "options" && (
          <div className="mt-8 space-y-4 flex-1 overflow-y-auto">
            <p className="text-sm text-gray-600 mb-6">
              Choose how youd like to interact with this agent:
            </p>

            {/* Voice Call Option */}
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col items-center gap-3 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              disabled
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Voice Call</p>
                <p className="text-xs text-gray-500">
                  Talk to the AI agent directly
                </p>
              </div>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </Button>

            {/* Text Chat Option */}
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col items-center gap-3 hover:bg-green-50 hover:border-green-300 transition-colors"
              onClick={handleTextChat}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin text-green-600" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Text Chat</p>
                    <p className="text-xs text-gray-500">
                      Chat with the AI agent via text
                    </p>
                  </div>
                </>
              )}
            </Button>

            {/* Hybrid Call Option */}
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col items-center gap-3 hover:bg-purple-50 hover:border-purple-300 transition-colors"
              disabled
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Repeat className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Hybrid Call</p>
                <p className="text-xs text-gray-500">
                  Combine voice and text interaction
                </p>
              </div>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                Coming Soon
              </span>
            </Button>
          </div>
        )}

        {/* Conversations List View */}
        {view === "conversations" && (
          <div className="mt-8 space-y-4 flex-1 overflow-y-auto">
            <p className="text-sm text-gray-600 mb-4">
              Continue a previous conversation or start a new one:
            </p>

            {/* List of conversations */}
            <div className="space-y-3">
              {conversations.map((conv) => (
                <div
                  key={conv._id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{conv.title}</h4>
                      <p className="text-xs text-gray-500">
                        {new Date(conv.lastMessageAt).toLocaleDateString()} at{" "}
                        {new Date(conv.lastMessageAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteConversation(conv._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white"
                    onClick={() => handleContinueChat(conv._id)}
                  >
                    Continue Chat
                  </Button>
                </div>
              ))}
            </div>

            {/* Start New Conversation Button */}
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={createNewConversation}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <MessageSquare className="h-4 w-4 mr-2" />
              )}
              Start New Conversation
            </Button>

            {/* Back Button */}
            <Button
              variant="ghost"
              className="w-full"
              onClick={handleBackToOptions}
            >
              Back to Options
            </Button>
          </div>
        )}

        {/* Chat View */}
        {view === "chat" && selectedConversationId && (
          <div className="flex-1 flex flex-col overflow-hidden mt-4">
            <ChatInterface
              agent={agent}
              conversationId={selectedConversationId}
              onBack={
                conversations.length > 0
                  ? handleBackToConversations
                  : handleBackToOptions
              }
            />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
