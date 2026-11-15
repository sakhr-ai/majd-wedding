import { describe, expect, it } from "vitest";
import { getCountdown } from "@/lib/countdown";
import { invitation } from "@/lib/invitation";

describe("wedding countdown", () => {
  it("counts down to 19 Dec 2026, 9:00 PM Riyadh time", () => {
    const now = new Date("2026-12-18T17:59:30Z"); // 1 day, 0h, 0m, 30s before 18:00Z
    expect(getCountdown(invitation.dateISO, now)).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 30,
      done: false,
    });
  });

  it("stops at zero once the party has started", () => {
    const after = new Date("2026-12-20T00:00:00Z");
    expect(getCountdown(invitation.dateISO, after)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      done: true,
    });
  });
});
