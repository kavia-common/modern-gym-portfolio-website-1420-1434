import React from "react";
import Link from "next/link";

/**
 * PUBLIC_INTERFACE
 * Custom 404 page matching the gym website's design theme.
 */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <section className="text-center" role="alert" aria-live="assertive">
        <h1 className="text-8xl font-extrabold text-blue-500 mb-4">404</h1>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Page Not Found
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
        >
          Go Home
        </Link>
      </section>
    </main>
  );
}
