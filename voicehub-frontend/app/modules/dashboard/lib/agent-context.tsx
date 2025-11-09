"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Agent } from "../types/agent";
import { mockAgents } from "../lib/agent-data";

interface AgentContextType {
  agents: Agent[];
  addAgent: (name: string, description: string) => void;
  deleteAgent: (id: number) => void;
  updateAgent: (id: number, updates: Partial<Agent>) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(mockAgents);

  const addAgent = (name: string, description: string) => {
    const newAgent: Agent = {
      id: Date.now(),
      name,
      description,
      total: 0,
      status: "Open",
    };
    setAgents([newAgent, ...agents]);
    console.log("Created new agent:", newAgent);
  };

  const deleteAgent = (id: number) => {
    setAgents(agents.filter((agent) => agent.id !== id));
  };

  const updateAgent = (id: number, updates: Partial<Agent>) => {
    setAgents(
      agents.map((agent) =>
        agent.id === id ? { ...agent, ...updates } : agent
      )
    );
  };

  return (
    <AgentContext.Provider
      value={{ agents, addAgent, deleteAgent, updateAgent }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgents must be used within AgentProvider");
  }
  return context;
}
