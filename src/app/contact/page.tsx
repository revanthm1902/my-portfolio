"use client";

import AppFrame from "@/components/AppFrame";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <AppFrame>
      <div className="absolute inset-0 overflow-y-auto no-scrollbar">
        <div className="min-h-dvh flex flex-col justify-center pt-24 md:pt-28 pb-16 md:pb-20">
          <ContactSection />
        </div>
        <Footer />
      </div>
    </AppFrame>
  );
}
