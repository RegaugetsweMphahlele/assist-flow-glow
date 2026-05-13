import { createFileRoute, Link } from "@tanstack/react-router";
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

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const date = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  return (
    <AppLayout title={`${greeting()}, let's get productive.`} breadcrumb="Dashboard">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="label-caption mb-8 -mt-2">
        {date}
      </motion.p>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            className="glass p-5 hover:border-[rgba(99,102,241,0.4)] transition-all"
          >
            <div className="label-caption">{s.label}</div>
            <div className="flex items-end justify-between mt-2">
              <div className="text-3xl font-bold tracking-tight">{s.value}</div>
              <div className="flex items-center gap-1 text-xs" style={{ color: "var(--color-success)" }}>
                <TrendingUp className="w-3 h-3" /> {s.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-4 h-4" style={{ color: "var(--color-accent-glow)" }} />
        <h2 className="text-lg font-semibold">Your AI Toolkit</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.to}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass p-6 group cursor-pointer transition-all hover:shadow-[0_8px_32px_rgba(99,102,241,0.25)] hover:border-[rgba(99,102,241,0.5)]"
            >
              <Link to={f.to} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: "var(--gradient-primary)", boxShadow: "0 4px 16px rgba(99,102,241,0.3)" }}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[17px] mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--color-primary)" }}>
                    Launch <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
}
