export const isToday = (date: string) =>
  Math.round((Date.now() - Date.parse(date)) / 86400000 - 0.5) <= 3 && true;
