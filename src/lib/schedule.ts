import type { FlatTask } from "./derived";
import type { TaskRef } from "./types";
import { clamp } from "./utils";

export const DAY_START = 6;
export const DAY_END = 23;
export const HOUR_H = 52;
export const SNAP = 0.25;

export const DAY_HOURS = Array.from(
  { length: DAY_END - DAY_START },
  (_, i) => DAY_START + i,
);

export function taskKey(r: TaskRef) {
  return `${r.loose ? "l" : "c"}:${r.clientId}:${r.taskId}`;
}

export function refFromFlat(x: FlatTask): TaskRef {
  const loose = "isLoose" in x.client;
  return {
    taskId: x.task.id,
    clientId: loose ? "" : x.client.id,
    loose,
  };
}

export function snapHour(n: number) {
  return Math.round(n / SNAP) * SNAP;
}

export function clampHour(n: number) {
  return clamp(snapHour(n), DAY_START, DAY_END - SNAP);
}

export function hourToLabel(h: number) {
  const hr = Math.floor(h);
  const min = Math.round((h - hr) * 60);
  return `${String(hr).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}

export function parseTimeToHour(t: string): number | undefined {
  if (!t) return undefined;
  const [h, m] = t.split(":").map(Number);
  if (!Number.isFinite(h)) return undefined;
  return clampHour(h + (Number.isFinite(m) ? m / 60 : 0));
}

export function visualHours(hours: number) {
  return Math.max(0.5, Number(hours) || 1);
}

export type Packed = {
  col: number;
  cols: number;
  start: number;
  end: number;
};

export function packDay(items: FlatTask[]): Record<string, Packed> {
  const timed = items
    .filter((x) => x.task.startHour != null)
    .map((x) => {
      const start = clampHour(x.task.startHour as number);
      const end = Math.min(DAY_END, start + visualHours(x.task.hours));
      return { id: x.task.id, start, end };
    })
    .sort((a, b) => a.start - b.start || a.end - b.end);

  type Node = (typeof timed)[number] & { col: number };
  const placed: Node[] = [];
  for (const it of timed) {
    let col = 0;
    while (placed.some((p) => p.col === col && p.start < it.end && it.start < p.end)) {
      col += 1;
    }
    placed.push({ ...it, col });
  }

  const out: Record<string, Packed> = {};
  for (const it of placed) {
    const cluster = placed.filter((p) => p.start < it.end && it.start < p.end);
    const cols = Math.max(1, ...cluster.map((c) => c.col + 1));
    out[it.id] = { col: it.col, cols, start: it.start, end: it.end };
  }
  return out;
}

export function yToHour(y: number, gridTop: number) {
  return clampHour(DAY_START + (y - gridTop) / HOUR_H);
}

export function hourToY(h: number) {
  return (h - DAY_START) * HOUR_H;
}
