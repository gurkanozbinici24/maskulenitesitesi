import { MetadataRoute } from "next";
import { POSTS } from "@/content/blog";

const SITE = "https://www.maskulenitesitesi.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE}/danismanlik`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/gurkan-ozbinici`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE}/teslimat-ve-iade`, lastModified: new Date("2026-10-20"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/hizmet-iptal-ve-iade`, lastModified: new Date("2026-10-20"), changeFrequency: "yearly", priority: 0.3 },
    ...POSTS.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
