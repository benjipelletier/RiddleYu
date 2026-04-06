"use client";

import dynamic from "next/dynamic";

const GecijielongApp = dynamic(() => import("@gecijielong/src/App"), {
  ssr: false,
});

export default function GecijielongPage() {
  return <GecijielongApp />;
}
