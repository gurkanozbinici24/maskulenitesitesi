import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/yonetim/", "/degerlendir", "/api/"] }],
    sitemap: "https://www.maskulenitesitesi.com.tr/sitemap.xml",
    host: "https://www.maskulenitesitesi.com.tr",
  };
}
