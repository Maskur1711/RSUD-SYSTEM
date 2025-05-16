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

export type LoginFormValues = z.infer<typeof loginSchemas>;
export type RegisterFormValues = z.infer<typeof registerSchemas>;
export type DokterFormValues = z.infer<typeof dokterSchema>;
export type PasienFormValues = z.infer<typeof PasienSchema>;
