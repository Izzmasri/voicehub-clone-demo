"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function UserCredits() {
  const agentsUsed = 1;
  const agentsTotal = 3;
  const callsUsed = 3;
  const callsTotal = 5;

  const agentsProgress = (agentsUsed / agentsTotal) * 100;
  const callsProgress = (callsUsed / callsTotal) * 100;

  return (
    <div className="rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 p-4 border border-blue-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-gray-900">Free Trial</span>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 mb-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Agents</p>
            <p className="text-sm font-semibold text-gray-900">
              {agentsUsed}/{agentsTotal}
            </p>
          </div>
          <Progress
            value={agentsProgress}
            className="h-2 bg-white [&>div]:bg-blue-600"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-700">Calls</p>
            <p className="text-sm font-semibold text-gray-900">
              {callsUsed}/{callsTotal}
            </p>
          </div>
          <Progress
            value={callsProgress}
            className="h-2 bg-white [&>div]:bg-blue-600"
          />
        </div>
      </div>

      {/* Upgrade Button */}
      <Button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
        size="sm"
      >
        Upgrade
      </Button>
    </div>
  );
}
