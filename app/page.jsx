"use client";

import { useState, useEffect, useRef } from "react";

const DARK = {
  bg: "#000000", sectionAlt: "#050505", card: "#1A1A1A", border: "#2E2E2E",
  text: "#FFFFFF", muted: "#A0A0A0", nav: "rgba(0,0,0,0.94)", tabActive: "#262626",
  chipDark: "#2A2A2A", photoBox: "#1A1A1A", modalBg: "#111111",
  accent: "#0D9488", accentSub: "#5EEAD4", accentBadgeBg: "#0D3A30", accentBadgeBorder: "#0D9488",
};
const LIGHT = {
  bg: "#FFFFFF", sectionAlt: "#F7F7F7", card: "#F2F2F2", border: "#E0E0E0",
  text: "#0A0A0A", muted: "#555555", nav: "rgba(255,255,255,0.94)", tabActive: "#E8E8E8",
  chipDark: "#E0E0E0", photoBox: "#E8E8E8", modalBg: "#FFFFFF",
  accent: "#0F766E", accentSub: "#134E4A", accentBadgeBg: "#CCFBF1", accentBadgeBorder: "#0F766E",
};

const TABS = ["home", "about", "experience", "projects", "contact"];
const FULL_TEXT = "hello world, it's Solomon!";
const TYPE_SPEED = 65;

// ── FILL THESE IN ────────────────────────────────────────────────────────────
const CORNELL = {
  gpa: "TBA",
  courses: ["TBA", "TBA", "TBA", "TBA", "TBA", "TBA"],
  research: [
    { title: "TBA", lab: "TBA", date: "TBA", desc: "TBA" },
  ],
  ta: [
    { course: "TBA", date: "TBA", desc: "TBA" },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────

const JOBS = [
  { id: 0, company: "Databricks", role: "Software Engineer", date: "Aug 2026 – Present", tags: ["Go", "Python", "Spark", "Delta Lake"], desc: "Building distributed data processing infrastructure on the Databricks Lakehouse platform. Contributing to core Spark runtime performance optimizations and platform reliability systems." },
  { id: 1, company: "Google", role: "Software Engineer Intern", date: "Aug – Nov 2025", tags: ["Java", "GCP", "Vertex AI", "Spring", "MCP"], desc: "Built an AI-powered package recommendation engine and MCP service for Airlock, Google's internal package management platform. Deployed a Java Spring MCP server on Cloud Run with UberProxy auth. Shipped in both Gemini Code Assist and Gemini CLI, eliminating a common class of hallucination errors in agentic coding workflows." },
  { id: 2, company: "Roblox", role: "SWE Intern — ML Platform", date: "May – Aug 2025", tags: ["Go", "Kubernetes", "GCP", "Prometheus", "Grafana"], desc: "Built two systems in Go that transformed how Roblox's ML platform handles GPU resource allocation. The ML Kubernetes Descheduler automatically detects idle RayJobs and Kubeflow pipelines and terminates them using bin-packing algorithms. Also built a real-time cost dashboard with Prometheus and Grafana, replacing a slow Superset setup." },
  { id: 3, company: "Amazon Robotics", role: "Software Engineer Co-op", date: "Aug – Dec 2024", tags: ["Python", "AWS", "C++", "Robotics"], desc: "Achieved a 700% throughput improvement via Python concurrency refactor on a robotic path-planning pipeline. Resolved a live data-corruption incident affecting production warehouse systems." },
];

const PROJECTS = [
  { id: 0, name: "ML Kubernetes Descheduler & Cost Panel", company: "Roblox — ML Platform", metric: "$1.3M saved/yr · 25% GPU efficiency ↑", desc: "Roblox's ML platform runs thousands of GPU-intensive training jobs on Kubernetes. I built an ML Kubernetes Descheduler that automatically detects idle jobs and terminates them using bin-packing algorithms, plus a real-time cost dashboard with Go, Prometheus, and Grafana.", tags: ["Go", "Kubernetes", "GCP", "RayJobs", "Kubeflow", "Prometheus", "Grafana"] },
  { id: 1, name: "AI Package Recommendation Engine", company: "Google — Airlock Team", metric: "Shipped in Gemini Code Assist · Gemini CLI", desc: "Engineers building Java apps at Google need to find the right internal packages, but LLM coding assistants would hallucinate package names or recommend public packages not approved for internal use. I built an AI-powered recommendation engine and MCP service that acts as a tool layer between the LLM and Airlock's package registry.", tags: ["Java", "GCP", "Vertex AI", "Spring", "Cloud Run", "MCP"] },
  { id: 2, name: "LLM Persona Belief Influence Research", company: "Cornell University — Undergrad Research", metric: "+55pp pro · −35pp con gap · OOD generalization", desc: "I designed and built a persona-based evaluation framework to measure whether LLM belief adoption generalizes out-of-distribution. Key finding: pro personas achieve ~+55pp discrimination gap, con personas reverse to ~−35pp, holding at 4–6 hops from the root thesis.", tags: ["Python", "OpenAI API", "NLP", "LLM Evaluation", "AI Safety"] },
];

function useTypewriter(text, speed) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const tick = () => { i++; setDisplayed(text.slice(0, i)); if (i < text.length) setTimeout(tick, speed); else setDone(true); };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [text, speed]);
  return { displayed, done };
}

function SectionLabel({ children, accent }) {
  return <p style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: 1.2, marginBottom: 10, marginTop: 20, textTransform: "uppercase" }}>{children}</p>;
}

function CornellModal({ onClose, c }) {
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div ref={ref} onClick={(e) => { if (e.target === ref.current) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 660, background: c.modalBg, border: `1px solid ${c.border}`, borderRadius: 12, overflow: "hidden", position: "relative", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 24px 0", flexShrink: 0 }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: c.card, border: `1px solid ${c.border}`, borderRadius: 6, color: c.muted, width: 30, height: 30, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>✕</button>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
            <div style={{ width: 42, height: 42, background: "#B31B1B", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🎓</div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: c.text, margin: 0 }}>Cornell University</h2>
              <p style={{ fontSize: 13, color: c.muted, margin: 0 }}>B.S. Computer Science · College of Engineering</p>
            </div>
          </div>
          <p style={{ fontSize: 12, color: c.accent, fontWeight: 600, marginBottom: 20 }}>Expected May 2026</p>
        </div>

        <div style={{ padding: "0 24px 24px", overflowY: "auto", flex: 1 }}>
          <SectionLabel accent={c.accent}>GPA</SectionLabel>
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, color: c.muted }}>Cumulative GPA</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: c.text }}>{CORNELL.gpa}</span>
          </div>

          <SectionLabel accent={c.accent}>Relevant Coursework</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {CORNELL.courses.map((course, i) => (
              <div key={i} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: c.muted }}>{course}</div>
            ))}
          </div>

          <SectionLabel accent={c.accent}>Research</SectionLabel>
          {CORNELL.research.map((r, i) => (
            <div key={i} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 8, padding: "14px 16px", marginBottom: 8, borderLeft: `3px solid ${c.accent}` }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 3 }}>{r.title}</div>
              <div style={{ fontSize: 12, color: c.accent, fontWeight: 600, marginBottom: 3 }}>{r.lab}</div>
              <div style={{ fontSize: 11, color: c.muted, marginBottom: 8 }}>{r.date}</div>
              <div style={{ fontSize: 12, color: c.muted, lineHeight: 1.65 }}>{r.desc}</div>
            </div>
          ))}

          <SectionLabel accent={c.accent}>Teaching Assistant</SectionLabel>
          {CORNELL.ta.map((t, i) => (
            <div key={i} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 8, padding: "14px 16px", marginBottom: 8, borderLeft: `3px solid ${c.accentSub}` }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 3 }}>{t.course}</div>
              <div style={{ fontSize: 11, color: c.muted, marginBottom: 8 }}>{t.date}</div>
              <div style={{ fontSize: 12, color: c.muted, lineHeight: 1.65 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Modal({ item, type, onClose, c }) {
  const ref = useRef();
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);
  const isProject = type === "project";
  const chip = { background: c.chipDark, color: c.text, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 4, display: "inline-block" };
  return (
    <div ref={ref} onClick={(e) => { if (e.target === ref.current) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 660, background: c.modalBg, border: `1px solid ${c.border}`, borderRadius: 12, overflow: "hidden", position: "relative", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 24px 0", flexShrink: 0 }}>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: c.card, border: `1px solid ${c.border}`, borderRadius: 6, color: c.muted, width: 30, height: 30, cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>✕</button>
          <span style={{ background: c.accentBadgeBg, border: `1px solid ${c.accentBadgeBorder}`, color: c.accent, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, display: "inline-block", marginBottom: 12 }}>{isProject ? item.company : item.role}</span>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 6, paddingRight: 40 }}>{isProject ? item.name : item.company}</h2>
          <p style={{ color: c.accentSub, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>{isProject ? item.metric : item.date}</p>
        </div>
        <div style={{ padding: "0 24px 24px", overflowY: "auto", flex: 1 }}>
          <p style={{ color: c.muted, fontSize: 14, lineHeight: 1.85, marginBottom: 24 }}>{item.desc}</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {["[ photo ]", "[ photo ]", "[ photo ]"].map((l, i) => (
              <div key={i} style={{ height: 90, background: c.photoBox, border: `1px solid ${c.border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: c.muted, fontSize: 11 }}>{l}</div>
            ))}
          </div>
          <div style={{ height: 140, background: c.photoBox, border: `1px solid ${c.border}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: c.muted, fontSize: 12, marginBottom: 20 }}>▶  [ video / demo ]</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{item.tags.map(t => <span key={t} style={chip}>{t}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState("home");
  const [modal, setModal] = useState(null);
  const [showCornell, setShowCornell] = useState(false);
  const [blink, setBlink] = useState(true);
  const refs = useRef({});
  const clicking = useRef(false);
  const { displayed, done } = useTypewriter(FULL_TEXT, TYPE_SPEED);
  const c = isDark ? DARK : LIGHT;

  const chip = (useDark) => ({
    background: useDark ? c.chipDark : c.accent,
    color: useDark ? c.text : "#fff",
    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 4, display: "inline-block",
  });

  const cardStyle = { background: c.card, border: `1px solid ${c.border}`, borderRadius: 10, overflow: "hidden" };

  useEffect(() => {
    if (!done) return;
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, [done]);

  useEffect(() => {
    const obs = {};
    TABS.forEach(tab => {
      const el = refs.current[tab];
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting && !clicking.current) setActive(tab); },
        { threshold: 0, rootMargin: "-35% 0px -60% 0px" }
      );
      o.observe(el);
      obs[tab] = o;
    });
    return () => Object.values(obs).forEach(o => o.disconnect());
  }, []);

  const go = (tab) => {
    setActive(tab);
    clicking.current = true;
    refs.current[tab]?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { clicking.current = false; }, 900);
  };

  const sec = (extra = {}) => ({ padding: "40px 0", borderBottom: `1px solid ${isDark ? "#0D0D0D" : "#E8E8E8"}`, ...extra });

  return (
    <div style={{ background: c.bg, color: c.text, fontFamily: "'Inter', sans-serif", minHeight: "100vh", transition: "background 0.2s, color 0.2s" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      {modal && <Modal item={modal.item} type={modal.type} onClose={() => setModal(null)} c={c} />}
      {showCornell && <CornellModal onClose={() => setShowCornell(false)} c={c} />}

      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: c.nav, borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", padding: "0 20px", height: 50, gap: 3, backdropFilter: "blur(12px)" }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: c.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0, marginRight: 8 }}>SL</div>
        {TABS.map(tab => (
          <button key={tab} onClick={() => go(tab)} style={{ background: active === tab ? c.tabActive : "transparent", border: active === tab ? `1px solid ${c.border}` : "1px solid transparent", borderRadius: 6, padding: "4px 11px", fontSize: 12, color: active === tab ? c.text : c.muted, fontWeight: active === tab ? 700 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>{tab}</button>
        ))}
        <button onClick={() => setIsDark(d => !d)} style={{ marginLeft: "auto", background: c.card, border: `1px solid ${c.border}`, borderRadius: 8, width: 36, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>
          {isDark ? "☀" : "☽"}
        </button>
      </nav>

      <section ref={el => refs.current.home = el} style={sec({ padding: "60px 0 48px" })}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <p style={{ fontSize: 11, color: c.accent, fontWeight: 700, marginBottom: 16, letterSpacing: 1.5 }}>CORNELL CS '26 · DATABRICKS SWE</p>
          <h1 style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, margin: 0, whiteSpace: "nowrap" }}>
            {displayed}
            <span style={{ display: "inline-block", width: 3, height: "0.85em", background: done ? (blink ? c.text : "transparent") : c.text, marginLeft: 4, verticalAlign: "middle", borderRadius: 1 }} />
          </h1>
        </div>
      </section>

      <section ref={el => refs.current.about = el} style={sec({ background: c.sectionAlt })}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>about me</h2>
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 28, alignItems: "start", marginBottom: 24 }}>
            <div style={{ height: 190, background: c.photoBox, border: `1px solid ${c.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: c.muted, fontSize: 12 }}>[ photo ]</div>
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Solomon Lee</h3>
              <p style={{ color: c.accent, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>Software Engineer · Cornell CS '26</p>
              <p style={{ color: c.muted, lineHeight: 1.8, fontSize: 13, marginBottom: 10 }}>I'm a Computer Science student at Cornell University graduating in May 2026, and I love building systems that work at scale. Over the past three years I've interned at Google, Roblox (twice), and Amazon Robotics — shipping systems that process hundreds of millions of users, save over $1.3M annually through ML-driven optimization, and build ML recommendation tools running on Google Cloud.</p>
              <p style={{ color: c.muted, lineHeight: 1.8, fontSize: 13, marginBottom: 10 }}>I work mainly in Go, Python, and Java across Kubernetes, AWS, and GCP, with hands-on experience in ML systems including LLM fine-tuning, multi-modal pipelines, and model evaluation frameworks. What excites me most is the space where infrastructure meets intelligence: designing systems where ML doesn't just live in theory but runs reliably in production.</p>
              <p style={{ color: c.muted, lineHeight: 1.8, fontSize: 13 }}>Outside of work I'm usually playing sports with friends, working out, snowboarding, or spending time with my girlfriend!</p>
            </div>
          </div>

          <div
            onClick={() => setShowCornell(true)}
            style={{ ...cardStyle, padding: 16, display: "flex", alignItems: "center", gap: 14, cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = c.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = c.border}
          >
            <img src="/cornell.png" alt="Cornell" style={{ width: 38, height: 38, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Cornell University · B.S. Computer Science</div>
              <div style={{ color: c.muted, fontSize: 12 }}>Expected May 2026 · College of Engineering</div>
            </div>
            <span style={{ color: c.accent, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>View details ↗</span>
          </div>
        </div>
      </section>

      <section ref={el => refs.current.experience = el} style={sec()}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>experience</h2>
          <p style={{ color: c.muted, fontSize: 12, marginBottom: 24 }}>Click any card to see full details</p>
          <div style={{ position: "relative", paddingLeft: 26 }}>
            <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 2, background: c.accent, borderRadius: 2 }} />
            {JOBS.map(job => (
              <div key={job.id} style={{ position: "relative", marginBottom: 10 }}>
                <div style={{ position: "absolute", left: -22, top: 16, width: 12, height: 12, borderRadius: "50%", background: c.accent, border: `2px solid ${c.accentSub}`, zIndex: 1 }} />
                <div style={{ ...cardStyle, borderLeft: `3px solid ${c.accent}`, cursor: "pointer" }} onClick={() => setModal({ item: job, type: "experience" })}>
                  <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{job.company}</div>
                      <div style={{ color: c.accent, fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{job.role}</div>
                      <div style={{ color: c.muted, fontSize: 11 }}>{job.date}</div>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                      {job.tags.map(t => <span key={t} style={chip(true)}>{t}</span>)}
                      <span style={{ color: c.accent, fontSize: 11, marginLeft: 4, fontWeight: 600 }}>↗</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={el => refs.current.projects = el} style={sec({ background: c.sectionAlt })}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>projects</h2>
          <p style={{ color: c.muted, fontSize: 12, marginBottom: 24 }}>Click any card to see full details</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PROJECTS.map(p => (
              <div key={p.id} style={{ ...cardStyle, cursor: "pointer" }} onClick={() => setModal({ item: p, type: "project" })}>
                <div style={{ display: "grid", gridTemplateColumns: "130px 1fr" }}>
                  <div style={{ background: isDark ? "#111" : "#E0E0E0", display: "flex", alignItems: "center", justifyContent: "center", color: c.muted, fontSize: 11, minHeight: 115 }}>▶ demo</div>
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ marginBottom: 8 }}><span style={{ background: c.accentBadgeBg, border: `1px solid ${c.accentBadgeBorder}`, color: c.accent, fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>{p.company}</span></div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
                    <p style={{ color: c.accentSub, fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{p.metric}</p>
                    <p style={{ color: c.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>{p.desc.slice(0, 130)}...</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>{p.tags.slice(0, 4).map(t => <span key={t} style={chip(true)}>{t}</span>)}</div>
                      <span style={{ color: c.accent, fontSize: 11, fontWeight: 600 }}>View details ↗</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={el => refs.current.contact = el} style={{ padding: "40px 0" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 14 }}>get in touch</h2>
          <p style={{ color: c.muted, fontSize: 13, lineHeight: 1.75, marginBottom: 24 }}>Currently open to full-time SWE roles in infrastructure, ML platforms, and distributed systems. Best way to reach me is email — I respond quickly.</p>
          <a href="mailto:ssl242@cornell.edu" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "13px 0", background: c.accent, borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", marginBottom: 10, boxSizing: "border-box" }}>✉ ssl242@cornell.edu</a>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 28 }}>
            {["GitHub ↗", "LinkedIn ↗", "Resume PDF ↗"].map(l => (
              <a key={l} href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0", background: c.card, border: `1px solid ${c.border}`, borderRadius: 8, color: c.text, fontWeight: 500, fontSize: 12, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Solomon S. Lee</div>
            <div style={{ color: c.muted, fontSize: 12 }}>Cornell University CS '26 · Databricks SWE</div>
          </div>
        </div>
      </section>
    </div>
  );
}
