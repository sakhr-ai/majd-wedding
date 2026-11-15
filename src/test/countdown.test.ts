import { describe, expect, it } from "vitest";
import { getCountdown } from "@/lib/countdown";
import { eventOffsetHours, invitation } from "@/lib/invitation";

describe("wedding countdown", () => {
  it("counts down to 2 Jan 2027, 2:30 PM Duisburg time", () => {
    // 14:30+01:00 == 13:30Z; this instant is 1 day, 0h, 0m, 30s before it.
    const now = new Date("2027-01-01T13:29:30Z");
    expect(getCountdown(invitation.dateISO, now)).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 30,
      done: false,
    });
  });

  it("stops at zero once the party has started", () => {
    const after = new Date("2027-01-03T00:00:00Z");
    expect(getCountdown(invitation.dateISO, after)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      done: true,
    });
  });
});

describe("invitation details", () => {
  it("is the couple and day the user gave", () => {
    expect(invitation.groom).toBe("مجد");
    expect(invitation.bride).toBe("هناء");
    expect(invitation.dateText).toBe("02.01.2027");
    expect(invitation.dayName).toBe("السبت");
    expect(invitation.venue).toBe("Akkurt Saal");
  });

  it("puts the party at 02:30 PM on Saturday 2 Jan 2027 in Duisburg", () => {
    // Berlin in January is UTC+1, so the wall clock at the venue is 14:30.
    expect(eventOffsetHours()).toBe(1);
    const local = new Date(new Date(invitation.dateISO).getTime() + eventOffsetHours() * 3600 * 1000);
    expect(local.getUTCFullYear()).toBe(2027);
    expect(local.getUTCMonth()).toBe(0);
    expect(local.getUTCDate()).toBe(2);
    expect(local.getUTCHours()).toBe(14);
    expect(local.getUTCMinutes()).toBe(30);
    expect(local.getUTCDay()).toBe(6); // Saturday
  });

  it("keeps the German street address in Latin script", () => {
    expect(invitation.address.join(" ")).toContain("Heerstraße 278");
    expect(invitation.mapQuery).toContain("47053 Duisburg");
  });
});
