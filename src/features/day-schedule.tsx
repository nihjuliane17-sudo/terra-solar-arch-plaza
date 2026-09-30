import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatLong } from "@/lib/dates";
import { forecastForTask, tasksOnDate, type FlatTask } from "@/lib/derived";
import { brl } from "@/lib/money";
import {
  DAY_END,
  DAY_HOURS,
  DAY_START,
  HOUR_H,
  hourToLabel,
  hourToY,
  packDay,
  parseTimeToHour,
  refFromFlat,
  snapHour,
  taskKey,
  visualHours,
  yToHour,
} from "@/lib/schedule";
import { STAGE_DOT, stageShort } from "@/lib/stage-style";
import { useNara } from "@/lib/store";
import type { Client, TaskRef } from "@/lib/types";
import { cn, uid } from "@/lib/utils";

type Props = {
  iso: string;
  selected?: Set<string>;
  onToggleSelect?: (ref: TaskRef, additive: boolean) => void;
  allowCreate?: boolean;
  showPonto?: boolean;
};

export function DaySchedule({
  iso,
  selected,
  onToggleSelect,
  allowCreate = true,
  showPonto = true,
}: Props) {
  const s = useNara();
  const items = tasksOnDate(s, iso);
  const timed = items.filter((x) => x.task.startHour != null);
  const untimed = items.filter((x) => x.task.startHour == null);
  const packed = useMemo(() => packDay(items), [items]);
  const ponto = s.timesheet.days[iso];
  const gridRef = useRef<HTMLDivElement>(null);
  const drag = useRef<null | {
    refs: TaskRef[];
    mode: "move" | "resize";
    originHour: number;
    originHours: number;
    startY: number;
    moved: boolean;
  }>(null);
  const skipClick = useRef(false);
  const [ghost, setGhost] = useState<{ top: number; height: number } | null>(null);
  const [editing, setEditing] = useState<FlatTask | null>(null);
  const [draftHour, setDraftHour] = useState<number | null>(null);

  const earn = items.reduce((a, x) => {
    if ("isLoose" in x.client) return a;
    return a + forecastForTask(x.client as Client, x.task);
  }, 0);
  const hrs = items.reduce((a, x) => a + Number(x.task.hours || 0), 0);

  const bands = useMemo(() => {
    if (!showPonto || !ponto) return [];
    const out: { top: number; height: number; label: string }[] = [];
    const push = (a?: string, b?: string, label?: string) => {
      const sH = a ? parseTimeToHour(a) : undefined;
      const eH = b ? parseTimeToHour(b) : undefined;
      if (sH == null || eH == null || eH <= sH) return;
      out.push({
        top: hourToY(sH),
        height: (eH - sH) * HOUR_H,
        label: label || "",
      });
    };
    push(ponto.e1, ponto.s1 || ponto.s2, "manhã");
    push(ponto.e2, ponto.s2, "tarde");
    return out;
  }, [ponto, showPonto]);

  const applyMove = (clientY: number) => {
    const d = drag.current;
    const grid = gridRef.current;
    if (!d || !grid) return;
    const rect = grid.getBoundingClientRect();
    if (d.mode === "move") {
      const next = yToHour(clientY - (d.startY - hourToY(d.originHour) - rect.top), rect.top);
      setGhost({ top: hourToY(next), height: visualHours(d.originHours) * HOUR_H });
    } else {
      const nextH = Math.max(SNAP_MIN, snapHour((clientY - rect.top) / HOUR_H + DAY_START - d.originHour));
      setGhost({ top: hourToY(d.originHour), height: nextH * HOUR_H });
    }
  };

  const commitDrag = (clientY: number) => {
    const d = drag.current;
    const grid = gridRef.current;
    drag.current = null;
    setGhost(null);
    if (!d || !grid) return;
    if (!d.moved) return;
    skipClick.current = true;
    const rect = grid.getBoundingClientRect();
    const store = useNara.getState();
    if (d.mode === "move") {
      const next = yToHour(clientY - (d.startY - hourToY(d.originHour) - rect.top), rect.top);
      store.moveMany(d.refs, { startHour: next });
    } else {
      const nextH = Math.max(SNAP_MIN, snapHour((clientY - rect.top) / HOUR_H + DAY_START - d.originHour));
      store.moveMany(d.refs, { hours: nextH });
    }
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!drag.current) return;
      if (Math.hypot(e.clientY - drag.current.startY, 0) > 4) drag.current.moved = true;
      applyMove(e.clientY);
    };
    const up = (e: PointerEvent) => commitDrag(e.clientY);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  const onGridPointerUp = (e: React.PointerEvent) => {
    if (skipClick.current) {
      skipClick.current = false;
      return;
    }
    if (drag.current?.moved) return;
    if ((e.target as HTMLElement).closest("[data-task-key]")) return;
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    setDraftHour(yToHour(e.clientY, rect.top));
  };

  const dropUntimed = (hour: number, ref: TaskRef) => {
    s.moveMany([ref], { date: iso, startHour: hour });
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="font-display text-xl capitalize">{formatLong(iso)}</h3>
          <p className="text-xs text-muted-foreground">
            {hrs || 0}h previstas
            {earn ? ` · ${brl(earn)}` : ""} · {DAY_START}h–{DAY_END}h
          </p>
        </div>
      </div>

      {untimed.length ? (
        <div className="mb-3 rounded-lg bg-secondary/60 p-2">
          <p className="mb-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
            Sem horário — arraste para a grade
          </p>
          <div className="flex flex-wrap gap-1">
            {untimed.map((x) => {
              const ref = refFromFlat(x);
              const key = taskKey(ref);
              return (
                <button
                  key={key}
                  type="button"
                  data-task-key={key}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/lumi-task", JSON.stringify(ref));
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onClick={(e) => {
                    if (onToggleSelect && (e.shiftKey || e.metaKey || e.ctrlKey)) {
                      onToggleSelect(ref, true);
                    } else {
                      setEditing(x);
                    }
                  }}
                  className={cn(
                    "rounded-md bg-card px-2 py-1 text-left text-xs shadow-card",
                    x.task.done && "opacity-50 line-through",
                    selected?.has(key) && "ring-1 ring-primary",
                  )}
                >
                  <span
                    className={cn(
                      "mr-1 inline-block size-1.5 rounded-full",
                      STAGE_DOT[x.task.type] || "bg-muted-foreground",
                    )}
                  />
                  {x.client.name}
                  <span className="text-muted-foreground"> · {stageShort(x.task.type)}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl bg-card shadow-card">
        <div className="flex">
          <div className="w-12 shrink-0 border-r border-border py-0 text-right">
            {DAY_HOURS.map((h) => (
              <div
                key={h}
                className="pr-2 text-[10px] tabular-nums text-muted-foreground"
                style={{ height: HOUR_H }}
              >
                <span className="-translate-y-2 block pt-0.5">{hourToLabel(h)}</span>
              </div>
            ))}
          </div>
          <div
            ref={gridRef}
            className="relative min-h-0 flex-1 select-none"
            style={{ height: (DAY_END - DAY_START) * HOUR_H }}
            onPointerUp={onGridPointerUp}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const raw = e.dataTransfer.getData("text/lumi-task");
              if (!raw || !gridRef.current) return;
              try {
                const ref = JSON.parse(raw) as TaskRef;
                const hour = yToHour(e.clientY, gridRef.current.getBoundingClientRect().top);
                dropUntimed(hour, ref);
              } catch {
                /* ignore */
              }
            }}
          >
            {DAY_HOURS.map((h) => (
              <div
                key={h}
                data-hour={h}
                className="border-t border-border/70"
                style={{ height: HOUR_H }}
              />
            ))}
            {bands.map((b, i) => (
              <div
                key={i}
                className="pointer-events-none absolute inset-x-0 bg-primary/8"
                style={{ top: b.top, height: b.height }}
              />
            ))}
            {ghost ? (
              <div
                className="pointer-events-none absolute inset-x-2 rounded-md bg-primary/20 ring-1 ring-primary"
                style={{ top: ghost.top, height: ghost.height }}
              />
            ) : null}
            {timed.map((x) => {
              const ref = refFromFlat(x);
              const key = taskKey(ref);
              const pack = packed[x.task.id];
              if (!pack) return null;
              const width = `calc((100% - 8px) / ${pack.cols})`;
              const left = `calc(4px + ${pack.col} * (100% - 8px) / ${pack.cols})`;
              return (
                <div
                  key={key}
                  data-task-key={key}
                  className={cn(
                    "absolute z-10 cursor-grab overflow-hidden rounded-md bg-secondary px-2 py-1 text-xs shadow-card active:cursor-grabbing",
                    x.task.done && "opacity-50",
                    selected?.has(key) && "ring-1 ring-primary",
                  )}
                  style={{
                    top: hourToY(pack.start),
                    height: Math.max(22, (pack.end - pack.start) * HOUR_H - 2),
                    left,
                    width,
                  }}
                  onPointerDown={(e) => {
                    if (e.button !== 0) return;
                    const handle = (e.target as HTMLElement).dataset.resize;
                    drag.current = {
                      refs:
                        selected?.has(key) && selected.size > 1 && onToggleSelect
                          ? items
                              .filter((it) => selected.has(taskKey(refFromFlat(it))))
                              .map(refFromFlat)
                          : [ref],
                      mode: handle ? "resize" : "move",
                      originHour: pack.start,
                      originHours: visualHours(x.task.hours),
                      startY: e.clientY,
                      moved: false,
                    };
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (drag.current?.moved) return;
                    if (onToggleSelect && (e.shiftKey || e.metaKey || e.ctrlKey)) {
                      onToggleSelect(ref, true);
                      return;
                    }
                    setEditing(x);
                  }}
                >
                  <div className="flex items-start gap-1">
                    <span
                      className={cn(
                        "mt-1 inline-block size-1.5 shrink-0 rounded-full",
                        STAGE_DOT[x.task.type] || "bg-muted-foreground",
                      )}
                    />
                    <div className="min-w-0">
                      <div className={cn("truncate font-medium", x.task.done && "line-through")}>
                        {x.client.name}
                      </div>
                      <div className="truncate text-[10px] text-muted-foreground">
                        {hourToLabel(pack.start)} · {stageShort(x.task.type)}
                        {x.task.hours ? ` · ${x.task.hours}h` : ""}
                      </div>
                    </div>
                  </div>
                  <div
                    data-resize="1"
                    className="absolute inset-x-0 bottom-0 h-2 cursor-ns-resize"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {allowCreate ? (
        <AddTaskForm iso={iso} presetHour={draftHour} onPresetUsed={() => setDraftHour(null)} />
      ) : null}

      <TaskEditor item={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

const SNAP_MIN = 0.5;

function AddTaskForm({
  iso,
  presetHour,
  onPresetUsed,
}: {
  iso: string;
  presetHour: number | null;
  onPresetUsed: () => void;
}) {
  const s = useNara();
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");
  const [hours, setHours] = useState("1");
  const [notes, setNotes] = useState("");
  const [cid, setCid] = useState(s.clients[0]?.id || "");
  const [stage, setStage] = useState("");
  const [mode, setMode] = useState<"loose" | "client">("loose");
  const client = s.clients.find((c) => c.id === cid);

  useEffect(() => {
    if (presetHour == null) return;
    setTime(hourToLabel(presetHour));
    onPresetUsed();
    // preset is a one-shot from the parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetHour]);

  return (
    <div className="mt-4 rounded-xl bg-card p-4 shadow-card">
      <div className="mb-3 flex gap-1">
        <Button size="sm" variant={mode === "loose" ? "secondary" : "ghost"} onClick={() => setMode("loose")}>
          Nova tarefa
        </Button>
        <Button size="sm" variant={mode === "client" ? "secondary" : "ghost"} onClick={() => setMode("client")}>
          Marcar etapa
        </Button>
      </div>
      {mode === "loose" ? (
        <div className="grid gap-2 sm:grid-cols-[1fr_110px_80px_auto]">
          <Input
            placeholder="O que precisa ser feito"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Input
            type="number"
            step="0.5"
            min="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            title="Duração (h)"
          />
          <Button
            onClick={() => {
              if (!title.trim()) return;
              s.addLoose({
                id: uid(),
                title: title.trim(),
                date: iso,
                hours: parseFloat(hours) || 1,
                done: false,
                startHour: parseTimeToHour(time) ?? 9,
                notes: notes.trim(),
              });
              setTitle("");
              setNotes("");
            }}
          >
            Adicionar
          </Button>
          <Textarea
            className="sm:col-span-4 min-h-16"
            placeholder="Observação (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          <Select value={cid} onChange={(e) => setCid(e.target.value)}>
            {s.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          <Select value={stage} onChange={(e) => setStage(e.target.value)}>
            <option value="">Etapa</option>
            {(client?.tasks || []).map((t) => (
              <option key={t.id} value={t.id}>
                {t.type}
              </option>
            ))}
          </Select>
          <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          <Input
            type="number"
            step="0.5"
            min="0.5"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <Textarea
            className="sm:col-span-2 min-h-16"
            placeholder="Observação (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button
            className="sm:col-span-2"
            onClick={() => {
              if (!client || !stage) return;
              s.patchTask(client.id, stage, {
                date: iso,
                hours: parseFloat(hours) || 1,
                startHour: parseTimeToHour(time) ?? 9,
                notes: notes.trim(),
              });
              setNotes("");
            }}
          >
            Marcar neste dia
          </Button>
        </div>
      )}
    </div>
  );
}

function TaskEditor({
  item,
  onClose,
}: {
  item: FlatTask | null;
  onClose: () => void;
}) {
  const s = useNara();
  const [time, setTime] = useState("09:00");
  const [hours, setHours] = useState("1");
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!item) return;
    setTime(hourToLabel(item.task.startHour ?? 9));
    setHours(String(item.task.hours || 1));
    setNotes(item.loose?.notes || item.task.notes || "");
    setTitle(item.loose?.title || item.client.name);
  }, [item]);

  if (!item) return null;
  const loose = "isLoose" in item.client;

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogTitle>{loose ? "Tarefa" : item.client.name}</DialogTitle>
        <p className="mb-3 text-sm text-muted-foreground">{stageShort(item.task.type)}</p>
        <div className="grid gap-3">
          {loose ? (
            <Field label="Título">
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Field>
          ) : null}
          <div className="grid grid-cols-2 gap-3">
            <Field label="Horário">
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Field>
            <Field label="Duração (h)">
              <Input
                type="number"
                step="0.5"
                min="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Observação">
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="min-h-24" />
          </Field>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              checked={!!item.task.done}
              onChange={() => {
                if (loose) s.patchLoose(item.task.id, { done: !item.task.done });
                else s.toggleTaskDone(item.client.id, item.task.id);
              }}
            />
            Concluída
          </label>
          <div className="flex justify-between">
            {loose ? (
              <Button
                variant="ghost"
                className="text-destructive"
                onClick={() => {
                  s.deleteLoose(item.task.id);
                  onClose();
                }}
              >
                Excluir
              </Button>
            ) : (
              <span />
            )}
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  const patch = {
                    startHour: parseTimeToHour(time) ?? 9,
                    hours: parseFloat(hours) || 1,
                    notes,
                  };
                  if (loose) s.patchLoose(item.task.id, { ...patch, title: title.trim() || item.task.type });
                  else s.patchTask(item.client.id, item.task.id, patch);
                  onClose();
                }}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
