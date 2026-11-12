import seoDataDefault from "@/data/seoContent.json";
import siteContentDefault from "@/data/siteContent.json";

export interface PageSeoItem {
  id: string;
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robots: string;
}

export interface SeoContentData {
  pages: PageSeoItem[];
}

export type SiteContentData = typeof siteContentDefault;

export function getSeoData(): SeoContentData {
  return seoDataDefault as SeoContentData;
}

export function getPageSeo(slug: string): PageSeoItem | undefined {
  const data = getSeoData();
  return data.pages.find((p) => p.slug === slug || p.slug === `/${slug.replace(/^\//, "")}`);
}

export function getSiteContent(): SiteContentData {
  return siteContentDefault as SiteContentData;
}

