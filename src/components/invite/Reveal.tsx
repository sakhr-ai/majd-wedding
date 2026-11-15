import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mb-6 flex flex-col items-center gap-3 text-center">
      {kicker && <span className="text-xs tracking-[0.35em] text-muted-foreground">{kicker}</span>}
      <h2 className="font-display text-3xl text-gold-gradient">{children}</h2>
      <div className="flex w-40 items-center gap-2">
        <span className="divider-ornament flex-1" />
        <span className="text-xs text-gold">❀</span>
        <span className="divider-ornament flex-1" />
      </div>
    </div>
  );
}
