import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as monthGrid, B as useNara, C as cn, E as formatBR, F as todayISO, R as uid, c as MOODS, g as WEEKDAYS, n as Button, o as LIFE_CATS, s as MONTHS_PT } from "./store-BFPkgcXL.mjs";
import { a as Select, i as PageHeader, n as CardContent, r as Input, t as Card } from "./select-HWYz-cwW.mjs";
import { t as Field } from "./field-D854B_M-.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-D9NBhluL.mjs";
import { S as useSearch, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Textarea } from "./textarea-C88GXXl7.mjs";
import { n as Empty, t as Badge } from "./badge-CmAK09ge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vida-hBoQeROt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SistemaPanels() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "mem",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "mem",
					children: "Membros"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "fn",
					children: "Funções"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "nt",
					children: "Notas"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "mem",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Membros, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "fn",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funcoes, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "nt",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notas, {})
			})
		]
	});
}
function Membros() {
	const s = useNara();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-3",
		children: s.system.m.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex size-12 items-center justify-center rounded-full bg-secondary font-display text-xl text-primary",
					children: (m.n || "?")[0]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "font-display text-lg",
					value: m.n,
					onChange: (e) => s.patchMember(i, { n: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "mt-2",
					value: m.r,
					onChange: (e) => s.patchMember(i, { r: e.target.value }),
					placeholder: "Papel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 mt-4 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Sobre"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: m.d,
					onChange: (e) => s.patchMember(i, { d: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 mt-4 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Funções"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: m.f,
					onChange: (e) => s.patchMember(i, { f: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 mt-4 text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Gostos, limites, cuidados"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: m.g,
					onChange: (e) => s.patchMember(i, { g: e.target.value })
				})
			]
		}) }, m.id))
	});
}
function Funcoes() {
	const s = useNara();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "w-full text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "text-left text-xs uppercase tracking-wider text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-2",
					children: "Função"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Responsável" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nota" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: s.system.fn.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: "border-t border-border",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: x.f,
						onChange: (e) => s.patchFn(i, { f: e.target.value })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: x.w,
					onChange: (e) => s.patchFn(i, { w: e.target.value }),
					children: s.system.m.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: m.id,
						children: m.n
					}, m.id))
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: x.o,
					onChange: (e) => s.patchFn(i, { o: e.target.value })
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => s.delFn(i),
					children: "×"
				}) })
			]
		}, i)) })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: "mt-3",
		variant: "secondary",
		onClick: () => s.addFn(),
		children: "Nova função"
	})] });
}
function Notas() {
	const s = useNara();
	const now = /* @__PURE__ */ new Date();
	const [y, setY] = (0, import_react.useState)(now.getFullYear());
	const [m, setM] = (0, import_react.useState)(now.getMonth());
	const [open, setOpen] = (0, import_react.useState)(null);
	const grid = monthGrid(y, m);
	const page = s.system.dia.find((d) => d.id === open);
	if (open) {
		const p = page || {
			id: open,
			txt: "",
			mood: "",
			song: "",
			it: []
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => setOpen(null),
				children: "Voltar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 font-display text-xl",
				children: formatBR(open)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "paper-lines min-h-72",
				value: p.txt,
				onChange: (e) => s.upsertPage("sdia", {
					...p,
					txt: e.target.value
				})
			})
		] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-center justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => setM((x) => x === 0 ? (setY(y - 1), 11) : x - 1),
				children: "Anterior"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-display text-xl",
				children: [
					MONTHS_PT[m],
					" ",
					y
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => setM((x) => x === 11 ? (setY(y + 1), 0) : x + 1),
				children: "Próximo"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-7 gap-1",
		children: grid.flat().map((cell) => {
			const e = s.system.dia.find((d) => d.id === cell.iso);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(cell.iso),
				className: cn("min-h-16 rounded-md bg-card p-1.5 text-left text-xs shadow-card", !cell.inMonth && "opacity-40", e && "bg-secondary", cell.iso === todayISO() && "ring-1 ring-primary"),
				children: [cell.date.getDate(), e?.txt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 line-clamp-2 text-[10px] text-muted-foreground",
					children: e.txt
				}) : null]
			}, cell.iso);
		})
	})] });
}
function VidaPage() {
	const search = useSearch({ strict: false });
	const navigate = useNavigate();
	const tab = search.tab || "agenda";
	const setTab = (v) => navigate({
		to: "/vida",
		search: {
			...search,
			tab: v
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Pessoal",
		title: "Vida",
		description: "Agenda, diário, cadernos e a casa — o resto, no mesmo tom."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		value: tab,
		onValueChange: setTab,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "agenda",
					children: "Agenda"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "diario",
					children: "Diário"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "est",
					children: "Estudos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "cui",
					children: "Cuidado"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "ide",
					children: "Ideias"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "casa",
					children: "Casa"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "agenda",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LifeCal, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "diario",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diary, { initial: search.day })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "est",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, { cat: "est" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "cui",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, { cat: "cui" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "ide",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, { cat: "ide" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "casa",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SistemaPanels, {})
			})
		]
	})] });
}
function LifeCal() {
	const s = useNara();
	const now = /* @__PURE__ */ new Date();
	const [y, setY] = (0, import_react.useState)(now.getFullYear());
	const [m, setM] = (0, import_react.useState)(now.getMonth());
	const [day, setDay] = (0, import_react.useState)(todayISO());
	const grid = monthGrid(y, m);
	const events = s.life.ev.filter((e) => e.d === day);
	const [title, setTitle] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)(LIFE_CATS[0]);
	const [tm, setTm] = (0, import_react.useState)("");
	const shift = (k) => {
		const d = new Date(y, m + k, 1);
		setY(d.getFullYear());
		setM(d.getMonth());
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_300px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => shift(-1),
						children: "Anterior"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "font-display text-xl",
						children: [
							MONTHS_PT[m],
							" ",
							y
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => shift(1),
						children: "Próximo"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground",
				children: WEEKDAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: d }, d))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 grid grid-cols-7 gap-1",
				children: grid.flat().map((cell) => {
					const evs = s.life.ev.filter((e) => e.d === cell.iso);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setDay(cell.iso),
						className: cn("min-h-20 rounded-md bg-card p-1.5 text-left shadow-card", !cell.inMonth && "opacity-40", cell.iso === day && "ring-1 ring-primary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs",
							children: cell.date.getDate()
						}), evs.slice(0, 2).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-[10px] text-muted-foreground",
							children: e.t
						}, e.id))]
					}, cell.iso);
				})
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg",
					children: formatBR(day)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: !!e.done,
								onChange: () => s.patchLifeEvent(e.id, { done: e.done ? 0 : 1 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("flex-1", e.done && "line-through opacity-50"),
								children: [e.tm ? `${e.tm} ` : "", e.t]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "text-destructive",
								onClick: () => s.delLifeEvent(e.id),
								children: "×"
							})
						]
					}, e.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Compromisso",
							value: title,
							onChange: (e) => setTitle(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: cat,
							onChange: (e) => setCat(e.target.value),
							children: LIFE_CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "time",
							value: tm,
							onChange: (e) => setTm(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								if (!title.trim()) return;
								s.addLifeEvent({
									id: uid(),
									d: day,
									t: title.trim(),
									c: cat,
									tm,
									done: 0
								});
								setTitle("");
							},
							children: "Adicionar"
						})
					]
				})
			]
		}) })]
	});
}
function Diary({ initial }) {
	const s = useNara();
	const now = /* @__PURE__ */ new Date();
	const [y, setY] = (0, import_react.useState)(now.getFullYear());
	const [m, setM] = (0, import_react.useState)(now.getMonth());
	const [open, setOpen] = (0, import_react.useState)(initial || null);
	const grid = monthGrid(y, m);
	const page = s.life.dia.find((d) => d.id === open);
	if (open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookEditor, {
		page: page || {
			id: open,
			txt: "",
			mood: "",
			song: "",
			it: []
		},
		diary: true,
		onBack: () => setOpen(null),
		bag: "dia"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-center justify-between",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => setM((x) => x === 0 ? (setY(y - 1), 11) : x - 1),
				children: "Anterior"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-display text-xl",
				children: [
					MONTHS_PT[m],
					" ",
					y
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				onClick: () => setM((x) => x === 11 ? (setY(y + 1), 0) : x + 1),
				children: "Próximo"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-7 gap-1",
		children: grid.flat().map((cell) => {
			const e = s.life.dia.find((d) => d.id === cell.iso);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setOpen(cell.iso),
				className: cn("min-h-20 rounded-md bg-card p-1.5 text-left shadow-card", !cell.inMonth && "opacity-40", e && "bg-secondary"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs",
						children: cell.date.getDate()
					}),
					e?.mood ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "mt-1",
						children: MOODS.find((m) => m.id === e.mood)?.label || e.mood
					}) : null,
					e?.txt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-2 text-[10px] text-muted-foreground",
						children: e.txt
					}) : null
				]
			}, cell.iso);
		})
	})] });
}
function Catalog({ cat }) {
	const s = useNara();
	const C = s.life[cat];
	const [open, setOpen] = (0, import_react.useState)(null);
	const page = C.n.find((n) => n.id === open);
	if (open && page) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotebookEditor, {
		page,
		bag: cat,
		onBack: () => setOpen(null)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mb-4",
			variant: "secondary",
			onClick: () => {
				const n = prompt("Nome da pasta");
				if (n) s.addFolder(cat, n);
			},
			children: "Nova pasta"
		}),
		C.f.map((f, i) => {
			const notes = C.n.filter((n) => n.f === f);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "flex-1 font-display text-lg",
								children: f
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									const t = prompt("Título");
									if (!t) return;
									const id = uid();
									s.upsertPage(cat, {
										id,
										f,
										t,
										txt: "",
										it: []
									});
									setOpen(id);
								},
								children: "Nova página"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									const n = prompt("Renomear", f);
									if (n) s.renameFolder(cat, i, n);
								},
								children: "Renomear"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => s.delFolder(cat, i),
								children: "×"
							})
						]
					}), notes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Vazio."
					}) : notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "block w-full rounded-md px-2 py-2 text-left text-sm hover:bg-secondary",
						onClick: () => setOpen(n.id),
						children: n.t || "Sem título"
					}, n.id))]
				})
			}, f);
		}),
		C.f.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { title: "Nenhuma pasta" }) : null
	] });
}
function NotebookEditor({ page, bag, diary, onBack }) {
	const s = useNara();
	const save = (patch) => {
		if (bag === "dia") s.upsertPage("dia", {
			...page,
			...patch,
			it: patch.it ?? page.it
		});
		else s.patchPage(bag, page.id, patch);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: onBack,
					children: "Voltar"
				}),
				diary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: formatBR(page.id)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "max-w-sm",
					value: page.t || "",
					onChange: (e) => save({ t: e.target.value })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex-1" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "text-destructive",
					onClick: () => {
						s.delPage(bag, page.id);
						onBack();
					},
					children: "Excluir"
				})
			]
		}),
		diary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-1",
			children: MOODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: page.mood === m.id ? "default" : "ghost",
				onClick: () => save({ mood: m.id }),
				children: m.label
			}, m.id))
		}) : null,
		diary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Música do dia",
			className: "mb-4 max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: page.song || "",
				onChange: (e) => save({ song: e.target.value })
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			className: "paper-lines min-h-64",
			value: page.txt,
			onChange: (e) => save({ txt: e.target.value }),
			placeholder: "Escreva."
		})
	] });
}
var SplitComponent = VidaPage;
//#endregion
export { SplitComponent as component };
