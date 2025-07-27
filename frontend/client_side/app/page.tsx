"use client";

import { useRouter } from "next/navigation";
import { Links } from "@/lib/links";

export default function Home() {
  const router = useRouter();
  router.push(Links.dashboard);
  return <div></div>;
}
