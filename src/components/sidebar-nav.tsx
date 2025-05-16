"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItemProps {
  title: string;
  label?: string;
  icon?: LucideIcon;
  variant: "default" | "ghost";
  href?: string;
  children?: NavItemProps[];
  isCollapsed: boolean;
  level?: number;
}

interface NavProps {
  isCollapsed: boolean;
  links: NavItemProps[];
}

export function NavItem({
  title,
  label,
  icon: Icon,
  variant,
  href,
  children,
  isCollapsed,
  level = 0,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = href ? pathname === href : false;
  const [open, setOpen] = useState(false);

  // If item has children, render as collapsible
  if (children && children.length > 0) {
    return (
      <Collapsible
        open={isCollapsed ? false : open}
        onOpenChange={isCollapsed ? undefined : setOpen}
        className="w-full"
      >
        <CollapsibleTrigger asChild className="w-full">
          <button
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
              isActive
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted",
              isCollapsed && "justify-center",
              level > 0 && !isCollapsed && "pl-8"
            )}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="h-5 w-5" />}
              {!isCollapsed && <span>{title}</span>}
            </div>
            {!isCollapsed && (
              <div className="flex items-center">
                {label && <span className="mr-2 text-xs">{label}</span>}
                {open ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-2">
          {!isCollapsed &&
            children.map((child, index) => (
              <NavItem
                key={index}
                {...child}
                isCollapsed={isCollapsed}
                level={level + 1}
              />
            ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // If item has no children, render as link
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href || "#"}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
            isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            isCollapsed && "justify-center",
            level > 0 && !isCollapsed && "pl-8"
          )}
        >
          {Icon && <Icon className="h-5 w-5" />}
          {!isCollapsed && <span>{title}</span>}
          {!isCollapsed && label && (
            <span className="ml-auto text-xs">{label}</span>
          )}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {title}
        {label && <span className="ml-auto text-xs">{label}</span>}
      </TooltipContent>
    </Tooltip>
  );
}

export function SidebarNav({ links, isCollapsed }: NavProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
      >
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) => (
            <NavItem key={index} {...link} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>
    </TooltipProvider>
  );
}
