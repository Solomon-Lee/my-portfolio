"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const DARK = {
  bg: "#000000",
  sectionAlt: "#050505",
  card: "#1A1A1A",
  border: "#2E2E2E",
  text: "#FFFFFF",
  muted: "#A0A0A0",
  nav: "rgba(0,0,0,0.94)",
  tabActive: "#262626",
  chipDark: "#2A2A2A",
  photoBox: "#1A1A1A",
  modalBg: "#111111",
  accent: "#0D9488",
  accentSub: "#5EEAD4",
  accentBadgeBg: "#0D3A30",
  accentBadgeBorder: "#0D9488",
};
const LIGHT = {
  bg: "#FFFFFF",
  sectionAlt: "#F7F7F7",
  card: "#F2F2F2",
  border: "#E0E0E0",
  text: "#0A0A0A",
  muted: "#555555",
  nav: "rgba(255,255,255,0.94)",
  tabActive: "#E8E8E8",
  chipDark: "#E0E0E0",
  photoBox: "#E8E8E8",
  modalBg: "#FFFFFF",
  accent: "#0F766E",
  accentSub: "#134E4A",
  accentBadgeBg: "#CCFBF1",
  accentBadgeBorder: "#0F766E",
};

const TABS = ["home", "about", "experience", "projects", "contact"];
const FULL_TEXT = "hello world, it's Solomon!";
const TYPE_SPEED = 65;

const LIFE_PHOTOS = [
  { src: "/life/C514993E-744B-4A34-AB3E-7E8F077402AA_1_105_c.jpeg", caption: "Beer Hall!", location: "Munich, Germany", date: "April 2026" },
  { src: "/life/90E01CF2-8DC3-4B4A-A5B4-A74069B9D35F.jpeg", caption: "Cracking a Red Bull at the Peak!", location: "Stubai, Austria", date: "April 2026" },
  { src: "/life/F73D66E0-6DCE-4027-A777-5B17506280E0_1_105_c.jpeg", caption: "Vibe", location: "Bratislava, Slovakia", date: "April 2026" },
  { src: "/life/E7670BB4-40BC-4B84-AB4F-AC6341EADE92.jpeg", caption: "Porsche Cayman Track Day!", location: "Spielberg, Austria", date: "April 2026" },
  { src: "/life/2BEA5C7C-48EF-4CFB-893E-7C73E79931A8_1_105_c.jpeg", caption: "Happy Valentine's Day!", location: "Ithaca, New York", date: "February 2026" },
  { src: "/life/98FDE46B-A6C5-46B8-8CE6-7279E183B8B6_1_105_c.jpeg", caption: "Perfect Conditions :(", location: "Ithaca, New York", date: "March 2026" },
  { src: "/life/1D2108C3-270B-47A6-9D25-3B3FA9F82D77_1_105_c.jpeg", caption: "Happy Anniversary Nat!", location: "Boston, Massachusetts", date: "January 2026" },
  { src: "/life/5806356D-AC0D-4784-93EF-E08348686511_1_105_c.jpeg", caption: "Wish I could bring this to the US :(", location: "Chongqing, China", date: "January 2026" },
  { src: "/life/68BDCE2A-B219-462C-9455-03A230CC32EB_1_105_c.jpeg", caption: "Dressing up in the Forbidden City!", location: "Beijing, China", date: "January 2026" },
  { src: "/life/54BF910D-6140-4487-89F6-63849F4144FD_1_105_c.jpeg", caption: "Summer Palace Vibes!", location: "Beijing, China", date: "January 2026" },
  { src: "/life/406A303F-456A-42C9-8A83-C005C4807EDC_1_105_c.jpeg", caption: "Hitting Slopes with the Sis!", location: "Niseko, Hokkaido", date: "December 2025" },
  { src: "/life/B5CA8A6E-E9EA-44ED-8FFF-F3DD5ABBAA2B_1_105_c.jpeg", caption: "Xiao Mi!!!!", location: "Home", date: "December 2025" },
  { src: "/life/F534A612-74B4-4350-A6FC-AB76FC44F356_1_105_c.jpeg", caption: "Date Night!", location: "NYC, New York", date: "November 2025" },
  { src: "/life/BB98841E-BF24-4691-873B-735313DACC74_1_105_c.jpeg", caption: "Pot O' Jar and a Bee!", location: "Boston, Massachusetts", date: "October 2025" },
  { src: "/life/3AC76553-BC1D-43BB-8A3D-B0EA170F5F89_1_105_c.jpeg", caption: "Chilling :)", location: "Home", date: "July 2025" },
  { src: "/life/F9A500D7-B822-4438-8D40-CD92CF2C9A03_4_5005_c.jpeg", caption: "Powder Day!", location: "Ithaca, New York", date: "January 2026" },
  { src: "/life/1E2B2890-CF99-49AD-BA83-7CF8D214A70B_1_105_c.jpeg", caption: "So Smug!", location: "Home", date: "January 2026" },
  { src: "/life/04110F93-1F9C-4525-9E18-1363A068DDA9_1_105_c.jpeg", caption: "Favorite Boba!", location: "Beijing, China", date: "January 2026" },
  { src: "/life/84DB8FD0-A218-4527-B9D6-616279159226_1_105_c.jpeg", caption: "Childhood favorite meal", location: "Guangzhou, China", date: "January 2026" },
  { src: "/life/DBAFEDFB-EA92-49B4-A3BF-5083787CDCE9_1_105_c.jpeg", caption: "I Love Food!!", location: "Beijing, China", date: "January 2026" },
  { src: "/life/FDAC0CF4-42A1-4F7E-8B69-1E0EDE87894B_1_105_c.jpeg", caption: "Teine Slopes!", location: "Sapporo, Hokkaido", date: "December 2025" },
  { src: "/life/46E8708F-50BB-4898-A67B-66037866622D_1_105_c.jpeg", caption: "Hot day out!", location: "Boston, Massachusetts", date: "August 2025" },
  { src: "/life/5562B6F3-BAEE-446D-9930-47916D118B62_1_105_c.jpeg", caption: "Yeah, I'm a big back :)", location: "Vallejo, California", date: "May 2025" },
  { src: "/life/77E7F8BF-7FC7-40D9-BFE7-CBB3F35790E8_1_105_c.jpeg", caption: "Chinatown!", location: "San Francisco, California", date: "May 2025" },
  { src: "/life/54CA81D4-CE55-4BD6-929A-EB3C7C91C8B6_1_105_c.jpeg", caption: "Posing!", location: "South San Francisco, California", date: "May 2025" },
  { src: "/life/61DA6CE7-DCA9-40F7-A117-BC49B8D11939_1_105_c.jpeg", caption: "IYKYK", location: "Ithaca, New York", date: "April 2025" },
  { src: "/life/72CCB459-6217-4666-8536-4FAC08D8470C_1_105_c.jpeg", caption: "Heart!", location: "Boston, Massachusetts", date: "April 2025" },
  { src: "/life/FF98255A-AE84-4CDF-8E79-4267B1967950_1_105_c.jpeg", caption: "Catching fishies", location: "Tokyo, Japan", date: "January 2025" },
  { src: "/life/1EC0725F-74AB-49FE-80B2-131A44BD89C8_1_105_c.jpeg", caption: "Me vs. Touchdown", location: "Ithaca, New York", date: "May 2025" },
  { src: "/life/D9E976A8-1A9C-4241-98B0-9349D7EBDF05_1_105_c.jpeg", caption: "Gorgeous Architecture...", location: "Munich, Germany", date: "April 2026" },
  { src: "/life/EF4D82E1-AC9B-436B-8280-5B904BE2356B_1_105_c.jpeg", caption: "What a view!", location: "Innsbruck, Austria", date: "April 2026" },
  { src: "/life/85D78345-2BBF-4428-854A-463696921FEF_1_105_c.jpeg", caption: "Quick trip to Italy!", location: "Vipiteno, Italy", date: "April 2026" },
  { src: "/life/D9EF80BF-356F-464B-B42D-5FB147D72F15_1_105_c.jpeg", caption: "The views of Schonbrunn Palace", location: "Vienna, Austria", date: "April 2026" },
  { src: "/life/2A6D3263-736A-4200-99BD-BCBD955BF065_1_105_c.jpeg", caption: "We'll remember you Stand25...", location: "Budapest, Hungary", date: "March 2026" },
  { src: "/life/7C4D671B-2FCA-44CD-8AFD-087012EE0519_1_105_c.jpeg", caption: "Cybercity Vibes!", location: "Shanghai, China", date: "January 2026" },
  { src: "/life/16C00347-D356-448B-92FD-CB8C902255AB_1_105_c.jpeg", caption: "Minutes before my Back is reinjured", location: "Ithaca, New York", date: "February 2026" },
];

const CORNELL = {
  gpa: "3.7",
  courses: [
    "Machine Learning",
    "Deep Learning",
    "Reinforcement Learning",
    "Operating Systems",
    "Probability and Statistics",
    "Computational Genomics",
    "Analysis of Algorithms",
    "Networking Systems",
  ],
  research: [
    { title: "Data Analytics Lab", date: "SP25 - SP26" },
    { title: "Computer Systems Lab", date: "FA22 - FA24" },
  ],
  ta: [
    { course: "CS4782 (Deep Learning)", date: "SP26" },
    { course: "CS4780 (Machine Learning)", date: "SP24 - FA25" },
    { course: "CS1112 (Python)", date: "FA22 - SP23" },
  ],
};

const JOBS = [
  {
    id: 0,
    company: "Databricks",
    role: "Software Engineer — Engine",
    date: "Aug 2026 – Present",
    tags: ["TBD"],
    desc: "Incoming Software Engineer at Databricks in Palo Alto, CA.",
  },
  {
    id: 1,
    company: "Google",
    role: "Software Engineer Intern — Google Core (Airlock)",
    date: "Aug – Nov 2025",
    tags: ["Java", "GCP", "Vertex AI", "Spring", "MCP", "Dataflow"],
    desc: "Built an AI-powered package recommendation engine using Google Dataflow to ingest millions of package metadata records into Google Cloud Storage, integrated with Vertex AI Search to build searchable indexes. Developed a Model Context Protocol (MCP) tool that interfaces with the Vertex AI Search endpoint, enabling natural language queries in Gemini CLI for intelligent package management workflows. Developed and deployed a Java Spring AI MCP server on Google Cloud Run with a recommendation system accounting for relevance, popularity, ecosystem integration, and licensing, supporting key user journeys including package updates and vulnerability management.",
  },
  {
    id: 2,
    company: "Roblox",
    role: "Software Engineer Intern — Foundation AI (ML Platform)",
    date: "May – Aug 2025",
    tags: ["Go", "Kubernetes", "GCP", "Prometheus", "Grafana"],
    desc: "Built two systems in Go that transformed how Roblox's ML platform handles GPU resource allocation. The ML Kubernetes Descheduler automatically detects idle RayJobs and Kubeflow pipelines and terminates them using bin-packing algorithms. Also built a real-time cost dashboard with Prometheus and Grafana, replacing a slow Superset setup.",
  },
  {
    id: 3,
    company: "Amazon Robotics",
    role: "Software Engineer Co-op — Amazon Robotics (Hardware Services)",
    date: "Aug – Dec 2024",
    tags: ["Python", "AWS", "S3", "Git", "SSH"],
    desc: "Developed the RISE Job Template Uploader Tool, a Python application with a user-friendly UI enabling simplified management and synchronization of job templates across environments (Prod → Gamma → Beta → Dev). Created version control for RISE job templates by integrating Git with AWS S3, enhancing collaboration, tracking, and template consistency while reducing the learning curve for new users. Developed a Python script to automate extraction of log files from drive units using SSH/SCP protocols and uploaded them to AWS S3, enhancing log retrieval efficiency by 60%.",
  },
  {
    id: 4,
    company: "Roblox",
    role: "Software Engineer Intern — Economy (Avatar Core Services)",
    date: "May – Aug 2024",
    tags: ["Python", "Spark", "PySpark", "SQS", "Hive"],
    desc: "Developed an end-to-end rollback and data metric gathering tool handling operations that modified user data and deserialized user metadata to gather metrics. Helped resolve large-scale on-call data corruption issues impacting millions of users. Increased engineering efficiency by 700% using Python workers and threads to enhance message throughput. Utilized Spark, Hive, PySpark Notebooks, and SQS to build tables, optimize message pipelines, and develop low-latency processors.",
  },
];

const PROJECTS = [
  {
    id: 0,
    name: "ML Kubernetes Descheduler & Cost Panel",
    company: "Roblox — ML Platform",
    metric: "$1.3M saved/yr · 25% GPU efficiency ↑",
    desc: "Roblox's ML platform runs thousands of GPU-intensive training jobs on Kubernetes. I built an ML Kubernetes Descheduler that automatically detects idle jobs and terminates them using bin-packing algorithms, plus a real-time cost dashboard with Go, Prometheus, and Grafana.",
    tags: [
      "Go",
      "Kubernetes",
      "GCP",
      "RayJobs",
      "Kubeflow",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    id: 1,
    name: "AI Package Recommendation Engine",
    company: "Google — Airlock Team",
    metric: "Shipped in Gemini Code Assist · Gemini CLI",
    desc: "Engineers building Java apps at Google need to find the right internal packages, but LLM coding assistants would hallucinate package names or recommend public packages not approved for internal use. I built an AI-powered recommendation engine and MCP service that acts as a tool layer between the LLM and Airlock's package registry.",
    tags: ["Java", "GCP", "Vertex AI", "Spring", "Cloud Run", "MCP"],
  },
  {
    id: 2,
    name: "LLM Persona Belief Influence Research",
    company: "Cornell University — Undergrad Research",
    metric: "+55pp pro · −35pp con gap · OOD generalization",
    desc: "I designed and built a persona-based evaluation framework to measure whether LLM belief adoption generalizes out-of-distribution. Key finding: pro personas achieve ~+55pp discrimination gap, con personas reverse to ~−35pp, holding at 4–6 hops from the root thesis.",
    tags: ["Python", "OpenAI API", "NLP", "LLM Evaluation", "AI Safety"],
  },
];

function useTypewriter(text, speed) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const tick = () => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) setTimeout(tick, speed);
      else setDone(true);
    };
    const t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [text, speed]);
  return { displayed, done };
}

function ContactForm({ c }) {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const data = new FormData(e.target);
    const res = await fetch("https://formspree.io/f/mqegzgee", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    setStatus(res.ok ? "sent" : "error");
    if (res.ok) e.target.reset();
  };

  if (status === "sent")
    return (
      <div
        style={{
          background: c.card,
          border: `1px solid ${c.accent}`,
          borderRadius: 8,
          padding: "20px 16px",
          textAlign: "center",
          marginBottom: 24,
        }}
      >
        <p
          style={{
            color: c.accent,
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          Message sent!
        </p>
        <p style={{ color: c.muted, fontSize: 13 }}>
          Thanks for reaching out! I'll get back to you ASAP.
        </p>
      </div>
    );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: c.muted,
            marginBottom: 6,
          }}
        >
          Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          style={{
            width: "100%",
            padding: "10px 14px",
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            color: c.text,
            fontSize: 13,
            fontFamily: "inherit",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: c.muted,
            marginBottom: 6,
          }}
        >
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          style={{
            width: "100%",
            padding: "10px 14px",
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            color: c.text,
            fontSize: 13,
            fontFamily: "inherit",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: c.muted,
            marginBottom: 6,
          }}
        >
          Subject
        </label>
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          required
          style={{
            width: "100%",
            padding: "10px 14px",
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            color: c.text,
            fontSize: 13,
            fontFamily: "inherit",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: c.muted,
            marginBottom: 6,
          }}
        >
          Message
        </label>
        <textarea
          name="message"
          placeholder="Your message"
          required
          rows={6}
          style={{
            width: "100%",
            padding: "10px 14px",
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            color: c.text,
            fontSize: 13,
            fontFamily: "inherit",
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
          }}
        />
      </div>
      {status === "error" && (
        <p style={{ color: "#EF4444", fontSize: 12, marginBottom: 12 }}>
          Something went wrong. Please try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          width: "100%",
          padding: "13px 0",
          background: c.accent,
          border: "none",
          borderRadius: 8,
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "inherit",
          marginBottom: 24,
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

function SectionLabel({ children, accent }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: accent,
        letterSpacing: 1.2,
        marginBottom: 10,
        marginTop: 20,
        textTransform: "uppercase",
      }}
    >
      {children}
    </p>
  );
}

function CornellModal({ onClose, c }) {
  const ref = useRef();
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 660,
          background: c.modalBg,
          border: `1px solid ${c.border}`,
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "24px 24px 0", flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: 6,
              color: c.muted,
              width: 30,
              height: 30,
              cursor: "pointer",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
            }}
          >
            ✕
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 6,
            }}
          >
            <Image
              src="/cornell.png"
              alt="Cornell"
              width={42}
              height={42}
              style={{ borderRadius: 8, objectFit: "cover" }}
            />
            <div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: c.text,
                  margin: 0,
                }}
              >
                Cornell University
              </h2>
              <p style={{ fontSize: 13, color: c.muted, margin: 0 }}>
                B.S. Computer Science · College of Engineering
              </p>
            </div>
          </div>
          <p
            style={{
              fontSize: 12,
              color: c.accent,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            May 2026
          </p>
        </div>

        <div style={{ padding: "0 24px 24px", overflowY: "auto", flex: 1 }}>
          <SectionLabel accent={c.accent}>GPA</SectionLabel>
          <div
            style={{
              background: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 13, color: c.muted }}>Cumulative GPA</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: c.text }}>
              {CORNELL.gpa}
            </span>
          </div>

          <SectionLabel accent={c.accent}>Relevant Coursework</SectionLabel>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            {CORNELL.courses.map((course, i) => (
              <div
                key={i}
                style={{
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 13,
                  color: c.muted,
                }}
              >
                {course}
              </div>
            ))}
          </div>

          <SectionLabel accent={c.accent}>Research</SectionLabel>
          {CORNELL.research.map((r, i) => (
            <div
              key={i}
              style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                padding: "14px 16px",
                marginBottom: 8,
                borderLeft: `3px solid ${c.accent}`,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: c.text,
                  marginBottom: 3,
                }}
              >
                {r.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: c.accent,
                  fontWeight: 600,
                  marginBottom: 3,
                }}
              >
                {r.lab}
              </div>
              <div style={{ fontSize: 11, color: c.muted, marginBottom: 8 }}>
                {r.date}
              </div>
              <div style={{ fontSize: 12, color: c.muted, lineHeight: 1.65 }}>
                {r.desc}
              </div>
            </div>
          ))}

          <SectionLabel accent={c.accent}>Teaching Assistant</SectionLabel>
          {CORNELL.ta.map((t, i) => (
            <div
              key={i}
              style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                padding: "14px 16px",
                marginBottom: 8,
                borderLeft: `3px solid ${c.accentSub}`,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: c.text,
                  marginBottom: 3,
                }}
              >
                {t.course}
              </div>
              <div style={{ fontSize: 11, color: c.muted, marginBottom: 8 }}>
                {t.date}
              </div>
              <div style={{ fontSize: 12, color: c.muted, lineHeight: 1.65 }}>
                {t.desc}
              </div>
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
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  const isProject = type === "project";
  const chip = {
    background: c.chipDark,
    color: c.text,
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 4,
    display: "inline-block",
  };
  return (
    <div
      ref={ref}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 660,
          background: c.modalBg,
          border: `1px solid ${c.border}`,
          borderRadius: 12,
          overflow: "hidden",
          position: "relative",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "24px 24px 0", flexShrink: 0 }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: 6,
              color: c.muted,
              width: 30,
              height: 30,
              cursor: "pointer",
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "inherit",
            }}
          >
            ✕
          </button>
          <span
            style={{
              background: c.accentBadgeBg,
              border: `1px solid ${c.accentBadgeBorder}`,
              color: c.accent,
              fontSize: 10,
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 4,
              display: "inline-block",
              marginBottom: 12,
            }}
          >
            {isProject ? item.company : item.role}
          </span>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: c.text,
              marginBottom: 6,
              paddingRight: 40,
            }}
          >
            {isProject ? item.name : item.company}
          </h2>
          <p
            style={{
              color: c.accentSub,
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            {isProject ? item.metric : item.date}
          </p>
        </div>
        <div style={{ padding: "0 24px 24px", overflowY: "auto", flex: 1 }}>
          <p
            style={{
              color: c.muted,
              fontSize: 14,
              lineHeight: 1.85,
              marginBottom: 24,
            }}
          >
            {item.desc}
          </p>
          {isProject && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                {["[ photo ]", "[ photo ]", "[ photo ]"].map((l, i) => (
                  <div
                    key={i}
                    style={{
                      height: 90,
                      background: c.photoBox,
                      border: `1px solid ${c.border}`,
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: c.muted,
                      fontSize: 11,
                    }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div
                style={{
                  height: 140,
                  background: c.photoBox,
                  border: `1px solid ${c.border}`,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: c.muted,
                  fontSize: 12,
                  marginBottom: 20,
                }}
              >
                ▶ [ video / demo ]
              </div>
            </>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {item.tags.map((t) => (
              <span key={t} style={chip}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlipCard({ photo, index, cardStyle, c, isDark }) {
  const [loaded, setLoaded] = useState(false);
  const minH = 160 + (index % 3) * 60;

  return (
    <div style={{ perspective: 800 }}>
      <div
        style={{
          transition: "transform 0.6s ease",
          transformStyle: "preserve-3d",
          transform: loaded ? "rotateY(0deg)" : "rotateY(180deg)",
        }}
      >
        {/* Front — the actual photo card */}
        <div
          style={{
            ...cardStyle,
            cursor: "default",
            backfaceVisibility: "hidden",
            transition: "border-color 0.15s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = c.accent;
            e.currentTarget.style.boxShadow = `0 0 15px ${c.accent}44, 0 0 30px ${c.accent}22`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = c.border;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            style={{
              background: isDark ? "#111" : "#E0E0E0",
              minHeight: minH,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.caption || ""}
              fill
              style={{ objectFit: "cover" }}
              onLoad={() => setTimeout(() => setLoaded(true), index * 80)}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                setLoaded(true);
              }}
            />
          </div>
          {(photo.caption || photo.location || photo.date) && (
            <div style={{ padding: "8px 12px", fontSize: 12, color: c.muted }}>
              {photo.caption && <div>{photo.caption}</div>}
              {(photo.location || photo.date) && (
                <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                  {photo.location && (
                    <span style={{ background: c.chipDark, borderRadius: 12, padding: "2px 8px", fontSize: 10, color: c.muted }}>
                      {photo.location}
                    </span>
                  )}
                  {photo.date && (
                    <span style={{ background: c.chipDark, borderRadius: 12, padding: "2px 8px", fontSize: 10, color: c.muted }}>
                      {photo.date}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back — blank card */}
        <div
          style={{
            ...cardStyle,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: isDark
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
              : "linear-gradient(135deg, #e8e8e8 0%, #d0d0d0 50%, #b8b8b8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "40%",
              border: `2px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
            }}
          >
            SL
          </div>
        </div>
      </div>
    </div>
  );
}

function Starfield({ isDark }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isDark) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let stars = [];
    let shootingStars = [];
    let lastShootTime = 0;
    let rocket = null;
    let rocketDismissed = false;
    let mouseX = -1;
    let mouseY = -1;
    let mouseInSection = false;

    function onMouseMove(e) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseInSection = true;
    }
    function onMouseLeave() {
      mouseInSection = false;
      rocketDismissed = false;
    }
    // Listen on the section (parent) so clicks on content aren't blocked
    const section = containerRef.current?.parentElement;
    if (section) {
      section.addEventListener("mousemove", onMouseMove);
      section.addEventListener("mouseleave", onMouseLeave);
    }

    function resize() {
      const container = containerRef.current;
      if (!container) return;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 0.5 + Math.random() * 1.5,
          baseAlpha: 0.3 + Math.random() * 0.7,
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.7,
          hue: 200 + Math.random() * 40,
        });
      }
    }

    function spawnShootingStar(now) {
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.3,
        len: 60 + Math.random() * 80,
        speed: 6 + Math.random() * 6,
        angle: Math.PI / 6 + Math.random() * 0.3,
        life: 0,
        maxLife: 40 + Math.random() * 30,
      });
      lastShootTime = now;
    }

    resize();
    initStars();

    const ro = new ResizeObserver(() => {
      resize();
      initStars();
    });
    if (containerRef.current) ro.observe(containerRef.current);

    function drawSaturn(t) {
      const cx = canvas.width * 0.82;
      const cy = canvas.height * 0.55;
      const planetR = Math.min(canvas.width, canvas.height) * 0.1;
      const tilt = -0.35;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(tilt);

      // Outer glow
      const glow = ctx.createRadialGradient(
        0,
        0,
        planetR * 0.8,
        0,
        0,
        planetR * 2.5,
      );
      glow.addColorStop(0, "rgba(210, 180, 120, 0.06)");
      glow.addColorStop(1, "rgba(210, 180, 120, 0)");
      ctx.beginPath();
      ctx.arc(0, 0, planetR * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Ring behind planet (bottom half of ellipse)
      ctx.beginPath();
      ctx.ellipse(0, 0, planetR * 2.2, planetR * 0.45, 0, 0, Math.PI);
      ctx.strokeStyle = "rgba(190, 170, 130, 0.18)";
      ctx.lineWidth = planetR * 0.18;
      ctx.stroke();
      // Second ring
      ctx.beginPath();
      ctx.ellipse(0, 0, planetR * 1.7, planetR * 0.35, 0, 0, Math.PI);
      ctx.strokeStyle = "rgba(200, 180, 140, 0.12)";
      ctx.lineWidth = planetR * 0.1;
      ctx.stroke();

      // Planet body
      const bodyGrad = ctx.createRadialGradient(
        -planetR * 0.3,
        -planetR * 0.2,
        planetR * 0.1,
        0,
        0,
        planetR,
      );
      bodyGrad.addColorStop(0, "rgba(225, 200, 150, 0.35)");
      bodyGrad.addColorStop(0.5, "rgba(190, 160, 110, 0.28)");
      bodyGrad.addColorStop(1, "rgba(140, 110, 70, 0.2)");
      ctx.beginPath();
      ctx.arc(0, 0, planetR, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Subtle banding on planet
      const bandAlpha = 0.06 + Math.sin(t * 0.2) * 0.02;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.ellipse(
          0,
          i * planetR * 0.2,
          planetR * 0.95,
          planetR * 0.06,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(255, 240, 200, ${bandAlpha})`;
        ctx.fill();
      }

      // Ring in front of planet (top half of ellipse)
      ctx.beginPath();
      ctx.ellipse(0, 0, planetR * 2.2, planetR * 0.45, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = "rgba(190, 170, 130, 0.18)";
      ctx.lineWidth = planetR * 0.18;
      ctx.stroke();
      // Second ring front
      ctx.beginPath();
      ctx.ellipse(0, 0, planetR * 1.7, planetR * 0.35, 0, Math.PI, Math.PI * 2);
      ctx.strokeStyle = "rgba(200, 180, 140, 0.12)";
      ctx.lineWidth = planetR * 0.1;
      ctx.stroke();

      ctx.restore();
    }

    function drawNeptune(t) {
      const cx = canvas.width * 0.15;
      const cy = canvas.height * 0.72;
      const planetR = Math.min(canvas.width, canvas.height) * 0.07;

      ctx.save();
      ctx.translate(cx, cy);

      // Outer glow
      const glow = ctx.createRadialGradient(
        0,
        0,
        planetR * 0.8,
        0,
        0,
        planetR * 2.2,
      );
      glow.addColorStop(0, "rgba(60, 100, 220, 0.07)");
      glow.addColorStop(1, "rgba(60, 100, 220, 0)");
      ctx.beginPath();
      ctx.arc(0, 0, planetR * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Planet body
      const bodyGrad = ctx.createRadialGradient(
        -planetR * 0.3,
        -planetR * 0.25,
        planetR * 0.05,
        0,
        0,
        planetR,
      );
      bodyGrad.addColorStop(0, "rgba(100, 140, 255, 0.4)");
      bodyGrad.addColorStop(0.4, "rgba(60, 100, 220, 0.32)");
      bodyGrad.addColorStop(0.75, "rgba(30, 60, 180, 0.25)");
      bodyGrad.addColorStop(1, "rgba(15, 30, 120, 0.18)");
      ctx.beginPath();
      ctx.arc(0, 0, planetR, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Atmospheric banding
      const bandAlpha = 0.05 + Math.sin(t * 0.15) * 0.02;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(
          0,
          i * planetR * 0.25,
          planetR * 0.9,
          planetR * 0.05,
          0,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = `rgba(120, 170, 255, ${bandAlpha})`;
        ctx.fill();
      }

      // Great Dark Spot hint
      const spotAlpha = 0.08 + Math.sin(t * 0.3) * 0.02;
      ctx.beginPath();
      ctx.ellipse(
        planetR * 0.25,
        planetR * 0.1,
        planetR * 0.2,
        planetR * 0.12,
        0.3,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = `rgba(20, 40, 100, ${spotAlpha})`;
      ctx.fill();

      ctx.restore();
    }

    function draw(time) {
      const t = time / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw planets behind stars
      drawSaturn(t);
      drawNeptune(t);

      for (const s of stars) {
        const twinkle = Math.sin(t * s.speed + s.phase) * 0.3 + 0.7;
        const alpha = s.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 60%, 88%, ${alpha})`;
        ctx.fill();
      }

      // Rocket ship — spawns on mouse enter, chases cursor
      if (!rocket && mouseInSection && !rocketDismissed) {
        const edge = Math.floor(Math.random() * 4);
        let sx, sy;
        if (edge === 0) { sx = -30; sy = Math.random() * canvas.height; }
        else if (edge === 1) { sx = canvas.width + 30; sy = Math.random() * canvas.height; }
        else if (edge === 2) { sx = Math.random() * canvas.width; sy = -30; }
        else { sx = Math.random() * canvas.width; sy = canvas.height + 30; }
        rocket = {
          x: sx,
          y: sy,
          vx: 0,
          vy: 0,
          angle: 0,
          size: 10,
          flicker: 0,
          life: 0,
        };
      }

      if (rocket) {
        rocket.flicker++;
        rocket.life++;
        const targetX = mouseInSection ? mouseX : rocket.x + Math.cos(rocket.angle) * 100;
        const targetY = mouseInSection ? mouseY : rocket.y + Math.sin(rocket.angle) * 100;
        const dx = targetX - rocket.x;
        const dy = targetY - rocket.y;
        const targetAngle = Math.atan2(dy, dx);

        // Smoothly steer toward cursor
        let angleDiff = targetAngle - rocket.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        rocket.angle += angleDiff * 0.06;

        const accel = 0.12;
        rocket.vx += Math.cos(rocket.angle) * accel;
        rocket.vy += Math.sin(rocket.angle) * accel;

        // Limit speed
        const spd = Math.sqrt(rocket.vx * rocket.vx + rocket.vy * rocket.vy);
        const maxSpd = 3.5;
        if (spd > maxSpd) {
          rocket.vx = (rocket.vx / spd) * maxSpd;
          rocket.vy = (rocket.vy / spd) * maxSpd;
        }

        rocket.x += rocket.vx;
        rocket.y += rocket.vy;

        const rx = rocket.x;
        const ry = rocket.y;
        const sz = rocket.size;

        ctx.save();
        ctx.translate(rx, ry);
        ctx.rotate(rocket.angle);

        // Exhaust flame
        const flameLen = sz * (1.5 + Math.sin(rocket.flicker * 0.5) * 0.5);
        const flameGrad = ctx.createLinearGradient(
          -sz * 0.3, 0, -sz * 0.3 - flameLen, 0,
        );
        flameGrad.addColorStop(0, "rgba(255, 200, 50, 0.6)");
        flameGrad.addColorStop(0.4, "rgba(255, 100, 20, 0.4)");
        flameGrad.addColorStop(1, "rgba(255, 50, 10, 0)");
        ctx.beginPath();
        ctx.moveTo(-sz * 0.3, -sz * 0.2);
        ctx.lineTo(-sz * 0.3 - flameLen, 0);
        ctx.lineTo(-sz * 0.3, sz * 0.2);
        ctx.closePath();
        ctx.fillStyle = flameGrad;
        ctx.fill();

        // Body
        ctx.beginPath();
        ctx.moveTo(sz, 0);
        ctx.quadraticCurveTo(sz * 0.7, -sz * 0.35, -sz * 0.3, -sz * 0.3);
        ctx.lineTo(-sz * 0.3, sz * 0.3);
        ctx.quadraticCurveTo(sz * 0.7, sz * 0.35, sz, 0);
        ctx.closePath();
        ctx.fillStyle = "rgba(220, 220, 230, 0.7)";
        ctx.fill();

        // Nose cone
        ctx.beginPath();
        ctx.moveTo(sz, 0);
        ctx.quadraticCurveTo(sz * 0.85, -sz * 0.15, sz * 0.6, -sz * 0.25);
        ctx.quadraticCurveTo(sz * 0.85, -sz * 0.05, sz, 0);
        ctx.fillStyle = "rgba(255, 80, 60, 0.6)";
        ctx.fill();

        // Window
        ctx.beginPath();
        ctx.arc(sz * 0.35, 0, sz * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(150, 200, 255, 0.7)";
        ctx.fill();

        // Fins
        ctx.beginPath();
        ctx.moveTo(-sz * 0.2, -sz * 0.3);
        ctx.lineTo(-sz * 0.45, -sz * 0.55);
        ctx.lineTo(-sz * 0.35, -sz * 0.3);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 80, 60, 0.5)";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-sz * 0.2, sz * 0.3);
        ctx.lineTo(-sz * 0.45, sz * 0.55);
        ctx.lineTo(-sz * 0.35, sz * 0.3);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 80, 60, 0.5)";
        ctx.fill();

        ctx.restore();

        // Despawn once off-screen after mouse leaves
        const margin = 200;
        if (
          !mouseInSection && rocket.life > 60 && (
            rx < -margin || rx > canvas.width + margin ||
            ry < -margin || ry > canvas.height + margin
          )
        ) {
          rocket = null;
          rocketDismissed = true;
        }
      }

      if (
        time - lastShootTime > 2500 + Math.random() * 3000 &&
        shootingStars.length < 2
      ) {
        spawnShootingStar(time);
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        const progress = ss.life / ss.maxLife;
        const alpha = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2;
        const headX = ss.x + Math.cos(ss.angle) * ss.speed * ss.life;
        const headY = ss.y + Math.sin(ss.angle) * ss.speed * ss.life;
        const tailX = headX - Math.cos(ss.angle) * ss.len;
        const tailY = headY - Math.sin(ss.angle) * ss.len;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(1, `rgba(255,255,255,${alpha * 0.8})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (ss.life >= ss.maxLife) shootingStars.splice(i, 1);
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (section) {
        section.removeEventListener("mousemove", onMouseMove);
        section.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState("home");
  const [modal, setModal] = useState(null);
  const [showCornell, setShowCornell] = useState(false);
  const [blink, setBlink] = useState(true);
  const [showLife, setShowLife] = useState(false);
  const refs = useRef({});
  const clicking = useRef(false);
  const { displayed, done } = useTypewriter(FULL_TEXT, TYPE_SPEED);
  const c = isDark ? DARK : LIGHT;

  const chip = (useDark) => ({
    background: useDark ? c.chipDark : c.accent,
    color: useDark ? c.text : "#fff",
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 4,
    display: "inline-block",
  });

  const cardStyle = {
    background: c.card,
    border: `1px solid ${c.border}`,
    borderRadius: 10,
    overflow: "hidden",
  };

  useEffect(() => {
    if (!done) return;
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, [done]);

  useEffect(() => {
    const obs = {};
    TABS.forEach((tab) => {
      const el = refs.current[tab];
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting && !clicking.current) setActive(tab);
        },
        { threshold: 0, rootMargin: "-35% 0px -60% 0px" },
      );
      o.observe(el);
      obs[tab] = o;
    });
    return () => Object.values(obs).forEach((o) => o.disconnect());
  }, [showLife]);

  const go = (tab) => {
    const wasLife = showLife;
    setShowLife(false);
    setActive(tab);
    if (wasLife) window.scrollTo(0, 0);
    clicking.current = true;
    refs.current[tab]?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      clicking.current = false;
    }, 900);
  };

  const sec = (extra = {}) => ({
    padding: "40px 0",
    borderBottom: `1px solid ${isDark ? "#0D0D0D" : "#E8E8E8"}`,
    ...extra,
  });

  return (
    <div
      style={{
        background: c.bg,
        color: c.text,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      {modal && (
        <Modal
          item={modal.item}
          type={modal.type}
          onClose={() => setModal(null)}
          c={c}
        />
      )}
      {showCornell && (
        <CornellModal onClose={() => setShowCornell(false)} c={c} />
      )}

      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: c.nav,
          borderBottom: `1px solid ${c.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          height: 50,
          gap: 3,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: c.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
            marginRight: 8,
          }}
        >
          SL
        </div>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => go(tab)}
            style={{
              background: active === tab ? c.tabActive : "transparent",
              border:
                active === tab
                  ? `1px solid ${c.border}`
                  : "1px solid transparent",
              borderRadius: 6,
              padding: "4px 11px",
              fontSize: 12,
              color: active === tab ? c.text : c.muted,
              fontWeight: active === tab ? 700 : 400,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={() => {
            setShowLife((v) => !v);
            window.scrollTo(0, 0);
          }}
          style={{
            marginLeft: "auto",
            background: showLife ? c.accent : c.card,
            border: `1px solid ${showLife ? c.accent : c.border}`,
            borderRadius: 8,
            padding: "4px 10px",
            height: 28,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            color: showLife ? "#fff" : c.muted,
            flexShrink: 0,
            transition: "all 0.15s",
          }}
        >
          life
        </button>
        <button
          onClick={() => setIsDark((d) => !d)}
          style={{
            marginLeft: 6,
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            width: 36,
            height: 28,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          {isDark ? "☀" : "☽"}
        </button>
      </nav>

      {showLife ? (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
            personal life
          </h2>
          <p style={{ color: c.muted, fontSize: 12, marginBottom: 24 }}>
            A few moments outside of work
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            {(() => {
              const sorted = [...LIFE_PHOTOS].sort((a, b) => {
                if (!a.date && !b.date) return 0;
                if (!a.date) return 1;
                if (!b.date) return -1;
                return new Date(b.date) - new Date(a.date);
              });
              const cols = [[], [], []];
              sorted.forEach((photo, i) => cols[i % 3].push({ photo, i }));
              return cols.map((col, ci) => (
                <div key={ci} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.map(({ photo, i }) => (
                    <FlipCard key={i} photo={photo} index={i} cardStyle={cardStyle} c={c} isDark={isDark} />
                  ))}
                </div>
              ));
            })()}
          </div>
        </div>
      ) : (
        <>
          <section
            ref={(el) => (refs.current.home = el)}
            style={sec({
              padding: "140px 0 120px",
              position: "relative",
              minHeight: "60vh",
            })}
          >
            <Starfield isDark={isDark} />
            <div
              style={{
                maxWidth: 860,
                margin: "0 auto",
                padding: "0 24px",
                position: "relative",
                zIndex: 1,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: c.accent,
                  fontWeight: 700,
                  marginBottom: 16,
                  letterSpacing: 1.5,
                }}
              >
                CORNELL CS '26 · DATABRICKS SWE
              </p>
              <h1
                style={{
                  fontSize: 50,
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: -1.5,
                  margin: 0,
                  whiteSpace: "nowrap",
                }}
              >
                {displayed}
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: "0.85em",
                    background: done
                      ? blink
                        ? c.text
                        : "transparent"
                      : c.text,
                    marginLeft: 4,
                    verticalAlign: "middle",
                    borderRadius: 1,
                  }}
                />
              </h1>
            </div>
          </section>

          <section
            ref={(el) => (refs.current.about = el)}
            style={sec({ background: c.sectionAlt })}
          >
            <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>
                about me
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "260px 1fr",
                  gap: 28,
                  alignItems: "start",
                  marginBottom: 24,
                }}
              >
                <Image
                  src="/profile.jpg"
                  alt="Solomon Lee"
                  width={260}
                  height={320}
                  style={{
                    borderRadius: 10,
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
                <div>
                  <h3
                    style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}
                  >
                    Solomon Lee
                  </h3>
                  <p
                    style={{
                      color: c.accent,
                      fontSize: 13,
                      fontWeight: 600,
                      marginBottom: 14,
                    }}
                  >
                    Software Engineer · Cornell CS '26
                  </p>
                  <p
                    style={{
                      color: c.muted,
                      lineHeight: 1.8,
                      fontSize: 13,
                      marginBottom: 10,
                    }}
                  >
                    I'm a Computer Science student at Cornell University
                    graduating in May 2026. Over the past three years I've
                    interned at Google, Roblox (twice), and Amazon Robotics.
                  </p>
                  <p
                    style={{
                      color: c.muted,
                      lineHeight: 1.8,
                      fontSize: 13,
                      marginBottom: 10,
                    }}
                  >
                    I work mainly in Go, Python, and Java across Kubernetes,
                    AWS, and GCP, with experience in ML systems including LLM
                    fine-tuning, multi-modal pipelines, and model evaluation
                    frameworks.
                  </p>
                  <p style={{ color: c.muted, lineHeight: 1.8, fontSize: 13 }}>
                    Outside of work I'm usually playing sports / videogames with
                    friends, working out, snowboarding, or spending time with my
                    girlfriend!
                  </p>
                </div>
              </div>

              <div
                onClick={() => setShowCornell(true)}
                style={{
                  ...cardStyle,
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                  transition: "border-color 0.15s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = c.accent;
                  e.currentTarget.style.boxShadow = `0 0 15px ${c.accent}44, 0 0 30px ${c.accent}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = c.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Image
                  src="/cornell.png"
                  alt="Cornell"
                  width={38}
                  height={38}
                  style={{ borderRadius: 8, objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}
                  >
                    Cornell University · B.S. Computer Science
                  </div>
                  <div style={{ color: c.muted, fontSize: 12 }}>
                    May 2026 · College of Engineering
                  </div>
                </div>
                <span
                  style={{
                    color: c.accent,
                    fontSize: 12,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  View details ↗
                </span>
              </div>
            </div>
          </section>

          <section ref={(el) => (refs.current.experience = el)} style={sec()}>
            <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
                experience
              </h2>
              <p style={{ color: c.muted, fontSize: 12, marginBottom: 24 }}>
                Click any card to see full details
              </p>
              <div style={{ position: "relative", paddingLeft: 26 }}>
                <div
                  style={{
                    position: "absolute",
                    left: 9,
                    top: 8,
                    bottom: 8,
                    width: 2,
                    background: c.accent,
                    borderRadius: 2,
                  }}
                />
                {JOBS.map((job) => (
                  <div
                    key={job.id}
                    style={{ position: "relative", marginBottom: 10 }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: -22,
                        top: 16,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: c.accent,
                        border: `2px solid ${c.accentSub}`,
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        ...cardStyle,
                        borderLeft: `3px solid ${c.accent}`,
                        cursor: "pointer",
                        transition: "border-color 0.15s, box-shadow 0.2s",
                      }}
                      onClick={() =>
                        setModal({ item: job, type: "experience" })
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderTopColor = c.accent;
                        e.currentTarget.style.borderRightColor = c.accent;
                        e.currentTarget.style.borderBottomColor = c.accent;
                        e.currentTarget.style.boxShadow = `0 0 15px ${c.accent}44, 0 0 30px ${c.accent}22`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderTopColor = c.border;
                        e.currentTarget.style.borderRightColor = c.border;
                        e.currentTarget.style.borderBottomColor = c.border;
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          padding: "14px 18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              fontSize: 14,
                              marginBottom: 3,
                            }}
                          >
                            {job.company}
                          </div>
                          <div
                            style={{
                              color: c.accent,
                              fontSize: 12,
                              fontWeight: 600,
                              marginBottom: 3,
                            }}
                          >
                            {job.role}
                          </div>
                          <div style={{ color: c.muted, fontSize: 11 }}>
                            {job.date}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: 5,
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          {job.tags.map((t) => (
                            <span key={t} style={chip(true)}>
                              {t}
                            </span>
                          ))}
                          <span
                            style={{
                              color: c.accent,
                              fontSize: 11,
                              marginLeft: 4,
                              fontWeight: 600,
                            }}
                          >
                            ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={(el) => (refs.current.projects = el)}
            style={sec({ background: c.sectionAlt })}
          >
            <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
                projects
              </h2>
              <p style={{ color: c.muted, fontSize: 12, marginBottom: 24 }}>
                Click any card to see full details
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {PROJECTS.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      ...cardStyle,
                      cursor: "pointer",
                      transition: "border-color 0.15s, box-shadow 0.2s",
                    }}
                    onClick={() => setModal({ item: p, type: "project" })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = c.accent;
                      e.currentTarget.style.boxShadow = `0 0 15px ${c.accent}44, 0 0 30px ${c.accent}22`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = c.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "130px 1fr",
                      }}
                    >
                      <div
                        style={{
                          background: isDark ? "#111" : "#E0E0E0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: c.muted,
                          fontSize: 11,
                          minHeight: 115,
                        }}
                      >
                        ▶ demo
                      </div>
                      <div style={{ padding: "16px 20px" }}>
                        <div style={{ marginBottom: 8 }}>
                          <span
                            style={{
                              background: c.accentBadgeBg,
                              border: `1px solid ${c.accentBadgeBorder}`,
                              color: c.accent,
                              fontSize: 10,
                              fontWeight: 600,
                              padding: "2px 8px",
                              borderRadius: 4,
                            }}
                          >
                            {p.company}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          {p.name}
                        </h3>
                        <p
                          style={{
                            color: c.accentSub,
                            fontSize: 12,
                            fontWeight: 600,
                            marginBottom: 6,
                          }}
                        >
                          {p.metric}
                        </p>
                        <p
                          style={{
                            color: c.muted,
                            fontSize: 12,
                            lineHeight: 1.6,
                            marginBottom: 8,
                          }}
                        >
                          {p.desc.slice(0, 130)}...
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 6,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: 5,
                              flexWrap: "wrap",
                            }}
                          >
                            {p.tags.slice(0, 4).map((t) => (
                              <span key={t} style={chip(true)}>
                                {t}
                              </span>
                            ))}
                          </div>
                          <span
                            style={{
                              color: c.accent,
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          >
                            View details ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={(el) => (refs.current.contact = el)}
            style={{ padding: "40px 0" }}
          >
            <div style={{ maxWidth: 520, margin: "0 auto", padding: "0 24px" }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 14 }}>
                get in touch
              </h2>
              <p
                style={{
                  color: c.muted,
                  fontSize: 13,
                  lineHeight: 1.75,
                  marginBottom: 24,
                }}
              >
                Best way to reach me is email. I try to respond quickly!
              </p>
              <ContactForm c={c} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                  marginBottom: 28,
                }}
              >
                {[
                  ["GitHub ↗", "https://github.com/Solomon-Lee"],
                  ["LinkedIn ↗", "https://linkedin.com/in/solomonslee"],
                  ["Resume PDF ↗", "/resume.pdf"],
                ].map(([l, href]) => (
                  <a
                    key={l}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "10px 0",
                      background: c.card,
                      border: `1px solid ${c.border}`,
                      borderRadius: 8,
                      color: c.text,
                      fontWeight: 500,
                      fontSize: 12,
                      textDecoration: "none",
                      transition: "border-color 0.15s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = c.accent;
                      e.currentTarget.style.boxShadow = `0 0 15px ${c.accent}44, 0 0 30px ${c.accent}22`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = c.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {l}
                  </a>
                ))}
              </div>
              <div
                style={{ borderTop: `1px solid ${c.border}`, paddingTop: 18 }}
              >
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
                  Solomon S. Lee
                </div>
                <div style={{ color: c.muted, fontSize: 12 }}>
                  Cornell University CS `26 · Databricks SWE
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
