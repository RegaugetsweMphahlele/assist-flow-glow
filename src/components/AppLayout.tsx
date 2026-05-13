import { ReactNode, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, LayoutDashboard, Mail, FileText, Calendar, Search, MessageSquare, Shield, ChevronRight } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/notes", label: "Notes Summarizer", icon: FileText },
  { to: "/planner", label: "Task Planner", icon: Calendar },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
];

export function AppLayout({ children, title, breadcrumb }: { children: ReactNode; title: string; breadcrumb?: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="relative min-h-screen flex w-full">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-[240px] fixed inset-y-0 left-0 z-30 border-r border-[rgba(99,102,241,0.15)]"
        style={{ background: "var(--color-sidebar-bg)" }}>
        <div className="px-5 py-6 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="font-bold text-[17px] tracking-tight">WorkFlow <span className="gradient-text">AI</span></div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = path === item.to;
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="block relative">
                <motion.div
                  whileHover={{ x: 2 }}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={active ? { background: "rgba(99,102,241,0.12)" } : undefined}
                >
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-r-full"
                      style={{ background: "var(--color-primary)", boxShadow: "0 0 12px var(--color-primary)" }}
                    />
                  )}
                  <Icon className={`w-[18px] h-[18px] transition-transform group-hover:scale-110 ${active ? "text-primary" : ""}`} />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-[rgba(99,102,241,0.12)]">
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <Shield className="w-3.5 h-3.5" style={{ color: "var(--color-success)" }} />
            <span className="text-muted-foreground">Responsible AI</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-[240px] min-h-screen flex flex-col relative z-10 pb-24 md:pb-0">
        <header className="sticky top-0 z-20 px-6 md:px-10 py-5 backdrop-blur-xl border-b border-[rgba(99,102,241,0.1)]"
          style={{ background: "rgba(10,15,30,0.7)" }}>
          <div className="flex items-center gap-2 text-xs label-caption mb-1.5">
            <span>WorkFlow AI</span>
            <ChevronRight className="w-3 h-3" />
            <span style={{ color: "var(--color-primary)" }}>{breadcrumb ?? title}</span>
          </div>
          <h1 className="text-[28px] md:text-[32px] font-bold tracking-tight">{title}</h1>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="px-6 md:px-10 py-4 mt-auto border-l-2"
          style={{ borderLeftColor: "var(--color-warning)", background: "rgba(245,158,11,0.04)" }}>
          <p className="text-xs text-muted-foreground">
            <span style={{ color: "var(--color-warning)" }}>⚠</span> AI-generated content may contain errors. Always review before use. WorkFlow AI is designed to assist, not replace, human judgement.
          </p>
        </footer>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[rgba(99,102,241,0.2)] backdrop-blur-xl"
        style={{ background: "rgba(13,17,23,0.95)" }}>
        <div className="grid grid-cols-6 px-1 py-2">
          {navItems.map((item) => {
            const active = path === item.to;
            const Icon = item.icon;
            return (
              <Link key={item.to} to={item.to} className="flex flex-col items-center justify-center gap-1 py-1.5 min-h-[44px]">
                <Icon className="w-5 h-5" style={{ color: active ? "var(--color-primary)" : "var(--color-muted-foreground)" }} />
                {active && <div className="w-1 h-1 rounded-full" style={{ background: "var(--color-primary)" }} />}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
