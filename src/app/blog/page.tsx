import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Personal Finance Blog & Guides",
  description: "Read our latest articles and guides on personal finance, tax saving, investments, and more.",
};

const POSTS = [
  {
    id: 1,
    title: "How to maximize returns with SIPs",
    excerpt: "Learn the secrets of compounding and why starting early with Systematic Investment Plans can make you a millionaire.",
    date: "Aug 12, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "FD vs Debt Mutual Funds",
    excerpt: "A comprehensive comparison between Fixed Deposits and Debt Mutual Funds to help you choose the right fixed-income asset.",
    date: "Jul 28, 2026",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Understanding Loan EMIs and Amortization",
    excerpt: "Break down how your monthly loan payments work, and strategies to reduce the interest burden on long-term loans.",
    date: "Jul 15, 2026",
    readTime: "6 min read",
  }
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-20 max-w-5xl min-h-[80vh]">
      <div className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Finance Guides & Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert insights, guides, and articles to help you make better financial decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.map((post) => (
          <Card key={post.id} className="flex flex-col hover:border-indigo-500/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <CardTitle className="text-xl leading-tight mb-2 hover:text-indigo-600 transition-colors">
                <Link href={`#`}>{post.title}</Link>
              </CardTitle>
              <CardDescription className="text-base line-clamp-3">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-4 border-t">
              <Link href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                Read Article →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
