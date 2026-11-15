import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventOffsetHours, googleCalendarUrl, invitation } from "@/lib/invitation";

const WEEK = ["ح", "ن", "ث", "ر", "خ", "ج", "س"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function SaveTheDate() {
  const d = new Date(invitation.dateISO);
  // Use the venue's calendar day regardless of viewer timezone.
  const local = new Date(d.getTime() + eventOffsetHours() * 3600 * 1000);
  const year = local.getUTCFullYear();
  const month = local.getUTCMonth();
  const day = local.getUTCDate();
  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="glass-card p-6">
      <div className="mb-5 flex items-baseline justify-between">
        <span className="font-script text-3xl text-sand">{MONTHS[month]}</span>
        <span className="text-sm tracking-[0.3em] text-muted-foreground">{year}</span>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
        {WEEK.map((w) => (
          <span key={w} className="pb-2 text-xs text-muted-foreground">
            {w}
          </span>
        ))}
        {cells.map((n, i) => (
          <span key={i} className="flex items-center justify-center">
            {n === day ? (
              <span className="relative flex size-9 items-center justify-center rounded-full bg-gold-gradient font-bold text-primary-foreground shadow-glow">
                {n}
                <span className="absolute -top-2 text-[10px]">♥</span>
              </span>
            ) : (
              <span className={n ? "size-9 leading-9 text-sand/70" : "size-9"}>{n ?? ""}</span>
            )}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 border-t pt-5">
        <div className="text-sm">
          <p className="text-ivory">{invitation.dayName}</p>
          <p className="text-muted-foreground">{invitation.timeText}</p>
        </div>
        <Button variant="gold" asChild>
          <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
            <CalendarPlus />
            احفظ الموعد
          </a>
        </Button>
      </div>
    </div>
  );
}
