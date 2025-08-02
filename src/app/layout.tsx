import { AppContext } from "@/components/context";
import { ThemeToggle } from "@/components/theme/toggle";
import { getSession } from "@/lib/auth/server";
import { meta } from "@/lib/config";
import { code, display, text } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: `%s | ${meta.title}`,
    default: meta.title,
  },
  description: meta.description,
  keywords: meta.keywords,
  authors: [{ name: meta.author }],
};

export const viewport: Viewport = {
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: `${meta.colors.dark}` },
    { media: "(prefers-color-scheme: light)", color: `${meta.colors.light}` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          display.variable,
          text.variable,
          code.variable,
          "antialiased"
        )}
      >
        <AppContext>
          <div className="absolute top-0 right-0 p-4 z-50">
            <ThemeToggle />
          </div>
          <Suspense>
            <Session />
          </Suspense>
          {children}
        </AppContext>
      </body>
    </html>
  );
}

async function Session() {
  const { user } = await getSession();
  return user ? (
    <span>{user.name}</span>
  ) : (
    <div>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
    </div>
  );
}
