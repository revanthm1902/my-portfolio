"use client";

import AppFrame from "@/components/AppFrame";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <AppFrame>
      <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4">
        <div className="min-h-dvh flex flex-col justify-center pt-20 md:pt-24 pb-12 md:pb-16">
          <ContactSection />
        </div>
        <Footer />
      </div>
    </AppFrame>
  );
}
