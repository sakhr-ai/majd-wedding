// Deterministic positions so server and client markup match.
const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 5.7 + 3) % 100,
  size: 5 + (i % 5) * 2,
  duration: 11 + (i % 7) * 1.6,
  delay: (i * 1.3) % 10,
}));

export function Petals() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="animate-petal absolute -top-4 rounded-[60%_0_60%_0] bg-ivory/70 blur-[0.5px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
