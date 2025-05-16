"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  Home,
  LogOut,
  Database,
  Users,
  DollarSign,
  Building,
  Activity,
  Pill,
  Stethoscope,
  HeartPulse,
  UserCog,
  Warehouse,
  Bed,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "@/components/sidebar-nav";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToggleTheme } from "@/components/toggle-theme";

export function Sidebar({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    {
      title: "Dashboard",
      icon: Home,
      variant: "default",
      href: "/dashboard",
    },
    {
      title: "Master Data",
      icon: Database,
      variant: "ghost",
      children: [
        {
          title: "Karyawan",
          icon: Users,
          variant: "ghost",
          children: [
            {
              title: "Dokter",
              icon: Stethoscope,
              variant: "ghost",
              href: "/master/karyawan/dokter",
            },
            {
              title: "Pasien",
              icon: User,
              variant: "ghost",
              href: "/master/karyawan/pasien",
            },
            {
              title: "Perawat",
              icon: HeartPulse,
              variant: "ghost",
              href: "/master/karyawan/perawat",
            },
            {
              title: "Staff",
              icon: UserCog,
              variant: "ghost",
              href: "/master/karyawan/staff",
            },
          ],
        },
        {
          title: "Data Keuangan",
          icon: DollarSign,
          variant: "ghost",
          href: "/master/keuangan",
        },
        {
          title: "Ruangan",
          icon: Building,
          variant: "ghost",
          children: [
            {
              title: "Tindakan",
              icon: Activity,
              variant: "ghost",
              href: "/master/ruangan/tindakan",
            },
            {
              title: "Farmasi",
              icon: Pill,
              variant: "ghost",
              href: "/master/ruangan/farmasi",
            },
          ],
        },
        {
          title: "Alat Kesehatan",
          icon: Stethoscope,
          variant: "ghost",
          href: "/master/alat-kesehatan",
        },
        {
          title: "Gudang",
          icon: Warehouse,
          variant: "ghost",
          href: "/master/gudang",
        },
      ],
    },
    {
      title: "Pasien",
      icon: User,
      variant: "ghost",
      href: "/pasien",
    },
    {
      title: "Ruangan",
      icon: Bed,
      variant: "ghost",
      href: "/ruangan",
    },
    {
      title: "Data Keuangan",
      icon: FileText,
      variant: "ghost",
      href: "/keuangan",
    },
    {
      title: "Profile",
      icon: User,
      variant: "ghost",
      href: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      variant: "ghost",
      href: "/settings",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <div
        className={cn(
          "flex flex-col border-r bg-background",
          isCollapsed ? "w-[100px]" : "w-[240px]"
        )}
      >
        <div className="flex h-14 items-center justify-between border-b px-4">
          {!isCollapsed && <span className="font-bold">RSUD System</span>}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto cursor-pointer"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
          <ToggleTheme />
        </div>
        <ScrollArea className="flex-1 cursor-pointer">
          <SidebarNav links={navLinks} isCollapsed={isCollapsed} />
        </ScrollArea>
        <div className="sticky bottom-0 border-t p-2">
          {user ? (
            <div className="flex flex-col gap-2">
              {!isCollapsed && (
                <div className="flex items-center gap-2 px-2 py-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        user.profilePicture ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
                      }
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
              )}
              {isCollapsed && (
                <div className="flex justify-center py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        user.profilePicture ||
                        `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`
                      }
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
              <Button
                variant="ghost"
                className={cn(
                  "flex items-center gap-2 w-full justify-start cursor-pointer",
                  isCollapsed && "justify-center px-0"
                )}
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
                {!isCollapsed && <span>Logout</span>}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {!isCollapsed && (
                <>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/login">Login</a>
                  </Button>
                  <Button className="w-full" asChild>
                    <a href="/register">Register</a>
                  </Button>
                </>
              )}
              {isCollapsed && (
                <Button variant="ghost" size="icon" asChild>
                  <a href="/login">
                    <User className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
