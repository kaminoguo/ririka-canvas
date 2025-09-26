import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIRIKA's Canvas",
  description: "A pixel art digital canvas - RIRIKA's personal portfolio",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
