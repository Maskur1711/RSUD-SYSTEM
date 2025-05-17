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
import { DataTable } from "@/components/table/data-table";

export default function DokterPage() {
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
      <h1 className="mb-6 text-3xl font-bold">Data Dokter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Daftar Data Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable addButtonText="Tambah Staff" />
        </CardContent>
      </Card>
    </div>
  );
}
