import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw, Edit3, Info, Check } from "lucide-react";
import { toast } from "sonner";

export function SkeletonLoader() {
  return (
    <div className="space-y-3">
      <div className="skeleton-pulse h-4 w-3/4" />
      <div className="skeleton-pulse h-4 w-full" />
      <div className="skeleton-pulse h-4 w-5/6" />
      <div className="skeleton-pulse h-4 w-2/3" />
      <div className="skeleton-pulse h-4 w-4/5" />
    </div>
  );
}

export function TypingText({ text, speed = 8 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <div className="whitespace-pre-wrap text-[15px] leading-relaxed">{shown}<span className="inline-block w-[2px] h-4 ml-0.5 align-middle" style={{ background: "var(--color-primary)", opacity: shown.length < text.length ? 1 : 0 }} /></div>;
}

export function OutputCard({
  output,
  loading,
  onRegenerate,
  prompt,
  placeholder,
}: {
  output: string;
  loading: boolean;
  onRegenerate?: () => void;
  prompt?: string;
  placeholder?: string;
}) {
  const [editable, setEditable] = useState(false);
  const [edited, setEdited] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => { setEdited(output); }, [output]);

  const copy = async () => {
    await navigator.clipboard.writeText(editable ? edited : output);
    setCopied(true);
    toast.success("Copied to clipboard ✓");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-strong p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="label-caption">Output</span>
          <div title="This content was AI-generated" className="cursor-help">
            <Info className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
        {output && !loading && (
          <div className="flex items-center gap-1.5">
            <IconBtn onClick={() => setEditable((v) => !v)} title="Edit"><Edit3 className="w-3.5 h-3.5" /></IconBtn>
            {onRegenerate && <IconBtn onClick={onRegenerate} title="Regenerate"><RefreshCw className="w-3.5 h-3.5" /></IconBtn>}
            <IconBtn onClick={copy} title="Copy">{copied ? <Check className="w-3.5 h-3.5" style={{ color: "var(--color-success)" }} /> : <Copy className="w-3.5 h-3.5" />}</IconBtn>
          </div>
        )}
      </div>

      <div className="min-h-[200px]">
        {loading ? (
          <SkeletonLoader />
        ) : output ? (
          editable ? (
            <textarea value={edited} onChange={(e) => setEdited(e.target.value)} rows={14} className="input-field font-mono text-sm" />
          ) : (
            <TypingText text={output} />
          )
        ) : (
          <div className="text-muted-foreground text-sm flex items-center justify-center h-[200px] text-center">
            {placeholder ?? "Output will appear here"}
          </div>
        )}
      </div>

      {prompt && output && (
        <div className="mt-4 pt-4 border-t border-[rgba(99,102,241,0.12)]">
          <button onClick={() => setShowPrompt((v) => !v)} className="label-caption hover:text-primary transition-colors">
            {showPrompt ? "▼" : "▶"} View Prompt Used
          </button>
          {showPrompt && (
            <pre className="mt-2 p-3 text-xs rounded-lg overflow-x-auto" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(99,102,241,0.15)", color: "var(--color-muted-foreground)" }}>
              {prompt}
            </pre>
          )}
        </div>
      )}
    </motion.div>
  );
}

function IconBtn({ children, ...props }: any) {
  return (
    <button {...props} className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all hover:scale-110"
      style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
      {children}
    </button>
  );
}

export async function callAi(system: string, prompt: string): Promise<string> {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, prompt }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `Request failed (${res.status})`);
  }
  const data = await res.json();
  return data.text;
}
