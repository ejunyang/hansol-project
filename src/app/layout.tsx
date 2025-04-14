import type { Metadata } from "next";
import "./globals.css";
import HeaderLayout from "@/components/layout/Layout";
import Provider from "./Provider";

export const metadata: Metadata = {
  title: "한솔제지",
  description: "한솔제지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-bg-primary flex flex-col text-white h-screen">
        <Provider>
          <HeaderLayout>{children}</HeaderLayout>
        </Provider>
      </body>
    </html>
  );
}
