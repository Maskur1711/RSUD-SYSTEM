"use client";

import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useEffect } from "react";

import CardRuangan from "@/components/card/page";

export default function RuanganPage() {
  const { user } = useAuth();

  // Redirect if not logged in
  useEffect(() => {
    if (user === null) {
      redirect("/login");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Manajemen Ruangan</h1>
      <Card>
        <CardRuangan />
      </Card>
    </div>
  );
}
