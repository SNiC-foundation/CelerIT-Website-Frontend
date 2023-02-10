function parseDate(date: Date | string): Date {
  if (typeof date === 'string') {
    return new Date(date);
  }
  return date;
}

export function dateToTime(date: Date | string) {
  const d = parseDate(date);
  return d.toLocaleTimeString(undefined, { timeZone: 'Europe/Amsterdam', timeStyle: 'short' });
}

export function dateToString(date: Date | string) {
  const d = parseDate(date);
  return d.toLocaleString();
}

export function getTime(date: Date | string) {
  const d = parseDate(date);
  return d.getTime();
}
