import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050507",
};

export const metadata: Metadata = {
  title: "Vazgeçilmez Olma Sanatı | İlişki Psikolojisi",
  description:
    "İlişkilerde kazanma sanatı ve ilişki psikolojisi. Kendi değerinizi inşa edin ve vazgeçilmez olun.",
  keywords: [
    "vazgeçilmez olma sanatı",
    "vazgeçilmez ol",
    "ilişki psikolojisi",
    "ilişkilerde kazanma sanatı",
    "kitap",
    "maskülenite",
  ],
  authors: [{ name: "Gürkan Özbinici" }],
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
