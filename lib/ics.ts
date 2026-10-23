import { WEDDING, type WeddingEvent } from "./content";

const icsDate = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

/** Downloads a calendar file (.ics) for one celebration, with a 3-hour reminder. */
export function downloadIcs(e: WeddingEvent) {
  const { groom, bride } = WEDDING.couple;
  const title = `${e.name} — ${groom} & ${bride}`;
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//RaviSaumya//Wedding//EN", "BEGIN:VEVENT",
    `UID:${e.id}-2026@ravi-saumya`, `DTSTAMP:${icsDate(new Date().toISOString())}`,
    `DTSTART:${icsDate(e.start)}`, `DTEND:${icsDate(e.end)}`,
    `SUMMARY:${title}`, `LOCATION:${e.venue}`, `DESCRIPTION:${e.day}, ${e.date} · ${e.time}`,
    "BEGIN:VALARM", "TRIGGER:-PT3H", "ACTION:DISPLAY", `DESCRIPTION:${title}`, "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  a.download = `${e.id}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

/** Opens the event straight in Google Calendar (best on Android). */
export function googleCalendarUrl(e: WeddingEvent) {
  const { groom, bride } = WEDDING.couple;
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: `${e.name} — ${groom} & ${bride}`,
    dates: `${icsDate(e.start)}/${icsDate(e.end)}`,
    location: e.venue,
    details: `${e.day}, ${e.date} · ${e.time}\n${e.note}`,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
