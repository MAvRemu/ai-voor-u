import type { MetadataRoute } from "next";

const BASE_URL = "https://aivoorjou.nu";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/nl`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          nl: `${BASE_URL}/nl`,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          nl: `${BASE_URL}/nl`,
          en: `${BASE_URL}/en`,
        },
      },
    },
  ];
}
