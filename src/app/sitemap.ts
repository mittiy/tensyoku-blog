import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const BASE_URL = "https://genba-tensyoku.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const categories: MetadataRoute.Sitemap = (
    ["factory", "construction", "civil"] as const
  ).map((cat) => ({
    url: `${BASE_URL}/categories/${cat}`,
  }));

  return [
    { url: BASE_URL },
    { url: `${BASE_URL}/blog` },
    { url: `${BASE_URL}/shikaku` },
    { url: `${BASE_URL}/nenshu` },
    ...categories,
    ...posts,
  ];
}
