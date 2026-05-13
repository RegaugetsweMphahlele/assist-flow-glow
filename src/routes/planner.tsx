import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { AppLayout } from "@/components/AppLayout";
import { OutputCard, callAi } from "@/components/AiOutput";

export const Route = createFileRoute("/planner")({ component: PlannerPage });

const SYSTEM = "You are a productivity coach and time management expert.";
const buildPrompt = (tasks: string, hours: number, deadline: string, pref: string) =>
  `Given these tasks: ${tasks}, ${hours} available hours per day, and a deadline of ${deadline}, create a prioritized schedule. Use the Eisenhower Matrix and a ${pref} approach. For each task assign a time block, a priority label using emojis (🔴 High / 🟡 Medium / 🟢 Low). End with a section "💡 Pro Tip:" containing one specific time optimization tip.`;

function PlannerPage() {
  const [tasks, setTasks] = useState("");
  const [hours, setHours] = useState(6);
  const [deadline, setDeadline] = useState("");
  const [pref, setPref] = useState("Balanced");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [usedPrompt, setUsedPrompt] = useState("");

  const run = async () => {
    if (!tasks.trim() || !deadline) return toast.error("Tasks and deadline required");
    const p = buildPrompt(tasks, hours, deadline, pref);
    setUsedPrompt(p);
    setLoading(true);
    setOutput("");
    try { setOutput(await callAi(SYSTEM, p)); }
    catch (e: any) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <AppLayout title="AI Task Planner" breadcrumb="Task Planner">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="glass-strong p-6 space-y-5">
          <div>
            <label className="label-caption block mb-2">Your Tasks</label>
            <textarea value={tasks} onChange={(e) => setTasks(e.target.value)} rows={8} className="input-field resize-none" placeholder="One task per line..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-caption block mb-2">Hours / Day</label>
              <input type="number" min={1} max={16} value={hours} onChange={(e) => setHours(+e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label-caption block mb-2">Deadline</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label-caption block mb-2">Priority Preference</label>
            <select value={pref} onChange={(e) => setPref(e.target.value)} className="input-field">
              <option>Urgency-first</option>
              <option>Importance-first</option>
              <option>Balanced</option>
            </select>
          </div>
          <button onClick={run} disabled={loading} className="btn-primary w-full">
            {loading ? "Planning..." : "Generate Schedule"}
          </button>
        </motion.div>

        <OutputCard output={output} loading={loading} onRegenerate={run} prompt={usedPrompt} placeholder="Your prioritized schedule will appear here" />
      </div>
    </AppLayout>
  );
}
