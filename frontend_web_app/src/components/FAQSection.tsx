"use client";

import React, { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import content from "@/data/content.json";

/**
 * PUBLIC_INTERFACE
 * FAQ section with expandable accordion-style question/answer items.
 * Includes smooth expand/collapse animations and scroll triggers.
 */
export default function FAQSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 lg:py-28 bg-white dark:bg-gray-800 transition-colors duration-300"
      aria-labelledby="faq-title"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="faq-title"
            className="text-sm font-semibold text-blue-500 uppercase tracking-widest"
          >
            {content.faq.title}
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content.faq.subtitle}
          </p>
        </div>

        <div className="space-y-3">
          {content.faq.items.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-500 ${
        isOpen ? "bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/30" : "bg-gray-50 dark:bg-gray-700/30"
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-gray-900 dark:text-white pr-4">
          {item.question}
        </span>
        <svg
          className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-5 pb-5 text-gray-600 dark:text-gray-400 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
