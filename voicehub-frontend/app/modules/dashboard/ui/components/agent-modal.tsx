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

interface CreateAgentModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

export function CreateAgentModal({
  open,
  onClose,
  onCreate,
}: CreateAgentModalProps) {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState({ name: "", prompt: "" });

  // Validate inputs
  const validate = () => {
    const newErrors = { name: "", prompt: "" };
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Agent name is required";
      isValid = false;
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
      isValid = false;
    }

    if (!prompt.trim()) {
      newErrors.prompt = "Description is required";
      isValid = false;
    } else if (prompt.length < 4) {
      newErrors.prompt = "Description must be at least 4 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle create button click
  const handleCreate = () => {
    if (validate()) {
      onCreate(name, prompt);
      handleClose();
    }
  };

  // Reset form and close
  const handleClose = () => {
    setName("");
    setPrompt("");
    setErrors({ name: "", prompt: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a New Agent</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Agent Name Input */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Agent Name
            </Label>
            <Input
              id="name"
              placeholder="e.g. English Teacher"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Prompt Input */}
          <div>
            <Label htmlFor="prompt" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="prompt"
              placeholder="Describe what your agent should do..."
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className={errors.prompt ? "border-red-500" : ""}
            />
            {errors.prompt && (
              <p className="text-xs text-red-500 mt-1">{errors.prompt}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {prompt.length} characters (minimum 4)
            </p>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleCreate}
            disabled={!name.trim() || !prompt.trim()}
          >
            Create Agent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
