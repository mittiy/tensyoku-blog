import Link from "next/link";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type PostFrontmatter,
} from "@/lib/posts";

type Props = {
  category: PostFrontmatter["category"];
  asLink?: boolean;
};

export default function CategoryBadge({ category, asLink = false }: Props) {
  const { bg, text, border } = CATEGORY_COLORS[category];
  const label = CATEGORY_LABELS[category];

  const className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bg} ${text} ${border}`;

  if (asLink) {
    return (
      <Link href={`/categories/${category}`} className={className}>
        {label}
      </Link>
    );
  }

  return <span className={className}>{label}</span>;
}
