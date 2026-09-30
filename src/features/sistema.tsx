import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatBR, monthGrid, MONTHS_PT, todayISO } from "@/lib/dates";
import { useNara } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SistemaPanels() {
  return (
    <Tabs defaultValue="mem">
      <TabsList>
        <TabsTrigger value="mem">Membros</TabsTrigger>
        <TabsTrigger value="fn">Funções</TabsTrigger>
        <TabsTrigger value="nt">Notas</TabsTrigger>
      </TabsList>
      <TabsContent value="mem">
        <Membros />
      </TabsContent>
      <TabsContent value="fn">
        <Funcoes />
      </TabsContent>
      <TabsContent value="nt">
        <Notas />
      </TabsContent>
    </Tabs>
  );
}

function Membros() {
  const s = useNara();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {s.system.m.map((m, i) => (
        <Card key={m.id}>
          <CardContent className="p-5">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-secondary font-display text-xl text-primary">
              {(m.n || "?")[0]}
            </div>
            <Input
              className="font-display text-lg"
              value={m.n}
              onChange={(e) => s.patchMember(i, { n: e.target.value })}
            />
            <Input
              className="mt-2"
              value={m.r}
              onChange={(e) => s.patchMember(i, { r: e.target.value })}
              placeholder="Papel"
            />
            <p className="mb-1 mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
              Sobre
            </p>
            <Textarea
              value={m.d}
              onChange={(e) => s.patchMember(i, { d: e.target.value })}
            />
            <p className="mb-1 mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
              Funções
            </p>
            <Textarea
              value={m.f}
              onChange={(e) => s.patchMember(i, { f: e.target.value })}
            />
            <p className="mb-1 mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
              Gostos, limites, cuidados
            </p>
            <Textarea
              value={m.g}
              onChange={(e) => s.patchMember(i, { g: e.target.value })}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Funcoes() {
  const s = useNara();
  return (
    <div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-2">Função</th>
            <th>Responsável</th>
            <th>Nota</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {s.system.fn.map((x, i) => (
            <tr key={i} className="border-t border-border">
              <td className="py-1">
                <Input value={x.f} onChange={(e) => s.patchFn(i, { f: e.target.value })} />
              </td>
              <td>
                <Select value={x.w} onChange={(e) => s.patchFn(i, { w: e.target.value })}>
                  {s.system.m.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.n}
                    </option>
                  ))}
                </Select>
              </td>
              <td>
                <Input value={x.o} onChange={(e) => s.patchFn(i, { o: e.target.value })} />
              </td>
              <td>
                <Button variant="ghost" size="sm" onClick={() => s.delFn(i)}>
                  ×
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="mt-3" variant="secondary" onClick={() => s.addFn()}>
        Nova função
      </Button>
    </div>
  );
}

function Notas() {
  const s = useNara();
  const now = new Date();
  const [y, setY] = useState(now.getFullYear());
  const [m, setM] = useState(now.getMonth());
  const [open, setOpen] = useState<string | null>(null);
  const grid = monthGrid(y, m);
  const page = s.system.dia.find((d) => d.id === open);

  if (open) {
    const p = page || { id: open, txt: "", mood: "", song: "", it: [] };
    return (
      <div>
        <Button variant="ghost" onClick={() => setOpen(null)}>
          Voltar
        </Button>
        <h3 className="mb-3 font-display text-xl">{formatBR(open)}</h3>
        <Textarea
          className="paper-lines min-h-72"
          value={p.txt}
          onChange={(e) =>
            s.upsertPage("sdia", { ...p, txt: e.target.value })
          }
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setM((x) => (x === 0 ? (setY(y - 1), 11) : x - 1))}
        >
          Anterior
        </Button>
        <h3 className="font-display text-xl">
          {MONTHS_PT[m]} {y}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setM((x) => (x === 11 ? (setY(y + 1), 0) : x + 1))}
        >
          Próximo
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {grid.flat().map((cell) => {
          const e = s.system.dia.find((d) => d.id === cell.iso);
          return (
            <button
              key={cell.iso}
              type="button"
              onClick={() => setOpen(cell.iso)}
              className={cn(
                "min-h-16 rounded-md bg-card p-1.5 text-left text-xs shadow-card",
                !cell.inMonth && "opacity-40",
                e && "bg-secondary",
                cell.iso === todayISO() && "ring-1 ring-primary",
              )}
            >
              {cell.date.getDate()}
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
