"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Agent } from "../types/agent";
import { agentsApi } from "../lib/api/agents-api";

interface AgentContextType {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  addAgent: (name: string, description: string) => Promise<void>;
  deleteAgent: (id: string) => Promise<void>;
  updateAgent: (
    id: string,
    name?: string,
    description?: string
  ) => Promise<void>;
  refreshAgents: () => Promise<void>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch agents from backend on mount
  const refreshAgents = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedAgents = await agentsApi.getAll();
      setAgents(fetchedAgents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch agents");
      console.error("Error fetching agents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAgents();
  }, []);

  const addAgent = async (name: string, description: string) => {
    try {
      const newAgent = await agentsApi.create(name, description);
      setAgents([newAgent, ...agents]);
      console.log("Created new agent:", newAgent);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create agent";
      setError(errorMessage);
      throw new Error(errorMessage); // Re-throw so modal can show error
    }
  };

  const deleteAgent = async (id: string) => {
    try {
      await agentsApi.delete(id);
      setAgents(agents.filter((agent) => agent._id !== id));
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete agent";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateAgent = async (
    id: string,
    name?: string,
    description?: string
  ) => {
    try {
      const updatedAgent = await agentsApi.update(id, name, description);
      setAgents(
        agents.map((agent) => (agent._id === id ? updatedAgent : agent))
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update agent";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        loading,
        error,
        addAgent,
        deleteAgent,
        updateAgent,
        refreshAgents,
      }}
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
