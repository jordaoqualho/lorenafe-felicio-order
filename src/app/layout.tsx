import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
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
        {process.env.NODE_ENV === "production" && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "sq02solmj6");
              `,
            }}
          />
        )}
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
