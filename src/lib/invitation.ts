// Single source of truth for the invitation's details. Replace with the real couple's info.
export const invitation = {
  groom: "عمر",
  bride: "ليلى",
  groomLatin: "Omar",
  brideLatin: "Layla",
  // 19 December 2026, 9:00 PM Riyadh time (UTC+3)
  dateISO: "2026-12-19T21:00:00+03:00",
  dayName: "السبت",
  dateText: "19.12.2026",
  timeText: "9:00 مساءً",
  venue: "فندق الريتز كارلتون",
  address: ["حي الهدا، طريق مكة المكرمة", "الرياض، المملكة العربية السعودية"],
  mapQuery: "The Ritz-Carlton Riyadh",
  contactWhatsapp: "966500000000",
  inviteText:
    "يتشرفون بدعوتكم لحضور حفل زفافهما، يسعدنا حضوركم وتواجدكم الذي يضفي على ليلتنا كل البهجة والسرور",
  coupleMessage:
    "بقلوب يملؤها الفرح والامتنان، يسعدنا أن نشارككم أجمل لحظات حياتنا، وأن نحتفل معكم ببداية رحلة جديدة جمع الله بيننا فيها بالمودة والرحمة.",
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(invitation.mapQuery)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(invitation.mapQuery)}&output=embed`;

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
