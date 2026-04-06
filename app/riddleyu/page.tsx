"use client";

import dynamic from "next/dynamic";

const RiddleyuApp = dynamic(() => import("@riddleyu/App"), { ssr: false });

export default function RiddleyuPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <RiddleyuApp />
    </>
  );
}
