import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import { defaultMetadata } from "@/lib/seo/metadata";
import { localBusinessJsonLd } from "@/lib/seo/json-ld";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full overflow-x-clip`}>
      <head>
        <link rel="icon" href="/brand/favicon.ico" sizes="any" />
      </head>
      <body className="site-body flex min-h-full w-full flex-col overflow-x-clip bg-black text-ivory antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={localBusinessJsonLd()} />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#101010",
              color: "#F7F2E7",
              border: "1px solid #D4A62A",
            },
          }}
        />
      </body>
    </html>
  );
}
