import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { PageReveal, StaggerReveal, StaggerItem } from "../components/PageReveal";
import { profile, projects } from "../data/portfolio";

const STATUS_STYLES: Record<string, { badge: string; label: string }> = {
  live:          { badge: "badge badge-live", label: "Live"       },
  wip:           { badge: "badge badge-wip",  label: "In Progress" },
  "open-source": { badge: "badge badge-oss",  label: "Open Source" },
};

export default function Home() {
  const navigate = useNavigate();
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <Sidebar />

      <main
        className="flex-1 min-w-0"
        style={{ padding: "48px 40px", maxWidth: "720px" }}
      >
        {/* ── Bio ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="label-tag mb-6" style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20 }}>
            // about
          </div>

          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 18,
              fontWeight: 300,
              lineHeight: 1.9,
              color: "var(--text-2)",
              marginBottom: 28,
              whiteSpace: "pre-line",
            }}
          >
            {profile.bio.split("Arabic").map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <strong style={{ color: "var(--text)", fontWeight: 400 }}>Arabic</strong>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>

          {/* Arabic bio */}
          <p
            style={{
              fontFamily: "var(--font-arabic)",
              fontSize: 14,
              fontWeight: 300,
              color: "var(--muted)",
              direction: "rtl",
              borderRight: "2px solid var(--border)",
              paddingRight: 16,
              lineHeight: 2,
              marginBottom: 48,
            }}
          >
            {profile.bioArabic}
          </p>
        </motion.div>

        {/* ── Featured projects ────────────────────────────────────────── */}
        <PageReveal delay={0.15}>
          <div
            style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20 }}
          >
            // featured work
          </div>
        </PageReveal>

        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((p) => {
            const s = STATUS_STYLES[p.status];
            return (
              <StaggerItem key={p.id}>
                <motion.div
                  onClick={() => navigate("/projects")}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "20px 22px",
                    cursor: "pointer",
                    transition: "border-color var(--transition), background var(--transition)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                    (e.currentTarget as HTMLElement).style.background = "var(--accent-dim)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={s.badge}>{s.label}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)" }}>{p.year}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 400, color: "var(--text)", marginBottom: 6 }}>
                    {p.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-arabic)", fontSize: 12, color: "var(--muted)", direction: "rtl", marginBottom: 10 }}>
                    {p.titleAr}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", lineHeight: 1.7 }}>
                    {p.stack.slice(0, 3).join(" · ")}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerReveal>

        {/* ── Quick links row ──────────────────────────────────────────── */}
        <PageReveal delay={0.1} className="mt-12">
          <div
            className="flex flex-wrap gap-3"
            style={{ paddingTop: 24, borderTop: "1px solid var(--border)" }}
          >
            {[
              { label: "All projects →", to: "/projects" },
              { label: "Writing →",      to: "/writing"  },
              { label: "About →",        to: "/about"    },
            ].map(({ label, to }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.06em",
                  color: "var(--muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "color var(--transition)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
              >
                {label}
              </button>
            ))}
          </div>
        </PageReveal>
      </main>
    </div>
  );
}
