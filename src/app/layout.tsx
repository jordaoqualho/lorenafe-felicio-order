import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lorena Felicio - Doces & Sobremesas",
  description: "Cardápio digital da confeitaria Lorena Felicio. Faça seu pedido de doces artesanais.",
  keywords: ["doces", "confeitaria", "sobremesas", "brigadeiro", "bem casado"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
