"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PhoneBody, InvestorScreen, FounderScreen } from "@/components/IPhoneMockups";

function ExportContent() {
  const params = useSearchParams();
  const phone = params.get("phone");
  const staticMode = params.get("static") === "true";

  if (phone === "investor") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <PhoneBody hovered={false}>
          <InvestorScreen isVisible={true} staticMode={staticMode} />
        </PhoneBody>
      </div>
    );
  }

  if (phone === "founder") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <PhoneBody hovered={false}>
          <FounderScreen isVisible={true} staticMode={staticMode} />
        </PhoneBody>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        background: "#111",
        color: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: 600 }}>Export Phones</h1>
      <a
        href="/export-phones?phone=investor&static=true"
        style={{ color: "#7C5CFC", fontSize: "18px" }}
      >
        Investor Phone
      </a>
      <a
        href="/export-phones?phone=founder&static=true"
        style={{ color: "#7C5CFC", fontSize: "18px" }}
      >
        Founder Phone
      </a>
    </div>
  );
}

export default function ExportPhonesPage() {
  return (
    <Suspense fallback={<div style={{ background: "transparent", minHeight: "100vh" }} />}>
      <ExportContent />
    </Suspense>
  );
}
