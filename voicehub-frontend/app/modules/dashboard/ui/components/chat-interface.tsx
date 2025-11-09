"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { Agent } from "../../types/agent";
import { io, Socket } from "socket.io-client";

interface Message {
  id: number;
  sender: "agent" | "user";
  text: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  agent: Agent;
  onBack: () => void;
}

export function ChatInterface({ agent, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "agent",
      text: "Connected...",
      timestamp: new Date(),
    },
    {
      id: 2,
      sender: "agent",
      text: `Good morning! This is your ${agent.name}. How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // Store socket connection
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Connect to Socket.IO when component mounts
  useEffect(() => {
    // Create connection to NestJS backend
    socketRef.current = io("http://localhost:3001");

    // Listen for connection success
    socketRef.current.on("connect", () => {
      console.log("✅ Connected to Socket.IO server");
      setIsConnected(true);
    });

    // Listen for messages from agent
    socketRef.current.on("receiveMessage", (data) => {
      console.log("📩 Received from server:", data);

      const newMessage: Message = {
        id: Date.now(),
        sender: "agent",
        text: data.text,
        timestamp: new Date(data.timestamp),
      };

      setMessages((prev) => [...prev, newMessage]);
    });

    // Listen for disconnection
    socketRef.current.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO server");
      setIsConnected(false);
    });

    // Cleanup: disconnect when component unmounts
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

  // Handle sending message
  const handleSend = () => {
    if (!inputValue.trim() || !socketRef.current) return;

    // Add user message to UI immediately
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Send message to NestJS backend
    socketRef.current.emit("sendMessage", {
      agentId: agent.id,
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
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                message.sender === "agent" ? "bg-blue-600" : "bg-gray-400"
              }`}
            >
              {message.sender === "agent" ? (
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
                  message.sender === "agent"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t pt-4">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={!isConnected}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || !isConnected}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
