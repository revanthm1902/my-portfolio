"use client";

import { motion } from "framer-motion";
import AppFrame from "@/components/AppFrame";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <AppFrame>
      <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-dvh flex flex-col justify-center pt-20 md:pt-24 pb-12 md:pb-16"
        >
          <ContactSection />
        </motion.div>
        <Footer />
      </div>
    </AppFrame>
  );
}
