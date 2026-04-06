import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageReveal, StaggerReveal, StaggerItem } from "../components/PageReveal";
import { projects, type ProjectStatus } from "../data/portfolio";

const STATUS_LABELS: Record<ProjectStatus, { badge: string; text: string }> = {
  live:          { badge: "badge badge-live", text: "Live"        },
  wip:           { badge: "badge badge-wip",  text: "In Progress" },
  "open-source": { badge: "badge badge-oss",  text: "Open Source" },
};

const FILTERS: Array<{ label: string; value: ProjectStatus | "all" }> = [
  { label: "All",         value: "all"         },
  { label: "Live",        value: "live"        },
  { label: "Open Source", value: "open-source" },
  { label: "In Progress", value: "wip"         },
];

export default function Projects() {
  const [filter, setFilter] = useState<ProjectStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 32px" }}>

      {/* Header */}
      <PageReveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>
          // projects
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 300, marginBottom: 32, lineHeight: 1.15 }}>
          Things I've built
        </h1>
      </PageReveal>

      {/* Filter */}
      <PageReveal delay={0.1} className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map(({ label, value }) => {
          const active = filter === value;
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.08em",
                padding: "5px 14px",
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                background: active ? "var(--accent-dim)" : "transparent",
                color: active ? "var(--accent)" : "var(--muted)",
                cursor: "pointer",
                transition: "all var(--transition)",
              }}
              onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"; }}
              onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
            >
              {label}
            </button>
          );
        })}
      </PageReveal>

      {/* Project list */}
      <StaggerReveal className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {visible.map((proj) => {
            const isExpanded = expanded === proj.id;
            const s = STATUS_LABELS[proj.status];

            return (
              <StaggerItem key={proj.id}>
                <motion.article
                  layout
                  style={{
                    borderTop: "1px solid var(--border)",
                    transition: "background var(--transition)",
                  }}
                >
                  {/* Main row */}
                  <div
                    className="grid gap-8 items-start"
                    style={{
                      gridTemplateColumns: "140px 1fr",
                      padding: "36px 0",
                    }}
                  >
                    {/* Meta column */}
                    <div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
                        {proj.year}
                      </div>
                      <span className={s.badge}>{s.text}</span>
                      <div className="mt-4 flex flex-col gap-1">
                        {proj.stack.map((s) => (
                          <span key={s} style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.04em" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Body column */}
                    <div>
                      <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 22, fontWeight: 400, marginBottom: 4 }}>
                        {proj.title}
                      </h2>
                      <div style={{ fontFamily: "var(--font-arabic)", fontSize: 13, color: "var(--muted)", direction: "rtl", marginBottom: 14 }}>
                        {proj.titleAr}
                      </div>

                      {/* Description — always show, expand for detail */}
                      <p style={{ fontFamily: "var(--font-serif)", fontSize: 14, fontWeight: 300, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 20 }}>
                        {proj.description}
                      </p>

                      {/* Links + expand */}
                      <div className="flex items-center gap-5 flex-wrap">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", textDecoration: "none", letterSpacing: "0.06em", transition: "color var(--transition)" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                          >
                            ↗ Live Demo
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", textDecoration: "none", letterSpacing: "0.06em", transition: "color var(--transition)" }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
                          >
                            ↗ GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </AnimatePresence>
      </StaggerReveal>

      {/* Bottom border */}
      <div style={{ borderTop: "1px solid var(--border)", marginTop: 0 }} />
    </div>
  );
}
