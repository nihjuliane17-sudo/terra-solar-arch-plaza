import { inferStage } from "./constants";
import { parseDuration, timeToMin, toBRL } from "./money";
import { weekRange } from "./dates";
import type {
  Client,
  ClientStage,
  ClientTask,
  LooseTask,
  NaraState,
} from "./types";

export function clientStage(c: Client): ClientStage {
  const done = (c.tasks || []).filter((t) => t.done).map((t) => t.type);
  return inferStage(done, c.manualStage);
}

export function clientProgress(c: Client) {
  const total = (c.tasks || []).length;
  const done = (c.tasks || []).filter((t) => t.done).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export type FlatTask = {
  client: Client | { id: string; name: string; isLoose: true };
  task: ClientTask;
  loose?: LooseTask;
};

export function allTasks(s: NaraState): FlatTask[] {
  const out: FlatTask[] = [];
  s.clients.forEach((c) => {
    (c.tasks || []).forEach((t) => out.push({ client: c, task: t }));
  });
  (s.looseTasks || []).forEach((lt) => {
    out.push({
      client: { id: "loose-" + lt.id, name: lt.title, isLoose: true },
      task: {
        id: lt.id,
        type: "Tarefa avulsa",
        hours: lt.hours || 0,
        done: !!lt.done,
        date: lt.date || "",
        startHour: lt.startHour,
      },
      loose: lt,
    });
  });
  return out;
}

export function tasksOnDate(s: NaraState, iso: string) {
  return allTasks(s).filter((x) => x.task.date === iso);
}

export function forecastForTask(c: Client, t: ClientTask) {
  const full = c.valueBRL || 0;
  if (c.pagamentoIntegralNoRender) {
    return t.type === "Renderização" ? full : 0;
  }
  if (t.type === "Esboços" || t.type === "Renderização") return full / 2;
  return 0;
}

export function atelierForecast(s: NaraState) {
  const rec: Record<number, number> = { 10: 0, 11: 0, 12: 0 };
  const prev: Record<number, number> = { 10: 0, 11: 0, 12: 0 };
  let tot = 0;
  s.clients.forEach((c) => {
    const f = c.valueBRL || 0;
    (c.tasks || []).forEach((t) => {
      if (!t.date || !t.date.startsWith("2026")) return;
      const v = forecastForTask({ ...c, valueBRL: f }, t);
      const m = +t.date.slice(5, 7);
      if (m in prev && m > 9) {
        prev[m] += v;
        tot += v;
      }
    });
  });
  s.payments.forEach((p) => {
    const m = +String(p.date).slice(5, 7);
    if (String(p.date).startsWith("2026") && m > 9) rec[m] += +p.value || 0;
  });
  return { prev, rec, tot };
}

export function syncPayStatus(c: Client): Client {
  const types = (c.tasks || []).filter((t) => t.done).map((t) => t.type);
  let status = c.payment.status;
  if (types.includes("Renderização")) status = "paid";
  else if (types.includes("Esboços") && !c.pagamentoIntegralNoRender)
    status = "half";
  return { ...c, payment: { ...c.payment, status } };
}

export function emptyDay() {
  return { e1: "", s1: "", e2: "", s2: "", tasks: [] };
}

export function workedMinutes(d: {
  e1: string;
  s1: string;
  e2: string;
  s2: string;
}) {
  const a = timeToMin(d.e1);
  const b = timeToMin(d.s1);
  const c = timeToMin(d.e2);
  const e = timeToMin(d.s2);
  let w = 0;
  if (a != null && b != null && b > a) w += b - a;
  else if (a != null && b == null && c == null && e != null && e > a) w += e - a;
  if (c != null && e != null && e > c) w += e - c;
  return w;
}

export function isTimesheetOff(iso: string) {
  const w = new Date(iso + "T12:00:00").getDay();
  return (w === 0 || w === 6) && iso >= "2026-10-15";
}

export function tsTotals(s: NaraState, iso: string) {
  const d = s.timesheet.days[iso];
  if (!d) return { w: 0, x: 0, t: 0, late: 0 };
  const w = workedMinutes(d);
  const jor = isTimesheetOff(iso) ? 0 : s.timesheet.jornada * 60;
  const e1 = timeToMin(d.e1);
  return {
    w,
    x: Math.max(0, w - jor),
    t: (d.tasks || []).reduce((a, t) => a + parseDuration(t.h), 0),
    late: e1 != null && !isTimesheetOff(iso) ? Math.max(0, e1 - 480) : 0,
  };
}

export function tsWeekLate(s: NaraState, iso: string) {
  const { start } = weekRange(iso);
  let late = 0;
  for (let i = 0; i < 7; i++) {
    const dt = new Date(start + "T12:00:00");
    dt.setDate(dt.getDate() + i);
    const k = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
    late += tsTotals(s, k).late;
  }
  return late;
}

export function refreshClientBRL(c: Client, rate: number): Client {
  return { ...c, valueBRL: toBRL(c.valueUSD || 0, rate) };
}

export function orderedClients(s: NaraState) {
  const map = new Map(s.clients.map((c) => [c.id, c]));
  const ordered: Client[] = [];
  (s.clientOrder.length ? s.clientOrder : s.clients.map((c) => c.id)).forEach(
    (id) => {
      const c = map.get(id);
      if (c) ordered.push(c);
    },
  );
  s.clients.forEach((c) => {
    if (!ordered.includes(c)) ordered.push(c);
  });
  return ordered;
}

export function sum(arr: { v: number }[] | number[]) {
  if (!arr.length) return 0;
  if (typeof arr[0] === "number") return (arr as number[]).reduce((a, b) => a + b, 0);
  return (arr as { v: number }[]).reduce((a, b) => a + (b.v || 0), 0);
}

export function financePulse(s: NaraState) {
  const fx = sum(s.finance.fixos) * 3;
  const dv = s.finance.div.filter((x) => !x.ok).reduce((a, x) => a + x.v, 0);
  const fal = (p: number) =>
    s.finance.plano
      .filter((x) => x.p === p && !x.ok)
      .reduce((a, x) => a + x.v, 0);
  const pl = ([1, 2, 3, 4] as const).reduce(
    (a, p) => a + (s.finance.inc[p] ? fal(p) : 0),
    0,
  );
  const tot = fx + dv + pl;
  const sob = s.finance.renda - tot;
  return { fx, dv, pl, tot, sob, fal };
}
