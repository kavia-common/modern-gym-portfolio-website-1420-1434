"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import content from "@/data/content.json";

/**
 * PUBLIC_INTERFACE
 * Pricing section displaying membership plans with features.
 * Highlights the most popular plan with gradient border and badge.
 */
export default function PricingSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  return (
    <section
      id="pricing"
      className="py-20 lg:py-28 bg-white dark:bg-gray-800 transition-colors duration-300"
      aria-labelledby="pricing-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            id="pricing-title"
            className="text-sm font-semibold text-blue-500 uppercase tracking-widest"
          >
            {content.pricing.title}
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {content.pricing.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {content.pricing.plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  index,
}: {
  plan: {
    name: string;
    price: number;
    period: string;
    description: string;
    features: string[];
    highlighted: boolean;
  };
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${
        plan.highlighted
          ? "bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-2xl shadow-blue-500/25 scale-105"
          : "bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:shadow-xl"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-blue-600 text-xs font-bold rounded-full shadow-lg">
          MOST POPULAR
        </div>
      )}

      <h3
        className={`text-xl font-bold ${
          plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"
        }`}
      >
        {plan.name}
      </h3>
      <p
        className={`mt-2 text-sm ${
          plan.highlighted ? "text-blue-100" : "text-gray-600 dark:text-gray-400"
        }`}
      >
        {plan.description}
      </p>
      <div className="mt-6 mb-8">
        <span
          className={`text-5xl font-extrabold ${
            plan.highlighted ? "text-white" : "text-gray-900 dark:text-white"
          }`}
        >
          ${plan.price}
        </span>
        <span
          className={`text-sm ${
            plan.highlighted ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          /{plan.period}
        </span>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <svg
              className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                plan.highlighted ? "text-white" : "text-blue-500"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span
              className={
                plan.highlighted ? "text-blue-50" : "text-gray-700 dark:text-gray-300"
              }
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
        }}
        className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${
          plan.highlighted
            ? "bg-white text-blue-600 hover:shadow-lg"
            : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25"
        }`}
      >
        Get Started
      </a>
    </div>
  );
}
