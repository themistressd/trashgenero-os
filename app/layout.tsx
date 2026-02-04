import type { Metadata } from "next";
import "./globals.css";
import "@/styles/themes/trash-os.css";
import "@/styles/themes/trash-mate.css";

export const metadata: Metadata = {
  title: "TrashGènero OS - Digital Witchcraft meets Windows 95",
  description: "Sistema Operativo de Moda, Culto y Caos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&family=Pixelify+Sans:wght@400;500;600;700&family=Permanent+Marker&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
