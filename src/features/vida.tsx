import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Empty } from "@/components/empty";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LIFE_CATS, MOODS } from "@/lib/constants";
import { formatBR, monthGrid, MONTHS_PT, todayISO, WEEKDAYS } from "@/lib/dates";
import { useNara } from "@/lib/store";
import type { NotebookPage } from "@/lib/types";
import { cn, uid } from "@/lib/utils";
import { SistemaPanels } from "./sistema";

export function VidaPage() {
  const search = useSearch({ strict: false }) as { tab?: string; day?: string };
  const navigate = useNavigate();
  const tab = search.tab || "agenda";
  const setTab = (v: string) =>
    navigate({ to: "/vida", search: { ...search, tab: v } });
  return (
    <div>
      <PageHeader
        kicker="Pessoal"
        title="Vida"
        description="Agenda, diário, cadernos e a casa — o resto, no mesmo tom."
      />
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="agenda">Agenda</TabsTrigger>
          <TabsTrigger value="diario">Diário</TabsTrigger>
          <TabsTrigger value="est">Estudos</TabsTrigger>
          <TabsTrigger value="cui">Cuidado</TabsTrigger>
          <TabsTrigger value="ide">Ideias</TabsTrigger>
          <TabsTrigger value="casa">Casa</TabsTrigger>
        </TabsList>
        <TabsContent value="agenda">
          <LifeCal />
        </TabsContent>
        <TabsContent value="diario">
          <Diary initial={search.day} />
        </TabsContent>
        <TabsContent value="est">
          <Catalog cat="est" />
        </TabsContent>
        <TabsContent value="cui">
          <Catalog cat="cui" />
        </TabsContent>
        <TabsContent value="ide">
          <Catalog cat="ide" />
        </TabsContent>
        <TabsContent value="casa">
          <SistemaPanels />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LifeCal() {
  const s = useNara();
  const now = new Date();
  const [y, setY] = useState(now.getFullYear());
  const [m, setM] = useState(now.getMonth());
  const [day, setDay] = useState(todayISO());
  const grid = monthGrid(y, m);
  const events = s.life.ev.filter((e) => e.d === day);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState(LIFE_CATS[0]);
  const [tm, setTm] = useState("");

  const shift = (k: number) => {
    const d = new Date(y, m + k, 1);
    setY(d.getFullYear());
    setM(d.getMonth());
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => shift(-1)}>
            Anterior
          </Button>
          <h3 className="font-display text-xl">
            {MONTHS_PT[m]} {y}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => shift(1)}>
            Próximo
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground">
          {WEEKDAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1">
          {grid.flat().map((cell) => {
            const evs = s.life.ev.filter((e) => e.d === cell.iso);
            return (
              <button
                key={cell.iso}
                type="button"
                onClick={() => setDay(cell.iso)}
                className={cn(
                  "min-h-20 rounded-md bg-card p-1.5 text-left shadow-card",
                  !cell.inMonth && "opacity-40",
                  cell.iso === day && "ring-1 ring-primary",
                )}
              >
                <div className="text-xs">{cell.date.getDate()}</div>
                {evs.slice(0, 2).map((e) => (
                  <div key={e.id} className="truncate text-[10px] text-muted-foreground">
                    {e.t}
                  </div>
                ))}
              </button>
            );
          })}
        </div>
      </div>
      <Card>
        <CardContent className="p-4">
          <h3 className="font-display text-lg">{formatBR(day)}</h3>
          <div className="mt-3 space-y-2">
            {events.map((e) => (
              <div key={e.id} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!e.done}
                  onChange={() => s.patchLifeEvent(e.id, { done: e.done ? 0 : 1 })}
                />
                <span className={cn("flex-1", e.done && "line-through opacity-50")}>
                  {e.tm ? `${e.tm} ` : ""}
                  {e.t}
                </span>
                <button className="text-destructive" onClick={() => s.delLifeEvent(e.id)}>
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <Input placeholder="Compromisso" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Select value={cat} onChange={(e) => setCat(e.target.value)}>
              {LIFE_CATS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
            <Input type="time" value={tm} onChange={(e) => setTm(e.target.value)} />
            <Button
              onClick={() => {
                if (!title.trim()) return;
                s.addLifeEvent({
                  id: uid(),
                  d: day,
                  t: title.trim(),
                  c: cat,
                  tm,
                  done: 0,
                });
                setTitle("");
              }}
            >
              Adicionar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Diary({ initial }: { initial?: string }) {
  const s = useNara();
  const now = new Date();
  const [y, setY] = useState(now.getFullYear());
  const [m, setM] = useState(now.getMonth());
  const [open, setOpen] = useState<string | null>(initial || null);
  const grid = monthGrid(y, m);
  const page = s.life.dia.find((d) => d.id === open);

  if (open) {
    return (
      <NotebookEditor
        page={
          page || {
            id: open,
            txt: "",
            mood: "",
            song: "",
            it: [],
          }
        }
        diary
        onBack={() => setOpen(null)}
        bag="dia"
      />
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setM((x) => (x === 0 ? (setY(y - 1), 11) : x - 1))}>
          Anterior
        </Button>
        <h3 className="font-display text-xl">
          {MONTHS_PT[m]} {y}
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setM((x) => (x === 11 ? (setY(y + 1), 0) : x + 1))}>
          Próximo
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {grid.flat().map((cell) => {
          const e = s.life.dia.find((d) => d.id === cell.iso);
          return (
            <button
              key={cell.iso}
              type="button"
              onClick={() => setOpen(cell.iso)}
              className={cn(
                "min-h-20 rounded-md bg-card p-1.5 text-left shadow-card",
                !cell.inMonth && "opacity-40",
                e && "bg-secondary",
              )}
            >
              <div className="text-xs">{cell.date.getDate()}</div>
              {e?.mood ? (
                <Badge variant="outline" className="mt-1">
                  {MOODS.find((m) => m.id === e.mood)?.label || e.mood}
                </Badge>
              ) : null}
              {e?.txt ? (
                <p className="mt-1 line-clamp-2 text-[10px] text-muted-foreground">{e.txt}</p>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Catalog({ cat }: { cat: "est" | "cui" | "ide" }) {
  const s = useNara();
  const C = s.life[cat];
  const [open, setOpen] = useState<string | null>(null);
  const page = C.n.find((n) => n.id === open);
  if (open && page) {
    return (
      <NotebookEditor
        page={page}
        bag={cat}
        onBack={() => setOpen(null)}
      />
    );
  }
  return (
    <div>
      <Button
        className="mb-4"
        variant="secondary"
        onClick={() => {
          const n = prompt("Nome da pasta");
          if (n) s.addFolder(cat, n);
        }}
      >
        Nova pasta
      </Button>
      {C.f.map((f, i) => {
        const notes = C.n.filter((n) => n.f === f);
        return (
          <Card key={f} className="mb-3">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <h3 className="flex-1 font-display text-lg">{f}</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const t = prompt("Título");
                    if (!t) return;
                    const id = uid();
                    s.upsertPage(cat, { id, f, t, txt: "", it: [] });
                    setOpen(id);
                  }}
                >
                  Nova página
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const n = prompt("Renomear", f);
                    if (n) s.renameFolder(cat, i, n);
                  }}
                >
                  Renomear
                </Button>
                <Button size="sm" variant="ghost" className="text-destructive" onClick={() => s.delFolder(cat, i)}>
                  ×
                </Button>
              </div>
              {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">Vazio.</p>
              ) : (
                notes.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    className="block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-secondary"
                    onClick={() => setOpen(n.id)}
                  >
                    {n.t || "Sem título"}
                  </button>
                ))
              )}
            </CardContent>
          </Card>
        );
      })}
      {C.f.length === 0 ? <Empty title="Nenhuma pasta" /> : null}
    </div>
  );
}

function NotebookEditor({
  page,
  bag,
  diary,
  onBack,
}: {
  page: NotebookPage;
  bag: "dia" | "est" | "cui" | "ide";
  diary?: boolean;
  onBack: () => void;
}) {
  const s = useNara();
  const save = (patch: Partial<NotebookPage>) => {
    if (bag === "dia") {
      s.upsertPage("dia", { ...page, ...patch, it: patch.it ?? page.it });
    } else {
      s.patchPage(bag, page.id, patch);
    }
  };
  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        {diary ? (
          <h3 className="font-display text-xl">{formatBR(page.id)}</h3>
        ) : (
          <Input
            className="max-w-sm"
            value={page.t || ""}
            onChange={(e) => save({ t: e.target.value })}
          />
        )}
        <span className="flex-1" />
        <Button
          variant="ghost"
          className="text-destructive"
          onClick={() => {
            s.delPage(bag, page.id);
            onBack();
          }}
        >
          Excluir
        </Button>
      </div>
      {diary ? (
        <div className="mb-4 flex flex-wrap gap-1">
          {MOODS.map((m) => (
            <Button
              key={m.id}
              size="sm"
              variant={page.mood === m.id ? "default" : "ghost"}
              onClick={() => save({ mood: m.id })}
            >
              {m.label}
            </Button>
          ))}
        </div>
      ) : null}
      {diary ? (
        <Field label="Música do dia" className="mb-4 max-w-md">
          <Input
            value={page.song || ""}
            onChange={(e) => save({ song: e.target.value })}
          />
        </Field>
      ) : null}
      <Textarea
        className="paper-lines min-h-64"
        value={page.txt}
        onChange={(e) => save({ txt: e.target.value })}
        placeholder="Escreva."
      />
    </div>
  );
}
