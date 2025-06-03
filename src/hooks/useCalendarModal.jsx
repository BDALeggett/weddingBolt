import { useState, useCallback, useMemo } from "react";

/** Detects platform once per render */
function detectPlatform() {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua))          return "android";
  if (/Mac/.test(ua))              return "mac";
  if (/Win/.test(ua))              return "windows";
  return "web";
}

/** Hook – manages open/close + calendar helpers */
export function useCalendarModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open  = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const platform = useMemo(() => detectPlatform(), []);

  /* ---------- calendar helpers ---------- */
  const GOOGLE_EVENT = {
    title:   "Event Title",
    start:   "2025-09-06T17:00:00",
    end:     "2025-09-06T19:00:00",
    details: "Event description here",
  };

  const handleGoogle = () => {
    const { title, start, end, details } = GOOGLE_EVENT;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${start.replace(/[-:]/g, "")}/${end.replace(/[-:]/g, "")}&details=${encodeURIComponent(
      details
    )}`;
    window.open(url, "_blank", "noopener noreferrer");
    close();
  };

  const handleIcsDownload = () => {
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MyApp//Calendar//EN
BEGIN:VEVENT
UID:${Date.now()}-event@myapp
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:20250906T170000Z
DTEND:20250906T190000Z
SUMMARY:${GOOGLE_EVENT.title}
DESCRIPTION:${GOOGLE_EVENT.details}
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "event.ics";
    a.click();
    URL.revokeObjectURL(url);
    close();
  };

  const handleNativeCalendar = () => {
    console.log("Would open native calendar on", platform);
    close();
  };

  return {
    /* state */
    isOpen,
    platform,

    /* handlers exposed to the parent */
    open,
    close,
    handleGoogle,
    handleIcsDownload,
    handleNativeCalendar,
  };
}
