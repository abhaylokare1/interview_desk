import type { Interview } from "./types";

export function showTime(interview: Interview) {
  const time = (value: string) => new Date(`2000-01-01T${value}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${time(interview.fromTime)} - ${time(interview.toTime)}`;
}

export function showInterviewDate(date: string) {
  const formatted = new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T00:00:00`));
  const indiaToday = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
  const tomorrow = new Date(`${indiaToday}T00:00:00`);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const indiaTomorrow = new Intl.DateTimeFormat("en-CA").format(tomorrow);
  if (date === indiaToday) return `Today · ${formatted}`;
  if (date === indiaTomorrow) return `Tomorrow · ${formatted}`;
  return formatted;
}
