import type { MetadataRoute } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const isProduction = siteConfig.url === "https://captivedemand.com";

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
