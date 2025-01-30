import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./navbar/page";

const inter = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youtube",
  description: "Youtube Clone",
  icons: {
    icon: '/favicon.ico', // Ensure the path matches your favicon's location
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
