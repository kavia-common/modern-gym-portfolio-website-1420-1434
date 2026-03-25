import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

/**
 * SEO metadata for the gym portfolio website.
 */
export const metadata: Metadata = {
  title: "JERAI GYM | Premium Fitness & Training Center",
  description:
    "Transform your body and life at JERAI GYM. World-class trainers, state-of-the-art equipment, and personalized fitness programs. Join now for a free trial session!",
  keywords: [
    "gym",
    "fitness",
    "personal training",
    "HIIT",
    "CrossFit",
    "yoga",
    "boxing",
    "weight loss",
    "strength training",
    "gym membership",
  ],
  openGraph: {
    title: "JERAI GYM | Premium Fitness & Training Center",
    description:
      "Transform your body and life at JERAI GYM. World-class trainers, state-of-the-art equipment, and personalized fitness programs.",
    type: "website",
    locale: "en_US",
    siteName: "JERAI GYM",
  },
  twitter: {
    card: "summary_large_image",
    title: "JERAI GYM | Premium Fitness & Training Center",
    description:
      "Transform your body and life at JERAI GYM. World-class trainers and state-of-the-art equipment.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * PUBLIC_INTERFACE
 * Root layout component that wraps the entire application with
 * ThemeProvider for dark/light mode and proper HTML structure.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
