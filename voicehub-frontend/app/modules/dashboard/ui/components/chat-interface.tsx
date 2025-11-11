"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Agent } from "../../types/agent";
import { Message } from "../../types/message";
import { conversationsApi } from "../../lib/api/conversations-api";
import { io, Socket } from "socket.io-client";

interface ChatInterfaceProps {
  agent: Agent;
  conversationId: string; // NEW: Required prop
  onBack: () => void;
}

export function ChatInterface({
  agent,
  conversationId,
  onBack,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history when component mounts
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        setIsLoadingHistory(true);
        const history = await conversationsApi.getMessages(conversationId);

        // Convert backend messages to frontend format
        const formattedMessages: Message[] = history.map((msg) => ({
          _id: msg._id,
          sender: msg.sender.toLowerCase() as "user" | "agent",
          text: msg.text,
          timestamp: new Date(msg.timestamp),
        }));

        setMessages(formattedMessages);
        console.log(`Loaded ${formattedMessages.length} messages from history`);
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadChatHistory();
  }, [conversationId]);

  // Connect to Socket.IO
  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on("connect", () => {
      console.log("✅ Connected to Socket.IO server");
      setIsConnected(true);
    });

    socketRef.current.on("receiveMessage", (data) => {
      console.log("📩 Received from server:", data);

      const newMessage: Message = {
        _id: data._id,
        sender: "agent",
        text: data.text,
        timestamp: new Date(data.timestamp),
      };

      setMessages((prev) => [...prev, newMessage]);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || !socketRef.current) return;

    // Add user message to UI immediately
    const userMessage: Message = {
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Send message to NestJS backend with conversationId
    socketRef.current.emit("sendMessage", {
      conversationId: conversationId, // NEW: Include conversation ID
      agentId: agent._id,
      message: inputValue,
    });

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{agent.name}</h3>
              <p
                className={`text-xs flex items-center gap-1 ${
                  isConnected ? "text-green-600" : "text-red-600"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? "bg-green-600" : "bg-red-600"
                  }`}
                ></span>
                {isConnected ? "Connected" : "Disconnected"}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onBack}>
            Back
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
        {isLoadingHistory ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <p className="ml-2 text-gray-600">Loading chat history...</p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={message._id || index}
                className={`flex gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.sender === "agent" || message.sender === "AGENT"
                      ? "bg-blue-600"
                      : "bg-gray-400"
                  }`}
                >
                  {message.sender === "agent" || message.sender === "AGENT" ? (
                    <Bot className="h-5 w-5 text-white" />
                  ) : (
                    <User className="h-5 w-5 text-white" />
                  )}
                </div>

                <div
                  className={`max-w-[75%] ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl ${
                      message.sender === "agent" || message.sender === "AGENT"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-2">
                    {typeof message.timestamp === "string"
                      ? new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t pt-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={handleKeyPress}
            className="flex-1"
            disabled={!isConnected || isLoadingHistory}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || !isConnected || isLoadingHistory}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
