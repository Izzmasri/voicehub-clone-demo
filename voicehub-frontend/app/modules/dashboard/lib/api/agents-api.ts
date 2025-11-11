import { Agent } from "../../types/agent";

const API_URL = process.env.NEXT_PUBLIC_AGENTS_API_URL as string;

export const agentsApi = {
  // Get all agents
  async getAll(): Promise<Agent[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch agents");
    }
    return response.json();
  },

  // Get single agent
  async getOne(id: string): Promise<Agent> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch agent");
    }
    return response.json();
  },

  // Create agent
  async create(name: string, description: string): Promise<Agent> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create agent");
    }

    return response.json();
  },

  // Update agent
  async update(
    id: string,
    name?: string,
    description?: string
  ): Promise<Agent> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body: any = {};
    if (name) body.name = name;
    if (description) body.description = description;

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update agent");
    }

    return response.json();
  },

  // Delete agent
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete agent");
    }
  },
};
