import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider, Show } from "@clerk/nextjs";
import "./globals.css"
import "lenis/dist/lenis.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNavigation } from "@/components/main-nav"
import { GlobalUserProvisioner } from "@/components/GlobalUserProvisioner";
import { RoleRedirector } from "@/components/RoleRedirector";
import LenisRoot from "@/components/LenisRoot";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Aptiview - AI-Powered Hiring Platform",
    template: "%s | Aptiview",
  },
  description:
    "Revolutionize your hiring process with Aptiview's intelligent platform. Leverage AI-powered interviews, real-time analytics, and bias-free candidate evaluation to find top talent faster.",
  keywords: [
    "AI hiring",
    "recruitment AI",
    "AI interviews",
    "talent acquisition",
    "HR tech",
    "candidate screening",
    "bias-free hiring",
  ],
  openGraph: {
    title: "Aptiview - AI-Powered Hiring Platform",
    description:
      "Revolutionize your hiring process with Aptiview's intelligent platform. Leverage AI-powered interviews, real-time analytics, and bias-free candidate evaluation to find top talent faster.",
    url: "https://aptiview.com",
    siteName: "Aptiview",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Aptiview - AI-Powered Hiring Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aptiview - AI-Powered Hiring Platform",
    description:
      "Revolutionize your hiring process with Aptiview's intelligent platform. Leverage AI-powered interviews, real-time analytics, and bias-free candidate evaluation to find top talent faster.",
    creator: "@aptiview",
    images: ["/placeholder.svg?height=675&width=1200"],
  },
  authors: [{ name: "Aptiview Team" }],
  creator: "Aptiview",
  publisher: "Aptiview",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const clerkPk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim()

  if (!clerkPk) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <div className="mx-auto max-w-lg px-6 py-16 text-center text-gray-800">
            <h1 className="text-xl font-semibold tracking-tight">Aptiview — configuration needed</h1>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              This Vercel project is missing{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{" "}
              (and usually{" "}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs">CLERK_SECRET_KEY</code>
              ). Open{" "}
              <strong>Vercel → this project → Settings → Environment Variables</strong>, add them for{" "}
              <strong>Production</strong>, then redeploy. Copy values from your{" "}
              <a className="text-blue-600 underline" href="https://dashboard.clerk.com">
                Clerk dashboard
              </a>
              .
            </p>
          </div>
        </body>
      </html>
    )
  }

  return (
    <ClerkProvider>
      <Show when="signed-in">
        <GlobalUserProvisioner />
        <RoleRedirector />
      </Show>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LenisRoot>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
            storageKey="talent-ai-theme"
          >
            <MainNavigation />
            <div className="pt-16 bg-gray-50/50 dark:bg-gray-900 min-h-[calc(100vh-4rem)]">{children}</div>
          </ThemeProvider>
        </LenisRoot>
      </body>
    </html>
    </ClerkProvider>
  )
}