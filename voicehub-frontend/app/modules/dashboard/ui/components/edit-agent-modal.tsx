"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Agent } from "../../types/agent";

interface EditAgentModalProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: number, name: string, description: string) => void;
}

export function EditAgentModal({
  agent,
  open,
  onClose,
  onUpdate,
}: EditAgentModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({ name: "", description: "" });

  // ✅ GOOD: Set initial values when dialog opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && agent) {
      // Only set values when opening (not closing)
      setName(agent.name);
      setDescription(agent.description);
      setErrors({ name: "", description: "" });
    } else {
      // Reset when closing
      onClose();
    }
  };

  const validate = () => {
    const newErrors = { name: "", description: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Agent name is required";
      isValid = false;
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    } else if (description.length < 4) {
      newErrors.description = "Description must be at least 4 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = () => {
    if (validate() && agent) {
      onUpdate(agent.id, name, description);
      handleClose();
    }
  };

  const handleClose = () => {
    setErrors({ name: "", description: "" });
    onClose();
  };

  if (!agent) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Agent Name Input */}
          <div>
            <Label htmlFor="edit-name" className="text-sm font-medium">
              Agent Name
            </Label>
            <Input
              id="edit-name"
              placeholder="e.g. English Teacher"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description Input */}
          <div>
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              placeholder="Describe what your agent should do..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {description.length} characters (minimum 4)
            </p>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleUpdate}
            disabled={!name.trim() || !description.trim()}
          >
            Update Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
