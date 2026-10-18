import type { Metadata, Viewport } from "next";
import { Inter, Cinzel, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

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
  title: 'Gürkan Özbinici | Vazgeçilmez Olma Sanatı & Çekicilik Sanatı',
  description: 'Maskülenite, redpill, kırmızıhap felsefesi ve ilişki dinamikleri üzerine sarsılmaz kanunlar. Vazgeçilmez Olma Sanatı (erkekler için) ve Çekicilik Sanatı (kadınlar için) kitaplarının resmi sitesi.',
  keywords: [
    'maskülenite',
    'maskulenitesitesi',
    'redpill',
    'kırmızıhap',
    'ilişki psikolojisi',
    'vazgeçilmez olma sanatı',
    'çekim dinamikleri',
    'çerçeve yönetimi',
    'erkek psikolojisi',
    'ilişki taktikleri'
  ],
  authors: [{ name: "Gürkan Özbinici" }],
  openGraph: {
    title: "Vazgeçilmez Olma Sanatı & Çekicilik Sanatı | Gürkan Özbinici",
    description:
      "Biri erkek için, biri kadın için. Aynı oyunun iki tarafı. 800.000+ kişinin takip ettiği vizyon.",
    images: [
      {
        url: "/vazgecilmez-yeni-kapak.jpg",
        width: 800,
        height: 1200,
        alt: "Vazgeçilmez Olma Sanatı - Gürkan Özbinici",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vazgeçilmez Olma Sanatı & Çekicilik Sanatı | Gürkan Özbinici",
    description:
      "Biri erkek için, biri kadın için. Aynı oyunun iki tarafı. 800.000+ kişinin takip ettiği vizyon.",
    images: ["/vazgecilmez-yeni-kapak.jpg"],
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
      </body>
    </html>
  );
}

