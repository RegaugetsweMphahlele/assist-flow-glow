import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { OutputCard, callAi } from "@/components/AiOutput";

export const Route = createFileRoute("/research")({ component: ResearchPage });

const SYSTEM = "You are a senior research analyst.";
const buildPrompt = (topic: string, focus: string) =>
  `For the following topic or article, provide: 1) A 4-sentence plain-language Summary, 2) Exactly 5 Key Insights as bullet points, 3) Exactly 3 actionable Recommendations. Avoid jargon. Be insightful and direct.${focus ? ` Focus area: ${focus}.` : ""}\n\nTOPIC/ARTICLE:\n${topic}`;

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [focus, setFocus] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedPrompt, setUsedPrompt] = useState("");

  const run = async () => {
    if (!topic.trim()) return toast.error("Topic required");
    const p = buildPrompt(topic, focus);
    setUsedPrompt(p);
    setLoading(true);
    setOutput("");
    try { setOutput(await callAi(SYSTEM, p)); }
    catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <AppLayout title="AI Research Assistant" breadcrumb="Research Assistant">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-strong p-6 space-y-5">
          <div>
            <label className="label-caption block mb-2">Topic or Article</label>
            <textarea value={topic} onChange={(e) => setTopic(e.target.value)} rows={12} className="input-field resize-none" placeholder="Paste an article or enter a topic to research..." />
          </div>
          <div>
            <label className="label-caption block mb-2">Focus Area (optional)</label>
            <input value={focus} onChange={(e) => setFocus(e.target.value)} className="input-field" placeholder="e.g. focus on business impact" />
          </div>
          <button onClick={run} disabled={loading} className="btn-primary w-full">
            {loading ? "Researching..." : "Analyze Topic"}
          </button>
        </motion.div>

        <OutputCard output={output} loading={loading} onRegenerate={run} prompt={usedPrompt} placeholder="Summary, insights & recommendations will appear here" />
      </div>
    </AppLayout>
  );
}
