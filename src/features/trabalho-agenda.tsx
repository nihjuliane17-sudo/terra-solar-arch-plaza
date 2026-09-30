import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { STUDIO_MONTHS } from "@/lib/constants";
import { monthGrid, todayISO, WEEKDAYS, weekKey } from "@/lib/dates";
import { tasksOnDate, type FlatTask } from "@/lib/derived";
import { refFromFlat, taskKey } from "@/lib/schedule";
import { STAGE_DOT, stageShort } from "@/lib/stage-style";
import { useNara } from "@/lib/store";
import type { TaskRef } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DaySchedule } from "./day-schedule";

type Marquee = { x0: number; y0: number; x1: number; y1: number };

export function AgendaPanel() {
  const s = useNara();
  const [mi, setMi] = useState(() => {
    const m = new Date().getMonth();
    return STUDIO_MONTHS.some((x) => x.month === m) ? m : 9;
  });
  const [day, setDay] = useState(todayISO());
  const [week, setWeek] = useState(false);
  const year = 2026;
  const grid = monthGrid(year, mi);
  const visible = week
    ? [grid.flat().filter((c) => weekKey(c.iso) === weekKey(day))]
    : grid;

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const selectedRefs = useRef<Map<string, TaskRef>>(new Map());
  const wrapRef = useRef<HTMLDivElement>(null);
  const marqueeStart = useRef<null | { x: number; y: number; additive: boolean }>(null);
  const marqueeRef = useRef<Marquee | null>(null);
  const [marquee, setMarquee] = useState<Marquee | null>(null);
  const drag = useRef<null | {
    refs: TaskRef[];
    startX: number;
    startY: number;
    active: boolean;
  }>(null);
  const [ghost, setGhost] = useState<{ x: number; y: number; label: string } | null>(null);
  const [overDay, setOverDay] = useState<string | null>(null);

  const remember = (ref: TaskRef) => {
    selectedRefs.current.set(taskKey(ref), ref);
  };

  const toggleSelect = (ref: TaskRef, additive: boolean) => {
    const key = taskKey(ref);
    remember(ref);
    setSelected((prev) => {
      const next = additive ? new Set(prev) : new Set<string>();
      if (additive && prev.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const refsForKeys = (keys: Set<string>, fallback?: TaskRef) => {
    const out: TaskRef[] = [];
    keys.forEach((k) => {
      const r = selectedRefs.current.get(k);
      if (r) out.push(r);
    });
    if (!out.length && fallback) out.push(fallback);
    return out;
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (marqueeStart.current && wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect();
        const dx = e.clientX - marqueeStart.current.x;
        const dy = e.clientY - marqueeStart.current.y;
        if (Math.hypot(dx, dy) < 6 && !marqueeRef.current) return;
        const box: Marquee = {
          x0: marqueeStart.current.x - rect.left,
          y0: marqueeStart.current.y - rect.top,
          x1: e.clientX - rect.left,
          y1: e.clientY - rect.top,
        };
        marqueeRef.current = box;
        setMarquee(box);
        return;
      }
      const d = drag.current;
      if (!d) return;
      if (!d.active && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) < 8) return;
      d.active = true;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const iso = el?.closest("[data-day]")?.getAttribute("data-day") || null;
      setOverDay(iso);
      setGhost({
        x: e.clientX,
        y: e.clientY,
        label: `${d.refs.length} encomenda${d.refs.length > 1 ? "s" : ""}`,
      });
    };
    const up = (e: PointerEvent) => {
      if (marqueeStart.current && wrapRef.current) {
        const box = marqueeRef.current;
        const start = marqueeStart.current;
        marqueeStart.current = null;
        marqueeRef.current = null;
        setMarquee(null);
        if (box) {
          const rect = wrapRef.current.getBoundingClientRect();
          const left = rect.left + Math.min(box.x0, box.x1);
          const top = rect.top + Math.min(box.y0, box.y1);
          const right = rect.left + Math.max(box.x0, box.x1);
          const bottom = rect.top + Math.max(box.y0, box.y1);
          const next = start.additive ? new Set(selectedRef.current) : new Set<string>();
          wrapRef.current.querySelectorAll<HTMLElement>("[data-task-key]").forEach((node) => {
            const r = node.getBoundingClientRect();
            const hit = r.left < right && r.right > left && r.top < bottom && r.bottom > top;
            if (!hit) return;
            const key = node.dataset.taskKey;
            if (!key) return;
            next.add(key);
            const loose = key.startsWith("l:");
            const parts = key.split(":");
            selectedRefs.current.set(key, {
              loose,
              clientId: loose ? "" : parts[1],
              taskId: parts.slice(2).join(":"),
            });
          });
          setSelected(next);
        } else {
          const iso = (e.target as HTMLElement)?.closest?.("[data-day]")?.getAttribute("data-day");
          if (iso) setDay(iso);
          if (!start.additive) setSelected(new Set());
        }
        return;
      }
      const d = drag.current;
      drag.current = null;
      if (!d) {
        setGhost(null);
        setOverDay(null);
        return;
      }
      if (d.active) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const iso = el?.closest("[data-day]")?.getAttribute("data-day");
        if (iso) s.moveMany(d.refs, { date: iso });
      }
      setGhost(null);
      setOverDay(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [s]);

  const startChipDrag = (e: React.PointerEvent, item: FlatTask) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    const ref = refFromFlat(item);
    const key = taskKey(ref);
    remember(ref);
    const keys = selected.has(key) ? selected : new Set([key]);
    if (!selected.has(key) && !e.shiftKey) setSelected(new Set([key]));
    drag.current = {
      refs: refsForKeys(keys, ref),
      startX: e.clientX,
      startY: e.clientY,
      active: false,
    };
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex flex-wrap items-center gap-1">
          {STUDIO_MONTHS.map((m) => (
            <Button
              key={m.month}
              size="sm"
              variant={mi === m.month ? "default" : "ghost"}
              onClick={() => {
                setMi(m.month);
                setWeek(false);
              }}
            >
              {m.label}
            </Button>
          ))}
          <span className="flex-1" />
          <Button size="sm" variant={week ? "ghost" : "secondary"} onClick={() => setWeek(false)}>
            Mês
          </Button>
          <Button size="sm" variant={week ? "secondary" : "ghost"} onClick={() => setWeek(true)}>
            Semana
          </Button>
        </div>
        <p className="mb-2 text-xs text-muted-foreground">
          Arraste uma caixa para selecionar várias encomendas e solte em outro dia. Clique no dia
          para a grade das 6h às 23h.
        </p>
        <div
          ref={wrapRef}
          className="relative"
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || e.button !== 0) return;
            if ((e.target as HTMLElement).closest("[data-task-key]")) return;
            marqueeStart.current = {
              x: e.clientX,
              y: e.clientY,
              additive: e.shiftKey || e.metaKey || e.ctrlKey,
            };
          }}
        >
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {visible.flat().map((cell) => {
              const items = tasksOnDate(s, cell.iso);
              const hrs = items.reduce((a, x) => a + Number(x.task.hours || 0), 0);
              return (
                <div
                  key={cell.iso}
                  data-day={cell.iso}
                  className={cn(
                    "flex min-h-28 flex-col rounded-md bg-card p-1.5 text-left shadow-card",
                    !cell.inMonth && !week && "opacity-40",
                    cell.iso === day && "ring-1 ring-primary",
                    cell.iso === todayISO() && "bg-secondary/60",
                    overDay === cell.iso && "bg-secondary ring-1 ring-primary",
                  )}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="tabular-nums">{cell.date.getDate()}</span>
                    {hrs ? (
                      <span className="tabular-nums text-muted-foreground">{hrs}h</span>
                    ) : null}
                  </div>
                  <div className="mt-1 flex flex-col gap-0.5">
                    {items.map((x) => {
                      const ref = refFromFlat(x);
                      const key = taskKey(ref);
                      return (
                        <div
                          key={key}
                          data-task-key={key}
                          onPointerDown={(e) => startChipDrag(e, x)}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (e.shiftKey || e.metaKey || e.ctrlKey) {
                              toggleSelect(ref, true);
                              return;
                            }
                            setDay(cell.iso);
                            toggleSelect(ref, false);
                          }}
                          className={cn(
                            "cursor-grab rounded px-1 py-0.5 text-[10px] leading-tight active:cursor-grabbing",
                            x.task.done && "line-through opacity-50",
                            selected.has(key) && "bg-primary/15 ring-1 ring-primary",
                          )}
                          title={`${x.client.name} · ${stageShort(x.task.type)}`}
                        >
                          <span
                            className={cn(
                              "mr-1 inline-block size-1.5 rounded-full",
                              STAGE_DOT[x.task.type] || "bg-muted-foreground",
                            )}
                          />
                          {x.client.name}
                          <span className="text-muted-foreground"> · {stageShort(x.task.type)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {marquee ? (
            <div
              className="pointer-events-none absolute z-20 rounded-sm border border-primary bg-primary/15"
              style={{
                left: Math.min(marquee.x0, marquee.x1),
                top: Math.min(marquee.y0, marquee.y1),
                width: Math.abs(marquee.x1 - marquee.x0),
                height: Math.abs(marquee.y1 - marquee.y0),
              }}
            />
          ) : null}
        </div>
        {selected.size > 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            {selected.size} selecionada{selected.size > 1 ? "s" : ""} — arraste para outro dia.
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <DaySchedule
          iso={day}
          selected={selected}
          onToggleSelect={toggleSelect}
          allowCreate
          showPonto
        />
        <Card>
          <CardContent className="p-4">
            <Field label="Notas do dia">
              <Textarea
                className="paper-lines min-h-28"
                value={s.dayNotes[day] || ""}
                onChange={(e) => s.setDayNote(day, e.target.value)}
              />
            </Field>
            <Field label="Notas da semana" className="mt-3">
              <Textarea
                className="min-h-20"
                value={s.weekNotes[weekKey(day)] || ""}
                onChange={(e) => s.setWeekNote(weekKey(day), e.target.value)}
              />
            </Field>
          </CardContent>
        </Card>
      </div>

      {ghost ? (
        <div
          className="pointer-events-none fixed z-50 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-card"
          style={{ left: ghost.x + 12, top: ghost.y + 12 }}
        >
          {ghost.label}
        </div>
      ) : null}
    </div>
  );
}
