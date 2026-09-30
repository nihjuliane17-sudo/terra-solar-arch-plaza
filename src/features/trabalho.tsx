import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Empty } from "@/components/empty";
import { Stat } from "@/components/stat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CLIENT_STAGES,
  FIXED_TASKS,
  PROCESS_STEPS,
  SOCIAL_PLATFORMS,
  STUDIO_MONTHS,
  TS_STAGES,
} from "@/lib/constants";
import { formatBR, monthGrid, monthLabel, todayISO, WEEKDAYS } from "@/lib/dates";
import {
  allTasks,
  atelierForecast,
  clientProgress,
  clientStage,
  forecastForTask,
  orderedClients,
  tasksOnDate,
  tsTotals,
  tsWeekLate,
} from "@/lib/derived";
import { brl, minutesToHM, usd } from "@/lib/money";
import { payLabel, payTone, STAGE_DOT, stageShort, stageTone } from "@/lib/stage-style";
import { useNara } from "@/lib/store";
import type { Client, ClientStage } from "@/lib/types";
import { cn, uid } from "@/lib/utils";
import { AgendaPanel } from "./trabalho-agenda";

const TABS = [
  ["processo", "Processo"],
  ["pipeline", "Pipeline"],
  ["agenda", "Agenda"],
  ["clientes", "Clientes"],
  ["ponto", "Ponto"],
  ["previsao", "Previsão"],
  ["pagamentos", "Pagamentos"],
  ["relatorio", "Relatório"],
] as const;

export type TrabalhoSearch = { tab?: string; day?: string; edit?: string };

function emptyClient(): Client {
  return {
    id: uid(),
    name: "",
    socialPlatform: "Instagram",
    socialHandle: "",
    description: "",
    valueUSD: 0,
    valueBRL: 0,
    notion: "",
    priority: { like: 0, profit: 0, urgency: 0 },
    payment: { status: "notpaid", date: "" },
    pagamentoIntegralNoRender: false,
    notes: "",
    tasks: FIXED_TASKS.map((type) => ({
      id: uid(),
      type,
      hours: 0,
      date: "",
      done: false,
    })),
    elementsEstimate: [],
  };
}

export function TrabalhoPage() {
  const search = useSearch({ strict: false }) as TrabalhoSearch;
  const navigate = useNavigate();
  const tab = TABS.some((t) => t[0] === search.tab) ? search.tab! : "processo";
  const setTab = (v: string) =>
    navigate({ to: "/trabalho", search: { ...search, tab: v } });

  return (
    <div>
      <PageHeader
        kicker="Estúdio Lumi"
        title="Trabalho"
        description="Encomendas, agenda, ponto e o processo — tudo no mesmo ritmo."
      />
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          {TABS.map(([k, l]) => (
            <TabsTrigger key={k} value={k}>
              {l}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="pipeline">
          <Pipeline />
        </TabsContent>
        <TabsContent value="agenda">
          <AgendaPanel />
        </TabsContent>
        <TabsContent value="clientes">
          <Clientes />
        </TabsContent>
        <TabsContent value="ponto">
          <Ponto />
        </TabsContent>
        <TabsContent value="processo">
          <Processo />
        </TabsContent>
        <TabsContent value="previsao">
          <Previsao />
        </TabsContent>
        <TabsContent value="pagamentos">
          <Pagamentos />
        </TabsContent>
        <TabsContent value="relatorio">
          <Relatorio />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Pipeline() {
  const s = useNara();
  const clients = orderedClients(s);
  const cols = CLIENT_STAGES;
  const grouped = useMemo(() => {
    const g: Record<string, typeof clients> = {};
    cols.forEach((c) => (g[c] = []));
    clients.forEach((c) => {
      const st = clientStage(c);
      (g[st] || g["Não iniciado"]).push(c);
    });
    return g;
  }, [clients]);

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-[980px] gap-3">
        {cols.map((col) => (
          <div key={col} className="w-44 shrink-0">
            <div className="mb-2 flex items-baseline justify-between px-1">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {stageShort(col)}
              </span>
              <span className="text-xs tabular-nums text-muted-foreground">
                {grouped[col].length}
              </span>
            </div>
            <div className="space-y-2">
              {grouped[col].map((c) => {
                const p = clientProgress(c);
                return (
                  <button
                    key={c.id}
                    type="button"
                    className="w-full rounded-lg bg-card p-3 text-left shadow-card"
                  >
                    <div className="truncate text-sm font-medium">{c.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {usd(c.valueUSD)} · {brl(c.valueBRL)}
                    </div>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {clients.length === 0 ? (
        <Empty
          title="A fila está vazia"
          body="Cadastre uma encomenda em Clientes. O pipeline se organiza sozinho pela etapa."
        />
      ) : null}
    </div>
  );
}

function Stars({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={cn(
            "size-7 rounded-full text-xs",
            n <= value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
          )}
          onClick={() => onChange(n === value ? 0 : n)}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

function ClientForm({
  initial,
  onClose,
}: {
  initial?: Client;
  onClose: () => void;
}) {
  const upsert = useNara((s) => s.upsertClient);
  const rate = useNara((s) => s.finance.usdRate);
  const [c, setC] = useState<Client>(initial || emptyClient());
  const set = (patch: Partial<Client>) => setC((x) => ({ ...x, ...patch }));

  return (
    <form
      className="grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!c.name.trim()) return;
        upsert({ ...c, valueBRL: Math.round(c.valueUSD * rate * 100) / 100 });
        onClose();
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nome">
          <Input value={c.name} onChange={(e) => set({ name: e.target.value })} required />
        </Field>
        <Field label="Rede">
          <Select
            value={c.socialPlatform}
            onChange={(e) => set({ socialPlatform: e.target.value })}
          >
            {SOCIAL_PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </Select>
        </Field>
        <Field label="@">
          <Input
            value={c.socialHandle}
            onChange={(e) => set({ socialHandle: e.target.value })}
          />
        </Field>
        <Field label={`Valor (USD) · câmbio ${rate}`}>
          <Input
            type="number"
            step="0.01"
            value={c.valueUSD || ""}
            onChange={(e) => set({ valueUSD: parseFloat(e.target.value) || 0 })}
          />
          <p className="text-xs text-muted-foreground">{brl(c.valueUSD * rate)}</p>
        </Field>
      </div>
      <Field label="Descrição">
        <Textarea
          value={c.description}
          onChange={(e) => set({ description: e.target.value })}
        />
      </Field>
      <Field label="Pasta de referências">
        <Input
          value={c.notion}
          onChange={(e) => set({ notion: e.target.value })}
          placeholder="https://"
        />
      </Field>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Gosto">
          <Stars
            value={c.priority.like}
            onChange={(n) => set({ priority: { ...c.priority, like: n } })}
          />
        </Field>
        <Field label="Lucro">
          <Stars
            value={c.priority.profit}
            onChange={(n) => set({ priority: { ...c.priority, profit: n } })}
          />
        </Field>
        <Field label="Urgência">
          <Stars
            value={c.priority.urgency}
            onChange={(n) => set({ priority: { ...c.priority, urgency: n } })}
          />
        </Field>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Pagamento">
          <Select
            value={c.payment.status}
            onChange={(e) =>
              set({ payment: { ...c.payment, status: e.target.value as Client["payment"]["status"] } })
            }
          >
            <option value="notpaid">Em aberto</option>
            <option value="half">Sinal</option>
            <option value="paid">Pago</option>
          </Select>
        </Field>
        <Field label="Data no banco">
          <Input
            type="date"
            value={c.payment.date}
            onChange={(e) => set({ payment: { ...c.payment, date: e.target.value } })}
          />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={c.pagamentoIntegralNoRender}
          onChange={(e) => set({ pagamentoIntegralNoRender: e.target.checked })}
        />
        Valor integral só no render — sem sinal no esboço
      </label>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Etapas
        </p>
        <div className="space-y-2">
          {c.tasks.map((t, i) => (
            <div key={t.id} className="grid grid-cols-[1fr_80px_1fr] gap-2">
              <Input value={t.type} readOnly className="bg-secondary/40" />
              <Input
                type="number"
                step="0.5"
                value={t.hours || ""}
                placeholder="h"
                onChange={(e) => {
                  const tasks = c.tasks.map((x, k) =>
                    k === i ? { ...x, hours: parseFloat(e.target.value) || 0 } : x,
                  );
                  set({ tasks });
                }}
              />
              <Input
                type="date"
                value={t.date}
                onChange={(e) => {
                  const tasks = c.tasks.map((x, k) =>
                    k === i ? { ...x, date: e.target.value } : x,
                  );
                  set({ tasks });
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              set({
                tasks: [
                  ...c.tasks,
                  { id: uid(), type: "Alteração", hours: 0, date: "", done: false },
                ],
              })
            }
          >
            Incluir alteração
          </Button>
        </div>
      </div>
      <Field label="Notas">
        <Textarea value={c.notes} onChange={(e) => set({ notes: e.target.value })} />
      </Field>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">{initial ? "Salvar" : "Adicionar"}</Button>
      </div>
    </form>
  );
}

function Clientes() {
  const s = useNara();
  const [editing, setEditing] = useState<Client | null | "new">(null);
  const list = orderedClients(s);
  const [dragId, setDragId] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setEditing("new")}>Nova encomenda</Button>
      </div>
      {editing ? (
        <Card className="mb-6">
          <CardContent className="p-5">
            <h3 className="mb-4 font-display text-xl">
              {editing === "new" ? "Nova encomenda" : "Editar"}
            </h3>
            <ClientForm
              initial={editing === "new" ? undefined : editing}
              onClose={() => setEditing(null)}
            />
          </CardContent>
        </Card>
      ) : null}
      {list.length === 0 && editing !== "new" ? (
        <Empty title="Nenhuma encomenda" body="Comece por uma ficha — o resto se apoia nela." />
      ) : (
        <div className="space-y-2">
          {list.map((c, i) => {
            const st = clientStage(c);
            const p = clientProgress(c);
            return (
              <div
                key={c.id}
                draggable
                onDragStart={() => setDragId(c.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (!dragId || dragId === c.id) return;
                  const ids = list.map((x) => x.id);
                  const from = ids.indexOf(dragId);
                  ids.splice(from, 1);
                  ids.splice(i, 0, dragId);
                  s.setClientOrder(ids);
                  setDragId(null);
                }}
                className="flex flex-wrap items-center gap-3 rounded-lg bg-card px-4 py-3 shadow-card"
              >
                <span className="w-6 text-xs tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
                <div className="min-w-40 flex-1">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {c.socialHandle || c.socialPlatform}
                  </div>
                </div>
                <Badge variant={stageTone(st)}>{stageShort(st)}</Badge>
                <Badge variant={payTone(c.payment.status)}>
                  {payLabel(c.payment.status)}
                </Badge>
                <span className="text-sm tabular-nums">{brl(c.valueBRL)}</span>
                <span className="w-16 text-right text-xs text-muted-foreground">
                  {p.done}/{p.total}
                </span>
                <Select
                  className="w-40"
                  value={st}
                  onChange={(e) => s.setClientStage(c.id, e.target.value as ClientStage)}
                >
                  {CLIENT_STAGES.map((x) => (
                    <option key={x} value={x}>
                      {stageShort(x)}
                    </option>
                  ))}
                </Select>
                <Button variant="ghost" size="sm" onClick={() => setEditing(c)}>
                  Editar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => {
                    if (confirm("Excluir esta encomenda?")) s.deleteClient(c.id);
                  }}
                >
                  Excluir
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Ponto() {
  const s = useNara();
  const [iso, setIso] = useState(todayISO());
  const d = s.timesheet.days[iso] || { e1: "", s1: "", e2: "", s2: "", tasks: [] };
  const tot = tsTotals(s, iso);
  const lateWeek = tsWeekLate(s, iso);

  const dates: string[] = [];
  for (let t = new Date(2026, 8, 29); t <= new Date(2026, 9, 31); t.setDate(t.getDate() + 1)) {
    dates.push(todayISO(new Date(t)));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
      <div>
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <Field label="Dia">
            <Input type="date" value={iso} onChange={(e) => setIso(e.target.value)} />
          </Field>
          <Field label="Jornada (h)">
            <Input
              type="number"
              step="0.25"
              className="w-24"
              value={s.timesheet.jornada}
              onChange={(e) => s.setJornada(parseFloat(e.target.value) || 0)}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              ["e1", "Entrada"],
              ["s1", "Saída almoço"],
              ["e2", "Volta"],
              ["s2", "Saída"],
            ] as const
          ).map(([k, l]) => (
            <Field key={k} label={l}>
              <Input
                type="time"
                value={d[k]}
                onChange={(e) => s.setTimesheetField(iso, k, e.target.value)}
              />
            </Field>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Trabalhadas" value={tot.w ? minutesToHM(tot.w) : "—"} />
          <Stat label="Extra" value={tot.x ? minutesToHM(tot.x) : "—"} />
          <Stat
            label="Atraso (semana)"
            value={lateWeek ? minutesToHM(lateWeek) : "—"}
            tone={lateWeek > 120 ? "bad" : tot.late > 10 ? "warn" : "default"}
          />
        </div>
        <h3 className="mb-2 mt-8 font-display text-lg">Demandas do dia</h3>
        <div className="space-y-2">
          {(d.tasks || []).map((t, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[1fr_140px_90px_1fr_auto]">
              <Input
                placeholder="Demanda"
                value={t.n}
                onChange={(e) => s.patchTsTask(iso, i, { n: e.target.value })}
              />
              <Select
                value={t.s}
                onChange={(e) => s.patchTsTask(iso, i, { s: e.target.value })}
              >
                <option value="">Etapa</option>
                {TS_STAGES.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </Select>
              <Input
                placeholder="1:30"
                value={t.h}
                onChange={(e) => s.patchTsTask(iso, i, { h: e.target.value })}
              />
              <Input
                placeholder="Nota"
                value={t.o}
                onChange={(e) => s.patchTsTask(iso, i, { o: e.target.value })}
              />
              <Button variant="ghost" size="sm" onClick={() => s.delTsTask(iso, i)}>
                ×
              </Button>
            </div>
          ))}
        </div>
        <Button className="mt-3" variant="secondary" onClick={() => s.addTsTask(iso)}>
          Adicionar demanda
        </Button>
      </div>
      <Card>
        <CardContent className="max-h-[70vh] overflow-auto p-3">
          <p className="mb-2 px-1 text-xs uppercase tracking-wider text-muted-foreground">
            29/09–31/10
          </p>
          {dates.map((k) => {
            const t = tsTotals(s, k);
            return (
              <button
                key={k}
                type="button"
                onClick={() => setIso(k)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs",
                  k === iso && "bg-secondary",
                )}
              >
                <span>{formatBR(k)}</span>
                <span className="tabular-nums text-muted-foreground">
                  {t.w ? minutesToHM(t.w) : "—"}
                </span>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

function Processo() {
  const s = useNara();
  const [key, setKey] = useState("geral");
  const F = s.flow[key] || {};
  let tot = 0;
  let ok = 0;
  PROCESS_STEPS.forEach((st, si) =>
    st.items.forEach((_, i) => {
      tot++;
      if (F[`${si}_${i}`]) ok++;
    }),
  );
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end gap-3">
        <Field label="Encomenda">
          <Select value={key} onChange={(e) => setKey(e.target.value)} className="w-64">
            <option value="geral">Modelo geral</option>
            {s.clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
        <Button variant="ghost" onClick={() => s.clearFlow(key)}>
          Limpar
        </Button>
        <span className="text-sm text-muted-foreground">
          {ok}/{tot} · {tot ? Math.round((ok / tot) * 100) : 0}%
        </span>
      </div>
      <div className="space-y-4">
        {PROCESS_STEPS.map((st, si) => (
          <Card key={st.n}>
            <CardContent className="p-5">
              <div className="mb-3 flex items-baseline gap-3">
                <span className="font-display text-2xl text-primary">{st.n}</span>
                <div>
                  <h3 className="font-display text-xl">{st.title}</h3>
                  <p className="text-xs text-muted-foreground">
                    cláusula {st.clause} · {st.sub}
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {st.items.map((it, i) => {
                  const k = `${si}_${i}`;
                  return (
                    <li key={k}>
                      <label className="flex items-start gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="mt-0.5 accent-primary"
                          checked={!!F[k]}
                          onChange={(e) => s.setFlow(key, k, e.target.checked)}
                        />
                        <span className={cn(F[k] && "text-muted-foreground line-through")}>
                          {it}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Previsao() {
  const s = useNara();
  const [from, setFrom] = useState(todayISO().slice(0, 8) + "01");
  const [to, setTo] = useState(todayISO());
  const [mi, setMi] = useState(new Date().getMonth());
  const tasks = allTasks(s).filter(
    (x) => x.task.date && x.task.date >= from && x.task.date <= to,
  );
  let sinal = 0;
  let saldo = 0;
  tasks.forEach((x) => {
    if ("isLoose" in x.client) return;
    const v = forecastForTask(x.client, x.task);
    if (x.task.type === "Esboços") sinal += v;
    if (x.task.type === "Renderização") saldo += v;
  });
  const a = atelierForecast(s);
  const year = 2026;
  const grid = monthGrid(year, mi);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <Field label="De">
          <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </Field>
        <Field label="Até">
          <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </Field>
      </div>
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Stat label="Previsto no período" value={brl(sinal + saldo)} />
        <Stat label="Sinal (esboço)" value={brl(sinal)} />
        <Stat label="Saldo (render)" value={brl(saldo)} />
      </div>
      <div className="mb-4 flex flex-wrap gap-1">
        {STUDIO_MONTHS.map((m) => (
          <Button
            key={m.month}
            size="sm"
            variant={mi === m.month ? "default" : "ghost"}
            onClick={() => setMi(m.month)}
          >
            {m.label}
          </Button>
        ))}
      </div>
      <p className="mb-3 text-sm text-muted-foreground">
        Out–dez previsto: {brl(a.tot)} · já recebido {brl(a.rec[10] + a.rec[11] + a.rec[12])}
      </p>
      <div className="grid grid-cols-8 gap-1 text-center text-[11px] text-muted-foreground">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
        <div>Semana</div>
      </div>
      <div className="mt-1 grid grid-cols-8 gap-1">
        {grid.map((weekRow) => {
          const weekVal = weekRow.reduce((acc, cell) => {
            const dayTasks = tasksOnDate(s, cell.iso).filter((x) => !("isLoose" in x.client));
            return (
              acc +
              dayTasks.reduce(
                (sum, x) => sum + forecastForTask(x.client as Client, x.task),
                0,
              )
            );
          }, 0);
          return (
            <WeekRow
              key={weekRow[0].iso}
              weekRow={weekRow}
              weekVal={weekVal}
              s={s}
            />
          );
        })}
      </div>
    </div>
  );
}

function WeekRow({
  weekRow,
  weekVal,
  s,
}: {
  weekRow: ReturnType<typeof monthGrid>[number];
  weekVal: number;
  s: ReturnType<typeof useNara.getState>;
}) {
  return (
    <div className="contents">
      {weekRow.map((cell) => {
        const dayTasks = tasksOnDate(s, cell.iso).filter((x) => !("isLoose" in x.client));
        const v = dayTasks.reduce(
          (acc, x) => acc + forecastForTask(x.client as Client, x.task),
          0,
        );
        return (
          <div
            key={cell.iso}
            className={cn(
              "min-h-16 rounded-md bg-card p-1.5 text-left text-xs shadow-card",
              !cell.inMonth && "opacity-40",
            )}
          >
            <div className="text-muted-foreground">{cell.date.getDate()}</div>
            {v ? <div className="mt-1 tabular-nums text-primary">{brl(v)}</div> : null}
          </div>
        );
      })}
      <div className="flex min-h-16 flex-col justify-center rounded-md bg-secondary/70 p-1.5 text-xs shadow-card">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</div>
        <div className="mt-1 font-medium tabular-nums text-primary">
          {weekVal ? brl(weekVal) : "—"}
        </div>
      </div>
    </div>
  );
}

function Pagamentos() {
  const s = useNara();
  const [mi, setMi] = useState(new Date().getMonth());
  const [day, setDay] = useState<string | null>(null);
  const [value, setValue] = useState("");
  const [clientId, setClientId] = useState(s.clients[0]?.id || "");
  const [method, setMethod] = useState("Pix");
  const [note, setNote] = useState("");
  const year = 2026;
  const grid = monthGrid(year, mi);
  const monthPays = s.payments.filter((p) => p.date.slice(5, 7) === String(mi + 1).padStart(2, "0"));
  const total = monthPays.reduce((a, p) => a + p.value, 0);
  const dayPays = s.payments.filter((p) => p.date === day);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-3 flex flex-wrap gap-1">
          {STUDIO_MONTHS.map((m) => (
            <Button
              key={m.month}
              size="sm"
              variant={mi === m.month ? "default" : "ghost"}
              onClick={() => setMi(m.month)}
            >
              {m.label}
            </Button>
          ))}
        </div>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Stat label="Recebido no mês" value={brl(total)} />
          <Stat label="Lançamentos" value={String(monthPays.length)} />
        </div>
        <div className="grid grid-cols-7 gap-1">
          {grid.flat().map((cell) => {
            const n = s.payments.filter((p) => p.date === cell.iso).length;
            return (
              <button
                key={cell.iso}
                type="button"
                onClick={() => setDay(cell.iso)}
                className={cn(
                  "min-h-14 rounded-md bg-card p-1.5 text-left text-xs shadow-card",
                  !cell.inMonth && "opacity-40",
                  day === cell.iso && "ring-1 ring-primary",
                )}
              >
                <div>{cell.date.getDate()}</div>
                {n ? <div className="text-primary">{n}</div> : null}
              </button>
            );
          })}
        </div>
      </div>
      <Card>
        <CardContent className="p-4">
          <h3 className="font-display text-lg">
            {day ? formatBR(day) : "Escolha um dia"}
          </h3>
          {day ? (
            <div className="mt-3 grid gap-2">
              {dayPays.map((p) => (
                <div key={p.id} className="flex items-center justify-between text-sm">
                  <span>
                    {p.clientName} · {p.method}
                  </span>
                  <span className="tabular-nums">
                    {brl(p.value)}
                    <button
                      className="ml-2 text-destructive"
                      onClick={() => s.deletePayment(p.id)}
                    >
                      ×
                    </button>
                  </span>
                </div>
              ))}
              <Select value={clientId} onChange={(e) => setClientId(e.target.value)}>
                {s.clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              <Input
                type="number"
                placeholder="Valor R$"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Select value={method} onChange={(e) => setMethod(e.target.value)}>
                {["Pix", "Cartão", "Dinheiro", "Transferência", "Outro"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </Select>
              <Input
                placeholder="Nota"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <Button
                onClick={() => {
                  const client = s.clients.find((c) => c.id === clientId);
                  const v = parseFloat(value);
                  if (!client || !v) return;
                  s.addPayment({
                    date: day,
                    clientId: client.id,
                    clientName: client.name,
                    value: v,
                    method,
                    note,
                  });
                  setValue("");
                  setNote("");
                }}
              >
                Registrar
              </Button>
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Clique no calendário para lançar o que caiu na conta.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Relatorio() {
  const s = useNara();
  const [kind, setKind] = useState<"week" | "month" | "all">("week");
  const [iso, setIso] = useState(todayISO());
  const [mi, setMi] = useState(new Date().getMonth());
  let from = "0000-00-00";
  let to = "9999-99-99";
  let label = "Tempo todo";
  if (kind === "month") {
    const last = new Date(2026, mi + 1, 0).getDate();
    from = `2026-${String(mi + 1).padStart(2, "0")}-01`;
    to = `2026-${String(mi + 1).padStart(2, "0")}-${String(last).padStart(2, "0")}`;
    label = monthLabel(2026, mi);
  } else if (kind === "week") {
    const d = new Date(iso + "T12:00:00");
    const s0 = new Date(d);
    s0.setDate(d.getDate() - d.getDay());
    const e0 = new Date(s0);
    e0.setDate(s0.getDate() + 6);
    from = todayISO(s0);
    to = todayISO(e0);
    label = `${formatBR(from)} – ${formatBR(to)}`;
  }
  const inR = (d?: string) => !!d && d >= from && d <= to;
  const done = allTasks(s).filter((x) => x.task.done && inR(x.task.date));
  const hrs = done.reduce((a, x) => a + Number(x.task.hours || 0), 0);
  const pg = s.payments.filter((p) => inR(p.date));
  const pgT = pg.reduce((a, p) => a + p.value, 0);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {(
          [
            ["week", "Semana"],
            ["month", "Mês"],
            ["all", "Tudo"],
          ] as const
        ).map(([k, l]) => (
          <Button key={k} size="sm" variant={kind === k ? "default" : "outline"} onClick={() => setKind(k)}>
            {l}
          </Button>
        ))}
        {kind === "week" ? (
          <Input type="date" className="w-40" value={iso} onChange={(e) => setIso(e.target.value)} />
        ) : null}
        {kind === "month" ? (
          <Select value={String(mi)} onChange={(e) => setMi(+e.target.value)} className="w-40">
            {STUDIO_MONTHS.map((m) => (
              <option key={m.month} value={m.month}>
                {m.label}
              </option>
            ))}
          </Select>
        ) : null}
        <Button variant="secondary" size="sm" className="no-print" onClick={() => window.print()}>
          Imprimir
        </Button>
      </div>
      <div className="rounded-xl bg-card p-6 shadow-card" id="report">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Lumi · relatório
        </p>
        <h2 className="font-display text-2xl">{label}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Stat label="Concluídas" value={String(done.length)} />
          <Stat label="Horas" value={`${Math.round(hrs * 10) / 10}h`} />
          <Stat label="Recebido" value={brl(pgT)} />
        </div>
        <table className="mt-6 w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="py-2">Data</th>
              <th>Cliente</th>
              <th>Etapa</th>
              <th className="text-right">Horas</th>
            </tr>
          </thead>
          <tbody>
            {done.map((x) => (
              <tr key={x.task.id} className="border-t border-border">
                <td className="py-2">{formatBR(x.task.date)}</td>
                <td>{x.client.name}</td>
                <td>{stageShort(x.task.type)}</td>
                <td className="text-right tabular-nums">{x.task.hours || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


