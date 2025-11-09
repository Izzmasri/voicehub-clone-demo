"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SendHorizontal, Cpu } from "lucide-react";
import { AgentCard } from "../modules/dashboard/ui/components/agent-card";
import { ChatDrawer } from "../modules/dashboard/ui/components/chat-drawer";
import { mockAgents } from "../modules/dashboard/lib/agent-data";
import { Agent } from "../modules/dashboard/types/agent";

export default function MainPage() {
  // State to track which agent's chat drawer is open
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const suggestedPrompts = [
    "Customer support",
    "Receptionist",
    "Lead generation",
    "Outbound sales",
    "Rental service",
    "Appointment booking",
    "Scheduling online session",
    "Inbound qualification",
    "Product recommendation",
  ];

  const handleCopy = (agent: Agent) => {
    console.log("Copy agent:", agent);
  };

  const handleDelete = (agent: Agent) => {
    console.log("Delete agent:", agent);
  };

  const handleEdit = (agent: Agent) => {
    console.log("Edit agent:", agent);
  };

  // When user clicks "Start Chat"
  const handleChat = (agent: Agent) => {
    setSelectedAgent(agent); // Store which agent was selected
    setIsDrawerOpen(true); // Open the drawer
  };

  // When user closes the drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // Optional: Clear selected agent after animation
    setTimeout(() => setSelectedAgent(null), 300);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-r from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-3">
            <h1 className="text-5xl font-bold">
              Build with <span className="text-black">Voice</span>
              <span className="text-blue-600">Hub</span>
              <span className="text-black"> Clone</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Create voice agents by chatting with AI
            </p>
          </div>

          {/* Prompt Input Card */}
          <Card className="bg-white/80 backdrop-blur shadow-xl border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Design a voice agent for global services..."
                    className="flex-1 h-12 text-base border-gray-200 focus-visible:ring-blue-500"
                  />
                  <Button
                    size="icon"
                    className="h-12 w-12 bg-blue-500 hover:bg-blue-600"
                  >
                    <SendHorizontal className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-4 py-2 text-sm font-normal bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Agents Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cpu className="w-6 h-6 text-blue-600" />
                <h2 className="font-semibold">My Agents</h2>
              </div>
              <Button variant="outline" className="text-sm">
                View all
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onChat={handleChat}
                />
              ))}
            </div>
          </div>

          {/* Shared Agents Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-blue-600" />
              <h2 className="font-semibold">Shared Agents</h2>
            </div>
            <p className="text-gray-500 py-8">
              Shared agents will appear here when others share agents with you.
            </p>
          </div>
        </div>
      </div>
      <ChatDrawer
        agent={selectedAgent}
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </>
  );
}
