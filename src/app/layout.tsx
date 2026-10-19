import type { Metadata, Viewport } from "next";
import { Inter, Cinzel, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import ClickTracker from "@/components/ClickTracker";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const signature = Great_Vibes({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://maskulenitesitesi.vercel.app"),
  title: {
    default: "Maskülenite | Gürkan Özbinici – Vazgeçilmez Olma Sanatı & Çekicilik Sanatı",
    template: "%s | Maskülenite",
  },
  description:
    "Maskülenite (@maskulenitesitesi) resmi sitesi. Gürkan Özbinici'nin kitapları Vazgeçilmez Olma Sanatı (erkekler için) ve Çekicilik Sanatı (kadınlar için): maskülenlik, ilişkiler ve çekim dinamikleri üzerine. İsme özel imzalı kitaplar ve birebir ilişki koçluğu.",
  applicationName: "Maskülenite",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  keywords: [
    "maskülenite",
    "maskulenite",
    "maskulenitesitesi",
    "maskülenite sitesi",
    "gürkan özbinici",
    "gurkan ozbinici",
    "vazgeçilmez olma sanatı",
    "vazgecilmez olma sanati",
    "çekicilik sanatı",
    "cekicilik sanati",
    "maskülenlik",
    "ilişkiler",
    "ilişki koçluğu",
    "ilişki danışmanlığı",
    "ilişki tavsiyeleri",
    "redpill",
    "kırmızıhap",
    "ilişki psikolojisi",
    "çekim dinamikleri",
    "erkek psikolojisi",
  ],
  authors: [{ name: "Gürkan Özbinici" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Maskülenite",
    url: "/",
    title: "Vazgeçilmez Olma Sanatı & Çekicilik Sanatı | Gürkan Özbinici",
    description:
      "Biri erkek için, biri kadın için. Aynı oyunun iki tarafı. 800.000+ kişinin takip ettiği vizyon.",
    images: [
      {
        url: "/og-paylasim.jpg",
        width: 1200,
        height: 630,
        alt: "Vazgeçilmez Olma Sanatı & Çekicilik Sanatı - Gürkan Özbinici",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vazgeçilmez Olma Sanatı & Çekicilik Sanatı | Gürkan Özbinici",
    description:
      "Biri erkek için, biri kadın için. Aynı oyunun iki tarafı. 800.000+ kişinin takip ettiği vizyon.",
    images: ["/og-paylasim.jpg"],
  },
  verification: {
    google: 'FT_hlSHvBdHwjwHh17ErA2kpRHd1ocBNIsuddA0iz9Q',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`dark scroll-smooth ${inter.variable} ${cinzel.variable} ${playfair.variable} ${signature.variable}`}
      style={{ backgroundColor: "#050507", color: "#f4f4f5", colorScheme: "dark" }}
    >
      <body
        className={`${inter.className} font-sans bg-matte-950 text-zinc-200 antialiased selection:bg-gold-500 selection:text-black min-h-screen flex flex-col`}
        style={{ backgroundColor: "#050507", color: "#f4f4f5" }}
      >
        {children}
        <ClickTracker />
        <Analytics />
      </body>
    </html>
  );
}

