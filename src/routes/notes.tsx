import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { OutputCard, callAi } from "@/components/AiOutput";

export const Route = createFileRoute("/notes")({ component: NotesPage });

const SYSTEM = "You are an expert meeting facilitator and executive assistant.";
const buildPrompt = (notes: string) =>
  `Analyze the notes below and return exactly: 1) A 3-sentence Summary, 2) Key Decisions as bullet points, 3) Action Items — each with task, owner, and deadline, 4) Next Steps. Be concise and structured. Use clear section headings (Summary, Key Decisions, Action Items, Next Steps).\n\nNOTES:\n${notes}`;

function NotesPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedPrompt, setUsedPrompt] = useState("");

  const run = async () => {
    if (!notes.trim()) return toast.error("Paste your meeting notes first");
    const p = buildPrompt(notes);
    setUsedPrompt(p);
    setLoading(true);
    setOutput("");
    try {
      setOutput(await callAi(SYSTEM, p));
    } catch (e: any) {
      toast.error(e.message);
    } finally { setLoading(false); }
  };

  return (
    <AppLayout title="Meeting Notes Summarizer" breadcrumb="Notes Summarizer">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-strong p-6 space-y-5">
          <div>
            <label className="label-caption block mb-2">Raw Meeting Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={16} className="input-field resize-none font-mono text-sm" placeholder="Paste your raw meeting notes here..." />
          </div>
          <button onClick={run} disabled={loading} className="btn-primary w-full">
            {loading ? "Summarizing..." : "Summarize Notes"}
          </button>
        </motion.div>

        <OutputCard output={output} loading={loading} onRegenerate={run} prompt={usedPrompt} placeholder="Structured summary will appear here" />
      </div>
    </AppLayout>
  );
}
