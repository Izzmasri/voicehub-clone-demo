"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { AgentButton } from "./dashboard-new-agent";
import { usePathname } from "next/navigation";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const pathName = usePathname();

  return (
    <nav className="flex px-4 gap-x-2 items-center justify-between py-3 border-b bg-background">
      <div className="flex justify-center items-center gap-4">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelRightClose className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>
        <h1 className="text-xl">
          {pathName === "/"
            ? "Home"
            : pathName.charAt(1).toUpperCase() + pathName.slice(2)}
        </h1>
      </div>
      {pathName === "/" || pathName === "/agents" ? <AgentButton /> : null}
    </nav>
  );
};
