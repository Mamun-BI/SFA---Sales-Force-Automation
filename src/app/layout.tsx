import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { AuthProvider } from "@/context/AuthContext";
import { PWASetup } from "@/components/PWASetup";
import { ToastProvider } from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SalesFlow | Field Sales Dashboard",
    template: "%s | SalesFlow",
  },
  applicationName: "SalesFlow",
  description: "A fictional field sales dashboard demo for portfolio showcase.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "SalesFlow",
    statusBarStyle: "black-translucent",
  },
};

export const viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900 antialiased`}>
        <PWASetup />
        <ToastProvider>
          <AuthProvider>
            <div className="min-h-screen flex justify-center">
              <main className="w-full max-w-md min-h-screen bg-white shadow-xl relative">
                {children}
              </main>
              <BottomNav />
            </div>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
