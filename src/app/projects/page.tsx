import AppFrame from "@/components/AppFrame";
import Footer from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <AppFrame>
      <div className="absolute inset-0 overflow-y-auto no-scrollbar">
        <div className="min-h-dvh flex flex-col items-start justify-center max-w-5xl mx-auto px-6 sm:px-10 md:px-16 pt-24 md:pt-0">
          <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase mb-4">
            Projects // Work
          </div>
          <h1 className="font-(family-name:--font-ndot) text-4xl md:text-6xl text-zinc-900 dark:text-zinc-50 tracking-tight">
            PROJECTS
          </h1>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-xl">
            Coming soon.
          </p>
        </div>
        <Footer />
      </div>
    </AppFrame>
  );
}
