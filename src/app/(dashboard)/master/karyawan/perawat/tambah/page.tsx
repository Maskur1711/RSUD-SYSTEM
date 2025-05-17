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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { dokterSchema, type DokterFormValues } from "@/lib/schemas";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function TambahDataDokterPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      redirect("/login");
    }
  }, [user]);

  if (!user) return null;

  const form = useForm<DokterFormValues>({
    resolver: zodResolver(dokterSchema),
    defaultValues: {
      nama: "",
      nib: "",
      bidang: "Umum",
      email: "",
      alamat: "",
      nomorHandphone: "",
    },
  });

  function onSubmit(data: DokterFormValues) {
    toast.custom(() => (
      <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">
        <p className="font-bold mb-2">Data Dokter Terkirim:</p>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    ));
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-bold">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        Tambah Data Dokter
      </h1>{" "}
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nama */}
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Dokter" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* NIB */}
                <FormField
                  control={form.control}
                  name="nib"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIB</FormLabel>
                      <FormControl>
                        <Input placeholder="Nomor Induk Berusaha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Bidang */}
                <FormField
                  control={form.control}
                  name="bidang"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bidang</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih bidang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Umum">Umum</SelectItem>
                          <SelectItem value="Spesialis">Spesialis</SelectItem>
                          <SelectItem value="Forensik">Forensik</SelectItem>
                          <SelectItem value="Olahraga">Olahraga</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="nama@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Alamat */}
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Input placeholder="Jl. Sehat No.10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Nomor Handphone */}
                <FormField
                  control={form.control}
                  name="nomorHandphone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Handphone</FormLabel>
                      <FormControl>
                        <Input placeholder="081234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
