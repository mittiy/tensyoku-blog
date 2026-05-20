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

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

export function getAllPosts(): PostMeta[] {
  const files = getPostFiles();
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(postsDirectory, filename);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(source);
    return { slug, ...(data as PostFrontmatter) };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`);
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

export function getAllSlugs(): string[] {
  return getPostFiles().map((f) => f.replace(/\.md$/, ""));
}
