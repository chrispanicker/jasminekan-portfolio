
import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jasmine Kan",
  description: "Jasmine Kan is a Brooklyn-based designer. Her practice spans across editorial, web, digital design, creative coding and printmaking.",
};

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`bg-[var(--background)] text-[var(--foreground)] ${archivo.className} snap-y snap-mandatory overflow-scroll h-screen w-screen`}>
      <body
        className={`bg-[var(--background)] text-[var(--foreground)] leading-[1.2rem]`}
      >
        {children}
      </body>
    </html>
  );
}
