"use client";

import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasienSchema, type PasienFormValues } from "@/lib/schemas";
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

export default function TambahDataPasienPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      redirect("/login");
    }
  }, [user]);

  if (!user) return null;

  const form = useForm<PasienFormValues>({
    resolver: zodResolver(PasienSchema),
    defaultValues: {
      // Set default values sesuai schema terbaru
    },
  });

  function onSubmit(data: PasienFormValues) {
    toast.success("Data pasien berhasil dikirim!");
    console.log(data);
  }

  const inputClass = "grid grid-cols-1 md:grid-cols-2 gap-6";

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 flex items-center gap-2 text-3xl font-bold">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        Tambah Data Pasien
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Form Data Pasien</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* Group 1: Identitas Pasien */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Identitas Pasien</h2>
                <div className={inputClass}>
                  <FormField
                    name="namaLengkap"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="tempatTanggalLahir"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tempat & Tanggal Lahir</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="alamatLengkap"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Lengkap</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="jenisKelamin"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Jenis Kelamin</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Pilih jenis kelamin" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="pendidikan"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pendidikan</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="pekerjaan"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pekerjaan</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="agama"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agama</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="nomorTelepon"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Group 2: Data Medis */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Data Medis</h2>
                <div className={inputClass}>
                  <FormField
                    name="keluhanUtama"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Keluhan Utama</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="riwayatPenyakit"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Riwayat Penyakit</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="pemeriksaanFisik"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hasil Pemeriksaan Fisik</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="pemeriksaanPenunjang"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hasil Pemeriksaan Penunjang</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="diagnosis"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="rencanaPenatalaksanaan"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rencana Penatalaksanaan</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Group 3: Data Administrasi */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Data Administrasi
                </h2>
                <div className={inputClass}>
                  <FormField
                    name="nomorRekamMedis"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Rekam Medis</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="nik"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NIK</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="jaminanKesehatan"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jaminan Kesehatan</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="penanggungJawab"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Penanggung Jawab</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Group 4: Data Lainnya */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Data Lainnya</h2>
                <div className={inputClass}>
                  <FormField
                    name="kontakKeluarga"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informasi Kontak Keluarga</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="dataKunjungan"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Kunjungan</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="dokumenPendukung"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dokumen Pendukung</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
