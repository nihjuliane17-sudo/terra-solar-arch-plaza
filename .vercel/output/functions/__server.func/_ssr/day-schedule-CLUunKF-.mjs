import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { B as useNara, C as cn, D as formatLong, P as tasksOnDate, R as uid, T as forecastForTask, b as clamp, n as Button, y as brl } from "./store-BFPkgcXL.mjs";
import { a as Select, r as Input } from "./select-HWYz-cwW.mjs";
import { t as Field } from "./field-D854B_M-.mjs";
import { i as DialogTitle, n as Dialog, r as DialogContent } from "./router-B-HODM9Y.mjs";
import { t as Textarea } from "./textarea-C88GXXl7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/day-schedule-CLUunKF-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SNAP = .25;
var DAY_HOURS = Array.from({ length: 17 }, (_, i) => 6 + i);
function taskKey(r) {
	return `${r.loose ? "l" : "c"}:${r.clientId}:${r.taskId}`;
}
function refFromFlat(x) {
	const loose = "isLoose" in x.client;
	return {
		taskId: x.task.id,
		clientId: loose ? "" : x.client.id,
		loose
	};
}
function snapHour(n) {
	return Math.round(n / SNAP) * SNAP;
}
function clampHour(n) {
	return clamp(snapHour(n), 6, 22.75);
}
function hourToLabel(h) {
	const hr = Math.floor(h);
	const min = Math.round((h - hr) * 60);
	return `${String(hr).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
}
function parseTimeToHour(t) {
	if (!t) return void 0;
	const [h, m] = t.split(":").map(Number);
	if (!Number.isFinite(h)) return void 0;
	return clampHour(h + (Number.isFinite(m) ? m / 60 : 0));
}
function visualHours(hours) {
	return Math.max(.5, Number(hours) || 1);
}
function packDay(items) {
	const timed = items.filter((x) => x.task.startHour != null).map((x) => {
		const start = clampHour(x.task.startHour);
		const end = Math.min(23, start + visualHours(x.task.hours));
		return {
			id: x.task.id,
			start,
			end
		};
	}).sort((a, b) => a.start - b.start || a.end - b.end);
	const placed = [];
	for (const it of timed) {
		let col = 0;
		while (placed.some((p) => p.col === col && p.start < it.end && it.start < p.end)) col += 1;
		placed.push({
			...it,
			col
		});
	}
	const out = {};
	for (const it of placed) {
		const cluster = placed.filter((p) => p.start < it.end && it.start < p.end);
		const cols = Math.max(1, ...cluster.map((c) => c.col + 1));
		out[it.id] = {
			col: it.col,
			cols,
			start: it.start,
			end: it.end
		};
	}
	return out;
}
function yToHour(y, gridTop) {
	return clampHour(6 + (y - gridTop) / 52);
}
function hourToY(h) {
	return (h - 6) * 52;
}
function stageTone(stage) {
	if (stage === "Concluído") return "ok";
	if (stage === "Alteração") return "warn";
	if (stage === "Renderização" || stage === "Base") return "primary";
	return "default";
}
function payTone(status) {
	if (status === "paid") return "ok";
	if (status === "half") return "warn";
	return "bad";
}
function payLabel(status) {
	if (status === "paid") return "Pago";
	if (status === "half") return "Sinal";
	return "Em aberto";
}
var STAGE_DOT = {
	"Não iniciado": "bg-muted-foreground/40",
	"Moodboard/Referências": "bg-muted-foreground",
	Esboços: "bg-primary/70",
	Base: "bg-primary",
	Renderização: "bg-ok",
	Alteração: "bg-warn",
	Concluído: "bg-ok",
	"Tarefa avulsa": "bg-foreground/50"
};
function stageShort(s) {
	return {
		"Não iniciado": "Fila",
		"Moodboard/Referências": "Moodboard",
		Esboços: "Esboço",
		Base: "Base",
		Renderização: "Render",
		Alteração: "Alteração",
		Concluído: "Pronto",
		"Tarefa avulsa": "Avulsa"
	}[s] || s;
}
function DaySchedule({ iso, selected, onToggleSelect, allowCreate = true, showPonto = true }) {
	const s = useNara();
	const items = tasksOnDate(s, iso);
	const timed = items.filter((x) => x.task.startHour != null);
	const untimed = items.filter((x) => x.task.startHour == null);
	const packed = (0, import_react.useMemo)(() => packDay(items), [items]);
	const ponto = s.timesheet.days[iso];
	const gridRef = (0, import_react.useRef)(null);
	const drag = (0, import_react.useRef)(null);
	const skipClick = (0, import_react.useRef)(false);
	const [ghost, setGhost] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [draftHour, setDraftHour] = (0, import_react.useState)(null);
	const earn = items.reduce((a, x) => {
		if ("isLoose" in x.client) return a;
		return a + forecastForTask(x.client, x.task);
	}, 0);
	const hrs = items.reduce((a, x) => a + Number(x.task.hours || 0), 0);
	const bands = (0, import_react.useMemo)(() => {
		if (!showPonto || !ponto) return [];
		const out = [];
		const push = (a, b, label) => {
			const sH = a ? parseTimeToHour(a) : void 0;
			const eH = b ? parseTimeToHour(b) : void 0;
			if (sH == null || eH == null || eH <= sH) return;
			out.push({
				top: hourToY(sH),
				height: (eH - sH) * 52,
				label: label || ""
			});
		};
		push(ponto.e1, ponto.s1 || ponto.s2, "manhã");
		push(ponto.e2, ponto.s2, "tarde");
		return out;
	}, [ponto, showPonto]);
	const applyMove = (clientY) => {
		const d = drag.current;
		const grid = gridRef.current;
		if (!d || !grid) return;
		const rect = grid.getBoundingClientRect();
		if (d.mode === "move") {
			const next = yToHour(clientY - (d.startY - hourToY(d.originHour) - rect.top), rect.top);
			setGhost({
				top: hourToY(next),
				height: visualHours(d.originHours) * 52
			});
		} else {
			const nextH = Math.max(SNAP_MIN, snapHour((clientY - rect.top) / 52 + 6 - d.originHour));
			setGhost({
				top: hourToY(d.originHour),
				height: nextH * 52
			});
		}
	};
	const commitDrag = (clientY) => {
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
			const nextH = Math.max(SNAP_MIN, snapHour((clientY - rect.top) / 52 + 6 - d.originHour));
			store.moveMany(d.refs, { hours: nextH });
		}
	};
	(0, import_react.useEffect)(() => {
		const move = (e) => {
			if (!drag.current) return;
			if (Math.hypot(e.clientY - drag.current.startY, 0) > 4) drag.current.moved = true;
			applyMove(e.clientY);
		};
		const up = (e) => commitDrag(e.clientY);
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
		return () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};
	}, []);
	const onGridPointerUp = (e) => {
		if (skipClick.current) {
			skipClick.current = false;
			return;
		}
		if (drag.current?.moved) return;
		if (e.target.closest("[data-task-key]")) return;
		const rect = gridRef.current?.getBoundingClientRect();
		if (!rect) return;
		setDraftHour(yToHour(e.clientY, rect.top));
	};
	const dropUntimed = (hour, ref) => {
		s.moveMany([ref], {
			date: iso,
			startHour: hour
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-3 flex flex-wrap items-end justify-between gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-xl capitalize",
				children: formatLong(iso)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					hrs || 0,
					"h previstas",
					earn ? ` · ${brl(earn)}` : "",
					" · ",
					6,
					"h–",
					23,
					"h"
				]
			})] })
		}),
		untimed.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 rounded-lg bg-secondary/60 p-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1.5 text-[11px] uppercase tracking-wider text-muted-foreground",
				children: "Sem horário — arraste para a grade"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1",
				children: untimed.map((x) => {
					const ref = refFromFlat(x);
					const key = taskKey(ref);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"data-task-key": key,
						draggable: true,
						onDragStart: (e) => {
							e.dataTransfer.setData("text/lumi-task", JSON.stringify(ref));
							e.dataTransfer.effectAllowed = "move";
						},
						onClick: (e) => {
							if (onToggleSelect && (e.shiftKey || e.metaKey || e.ctrlKey)) onToggleSelect(ref, true);
							else setEditing(x);
						},
						className: cn("rounded-md bg-card px-2 py-1 text-left text-xs shadow-card", x.task.done && "opacity-50 line-through", selected?.has(key) && "ring-1 ring-primary"),
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
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl bg-card shadow-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-12 shrink-0 border-r border-border py-0 text-right",
					children: DAY_HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pr-2 text-[10px] tabular-nums text-muted-foreground",
						style: { height: 52 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "-translate-y-2 block pt-0.5",
							children: hourToLabel(h)
						})
					}, h))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: gridRef,
					className: "relative min-h-0 flex-1 select-none",
					style: { height: 884 },
					onPointerUp: onGridPointerUp,
					onDragOver: (e) => e.preventDefault(),
					onDrop: (e) => {
						e.preventDefault();
						const raw = e.dataTransfer.getData("text/lumi-task");
						if (!raw || !gridRef.current) return;
						try {
							const ref = JSON.parse(raw);
							const hour = yToHour(e.clientY, gridRef.current.getBoundingClientRect().top);
							dropUntimed(hour, ref);
						} catch {}
					},
					children: [
						DAY_HOURS.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-hour": h,
							className: "border-t border-border/70",
							style: { height: 52 }
						}, h)),
						bands.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-x-0 bg-primary/8",
							style: {
								top: b.top,
								height: b.height
							}
						}, i)),
						ghost ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute inset-x-2 rounded-md bg-primary/20 ring-1 ring-primary",
							style: {
								top: ghost.top,
								height: ghost.height
							}
						}) : null,
						timed.map((x) => {
							const ref = refFromFlat(x);
							const key = taskKey(ref);
							const pack = packed[x.task.id];
							if (!pack) return null;
							const width = `calc((100% - 8px) / ${pack.cols})`;
							const left = `calc(4px + ${pack.col} * (100% - 8px) / ${pack.cols})`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-task-key": key,
								className: cn("absolute z-10 cursor-grab overflow-hidden rounded-md bg-secondary px-2 py-1 text-xs shadow-card active:cursor-grabbing", x.task.done && "opacity-50", selected?.has(key) && "ring-1 ring-primary"),
								style: {
									top: hourToY(pack.start),
									height: Math.max(22, (pack.end - pack.start) * 52 - 2),
									left,
									width
								},
								onPointerDown: (e) => {
									if (e.button !== 0) return;
									const handle = e.target.dataset.resize;
									drag.current = {
										refs: selected?.has(key) && selected.size > 1 && onToggleSelect ? items.filter((it) => selected.has(taskKey(refFromFlat(it)))).map(refFromFlat) : [ref],
										mode: handle ? "resize" : "move",
										originHour: pack.start,
										originHours: visualHours(x.task.hours),
										startY: e.clientY,
										moved: false
									};
									e.stopPropagation();
								},
								onClick: (e) => {
									e.stopPropagation();
									if (drag.current?.moved) return;
									if (onToggleSelect && (e.shiftKey || e.metaKey || e.ctrlKey)) {
										onToggleSelect(ref, true);
										return;
									}
									setEditing(x);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("mt-1 inline-block size-1.5 shrink-0 rounded-full", STAGE_DOT[x.task.type] || "bg-muted-foreground") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: cn("truncate font-medium", x.task.done && "line-through"),
											children: x.client.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "truncate text-[10px] text-muted-foreground",
											children: [
												hourToLabel(pack.start),
												" · ",
												stageShort(x.task.type),
												x.task.hours ? ` · ${x.task.hours}h` : ""
											]
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-resize": "1",
									className: "absolute inset-x-0 bottom-0 h-2 cursor-ns-resize"
								})]
							}, key);
						})
					]
				})]
			})
		}),
		allowCreate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddTaskForm, {
			iso,
			presetHour: draftHour,
			onPresetUsed: () => setDraftHour(null)
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskEditor, {
			item: editing,
			onClose: () => setEditing(null)
		})
	] });
}
var SNAP_MIN = .5;
function AddTaskForm({ iso, presetHour, onPresetUsed }) {
	const s = useNara();
	const [title, setTitle] = (0, import_react.useState)("");
	const [time, setTime] = (0, import_react.useState)("09:00");
	const [hours, setHours] = (0, import_react.useState)("1");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [cid, setCid] = (0, import_react.useState)(s.clients[0]?.id || "");
	const [stage, setStage] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("loose");
	const client = s.clients.find((c) => c.id === cid);
	(0, import_react.useEffect)(() => {
		if (presetHour == null) return;
		setTime(hourToLabel(presetHour));
		onPresetUsed();
	}, [presetHour]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 rounded-xl bg-card p-4 shadow-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: mode === "loose" ? "secondary" : "ghost",
				onClick: () => setMode("loose"),
				children: "Nova tarefa"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: mode === "client" ? "secondary" : "ghost",
				onClick: () => setMode("client"),
				children: "Marcar etapa"
			})]
		}), mode === "loose" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2 sm:grid-cols-[1fr_110px_80px_auto]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "O que precisa ser feito",
					value: title,
					onChange: (e) => setTitle(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "time",
					value: time,
					onChange: (e) => setTime(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					step: "0.5",
					min: "0.5",
					value: hours,
					onChange: (e) => setHours(e.target.value),
					title: "Duração (h)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (!title.trim()) return;
						s.addLoose({
							id: uid(),
							title: title.trim(),
							date: iso,
							hours: parseFloat(hours) || 1,
							done: false,
							startHour: parseTimeToHour(time) ?? 9,
							notes: notes.trim()
						});
						setTitle("");
						setNotes("");
					},
					children: "Adicionar"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "sm:col-span-4 min-h-16",
					placeholder: "Observação (opcional)",
					value: notes,
					onChange: (e) => setNotes(e.target.value)
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-2 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: cid,
					onChange: (e) => setCid(e.target.value),
					children: s.clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.name
					}, c.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: stage,
					onChange: (e) => setStage(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Etapa"
					}), (client?.tasks || []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t.id,
						children: t.type
					}, t.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "time",
					value: time,
					onChange: (e) => setTime(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					step: "0.5",
					min: "0.5",
					value: hours,
					onChange: (e) => setHours(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					className: "sm:col-span-2 min-h-16",
					placeholder: "Observação (opcional)",
					value: notes,
					onChange: (e) => setNotes(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "sm:col-span-2",
					onClick: () => {
						if (!client || !stage) return;
						s.patchTask(client.id, stage, {
							date: iso,
							hours: parseFloat(hours) || 1,
							startHour: parseTimeToHour(time) ?? 9,
							notes: notes.trim()
						});
						setNotes("");
					},
					children: "Marcar neste dia"
				})
			]
		})]
	});
}
function TaskEditor({ item, onClose }) {
	const s = useNara();
	const [time, setTime] = (0, import_react.useState)("09:00");
	const [hours, setHours] = (0, import_react.useState)("1");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!item) return;
		setTime(hourToLabel(item.task.startHour ?? 9));
		setHours(String(item.task.hours || 1));
		setNotes(item.loose?.notes || item.task.notes || "");
		setTitle(item.loose?.title || item.client.name);
	}, [item]);
	if (!item) return null;
	const loose = "isLoose" in item.client;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: true,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: loose ? "Tarefa" : item.client.name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-sm text-muted-foreground",
				children: stageShort(item.task.type)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [
					loose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Título",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value)
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Horário",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "time",
								value: time,
								onChange: (e) => setTime(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Duração (h)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: "0.5",
								min: "0.5",
								value: hours,
								onChange: (e) => setHours(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Observação",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							className: "min-h-24"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-primary",
							checked: !!item.task.done,
							onChange: () => {
								if (loose) s.patchLoose(item.task.id, { done: !item.task.done });
								else s.toggleTaskDone(item.client.id, item.task.id);
							}
						}), "Concluída"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between",
						children: [loose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							className: "text-destructive",
							onClick: () => {
								s.deleteLoose(item.task.id);
								onClose();
							},
							children: "Excluir"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: onClose,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									const patch = {
										startHour: parseTimeToHour(time) ?? 9,
										hours: parseFloat(hours) || 1,
										notes
									};
									if (loose) s.patchLoose(item.task.id, {
										...patch,
										title: title.trim() || item.task.type
									});
									else s.patchTask(item.client.id, item.task.id, patch);
									onClose();
								},
								children: "Salvar"
							})]
						})]
					})
				]
			})
		] })
	});
}
//#endregion
export { refFromFlat as a, taskKey as c, payTone as i, STAGE_DOT as n, stageShort as o, payLabel as r, stageTone as s, DaySchedule as t };
