"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Options for the scroll animation hook
 */
interface UseScrollAnimationOptions {
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Root margin for triggering animation before element is in view */
  rootMargin?: string;
  /** Whether to trigger animation only once */
  triggerOnce?: boolean;
}

/**
 * PUBLIC_INTERFACE
 * Custom hook that uses IntersectionObserver for scroll-triggered animations.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * PUBLIC_INTERFACE
 * Custom hook for animated counters triggered by scroll visibility.
 * Counts from 0 to the target value when the element becomes visible.
 */
export function useAnimatedCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration, hasStarted]);

  return { count, start };
}
