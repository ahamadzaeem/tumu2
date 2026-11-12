import { MetadataRoute } from "next";
import { getSeoData } from "@/lib/cms";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tumu.ae";
  const currentDate = new Date();
  const seoData = getSeoData();

  return seoData.pages.map((p) => {
    const isHome = p.slug === "/";
    return {
      url: p.canonicalUrl || `${baseUrl}${isHome ? "" : p.slug}`,
      lastModified: currentDate,
      changeFrequency: isHome ? "daily" : "weekly",
      priority: isHome ? 1.0 : 0.85,
    };
  });
}
