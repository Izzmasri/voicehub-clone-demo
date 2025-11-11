"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, Edit, Bot, MessageSquare } from "lucide-react";
import { Agent } from "../../types/agent";

interface AgentCardProps {
  agent: Agent;
  onCopy?: (agent: Agent) => void;
  onDelete?: (agent: Agent) => void;
  onEdit?: (agent: Agent) => void;
  onChat?: (agent: Agent) => void;
}

export function AgentCard({
  agent,
  onCopy,
  onDelete,
  onEdit,
  onChat,
}: AgentCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Agent Header */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Bot className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate">{agent.name}</h3>
              <p className="text-sm text-gray-500 truncate">
                {agent.description}
              </p>
            </div>
            <div className="flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-gray-600"
                onClick={() => onCopy?.(agent)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-gray-600"
                onClick={() => onDelete?.(agent)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-gray-600"
                onClick={() => onEdit?.(agent)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Agent Footer */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-gray-600">
              Total: <span className="font-medium">{agent.total}</span>
            </span>
            <Badge
              variant="secondary"
              className={
                agent.status === "Open"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }
            >
              {agent.status}
            </Badge>
          </div>

          {/* Chat Button */}
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2"
            onClick={() => onChat?.(agent)}
          >
            <MessageSquare className="h-4 w-4" />
            Start Chat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
