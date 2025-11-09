"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateAgentModal } from "./agent-modal";
import { useAgents } from "../../lib/agent-context";

export const AgentButton = () => {
  const [open, setOpen] = useState(false);
  const { addAgent } = useAgents(); // Get addAgent function from context

  const handleCreate = (name: string, description: string) => {
    addAgent(name, description); // Add agent to global state
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        <h1>New Agent</h1>
      </Button>
      <CreateAgentModal
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
};
