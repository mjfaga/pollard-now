import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE.url}/`, lastModified, priority: 1, changeFrequency: "weekly" },
    { url: `${SITE.url}/plan`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE.url}/committee`, lastModified, priority: 0.7, changeFrequency: "monthly" },
    { url: `${SITE.url}/faq`, lastModified, priority: 0.8, changeFrequency: "monthly" },
    { url: `${SITE.url}/contact`, lastModified, priority: 0.7, changeFrequency: "yearly" },
  ];
}
