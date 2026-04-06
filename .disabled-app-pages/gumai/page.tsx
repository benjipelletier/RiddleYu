"use client";

import dynamic from "next/dynamic";

const GumaiApp = dynamic(() => import("@gumai/src/App"), { ssr: false });

export default function GumaiPage() {
  return <GumaiApp />;
}
