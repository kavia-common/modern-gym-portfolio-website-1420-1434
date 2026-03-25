"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import content from "@/data/content.json";

/**
 * PUBLIC_INTERFACE
 * Programs section displaying available fitness classes with icons,
 * duration, and difficulty level. Uses scroll-triggered fade-in animations.
 */
export default function ProgramsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section
      id="programs"
      className="py-20 lg:py-28 bg-white dark:bg-gray-800 transition-colors duration-300"
      aria-labelledby="programs-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="programs-title"
            className="text-sm font-semibold text-blue-500 uppercase tracking-widest"
          >
            {content.programs.title}
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content.programs.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {content.programs.items.map((program, index) => (
            <ProgramCard key={program.name} program={program} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramCard({
  program,
  index,
}: {
  program: { name: string; description: string; icon: string; duration: string; level: string };
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`group relative p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:border-blue-500/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="text-4xl mb-4">{program.icon}</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {program.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
          {program.description}
        </p>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
            {program.duration}
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300">
            {program.level}
          </span>
        </div>
      </div>
    </div>
  );
}
