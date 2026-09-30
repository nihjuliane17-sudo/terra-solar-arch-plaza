import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { B as useNara, C as cn, F as todayISO, R as uid, n as Button, r as COMPANY_TYPES } from "./store-BFPkgcXL.mjs";
import { a as Select, i as PageHeader, n as CardContent, r as Input, t as Card } from "./select-HWYz-cwW.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-D9NBhluL.mjs";
import { _ as ExternalLink, c as Receipt, f as MessageSquare, g as FileText, h as Gem, l as Plus, m as Globe, o as Sparkles, u as Pin, y as Camera } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mesa-Wlw1f1nl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONTRACT = {
	studio: "Estúdio Lumi",
	tag: "Arte digital por encomenda — atendimento internacional",
	number: "Contrato de trabalho nº 002 · regime interno",
	note: "Revisão — substitui o contrato nº 001",
	intro: "O presente contrato estabelece os termos de trabalho entre o Estúdio Lumi e sua colaboradora executora, regendo horários, condutas, processos de produção, prazos institucionais e benefícios aplicáveis ao exercício da função. As partes reconhecem os termos como vigentes a partir da data de assinatura, em substituição a qualquer versão anterior.",
	parties: [
		{
			role: "Gerência",
			name: "Yusuke Nakamura"
		},
		{
			role: "Gerência adjunta",
			name: "Dominic Narasaki"
		},
		{
			role: "Colaboradora executora",
			name: "Nicole"
		}
	],
	clauses: [
		{
			n: "01",
			title: "Jornada de trabalho",
			body: [
				"08h00–18h00 expediente regular. 18h00–21h00 janela de hora extra, quando necessária. Pausa breve às 10h00 (10 min). Almoço 12h00–13h00. Pausa de alimentação às 15h30.",
				"Tolerância máxima de atraso na entrada: 10 minutos.",
				"A hora extra é de livre definição da colaboradora dentro da janela. Em nenhuma hipótese o trabalho ultrapassa 21h00 — horário em que se inicia a rotina de encerramento do dia."
			]
		},
		{
			n: "02",
			title: "Benefício por hora extra",
			body: ["Se a hora extra for necessária para concluir a demanda do dia e não houver atraso na entrada, a colaboradora tem direito a um sushi semanal, ou a outro mimo negociado com a gerência.", "O benefício é perdido se o total de atrasos acumulados na semana ultrapassar 2 horas."]
		},
		{
			n: "03",
			title: "Conduta na sala de trabalho",
			body: [
				"Não se entra na sala, nem se senta para trabalhar, se o ambiente não estiver arrumado.",
				"Dois checkpoints diários por câmera — manhã e após o almoço.",
				"Desorganização pontual: advertência da gerência. Persistente: retomada de acompanhamento terapêutico em até um mês."
			]
		},
		{
			n: "04",
			title: "Prazo institucional e lista de mobília",
			body: [
				"Prazo crítico de 30 dias, com vencimento ao final de outubro, para consolidar a estruturação do lar/escritório. O não cumprimento implica o retorno à casa dos pais.",
				"Enquanto o horário de entrada for cumprido, os itens da lista estão garantidos. A cada hora de atraso na entrada, um item da lista é perdido — escolha da colaboradora.",
				"Itens perdidos não retornam. Só a gerência (Yusuke) altera a lista. Item perdido só pode ser adquirido após o encerramento do prazo de 30 dias."
			],
			warn: "Consequência real e ativa durante o período de estruturação."
		},
		{
			n: "05",
			title: "Gestão do tempo e das demandas",
			body: ["As tarefas demandam o tempo que demandam. Prioridades do dia são definidas junto com o gerente adjunto.", "Meta de conclusão diária: ao menos 80% das demandas previstas. No máximo 20% transfere para o dia seguinte."]
		},
		{
			n: "06",
			title: "Processo de produção",
			body: [
				"Todo trabalho é demanda comercial — nunca hobby. O processo é mecânico, previsível e replicável.",
				"6.1 Coleta de briefing: 2 minutos cronometrados.",
				"6.2 Organização do material em um único local.",
				"6.3 Esboço sem lapidação. Modelos 3D quando a pose não for trivial.",
				"6.4 Base obrigatoriamente em cor. Iluminação em camadas separadas.",
				"6.5 Renderização, majoritariamente com Dominic.",
				"6.6 Proibido permanecer mais de 10 minutos no mesmo ponto de foco."
			]
		},
		{
			n: "07",
			title: "Relatório diário e cronometragem",
			body: ["Cronometrar cada etapa sem pressão para reduzir o tempo — o objetivo é uma média real.", "Até o fim do expediente: entrada e saída, tempo por etapa, concluídas e pendentes. Registro no ponto."]
		},
		{
			n: "08",
			title: "Atendimento ao cliente",
			body: ["Durante o expediente, só quando necessário, nas janelas de meia hora antes do meio-dia e 17h30–18h00."]
		},
		{
			n: "09",
			title: "Folgas e transição de calendário",
			body: [
				"Na fase de estruturação, não há folgas de fim de semana.",
				"A partir de 15 de outubro, com demanda diária cumprida, folgas de fim de semana. A partir de 1º de novembro, definitivas.",
				"A pausa da medicação (lisdexanfetamina, 50mg) acompanha o calendário de folgas."
			]
		},
		{
			n: "10",
			title: "Afastamento justificado",
			body: ["Em dia de crise, a colaboradora apresenta justificativa elaborada por Dominic Narasaki. Só ele emite."],
			warn: "Ausência de justificativa formal resulta em advertência verbal da gerência."
		},
		{
			n: "11",
			title: "Remuneração e destinação da renda",
			body: ["Toda a renda pertence ao sistema. Nesta fase, 100% vai para estruturação do lar — dívidas, mobília e custo de vida até o fim de 2026.", "Concluída a fase: 25% para cada um dos três alters, 25% reserva coletiva. Cada alter decide o destino da sua parcela."]
		},
		{
			n: "12",
			title: "Revisão dos termos",
			body: ["Os termos podem ser revisados a cada 15 dias, conforme necessidade entre as partes."]
		}
	]
};
var ICONS = {
	Sparkles,
	MessageSquare,
	Gem,
	Receipt,
	Pin,
	Camera,
	Globe,
	FileText
};
function MesaPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Escritório",
		title: "Mesa",
		description: "Contrato, burocracia, tarefas da empresa e os atalhos do dia a dia."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "contrato",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "contrato",
					children: "Contrato"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "tarefas",
					children: "Tarefas"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
					value: "atalhos",
					children: "Atalhos"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "contrato",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contrato, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "tarefas",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tarefas, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "atalhos",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atalhos, {})
			})
		]
	})] });
}
function Contrato() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
						children: CONTRACT.tag
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-4xl",
						children: CONTRACT.studio
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: CONTRACT.number
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: CONTRACT.note
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-8 text-sm leading-relaxed text-muted-foreground",
				children: CONTRACT.intro
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-10 grid gap-3 sm:grid-cols-3",
				children: CONTRACT.parties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-card px-4 py-3 text-center shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: p.role
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-lg",
						children: p.name
					})]
				}, p.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-8",
				children: CONTRACT.clauses.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "mb-2 flex items-baseline gap-3 font-display text-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: c.n
						}), c.title]
					}),
					c.body.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm leading-relaxed",
						children: p
					}, p)),
					c.warn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 border-l-2 border-primary pl-3 text-sm text-primary",
						children: c.warn
					}) : null
				] }, c.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-12 grid gap-6 border-t border-border pt-6 text-center text-sm sm:grid-cols-3",
				children: CONTRACT.parties.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium",
					children: p.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-wider text-muted-foreground",
					children: p.role
				})] }, p.name))
			})
		]
	});
}
function Tarefas() {
	const s = useNara();
	const [filter, setFilter] = (0, import_react.useState)("p");
	const [t, setT] = (0, import_react.useState)("");
	const [k, setK] = (0, import_react.useState)(COMPANY_TYPES[0]);
	const [d, setD] = (0, import_react.useState)(todayISO());
	const list = [...s.companyTasks].filter((x) => filter === "a" || !x.done).sort((a, b) => (a.d || "9").localeCompare(b.d || "9"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "date",
					value: d,
					onChange: (e) => setD(e.target.value),
					className: "w-40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
					value: k,
					onChange: (e) => setK(e.target.value),
					className: "w-40",
					children: COMPANY_TYPES.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: x }, x))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "min-w-40 flex-1",
					placeholder: "Tarefa",
					value: t,
					onChange: (e) => setT(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						if (!t.trim()) return;
						s.addCompanyTask({
							id: uid(),
							d,
							k,
							t: t.trim(),
							done: 0
						});
						setT("");
					},
					children: "Adicionar"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: filter === "p" ? "secondary" : "ghost",
				onClick: () => setFilter("p"),
				children: "Pendentes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: filter === "a" ? "secondary" : "ghost",
				onClick: () => setFilter("a"),
				children: "Todas"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-1",
			children: list.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex items-center gap-3 rounded-lg bg-card px-3 py-2 text-sm shadow-card", !x.done && x.d && x.d < todayISO() && "ring-1 ring-destructive/40"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: !!x.done,
						onChange: (e) => s.patchCompanyTask(x.id, { done: e.target.checked ? 1 : 0 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						className: "h-8 w-36",
						value: x.d,
						onChange: (e) => s.patchCompanyTask(x.id, { d: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-28 text-xs text-muted-foreground",
						children: x.k
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "h-8 flex-1",
						value: x.t,
						onChange: (e) => s.patchCompanyTask(x.id, { t: e.target.value })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => s.delCompanyTask(x.id),
						children: "×"
					})
				]
			}, x.id))
		})
	] });
}
function Atalhos() {
	const s = useNara();
	const [edit, setEdit] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: edit ? "default" : "outline",
				onClick: () => setEdit(!edit),
				children: edit ? "Pronto" : "Editar"
			})
		}),
		s.boards.map((b, bi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-4 font-display text-2xl",
				children: b.n
			}), b.s.map((sec, si) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "p-5",
					children: [edit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						className: "mb-4 max-w-xs",
						value: sec.n,
						onChange: (e) => {
							const boards = s.boards.map((bb, i) => i !== bi ? bb : {
								...bb,
								s: bb.s.map((ss, j) => j === si ? {
									...ss,
									n: e.target.value
								} : ss)
							});
							s.setBoards(boards);
						}
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground",
						children: sec.n
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6",
						children: [sec.t.map((t, ti) => {
							const Icon = ICONS[t.i] || ExternalLink;
							const go = () => {
								if (edit) {
									setForm({
										bi,
										si,
										ti
									});
									return;
								}
								if (t.u) window.open(t.u, "_blank", "noopener");
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: go,
								className: "group flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-14 items-center justify-center rounded-xl bg-secondary text-foreground transition-transform group-hover:scale-105",
									children: t.img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: t.img,
										alt: "",
										className: "size-full rounded-xl object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "size-5",
										strokeWidth: 1.5
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-center text-xs",
									children: t.l
								})]
							}, ti);
						}), edit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex flex-col items-center gap-2",
							onClick: () => {
								const boards = structuredClone(s.boards);
								boards[bi].s[si].t.push({
									l: "Novo",
									u: "",
									i: "Globe"
								});
								s.setBoards(boards);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-14 items-center justify-center rounded-xl border border-dashed border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								children: "Novo"
							})]
						}) : null]
					})]
				})
			}, si))]
		}, b.id)),
		form ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileForm, {
			pos: form,
			onClose: () => setForm(null)
		}) : null
	] });
}
function TileForm({ pos, onClose }) {
	const s = useNara();
	const t = s.boards[pos.bi].s[pos.si].t[pos.ti];
	const [l, setL] = (0, import_react.useState)(t.l);
	const [u, setU] = (0, import_react.useState)(t.u);
	const [i, setI] = (0, import_react.useState)(t.i);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 flex items-center justify-center bg-foreground/30 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "w-full max-w-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 font-display text-xl",
					children: "Atalho"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: l,
							onChange: (e) => setL(e.target.value),
							placeholder: "Nome"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: u,
							onChange: (e) => setU(e.target.value),
							placeholder: "https://"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
							value: i,
							onChange: (e) => setI(e.target.value),
							children: Object.keys(ICONS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: k }, k))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-end gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									className: "text-destructive",
									onClick: () => {
										const boards = structuredClone(s.boards);
										boards[pos.bi].s[pos.si].t.splice(pos.ti, 1);
										s.setBoards(boards);
										onClose();
									},
									children: "Excluir"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: onClose,
									children: "Cancelar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										const boards = structuredClone(s.boards);
										let url = u.trim();
										if (url && !/^[a-z]+:/i.test(url)) url = "https://" + url;
										boards[pos.bi].s[pos.si].t[pos.ti] = {
											...t,
											l,
											u: url,
											i
										};
										s.setBoards(boards);
										onClose();
									},
									children: "Salvar"
								})
							]
						})
					]
				})]
			})
		})
	});
}
var SplitComponent = MesaPage;
//#endregion
export { SplitComponent as component };
