"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-center">
      <h1 className="text-4xl font-bold">
        SELAMAT DATANG DI APLIKASI RSUD HOLIS
      </h1>
      <DotLottieReact
        src="https://lottie.host/2eeb033d-f79d-48fd-9133-53efdfd63ffb/sLtyGcyThQ.lottie"
        loop
        autoplay
      />
      <p className="max-w-md text-muted-foreground">
        Aplikasi ini adalah aplikasi untuk mempermudah dalam pengelolaan data di
        RSUD Holis. Silahkan login / register untuk melanjutkan ke aplikasi.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </div>
  );
}
