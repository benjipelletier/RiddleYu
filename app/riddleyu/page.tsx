import type { Metadata } from "next";
import RiddleyuSunset from "./RiddleyuSunset";

export const metadata: Metadata = {
  title: "谜语日 · riddleyu — 谢幕",
  description: "riddleyu has reached its sunset. Thank you for playing.",
};

export default function RiddleyuPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <RiddleyuSunset />
    </>
  );
}
