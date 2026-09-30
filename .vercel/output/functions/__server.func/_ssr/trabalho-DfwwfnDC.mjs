import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as monthGrid, B as useNara, C as cn, E as formatBR, F as todayISO, I as tsTotals, L as tsWeekLate, N as orderedClients, P as tasksOnDate, R as uid, S as clientStage, T as forecastForTask, V as weekKey, _ as allTasks, a as FIXED_TASKS, f as SOCIAL_PLATFORMS, g as WEEKDAYS, h as TS_STAGES, j as monthLabel, k as minutesToHM, n as Button, p as STUDIO_MONTHS, u as PROCESS_STEPS, v as atelierForecast, x as clientProgress, y as brl, z as usd } from "./store-BFPkgcXL.mjs";
import { a as Select, i as PageHeader, n as CardContent, r as Input, t as Card } from "./select-HWYz-cwW.mjs";
import { t as Stat } from "./stat-B53dt4IE.mjs";
import { t as Field } from "./field-D854B_M-.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-D9NBhluL.mjs";
import { S as useSearch, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Textarea } from "./textarea-C88GXXl7.mjs";
import { a as refFromFlat, c as taskKey, i as payTone, n as STAGE_DOT, o as stageShort, r as payLabel, s as stageTone, t as DaySchedule } from "./day-schedule-CLUunKF-.mjs";
import { n as Empty, t as Badge } from "./badge-CmAK09ge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trabalho-DfwwfnDC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CLIENT_STAGES = [
	"Não iniciado",
	...[
		"Moodboard/Referências",
		"Esboços",
		"Base",
		"Renderização",
		"Alteração"
	],
	"Concluído"
];
function AgendaPanel() {
	const s = useNara();
	const [mi, setMi] = (0, import_react.useState)(() => {
		const m = (/* @__PURE__ */ new Date()).getMonth();
		return STUDIO_MONTHS.some((x) => x.month === m) ? m : 9;
	});
	const [day, setDay] = (0, import_react.useState)(todayISO());
	const [week, setWeek] = (0, import_react.useState)(false);
	const grid = monthGrid(2026, mi);
	const visible = week ? [grid.flat().filter((c) => weekKey(c.iso) === weekKey(day))] : grid;
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const selectedRef = (0, import_react.useRef)(selected);
	selectedRef.current = selected;
	const selectedRefs = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const wrapRef = (0, import_react.useRef)(null);
	const marqueeStart = (0, import_react.useRef)(null);
	const marqueeRef = (0, import_react.useRef)(null);
	const [marquee, setMarquee] = (0, import_react.useState)(null);
	const drag = (0, import_react.useRef)(null);
	const [ghost, setGhost] = (0, import_react.useState)(null);
	const [overDay, setOverDay] = (0, import_react.useState)(null);
	const remember = (ref) => {
		selectedRefs.current.set(taskKey(ref), ref);
	};
	const toggleSelect = (ref, additive) => {
		const key = taskKey(ref);
		remember(ref);
		setSelected((prev) => {
			const next = additive ? new Set(prev) : /* @__PURE__ */ new Set();
			if (additive && prev.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});
	};
	const refsForKeys = (keys, fallback) => {
		const out = [];
		keys.forEach((k) => {
			const r = selectedRefs.current.get(k);
			if (r) out.push(r);
		});
		if (!out.length && fallback) out.push(fallback);
		return out;
	};
	(0, import_react.useEffect)(() => {
		const move = (e) => {
			if (marqueeStart.current && wrapRef.current) {
				const rect = wrapRef.current.getBoundingClientRect();
				const dx = e.clientX - marqueeStart.current.x;
				const dy = e.clientY - marqueeStart.current.y;
				if (Math.hypot(dx, dy) < 6 && !marqueeRef.current) return;
				const box = {
					x0: marqueeStart.current.x - rect.left,
					y0: marqueeStart.current.y - rect.top,
					x1: e.clientX - rect.left,
					y1: e.clientY - rect.top
				};
				marqueeRef.current = box;
				setMarquee(box);
				return;
			}
			const d = drag.current;
			if (!d) return;
			if (!d.active && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) < 8) return;
			d.active = true;
			const iso = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-day]")?.getAttribute("data-day") || null;
			setOverDay(iso);
			setGhost({
				x: e.clientX,
				y: e.clientY,
				label: `${d.refs.length} encomenda${d.refs.length > 1 ? "s" : ""}`
			});
		};
		const up = (e) => {
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
					const next = start.additive ? new Set(selectedRef.current) : /* @__PURE__ */ new Set();
					wrapRef.current.querySelectorAll("[data-task-key]").forEach((node) => {
						const r = node.getBoundingClientRect();
						if (!(r.left < right && r.right > left && r.top < bottom && r.bottom > top)) return;
						const key = node.dataset.taskKey;
						if (!key) return;
						next.add(key);
						const loose = key.startsWith("l:");
						const parts = key.split(":");
						selectedRefs.current.set(key, {
							loose,
							clientId: loose ? "" : parts[1],
							taskId: parts.slice(2).join(":")
						});
					});
					setSelected(next);
				} else {
					const iso = e.target?.closest?.("[data-day]")?.getAttribute("data-day");
					if (iso) setDay(iso);
					if (!start.additive) setSelected(/* @__PURE__ */ new Set());
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
				const iso = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-day]")?.getAttribute("data-day");
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
	const startChipDrag = (e, item) => {
		if (e.button !== 0) return;
		e.stopPropagation();
		const ref = refFromFlat(item);
		const key = taskKey(ref);
		remember(ref);
		const keys = selected.has(key) ? selected : /* @__PURE__ */ new Set([key]);
		if (!selected.has(key) && !e.shiftKey) setSelected(/* @__PURE__ */ new Set([key]));
		drag.current = {
			refs: refsForKeys(keys, ref),
			startX: e.clientX,
			startY: e.clientY,
			active: false
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-wrap items-center gap-1",
					children: [
						STUDIO_MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: mi === m.month ? "default" : "ghost",
							onClick: () => {
								setMi(m.month);
								setWeek(false);
							},
							children: m.label
						}, m.month)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: week ? "ghost" : "secondary",
							onClick: () => setWeek(false),
							children: "Mês"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: week ? "secondary" : "ghost",
							onClick: () => setWeek(true),
							children: "Semana"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs text-muted-foreground",
					children: "Arraste uma caixa para selecionar várias encomendas e solte em outro dia. Clique no dia para a grade das 6h às 23h."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: wrapRef,
					className: "relative",
					onPointerDown: (e) => {
						if (e.pointerType !== "mouse" || e.button !== 0) return;
						if (e.target.closest("[data-task-key]")) return;
						marqueeStart.current = {
							x: e.clientX,
							y: e.clientY,
							additive: e.shiftKey || e.metaKey || e.ctrlKey
						};
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-7 gap-1 text-center text-[11px] uppercase tracking-wider text-muted-foreground",
							children: WEEKDAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-1",
								children: d
							}, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-7 gap-1",
							children: visible.flat().map((cell) => {
								const items = tasksOnDate(s, cell.iso);
								const hrs = items.reduce((a, x) => a + Number(x.task.hours || 0), 0);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-day": cell.iso,
									className: cn("flex min-h-28 flex-col rounded-md bg-card p-1.5 text-left shadow-card", !cell.inMonth && !week && "opacity-40", cell.iso === day && "ring-1 ring-primary", cell.iso === todayISO() && "bg-secondary/60", overDay === cell.iso && "bg-secondary ring-1 ring-primary"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums",
											children: cell.date.getDate()
										}), hrs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums text-muted-foreground",
											children: [hrs, "h"]
										}) : null]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex flex-col gap-0.5",
										children: items.map((x) => {
											const ref = refFromFlat(x);
											const key = taskKey(ref);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-task-key": key,
												onPointerDown: (e) => startChipDrag(e, x),
												onClick: (e) => {
													e.stopPropagation();
													if (e.shiftKey || e.metaKey || e.ctrlKey) {
														toggleSelect(ref, true);
														return;
													}
													setDay(cell.iso);
													toggleSelect(ref, false);
												},
												className: cn("cursor-grab rounded px-1 py-0.5 text-[10px] leading-tight active:cursor-grabbing", x.task.done && "line-through opacity-50", selected.has(key) && "bg-primary/15 ring-1 ring-primary"),
												title: `${x.client.name} · ${stageShort(x.task.type)}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mr-1 inline-block size-1.5 rounded-full", STAGE_DOT[x.task.type] || "bg-muted-foreground") }),
													x.client.name,
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted-foreground",
														children: [" · ", stageShort(x.task.type)]
													})
												]
											}, key);
										})
									})]
								}, cell.iso);
							})
						}),
						marquee ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute z-20 rounded-sm border border-primary bg-primary/15",
							style: {
								left: Math.min(marquee.x0, marquee.x1),
								top: Math.min(marquee.y0, marquee.y1),
								width: Math.abs(marquee.x1 - marquee.x0),
								height: Math.abs(marquee.y1 - marquee.y0)
							}
						}) : null
					]
				}),
				selected.size > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [
						selected.size,
						" selecionada",
						selected.size > 1 ? "s" : "",
						" — arraste para outro dia."
					]
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySchedule, {
					iso: day,
					selected,
					onToggleSelect: toggleSelect,
					allowCreate: true,
					showPonto: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notas do dia",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "paper-lines min-h-28",
							value: s.dayNotes[day] || "",
							onChange: (e) => s.setDayNote(day, e.target.value)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Notas da semana",
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							className: "min-h-20",
							value: s.weekNotes[weekKey(day)] || "",
							onChange: (e) => s.setWeekNote(weekKey(day), e.target.value)
						})
					})]
				}) })]
			}),
			ghost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed z-50 rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground shadow-card",
				style: {
					left: ghost.x + 12,
					top: ghost.y + 12
				},
				children: ghost.label
			}) : null
		]
	});
}
var TABS = [
	["processo", "Processo"],
	["pipeline", "Pipeline"],
	["agenda", "Agenda"],
	["clientes", "Clientes"],
	["ponto", "Ponto"],
	["previsao", "Previsão"],
	["pagamentos", "Pagamentos"],
	["relatorio", "Relatório"]
];
function emptyClient() {
	return {
		id: uid(),
		name: "",
		socialPlatform: "Instagram",
		socialHandle: "",
		description: "",
		valueUSD: 0,
		valueBRL: 0,
		notion: "",
		priority: {
			like: 0,
			profit: 0,
			urgency: 0
		},
		payment: {
			status: "notpaid",
			date: ""
		},
		pagamentoIntegralNoRender: false,
		notes: "",
		tasks: FIXED_TASKS.map((type) => ({
			id: uid(),
			type,
			hours: 0,
			date: "",
			done: false
		})),
		elementsEstimate: []
	};
}
function TrabalhoPage() {
	const search = useSearch({ strict: false });
	const navigate = useNavigate();
	const tab = TABS.some((t) => t[0] === search.tab) ? search.tab : "processo";
	const setTab = (v) => navigate({
		to: "/trabalho",
		search: {
			...search,
			tab: v
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Estúdio Lumi",
		title: "Trabalho",
		description: "Encomendas, agenda, ponto e o processo — tudo no mesmo ritmo."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		value: tab,
		onValueChange: setTab,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, { children: TABS.map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: k,
				children: l
			}, k)) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "pipeline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pipeline, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "agenda",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgendaPanel, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "clientes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clientes, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "ponto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ponto, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "processo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Processo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "previsao",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Previsao, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "pagamentos",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagamentos, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "relatorio",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Relatorio, {})
			})
		]
	})] });
}
function Pipeline() {
	const s = useNara();
	const clients = orderedClients(s);
	const cols = CLIENT_STAGES;
	const grouped = (0, import_react.useMemo)(() => {
		const g = {};
		cols.forEach((c) => g[c] = []);
		clients.forEach((c) => {
			const st = clientStage(c);
			(g[st] || g["Não iniciado"]).push(c);
		});
		return g;
	}, [clients]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-x-auto pb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-w-[980px] gap-3",
			children: cols.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-44 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-baseline justify-between px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
						children: stageShort(col)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tabular-nums text-muted-foreground",
						children: grouped[col].length
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: grouped[col].map((c) => {
						const p = clientProgress(c);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "w-full rounded-lg bg-card p-3 text-left shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										usd(c.valueUSD),
										" · ",
										brl(c.valueBRL)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-1 overflow-hidden rounded-full bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full bg-primary",
										style: { width: `${p.pct}%` }
									})
								})
							]
						}, c.id);
					})
				})]
			}, col))
		}), clients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "A fila está vazia",
			body: "Cadastre uma encomenda em Clientes. O pipeline se organiza sozinho pela etapa."
		}) : null]
	});
}
function Stars({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1",
		children: [
			1,
			2,
			3,
			4,
			5
		].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: cn("size-7 rounded-full text-xs", n <= value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"),
			onClick: () => onChange(n === value ? 0 : n),
			children: n
		}, n))
	});
}
function ClientForm({ initial, onClose }) {
	const upsert = useNara((s) => s.upsertClient);
	const rate = useNara((s) => s.finance.usdRate);
	const [c, setC] = (0, import_react.useState)(initial || emptyClient());
	const set = (patch) => setC((x) => ({
		...x,
		...patch
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-4",
		onSubmit: (e) => {
			e.preventDefault();
			if (!c.name.trim()) return;
			upsert({
				...c,
				valueBRL: Math.round(c.valueUSD * rate * 100) / 100
			});
			onClose();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nome",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: c.name,
							onChange: (e) => set({ name: e.target.value }),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Rede",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: c.socialPlatform,
							onChange: (e) => set({ socialPlatform: e.target.value }),
							children: SOCIAL_PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "@",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: c.socialHandle,
							onChange: (e) => set({ socialHandle: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: `Valor (USD) · câmbio ${rate}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: "0.01",
							value: c.valueUSD || "",
							onChange: (e) => set({ valueUSD: parseFloat(e.target.value) || 0 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: brl(c.valueUSD * rate)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Descrição",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: c.description,
					onChange: (e) => set({ description: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pasta de referências",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: c.notion,
					onChange: (e) => set({ notion: e.target.value }),
					placeholder: "https://"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Gosto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
							value: c.priority.like,
							onChange: (n) => set({ priority: {
								...c.priority,
								like: n
							} })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Lucro",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
							value: c.priority.profit,
							onChange: (n) => set({ priority: {
								...c.priority,
								profit: n
							} })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Urgência",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
							value: c.priority.urgency,
							onChange: (n) => set({ priority: {
								...c.priority,
								urgency: n
							} })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Pagamento",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: c.payment.status,
						onChange: (e) => set({ payment: {
							...c.payment,
							status: e.target.value
						} }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "notpaid",
								children: "Em aberto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "half",
								children: "Sinal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "paid",
								children: "Pago"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Data no banco",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: c.payment.date,
						onChange: (e) => set({ payment: {
							...c.payment,
							date: e.target.value
						} })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: c.pagamentoIntegralNoRender,
					onChange: (e) => set({ pagamentoIntegralNoRender: e.target.checked })
				}), "Valor integral só no render — sem sinal no esboço"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground",
				children: "Etapas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [c.tasks.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[1fr_80px_1fr] gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: t.type,
							readOnly: true,
							className: "bg-secondary/40"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: "0.5",
							value: t.hours || "",
							placeholder: "h",
							onChange: (e) => {
								const tasks = c.tasks.map((x, k) => k === i ? {
									...x,
									hours: parseFloat(e.target.value) || 0
								} : x);
								set({ tasks });
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: t.date,
							onChange: (e) => {
								const tasks = c.tasks.map((x, k) => k === i ? {
									...x,
									date: e.target.value
								} : x);
								set({ tasks });
							}
						})
					]
				}, t.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => set({ tasks: [...c.tasks, {
						id: uid(),
						type: "Alteração",
						hours: 0,
						date: "",
						done: false
					}] }),
					children: "Incluir alteração"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notas",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: c.notes,
					onChange: (e) => set({ notes: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: onClose,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: initial ? "Salvar" : "Adicionar"
				})]
			})
		]
	});
}
function Clientes() {
	const s = useNara();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const list = orderedClients(s);
	const [dragId, setDragId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setEditing("new"),
				children: "Nova encomenda"
			})
		}),
		editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-display text-xl",
					children: editing === "new" ? "Nova encomenda" : "Editar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientForm, {
					initial: editing === "new" ? void 0 : editing,
					onClose: () => setEditing(null)
				})]
			})
		}) : null,
		list.length === 0 && editing !== "new" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "Nenhuma encomenda",
			body: "Comece por uma ficha — o resto se apoia nela."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: list.map((c, i) => {
				const st = clientStage(c);
				const p = clientProgress(c);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					draggable: true,
					onDragStart: () => setDragId(c.id),
					onDragOver: (e) => e.preventDefault(),
					onDrop: () => {
						if (!dragId || dragId === c.id) return;
						const ids = list.map((x) => x.id);
						const from = ids.indexOf(dragId);
						ids.splice(from, 1);
						ids.splice(i, 0, dragId);
						s.setClientOrder(ids);
						setDragId(null);
					},
					className: "flex flex-wrap items-center gap-3 rounded-lg bg-card px-4 py-3 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 text-xs tabular-nums text-muted-foreground",
							children: i + 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-40 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: c.socialHandle || c.socialPlatform
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: stageTone(st),
							children: stageShort(st)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: payTone(c.payment.status),
							children: payLabel(c.payment.status)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm tabular-nums",
							children: brl(c.valueBRL)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-16 text-right text-xs text-muted-foreground",
							children: [
								p.done,
								"/",
								p.total
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							className: "w-40",
							value: st,
							onChange: (e) => s.setClientStage(c.id, e.target.value),
							children: CLIENT_STAGES.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: x,
								children: stageShort(x)
							}, x))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setEditing(c),
							children: "Editar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							className: "text-destructive",
							onClick: () => {
								if (confirm("Excluir esta encomenda?")) s.deleteClient(c.id);
							},
							children: "Excluir"
						})
					]
				}, c.id);
			})
		})
	] });
}
function Ponto() {
	const s = useNara();
	const [iso, setIso] = (0, import_react.useState)(todayISO());
	const d = s.timesheet.days[iso] || {
		e1: "",
		s1: "",
		e2: "",
		s2: "",
		tasks: []
	};
	const tot = tsTotals(s, iso);
	const lateWeek = tsWeekLate(s, iso);
	const dates = [];
	for (let t = new Date(2026, 8, 29); t <= new Date(2026, 9, 31); t.setDate(t.getDate() + 1)) dates.push(todayISO(new Date(t)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_280px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-end gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Dia",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: iso,
						onChange: (e) => setIso(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Jornada (h)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						step: "0.25",
						className: "w-24",
						value: s.timesheet.jornada,
						onChange: (e) => s.setJornada(parseFloat(e.target.value) || 0)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					["e1", "Entrada"],
					["s1", "Saída almoço"],
					["e2", "Volta"],
					["s2", "Saída"]
				].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: l,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: d[k],
						onChange: (e) => s.setTimesheetField(iso, k, e.target.value)
					})
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Trabalhadas",
						value: tot.w ? minutesToHM(tot.w) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Extra",
						value: tot.x ? minutesToHM(tot.x) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Atraso (semana)",
						value: lateWeek ? minutesToHM(lateWeek) : "—",
						tone: lateWeek > 120 ? "bad" : tot.late > 10 ? "warn" : "default"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-2 mt-8 font-display text-lg",
				children: "Demandas do dia"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: (d.tasks || []).map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-[1fr_140px_90px_1fr_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Demanda",
							value: t.n,
							onChange: (e) => s.patchTsTask(iso, i, { n: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: t.s,
							onChange: (e) => s.patchTsTask(iso, i, { s: e.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Etapa"
							}), TS_STAGES.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "1:30",
							value: t.h,
							onChange: (e) => s.patchTsTask(iso, i, { h: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Nota",
							value: t.o,
							onChange: (e) => s.patchTsTask(iso, i, { o: e.target.value })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => s.delTsTask(iso, i),
							children: "×"
						})
					]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-3",
				variant: "secondary",
				onClick: () => s.addTsTask(iso),
				children: "Adicionar demanda"
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "max-h-[70vh] overflow-auto p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 px-1 text-xs uppercase tracking-wider text-muted-foreground",
				children: "29/09–31/10"
			}), dates.map((k) => {
				const t = tsTotals(s, k);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setIso(k),
					className: cn("flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs", k === iso && "bg-secondary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatBR(k) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-muted-foreground",
						children: t.w ? minutesToHM(t.w) : "—"
					})]
				}, k);
			})]
		}) })]
	});
}
function Processo() {
	const s = useNara();
	const [key, setKey] = (0, import_react.useState)("geral");
	const F = s.flow[key] || {};
	let tot = 0;
	let ok = 0;
	PROCESS_STEPS.forEach((st, si) => st.items.forEach((_, i) => {
		tot++;
		if (F[`${si}_${i}`]) ok++;
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Encomenda",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: key,
					onChange: (e) => setKey(e.target.value),
					className: "w-64",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "geral",
						children: "Modelo geral"
					}), s.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => s.clearFlow(key),
				children: "Limpar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-muted-foreground",
				children: [
					ok,
					"/",
					tot,
					" · ",
					tot ? Math.round(ok / tot * 100) : 0,
					"%"
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: PROCESS_STEPS.map((st, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-baseline gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl text-primary",
					children: st.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: st.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"cláusula ",
						st.clause,
						" · ",
						st.sub
					]
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: st.items.map((it, i) => {
					const k = `${si}_${i}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-0.5 accent-primary",
							checked: !!F[k],
							onChange: (e) => s.setFlow(key, k, e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn(F[k] && "text-muted-foreground line-through"),
							children: it
						})]
					}) }, k);
				})
			})]
		}) }, st.n))
	})] });
}
function Previsao() {
	const s = useNara();
	const [from, setFrom] = (0, import_react.useState)(todayISO().slice(0, 8) + "01");
	const [to, setTo] = (0, import_react.useState)(todayISO());
	const [mi, setMi] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getMonth());
	const tasks = allTasks(s).filter((x) => x.task.date && x.task.date >= from && x.task.date <= to);
	let sinal = 0;
	let saldo = 0;
	tasks.forEach((x) => {
		if ("isLoose" in x.client) return;
		const v = forecastForTask(x.client, x.task);
		if (x.task.type === "Esboços") sinal += v;
		if (x.task.type === "Renderização") saldo += v;
	});
	const a = atelierForecast(s);
	const grid = monthGrid(2026, mi);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "De",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: from,
					onChange: (e) => setFrom(e.target.value)
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Até",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: to,
					onChange: (e) => setTo(e.target.value)
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Previsto no período",
					value: brl(sinal + saldo)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Sinal (esboço)",
					value: brl(sinal)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Saldo (render)",
					value: brl(saldo)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-1",
			children: STUDIO_MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: mi === m.month ? "default" : "ghost",
				onClick: () => setMi(m.month),
				children: m.label
			}, m.month))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-3 text-sm text-muted-foreground",
			children: [
				"Out–dez previsto: ",
				brl(a.tot),
				" · já recebido ",
				brl(a.rec[10] + a.rec[11] + a.rec[12])
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-8 gap-1 text-center text-[11px] text-muted-foreground",
			children: [WEEKDAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: d }, d)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Semana" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 grid grid-cols-8 gap-1",
			children: grid.map((weekRow) => {
				const weekVal = weekRow.reduce((acc, cell) => {
					return acc + tasksOnDate(s, cell.iso).filter((x) => !("isLoose" in x.client)).reduce((sum, x) => sum + forecastForTask(x.client, x.task), 0);
				}, 0);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeekRow, {
					weekRow,
					weekVal,
					s
				}, weekRow[0].iso);
			})
		})
	] });
}
function WeekRow({ weekRow, weekVal, s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "contents",
		children: [weekRow.map((cell) => {
			const v = tasksOnDate(s, cell.iso).filter((x) => !("isLoose" in x.client)).reduce((acc, x) => acc + forecastForTask(x.client, x.task), 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("min-h-16 rounded-md bg-card p-1.5 text-left text-xs shadow-card", !cell.inMonth && "opacity-40"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					children: cell.date.getDate()
				}), v ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 tabular-nums text-primary",
					children: brl(v)
				}) : null]
			}, cell.iso);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-16 flex-col justify-center rounded-md bg-secondary/70 p-1.5 text-xs shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-wider text-muted-foreground",
				children: "Total"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-medium tabular-nums text-primary",
				children: weekVal ? brl(weekVal) : "—"
			})]
		})]
	});
}
function Pagamentos() {
	const s = useNara();
	const [mi, setMi] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getMonth());
	const [day, setDay] = (0, import_react.useState)(null);
	const [value, setValue] = (0, import_react.useState)("");
	const [clientId, setClientId] = (0, import_react.useState)(s.clients[0]?.id || "");
	const [method, setMethod] = (0, import_react.useState)("Pix");
	const [note, setNote] = (0, import_react.useState)("");
	const grid = monthGrid(2026, mi);
	const monthPays = s.payments.filter((p) => p.date.slice(5, 7) === String(mi + 1).padStart(2, "0"));
	const total = monthPays.reduce((a, p) => a + p.value, 0);
	const dayPays = s.payments.filter((p) => p.date === day);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_300px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex flex-wrap gap-1",
				children: STUDIO_MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: mi === m.month ? "default" : "ghost",
					onClick: () => setMi(m.month),
					children: m.label
				}, m.month))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Recebido no mês",
					value: brl(total)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Lançamentos",
					value: String(monthPays.length)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: grid.flat().map((cell) => {
					const n = s.payments.filter((p) => p.date === cell.iso).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setDay(cell.iso),
						className: cn("min-h-14 rounded-md bg-card p-1.5 text-left text-xs shadow-card", !cell.inMonth && "opacity-40", day === cell.iso && "ring-1 ring-primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: cell.date.getDate() }), n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-primary",
							children: n
						}) : null]
					}, cell.iso);
				})
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg",
				children: day ? formatBR(day) : "Escolha um dia"
			}), day ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid gap-2",
				children: [
					dayPays.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							p.clientName,
							" · ",
							p.method
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [brl(p.value), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "ml-2 text-destructive",
								onClick: () => s.deletePayment(p.id),
								children: "×"
							})]
						})]
					}, p.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: clientId,
						onChange: (e) => setClientId(e.target.value),
						children: s.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.id,
							children: c.name
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						placeholder: "Valor R$",
						value,
						onChange: (e) => setValue(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
						value: method,
						onChange: (e) => setMethod(e.target.value),
						children: [
							"Pix",
							"Cartão",
							"Dinheiro",
							"Transferência",
							"Outro"
						].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: m }, m))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Nota",
						value: note,
						onChange: (e) => setNote(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							const client = s.clients.find((c) => c.id === clientId);
							const v = parseFloat(value);
							if (!client || !v) return;
							s.addPayment({
								date: day,
								clientId: client.id,
								clientName: client.name,
								value: v,
								method,
								note
							});
							setValue("");
							setNote("");
						},
						children: "Registrar"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Clique no calendário para lançar o que caiu na conta."
			})]
		}) })]
	});
}
function Relatorio() {
	const s = useNara();
	const [kind, setKind] = (0, import_react.useState)("week");
	const [iso, setIso] = (0, import_react.useState)(todayISO());
	const [mi, setMi] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getMonth());
	let from = "0000-00-00";
	let to = "9999-99-99";
	let label = "Tempo todo";
	if (kind === "month") {
		const last = new Date(2026, mi + 1, 0).getDate();
		from = `2026-${String(mi + 1).padStart(2, "0")}-01`;
		to = `2026-${String(mi + 1).padStart(2, "0")}-${String(last).padStart(2, "0")}`;
		label = monthLabel(2026, mi);
	} else if (kind === "week") {
		const d = /* @__PURE__ */ new Date(iso + "T12:00:00");
		const s0 = new Date(d);
		s0.setDate(d.getDate() - d.getDay());
		const e0 = new Date(s0);
		e0.setDate(s0.getDate() + 6);
		from = todayISO(s0);
		to = todayISO(e0);
		label = `${formatBR(from)} – ${formatBR(to)}`;
	}
	const inR = (d) => !!d && d >= from && d <= to;
	const done = allTasks(s).filter((x) => x.task.done && inR(x.task.date));
	const hrs = done.reduce((a, x) => a + Number(x.task.hours || 0), 0);
	const pgT = s.payments.filter((p) => inR(p.date)).reduce((a, p) => a + p.value, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex flex-wrap gap-2",
		children: [
			[
				["week", "Semana"],
				["month", "Mês"],
				["all", "Tudo"]
			].map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: kind === k ? "default" : "outline",
				onClick: () => setKind(k),
				children: l
			}, k)),
			kind === "week" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "date",
				className: "w-40",
				value: iso,
				onChange: (e) => setIso(e.target.value)
			}) : null,
			kind === "month" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
				value: String(mi),
				onChange: (e) => setMi(+e.target.value),
				className: "w-40",
				children: STUDIO_MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: m.month,
					children: m.label
				}, m.month))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "sm",
				className: "no-print",
				onClick: () => window.print(),
				children: "Imprimir"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card p-6 shadow-card",
		id: "report",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
				children: "Lumi · relatório"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Concluídas",
						value: String(done.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Horas",
						value: `${Math.round(hrs * 10) / 10}h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Recebido",
						value: brl(pgT)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-6 w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-left text-xs uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2",
							children: "Data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Cliente" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Etapa" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-right",
							children: "Horas"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: done.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: formatBR(x.task.date)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: x.client.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: stageShort(x.task.type) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "text-right tabular-nums",
							children: x.task.hours || 0
						})
					]
				}, x.task.id)) })]
			})
		]
	})] });
}
var SplitComponent = TrabalhoPage;
//#endregion
export { SplitComponent as component };
