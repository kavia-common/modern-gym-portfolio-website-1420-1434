"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import content from "@/data/content.json";

/* Color assignments for trainer avatars */
const trainerColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-teal-500",
];

/**
 * PUBLIC_INTERFACE
 * Trainers section displaying expert trainer profiles with their
 * specialties. Features scroll-triggered card animations.
 */
export default function TrainersSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section
      id="trainers"
      className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      aria-labelledby="trainers-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="trainers-title"
            className="text-sm font-semibold text-blue-500 uppercase tracking-widest"
          >
            {content.trainers.title}
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content.trainers.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {content.trainers.items.map((trainer, index) => (
            <TrainerCard key={trainer.name} trainer={trainer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrainerCard({
  trainer,
  index,
}: {
  trainer: { name: string; role: string; bio: string; specialties: string[] };
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();
  const initials = trainer.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      ref={ref}
      className={`group text-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Avatar */}
      <div
        className={`mx-auto w-24 h-24 rounded-full bg-gradient-to-br ${trainerColors[index % trainerColors.length]} flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        {initials}
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        {trainer.name}
      </h3>
      <p className="text-blue-500 text-sm font-medium mt-1">{trainer.role}</p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed">
        {trainer.bio}
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {trainer.specialties.map((s) => (
          <span
            key={s}
            className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
