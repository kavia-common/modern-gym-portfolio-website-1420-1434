"use client";

import React, { useEffect, useState } from "react";
import { useAnimatedCounter } from "@/hooks/useScrollAnimation";
import content from "@/data/content.json";

/**
 * Single animated stat counter component
 */
function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, start } = useAnimatedCounter(value, 2000);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Start counters after a short delay when the page loads
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setHasTriggered(true);
        start();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [start, hasTriggered]);

  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-blue-200 mt-1">{label}</div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Hero section with parallax gradient background, animated text,
 * call-to-action buttons, and animated stat counters.
 */
export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero banner"
    >
      {/* Parallax Gradient Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      />

      {/* Animated decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${offsetY * 0.1}px)` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s", transform: `translateY(${-offsetY * 0.15}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"
          style={{ transform: `translate(-50%, -50%) scale(${1 + offsetY * 0.0003})` }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="animate-fadeInUp">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight tracking-tight">
            {content.hero.title}
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {content.hero.highlight}
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
            {content.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              onClick={(e) => handleScroll(e, "#pricing")}
              className="group relative px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 w-full sm:w-auto text-center"
            >
              <span className="relative z-10">{content.hero.ctaPrimary}</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 sr-only"> - view pricing plans</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="px-8 py-4 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm hover:bg-white/10 w-full sm:w-auto text-center"
            >
              {content.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          {content.hero.stats.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
