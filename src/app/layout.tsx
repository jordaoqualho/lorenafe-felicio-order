import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lorena Felício Confeitaria | Doces para momentos especiais",
  description:
    "Faça seu pedido de doces personalizados para festas, casamentos e eventos. Sabor e beleza em cada detalhe.",
  keywords: ["doces", "confeitaria", "sobremesas", "brigadeiro", "bem casado", "festas", "casamentos", "eventos"],
  openGraph: {
    title: "Lorena Felício Confeitaria | Doces para momentos especiais",
    description:
      "Faça seu pedido de doces personalizados para festas, casamentos e eventos. Sabor e beleza em cada detalhe.",
    url: "https://www.lorenafelicio.com.br/",
    siteName: "Lorena Felício Confeitaria",
    type: "website",
    images: [
      {
        url: "/images/metalink.png",
        width: 1200,
        height: 630,
        alt: "Lorena Felício Confeitaria - Doces artesanais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorena Felício Confeitaria | Doces para momentos especiais",
    description: "Faça seu pedido de doces personalizados para festas, casamentos e eventos.",
    images: ["/images/metalink.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.ico", sizes: "any" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
