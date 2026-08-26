import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export const metadata: Metadata = {
  title: 'Vazgeçilmez Olma Sanatı | İlişki Psikolojisi ve Maskülenite',
  description: 'Maskülenite, redpill, kırmızıhap felsefesi ve ilişki dinamikleri üzerine sarsılmaz kanunlar. Vazgeçilmez Olma Sanatı kitabının resmi ve tek basımı.',
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
      className="dark scroll-smooth"
      style={{ backgroundColor: "#050507", color: "#f4f4f5", colorScheme: "dark" }}
    >
      <body
        className="bg-matte-950 text-zinc-200 antialiased selection:bg-gold-500 selection:text-black min-h-screen flex flex-col"
        style={{ backgroundColor: "#050507", color: "#f4f4f5" }}
      >
        {children}
      </body>
    </html>
  );
}
