import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { OutputCard, callAi } from "@/components/AiOutput";

export const Route = createFileRoute("/email")({ component: EmailGen });

const SYSTEM = "You are a senior business communication expert. Write professional, polished workplace emails.";
const buildPrompt = (subject: string, recipient: string, tone: string, context: string) =>
  `Write a ${tone} professional email to a ${recipient} about ${subject}. Context: ${context}. Use clear paragraphs, a professional greeting, and a polished sign-off. Keep it concise and workplace-appropriate.`;

const tones = ["Formal", "Friendly", "Persuasive"];
const recipients = ["Client", "Manager", "Team", "Colleague"];

function EmailGen() {
  const [subject, setSubject] = useState("");
  const [recipient, setRecipient] = useState("Client");
  const [tone, setTone] = useState("Formal");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedPrompt, setUsedPrompt] = useState("");

  const generate = async () => {
    if (!subject.trim() || !context.trim()) {
      toast.error("Please fill in subject and context");
      return;
    }
    const p = buildPrompt(subject, recipient, tone, context);
    setUsedPrompt(p);
    setLoading(true);
    setOutput("");
    try {
      const text = await callAi(SYSTEM, p);
      setOutput(text);
    } catch (e: any) {
      toast.error(e.message || "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Smart Email Generator" breadcrumb="Email Generator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-strong p-6 space-y-5">
          <div>
            <label className="label-caption block mb-2">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" placeholder="Quarterly review meeting" />
          </div>
          <div>
            <label className="label-caption block mb-2">Recipient Type</label>
            <select value={recipient} onChange={(e) => setRecipient(e.target.value)} className="input-field">
              {recipients.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="label-caption block mb-2">Tone</label>
            <div className="flex gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className="flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: tone === t ? "var(--gradient-primary)" : "rgba(99,102,241,0.08)",
                    border: `1px solid ${tone === t ? "transparent" : "rgba(99,102,241,0.2)"}`,
                    color: tone === t ? "white" : "var(--color-muted-foreground)",
                    boxShadow: tone === t ? "0 4px 16px rgba(99,102,241,0.3)" : "none",
                  }}
                >{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="label-caption block mb-2">Brief Context</label>
            <textarea value={context} onChange={(e) => setContext(e.target.value)} rows={6} className="input-field resize-none" placeholder="What's this email about? Key points to include..." />
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary w-full">
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </motion.div>

        <OutputCard output={output} loading={loading} onRegenerate={generate} prompt={usedPrompt} placeholder="Your professionally crafted email will appear here" />
      </div>
    </AppLayout>
  );
}
