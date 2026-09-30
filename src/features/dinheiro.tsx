import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Stat } from "@/components/stat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EXPENSE_CATS,
  PRIORITY,
  SHOP_TIPOS,
} from "@/lib/constants";
import { inMonth, todayISO } from "@/lib/dates";
import { atelierForecast, financePulse } from "@/lib/derived";
import { brl, num } from "@/lib/money";
import { useNara } from "@/lib/store";
import { cn } from "@/lib/utils";

const MONTHS = [
  [10, "Outubro"],
  [11, "Novembro"],
  [12, "Dezembro"],
] as const;

export function DinheiroPage() {
  return (
    <div>
      <PageHeader
        kicker="Casa"
        title="Dinheiro"
        description="Renda, custo de viver, dívidas e a lista da casa até o fim do ano."
      />
      <Tabs defaultValue="pan">
        <TabsList>
          <TabsTrigger value="pan">Panorama</TabsTrigger>
          <TabsTrigger value="plano">Lista da casa</TabsTrigger>
          <TabsTrigger value="fixo">Custo fixo</TabsTrigger>
          <TabsTrigger value="mes">Meses</TabsTrigger>
          <TabsTrigger value="div">Dívidas</TabsTrigger>
        </TabsList>
        <TabsContent value="pan">
          <Panorama />
        </TabsContent>
        <TabsContent value="plano">
          <Plano />
        </TabsContent>
        <TabsContent value="fixo">
          <Fixo />
        </TabsContent>
        <TabsContent value="mes">
          <Meses />
        </TabsContent>
        <TabsContent value="div">
          <Dividas />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Panorama() {
  const s = useNara();
  const p = financePulse(s);
  const a = atelierForecast(s);
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Renda prevista (out–dez)"
          value={brl(s.finance.renda)}
          hint="editável abaixo"
        />
        <Stat label="Fixo × 3 meses" value={brl(p.fx)} />
        <Stat label="Dívidas em aberto" value={brl(p.dv)} />
        <Stat
          label={p.sob < 0 ? "Faltam" : "Sobra"}
          value={brl(Math.abs(p.sob))}
          tone={p.sob < 0 ? "bad" : "ok"}
        />
      </div>
      <Field label="Renda prevista" className="max-w-xs">
        <Input
          value={s.finance.renda}
          onChange={(e) => s.patchFinance({ renda: num(e.target.value) })}
        />
      </Field>
      <Card>
        <CardContent className="p-5">
          <h3 className="mb-1 font-display text-xl">O que entra na conta</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Desmarque uma prioridade para ver o que sobra se aquele grupo esperar.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {([1, 2, 3, 4] as const).map((n) => (
              <label
                key={n}
                className="flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-3"
              >
                <span className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!s.finance.inc[n]}
                    onChange={(e) =>
                      s.patchFinance({
                        inc: { ...s.finance.inc, [n]: e.target.checked ? 1 : 0 },
                      })
                    }
                  />
                  {PRIORITY[n].label}
                </span>
                <span className="tabular-nums text-sm">{brl(p.fal(n))}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-xl">Vindo do estúdio</h3>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => s.patchFinance({ renda: Math.round(a.tot) })}
            >
              Usar como renda
            </Button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2">Mês</th>
                <th className="text-right">Previsto</th>
                <th className="text-right">Recebido</th>
              </tr>
            </thead>
            <tbody>
              {MONTHS.map(([m, l]) => (
                <tr key={m} className="border-t border-border">
                  <td className="py-2">{l}</td>
                  <td className="text-right tabular-nums">{brl(a.prev[m])}</td>
                  <td className="text-right tabular-nums">{brl(a.rec[m])}</td>
                </tr>
              ))}
              <tr className="border-t border-border font-medium">
                <td className="py-2">Total</td>
                <td className="text-right">{brl(a.tot)}</td>
                <td className="text-right">
                  {brl(a.rec[10] + a.rec[11] + a.rec[12])}
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Field label="Câmbio USD → BRL" className="max-w-xs">
        <Input
          type="number"
          step="0.01"
          value={s.finance.usdRate}
          onChange={(e) => s.setUsdRate(parseFloat(e.target.value) || 0)}
        />
      </Field>
    </div>
  );
}

function Plano() {
  const s = useNara();
  const [tipo, setTipo] = useState("");
  const [n, setN] = useState("");
  const [v, setV] = useState("");
  const [t, setT] = useState("Móveis");
  const [p, setP] = useState(1);
  const P = s.finance.plano;
  const cols = [1, 2, 3, 4].map((pr) => ({
    p: pr,
    L: P.map((x, i) => [x, i] as const).filter(
      ([x]) => x.p === pr && !x.ok && (!tipo || x.t === tipo),
    ),
  }));
  const bought = P.map((x, i) => [x, i] as const).filter(
    ([x]) => x.ok && (!tipo || x.t === tipo),
  );

  const drop = (pr: number, i: number) => s.patchPlano(i, { p: pr });

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <Button size="sm" variant={tipo ? "ghost" : "secondary"} onClick={() => setTipo("")}>
          Todos
        </Button>
        {SHOP_TIPOS.map((x) => (
          <Button
            key={x}
            size="sm"
            variant={tipo === x ? "secondary" : "ghost"}
            onClick={() => setTipo(x)}
          >
            {x}
          </Button>
        ))}
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        <Input className="w-40" placeholder="Item" value={n} onChange={(e) => setN(e.target.value)} />
        <Input className="w-24" placeholder="Valor" value={v} onChange={(e) => setV(e.target.value)} />
        <Select value={t} onChange={(e) => setT(e.target.value)} className="w-36">
          {SHOP_TIPOS.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </Select>
        <Select value={String(p)} onChange={(e) => setP(+e.target.value)} className="w-36">
          {([1, 2, 3, 4] as const).map((x) => (
            <option key={x} value={x}>
              {PRIORITY[x].label}
            </option>
          ))}
        </Select>
        <Button
          onClick={() => {
            if (!n.trim()) return;
            s.addPlano({ p, t, n: n.trim(), v: num(v), ok: 0, pago: 0, data: "", o: "" });
            setN("");
            setV("");
          }}
        >
          Adicionar
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {cols.map((c) => (
          <div
            key={c.p}
            className="rounded-xl bg-card p-3 shadow-card"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => drop(c.p, +e.dataTransfer.getData("i"))}
          >
            <div className="mb-2 flex justify-between text-xs uppercase tracking-wider text-muted-foreground">
              <span>{PRIORITY[c.p as 1 | 2 | 3 | 4].label}</span>
              <span className="tabular-nums">
                {brl(c.L.reduce((a, [x]) => a + x.v, 0))}
              </span>
            </div>
            <div className="space-y-2">
              {c.L.map(([x, i]) => (
                <div
                  key={i}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData("i", String(i))}
                  className="rounded-md bg-secondary/50 p-2"
                >
                  <div className="flex justify-between gap-2 text-sm">
                    <span>{x.n}</span>
                    <span className="tabular-nums">{brl(x.v)}</span>
                  </div>
                  <div className="mt-1 flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        const pago = prompt("Quanto pagou?", String(x.v));
                        if (pago === null) return;
                        s.patchPlano(i, {
                          ok: 1,
                          pago: num(pago),
                          data: prompt("Data AAAA-MM-DD", todayISO()) || todayISO(),
                        });
                      }}
                    >
                      Comprei
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => s.delPlano(i)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="rounded-xl bg-card p-3 shadow-card">
          <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
            Comprados
          </div>
          {bought.map(([x, i]) => (
            <div key={i} className="flex justify-between py-1 text-sm text-muted-foreground">
              <span>{x.n}</span>
              <button onClick={() => s.patchPlano(i, { ok: 0, pago: 0, data: "" })}>
                {brl(x.pago)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fixo() {
  const s = useNara();
  const tot = s.finance.fixos.reduce((a, x) => a + x.v, 0);
  return (
    <div>
      <Stat label="Por mês" value={brl(tot)} />
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="py-2">Item</th>
              <th>Categoria</th>
              <th className="text-right">Valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {s.finance.fixos.map((x, i) => (
              <tr key={i} className="border-t border-border">
                <td className="py-1">
                  <Input
                    value={x.n}
                    onChange={(e) => s.setFixo(i, { n: e.target.value })}
                  />
                </td>
                <td>
                  <Input
                    value={x.c}
                    onChange={(e) => s.setFixo(i, { c: e.target.value })}
                  />
                </td>
                <td>
                  <Input
                    className="text-right"
                    value={x.v}
                    onChange={(e) => s.setFixo(i, { v: num(e.target.value) })}
                  />
                </td>
                <td>
                  <Button variant="ghost" size="sm" onClick={() => s.delFixo(i)}>
                    ×
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button className="mt-3" variant="secondary" onClick={() => s.addFixo()}>
        Novo custo
      </Button>
    </div>
  );
}

function Meses() {
  const s = useNara();
  const [m, setM] = useState(10);
  const g = s.finance.g.map((x, i) => [x, i] as const).filter(([x]) => inMonth(x.d, m));
  const en = s.finance.ent.map((x, i) => [x, i] as const).filter(([x]) => inMonth(x.d, m));
  const a = atelierForecast(s);
  const ev = (i: number) => {
    const o = s.finance.fxm[`${m}_${i}`];
    return o?.v !== undefined && o.v !== "" ? +o.v : s.finance.fixos[i].v;
  };
  const fT = s.finance.fixos.reduce((acc, _, i) => acc + ev(i), 0);
  const fP = s.finance.fixos.reduce(
    (acc, _, i) => acc + (s.finance.fxm[`${m}_${i}`]?.p ? ev(i) : 0),
    0,
  );
  const gd = g.reduce((acc, [x]) => acc + x.v, 0);
  const ent = en.reduce((acc, [x]) => acc + x.v, 0) + (a.rec[m] || 0);
  const [gt, setGt] = useState("");
  const [gv, setGv] = useState("");
  const [gc, setGc] = useState(EXPENSE_CATS[0]);
  const [gdte, setGdte] = useState(todayISO());

  return (
    <div>
      <div className="mb-4 flex gap-1">
        {MONTHS.map(([k, l]) => (
          <Button key={k} size="sm" variant={m === k ? "default" : "ghost"} onClick={() => setM(k)}>
            {l}
          </Button>
        ))}
      </div>
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <Stat label="Gasto" value={brl(fP + gd)} />
        <Stat label="Entradas" value={brl(ent)} />
        <Stat
          label="Saldo"
          value={brl(ent - (fP + gd))}
          tone={ent - (fP + gd) < 0 ? "bad" : "ok"}
        />
        <Stat label="Fixos a pagar" value={brl(fT - fP)} />
      </div>
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="mb-3 font-display text-lg">Fixos</h3>
          {s.finance.fixos.map((x, i) => {
            const k = `${m}_${i}`;
            const o = s.finance.fxm[k] || {};
            return (
              <div key={i} className="grid grid-cols-[auto_1fr_100px] items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={!!o.p}
                  onChange={(e) => s.setFxm(k, { p: e.target.checked ? 1 : 0 })}
                />
                <span className="text-sm">{x.n}</span>
                <Input
                  className="text-right"
                  value={ev(i)}
                  onChange={(e) => s.setFxm(k, { v: num(e.target.value) })}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>
      <Card className="mb-4">
        <CardContent className="p-4">
          <h3 className="mb-3 font-display text-lg">Gastos</h3>
          <div className="mb-3 flex flex-wrap gap-2">
            <Input type="date" value={gdte} onChange={(e) => setGdte(e.target.value)} className="w-36" />
            <Input placeholder="O quê" value={gt} onChange={(e) => setGt(e.target.value)} className="w-40" />
            <Select value={gc} onChange={(e) => setGc(e.target.value)} className="w-40">
              {EXPENSE_CATS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
            <Input placeholder="Valor" value={gv} onChange={(e) => setGv(e.target.value)} className="w-24" />
            <Button
              onClick={() => {
                if (!num(gv)) return;
                s.addExpense({ d: gdte, t: gt || "Gasto", c: gc, v: num(gv) });
                setGt("");
                setGv("");
              }}
            >
              Anotar
            </Button>
          </div>
          {g.map(([x, i]) => (
            <div key={i} className="flex justify-between py-1 text-sm">
              <span>
                {x.t} <span className="text-muted-foreground">{x.c}</span>
              </span>
              <span>
                {brl(x.v)}
                <button className="ml-2 text-destructive" onClick={() => s.delExpense(i)}>
                  ×
                </button>
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="mb-3 font-display text-lg">Entradas</h3>
          <div className="mb-3 flex flex-wrap gap-2">
            <Input id="ed" type="date" defaultValue={todayISO()} className="w-36" />
            <Input id="et" placeholder="Origem" className="w-40" />
            <Input id="ev" placeholder="Valor" className="w-24" />
            <Button
              onClick={() => {
                const d = (document.getElementById("ed") as HTMLInputElement).value;
                const t = (document.getElementById("et") as HTMLInputElement).value;
                const v = num((document.getElementById("ev") as HTMLInputElement).value);
                if (!v) return;
                s.addIncome({ d, t: t || "Entrada", v });
              }}
            >
              Anotar
            </Button>
          </div>
          {en.map(([x, i]) => (
            <div key={i} className="flex justify-between py-1 text-sm">
              <span>{x.t}</span>
              <span>
                {brl(x.v)}
                <button className="ml-2 text-destructive" onClick={() => s.delIncome(i)}>
                  ×
                </button>
              </span>
            </div>
          ))}
          {a.rec[m] ? (
            <div className="flex justify-between py-1 text-sm text-muted-foreground">
              <span>Pagamentos do estúdio</span>
              <span>{brl(a.rec[m])}</span>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function Dividas() {
  const s = useNara();
  const open = s.finance.div.filter((x) => !x.ok).reduce((a, x) => a + x.v, 0);
  const paid = s.finance.div.filter((x) => x.ok).reduce((a, x) => a + x.v, 0);
  const [n, setN] = useState("");
  const [v, setV] = useState("");
  return (
    <div>
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <Stat label="Em aberto" value={brl(open)} tone="bad" />
        <Stat label="Pagas" value={brl(paid)} tone="ok" />
      </div>
      <div className="mb-4 flex gap-2">
        <Input placeholder="Dívida" value={n} onChange={(e) => setN(e.target.value)} />
        <Input placeholder="Valor" value={v} onChange={(e) => setV(e.target.value)} className="w-28" />
        <Button
          onClick={() => {
            s.addDivida({ n: n || "Dívida", o: "", v: num(v), ok: 0, pago: 0, data: "" });
            setN("");
            setV("");
          }}
        >
          Adicionar
        </Button>
      </div>
      <div className="space-y-1">
        {s.finance.div.map((x, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between rounded-lg bg-card px-3 py-2 text-sm shadow-card",
              x.ok && "opacity-60",
            )}
          >
            <span>
              {x.n}{" "}
              <span className="text-muted-foreground">{x.o}</span>
            </span>
            <span className="flex items-center gap-2 tabular-nums">
              {brl(x.v)}
              <Button
                size="sm"
                variant={x.ok ? "ghost" : "secondary"}
                onClick={() => {
                  if (x.ok) s.patchDivida(i, { ok: 0, pago: 0, data: "" });
                  else {
                    const pago = prompt("Quanto pagou?", String(x.v));
                    if (pago === null) return;
                    s.patchDivida(i, {
                      ok: 1,
                      pago: num(pago),
                      data: prompt("Data AAAA-MM-DD", todayISO()) || todayISO(),
                    });
                  }
                }}
              >
                {x.ok ? "Desfazer" : "Pagar"}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => s.delDivida(i)}>
                ×
              </Button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
