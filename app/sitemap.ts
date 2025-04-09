import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://affa.ai";
  
  // You can add more routes dynamically based on your application
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "never" as const,
      priority: 1,
    },
  ];

  return routes;
} 