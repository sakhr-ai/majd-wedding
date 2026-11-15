export type Countdown = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

export function getCountdown(target: Date | string, now: Date = new Date()): Countdown {
  const t = typeof target === "string" ? new Date(target) : target;
  const diff = Math.max(0, t.getTime() - now.getTime());
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: diff === 0,
  };
}
