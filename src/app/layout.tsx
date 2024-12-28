import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import CacheControl from '@/components/CacheControl';
import { ProgressProvider } from '@/contexts/ProgressContext';

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
      <body className={inter.className}>
        <ProgressProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-60 p-8">
              {children}
            </main>
            <CacheControl />
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
