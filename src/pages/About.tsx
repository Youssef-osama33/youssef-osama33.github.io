import { motion } from "framer-motion";
import { PageReveal, StaggerReveal, StaggerItem } from "../components/PageReveal";
import { profile, timeline, skills, stats } from "../data/portfolio";

const LEVEL_STYLES: Record<string, { color: string }> = {
  Strong:       { color: "var(--accent)"  },
  Advanced:     { color: "var(--text-2)"  },
  Intermediate: { color: "var(--muted)"   },
  Learning:     { color: "var(--muted)"   },
};

export default function About() {
  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "48px 32px" }}>

      {/* Page label */}
      <PageReveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 48 }}>
          // about
        </div>
      </PageReveal>

      {/* Two-column layout */}
      <div
        className="grid gap-16"
        style={{ gridTemplateColumns: "1fr 300px" }}
      >
        {/* Left — Timeline + Skills */}
        <div>

          {/* Timeline */}
          <PageReveal>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
              Timeline
            </div>
          </PageReveal>

          <StaggerReveal className="flex flex-col mb-16">
            {timeline.map((item) => (
              <StaggerItem key={item.year + item.title}>
                <div
                  className="grid gap-6 items-start"
                  style={{ gridTemplateColumns: "72px 1fr", padding: "18px 0", borderBottom: "1px solid #0f0f0f" }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", paddingTop: 3 }}>
                    {item.year}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: 16, fontWeight: 400, marginBottom: 3, color: "var(--text)" }}>
                      {item.title}
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.03em" }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* Skills */}
          <PageReveal delay={0.1}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
              Skills
            </div>
          </PageReveal>

          <StaggerReveal>
            {skills.map((s) => (
              <StaggerItem key={s.name}>
                <div
                  className="flex items-center justify-between"
                  style={{ padding: "11px 0", borderBottom: "1px solid #0f0f0f" }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)" }}>
                    {s.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", color: LEVEL_STYLES[s.level]?.color || "var(--muted)", textTransform: "uppercase" }}>
                    {s.level}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>

        {/* Right — Stats + Contact */}
        <div>

          {/* Stats */}
          <PageReveal delay={0.2}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
              Numbers
            </div>
            <div className="grid grid-cols-2 gap-3 mb-16">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "18px 16px",
                    textAlign: "center",
                    transition: "border-color var(--transition)",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}
                >
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: 26, fontWeight: 300, fontStyle: "italic", color: "var(--accent)", display: "block", marginBottom: 4 }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", lineHeight: 1.5 }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </PageReveal>

          {/* Contact */}
          <PageReveal delay={0.3}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
              Contact
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Email",    value: profile.links.email,    href: `mailto:${profile.links.email}` },
                { label: "GitHub",   value: "youssefLabs",           href: profile.links.github },
                { label: "LinkedIn", value: "in/youssefosama",       href: profile.links.linkedin },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
                    {label}
                  </div>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-2)", textDecoration: "none", transition: "color var(--transition)" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-2)")}
                  >
                    {value}
                  </a>
                </div>
              ))}

              <div style={{ marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.04em" }}>
                <span className="pulse-dot" style={{ marginRight: 8 }} />
                Open to freelance & collabs
              </div>
            </div>
          </PageReveal>
        </div>
      </div>
    </div>
  );
}
