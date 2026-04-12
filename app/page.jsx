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
  {
    src: "/life/C514993E-744B-4A34-AB3E-7E8F077402AA_1_105_c.jpeg",
    caption: "Beer Hall!",
    location: "Munich, Germany",
    date: "April 2026",
  },
  {
    src: "/life/90E01CF2-8DC3-4B4A-A5B4-A74069B9D35F.jpeg",
    caption: "Cracking a Red Bull at the Peak!",
    location: "Stubai, Austria",
    date: "April 2026",
  },
  {
    src: "/life/F73D66E0-6DCE-4027-A777-5B17506280E0_1_105_c.jpeg",
    caption: "Vibe",
    location: "Bratislava, Slovakia",
    date: "April 2026",
  },
  {
    src: "/life/E7670BB4-40BC-4B84-AB4F-AC6341EADE92.jpeg",
    caption: "Porsche Cayman Track Day!",
    location: "Spielberg, Austria",
    date: "April 2026",
  },
  {
    src: "/life/2BEA5C7C-48EF-4CFB-893E-7C73E79931A8_1_105_c.jpeg",
    caption: "Happy Valentine's Day!",
    location: "Ithaca, New York",
    date: "February 2026",
  },
  {
    src: "/life/98FDE46B-A6C5-46B8-8CE6-7279E183B8B6_1_105_c.jpeg",
    caption: "Perfect Conditions :(",
    location: "Ithaca, New York",
    date: "March 2026",
  },
  {
    src: "/life/1D2108C3-270B-47A6-9D25-3B3FA9F82D77_1_105_c.jpeg",
    caption: "Happy Anniversary Nat!",
    location: "Boston, Massachusetts",
    date: "January 2026",
  },
  {
    src: "/life/5806356D-AC0D-4784-93EF-E08348686511_1_105_c.jpeg",
    caption: "Wish I could bring this to the US :(",
    location: "Chongqing, China",
    date: "January 2026",
  },
  {
    src: "/life/68BDCE2A-B219-462C-9455-03A230CC32EB_1_105_c.jpeg",
    caption: "Dressing up in the Forbidden City!",
    location: "Beijing, China",
    date: "January 2026",
  },
  {
    src: "/life/54BF910D-6140-4487-89F6-63849F4144FD_1_105_c.jpeg",
    caption: "Summer Palace Vibes!",
    location: "Beijing, China",
    date: "January 2026",
  },
  {
    src: "/life/406A303F-456A-42C9-8A83-C005C4807EDC_1_105_c.jpeg",
    caption: "Hitting Slopes with the Sis!",
    location: "Niseko, Hokkaido",
    date: "December 2025",
  },
  {
    src: "/life/B5CA8A6E-E9EA-44ED-8FFF-F3DD5ABBAA2B_1_105_c.jpeg",
    caption: "Xiao Mi!!!!",
    location: "Home",
    date: "December 2025",
  },
  {
    src: "/life/F534A612-74B4-4350-A6FC-AB76FC44F356_1_105_c.jpeg",
    caption: "Date Night!",
    location: "NYC, New York",
    date: "November 2025",
  },
  {
    src: "/life/BB98841E-BF24-4691-873B-735313DACC74_1_105_c.jpeg",
    caption: "Pot O' Jar and a Bee!",
    location: "Boston, Massachusetts",
    date: "October 2025",
  },
  {
    src: "/life/3AC76553-BC1D-43BB-8A3D-B0EA170F5F89_1_105_c.jpeg",
    caption: "Chilling :)",
    location: "Home",
    date: "July 2025",
  },
  {
    src: "/life/F9A500D7-B822-4438-8D40-CD92CF2C9A03_4_5005_c.jpeg",
    caption: "Powder Day!",
    location: "Ithaca, New York",
    date: "January 2026",
  },
  {
    src: "/life/1E2B2890-CF99-49AD-BA83-7CF8D214A70B_1_105_c.jpeg",
    caption: "So Smug!",
    location: "Home",
    date: "January 2026",
  },
  {
    src: "/life/04110F93-1F9C-4525-9E18-1363A068DDA9_1_105_c.jpeg",
    caption: "Favorite Boba!",
    location: "Beijing, China",
    date: "January 2026",
  },
  {
    src: "/life/84DB8FD0-A218-4527-B9D6-616279159226_1_105_c.jpeg",
    caption: "Childhood favorite meal",
    location: "Guangzhou, China",
    date: "January 2026",
  },
  {
    src: "/life/DBAFEDFB-EA92-49B4-A3BF-5083787CDCE9_1_105_c.jpeg",
    caption: "I Love Food!!",
    location: "Beijing, China",
    date: "January 2026",
  },
  {
    src: "/life/FDAC0CF4-42A1-4F7E-8B69-1E0EDE87894B_1_105_c.jpeg",
    caption: "Teine Slopes!",
    location: "Sapporo, Hokkaido",
    date: "December 2025",
  },
  {
    src: "/life/46E8708F-50BB-4898-A67B-66037866622D_1_105_c.jpeg",
    caption: "Hot day out!",
    location: "Boston, Massachusetts",
    date: "August 2025",
  },
  {
    src: "/life/5562B6F3-BAEE-446D-9930-47916D118B62_1_105_c.jpeg",
    caption: "Yeah, I'm a big back :)",
    location: "Vallejo, California",
    date: "May 2025",
  },
  {
    src: "/life/77E7F8BF-7FC7-40D9-BFE7-CBB3F35790E8_1_105_c.jpeg",
    caption: "Chinatown!",
    location: "San Francisco, California",
    date: "May 2025",
  },
  {
    src: "/life/54CA81D4-CE55-4BD6-929A-EB3C7C91C8B6_1_105_c.jpeg",
    caption: "Posing!",
    location: "South San Francisco, California",
    date: "May 2025",
  },
  {
    src: "/life/61DA6CE7-DCA9-40F7-A117-BC49B8D11939_1_105_c.jpeg",
    caption: "IYKYK",
    location: "Ithaca, New York",
    date: "April 2025",
  },
  {
    src: "/life/72CCB459-6217-4666-8536-4FAC08D8470C_1_105_c.jpeg",
    caption: "Heart!",
    location: "Boston, Massachusetts",
    date: "April 2025",
  },
  {
    src: "/life/FF98255A-AE84-4CDF-8E79-4267B1967950_1_105_c.jpeg",
    caption: "Catching fishies",
    location: "Tokyo, Japan",
    date: "January 2025",
  },
  {
    src: "/life/1EC0725F-74AB-49FE-80B2-131A44BD89C8_1_105_c.jpeg",
    caption: "Me vs. Touchdown",
    location: "Ithaca, New York",
    date: "May 2025",
  },
  {
    src: "/life/D9E976A8-1A9C-4241-98B0-9349D7EBDF05_1_105_c.jpeg",
    caption: "Gorgeous Architecture...",
    location: "Munich, Germany",
    date: "April 2026",
  },
  {
    src: "/life/EF4D82E1-AC9B-436B-8280-5B904BE2356B_1_105_c.jpeg",
    caption: "What a view!",
    location: "Innsbruck, Austria",
    date: "April 2026",
  },
  {
    src: "/life/85D78345-2BBF-4428-854A-463696921FEF_1_105_c.jpeg",
    caption: "Quick trip to Italy!",
    location: "Vipiteno, Italy",
    date: "April 2026",
  },
  {
    src: "/life/D9EF80BF-356F-464B-B42D-5FB147D72F15_1_105_c.jpeg",
    caption: "The views of Schonbrunn Palace",
    location: "Vienna, Austria",
    date: "April 2026",
  },
  {
    src: "/life/2A6D3263-736A-4200-99BD-BCBD955BF065_1_105_c.jpeg",
    caption: "We'll remember you Stand25...",
    location: "Budapest, Hungary",
    date: "March 2026",
  },
  {
    src: "/life/7C4D671B-2FCA-44CD-8AFD-087012EE0519_1_105_c.jpeg",
    caption: "Cybercity Vibes!",
    location: "Shanghai, China",
    date: "January 2026",
  },
  {
    src: "/life/16C00347-D356-448B-92FD-CB8C902255AB_1_105_c.jpeg",
    caption: "Minutes before my Back is reinjured",
    location: "Ithaca, New York",
    date: "February 2026",
  },
  {
    src: "/life/0410BECD-F4A4-4C85-B40B-6299E924CE62_1_102_o.jpeg",
    caption: "Silent Hill Vibes",
    location: "Ithaca, New York",
    date: "February 2026",
  },
  {
    src: "/life/2CB05054-E0D4-4C03-9BA1-16A8B9DB08F4_1_105_c.jpeg",
    caption: "Sunset Views",
    location: "Ithaca, New York",
    date: "February 2026",
  },
  {
    src: "/life/2CBF460D-FD3E-4D49-9145-2BAEBFEB6016_1_105_c.jpeg",
    caption: "So cool!",
    location: "Stuttgart, Germany",
    date: "April 2026",
  }
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
    role: "Software Engineer, Engine",
    date: "Aug 2026 – Present",
    tags: ["TBD"],
    desc: "Incoming Software Engineer at Databricks in Palo Alto, CA.",
  },
  {
    id: 1,
    company: "Google",
    role: "Software Engineer Intern, Google Core (Airlock)",
    date: "Aug – Nov 2025",
    tags: [
      "Java",
      "Spring Boot",
      "Spring AI",
      "GCP",
      "Vertex AI Search",
      "Dataflow",
      "MCP",
      "Spanner",
      "GKE",
    ],
    desc: [
      {
        header: "The Problem",
        body: "At Google, every software dependency used in production must come from an internal, centralized artifact registry which is the single source of truth for all approved packages. AI coding assistants like Gemini CLI would recommend popular public packages that weren't approved for internal use, forcing developers into a manual search and replace workflow that undermined AI productivity gains.",
      },
      {
        header: "What I Built",
        body: 'I designed and built an AI powered package recommendation engine that lets developers use natural language to search for internally approved packages. Instead of browsing a UI and guessing at package names, a developer could ask "I need a library for JSON serialization in Java" and get back a ranked list of compliant, build ready results.',
      },
      {
        header: "Retrieve and Rank Architecture",
        body: "The core system follows a retrieve and rank architecture. In the retrieval stage, the service makes a semantic search call to a Vertex AI Search data store populated exclusively with internal package metadata, returning the top k candidates. In the ranking stage, candidates are reranked using a weighted scoring function blending normalized signals: popularity (40%) via log scaled engagement metrics, semantic relevance (30%), license compliance (20%) as a categorical score, and recency (10%) to gently favor actively maintained packages.",
      },
      {
        header: "MCP Server & Tool Use Integration",
        body: "The service functions as an MCP (Model Context Protocol) server, exposing three tools (GetPackageRecommendations, GetLatestVersion, and GetPackageMetadata) for integration with AI agents like Gemini CLI. Using Spring AI, these are registered as local Java functions that Gemini can invoke via its native tool use capabilities.",
      },
      {
        header: "Data Pipeline",
        body: "To keep the search index fresh, I built a hybrid data ingestion pipeline. A daily Google Cloud Dataflow batch job performs a full refresh: extracting metadata, computing global normalization statistics, normalizing every record, staging output as JSONL in Cloud Storage, and triggering a bulk reindex. For real time updates, a Spring AOP interceptor fires asynchronously after database transactions, normalizing and pushing individual records to the live index.",
      },
      {
        header: "Frontend Integration",
        body: 'I integrated the engine into the internal UI as an "AI Mode" to have a chatbot style interface where developers receive formatted package cards alongside conversational summaries.',
      },
    ],
    diagram: {
      label: "System Architecture",
      src: "/diagrams/google-arch.svg",
    },
  },
  {
    id: 2,
    company: "Roblox",
    role: "Software Engineer Intern, Foundation AI (ML Platform)",
    date: "May – Aug 2025",
    tags: [
      "Go",
      "Kubernetes",
      "Prometheus",
      "Grafana",
      "AWS (EC2, S3, EFS)",
      "ArgoCD",
    ],
    desc: [
      {
        header: "Overview",
        body: "I worked on two projects that tackled ML Platform cloud cost from complementary angles: a GPU descheduler that automatically reclaims idle resources, and a cost dashboard that gives teams real time spending visibility.",
      },
      {
        header: "Project 1: AI Platform Descheduler",
        body: "Across the ML Platform's Kubernetes clusters, roughly 10% of allocated GPUs were sitting completely idle at any given time, reserved by completed or stalled jobs that hadn't been cleaned up. I designed and built a custom descheduler, a long running Go application deployed natively inside the clusters.",
      },
      {
        header: "How It Works",
        body: "The descheduler continuously monitors GPU and CPU utilization via Prometheus, identifies idle workloads (completed Kubeflow pipelines, stalled RayJobs, stuck pending pods), and automatically terminates them by deleting the parent Kubernetes resource. All behavior is controlled through a ConfigMap (idle thresholds, query windows, target namespaces, and safety limits).",
      },
      {
        header: "Rollout & Impact",
        body: "I rolled it out in phases: shadow mode (logging only), dev deletions, tuning, then production. The system exposes Prometheus metrics visualized on a dedicated Grafana dashboard tracking GPUs reclaimed, idle hours recovered, and estimated dollars saved. Projected annual savings: ~$180K, with further gains expected from future bin packing optimization on A100/H100 nodes.",
      },
      {
        header: "Project 2: Cost Dashboard V3",
        body: "Despite spending tens of millions annually on cloud infrastructure, the ML Platform lacked accurate real time cost visibility. The existing dashboard used public AWS pricing instead of internally negotiated rates, couldn't differentiate on demand vs. reserved costs, and had inaccurate team attribution.",
      },
      {
        header: "Technical Design",
        body: "I built a custom Go application deployed across all clusters that calculates real time resource costs and exposes them as Prometheus metrics, visualized through Grafana. The core design uses cumulative cost counters instead of rate based tracking, making the system immune to Prometheus data downsampling. You only need a data point near the start and end of a period to compute total cost accurately. Costs are aggregated at the application level (not pod level) to avoid Grafana OOM errors, with scrape intervals adjusted from 15s to 30min for long term scalability.",
      },
      {
        header: "Cost Model & Features",
        body: "The cost model accounts for GPU node sharing (proportional to GPU requests) and standard node sharing (50/50 CPU/memory split). Key features include real time quarterly budget progress bars, internal pricing alignment, utilization linked cost views, and daily Parquet backups to S3.",
      },
    ],
    diagram: [
      {
        label: "Descheduler Architecture",
        src: "/diagrams/roblox-descheduler.svg",
      },
      {
        label: "Cost Dashboard Architecture",
        src: "/diagrams/roblox-dashboard.svg",
      },
    ],
  },
  {
    id: 3,
    company: "Amazon Robotics",
    role: "Software Engineer Co-op, Amazon Robotics (Hardware Services)",
    date: "Aug – Dec 2024",
    tags: [
      "Python",
      "AWS (S3, DynamoDB, IoT, Lambda, CDK, CloudWatch, CloudFormation)",
      "SSH/SCP",
      "Git",
    ],
    desc: [
      {
        header: "Context",
        body: "Amazon Robotics manages thousands of autonomous drive units across fulfillment centers. These drives need constant monitoring, log retrieval, and configuration management to stay operational. The Hardware Services team builds the internal tooling that field technicians and engineers rely on to keep these systems running. I worked on four projects spanning monitoring, diagnostics, log automation, and deployment tooling.",
      },
      {
        header: "Project 1: Drive Monitoring Expansion",
        body: "The team had an existing monitoring system that tracked error codes on drive units and automatically shipped logs to S3 for investigation. However, it was originally designed to support only corporate fulfillment sites. As the fleet expanded to MOC (mechanized outbound center) sites, the same monitoring capabilities were needed there. I extended the system to support MOC sites, enabling the operations team to detect and diagnose issues across both site types from a single pipeline.",
      },
      {
        header: "Project 2: IoT Drive Health Audit",
        body: "Certain drive units would enter a bad state where their device agent stopped processing jobs entirely. This was especially dangerous because if a drive couldn't process jobs, critical operations like shutdowns or credential rotations couldn't be executed. If credentials were rotated on a drive in this state, the drive would require manual intervention to fix, which was a time consuming process at scale.",
      },
      {
        header: "What I Built",
        body: "I built a Python diagnostic tool that reads execution summaries (JSON), extracts drive GUIDs, queries DynamoDB for device metadata, and checks the last 5 IoT jobs for each drive to determine whether they completed successfully. The tool generates a report categorizing drives into three buckets: drives with no jobs in the past 24 hours, drives with jobs that failed to complete within 10 minutes, and drives with successful jobs. Field technicians could then proactively reboot drives in a bad state before downstream problems occurred.",
      },
      {
        header: "Considerations",
        body: "To avoid throttling AWS services, the tool introduces a 1 second sleep between API calls and efficiently processes batches of up to 100 JSON objects per run.",
      },
      {
        header: "Project 3: Automated Log Retrieval",
        body: "When engineers needed to diagnose issues on specific drives, they had to manually SSH into individual units, locate the relevant log files, and transfer them out. This was slow and error prone, especially when investigating issues across multiple drives.",
      },
      {
        header: "What I Built",
        body: "I built an automated log retrieval script that SSHes into target drives, extracts logs, temporarily stores them in a local directory organized by GUID, uploads them to an S3 bucket, and generates presigned URLs (both metadata and download links) for easy sharing. After upload, the script automatically cleans up local storage to preserve disk space. This turned a manual multistep process into a single command, and the presigned URLs made it easy for any team member to access the logs without needing direct drive access.",
      },
      {
        header: "Project 4: Job Template Management Tool",
        body: "The team's job templates and scripts, used to execute operations on drive units via a controlled permissions based environment, were not synchronized across deployment stages (Prod → Gamma → Beta → Dev). The original solution used AWS Pipelines, CDK, and Lambda, but the pipeline was difficult to connect to Git, hard for new users to understand, and didn't allow on demand template modifications.",
      },
      {
        header: "What I Built",
        body: "I replaced the pipeline approach with a Python application featuring a user friendly UI. The tool synchronizes templates and scripts from S3 and DynamoDB, maintaining consistency across all environments. I built it with a modular architecture, separating all core functionality (template creation, modification, upload, sync) from the UI layer, so the team could later swap in a web based interface without rewriting any business logic. Key components include a template upload orchestrator for creating and pushing templates, a Git based preprocessing pipeline for managing file versioning and zipping, and a DynamoDB restore utility for recovering table integrity after errors. The tool also introduced version control for job templates by integrating Git with S3, enabling collaboration and change tracking that didn't exist before.",
      },
      {
        header: "Impact",
        body: "The tool significantly reduced the learning curve for new team members, automated previously manual synchronization tasks, and gave engineers the ability to independently manage templates without deep knowledge of the underlying infrastructure.",
      },
    ],
    diagram: [
      { label: "Drive Health Audit", src: "/diagrams/amazon-drive-audit.svg" },
      {
        label: "Log Retrieval Pipeline",
        src: "/diagrams/amazon-log-retrieval.svg",
      },
      {
        label: "Template Tool Architecture",
        src: "/diagrams/amazon-template-tool.svg",
      },
    ],
  },
  {
    id: 4,
    company: "Roblox",
    role: "Software Engineer Intern, Economy (Avatar Core Services)",
    date: "May – Aug 2024",
    tags: [
      "Python",
      "PySpark",
      "C#",
      ".NET",
      "SQS",
      "SQL",
      "Hive",
      "Grafana",
      "AWS S3",
    ],
    desc: [
      {
        header: "Context",
        body: "Roblox's avatar system serves hundreds of millions of users, and when things go wrong (data corruption, unauthorized item grants, exploit driven marketplace abuse) the impact is measured in millions of affected accounts. Prior to my internship, resolving these incidents required building ad hoc scripts from scratch each time: manually querying for affected users, loading them into a queue via SSH on a specific machine, and running one off console apps with no standardized logging, metrics, or configurability. This process was slow, error prone, and required deep tribal knowledge to execute, which was a serious problem when incidents often need resolution at 3am.",
      },
      {
        header: "What I Built",
        body: "I designed and built the Avatar Remediation Processor, the first general purpose offline processor built for the Marketplace organization. It provides an end to end pipeline for querying affected users at scale, loading them into a processing queue, and executing customizable remediation operations against each user's data. The system replaced a patchwork of ad hoc scripts with a single, extensible service that any engineer on the team could operate. Critically, new operations could be added with minimal effort, since each operation is a self contained class requiring only the business logic specific to that remediation.",
      },
      {
        header: "Data Query & Export Pipeline",
        body: "The entire flow begins when a developer runs a preconfigured PySpark notebook. The notebook contains parameterized queries for common user populations: daily active users, monthly active users, users who recently changed their avatar, users who wore or purchased a specific item. When executed, the notebook queries Hive data tables, gathers the matching user IDs (often millions of records), and automatically loads them into an SQS queue with no manual SSH intervention required. I added metrics and logging to verify completeness, since detecting truncated uploads or failed loads was a known pain point from previous incidents.",
      },
      {
        header: "Scalable Processor",
        body: "The core processor is a backend microservice that reads from the SQS queue and executes pluggable operations against each user. The processor determines which operation to run based on metadata attached to each queued message, preventing accidental execution of the wrong remediation. Key configurability features include a kill switch via remote config to instantly stop all processing, a configurable rate limiter to control throughput per instance (preventing downstream service overload), and the ability to scale horizontally by adding processor instances. The service comes preequipped with clients for all core avatar backend services (asset registry, ownership, bundles, avatars, outfits, thumbnails) so new operations can be written quickly without boilerplate setup. Beyond remediation, the processor also unlocked a capability the team never had before: the ability to inspect corrupted avatar metadata and thumbnails at scale. Previously, there was no way to systematically view or audit this data across millions of users. By running read only operations through the processor, engineers could scan the entire user base to identify and characterize corruption patterns, turning what had been invisible problems into actionable data.",
      },
      {
        header: "Observability",
        body: "Every stage of the pipeline is instrumented. I built Grafana dashboards tracking queue depth, processing throughput, success/failure rates, and error breakdowns. This gives operators real time visibility into remediation progress and lets them catch issues before they compound.",
      },
      {
        header: "Testing & Validation",
        body: "I ran the processor through progressively larger workloads: small batches for correctness, full DAU (daily active users) on a single instance to establish baseline throughput, and full MAU (monthly active users) with scaled instances and increased parallelism. The target was processing the entire MAU population within 24 hours, which we validated with measured min/max latency benchmarks documented in a user guide.",
      },
      {
        header: "Impact",
        body: "The processor was the first general purpose offline processor in Marketplace, and it was used to help resolve active data corruption incidents impacting millions of users. Its extensible design meant that adding a new remediation operation was as simple as writing a single class with the relevant business logic, no infrastructure changes needed. I wrote a PRD outlining how the tool could be generalized further into a marketplace wide offline processing platform, usable by any team that needs to scan or remediate a subset of Roblox's user base. I presented this vision to Marketplace engineering leadership and collected feedback that shaped the tool's long term roadmap.",
      },
    ],
    diagram: {
      label: "Remediation Processor Architecture",
      src: "/diagrams/roblox-remediation.svg",
    },
  },
];

const PROJECTS = [
  {
    id: 0,
    name: "LLM Persona Belief Influence",
    company: "Cornell Data Analytics Group",
    thumbnail: "/projects/llm-persona-logo.svg",
    date: "In Progress",
    desc: [
      {
        header: "The Problem",
        body: "LLMs increasingly operate under system prompt personas (customer service agents, tutors, domain experts) that shape how they reason and evaluate claims. Prior work has shown that personas shift model behavior directionally. But nobody has tested whether this shift reflects genuine adoption of a reasoning framework or merely a directional bias toward one side of an argument. This distinction matters. A model that internalizes a structured belief system is much harder to audit and more unpredictable than one that simply biases outputs toward a side. If personas create structured reasoning, they could be used to steer model behavior in ways that are difficult to detect, which is a serious concern for enterprises deploying agentic AI systems.",
      },
      {
        header: "Central Research Question",
        body: "Do LLM personas produce coherent belief systems that reason from their own set of beliefs, or do they just bias outputs toward a side? Our experiments suggest the former: personas promote arguments that reason from their tradition, even among claims on the same side of a debate, and persona evaluations propagate through the logical structure of argument trees.",
      },
      {
        header: "Experimental Setup",
        body: "I use hierarchical debate trees from Kialo, which are structured argument graphs where a root thesis branches into pro and con claims, each with its own children, extending 5+ levels deep. Each claim is evaluated under three conditions: a pro persona (system prompt contains a pro thesis persona), a con persona (con thesis persona), and a baseline (no persona). User turns are always neutral ('Is the following claim true or false?'), never 'Do you agree?', isolating persona influence from sycophantic agreement with user opinions.",
      },
      {
        header: "Persona Generator",
        body: "Building effective personas required solving several failure modes:",
      },
      {
        header: "Iteration 1: Weak Personas",
        body: "Third person, abstract framing ('A public health epidemiologist evaluates policy questions through the lens of harm reduction...'). Result: zero effect. All conditions produced identical true rates. The model ignored the persona entirely.",
      },
      {
        header: "Iteration 2: Strong personas",
        body: "Shifted to second person with professional identity, emotional stakes, and years of experience. But the generator produced the same profession for both sides, making the con persona generically skeptical rather than specifically directional.",
      },
      {
        header: "Iteration 3: Domain isolation",
        body: "Each persona only sees its own side's claims and receives its own domain label. I built a static domain mapping (researcher curated JSON assigning intellectual traditions to each side, e.g., gun control: pro → Epidemiology/Public Health, con → Constitutional Law) after finding that LLM inferred domains confused topics mentioned with reasoning frameworks.",
      },
      {
        header: "Iteration 4: Opinionated personas",
        body: "Even with correct domains, personas were too evenhanded, giving the model escape hatches to agree with opposing claims. I rewrote the meta prompt to generate personas that are explicitly directional: 'SO OPINIONATED that a language model adopting it would consistently lean {stance},' with built in skepticism toward the opposing reasoning tradition.",
      },
      {
        header: "Key Findings",
      },
      {
        header: "Con persona flips discrimination direction",
        body: "In the gun control debate (n=523 claims), the con persona reversed the model's baseline lean from +24.2pp (favoring pro claims) to −28.3pp (favoring con claims). The pro persona amplified the baseline from +24.2pp to +50.4pp. Pro coherence averaged 75.7%; con coherence averaged 63.9%, both well above the 50% chance line.",
        image: "/projects/556642978-0308064b-dbba-476f-87cd-061ebc9fd586.png",
      },
      {
        header: "Clean three way separation across all debates",
        body: "Averaged across five additional debates (gender neutral bathrooms, zoo abolition, European monarchies, parenting licenses, Confederate memorials): pro persona discrimination starts at ~+80pp at hop 1 and declines to ~+28pp at hop 5. Con persona starts at ~−70pp and attenuates to ~−18pp. Baseline hovers near zero with tight confidence bands at every hop. The symmetry of pro/con effects and tight baseline bands across debates confirm this is a robust phenomenon, not an artifact of a single topic.",
        image: "/projects/556689185-9cbeb859-9c9b-49b3-b339-a4f92ae7cdd8.png",
      },
      {
        header: "Effects generalize beyond what the persona saw",
        body: "The discrimination effect remains clearly nonzero at hop 5, well beyond the 1 to 2 hop claims the persona generator was exposed to. The personas generalize to deep claims they never saw during construction.",
        image: "/projects/556689653-9de8b25c-c943-42a7-9218-2d8b3740bed1.png",
      },
      {
        header: "Flip rate gradient is selective, not random",
        body: "Flip rate (how often pro and con personas disagree on the same claim) starts at 70-100% at hop 1 and declines to 30-45% by hop 5, consistent across all debates. The personas aren't blindly disagreeing on everything. They're differentially sensitive to claims that are more vs. less connected to the core thesis. Baseline agreement is asymmetric: the pro persona agrees with baseline 82.3% of the time (amplifying the model's existing lean) while the con persona agrees only 61.0% (fighting against the model's prior).",
        image: "/projects/556689738-75107c42-4a28-4a69-8fbe-a6a71fe3bc2c.png",
      },
      {
        header: "Override Experiments",
        body: "To test whether reasoning framework personas do real intellectual work beyond directional bias, I designed a multi turn fan to framework override:",
      },
      {
        header: "Fan",
        body: "The simplest possible persona: 'You strongly believe this thesis is true/false.' Pure direction, no reasoning tradition.",
      },
      {
        header: "Override",
        body: "Fan evaluates first, then gets: 'You now adopt the following perspective: [full opposing persona with thesis and claims embedded].' Tests whether a hard identity swap midconversation can overcome the system prompt.",
      },
      {
        header: "Contradict",
        body: "Fan evaluates first, then challenged with: 'Reconsider. [full opposing strong persona text].'",
      },
      {
        header: "Expert",
        body: "Fan evaluates first, then challenged with only the opposing expert's title: 'A senior epidemiologist disagrees. Given their expertise, reevaluate.' Tests whether pure authority (no reasoning content) is enough to flip answers.",
      },
      {
        header: "Reasoning",
        body: "Fan evaluates first, then presented with the opposing reasoning framework in third person as context. No directive to reconsider. Tests whether reasoning content alone shifts answers.",
      },
      {
        header: "Key finding",
        body: "The reasoning framework amplifies when stacked on the fan. The override pushes discrimination beyond both the fan alone and the framework alone. The con side shows the most dramatic effect: −28.7pp (strong persona alone) jumps to −46.6pp (override after fan). If the strong persona were just another way of saying 'agree with your side,' stacking shouldn't produce amplification, but it does. The con override flip rate stays elevated (17–30%) across all hops from root thesis, doing real work even on deep claims. The pro override drops near zero after hop 1, consistent with the fan already getting most claims 'right' from that perspective.",
        image: "/projects/575159609-07ebb58d-cef9-4efc-b8a8-6287b2188382.png",
      },
      {
        header: "Current Status",
        body: "The core experimental pipeline is built and producing results across multiple debates and frontier models. I'm currently running experiments that pit persona identity against logical consistency by presenting claims where the persona's reasoning tradition and the tree's logical structure conflict, to determine whether conditioned personas create genuinely independent belief structures or collapse under contradiction.",
      },
    ],
    tags: [
      "Python",
      "OpenAI API",
      "Sentence Transformers ",
      "scikit-learn",
      "Matplotlib",
    ],
    diagram: {
      label: "Experimental Pipeline",
      src: "/diagrams/llm-persona-pipeline.svg",
    },
  },
  {
    id: 1,
    name: "Automated Prompt Optimization",
    company: "Cornell Data Analytics Group",
    thumbnail: "/projects/prompt-optimizer-logo.svg",
    date: "September 2025 - December 2025",
    desc: [
      {
        header: "The Problem",
        body: "Prompt engineering for image generation models like Stable Diffusion is a manual, iterative craft. Professional prompt engineers sell optimized prompts on marketplaces for real money, but the process of discovering, purchasing, and combining prompts to achieve a target output is entirely manual. The research question: can an AI agent replace a human prompt engineer by autonomously browsing a prompt marketplace, purchasing prompts, and iteratively optimizing them to generate a target image?",
      },
      {
        header: "MCP Server: Prompt Marketplace Agent",
        body: "I built an MCP (Model Context Protocol) server that exposes a prompt marketplace as a set of tools an LLM can use autonomously. The server provides three core tools: search prompts with pagination and regex filtering, get full prompt details, and buy prompts to unlock their full text. This turns the marketplace into an environment an AI agent can navigate programmatically: browsing listings, reading descriptions, making purchase decisions, and using acquired prompts to generate images. The MCP server is backed by a metadata store containing thousands of prompt listings with descriptions, pricing, ratings, and example images. It's deployed as an HTTP/SSE service that can be connected to any MCP compatible client, and I built a GPT client that uses OpenAI's Responses API to give GPT access to the marketplace tools, letting it browse, evaluate, and purchase prompts as part of a reasoning loop.",
      },
      {
        header: "Data Pipeline & Image Generation",
        body: "The research required generating thousands of target images to evaluate against. I built the full pipeline:",
      },
      {
        header: "Template Filling",
        body: "Stable Diffusion prompts on the marketplace are often templates with placeholders (e.g., '[subject] in [style]'). I wrote a batch processing script that uses OpenAI's Batch API to fill in all placeholders with contextually appropriate values, producing complete, usable prompts from every template in the dataset.",
      },
      {
        header: "Image Generation",
        body: "I built a generation pipeline using Stable Diffusion XL with Compel for long prompt embedding, handling the correct engine configuration (SD 2.1 vs XL 1.0) for each prompt based on its marketplace metadata. The pipeline processes prompts in batches with checkpointing, generating target images that serve as the ground truth for evaluation.",
      },
      {
        header: "Reverse engineering",
        body: "Using OpenAI's Batch API, I fed generated target images back to GPT and asked it to reverse engineer the Stable Diffusion prompt that would reproduce them. This creates the initial seed prompt for the optimization loop, a starting point the agent can then iteratively improve.",
      },
      {
        header: "Evaluation Pipeline",
        body: "I built the evaluation framework to measure how well automated prompt optimization can match human prompt engineers. The core loop: take a target image, give the agent an initial prompt (just the first few words), let it use the marketplace and iterative refinement to produce an optimized prompt, generate an image from that prompt, and measure image similarity against the target. I integrated GEPA (Genetic Evolution of Prompt Agents) as one optimization strategy, where GPT iteratively refines prompts with image similarity as the fitness function. The pipeline produces step by step outputs showing how the generated image converges toward the target across optimization iterations.",
      },
      {
        header: "VLM Benchmarking",
        body: "Early in the project, I surveyed and benchmarked vision language models (Qwen 2.5 VL, LLaMA 3.2, and others) to determine which could serve as the policy model in a reinforcement learning pipeline. I profiled each model's VRAM usage, inference latency, and output quality on the marketplace browsing task, and compiled a comparison table of VLMs used as RL policies in recent literature.",
      },
      {
        header: "Contribution",
        body: "The research investigates whether automated prompt optimizers can replace human prompt engineers, using the marketplace browsing agent and image similarity metrics as the evaluation framework.",
      },
    ],
    tags: [
      "Python",
      "FastMCP",
      "OpenAI Batch API",
      "Stable Diffusion XL",
      "Compel",
      "PyTorch",
      "CUDA",
    ],
    diagram: {
      label: "Optimization Pipeline",
      src: "/diagrams/promptbase-pipeline.svg",
    },
  },
  {
    id: 2,
    name: "AI Venture Capital Research",
    company: "Cornell Data Analytics Group",
    thumbnail: "/projects/ai-vc-logo.svg",
    date: "January 2025 - May 2025",
    desc: [
      {
        header: "The Problem",
        body: "Venture capital investment decisions are driven by pattern recognition. Experienced investors develop intuition over hundreds of deals about what makes a startup fundable. But this expertise is hard to scale, hard to transfer, and hard to evaluate objectively. The lab's long term goal is to build a pretrained financial model capable of acting as an AI venture capital investor, one that can evaluate startups the way a seasoned VC would, using the same inputs: pitch decks, financial projections, and company descriptions. Before building that model, we needed to answer a foundational question: how do existing language models respond to financial training data? What do they learn, what do they miss, and what metrics should we use to evaluate an AI investor's judgment? My work focused on building the data infrastructure and running the initial experiments to establish those baselines.",
      },
      {
        header: "Data Collection Pipeline",
        body: "I built a suite of web scrapers using Selenium to collect real startup deal data from two major angel investing platforms. The scrapers authenticate, navigate paginated deal listings, and extract structured data for each company: deal IDs, funding stage, round type, company descriptions, annual financials (revenue, expenditure, user metrics across projected years), current funding round details, and complete funding histories. One scraper also downloads pitch deck PDFs, collecting hundreds of decks that serve as the raw training corpus. A separate scraper targets an investor portfolio platform, extracting company names and detailed descriptions from individual company pages. All scrapers handle pagination, rate limiting, and error recovery to reliably collect data at scale.",
      },
      {
        header: "Data Cleansing & Feature Engineering",
        body: "I built a data cleansing pipeline that filters the raw scraped data to rows with complete information across all required fields. From the text heavy financial fields, I wrote parsers that extract structured numerical features (seeking amounts and total raised) from freeform strings like 'Seeking: $1M' and 'Total Raised: $2.75M', handling various formats and edge cases. This produces a clean dataset linking company descriptions, financial trajectories, and actual investment outcomes.",
      },
      {
        header: "Model Evaluattion & Baselines",
        body: "Model Evaluation & Baselines",
      },
      {
        header: "Traditional ML Baselines",
        body: "A Random Forest classifier using TF-IDF features from company descriptions combined with numerical financial features (seeking amount, revenue projections). This establishes a baseline for what's achievable with straightforward feature engineering on the collected dataset.",
      },
      {
        header: "LLM Fine-Tuning",
        body: "I fine tuned a LLaMA 3.1 model on pitch deck content extracted from the collected PDFs using PyMuPDF. I compared zero shot performance (the model's out of the box financial reasoning) against fine tuned results to measure how much domain specific training data moves the needle. Training used bfloat16 precision for GPU efficiency. The experiments capture how models respond to different types of financial signals, whether they pick up on revenue trajectory patterns, funding round sizing, or narrative quality in company descriptions, and where they fall short compared to human investor judgment.",
      },
      {
        header: "Pitch Deck Processing",
        body: "The PDF pipeline extracts text and images from hundreds of real pitch decks, creating a unique dataset that links pitch content directly to actual investment decisions. This corpus is designed to support the lab's longer term work on building a full pretrained financial model.",
      },
    ],
    tags: [
      "Python",
      "Selenium",
      "scikit-learn",
      "PyTorch",
      "LLaMA",
      "PyMuPDF",
      "Pandas",
      "NumPy",
    ],
    diagram: {
      label: "Research Pipeline",
      src: "/diagrams/data-analytics-pipeline.svg",
    },
  },
  {
    id: 3,
    name: "FP4 Quantization Format Research",
    company: "Cornell Computer Systems Lab",
    thumbnail: "/projects/fp4-logo.svg",
    date: "January 2024 - May 2024",
    desc: [
      {
        header: "The Problem",
        body: "Modern LLM deployment is bottlenecked by memory bandwidth. Quantizing model weights from 16 bit to 4 bit floating point (FP4) dramatically reduces memory footprint and improves inference throughput, but the question of which 4 bit format to use is far from settled. Nearly all existing FP4 work focuses on the E2M1 format (2 exponent bits, 1 mantissa bit), which allocates its 16 representable values with logarithmic spacing biased toward small magnitudes. But neural network weight distributions aren't uniform. They're sharply peaked near zero with heavy tails, and different formats place their quantization levels in fundamentally different positions along the number line. I investigated whether E1M2 (1 exponent bit, 2 mantissa bits), a largely overlooked format, could outperform E2M1 when combined with weight pruning.",
        image: "/projects/fp4-quantized-values.png",
        caption:
          "Standard FP4 formats (E2M1 variants) and their quantization level placements",
      },
      {
        header: "Key Insight",
        body: "E1M2 has a natural coverage gap around zero. It allocates fewer representable values to small magnitudes compared to E2M1. At first glance this seems like a disadvantage, since most neural network weights cluster near zero. But when combined with magnitude based pruning, this gap becomes an advantage: pruning removes the smallest magnitude weights entirely, and E1M2 can then reallocate its precision budget to the remaining (larger) unpruned values. The hypothesis was that the combination of quantization and pruning could outperform either technique alone at high compression ratios.",
        image: "/projects/fp4-quantized-e1m2.png",
        caption:
          "SF4 quantization levels shift outward as pruning ratio increases",
      },
      {
        header: "Weight Distribution Profiling",
        body: "I profiled the weight distributions across every layer and subchannel of transformer models, fitting each to both Normal and Student's t distributions using QQ plots to assess goodness of fit. The profiling revealed that weight distributions are consistently leptokurtic (heavier tailed than Gaussian), which informed the choice of quantization strategy.",
        image: "/projects/fp4-profiled-values.png",
        caption: "Quantization datatypes overlaid on weight distribution",
      },
      {
        header: "Custom Format Design",
        body: "I designed a parameterized 4-bit format called SF4 that continuously interpolates its quantization levels based on a pruning parameter. As the pruning ratio increases (more small weights removed), SF4 shifts its representable values outward to better cover the remaining distribution. At ~50% sparsity, the SF4 format with E1M2-like spacing showed theoretical advantages over standard E2M1.",
        image: "/projects/fp4-pruned-normalized.png",
        caption:
          "Per layer weight distributions after pruning: attention and dense layers show distinct shapes",
      },
      {
        header: "Datatype generator functions",
        body: "I explored several mathematical functions for generating quantization level placements, including normal quantile mappings, Student's t quantile mappings, and power law transformations, comparing their MSE performance against the Lloyd Max optimal.",
        image: "/projects/fp4-datatype-generators.png",
        caption:
          "Generator functions mapping uniform inputs to quantization levels: quantile-based vs. power-law",
      },
      {
        header: "Findings",
        body: "E2M1 remains the better format for quantization alone. Its logarithmic spacing naturally matches the near zero concentration of unpruned weight distributions. However, when combined with structured 2:4 sparsity (50% pruning with GPU accelerated support), E1M2 based formats showed promise by reallocating precision to the surviving weights. The research also identified practical challenges: advanced pruning methods don't produce clean gaps in the distribution (since they don't use pure magnitude based pruning), and E1M2 struggles to independently fit both the inner and outer regions of the distribution with linear scaling.",
        image: "/projects/pareto_fixed_distance.png",
        caption:
          "Accuracy vs. hardware cost (MAC area) across FP4 formats: E2M1 and APoT dominate the Pareto frontier",
      },
    ],
    tags: ["Python", "PyTorch", "NumPy", "SciPy", "Matplotlib"],
  },
  {
    id: 4,
    name: "Hardware Chatbot: Verilog Code Generation",
    company: "Cornell Computer Systems Lab",
    thumbnail: "/projects/hw-chatbot-logo.svg",
    date: "January 2023 - December 2023",
    desc: [
      {
        header: "The Problem",
        body: "Large language models can generate Python, JavaScript, and other popular languages with reasonable accuracy, but hardware description languages like Verilog remain a major gap. General purpose models frequently produce Verilog that looks syntactically plausible but fails to compile, or compiles but produces incorrect functional behavior. This matters because Verilog bugs caught late in the design cycle are vastly more expensive than software bugs and can mean respinning a chip. The lab set out to build a domain specific code generation system for Verilog, and I focused on two key pieces: building the evaluation datasets and writing the evaluation framework that measures whether generated code actually works.",
      },
      {
        header: "Evaluation Dataset",
        body: "I created a curated dataset of Verilog modules paired with test benches. Each evaluation file contains a natural language annotated module specification (the prompt) and a corresponding test bench separated by a marker. The test benches exercise the generated modules with specific input vectors and check outputs against expected values, enabling automated functional verification: not just 'does it compile' but 'does it do the right thing.'",
      },
      {
        header: "Evaluation Framework",
        body: "I built a two stage evaluation pipeline that measures both compilation accuracy and functional correctness:",
      },
      {
        header: "Stage 1: Code Generation",
        body: "The framework takes each prompt from the dataset, feeds it to a model (either a fine tuned CodeGen-2B-Verilog or GPT-3.5-turbo as a baseline), and extracts the generated Verilog module from the response by parsing between module and endmodule boundaries.",
      },
      {
        header: "Stage 2: Compile & Simulate",
        body: "The generated module is concatenated with its test bench, compiled using Icarus Verilog (iverilog), and if compilation succeeds, simulated using vvp. The simulation output is parsed for ERROR markers to determine functional correctness. This gives two metrics per model: compilation accuracy (percentage of generated modules that compile) and functional accuracy (percentage that pass all test cases).",
      },
      {
        header: "Model Benchmarking",
        body: "I set up the evaluation to compare a domain specific fine tuned model (CodeGen-2B-Verilog) against a general purpose model (GPT-3.5-turbo). The fine tuned model runs on GPU with half precision inference for efficiency, while the GPT baseline uses the OpenAI API. Both are evaluated against the same dataset using the same compilation and functional correctness criteria, providing an apples to apples comparison of domain specific fine tuning vs. general purpose scale.",
      },
      {
        header: "Interactive Testing",
        body: "I also built a simple interactive tool that lets researchers type a Verilog prompt and get generated code back in real time, useful for quickly testing specific module types or edge cases outside the formal evaluation suite.",
      },
    ],
    tags: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "Verilog",
      "OpenAI API",
      "CUDA",
    ],
    diagram: {
      label: "Evaluation Pipeline",
      src: "/diagrams/hw-chatbot-eval.svg",
    },
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

function Diagram({ src, c }) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    fetch(src)
      .then((r) => r.text())
      .then((svg) =>
        setHtml(
          svg
            .replaceAll("FILL_GRAY", c.chipDark)
            .replaceAll("FILL_CARD", c.card)
            .replaceAll("FILL_ACCENT", c.accentBadgeBg)
            .replaceAll("FILL_PURPLE", c.accentBadgeBg)
            .replaceAll("FILL_BLUE", c.accentBadgeBg)
            .replaceAll("FILL_CORAL", c.accentBadgeBg)
            .replaceAll("STROKE_GRAY", c.muted)
            .replaceAll("STROKE_ACCENT", c.accent)
            .replaceAll("STROKE_PURPLE", "#7F77DD")
            .replaceAll("STROKE_BLUE", "#378ADD")
            .replaceAll("STROKE_CORAL", "#D85A30")
            .replaceAll("STROKE", c.border)
            .replaceAll("MUTED", c.muted)
            .replaceAll("TEXT", c.text),
        ),
      );
  }, [src, c]);
  if (!html) return null;
  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: 10,
        padding: "16px 12px",
        overflow: "hidden",
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
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
            {isProject ? (
              <>
                {item.date}
                {item.metric && item.date ? " · " : ""}
                {item.metric}
              </>
            ) : (
              item.date
            )}
          </p>
        </div>
        <div style={{ padding: "0 24px 24px", overflowY: "auto", flex: 1 }}>
          {Array.isArray(item.desc) ? (
            <div>
              {item.desc.map((section, i) => (
                <div
                  key={i}
                  style={{ marginBottom: i < item.desc.length - 1 ? 20 : 24 }}
                >
                  <h3
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: c.text,
                      marginBottom: 6,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {section.header}
                  </h3>
                  <p
                    style={{
                      color: c.muted,
                      fontSize: 14,
                      lineHeight: 1.85,
                      margin: 0,
                    }}
                  >
                    {section.body}
                  </p>
                  {section.image && (
                    <div style={{ marginTop: 12 }}>
                      <Image
                        src={section.image}
                        alt={section.header || ""}
                        width={612}
                        height={400}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: 8,
                          border: `1px solid ${c.border}`,
                        }}
                      />
                      {section.caption && (
                        <p
                          style={{
                            color: c.muted,
                            fontSize: 11,
                            marginTop: 6,
                            textAlign: "center",
                            fontStyle: "italic",
                          }}
                        >
                          {section.caption}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
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
          )}
          {item.diagram &&
            (Array.isArray(item.diagram) ? item.diagram : [item.diagram]).map(
              (diag, di) => (
                <div key={di} style={{ marginBottom: 24 }}>
                  <h3
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: c.text,
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {diag.label}
                  </h3>
                  <Diagram src={diag.src} c={c} />
                </div>
              ),
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

function CardBack({ cardStyle, isDark, seed }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    let animId;
    const rng = (s) => {
      s = Math.sin(s) * 43758.5453;
      return s - Math.floor(s);
    };
    const abs = Math.abs(seed);

    // Stars
    const stars = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: rng(abs + i * 7) * w,
        y: rng(abs + i * 13) * h,
        r: 0.3 + rng(abs + i * 3) * 1,
        alpha: 0.3 + rng(abs + i * 11) * 0.6,
        phase: rng(abs + i * 17) * Math.PI * 2,
      });
    }

    // Planets
    const planets = [
      { dist: 0.12, r: 2, color: "rgba(180,180,180,0.7)", speed: 3.5 },
      { dist: 0.18, r: 2.5, color: "rgba(220,180,100,0.7)", speed: 2.5 },
      { dist: 0.25, r: 3, color: "rgba(80,140,255,0.7)", speed: 1.8 },
      { dist: 0.33, r: 2, color: "rgba(200,100,80,0.6)", speed: 1.2 },
      {
        dist: 0.42,
        r: 4,
        color: "rgba(210,190,140,0.5)",
        speed: 0.7,
        rings: true,
      },
    ];

    function draw(time) {
      const t = time / 1000;
      ctx.clearRect(0, 0, w, h);

      // Background
      const bg = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.7,
      );
      bg.addColorStop(0, isDark ? "#0d0d1a" : "#e8e8f0");
      bg.addColorStop(1, isDark ? "#050510" : "#d0d0dd");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        const twinkle = Math.sin(t * 1.5 + s.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${s.alpha * twinkle})`
          : `rgba(0,0,0,${s.alpha * twinkle * 0.3})`;
        ctx.fill();
      }

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w, h);

      // Orbit lines
      for (const p of planets) {
        const orbitR = p.dist * scale;
        ctx.beginPath();
        ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
        ctx.strokeStyle = isDark
          ? "rgba(255,255,255,0.06)"
          : "rgba(0,0,0,0.06)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Sun
      const sunR = scale * 0.05;
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 3);
      sunGlow.addColorStop(0, "rgba(255,200,50,0.3)");
      sunGlow.addColorStop(1, "rgba(255,200,50,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, sunR * 3, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      const sunGrad = ctx.createRadialGradient(
        cx - sunR * 0.2,
        cy - sunR * 0.2,
        0,
        cx,
        cy,
        sunR,
      );
      sunGrad.addColorStop(0, "rgba(255,240,150,0.9)");
      sunGrad.addColorStop(0.7, "rgba(255,180,50,0.8)");
      sunGrad.addColorStop(1, "rgba(255,120,20,0.6)");
      ctx.beginPath();
      ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Planets
      const offset = rng(abs) * Math.PI * 2;
      for (const p of planets) {
        const orbitR = p.dist * scale;
        const angle = t * p.speed * 0.3 + offset + p.dist * 20;
        const px = cx + Math.cos(angle) * orbitR;
        const py = cy + Math.sin(angle) * orbitR;

        if (p.rings) {
          ctx.beginPath();
          ctx.ellipse(
            px,
            py,
            p.r * 2.2,
            p.r * 0.6,
            angle * 0.3,
            0,
            Math.PI * 2,
          );
          ctx.strokeStyle = isDark
            ? "rgba(210,190,140,0.3)"
            : "rgba(150,130,80,0.3)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [isDark, seed]);

  return (
    <div
      ref={containerRef}
      style={{
        ...cardStyle,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}

function FlipCard({ photo, index, cardStyle, c, isDark, onSelect }) {
  const [loaded, setLoaded] = useState(false);
  const hash = (photo.caption || "")
    .split("")
    .reduce((a, ch) => ((a << 5) - a + ch.charCodeAt(0)) | 0, 0);
  const minH = 160 + (Math.abs(hash) % 5) * 30;

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
            cursor: "pointer",
            backfaceVisibility: "hidden",
            transition: "border-color 0.15s, box-shadow 0.2s",
          }}
          onClick={() => onSelect && onSelect(photo)}
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
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginTop: 6,
                    flexWrap: "wrap",
                  }}
                >
                  {photo.location && (
                    <span
                      style={{
                        background: c.chipDark,
                        borderRadius: 12,
                        padding: "2px 8px",
                        fontSize: 10,
                        color: c.muted,
                      }}
                    >
                      {photo.location}
                    </span>
                  )}
                  {photo.date && (
                    <span
                      style={{
                        background: c.chipDark,
                        borderRadius: 12,
                        padding: "2px 8px",
                        fontSize: 10,
                        color: c.muted,
                      }}
                    >
                      {photo.date}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Back — solar system card */}
        <CardBack cardStyle={cardStyle} isDark={isDark} seed={hash} />
      </div>
    </div>
  );
}

function Starfield({ isDark }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let stars = [];
    let galaxyStars = [];
    let galaxyDust = [];
    let shootingStars = [];
    let lastShootTime = 0;
    let rocket = null;
    let rocketDismissed = false;
    let ufo = null;
    let ufoDismissed = false;
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
      ufoDismissed = false;
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

    function initGalaxy() {
      galaxyStars = [];
      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.70;
      const arms = 4;
      const maxR = Math.min(canvas.width, canvas.height) * 0.38;
      const twists = 2.8;

      // Spiral arm stars
      for (let i = 0; i < 1800; i++) {
        const arm = i % arms;
        const armOffset = (arm / arms) * Math.PI * 2;
        const progress = Math.random();
        const r = progress * maxR;
        const angle = armOffset + progress * twists * Math.PI * 2;
        // Spread increases with distance from center
        const spread = r * 0.18;
        const offX = (Math.random() - 0.5) * spread;
        const offY = (Math.random() - 0.5) * spread;
        const x = cx + Math.cos(angle) * r + offX;
        const y = cy + Math.sin(angle) * r * 0.45 + offY * 0.45; // flatten for tilt
        const distNorm = r / maxR;
        // Core is brighter, warm; outer arms are dimmer, bluer
        const hue = 200 + distNorm * 30 + Math.random() * 20;
        const brightness = (1 - distNorm * 0.6) * (0.4 + Math.random() * 0.6);
        const size = (1 - distNorm * 0.5) * (0.4 + Math.random() * 1.0);
        galaxyStars.push({ x, y, r: size, alpha: brightness, hue, phase: Math.random() * Math.PI * 2 });
      }

      // Core bulge stars (dense bright center)
      for (let i = 0; i < 500; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * Math.random() * maxR * 0.2; // clustered near center
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist * 0.45;
        const hue = 190 + Math.random() * 30;
        const brightness = 0.5 + Math.random() * 0.5;
        const size = 0.3 + Math.random() * 1.2;
        galaxyStars.push({ x, y, r: size, alpha: brightness, hue, phase: Math.random() * Math.PI * 2 });
      }

      // Orbiting dust particles (stored in polar coords, animated each frame)
      galaxyDust = [];
      for (let i = 0; i < 150; i++) {
        const arm = i % arms;
        const armOffset = (arm / arms) * Math.PI * 2;
        const progress = 0.08 + Math.random() * 0.92;
        const r = progress * maxR;
        const baseAngle = armOffset + progress * twists * Math.PI * 2;
        const spread = r * 0.12;
        const offsetAngle = (Math.random() - 0.5) * spread / r;
        const offsetR = (Math.random() - 0.5) * spread * 0.5;
        // Inner dust orbits faster
        const speed = (0.03 + Math.random() * 0.04) / (0.3 + progress);
        const size = 0.8 + Math.random() * 1.5;
        const alpha = 0.15 + Math.random() * 0.25;
        const hue = 200 + progress * 30 + Math.random() * 20;
        galaxyDust.push({
          cx, cy, r: r + offsetR, baseAngle: baseAngle + offsetAngle,
          speed, size, alpha, hue, tilt: 0.45,
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
    initGalaxy();

    const ro = new ResizeObserver(() => {
      resize();
      initStars();
      initGalaxy();
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
      const cy = canvas.height * 0.30;
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

    function drawLightSun(t) {
      const sunR = Math.min(canvas.width, canvas.height) * 0.12;
      const sx = canvas.width * 0.12;
      const sy = canvas.height * 0.35;

      // Outer corona rays
      ctx.save();
      ctx.translate(sx, sy);
      const rayCount = 12;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + t * 0.05;
        const rayLen = sunR * (1.8 + Math.sin(t * 0.4 + i * 1.3) * 0.4);
        const rayGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
        rayGrad.addColorStop(0, "rgba(255, 200, 50, 0.12)");
        rayGrad.addColorStop(1, "rgba(255, 200, 50, 0)");
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle - 0.08) * sunR * 0.9, Math.sin(angle - 0.08) * sunR * 0.9);
        ctx.lineTo(Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
        ctx.lineTo(Math.cos(angle + 0.08) * sunR * 0.9, Math.sin(angle + 0.08) * sunR * 0.9);
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();

      // Large glow
      const glow2 = ctx.createRadialGradient(sx, sy, sunR * 0.3, sx, sy, sunR * 3);
      glow2.addColorStop(0, "rgba(255, 220, 100, 0.25)");
      glow2.addColorStop(0.4, "rgba(255, 200, 80, 0.08)");
      glow2.addColorStop(1, "rgba(255, 200, 80, 0)");
      ctx.fillStyle = glow2;
      ctx.beginPath();
      ctx.arc(sx, sy, sunR * 3, 0, Math.PI * 2);
      ctx.fill();

      // Sun body
      const sunGrad = ctx.createRadialGradient(sx - sunR * 0.2, sy - sunR * 0.2, sunR * 0.1, sx, sy, sunR);
      sunGrad.addColorStop(0, "rgba(255, 250, 220, 1)");
      sunGrad.addColorStop(0.4, "rgba(255, 220, 100, 0.95)");
      sunGrad.addColorStop(0.8, "rgba(255, 180, 50, 0.9)");
      sunGrad.addColorStop(1, "rgba(255, 150, 30, 0.7)");
      ctx.beginPath();
      ctx.arc(sx, sy, sunR, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();
    }

    function drawMoon(t) {
      const cx = canvas.width * 0.75;
      const cy = canvas.height * 0.38;
      const moonR = Math.min(canvas.width, canvas.height) * 0.07;

      ctx.save();
      ctx.translate(cx, cy);

      // Outer glow
      const glow = ctx.createRadialGradient(0, 0, moonR * 0.8, 0, 0, moonR * 2.5);
      glow.addColorStop(0, "rgba(220, 220, 230, 0.15)");
      glow.addColorStop(1, "rgba(220, 220, 230, 0)");
      ctx.beginPath();
      ctx.arc(0, 0, moonR * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Moon body
      const bodyGrad = ctx.createRadialGradient(-moonR * 0.3, -moonR * 0.3, moonR * 0.1, 0, 0, moonR);
      bodyGrad.addColorStop(0, "rgba(240, 240, 245, 0.95)");
      bodyGrad.addColorStop(0.5, "rgba(210, 210, 215, 0.9)");
      bodyGrad.addColorStop(1, "rgba(180, 180, 190, 0.85)");
      ctx.beginPath();
      ctx.arc(0, 0, moonR, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Clip to moon circle for craters
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, moonR, 0, Math.PI * 2);
      ctx.clip();

      // Craters (dark circular patches)
      const craters = [
        { x: -0.3, y: -0.25, r: 0.18, a: 0.12 },
        { x: 0.2, y: -0.35, r: 0.14, a: 0.1 },
        { x: -0.1, y: 0.3, r: 0.22, a: 0.1 },
        { x: 0.35, y: 0.15, r: 0.16, a: 0.08 },
        { x: -0.4, y: 0.1, r: 0.12, a: 0.1 },
        { x: 0.1, y: -0.05, r: 0.1, a: 0.07 },
        { x: -0.15, y: -0.5, r: 0.09, a: 0.09 },
        { x: 0.4, y: -0.15, r: 0.08, a: 0.06 },
      ];
      for (const c of craters) {
        const cGrad = ctx.createRadialGradient(
          c.x * moonR, c.y * moonR, 0,
          c.x * moonR, c.y * moonR, c.r * moonR
        );
        cGrad.addColorStop(0, `rgba(140, 140, 150, ${c.a})`);
        cGrad.addColorStop(0.7, `rgba(160, 160, 170, ${c.a * 0.5})`);
        cGrad.addColorStop(1, "rgba(160, 160, 170, 0)");
        ctx.beginPath();
        ctx.arc(c.x * moonR, c.y * moonR, c.r * moonR, 0, Math.PI * 2);
        ctx.fillStyle = cGrad;
        ctx.fill();
      }

      // Maria (dark patches, like lunar seas)
      const maria = [
        { x: -0.15, y: -0.1, rx: 0.35, ry: 0.25, a: 0.08 },
        { x: 0.2, y: 0.2, rx: 0.25, ry: 0.2, a: 0.06 },
      ];
      for (const m of maria) {
        ctx.beginPath();
        ctx.ellipse(m.x * moonR, m.y * moonR, m.rx * moonR, m.ry * moonR, 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 150, 160, ${m.a})`;
        ctx.fill();
      }

      ctx.restore(); // unclip

      // Subtle terminator shadow (right side darker)
      const shadow = ctx.createLinearGradient(-moonR, 0, moonR, 0);
      shadow.addColorStop(0, "rgba(0, 0, 0, 0)");
      shadow.addColorStop(0.55, "rgba(0, 0, 0, 0)");
      shadow.addColorStop(1, "rgba(0, 0, 0, 0.25)");
      ctx.beginPath();
      ctx.arc(0, 0, moonR, 0, Math.PI * 2);
      ctx.fillStyle = shadow;
      ctx.fill();

      ctx.restore();
    }

    // Precomputed landmass patches (generated once, drawn with offset for rotation)
    let earthPatches = [];
    function initEarthPatches() {
      earthPatches = [];
      // Each patch: angular position, angular width, depth into earth, color variation
      const continents = [
        // Large landmasses at various longitudes
        { lng: 0.0, width: 0.12, depth: 0.06, g: 120 },
        { lng: 0.15, width: 0.06, depth: 0.04, g: 140 },
        { lng: 0.35, width: 0.14, depth: 0.07, g: 110 },
        { lng: 0.4, width: 0.04, depth: 0.03, g: 130 },
        { lng: 0.55, width: 0.1, depth: 0.05, g: 125 },
        { lng: 0.7, width: 0.08, depth: 0.06, g: 115 },
        { lng: 0.72, width: 0.03, depth: 0.02, g: 145 },
        { lng: 0.85, width: 0.11, depth: 0.05, g: 135 },
        { lng: 0.92, width: 0.05, depth: 0.04, g: 120 },
      ];
      // Add smaller islands
      for (let i = 0; i < 15; i++) {
        continents.push({
          lng: Math.random(),
          width: 0.01 + Math.random() * 0.03,
          depth: 0.01 + Math.random() * 0.02,
          g: 110 + Math.random() * 40,
        });
      }
      earthPatches = continents;
    }
    initEarthPatches();

    function drawEarthCurvature(t) {
      const w = canvas.width;
      const h = canvas.height;
      const earthRadius = w * 1.8;
      const earthCenterY = h + earthRadius - h * 0.12;
      const ecx = w * 0.5;

      // Atmosphere glow layers
      for (let i = 3; i >= 0; i--) {
        const offset = i * 8;
        const alpha = 0.04 + (3 - i) * 0.03;
        ctx.beginPath();
        ctx.arc(ecx, earthCenterY, earthRadius + offset, Math.PI, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 180, 255, ${alpha})`;
        ctx.lineWidth = 6;
        ctx.stroke();
      }

      // Thin bright atmosphere line
      ctx.beginPath();
      ctx.arc(ecx, earthCenterY, earthRadius, Math.PI, Math.PI * 2);
      ctx.strokeStyle = "rgba(120, 200, 255, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Earth body (ocean blue)
      ctx.save();
      ctx.beginPath();
      ctx.arc(ecx, earthCenterY, earthRadius, Math.PI, Math.PI * 2);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.clip();

      // Ocean base
      const oceanGrad = ctx.createRadialGradient(ecx, earthCenterY, earthRadius * 0.97, ecx, earthCenterY, earthRadius);
      oceanGrad.addColorStop(0, "rgba(25, 80, 170, 0.6)");
      oceanGrad.addColorStop(1, "rgba(20, 60, 140, 0.8)");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, w, h);

      // Rotating landmasses
      const rotationOffset = t * 0.015; // slow rotation
      const visibleArc = Math.PI; // we see from PI to 2*PI (top half of arc)

      for (const patch of earthPatches) {
        // Map longitude (0-1) to angle, offset by rotation
        const patchCenter = Math.PI + ((patch.lng + rotationOffset) % 1) * visibleArc;
        const patchHalfW = patch.width * visibleArc * 0.5;

        // Draw the landmass as an arc segment with depth
        const innerR = earthRadius - patch.depth * earthRadius;
        const startAngle = patchCenter - patchHalfW;
        const endAngle = patchCenter + patchHalfW;

        ctx.beginPath();
        ctx.arc(ecx, earthCenterY, earthRadius - 1, startAngle, endAngle);
        ctx.arc(ecx, earthCenterY, innerR, endAngle, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = `rgba(40, ${patch.g}, 55, 0.55)`;
        ctx.fill();

        // Lighter highlight on top edge of landmass
        ctx.beginPath();
        ctx.arc(ecx, earthCenterY, earthRadius - 2, startAngle + patchHalfW * 0.1, endAngle - patchHalfW * 0.1);
        ctx.strokeStyle = `rgba(60, ${patch.g + 20}, 70, 0.2)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();

      // Cloud wisps (also rotating, but slightly faster than land)
      const cloudOffset = t * 0.02;
      for (let i = 0; i < 8; i++) {
        const baseLng = (i / 8 + cloudOffset) % 1;
        const angle = Math.PI + baseLng * Math.PI;
        const cloudX = ecx + Math.cos(angle) * (earthRadius + 2);
        const cloudY = earthCenterY + Math.sin(angle) * (earthRadius + 2);
        const cloudW = 30 + Math.sin(t * 0.15 + i * 2.5) * 12;
        ctx.beginPath();
        ctx.ellipse(cloudX, cloudY, cloudW, 3.5, angle + Math.PI * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fill();
      }
    }

    function drawLight(time) {
      const t = time / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky gradient (deep space blue fading to lighter near Earth)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, "#e8f0fe");
      skyGrad.addColorStop(0.5, "#d0e2f7");
      skyGrad.addColorStop(0.85, "#b8d4f0");
      skyGrad.addColorStop(1, "#a0c4e8");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun (left side)
      drawLightSun(t);

      // Moon (right side, upper area)
      drawMoon(t);

      // Small distant stars (faintly visible in daytime sky)
      for (const s of stars) {
        const alpha = s.baseAlpha * 0.08 * (Math.sin(t * s.speed + s.phase) * 0.3 + 0.7);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 120, 160, ${alpha})`;
        ctx.fill();
      }

      // Earth curvature at bottom
      drawEarthCurvature(t);

      // UFO — spawns on mouse enter, chases cursor
      if (!ufo && mouseInSection && !ufoDismissed) {
        const edge = Math.floor(Math.random() * 4);
        let sx, sy;
        if (edge === 0) {
          sx = -30;
          sy = Math.random() * canvas.height;
        } else if (edge === 1) {
          sx = canvas.width + 30;
          sy = Math.random() * canvas.height;
        } else if (edge === 2) {
          sx = Math.random() * canvas.width;
          sy = -30;
        } else {
          sx = Math.random() * canvas.width;
          sy = canvas.height + 30;
        }
        ufo = {
          x: sx,
          y: sy,
          vx: 0,
          vy: 0,
          angle: 0,
          size: 14,
          wobble: 0,
          life: 0,
        };
      }

      if (ufo) {
        ufo.wobble += 0.05;
        ufo.life++;
        const targetX = mouseInSection
          ? mouseX
          : ufo.x + Math.cos(ufo.angle) * 100;
        const targetY = mouseInSection
          ? mouseY
          : ufo.y + Math.sin(ufo.angle) * 100;
        const dx = targetX - ufo.x;
        const dy = targetY - ufo.y;
        const targetAngle = Math.atan2(dy, dx);

        // Smoothly steer toward cursor
        let angleDiff = targetAngle - ufo.angle;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        ufo.angle += angleDiff * 0.04;

        const accel = 0.1;
        ufo.vx += Math.cos(ufo.angle) * accel;
        ufo.vy += Math.sin(ufo.angle) * accel;

        // Limit speed
        const spd = Math.sqrt(ufo.vx * ufo.vx + ufo.vy * ufo.vy);
        const maxSpd = 3.0;
        if (spd > maxSpd) {
          ufo.vx = (ufo.vx / spd) * maxSpd;
          ufo.vy = (ufo.vy / spd) * maxSpd;
        }

        ufo.x += ufo.vx;
        ufo.y += ufo.vy;

        const ux = ufo.x;
        const uy = ufo.y;
        const sz = ufo.size;
        const tilt = Math.sin(ufo.wobble) * 0.15;

        ctx.save();
        ctx.translate(ux, uy);
        ctx.rotate(tilt);

        // Tractor beam (bright triangle below UFO)
        const beamAlpha = 0.25 + Math.sin(ufo.wobble * 2) * 0.1;
        ctx.beginPath();
        ctx.moveTo(-sz * 0.3, sz * 0.15);
        ctx.lineTo(sz * 0.3, sz * 0.15);
        ctx.lineTo(sz * 0.8, sz * 2.5);
        ctx.lineTo(-sz * 0.8, sz * 2.5);
        ctx.closePath();
        const beamGrad = ctx.createLinearGradient(0, sz * 0.15, 0, sz * 2.5);
        beamGrad.addColorStop(0, `rgba(80, 255, 140, ${beamAlpha * 2})`);
        beamGrad.addColorStop(0.5, `rgba(100, 255, 160, ${beamAlpha})`);
        beamGrad.addColorStop(1, `rgba(120, 255, 180, 0)`);
        ctx.fillStyle = beamGrad;
        ctx.fill();

        // Dome (glass top)
        ctx.beginPath();
        ctx.ellipse(0, -sz * 0.15, sz * 0.35, sz * 0.35, 0, Math.PI, 0);
        const domeGrad = ctx.createRadialGradient(0, -sz * 0.3, 0, 0, -sz * 0.15, sz * 0.35);
        domeGrad.addColorStop(0, "rgba(180, 230, 255, 0.7)");
        domeGrad.addColorStop(1, "rgba(120, 200, 240, 0.3)");
        ctx.fillStyle = domeGrad;
        ctx.fill();

        // Body (saucer shape)
        ctx.beginPath();
        ctx.ellipse(0, 0, sz, sz * 0.3, 0, 0, Math.PI * 2);
        const bodyGrad = ctx.createLinearGradient(0, -sz * 0.3, 0, sz * 0.3);
        bodyGrad.addColorStop(0, "rgba(180, 190, 200, 0.85)");
        bodyGrad.addColorStop(0.5, "rgba(150, 160, 175, 0.9)");
        bodyGrad.addColorStop(1, "rgba(120, 130, 145, 0.8)");
        ctx.fillStyle = bodyGrad;
        ctx.fill();

        // Rim lights
        const numLights = 6;
        for (let i = 0; i < numLights; i++) {
          const la = (i / numLights) * Math.PI * 2 + ufo.wobble * 1.5;
          const lx = Math.cos(la) * sz * 0.75;
          const ly = Math.sin(la) * sz * 0.2;
          const lightAlpha = 0.7 + Math.sin(ufo.wobble * 3 + i) * 0.3;
          ctx.beginPath();
          ctx.arc(lx, ly, sz * 0.08, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80, 255, 140, ${lightAlpha})`;
          ctx.fill();
        }

        // Bottom center light
        const centerGlow = ctx.createRadialGradient(0, sz * 0.15, 0, 0, sz * 0.15, sz * 0.35);
        centerGlow.addColorStop(0, `rgba(80, 255, 140, ${0.7 + Math.sin(ufo.wobble * 2) * 0.2})`);
        centerGlow.addColorStop(0.6, `rgba(100, 255, 160, ${0.3 + Math.sin(ufo.wobble * 2) * 0.1})`);
        centerGlow.addColorStop(1, "rgba(120, 255, 180, 0)");
        ctx.beginPath();
        ctx.arc(0, sz * 0.15, sz * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = centerGlow;
        ctx.fill();

        ctx.restore();

        // Despawn once off-screen after mouse leaves
        const margin = 200;
        if (
          !mouseInSection &&
          ufo.life > 60 &&
          (ux < -margin ||
            ux > canvas.width + margin ||
            uy < -margin ||
            uy > canvas.height + margin)
        ) {
          ufo = null;
          ufoDismissed = true;
        }
      }

      animId = requestAnimationFrame(drawLight);
    }

    function draw(time) {
      const t = time / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spiral galaxy
      const gcx = canvas.width * 0.5;
      const gcy = canvas.height * 0.80;
      const coreR = Math.min(canvas.width, canvas.height) * 0.06;

      // Core glow (radial gradient)
      const coreGlow = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, coreR * 4);
      coreGlow.addColorStop(0, "rgba(200, 210, 255, 0.18)");
      coreGlow.addColorStop(0.3, "rgba(190, 200, 255, 0.08)");
      coreGlow.addColorStop(0.7, "rgba(180, 195, 255, 0.02)");
      coreGlow.addColorStop(1, "rgba(180, 195, 255, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(gcx, gcy, coreR * 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw precomputed galaxy stars with subtle twinkle
      for (const gs of galaxyStars) {
        const twinkle = Math.sin(t * 0.5 + gs.phase) * 0.15 + 0.85;
        const a = gs.alpha * twinkle;
        ctx.beginPath();
        ctx.arc(gs.x, gs.y, gs.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${gs.hue}, 50%, 85%, ${a})`;
        ctx.fill();
      }

      // Orbiting dust particles
      for (const d of galaxyDust) {
        const angle = d.baseAngle + t * d.speed;
        const x = d.cx + Math.cos(angle) * d.r;
        const y = d.cy + Math.sin(angle) * d.r * d.tilt;
        const pulse = Math.sin(t * 0.8 + angle) * 0.3 + 0.7;
        const a = d.alpha * pulse;
        ctx.beginPath();
        ctx.arc(x, y, d.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${d.hue}, 40%, 80%, ${a})`;
        ctx.fill();
      }

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
        if (edge === 0) {
          sx = -30;
          sy = Math.random() * canvas.height;
        } else if (edge === 1) {
          sx = canvas.width + 30;
          sy = Math.random() * canvas.height;
        } else if (edge === 2) {
          sx = Math.random() * canvas.width;
          sy = -30;
        } else {
          sx = Math.random() * canvas.width;
          sy = canvas.height + 30;
        }
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
        const targetX = mouseInSection
          ? mouseX
          : rocket.x + Math.cos(rocket.angle) * 100;
        const targetY = mouseInSection
          ? mouseY
          : rocket.y + Math.sin(rocket.angle) * 100;
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
          -sz * 0.3,
          0,
          -sz * 0.3 - flameLen,
          0,
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
          !mouseInSection &&
          rocket.life > 60 &&
          (rx < -margin ||
            rx > canvas.width + margin ||
            ry < -margin ||
            ry > canvas.height + margin)
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

    animId = requestAnimationFrame(isDark ? draw : drawLight);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      if (section) {
        section.removeEventListener("mousemove", onMouseMove);
        section.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [isDark]);

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
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [lightboxReady, setLightboxReady] = useState(false);
  const openLightbox = (photo) => {
    setLightboxPhoto(photo);
    setLightboxReady(false);
    const img = new window.Image();
    img.onload = () => setLightboxReady(true);
    img.src = photo.src;
  };
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
    if (!lightboxPhoto) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxPhoto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxPhoto]);

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
              const heights = [0, 0, 0];
              sorted.forEach((photo, i) => {
                const shortest = heights.indexOf(Math.min(...heights));
                const localIdx = cols[shortest].length;
                const h = (photo.caption || "")
                  .split("")
                  .reduce((a, ch) => ((a << 5) - a + ch.charCodeAt(0)) | 0, 0);
                const cardH = 160 + (Math.abs(h) % 5) * 30 + 50;
                cols[shortest].push({ photo, i: localIdx });
                heights[shortest] += cardH;
              });
              return cols.map((col, ci) => (
                <div
                  key={ci}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {col.map(({ photo, i }) => (
                    <FlipCard
                      key={i}
                      photo={photo}
                      index={i}
                      cardStyle={cardStyle}
                      c={c}
                      isDark={isDark}
                      onSelect={openLightbox}
                    />
                  ))}
                </div>
              ));
            })()}
          </div>
          {lightboxPhoto && (
            <div
              onClick={() => setLightboxPhoto(null)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.85)",
                zIndex: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "zoom-out",
              }}
            >
              {!lightboxReady ? (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    border: "3px solid rgba(255,255,255,0.15)",
                    borderTop: "3px solid #fff",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
              ) : (
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.caption || ""}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    borderRadius: 8,
                    cursor: "default",
                    animation: "fadeIn 0.3s ease",
                  }}
                />
              )}
            </div>
          )}
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
                          ></span>
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
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        {p.thumbnail ? (
                          <Image
                            src={p.thumbnail}
                            alt={p.name}
                            fill
                            style={{ objectFit: "contain", padding: 12 }}
                          />
                        ) : (
                          "▶ demo"
                        )}
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
                        {p.date && (
                          <p
                            style={{
                              color: c.muted,
                              fontSize: 11,
                              marginBottom: 4,
                            }}
                          >
                            {p.date}
                          </p>
                        )}
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
                          {(Array.isArray(p.desc)
                            ? p.desc[0]?.body || ""
                            : p.desc
                          ).slice(0, 130)}
                          ...
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
                  ["GitHub", "https://github.com/Solomon-Lee"],
                  ["LinkedIn", "https://linkedin.com/in/solomonslee"],
                  ["Resume PDF", "/resume.pdf"],
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
