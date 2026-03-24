export function getLast12Months() {
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    date.setDate(1);
    return {
      start: new Date(date.getFullYear(), date.getMonth(), 1),
      end: new Date(date.getFullYear(), date.getMonth() + 1, 1),
      month: date.toLocaleString("default", { month: "short" }),
      monthIndex: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  });
  return months;
}