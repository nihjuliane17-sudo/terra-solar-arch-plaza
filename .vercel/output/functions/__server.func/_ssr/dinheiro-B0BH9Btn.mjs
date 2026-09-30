import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { B as useNara, C as cn, F as todayISO, M as num, O as inMonth, d as SHOP_TIPOS, i as EXPENSE_CATS, l as PRIORITY, n as Button, v as atelierForecast, w as financePulse, y as brl } from "./store-BFPkgcXL.mjs";
import { a as Select, i as PageHeader, n as CardContent, r as Input, t as Card } from "./select-HWYz-cwW.mjs";
import { t as Stat } from "./stat-B53dt4IE.mjs";
import { t as Field } from "./field-D854B_M-.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-D9NBhluL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dinheiro-B0BH9Btn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MONTHS = [
	[10, "Outubro"],
	[11, "Novembro"],
	[12, "Dezembro"]
];
function DinheiroPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Casa",
		title: "Dinheiro",
		description: "Renda, custo de viver, dívidas e a lista da casa até o fim do ano."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "pan",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "pan",
					children: "Panorama"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "plano",
					children: "Lista da casa"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "fixo",
					children: "Custo fixo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "mes",
					children: "Meses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "div",
					children: "Dívidas"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "pan",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panorama, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "plano",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plano, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "fixo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fixo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "mes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meses, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "div",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dividas, {})
			})
		]
	})] });
}
function Panorama() {
	const s = useNara();
	const p = financePulse(s);
	const a = atelierForecast(s);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Renda prevista (out–dez)",
						value: brl(s.finance.renda),
						hint: "editável abaixo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Fixo × 3 meses",
						value: brl(p.fx)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Dívidas em aberto",
						value: brl(p.dv)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: p.sob < 0 ? "Faltam" : "Sobra",
						value: brl(Math.abs(p.sob)),
						tone: p.sob < 0 ? "bad" : "ok"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Renda prevista",
				className: "max-w-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: s.finance.renda,
					onChange: (e) => s.patchFinance({ renda: num(e.target.value) })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-1 font-display text-xl",
						children: "O que entra na conta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-sm text-muted-foreground",
						children: "Desmarque uma prioridade para ver o que sobra se aquele grupo esperar."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: [
							1,
							2,
							3,
							4
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: !!s.finance.inc[n],
									onChange: (e) => s.patchFinance({ inc: {
										...s.finance.inc,
										[n]: e.target.checked ? 1 : 0
									} })
								}), PRIORITY[n].label]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-sm",
								children: brl(p.fal(n))
							})]
						}, n))
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: "Vindo do estúdio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => s.patchFinance({ renda: Math.round(a.tot) }),
						children: "Usar como renda"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-xs uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "py-2",
								children: "Mês"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-right",
								children: "Previsto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-right",
								children: "Recebido"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [MONTHS.map(([m, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: l
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-right tabular-nums",
								children: brl(a.prev[m])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-right tabular-nums",
								children: brl(a.rec[m])
							})
						]
					}, m)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border font-medium",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2",
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-right",
								children: brl(a.tot)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "text-right",
								children: brl(a.rec[10] + a.rec[11] + a.rec[12])
							})
						]
					})] })]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Câmbio USD → BRL",
				className: "max-w-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					step: "0.01",
					value: s.finance.usdRate,
					onChange: (e) => s.setUsdRate(parseFloat(e.target.value) || 0)
				})
			})
		]
	});
}
function Plano() {
	const s = useNara();
	const [tipo, setTipo] = (0, import_react.useState)("");
	const [n, setN] = (0, import_react.useState)("");
	const [v, setV] = (0, import_react.useState)("");
	const [t, setT] = (0, import_react.useState)("Móveis");
	const [p, setP] = (0, import_react.useState)(1);
	const P = s.finance.plano;
	const cols = [
		1,
		2,
		3,
		4
	].map((pr) => ({
		p: pr,
		L: P.map((x, i) => [x, i]).filter(([x]) => x.p === pr && !x.ok && (!tipo || x.t === tipo))
	}));
	const bought = P.map((x, i) => [x, i]).filter(([x]) => x.ok && (!tipo || x.t === tipo));
	const drop = (pr, i) => s.patchPlano(i, { p: pr });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: tipo ? "ghost" : "secondary",
				onClick: () => setTipo(""),
				children: "Todos"
			}), SHOP_TIPOS.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: tipo === x ? "secondary" : "ghost",
				onClick: () => setTipo(x),
				children: x
			}, x))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "w-40",
					placeholder: "Item",
					value: n,
					onChange: (e) => setN(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "w-24",
					placeholder: "Valor",
					value: v,
					onChange: (e) => setV(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: t,
					onChange: (e) => setT(e.target.value),
					className: "w-36",
					children: SHOP_TIPOS.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: String(p),
					onChange: (e) => setP(+e.target.value),
					className: "w-36",
					children: [
						1,
						2,
						3,
						4
					].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: x,
						children: PRIORITY[x].label
					}, x))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (!n.trim()) return;
						s.addPlano({
							p,
							t,
							n: n.trim(),
							v: num(v),
							ok: 0,
							pago: 0,
							data: "",
							o: ""
						});
						setN("");
						setV("");
					},
					children: "Adicionar"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 md:grid-cols-2 xl:grid-cols-5",
			children: [cols.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-3 shadow-card",
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => drop(c.p, +e.dataTransfer.getData("i")),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex justify-between text-xs uppercase tracking-wider text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: PRIORITY[c.p].label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: brl(c.L.reduce((a, [x]) => a + x.v, 0))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: c.L.map(([x, i]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						draggable: true,
						onDragStart: (e) => e.dataTransfer.setData("i", String(i)),
						className: "rounded-md bg-secondary/50 p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: x.n }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: brl(x.v)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									const pago = prompt("Quanto pagou?", String(x.v));
									if (pago === null) return;
									s.patchPlano(i, {
										ok: 1,
										pago: num(pago),
										data: prompt("Data AAAA-MM-DD", todayISO()) || todayISO()
									});
								},
								children: "Comprei"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								className: "text-destructive",
								onClick: () => s.delPlano(i),
								children: "×"
							})]
						})]
					}, i))
				})]
			}, c.p)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-card p-3 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 text-xs uppercase tracking-wider text-muted-foreground",
					children: "Comprados"
				}), bought.map(([x, i]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between py-1 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: x.n }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => s.patchPlano(i, {
							ok: 0,
							pago: 0,
							data: ""
						}),
						children: brl(x.pago)
					})]
				}, i))]
			})]
		})
	] });
}
function Fixo() {
	const s = useNara();
	const tot = s.finance.fixos.reduce((a, x) => a + x.v, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
			label: "Por mês",
			value: brl(tot)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-left text-xs uppercase tracking-wider text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2",
							children: "Item"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Categoria" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-right",
							children: "Valor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: s.finance.fixos.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: x.n,
								onChange: (e) => s.setFixo(i, { n: e.target.value })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: x.c,
							onChange: (e) => s.setFixo(i, { c: e.target.value })
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "text-right",
							value: x.v,
							onChange: (e) => s.setFixo(i, { v: num(e.target.value) })
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => s.delFixo(i),
							children: "×"
						}) })
					]
				}, i)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-3",
			variant: "secondary",
			onClick: () => s.addFixo(),
			children: "Novo custo"
		})
	] });
}
function Meses() {
	const s = useNara();
	const [m, setM] = (0, import_react.useState)(10);
	const g = s.finance.g.map((x, i) => [x, i]).filter(([x]) => inMonth(x.d, m));
	const en = s.finance.ent.map((x, i) => [x, i]).filter(([x]) => inMonth(x.d, m));
	const a = atelierForecast(s);
	const ev = (i) => {
		const o = s.finance.fxm[`${m}_${i}`];
		return o?.v !== void 0 && o.v !== "" ? +o.v : s.finance.fixos[i].v;
	};
	const fT = s.finance.fixos.reduce((acc, _, i) => acc + ev(i), 0);
	const fP = s.finance.fixos.reduce((acc, _, i) => acc + (s.finance.fxm[`${m}_${i}`]?.p ? ev(i) : 0), 0);
	const gd = g.reduce((acc, [x]) => acc + x.v, 0);
	const ent = en.reduce((acc, [x]) => acc + x.v, 0) + (a.rec[m] || 0);
	const [gt, setGt] = (0, import_react.useState)("");
	const [gv, setGv] = (0, import_react.useState)("");
	const [gc, setGc] = (0, import_react.useState)(EXPENSE_CATS[0]);
	const [gdte, setGdte] = (0, import_react.useState)(todayISO());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex gap-1",
			children: MONTHS.map(([k, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: m === k ? "default" : "ghost",
				onClick: () => setM(k),
				children: l
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid gap-3 sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Gasto",
					value: brl(fP + gd)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Entradas",
					value: brl(ent)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Saldo",
					value: brl(ent - (fP + gd)),
					tone: ent - (fP + gd) < 0 ? "bad" : "ok"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Fixos a pagar",
					value: brl(fT - fP)
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 font-display text-lg",
					children: "Fixos"
				}), s.finance.fixos.map((x, i) => {
					const k = `${m}_${i}`;
					const o = s.finance.fxm[k] || {};
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[auto_1fr_100px] items-center gap-2 py-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: !!o.p,
								onChange: (e) => s.setFxm(k, { p: e.target.checked ? 1 : 0 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: x.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "text-right",
								value: ev(i),
								onChange: (e) => s.setFxm(k, { v: num(e.target.value) })
							})
						]
					}, i);
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-3 font-display text-lg",
						children: "Gastos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: gdte,
								onChange: (e) => setGdte(e.target.value),
								className: "w-36"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "O quê",
								value: gt,
								onChange: (e) => setGt(e.target.value),
								className: "w-40"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
								value: gc,
								onChange: (e) => setGc(e.target.value),
								className: "w-40",
								children: EXPENSE_CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Valor",
								value: gv,
								onChange: (e) => setGv(e.target.value),
								className: "w-24"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									if (!num(gv)) return;
									s.addExpense({
										d: gdte,
										t: gt || "Gasto",
										c: gc,
										v: num(gv)
									});
									setGt("");
									setGv("");
								},
								children: "Anotar"
							})
						]
					}),
					g.map(([x, i]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between py-1 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							x.t,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: x.c
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [brl(x.v), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "ml-2 text-destructive",
							onClick: () => s.delExpense(i),
							children: "×"
						})] })]
					}, i))
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 font-display text-lg",
					children: "Entradas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ed",
							type: "date",
							defaultValue: todayISO(),
							className: "w-36"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "et",
							placeholder: "Origem",
							className: "w-40"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ev",
							placeholder: "Valor",
							className: "w-24"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								const d = document.getElementById("ed").value;
								const t = document.getElementById("et").value;
								const v = num(document.getElementById("ev").value);
								if (!v) return;
								s.addIncome({
									d,
									t: t || "Entrada",
									v
								});
							},
							children: "Anotar"
						})
					]
				}),
				en.map(([x, i]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between py-1 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: x.t }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [brl(x.v), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "ml-2 text-destructive",
						onClick: () => s.delIncome(i),
						children: "×"
					})] })]
				}, i)),
				a.rec[m] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between py-1 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pagamentos do estúdio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl(a.rec[m]) })]
				}) : null
			]
		}) })
	] });
}
function Dividas() {
	const s = useNara();
	const open = s.finance.div.filter((x) => !x.ok).reduce((a, x) => a + x.v, 0);
	const paid = s.finance.div.filter((x) => x.ok).reduce((a, x) => a + x.v, 0);
	const [n, setN] = (0, import_react.useState)("");
	const [v, setV] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 grid gap-3 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Em aberto",
				value: brl(open),
				tone: "bad"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Pagas",
				value: brl(paid),
				tone: "ok"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Dívida",
					value: n,
					onChange: (e) => setN(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Valor",
					value: v,
					onChange: (e) => setV(e.target.value),
					className: "w-28"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						s.addDivida({
							n: n || "Dívida",
							o: "",
							v: num(v),
							ok: 0,
							pago: 0,
							data: ""
						});
						setN("");
						setV("");
					},
					children: "Adicionar"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-1",
			children: s.finance.div.map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center justify-between rounded-lg bg-card px-3 py-2 text-sm shadow-card", x.ok && "opacity-60"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					x.n,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: x.o
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 tabular-nums",
					children: [
						brl(x.v),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: x.ok ? "ghost" : "secondary",
							onClick: () => {
								if (x.ok) s.patchDivida(i, {
									ok: 0,
									pago: 0,
									data: ""
								});
								else {
									const pago = prompt("Quanto pagou?", String(x.v));
									if (pago === null) return;
									s.patchDivida(i, {
										ok: 1,
										pago: num(pago),
										data: prompt("Data AAAA-MM-DD", todayISO()) || todayISO()
									});
								}
							},
							children: x.ok ? "Desfazer" : "Pagar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => s.delDivida(i),
							children: "×"
						})
					]
				})]
			}, i))
		})
	] });
}
var SplitComponent = DinheiroPage;
//#endregion
export { SplitComponent as component };
