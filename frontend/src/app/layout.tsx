import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Video Bot",
  description: "Hello World",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookie = await cookies();
  const theme = (await cookie.get("theme")) || "light";

  return (
    <html lang="en">
      <body data-theme={theme} className={`antialiased h-screen`}>
        {children}
      </body>
    </html>
  );
}
