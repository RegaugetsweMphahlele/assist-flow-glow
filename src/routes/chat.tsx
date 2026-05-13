import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/chat")({ component: ChatPage });

const suggestions = [
  "Help me write a report",
  "Summarize this email",
  "Plan my week",
  "What is prompt engineering?",
];

function ChatPage() {
  const [transport] = useState(() => new DefaultChatTransport({ api: "/api/chat" }));
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || status === "streaming" || status === "submitted") return;
    sendMessage({ text: t });
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); send(input); };
  const isBusy = status === "submitted" || status === "streaming";

  return (
    <AppLayout title="AI Chatbot" breadcrumb="Chatbot">
      <div className="glass-strong flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: "500px" }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">How can I help you today?</h3>
              <p className="text-sm text-muted-foreground mb-6">Your professional AI workplace assistant.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl w-full">
                {suggestions.map((s) => (
                  <motion.button
                    key={s} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => send(s)}
                    className="text-left text-sm px-4 py-3 rounded-xl transition-all hover:border-primary"
                    style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)" }}
                  >{s}</motion.button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m) => {
              const text = m.parts.map((p) => p.type === "text" ? p.text : "").join("");
              const isUser = m.role === "user";
              const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: isUser ? "var(--gradient-primary)" : "rgba(99,102,241,0.12)" }}>
                    {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4" style={{ color: "var(--color-primary)" }} />}
                  </div>
                  <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
                    <div className={`px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${isUser ? "rounded-2xl rounded-tr-sm text-white" : "glass rounded-2xl rounded-tl-sm"}`}
                      style={isUser ? { background: "var(--gradient-primary)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" } : undefined}>
                      {text}
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1">{time}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isBusy && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(99,102,241,0.12)" }}>
                <Bot className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="p-4 border-t border-[rgba(99,102,241,0.15)] flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
            rows={1}
            placeholder="Message WorkFlow AI..."
            className="input-field resize-none flex-1"
            style={{ maxHeight: "120px" }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            type="submit" disabled={isBusy || !input.trim()}
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-50"
            style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}
          >
            <Send className="w-4 h-4 text-white" />
          </motion.button>
        </form>
      </div>
    </AppLayout>
  );
}
