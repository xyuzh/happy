import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AudioProvider from "@/components/AudioProvider";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Can you be my friend?",
  description: "Be my friend, can make you happy",
  keywords: ["friend", "companionship", "virtual friend", "chat"],
  authors: [{ name: "Xinyu Zhang" }],
  openGraph: {
    title: "Can you be my friend?",
    description: "Be my friend, can make you happy",
    url: "https://affa.ai",
    siteName: "Virtual Friend",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://affa.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AudioProvider>
          {children}
        </AudioProvider>
        <Analytics />
      </body>
    </html>
  );
}
