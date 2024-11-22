import { ToggleThemeComponent } from "@/components/shared";
import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next/server";

export const metadata: Metadata = {
  title: "Video Bot",
  description: "Hello World",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await getCookie("theme", { cookies })) ?? "light";

  return (
    <html lang="en">
      <body data-theme={theme} className={`antialiased h-screen w-full`}>
        {children}
        <ToggleThemeComponent />
      </body>
    </html>
  );
}
