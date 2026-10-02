import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./atelier.css";
import { StoreProvider } from "@/components/store-provider";
import { StoreFooter, StoreHeader } from "@/components/store-header";
import { StyleChat } from "@/components/style-chat";

export const metadata: Metadata = {
  title: "VELMORA | Contemporary Nigerian Womenswear",
  description: "Shop dresses, sets, and tops at VELMORA. Browse the collection, choose your size, and send an order request.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><StoreProvider><StoreHeader/>{children}<StoreFooter/><StyleChat/></StoreProvider></body>
    </html>
  );
}
