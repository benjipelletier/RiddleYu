"use client";

import { useEffect, useMemo } from "react";
import type { ProjectConfig } from "@/projects.config";

const CONSTRUCTION_MESSAGES = [
  "Scaffolding in progress",
  "Architects are arguing",
  "Still marinating",
  "Under construction",
  "Permit pending",
  "Blueprints are drying",
  "Wiring the neurons",
  "Curing like concrete",
  "Fermenting quietly",
  "Assembling the pieces",
  "Simmering on low heat",
  "Waiting for inspiration",
  "Loading...",
  "Calibrating the vibes",
  "Dusting off the tools",
  "Aligning the stars",
  "Untangling the threads",
  "Composting ideas",
  "Brewing something",
  "Not ready yet",
  "Incubating",
  "Rehearsing backstage",
  "Tuning the instruments",
  "Steeping like tea",
  "Laying the foundation",
  "Warming up",
  "Gathering momentum",
  "Plotting the course",
  "Stretching before the run",
  "Seeds planted, no sprouts yet",
  "The ink is still wet",
  "Sanding the rough edges",
  "Kneading the dough",
  "Charging up",
  "Daydreaming productively",
  "Tightening the bolts",
  "Awaiting clearance",
  "Debugging the universe",
  "Consulting the oracle",
  "Sharpening the pencils",
  "Connecting the dots",
  "Letting it breathe",
  "Draft zero",
  "Crunching the numbers",
  "Hammering away",
  "Early access denied",
  "Hold that thought",
  "Percolating",
  "Somewhere between idea and thing",
  "The clay is still soft",
];

function Stars() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = document.getElementById("constellation");
    if (!layer) return;

    const count = 22;
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 1;
      const dur = (Math.random() * 3 + 2).toFixed(1) + "s";
      const delay = (Math.random() * 4).toFixed(2) + "s";
      const minOp = (Math.random() * 0.15 + 0.05).toFixed(2);
      const maxOp = (Math.random() * 0.4 + 0.4).toFixed(2);
      star.style.cssText = [
        "width:" + size + "px",
        "height:" + size + "px",
        "top:" + Math.random() * 100 + "%",
        "left:" + Math.random() * 100 + "%",
        "--dur:" + dur,
        "--delay:" + delay,
        "--min-op:" + minOp,
        "--max-op:" + maxOp,
      ].join(";");
      layer.appendChild(star);
    }
  }, []);

  return null;
}

function CardGlow() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".card").forEach((card) => {
      card.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x =
          (((e.clientX - rect.left) / rect.width) * 100).toFixed(1) + "%";
        const y =
          (((e.clientY - rect.top) / rect.height) * 100).toFixed(1) + "%";
        card.style.setProperty("--glow-x", x);
        card.style.setProperty("--glow-y", y);
      });
    });
  }, []);

  return null;
}

function BlobParallax() {
  useEffect(() => {
    if (window.innerWidth < 640) return;

    const blobs = document.querySelectorAll<HTMLElement>(".blob");
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (blobs[0]) blobs[0].style.transform = "translateY(" + y * 0.06 + "px)";
        if (blobs[1]) blobs[1].style.transform = "translateY(" + -y * 0.04 + "px)";
        if (blobs[2]) blobs[2].style.transform = "translateY(" + y * 0.03 + "px)";
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}

function pickMessage(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  return CONSTRUCTION_MESSAGES[Math.abs(h) % CONSTRUCTION_MESSAGES.length];
}

function renderCard(project: ProjectConfig, bannerMessage?: string) {
  const disabled = !project.enabled;
  const Tag = disabled ? "div" : "a";
  const linkProps = disabled ? {} : { href: `/${project.name}` };
  return (
    <Tag
      key={project.name}
      className={`card${disabled ? " card-disabled" : ""}`}
      {...linkProps}
      style={
        {
          "--accent": project.accent,
          "--accent-rgb": project.accentRgb,
        } as React.CSSProperties
      }
      aria-label={`${project.displayName} — ${project.tagline}`}
    >
      {disabled && (
        <div className="card-banner">
          {bannerMessage}
        </div>
      )}
      <div className="card-glow" />
      <span className="card-icon" aria-hidden="true">
        {project.icon}
      </span>
      <div className="card-name">{project.displayName}</div>
      <div className="card-tagline">{project.tagline}</div>
      <div className="card-desc">{project.description}</div>
      <div className="card-footer">
        <div className="card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
        {!disabled && (
          <svg
            className="card-arrow"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </Tag>
  );
}

export function LandingClient({ projects }: { projects: ProjectConfig[] }) {
  const enabled = projects.filter((p) => p.enabled);
  const disabled = projects.filter((p) => !p.enabled);

  const bannerMessages = useMemo(() => {
    const map: Record<string, string> = {};
    for (const p of projects) {
      if (!p.enabled) map[p.name] = pickMessage(p.name);
    }
    return map;
  }, [projects]);

  return (
    <>
      <Stars />
      <CardGlow />
      <BlobParallax />

      <div className="blobs" aria-hidden="true">
        <div className="blob blob-red" />
        <div className="blob blob-gold" />
        <div className="blob blob-teal" />
      </div>

      <div className="constellation" aria-hidden="true" id="constellation" />

      <div className="page">
        <header className="hero">
          <h1 className="site-title">
            <span className="prefix">benji.</span>
            <span className="strikethrough" aria-hidden="true">
              vibe
            </span>
            <span className="suffix">codes</span>
          </h1>
          <p className="site-subtitle">
            chinese &middot; music &middot; tools &amp; games
          </p>
        </header>

        <main>
          <div className="grid">
            {enabled.map((p) => renderCard(p))}
          </div>

          {disabled.length > 0 && (
            <>
              <div className="section-divider">
                <span className="section-divider-line" />
                <span className="section-divider-label">coming soon</span>
                <span className="section-divider-line" />
              </div>

              <div className="grid grid-disabled">
                {disabled.map((p) => renderCard(p, bannerMessages[p.name]))}
              </div>
            </>
          )}
        </main>

        <footer className="site-footer">
          <p className="footer-text">
            made with obsession &middot;{" "}
            <a href="https://github.com/benjipelletier/benji.codes">github</a>
          </p>
        </footer>
      </div>
    </>
  );
}
