import type { Interview } from "./types";

export function showTime(interview: Interview) {
  const time = (value: string) => new Date(`2000-01-01T${value}`).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return `${time(interview.fromTime)} - ${time(interview.toTime)}`;
}
