import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lorena Felicio | Tabela de Doces",
  description: "Faça seu pedido de doces personalizados para festas, casamentos e eventos",
  keywords: ["doces", "confeitaria", "sobremesas", "brigadeiro", "bem casado", "festas", "casamentos", "eventos"],
  openGraph: {
    title: "Lorena Felicio | Tabela de Doces",
    description: "Faça seu pedido de doces personalizados para festas, casamentos e eventos",
    url: "https://www.lorenafelicio.com.br/",
    siteName: "Lorena Felicio",
    type: "website",
    images: [
      {
        url: "/images/screenshot-desktop.png",
        width: 1200,
        height: 630,
        alt: "Lorena Felicio | Tabela de Doces",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorena Felicio | Tabela de Doces",
    description: "Faça seu pedido de doces personalizados para festas, casamentos e eventos.",
    images: ["/images/screenshot-desktop.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.ico", sizes: "any" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FDF9F9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lorena Fe" />
        <link rel="apple-touch-icon" href="/images/icons/icon-192.png" />
        <meta name="msapplication-TileColor" content="#FDF9F9" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
