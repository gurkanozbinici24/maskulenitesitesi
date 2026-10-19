import { MetadataRoute } from "next";

const SITE = "https://maskulenitesitesi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE}/danismanlik`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];
}
