import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageReveal, StaggerReveal, StaggerItem } from "../components/PageReveal";
import { articles, type ArticleLang, type ArticleTag } from "../data/portfolio";

type Filter = "all" | ArticleLang | ArticleTag;

const FILTERS: Array<{ label: string; value: Filter }> = [
  { label: "All",       value: "all"       },
  { label: "العربية",   value: "ar"        },
  { label: "English",   value: "en"        },
  { label: "AI",        value: "AI"        },
  { label: "Dev",       value: "Dev"       },
  { label: "Freelance", value: "Freelance" },
  { label: "Tools",     value: "Tools"     },
];

export default function Writing() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = articles.filter((a) => {
    if (filter === "all") return true;
    if (filter === "ar" || filter === "en") return a.lang === filter;
    return a.tags.includes(filter as ArticleTag);
  });

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 32px" }}>

      {/* Header */}
      <PageReveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12 }}>
          // writing
        </div>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 300, marginBottom: 8, lineHeight: 1.15 }}>
          Articles & posts
        </h1>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 300, color: "var(--muted)", marginBottom: 36, lineHeight: 1.7 }}>
          Technical writing in Arabic and English — AI, engineering, and tools for Arab developers.
        </p>
      </PageReveal>

      {/* Filter */}
      <PageReveal delay={0.1} className="flex flex-wrap gap-2 mb-10">
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

      {/* Count */}
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em", marginBottom: 8 }}>
        {visible.length} article{visible.length !== 1 ? "s" : ""}
      </div>

      {/* Articles */}
      <StaggerReveal>
        <AnimatePresence mode="popLayout">
          {visible.map((article) => (
            <StaggerItem key={article.id}>
              <motion.a
                layout
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid gap-6 items-start"
                style={{
                  gridTemplateColumns: "72px 1fr 56px",
                  padding: "22px 0",
                  borderTop: "1px solid var(--border)",
                  textDecoration: "none",
                  display: "grid",
                  cursor: "pointer",
                  transition: "background var(--transition)",
                  margin: "0 -12px",
                  paddingLeft: 12,
                  paddingRight: 12,
                  borderRadius: "var(--radius-sm)",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--accent-dim)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
              >
                {/* Date */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", paddingTop: 3, letterSpacing: "0.04em" }}>
                  {article.date}
                </div>

                {/* Body */}
                <div>
                  <div
                    style={{
                      fontFamily: article.lang === "ar" ? "var(--font-arabic)" : "var(--font-serif)",
                      fontSize: article.lang === "ar" ? 16 : 16,
                      fontWeight: 400,
                      color: "var(--text)",
                      marginBottom: 8,
                      direction: article.lang === "ar" ? "rtl" : "ltr",
                      lineHeight: 1.5,
                    }}
                  >
                    {article.title}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        padding: "2px 7px",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--muted)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {article.lang.toUpperCase()}
                    </span>
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          color: "var(--muted)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Platform */}
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--muted)", paddingTop: 4, textAlign: "right", letterSpacing: "0.06em" }}>
                  {article.platform}
                  <span style={{ display: "block", marginTop: 4, color: "var(--accent)", fontSize: 12 }}>↗</span>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </AnimatePresence>
      </StaggerReveal>

      <div style={{ borderTop: "1px solid var(--border)", marginTop: 0 }} />
    </div>
  );
}
