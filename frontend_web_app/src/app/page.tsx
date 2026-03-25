import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProgramsSection from "@/components/ProgramsSection";
import TrainersSection from "@/components/TrainersSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GallerySection from "@/components/GallerySection";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * PUBLIC_INTERFACE
 * Main home page component that renders all sections of the
 * modern gym portfolio website in sequence.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <TrainersSection />
        <PricingSection />
        <TestimonialsSection />
        <GallerySection />
        <BlogSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
