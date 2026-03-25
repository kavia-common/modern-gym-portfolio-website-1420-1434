"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import content from "@/data/content.json";

/**
 * PUBLIC_INTERFACE
 * Blog preview section showing the latest fitness tips and news articles
 * with date, author, category badge, and read time.
 */
export default function BlogSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section
      id="blog"
      className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      aria-labelledby="blog-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="blog-title"
            className="text-sm font-semibold text-blue-500 uppercase tracking-widest"
          >
            {content.blog.title}
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content.blog.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {content.blog.posts.map((post, index) => (
            <BlogCard key={post.title} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({
  post,
  index,
}: {
  post: {
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
  };
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
  ];

  return (
    <article
      ref={ref}
      className={`group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Placeholder image area */}
      <div
        className={`h-48 bg-gradient-to-br ${gradients[index % gradients.length]} relative overflow-hidden`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/30 text-6xl">📝</span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-white/90 dark:bg-gray-900/90 text-blue-600 dark:text-blue-400 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
            {post.author[0]}
          </div>
          <span>{post.author}</span>
        </div>
      </div>
    </article>
  );
}
