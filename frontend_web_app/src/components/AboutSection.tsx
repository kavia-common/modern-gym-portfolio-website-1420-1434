"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import content from "@/data/content.json";

/* Feature icons mapped by index */
const featureIcons = ["🏋️", "👨‍🏫", "⏰", "🥗"];

/**
 * PUBLIC_INTERFACE
 * About section showcasing gym features with scroll-triggered animations
 * and glassmorphism-styled feature cards.
 */
export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      aria-labelledby="about-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="about-title"
            className="text-sm font-semibold text-blue-500 uppercase tracking-widest"
          >
            {content.about.title}
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content.about.subtitle}
          </p>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {content.about.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {content.about.features.map((feature, index) => (
            <AboutCard key={feature.name} feature={feature} icon={featureIcons[index]} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCard({
  feature,
  icon,
  index,
}: {
  feature: { name: string; description: string };
  icon: string;
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {feature.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
