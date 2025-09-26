import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Canvas",
  description: "An infinite canvas for my thoughts and creations",
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
