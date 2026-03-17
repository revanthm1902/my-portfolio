import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4">
      <AboutSection />
      <Footer />
    </div>
  );
}