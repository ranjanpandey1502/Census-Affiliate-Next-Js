import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme/ThemeProvider";
import NotificationProvider from "@/providers/notification/NotificationProvider";
import AuthProvider from "@/providers/auth/AuthProvider";

export const metadata: Metadata = {
  title: "Census Travel Affiliate",
  description: "Get paid for yur referral",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col dark:bg-gray-900">
        <ThemeProvider>
          <NotificationProvider>
            <AuthProvider>{children}</AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
