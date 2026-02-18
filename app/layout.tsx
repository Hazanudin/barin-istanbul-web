import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import DataLoader from "./components/DataLoader";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Barinistanbul - Premium Hijab Collection",
  description:
    "Elegansi hijab Turki terbaik. Koleksi premium dari Istanbul untuk wanita Indonesia modern.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} ${playfair.variable} font-sans antialiased`}
      >
        <DataLoader>{children}</DataLoader>
      </body>
    </html>
  );
}
