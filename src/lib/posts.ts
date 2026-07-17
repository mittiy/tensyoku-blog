import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  category: "factory" | "construction" | "civil";
  tags: string[];
  coverImage?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
};

export type PostMeta = PostFrontmatter & {
  slug: string;
};

export const CATEGORY_LABELS: Record<PostFrontmatter["category"], string> = {
  factory: "工場",
  construction: "建設業",
  civil: "土木",
};

export const CATEGORY_COLORS: Record<
  PostFrontmatter["category"],
  { bg: string; text: string; border: string }
> = {
  factory: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
  construction: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" },
  civil: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
};

const VALID_CATEGORIES: PostFrontmatter["category"][] = ["factory", "construction", "civil"];

function getAllPostFiles(): { category: PostFrontmatter["category"]; filename: string }[] {
  const results: { category: PostFrontmatter["category"]; filename: string }[] = [];
  for (const cat of VALID_CATEGORIES) {
    const dir = path.join(postsDirectory, cat);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    for (const f of files) {
      results.push({ category: cat, filename: f });
    }
  }
  return results;
}

export function getAllPosts(): PostMeta[] {
  const files = getAllPostFiles();
  const posts = files.map(({ category, filename }) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, category, filename);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(source);
    return { slug, ...(data as PostFrontmatter) };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(category: string, slug: string): Post | null {
  const filePath = path.join(postsDirectory, category, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  return { slug, ...(data as PostFrontmatter), content };
}

export function getPostsByCategory(
  category: PostFrontmatter["category"]
): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllSlugs(): { category: string; slug: string }[] {
  return getAllPostFiles().map(({ category, filename }) => ({
    category,
    slug: filename.replace(/\.md$/, ""),
  }));
}
