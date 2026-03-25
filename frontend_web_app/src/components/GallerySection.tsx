"use client";

import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import content from "@/data/content.json";

/* Color gradients for gallery placeholder items */
const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-400 to-red-500",
  "from-green-500 to-teal-500",
  "from-indigo-500 to-blue-500",
  "from-yellow-400 to-orange-500",
  "from-pink-500 to-rose-500",
  "from-cyan-500 to-blue-500",
];

/**
 * PUBLIC_INTERFACE
 * Gallery section with category filter tabs and a grid of
 * gym facility images (gradient placeholders). Includes scroll animations.
 */
export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  const filtered =
    activeCategory === "All"
      ? content.gallery.items
      : content.gallery.items.filter((i) => i.category === activeCategory);

  return (
    <section
      id="gallery"
      className="py-20 lg:py-28 bg-white dark:bg-gray-800 transition-colors duration-300"
      aria-labelledby="gallery-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="gallery-title"
            className="text-sm font-semibold text-blue-500 uppercase tracking-widest"
          >
            {content.gallery.title}
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content.gallery.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {content.gallery.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-500/10 hover:text-blue-500"
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, index) => (
            <GalleryItem key={`${item.category}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({
  item,
  index,
}: {
  item: { alt: string; category: string };
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Gradient placeholder image */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} transition-transform duration-500 group-hover:scale-110`}
      />

      {/* Icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/30 text-5xl">🏋️</span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4">
        <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {item.alt}
        </p>
      </div>
    </div>
  );
}
