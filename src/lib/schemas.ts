import { z } from "zod";

export const loginSchemas = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const registerSchemas = z
  .object({
    username: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    role: z.enum(["Admin", "User", "Staff"], {
      required_error: "You need to select a role.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const dokterSchema = z.object({
  nama: z.string().min(2, { message: "Nama wajib diisi" }),
  nib: z.string().min(1, { message: "NIB wajib diisi" }),
  bidang: z.enum(["Umum", "Spesialis", "Forensik", "Olahraga"], {
    required_error: "Pilih salah satu bidang",
  }),
  email: z.string().email({ message: "Email tidak valid" }),
  alamat: z.string().min(5, { message: "Alamat wajib diisi" }),
  nomorHandphone: z.string().regex(/^[0-9]{10,15}$/, {
    message: "Nomor HP harus 10-15 digit angka",
  }),
});

export const PasienSchema = z.object({
  // Identitas Pasien
  namaLengkap: z.string().min(2, { message: "Nama wajib diisi" }),
  tempatTanggalLahir: z
    .string()
    .min(3, { message: "Tempat & Tanggal Lahir wajib diisi" }),
  alamatLengkap: z.string().min(5, { message: "Alamat wajib diisi" }),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
    required_error: "Pilih jenis kelamin",
  }),
  pendidikan: z.string().min(2, { message: "Pendidikan wajib diisi" }),
  pekerjaan: z.string().min(2, { message: "Pekerjaan wajib diisi" }),
  agama: z.string().min(2, { message: "Agama wajib diisi" }),
  nomorTelepon: z.string().regex(/^[0-9]{10,15}$/, {
    message: "Nomor telepon harus 10-15 digit angka",
  }),

  // Data Medis
  keluhanUtama: z.string().min(2, { message: "Keluhan utama wajib diisi" }),
  riwayatPenyakit: z
    .string()
    .min(2, { message: "Riwayat penyakit wajib diisi" }),
  pemeriksaanFisik: z
    .string()
    .min(2, { message: "Pemeriksaan fisik wajib diisi" }),
  pemeriksaanPenunjang: z
    .string()
    .min(2, { message: "Pemeriksaan penunjang wajib diisi" }),
  diagnosis: z.string().min(2, { message: "Diagnosis wajib diisi" }),
  rencanaPenatalaksanaan: z
    .string()
    .min(2, { message: "Rencana penatalaksanaan wajib diisi" }),

  // Data Administrasi
  nomorRekamMedis: z
    .string()
    .min(2, { message: "Nomor rekam medis wajib diisi" }),
  nik: z.string().length(16, { message: "NIK harus 16 digit" }),
  jaminanKesehatan: z
    .string()
    .min(2, { message: "Jaminan kesehatan wajib diisi" }),
  penanggungJawab: z
    .string()
    .min(2, { message: "Penanggung jawab wajib diisi" }),

  // Data Lainnya
  kontakKeluarga: z.string().min(2, { message: "Kontak keluarga wajib diisi" }),
  dataKunjungan: z.string().min(2, { message: "Data kunjungan wajib diisi" }),
  dokumenPendukung: z.any().optional(), // Untuk file upload, bisa ditangani di backend
});

export type LoginFormValues = z.infer<typeof loginSchemas>;
export type RegisterFormValues = z.infer<typeof registerSchemas>;
export type DokterFormValues = z.infer<typeof dokterSchema>;
export type PasienFormValues = z.infer<typeof PasienSchema>;
