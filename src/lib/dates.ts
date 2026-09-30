import { format, parseISO, startOfWeek, endOfWeek, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

export function todayISO(d = new Date()) {
  return format(d, "yyyy-MM-dd");
}

export function parseDay(iso: string) {
  return parseISO(iso + "T12:00:00");
}

export function formatBR(iso: string) {
  if (!iso) return "—";
  return format(parseDay(iso), "dd/MM/yyyy");
}

export function formatLong(iso: string) {
  return format(parseDay(iso), "EEEE, d 'de' MMMM", { locale: ptBR });
}

export function weekdayShort(iso: string) {
  return format(parseDay(iso), "EEE", { locale: ptBR });
}

export function monthLabel(year: number, month: number) {
  return format(new Date(year, month, 1), "MMMM yyyy", { locale: ptBR });
}

export function weekKey(iso: string) {
  return format(startOfWeek(parseDay(iso), { weekStartsOn: 0 }), "yyyy-MM-dd");
}

export function weekRange(iso: string) {
  const s = startOfWeek(parseDay(iso), { weekStartsOn: 0 });
  const e = endOfWeek(parseDay(iso), { weekStartsOn: 0 });
  return { start: format(s, "yyyy-MM-dd"), end: format(e, "yyyy-MM-dd") };
}

export function addISO(iso: string, days: number) {
  return format(addDays(parseDay(iso), days), "yyyy-MM-dd");
}

export function inMonth(iso: string, month: number) {
  return iso && +iso.slice(5, 7) === month;
}

export type CalCell = { iso: string; inMonth: boolean; date: Date };

export function monthGrid(year: number, month: number): CalCell[][] {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: CalCell[] = [];
  for (let i = 0; i < startWeekday; i++) {
    const d = new Date(year, month, 1 - (startWeekday - i));
    cells.push({ iso: format(d, "yyyy-MM-dd"), inMonth: false, date: d });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    cells.push({ iso: format(d, "yyyy-MM-dd"), inMonth: true, date: d });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    const d = addDays(last, 1);
    cells.push({ iso: format(d, "yyyy-MM-dd"), inMonth: false, date: d });
  }
  const weeks: CalCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
export const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
