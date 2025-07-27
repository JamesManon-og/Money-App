"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Links } from "@/lib/links";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(Links.home);
  }, [router]);

  return null;
}
