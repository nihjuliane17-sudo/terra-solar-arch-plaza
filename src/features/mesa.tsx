import {
  Camera,
  ExternalLink,
  FileText,
  Gem,
  Globe,
  MessageSquare,
  Pin,
  Plus,
  Receipt,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { COMPANY_TYPES } from "@/lib/constants";
import { CONTRACT } from "@/lib/contract";
import { todayISO } from "@/lib/dates";
import { useNara } from "@/lib/store";
import { cn, uid } from "@/lib/utils";

const ICONS: Record<string, typeof Sparkles> = {
  Sparkles,
  MessageSquare,
  Gem,
  Receipt,
  Pin,
  Camera,
  Globe,
  FileText,
};

export function MesaPage() {
  return (
    <div>
      <PageHeader
        kicker="Escritório"
        title="Mesa"
        description="Contrato, burocracia, tarefas da empresa e os atalhos do dia a dia."
      />
      <Tabs defaultValue="contrato">
        <TabsList>
          <TabsTrigger value="contrato">Contrato</TabsTrigger>
          <TabsTrigger value="tarefas">Tarefas</TabsTrigger>
          <TabsTrigger value="atalhos">Atalhos</TabsTrigger>
        </TabsList>
        <TabsContent value="contrato">
          <Contrato />
        </TabsContent>
        <TabsContent value="tarefas">
          <Tarefas />
        </TabsContent>
        <TabsContent value="atalhos">
          <Atalhos />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Contrato() {
  return (
    <article className="mx-auto max-w-2xl">
      <header className="mb-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {CONTRACT.tag}
        </p>
        <h2 className="mt-2 font-display text-4xl">{CONTRACT.studio}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{CONTRACT.number}</p>
        <p className="text-xs text-muted-foreground">{CONTRACT.note}</p>
      </header>
      <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{CONTRACT.intro}</p>
      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        {CONTRACT.parties.map((p) => (
          <div key={p.name} className="rounded-lg bg-card px-4 py-3 text-center shadow-card">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {p.role}
            </div>
            <div className="mt-1 font-display text-lg">{p.name}</div>
          </div>
        ))}
      </div>
      <div className="space-y-8">
        {CONTRACT.clauses.map((c) => (
          <section key={c.n}>
            <h3 className="mb-2 flex items-baseline gap-3 font-display text-xl">
              <span className="text-primary">{c.n}</span>
              {c.title}
            </h3>
            {c.body.map((p) => (
              <p key={p} className="mb-2 text-sm leading-relaxed">
                {p}
              </p>
            ))}
            {c.warn ? (
              <p className="mt-2 border-l-2 border-primary pl-3 text-sm text-primary">{c.warn}</p>
            ) : null}
          </section>
        ))}
      </div>
      <footer className="mt-12 grid gap-6 border-t border-border pt-6 text-center text-sm sm:grid-cols-3">
        {CONTRACT.parties.map((p) => (
          <div key={p.name}>
            <div className="font-medium">{p.name}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {p.role}
            </div>
          </div>
        ))}
      </footer>
    </article>
  );
}

function Tarefas() {
  const s = useNara();
  const [filter, setFilter] = useState<"p" | "a">("p");
  const [t, setT] = useState("");
  const [k, setK] = useState(COMPANY_TYPES[0]);
  const [d, setD] = useState(todayISO());
  const list = [...s.companyTasks]
    .filter((x) => filter === "a" || !x.done)
    .sort((a, b) => (a.d || "9").localeCompare(b.d || "9"));
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Input type="date" value={d} onChange={(e) => setD(e.target.value)} className="w-40" />
        <Select value={k} onChange={(e) => setK(e.target.value)} className="w-40">
          {COMPANY_TYPES.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
        <Input
          className="min-w-40 flex-1"
          placeholder="Tarefa"
          value={t}
          onChange={(e) => setT(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!t.trim()) return;
            s.addCompanyTask({ id: uid(), d, k, t: t.trim(), done: 0 });
            setT("");
          }}
        >
          Adicionar
        </Button>
      </div>
      <div className="mb-3 flex gap-1">
        <Button size="sm" variant={filter === "p" ? "secondary" : "ghost"} onClick={() => setFilter("p")}>
          Pendentes
        </Button>
        <Button size="sm" variant={filter === "a" ? "secondary" : "ghost"} onClick={() => setFilter("a")}>
          Todas
        </Button>
      </div>
      <div className="space-y-1">
        {list.map((x) => (
          <div
            key={x.id}
            className={cn(
              "flex items-center gap-3 rounded-lg bg-card px-3 py-2 text-sm shadow-card",
              !x.done && x.d && x.d < todayISO() && "ring-1 ring-destructive/40",
            )}
          >
            <input
              type="checkbox"
              checked={!!x.done}
              onChange={(e) => s.patchCompanyTask(x.id, { done: e.target.checked ? 1 : 0 })}
            />
            <Input
              type="date"
              className="h-8 w-36"
              value={x.d}
              onChange={(e) => s.patchCompanyTask(x.id, { d: e.target.value })}
            />
            <span className="w-28 text-xs text-muted-foreground">{x.k}</span>
            <Input
              className="h-8 flex-1"
              value={x.t}
              onChange={(e) => s.patchCompanyTask(x.id, { t: e.target.value })}
            />
            <Button variant="ghost" size="sm" onClick={() => s.delCompanyTask(x.id)}>
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Atalhos() {
  const s = useNara();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<{ bi: number; si: number; ti: number } | null>(null);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button variant={edit ? "default" : "outline"} onClick={() => setEdit(!edit)}>
          {edit ? "Pronto" : "Editar"}
        </Button>
      </div>
      {s.boards.map((b, bi) => (
        <div key={b.id} className="mb-8">
          <h3 className="mb-4 font-display text-2xl">{b.n}</h3>
          {b.s.map((sec, si) => (
            <Card key={si} className="mb-4">
              <CardContent className="p-5">
                {edit ? (
                  <Input
                    className="mb-4 max-w-xs"
                    value={sec.n}
                    onChange={(e) => {
                      const boards = s.boards.map((bb, i) =>
                        i !== bi
                          ? bb
                          : {
                              ...bb,
                              s: bb.s.map((ss, j) =>
                                j === si ? { ...ss, n: e.target.value } : ss,
                              ),
                            },
                      );
                      s.setBoards(boards);
                    }}
                  />
                ) : (
                  <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {sec.n}
                  </h4>
                )}
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                  {sec.t.map((t, ti) => {
                    const Icon = ICONS[t.i] || ExternalLink;
                    const go = () => {
                      if (edit) {
                        setForm({ bi, si, ti });
                        return;
                      }
                      if (t.u) window.open(t.u, "_blank", "noopener");
                    };
                    return (
                      <button
                        key={ti}
                        type="button"
                        onClick={go}
                        className="group flex flex-col items-center gap-2"
                      >
                        <span className="flex size-14 items-center justify-center rounded-xl bg-secondary text-foreground transition-transform group-hover:scale-105">
                          {t.img ? (
                            <img src={t.img} alt="" className="size-full rounded-xl object-cover" />
                          ) : (
                            <Icon className="size-5" strokeWidth={1.5} />
                          )}
                        </span>
                        <span className="text-center text-xs">{t.l}</span>
                      </button>
                    );
                  })}
                  {edit ? (
                    <button
                      type="button"
                      className="flex flex-col items-center gap-2"
                      onClick={() => {
                        const boards = structuredClone(s.boards);
                        boards[bi].s[si].t.push({ l: "Novo", u: "", i: "Globe" });
                        s.setBoards(boards);
                      }}
                    >
                      <span className="flex size-14 items-center justify-center rounded-xl border border-dashed border-border">
                        <Plus className="size-5" />
                      </span>
                      <span className="text-xs">Novo</span>
                    </button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
      {form ? <TileForm pos={form} onClose={() => setForm(null)} /> : null}
    </div>
  );
}

function TileForm({
  pos,
  onClose,
}: {
  pos: { bi: number; si: number; ti: number };
  onClose: () => void;
}) {
  const s = useNara();
  const t = s.boards[pos.bi].s[pos.si].t[pos.ti];
  const [l, setL] = useState(t.l);
  const [u, setU] = useState(t.u);
  const [i, setI] = useState(t.i);
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/30 p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-5">
          <h3 className="mb-3 font-display text-xl">Atalho</h3>
          <div className="grid gap-2">
            <Input value={l} onChange={(e) => setL(e.target.value)} placeholder="Nome" />
            <Input value={u} onChange={(e) => setU(e.target.value)} placeholder="https://" />
            <Select value={i} onChange={(e) => setI(e.target.value)}>
              {Object.keys(ICONS).map((k) => (
                <option key={k}>{k}</option>
              ))}
            </Select>
            <div className="mt-2 flex justify-end gap-2">
              <Button
                variant="ghost"
                className="text-destructive"
                onClick={() => {
                  const boards = structuredClone(s.boards);
                  boards[pos.bi].s[pos.si].t.splice(pos.ti, 1);
                  s.setBoards(boards);
                  onClose();
                }}
              >
                Excluir
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  const boards = structuredClone(s.boards);
                  let url = u.trim();
                  if (url && !/^[a-z]+:/i.test(url)) url = "https://" + url;
                  boards[pos.bi].s[pos.si].t[pos.ti] = { ...t, l, u: url, i };
                  s.setBoards(boards);
                  onClose();
                }}
              >
                Salvar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
