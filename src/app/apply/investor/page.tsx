"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InvestorApplyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/waitlist");
  }, [router]);

  return null;
}
