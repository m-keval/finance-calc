import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

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
    category: "Investing",
    featured: true,
  },
  {
    id: 2,
    title: "FD vs Debt Mutual Funds",
    excerpt: "A comprehensive comparison between Fixed Deposits and Debt Mutual Funds to help you choose the right fixed-income asset.",
    date: "Jul 28, 2026",
    readTime: "7 min read",
    category: "Comparison",
    featured: false,
  },
  {
    id: 3,
    title: "Understanding Loan EMIs and Amortization",
    excerpt: "Break down how your monthly loan payments work, and strategies to reduce the interest burden on long-term loans.",
    date: "Jul 15, 2026",
    readTime: "6 min read",
    category: "Loans",
    featured: false,
  },
];

export default function BlogPage() {
  const featuredPost = POSTS.find((p) => p.featured);
  const regularPosts = POSTS.filter((p) => !p.featured);

  return (
    <div className="container mx-auto px-4 sm:px-8 py-20 max-w-5xl min-h-[80vh]">
      {/* Header */}
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 dark:bg-brand-950/30 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-brand-300 mb-4 uppercase tracking-wider">
          <BookOpen className="h-3.5 w-3.5" />
          Finance Blog
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Finance Guides & Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Expert insights, guides, and articles to help you make better financial decisions.
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <Link href="#" className="block group mb-10">
          <Card className="relative overflow-hidden transition-all duration-300 hover:-translate-y-1 border-border/60 hover:border-brand-300 dark:hover:border-brand-700">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-brand-100 dark:bg-brand-900/30 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:text-brand-300">
                  {featuredPost.category}
                </span>
                <span className="text-xs text-muted-foreground">Featured</span>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold leading-tight mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                {featuredPost.title}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed max-w-2xl">
                {featuredPost.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{featuredPost.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <span className="text-sm font-medium text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regularPosts.map((post, i) => (
          <Link key={post.id} href="#" className={`group animate-fade-in-up stagger-${i + 1}`}>
            <Card className="flex flex-col h-full transition-all duration-300 hover:-translate-y-1 border-border/60 hover:border-brand-300 dark:hover:border-brand-700 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold leading-tight mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-sm font-medium text-brand-600 dark:text-brand-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
