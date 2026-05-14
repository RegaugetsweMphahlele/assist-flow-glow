# NEXUS - AI Workplace Productivity Assistant

---

## 📌 Overview

**NEXUS** is an AI-powered workplace productivity dashboard that helps professionals automate five core administrative tasks using artificial intelligence. Built as a single integrated platform with a clean SaaS-style interface, NEXUS addresses the daily challenges of email drafting, meeting documentation, task planning, research synthesis, and general workplace queries.

> *"Professionals spend an average of 2.5 hours per day on emails alone — NEXUS gives that time back."*

---

## 🚀 Live Demo

**[Click here to view the live application](https://assist-flow-glow-regaugetswe-mphahlele.lovable.app/)**

---

## 📸 Screenshots

### Dashboard Overview

<img src="Screenshot 2026-05-14 125316.png" alt="Dashboard" width="800"/>

*The main dashboard showing key metrics and quick access to all five AI tools.*

---

### Smart Email Generator

<img src="Screenshot 2026-05-14 125332.png" alt="Email Generator" width="800"/>

*Generate professional emails with tone (Formal/Friendly/Persuasive) and audience control.*

---

### Meeting Notes Summarizer

<img src="Screenshot 2026-05-14 125344.png" alt="Notes Summarizer" width="800"/>

*Transform raw meeting notes into structured summaries with decisions, action items, and next steps.*

---

### AI Task Planner

<img src="Screenshot 2026-05-14 125405.png" alt="Task Planner" width="800"/>

*Create prioritized daily schedules using the Eisenhower Matrix based on your tasks, hours, and deadlines.*

---

### AI Research Assistant

<img src="Screenshot 2026-05-14 125420.png" alt="Research Assistant" width="800"/>

*Get instant summaries, key insights, and actionable recommendations from any topic or article.*

---

### AI Chatbot Interface

<img src="Screenshot 2026-05-14 125435.png" alt="AI Chatbot" width="800"/>

*Interactive workplace assistant for open-ended queries and professional guidance.*

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **📧 Smart Email Generator** | Generate professional emails with tone control (Formal/Friendly/Persuasive) and recipient-specific customization |
| **📝 Meeting Notes Summarizer** | Extract decisions, action items with owners, deadlines, and next steps from raw meeting notes |
| **📋 AI Task Planner** | Build prioritized daily/weekly schedules using the Eisenhower Matrix with time optimization tips |
| **🔬 AI Research Assistant** | Summarize topics and provide 5 key insights + 3 actionable recommendations instantly |
| **💬 AI Chatbot** | Interactive workplace assistant for open-ended queries with context awareness |

### Design Principles
- ✅ **Single dashboard** — All tools accessible from one sidebar navigation
- ✅ **Editable outputs** — Every AI-generated result can be reviewed and modified
- ✅ **Responsive design** — Fully functional on mobile and desktop devices
- ✅ **Prompt transparency** — Each feature displays the underlying prompt strategy
- ✅ **Responsible AI** — Disclaimers and validation guidance built into the UI

---

## 🛠️ Technologies Used

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React.js |
| **Styling** | Tailwind CSS |
| **AI Model** | Claude (Anthropic) via API |
| **Build Tool** | Lovable AI |
| **Version Control** | GitHub |

---

## 🧠 Prompt Engineering Examples

Each feature uses a structured role-based prompt with dynamic variable injection:

| Feature | Sample System Prompt |
|---------|---------------------|
| **Email Generator** | *"You are a professional business communication expert. Generate a [TONE] email to a [RECIPIENT_TYPE] about [SUBJECT]. Context: [CONTEXT]. Structure with greeting, body, and sign-off."* |
| **Notes Summarizer** | *"Analyze meeting notes and return: 1) 3-sentence summary, 2) Key Decisions, 3) Action Items with owner/deadline, 4) Next Steps."* |
| **Task Planner** | *"Create a prioritized schedule using the Eisenhower Matrix. Label tasks High/Medium/Low priority. Include a time optimization tip."* |
| **Research Assistant** | *"Return: 1) 4-sentence summary, 2) 5 key insights, 3) 3 actionable recommendations. Avoid jargon."* |
| **AI Chatbot** | *"Respond helpfully, concisely, and professionally. If unsure, say so honestly rather than guessing."* |

### Prompt Techniques Applied
- 🎭 **Role assignment** — AI given specific professional persona per feature
- 📐 **Output structure** — Prompts specify numbered sections and bullet formats
- 🔄 **Variable injection** — User inputs dynamically inserted
- ⚡ **Constraint setting** — Word limits prevent verbose outputs
- 🎯 **Honest fallback** — Chatbot acknowledges uncertainty

---

## 📊 Problem Statement & Solution

### Four Core Pain Points Addressed:
1. ✍️ Drafting professional emails from scratch for every communication
2. 📋 Manually transcribing and summarizing meeting notes
3. ⏰ Struggling to prioritize tasks without a structured system
4. 🔍 Spending excessive time researching topics and synthesizing information

### NEXUS solves these through:
> A single, integrated AI-powered platform that automates these tasks — allowing professionals to focus on higher-value work.

---

## 🛡️ Responsible AI Statement

This project was built with **responsible AI use as a core design requirement**:

- ✏️ **All AI outputs are editable** — users are always in control of final content
- ⚠️ **Disclaimer on every screen** — reminding users to review AI outputs
- 📢 **Known limitations acknowledged** — AI can produce biased, outdated, or incorrect information
- 🔒 **No data storage** — No personal or sensitive data is logged
- 👁️ **Prompt transparency** — System prompts are viewable in each feature

> *"AI tools are assistants, not authorities. Human review and critical thinking remain essential."*

---

## 🎯 Evaluation Criteria Alignment

| Criteria | How NEXUS Addresses It |
|----------|------------------------|
| **Problem Relevance (20%)** | Targets repetitive workplace tasks faced daily by professionals |
| **Prompt Engineering (25%)** | Structured, role-specific prompts with tone, audience, and format parameters |
| **Functionality (25%)** | All 5 features produce accurate, editable AI outputs with real-time generation |
| **Innovation (15%)** | Single integrated dashboard combining 5 tools with prompt transparency |
| **Responsible AI (10%)** | Footer disclaimer, documented limitations, editable outputs |
| **Presentation (5%)** | Live demo with walkthrough of each feature |

---

## 📁 Project Structure

📦 nexus-ai-assistant/
│
├── 📄 README.md
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 vite.config.ts
├── 📄 bun.lock
├── 📄 bunfig.toml
├── 📄 components.json
├── 📄 eslint.config.js
├── 📄 .env
├── 📄 .gitignore
├── 📄 prettierignore
├── 📄 prettierrc
├── 📄 wrangler.jsonc
│
├── 📁 .lovable/
│ └── 📄 project.json
│
├── 📁 src/
│ ├── 📄 router.tsx
│ ├── 📄 routeTree.gen.ts
│ ├── 📄 server.ts
│ ├── 📄 start.ts
│ ├── 📄 styles.css
│ │
│ ├── 📁 components/
│ │ ├── 📄 AiOutput.tsx
│ │ ├── 📄 AppLayout.tsx
│ │ │
│ │ └── 📁 ui/
│ │ ├── 📄 accordion.tsx
│ │ ├── 📄 alert.tsx
│ │ ├── 📄 alert-dialog.tsx
│ │ ├── 📄 aspect-ratio.tsx
│ │ ├── 📄 avatar.tsx
│ │ ├── 📄 badge.tsx
│ │ ├── 📄 breadcrumb.tsx
│ │ ├── 📄 button.tsx
│ │ ├── 📄 calendar.tsx
│ │ ├── 📄 card.tsx
│ │ ├── 📄 carousel.tsx
│ │ ├── 📄 chart.tsx
│ │ ├── 📄 checkbox.tsx
│ │ ├── 📄 collapsible.tsx
│ │ ├── 📄 command.tsx
│ │ ├── 📄 context-menu.tsx
│ │ ├── 📄 dialog.tsx
│ │ ├── 📄 drawer.tsx
│ │ ├── 📄 dropdown-menu.tsx
│ │ ├── 📄 form.tsx
│ │ ├── 📄 hover-card.tsx
│ │ ├── 📄 input.tsx
│ │ ├── 📄 input-otp.tsx
│ │ ├── 📄 label.tsx
│ │ ├── 📄 menubar.tsx
│ │ ├── 📄 navigation-menu.tsx
│ │ ├── 📄 pagination.tsx
│ │ ├── 📄 popover.tsx
│ │ ├── 📄 progress.tsx
│ │ ├── 📄 radio-group.tsx
│ │ ├── 📄 resizable.tsx
│ │ ├── 📄 scroll-area.tsx
│ │ ├── 📄 select.tsx
│ │ ├── 📄 separator.tsx
│ │ ├── 📄 sheet.tsx
│ │ ├── 📄 sidebar.tsx
│ │ ├── 📄 skeleton.tsx
│ │ ├── 📄 slider.tsx
│ │ ├── 📄 sonner.tsx
│ │ ├── 📄 switch.tsx
│ │ ├── 📄 table.tsx
│ │ ├── 📄 tabs.tsx
│ │ ├── 📄 textarea.tsx
│ │ ├── 📄 toggle.tsx
│ │ ├── 📄 toggle-group.tsx
│ │ └── 📄 tooltip.tsx
│ │
│ ├── 📁 hooks/
│ │ └── 📄 use-mobile.tsx
│ │
│ ├── 📁 integrations/
│ │ └── 📁 supabase/
│ │ ├── 📄 auth-middleware.tsx
│ │ ├── 📄 client.server.ts
│ │ ├── 📄 client.ts
│ │ └── 📄 types.ts
│ │
│ ├── 📁 lib/
│ │ ├── 📄 ai-gateway.ts
│ │ ├── 📄 error-capture.ts
│ │ ├── 📄 error-page.ts
│ │ └── 📄 utils.ts
│ │
│ └── 📁 routes/
│ ├── 📄 __root.tsx
│ ├── 📄 index.tsx
│ ├── 📄 chat.tsx
│ ├── 📄 email.tsx
│ ├── 📄 notes.tsx
│ ├── 📄 planner.tsx
│ ├── 📄 research.tsx
│ │
│ └── 📁 api/
│ ├── 📄 chat.ts
│ └── 📄 generate.ts
│
└── 📁 supabase/
└── 📄 config.toml


---

## 📱 Responsive Design

NEXUS is fully responsive and works seamlessly on:
- 💻 Desktop computers
- 📱 Tablets
- 📲 Mobile phones

---

## 👨‍💻 Author

**Regaugetswe Mphahlele**  
CAPACITI AI Skills Accelerator Programme — Week 2 Project

---

## 📄 License

This project was created for educational purposes as part of the CAPACITI AI Skills Accelerator Programme.

---

### 🚀 Ready to boost your productivity?

**[!Live Demo](https://assist-flow-glow-regaugetswe-mphahlele.lovable.app/)**

---

*Submitted for CAPACITI AI Skills Accelerator Programme — Week 2 Project*


