import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as format, t as ptBR } from "../_libs/date-fns.mjs";
import { B as useNara, F as todayISO, I as tsTotals, L as tsWeekLate, P as tasksOnDate, k as minutesToHM, n as Button, w as financePulse } from "./store-BFPkgcXL.mjs";
import { i as PageHeader, n as CardContent, r as Input, t as Card } from "./select-HWYz-cwW.mjs";
import { t as Stat } from "./stat-B53dt4IE.mjs";
import { w as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Textarea } from "./textarea-C88GXXl7.mjs";
import { t as DaySchedule } from "./day-schedule-CLUunKF-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ch2MKlEM.js
var import_jsx_runtime = require_jsx_runtime();
function HojePage() {
	const iso = todayISO();
	const now = /* @__PURE__ */ new Date();
	const s = useNara();
	const day = s.timesheet.days[iso];
	const tot = tsTotals(s, iso);
	const lateWeek = tsWeekLate(s, iso);
	const work = tasksOnDate(s, iso);
	const events = s.life.ev.filter((e) => e.d === iso);
	const diary = s.life.dia.find((d) => d.id === iso);
	const pulse = financePulse(s);
	const hour = now.getHours();
	const greet = hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
	const alerts = [];
	if (tot.late > 10) alerts.push(`Entrada ${tot.late} min depois das 8h. A cada hora de atraso, um item da lista de casa sai.`);
	if (lateWeek > 120) alerts.push("Atrasos da semana passaram de 2h — o benefício semanal caiu.");
	if (day?.s2 && day.s2 > "21:00") alerts.push("Saída depois das 21h. O contrato fecha o dia nesse horário.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: format(now, "EEEE", { locale: ptBR }),
			title: `${greet}.`,
			description: format(now, "d 'de' MMMM 'de' yyyy", { locale: ptBR })
		}),
		alerts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3 text-sm text-destructive",
			children: alerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: a }, a))
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Trabalhadas hoje",
					value: tot.w ? minutesToHM(tot.w) : "—",
					hint: tot.x ? `extra ${minutesToHM(tot.x)}` : "jornada 8h–18h"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Na agenda",
					value: String(work.length),
					hint: work.filter((t) => t.task.done).length + " concluídas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Em aberto (dívidas)",
					value: pulse.dv.toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
						maximumFractionDigits: 0
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: pulse.sob < 0 ? "Falta no ano" : "Sobra no ano",
					value: Math.abs(pulse.sob).toLocaleString("pt-BR", {
						style: "currency",
						currency: "BRL",
						maximumFractionDigits: 0
					}),
					tone: pulse.sob < 0 ? "bad" : "ok"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-6 lg:grid-cols-[1fr_280px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "Ponto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/trabalho",
						search: { tab: "ponto" },
						className: "text-xs text-muted-foreground hover:text-foreground",
						children: "Abrir"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						["e1", "Entrada"],
						["s1", "Almoço"],
						["e2", "Volta"],
						["s2", "Saída"]
					].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] uppercase tracking-wider text-muted-foreground",
							children: l
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: day?.[k] || "",
							onChange: (e) => s.setTimesheetField(iso, k, e.target.value)
						})]
					}, k))
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "Página do dia"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/vida",
							search: {
								tab: "diario",
								day: iso
							},
							className: "text-xs text-muted-foreground hover:text-foreground",
							children: "Diário"
						})]
					}),
					events.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mb-3 space-y-1 text-sm",
						children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-muted-foreground",
							children: [e.tm ? `${e.tm} · ` : "", e.t]
						}, e.id))
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "paper-lines min-h-28",
						placeholder: "Como foi o dia.",
						value: diary?.txt || "",
						onChange: (e) => s.upsertPage("dia", {
							id: iso,
							txt: e.target.value,
							mood: diary?.mood || "",
							song: diary?.song || "",
							it: diary?.it || []
						})
					})
				]
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySchedule, {
			iso,
			allowCreate: true,
			showPonto: true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/trabalho",
						search: { tab: "agenda" },
						children: ["Agenda ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/trabalho",
						search: { tab: "processo" },
						children: ["Processo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dinheiro",
						children: ["Panorama ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/mesa",
						children: ["Contrato ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
					})
				})
			]
		})
	] });
}
var SplitComponent = HojePage;
//#endregion
export { SplitComponent as component };
