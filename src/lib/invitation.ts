// Single source of truth for the invitation's details. Replace with the real couple's info.
export const invitation = {
  groom: "مجد",
  bride: "هناء",
  groomTitle: "المهندس",
  brideTitle: "الآنسة",
  groomLatin: "Majed",
  brideLatin: "Hanaa",
  // 2 January 2027, 2:30 PM Duisburg time (UTC+1, winter)
  dateISO: "2027-01-02T14:30:00+01:00",
  dayName: "السبت",
  dateText: "02.01.2027",
  timeText: "02:00 ظهراً",
  venue: "Akkurt Saal",
  address: ["Heerstraße 278", "47053 Duisburg، ألمانيا"],
  mapQuery: "Akkurt Saal, Heerstraße 278, 47053 Duisburg",
  contactWhatsapp: "966500000000",
  inviteText:
    "الى من لامست قلوبهم شغاف قلوبنااليوم نقاسمكم سرورنا وجميل شعورنا بكل الحب‏ يتشرف كل من السيد فهد الموسى والسيد حسن عبدالله ‏بدعوتكم لحضور حفل زفاف ولديهما وذلك بمشيئة الله ",
  coupleMessage:
    "يسعدنا ويشرّفنا حضوركم ومشاركتكم فرحتنا في يوم زفافنا، فوجودكم يعني لنا الكثير ويزيد فرحتنا جمالاً. ولا نرجو منكم سوى دعوة صادقة من القلب، بأن يبارك الله لنا ويجمع بيننا على المحبة والمودة",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.mapQuery)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(invitation.mapQuery)}&output=embed`;

/** Hour offset baked into `dateISO` (e.g. +01:00 -> 1), so the page shows the venue's clock. */
export function eventOffsetHours(): number {
  const m = invitation.dateISO.match(/([+-])(\d{2}):(\d{2})$/);
  if (!m) return 0;
  return Number(`${m[1]}${m[2]}`);
}

export function googleCalendarUrl() {
  const start = new Date(invitation.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `حفل زفاف ${invitation.groom} & ${invitation.bride}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    location: `${invitation.venue}، ${invitation.address.join("، ")}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
