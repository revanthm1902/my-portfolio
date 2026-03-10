import AppFrame from "@/components/AppFrame";

export default function BlogPage() {
  return (
    <AppFrame>
      <div className="relative z-10 w-full h-full max-w-5xl mx-auto px-6 sm:px-10 md:px-16 flex flex-col items-start justify-center pt-24 md:pt-0">
        <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase mb-4">
          Blog // Writings
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Blog
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-xl">
          Coming soon.
        </p>
      </div>
    </AppFrame>
  );
}
