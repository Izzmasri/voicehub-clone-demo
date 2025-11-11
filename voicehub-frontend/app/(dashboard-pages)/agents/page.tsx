"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { AgentCard } from "@/app/modules/dashboard/ui/components/agent-card";
import { useState } from "react";
import { Agent } from "@/app/modules/dashboard/types/agent";
import { ChatDrawer } from "@/app/modules/dashboard/ui/components/chat-drawer";
import { DeleteAgentDialog } from "@/app/modules/dashboard/ui/components/delete-agent-dialog";
import { EditAgentModal } from "@/app/modules/dashboard/ui/components/edit-agent-modal";
import { useAgents } from "@/app/modules/dashboard/lib/agent-context";

export default function AgentsPage() {
  const { agents, loading, error, deleteAgent, updateAgent } = useAgents();

  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState<Agent | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCopy = (agent: Agent) => {
    console.log("Copy agent:", agent);
  };

  const handleDelete = (agent: Agent) => {
    setAgentToDelete(agent);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (agentToDelete) {
      try {
        await deleteAgent(agentToDelete._id);
        console.log("Deleted agent:", agentToDelete);
      } catch (err) {
        alert("Failed to delete agent");
      }
    }
    setIsDeleteDialogOpen(false);
    setAgentToDelete(null);
  };

  const handleEdit = (agent: Agent) => {
    setAgentToEdit(agent);
    setIsEditModalOpen(true);
  };

  const handleUpdateAgent = async (
    id: string,
    name: string,
    description: string
  ) => {
    try {
      await updateAgent(id, name, description);
      console.log("Updated agent:", { id, name, description });
    } catch (err) {
      alert("Failed to update agent");
    }
  };

  const handleChat = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedAgent(null), 300);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-r from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title ..."
                className="pl-10 bg-white border-gray-200 focus-visible:ring-blue-500"
              />
            </div>

            <Select defaultValue="all">
              <SelectTrigger className="w-32 bg-white border-gray-200">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="ml-3 text-gray-600">Loading agents...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          {/* Agents Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <AgentCard
                  key={agent._id}
                  agent={agent}
                  onChat={handleChat}
                  onCopy={handleCopy}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && agents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No agents yet. Click New Agent in the navbar to create one!
              </p>
            </div>
          )}
        </div>
      </div>

      <ChatDrawer
        agent={selectedAgent}
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
      />

      <DeleteAgentDialog
        agent={agentToDelete}
        open={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setAgentToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      <EditAgentModal
        agent={agentToEdit}
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setAgentToEdit(null);
        }}
        onUpdate={handleUpdateAgent}
      />
    </>
  );
}
