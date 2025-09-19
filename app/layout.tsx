import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedContent from "./components/ProtectedContent";
import "./globals.css";
import { AuthProvider } from "./utils/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fetii Bot",
  description: "Helps you to answer questions based on Trips Excel uploaded",
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
        <AuthProvider>
          <Navbar />
          <ProtectedContent>{children}</ProtectedContent>
          {/* {process.env.NODE_ENV === "production" && <Footer />} */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
