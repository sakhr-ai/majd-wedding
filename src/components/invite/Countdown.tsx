import { useEffect, useState } from "react";
import { getCountdown, type Countdown as C } from "@/lib/countdown";
import { invitation } from "@/lib/invitation";

const LABELS: { key: keyof Omit<C, "done">; label: string }[] = [
  { key: "days", label: "أيام" },
  { key: "hours", label: "ساعات" },
  { key: "minutes", label: "دقائق" },
  { key: "seconds", label: "ثواني" },
];

export function Countdown() {
  const [c, setC] = useState<C | null>(null);
  useEffect(() => {
    const tick = () => setC(getCountdown(invitation.dateISO));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (c?.done) {
    return <p className="font-display text-2xl text-gold-gradient">الليلة ليلتنا ✨</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {LABELS.map(({ key, label }) => (
        <div key={key} className="glass-card flex flex-col items-center gap-1 rounded-2xl py-4">
          <span className="font-body text-3xl font-bold tabular-nums text-ivory">
            {c ? String(c[key]).padStart(2, "0") : "--"}
          </span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
