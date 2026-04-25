import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import GlobalLoader from "@/components/GlobalLoader";

export const metadata: Metadata = {
  title: "MMA Ecuador — Plataforma Nacional",
  description: "Conectando el ecosistema de MMA en Ecuador. Peleadores, gimnasios, rankings y competencias.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0d0d0d" />
      </head>
      <body className="antialiased">
        <GlobalLoader />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
