import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Stat } from "@/components/stat";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { todayISO } from "@/lib/dates";
import {
  financePulse,
  tasksOnDate,
  tsTotals,
  tsWeekLate,
} from "@/lib/derived";
import { minutesToHM } from "@/lib/money";
import { useNara } from "@/lib/store";
import { DaySchedule } from "./day-schedule";

export function HojePage() {
  const iso = todayISO();
  const now = new Date();
  const s = useNara();
  const day = s.timesheet.days[iso];
  const tot = tsTotals(s, iso);
  const lateWeek = tsWeekLate(s, iso);
  const work = tasksOnDate(s, iso);
  const events = s.life.ev.filter((e) => e.d === iso);
  const diary = s.life.dia.find((d) => d.id === iso);
  const pulse = financePulse(s);
  const hour = now.getHours();
  const greet =
    hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";

  const alerts: string[] = [];
  if (tot.late > 10)
    alerts.push(
      `Entrada ${tot.late} min depois das 8h. A cada hora de atraso, um item da lista de casa sai.`,
    );
  if (lateWeek > 120)
    alerts.push("Atrasos da semana passaram de 2h — o benefício semanal caiu.");
  if (day?.s2 && day.s2 > "21:00")
    alerts.push("Saída depois das 21h. O contrato fecha o dia nesse horário.");

  return (
    <div>
      <PageHeader
        kicker={format(now, "EEEE", { locale: ptBR })}
        title={`${greet}.`}
        description={format(now, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
      />

      {alerts.length ? (
        <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive">
          {alerts.map((a) => (
            <p key={a}>{a}</p>
          ))}
        </div>
      ) : null}

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Trabalhadas hoje"
          value={tot.w ? minutesToHM(tot.w) : "—"}
          hint={tot.x ? `extra ${minutesToHM(tot.x)}` : "jornada 8h–18h"}
        />
        <Stat
          label="Na agenda"
          value={String(work.length)}
          hint={work.filter((t) => t.task.done).length + " concluídas"}
        />
        <Stat
          label="Em aberto (dívidas)"
          value={pulse.dv.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0,
          })}
        />
        <Stat
          label={pulse.sob < 0 ? "Falta no ano" : "Sobra no ano"}
          value={Math.abs(pulse.sob).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0,
          })}
          tone={pulse.sob < 0 ? "bad" : "ok"}
        />
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-display text-xl">Ponto</h2>
              <Link
                to="/trabalho"
                search={{ tab: "ponto" }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Abrir
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["e1", "Entrada"],
                  ["s1", "Almoço"],
                  ["e2", "Volta"],
                  ["s2", "Saída"],
                ] as const
              ).map(([k, l]) => (
                <label key={k} className="grid gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {l}
                  </span>
                  <Input
                    type="time"
                    value={day?.[k] || ""}
                    onChange={(e) => s.setTimesheetField(iso, k, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="font-display text-xl">Página do dia</h2>
              <Link
                to="/vida"
                search={{ tab: "diario", day: iso }}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Diário
              </Link>
            </div>
            {events.length ? (
              <ul className="mb-3 space-y-1 text-sm">
                {events.map((e) => (
                  <li key={e.id} className="text-muted-foreground">
                    {e.tm ? `${e.tm} · ` : ""}
                    {e.t}
                  </li>
                ))}
              </ul>
            ) : null}
            <Textarea
              className="paper-lines min-h-28"
              placeholder="Como foi o dia."
              value={diary?.txt || ""}
              onChange={(e) =>
                s.upsertPage("dia", {
                  id: iso,
                  txt: e.target.value,
                  mood: diary?.mood || "",
                  song: diary?.song || "",
                  it: diary?.it || [],
                })
              }
            />
          </CardContent>
        </Card>
      </div>

      <DaySchedule iso={iso} allowCreate showPonto />

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link to="/trabalho" search={{ tab: "agenda" }}>
            Agenda <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/trabalho" search={{ tab: "processo" }}>
            Processo <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/dinheiro">
            Panorama <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/mesa">
            Contrato <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
