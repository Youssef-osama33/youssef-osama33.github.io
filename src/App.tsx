import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { ScrollProgress } from "./components/ScrollProgress";
import { CommandPalette } from "./components/CommandPalette";
import "./styles/theme.css";

// Lazy-load pages (keeps initial bundle small)
const Home     = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Writing  = lazy(() => import("./pages/Writing"));
const About    = lazy(() => import("./pages/About"));

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{    opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Suspense fallback
function PageLoader() {
  return (
    <div style={{ padding: "80px 32px", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em" }}>
      loading…
    </div>
  );
}

// Animated routes (needs useLocation, so separate component)
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<PageTransition><Home     /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
          <Route path="/writing"  element={<PageTransition><Writing  /></PageTransition>} />
          <Route path="/about"    element={<PageTransition><About    /></PageTransition>} />
          {/* 404 */}
          <Route path="*" element={
            <PageTransition>
              <div style={{ padding: "80px 32px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "0.18em", marginBottom: 16 }}>
                  // 404
                </div>
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 28, fontWeight: 300, color: "var(--text-2)" }}>
                  Page not found
                </div>
              </div>
            </PageTransition>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

// Root app — noise texture class on body
export default function App() {
  return (
    <BrowserRouter>
      {/* Global UI */}
      <ScrollProgress />
      <CommandPalette />

      {/* Layout */}
      <div className="noise" style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <Navbar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
