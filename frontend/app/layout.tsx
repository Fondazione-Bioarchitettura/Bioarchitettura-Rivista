import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Bioarchitettura - Rivista Italiana di Architettura Ecologica",
  description: "Prima rivista italiana dedicata all'architettura ecologica e sostenibile. Master, webinar, pubblicazioni e abbonamenti.",
  keywords: "bioarchitettura, architettura ecologica, sostenibilità, edilizia sostenibile, design ecologico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased font-sans">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
