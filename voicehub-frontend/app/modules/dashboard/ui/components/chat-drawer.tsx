"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Repeat, X } from "lucide-react";
import { Agent } from "../../types/agent";
import { ChatInterface } from "./chat-interface";

interface ChatDrawerProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
}

export function ChatDrawer({ agent, open, onClose }: ChatDrawerProps) {
  const [view, setView] = useState<"options" | "chat">("options");

  const handleClose = () => {
    setView("options");
    onClose();
  };

  const handleTextChat = () => {
    setView("chat");
  };

  const handleBackToOptions = () => {
    setView("options");
  };

  if (!agent) return null;

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-3">
        <SheetHeader className="shrink-0">
          <SheetTitle className="flex items-center justify-center">
            <span>{view === "options" ? agent.name : "Text Chat"}</span>
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
            </Button>

            {/* Text Chat Option */}
            <Button
              variant="outline"
              className="w-full h-auto py-6 flex flex-col items-center gap-3 hover:bg-green-50 hover:border-green-300 transition-colors"
              onClick={handleTextChat}
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Text Chat</p>
                <p className="text-xs text-gray-500">
                  Chat with the AI agent via text
                </p>
              </div>
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
            </Button>
          </div>
        )}

        {/* Chat View */}
        {view === "chat" && (
          <div className="flex-1 flex flex-col overflow-hidden mt-4">
            <ChatInterface agent={agent} onBack={handleBackToOptions} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
