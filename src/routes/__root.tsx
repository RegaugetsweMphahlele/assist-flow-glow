import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-strong p-10">
        <h1 className="text-7xl font-bold gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This page doesn't exist.</p>
        <div className="mt-6">
          <Link to="/" className="btn-primary inline-block">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass-strong p-10">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary mt-6">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WorkFlow AI — Premium Workplace Productivity Assistant" },
      { name: "description", content: "AI-powered workplace productivity suite. Generate emails, summarize meetings, plan tasks, research, and chat — all in one premium interface." },
      { name: "author", content: "WorkFlow AI" },
      { property: "og:title", content: "WorkFlow AI — Premium Workplace Productivity Assistant" },
      { property: "og:description", content: "AI-powered workplace productivity suite. Generate emails, summarize meetings, plan tasks, research, and chat — all in one premium interface." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "WorkFlow AI — Premium Workplace Productivity Assistant" },
      { name: "twitter:description", content: "AI-powered workplace productivity suite. Generate emails, summarize meetings, plan tasks, research, and chat — all in one premium interface." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/65a816a2-2373-4ea9-b2f2-ad51f2c75f2f/id-preview-51087a05--46130dd8-8824-4ca5-8565-dd711cd4e6ab.lovable.app-1778693169716.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/65a816a2-2373-4ea9-b2f2-ad51f2c75f2f/id-preview-51087a05--46130dd8-8824-4ca5-8565-dd711cd4e6ab.lovable.app-1778693169716.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster theme="dark" position="top-right" toastOptions={{
        style: { background: "rgba(17,24,39,0.95)", border: "1px solid rgba(99,102,241,0.3)", color: "#F9FAFB", backdropFilter: "blur(12px)" }
      }} />
    </QueryClientProvider>
  );
}
