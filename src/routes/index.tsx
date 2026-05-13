import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, FileText, Calendar, Search, MessageSquare, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

export const Route = createFileRoute("/")({ component: Dashboard });

const features = [
  { to: "/email", title: "Smart Email Generator", desc: "Craft polished professional emails in any tone, instantly.", icon: Mail },
  { to: "/notes", title: "Meeting Notes Summarizer", desc: "Turn raw notes into summaries, decisions, and action items.", icon: FileText },
  { to: "/planner", title: "AI Task Planner", desc: "Prioritized schedules built around your hours and deadlines.", icon: Calendar },
  { to: "/research", title: "Research Assistant", desc: "Insights, summaries, and recommendations from any topic.", icon: Search },
  { to: "/chat", title: "AI Chatbot", desc: "Your always-on workplace AI companion.", icon: MessageSquare },
];

const stats = [
  { label: "Tasks Generated Today", value: "248", trend: "+12%" },
  { label: "Emails Written", value: "1,420", trend: "+8%" },
  { label: "Notes Summarized", value: "76", trend: "+24%" },
];

const HEADLINE = "Welcome back, let's get productive.";

function Dashboard() {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
  }, []);

  return (
    <AppLayout title="Welcome" breadcrumb="Dashboard">
      <div className="relative">
        {/* Aurora background blobs */}
        <div className="pointer-events-none absolute -inset-10 overflow-hidden -z-10">
          <motion.div
            className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, var(--color-primary), transparent 70%)" }}
            animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-25"
            style={{ background: "radial-gradient(circle, var(--color-secondary), transparent 70%)" }}
            animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 left-1/3 w-[360px] h-[360px] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, var(--color-accent-glow), transparent 70%)" }}
            animate={{ x: [0, 40, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.h2
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.025 } } }}
          className="text-[26px] md:text-[34px] font-bold tracking-tight -mt-2 mb-2 flex flex-wrap"
          aria-label={HEADLINE}
        >
          {HEADLINE.split("").map((ch, i) => {
            const start = HEADLINE.indexOf("productive");
            const isAccent = i >= start && i < start + 10;
            return (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={isAccent ? "gradient-text" : ""}
                style={{ display: "inline-block", whiteSpace: "pre" }}
              >
                {ch}
              </motion.span>
            );
          })}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="label-caption mb-8 flex items-center gap-2"
        >
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--color-success)", boxShadow: "0 0 8px var(--color-success)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          {date} · All systems online
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass p-5 relative overflow-hidden group hover:border-[rgba(99,102,241,0.4)] transition-all"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), transparent 60%)" }}
              />
              <div className="label-caption relative">{s.label}</div>
              <div className="flex items-end justify-between mt-2 relative">
                <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-success)" }}>
                  <TrendingUp className="w-3 h-3" /> {s.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
          className="flex items-center gap-2 mb-5"
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "var(--color-accent-glow)" }} />
          </motion.div>
          <h2 className="text-lg font-semibold">Your AI Toolkit</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="glass p-6 group cursor-pointer relative overflow-hidden transition-all hover:shadow-[0_8px_40px_rgba(99,102,241,0.35)] hover:border-[rgba(99,102,241,0.5)]"
              >
                <div
                  className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.05) 50%, transparent)" }}
                />
                <Link to={f.to} className="flex items-start gap-4 relative">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[17px] mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                      Launch <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
