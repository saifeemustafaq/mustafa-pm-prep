import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import CacheControl from '@/components/CacheControl';
import { ProgressProvider } from '@/contexts/ProgressContext';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { AnalyticsWrapper } from '@/components/AnalyticsWrapper';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PM Interview Prep",
  description: "Practice platform for Product Manager interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} bg-white`}>
        <AnalyticsWrapper>
          <ProgressProvider>
            <div className="flex min-h-screen bg-white">
              <Sidebar />
              <main className="flex-1 ml-60 p-8 bg-white">
                {children}
              </main>
              <CacheControl />
            </div>
          </ProgressProvider>
        </AnalyticsWrapper>
      </body>
    </html>
  );
}
