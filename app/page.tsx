import { projects } from "@/projects.config";
import { LandingClient } from "./LandingClient";

export default function Home() {
  return <LandingClient projects={projects} />;
}
