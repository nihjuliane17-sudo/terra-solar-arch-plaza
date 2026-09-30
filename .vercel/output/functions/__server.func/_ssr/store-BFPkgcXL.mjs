import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { a as startOfWeek, i as endOfWeek, n as parseISO, o as addDays, r as format, t as ptBR } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-BFPkgcXL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
			outline: "border border-border bg-transparent hover:bg-secondary text-foreground",
			ghost: "hover:bg-secondary text-foreground",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			lg: "h-11 px-5",
			icon: "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
var APP_NAME = "Lumi";
var STUDIO_NAME = "Estúdio Lumi";
var DEFAULT_USD_RATE = 4.5;
var SOCIAL_PLATFORMS = [
	"Instagram",
	"Twitter/X",
	"TikTok",
	"Bluesky",
	"Discord",
	"Outro"
];
var FIXED_TASKS = [
	"Moodboard/Referências",
	"Esboços",
	"Base",
	"Renderização"
];
var TS_STAGES = [
	"Coleta de briefing",
	"Organização",
	"Esboço",
	"Base de cor",
	"Iluminação",
	"Renderização",
	"Alteração",
	"Outro"
];
var EXPENSE_CATS = [
	"Mercado e comida",
	"Casa e mobília",
	"Gatos",
	"Saúde",
	"Transporte",
	"Lazer",
	"Ateliê e trabalho",
	"Contas",
	"Outros"
];
var SHOP_TIPOS = [
	"Eletro",
	"Móveis",
	"Cozinha",
	"Quarto",
	"Banheiro",
	"Decoração",
	"Gatos",
	"Ateliê",
	"Outros"
];
var PRIORITY = {
	1: {
		label: "Essencial",
		hint: "o que a casa precisa agora"
	},
	2: {
		label: "Importante",
		hint: "entra se a renda aguentar"
	},
	3: {
		label: "Desejável",
		hint: "conforto, não urgência"
	},
	4: {
		label: "Depois",
		hint: "fica para o próximo ciclo"
	}
};
var LIFE_CATS = [
	"Cuidado pessoal",
	"Estudos",
	"Passeios",
	"Compromissos",
	"Consultas",
	"Outros"
];
var MOODS = [
	{
		id: "sereno",
		label: "Sereno"
	},
	{
		id: "bem",
		label: "Bem"
	},
	{
		id: "foco",
		label: "Foco"
	},
	{
		id: "neutro",
		label: "Neutro"
	},
	{
		id: "cansada",
		label: "Cansada"
	},
	{
		id: "pesado",
		label: "Pesado"
	},
	{
		id: "distante",
		label: "Distante"
	},
	{
		id: "crise",
		label: "Crise"
	}
];
var COMPANY_TYPES = [
	"Post",
	"Story",
	"Pagamento",
	"Imposto / Nota",
	"Outro"
];
var PROCESS_STEPS = [
	{
		n: "01",
		title: "Coleta de briefing",
		clause: "6.1",
		sub: "Dois minutos cronometrados, com música",
		items: [
			"Abrir a conversa do cliente",
			"Capturar prints, traduções e referências",
			"Cronômetro de 2 minutos + música",
			"Referência de elogios anteriores à vista"
		]
	},
	{
		n: "02",
		title: "Organização do material",
		clause: "6.2",
		sub: "Um único local de trabalho",
		items: ["Reunir tudo em um só lugar (Notion, se preferir)", "Só começar o processo criativo depois disso"]
	},
	{
		n: "03",
		title: "Esboço",
		clause: "6.3",
		sub: "Sem tempo fixo — e sem lapidar",
		items: [
			"Buscar referências adicionais se precisar",
			"Usar modelo 3D (Clip Studio) se a pose não for trivial",
			"Priorizar estrutura e proporção",
			"Não lapidar detalhes nesta etapa",
			"Proporções resolvidas antes de lapidar"
		]
	},
	{
		n: "04",
		title: "Base de cor e iluminação",
		clause: "6.4",
		sub: "Obrigatoriamente em cor",
		items: [
			"Base em cor — nunca em preto e branco",
			"Cores organizadas em cenário e personagem",
			"Iluminação em camadas separadas"
		]
	},
	{
		n: "05",
		title: "Renderização",
		clause: "6.5",
		sub: "Etapa final e mais técnica",
		items: ["Renderizar (majoritariamente com Dominic)", "Marcar a renderização como concluída na agenda"]
	},
	{
		n: "06",
		title: "Regra de foco",
		clause: "6.6",
		sub: "Vale durante o processo inteiro",
		items: [
			"Nunca mais de 10 minutos no mesmo ponto",
			"Alternar entre áreas e elementos",
			"Zoom só quando o detalhe realmente exigir"
		]
	},
	{
		n: "07",
		title: "Cronometragem e relatório",
		clause: "7",
		sub: "Até o fim do expediente",
		items: [
			"Cronometrar o tempo de cada etapa, sem pressão",
			"Registrar no ponto",
			"Deixar claro o que ficou pendente"
		]
	}
];
function inferStage(doneTypes, manual) {
	if (manual) return manual;
	if (doneTypes.includes("Renderização") && !doneTypes.includes("Alteração")) return "Concluído";
	for (const s of [
		"Alteração",
		"Renderização",
		"Base",
		"Esboços",
		"Moodboard/Referências"
	]) if (doneTypes.includes(s)) {
		if (s === "Alteração") return "Alteração";
		if (s === "Renderização") return "Concluído";
		if (s === "Base") return "Renderização";
		if (s === "Esboços") return "Base";
		return "Esboços";
	}
	return "Não iniciado";
}
var STUDIO_MONTHS = [
	{
		year: 2026,
		month: 6,
		label: "Julho"
	},
	{
		year: 2026,
		month: 7,
		label: "Agosto"
	},
	{
		year: 2026,
		month: 8,
		label: "Setembro"
	},
	{
		year: 2026,
		month: 9,
		label: "Outubro"
	},
	{
		year: 2026,
		month: 10,
		label: "Novembro"
	},
	{
		year: 2026,
		month: 11,
		label: "Dezembro"
	}
];
var fixos = [
	[
		"Aluguel",
		"Moradia",
		1650
	],
	[
		"Comida",
		"Alimentação",
		650
	],
	[
		"Gatos",
		"Gatos",
		120
	],
	[
		"Gás",
		"Casa",
		40
	],
	[
		"Luz",
		"Casa",
		200
	],
	[
		"Internet",
		"Casa",
		90
	],
	[
		"Parcela Rede",
		"Parcelas",
		135
	],
	[
		"Rede móvel",
		"Celular",
		35
	],
	[
		"Farmácia",
		"Saúde",
		25
	],
	[
		"DASMEI",
		"Impostos",
		90
	],
	[
		"Básico de limpeza",
		"Casa",
		60
	],
	[
		"Venvanse 50mg",
		"Saúde",
		180
	]
].map(([n, c, v]) => ({
	n,
	c,
	v,
	o: ""
}));
var plano = [
	[
		1,
		"Eletro",
		"Geladeira",
		2200
	],
	[
		1,
		"Eletro",
		"Cooktop",
		360
	],
	[
		1,
		"Eletro",
		"Máquina de lavar",
		2600
	],
	[
		1,
		"Móveis",
		"Cadeiras",
		270
	],
	[
		1,
		"Móveis",
		"Mesa",
		630
	],
	[
		1,
		"Cozinha",
		"Kit louça",
		150
	],
	[
		1,
		"Cozinha",
		"Kit cozinha",
		150
	],
	[
		1,
		"Quarto",
		"Base box",
		660
	],
	[
		1,
		"Banheiro",
		"Lixeira",
		100
	],
	[
		1,
		"Banheiro",
		"Varal",
		70
	],
	[
		1,
		"Ateliê",
		"Escrivaninha",
		200
	],
	[
		1,
		"Gatos",
		"Gatos (itens)",
		200
	],
	[
		2,
		"Eletro",
		"Airfryer",
		260
	],
	[
		2,
		"Eletro",
		"Liquidificador",
		90
	],
	[
		2,
		"Eletro",
		"Ferro de passar",
		80
	],
	[
		2,
		"Móveis",
		"Sofá",
		1300
	],
	[
		2,
		"Cozinha",
		"Panela de pressão",
		200
	],
	[
		2,
		"Quarto",
		"Cômoda",
		700
	],
	[
		2,
		"Quarto",
		"Cortina / cobertores",
		600
	],
	[
		2,
		"Quarto",
		"Lençol impermeável",
		45
	],
	[
		2,
		"Banheiro",
		"Móvel de banheiro",
		200
	],
	[
		2,
		"Banheiro",
		"Organizador",
		60
	],
	[
		3,
		"Eletro",
		"TV",
		2350
	],
	[
		3,
		"Eletro",
		"Forno",
		900
	],
	[
		3,
		"Eletro",
		"Secador",
		200
	],
	[
		3,
		"Móveis",
		"Rack",
		500
	],
	[
		3,
		"Móveis",
		"Estante",
		230
	],
	[
		3,
		"Móveis",
		"Poltrona",
		250
	],
	[
		3,
		"Móveis",
		"Mesa de centro",
		180
	],
	[
		3,
		"Móveis",
		"Sapateira",
		160
	],
	[
		3,
		"Quarto",
		"Penteadeira",
		500
	],
	[
		3,
		"Quarto",
		"Criado-mudo",
		100
	],
	[
		3,
		"Quarto",
		"Saia de cama",
		40
	],
	[
		3,
		"Quarto",
		"Abajur",
		80
	],
	[
		3,
		"Quarto",
		"Mantinha",
		50
	],
	[
		3,
		"Decoração",
		"Tapetes",
		100
	],
	[
		3,
		"Decoração",
		"Tapete",
		25
	],
	[
		3,
		"Decoração",
		"Tapetes (2º)",
		120
	],
	[
		3,
		"Decoração",
		"Linho",
		20
	],
	[
		3,
		"Outros",
		"Cesto de bambu",
		70
	],
	[
		4,
		"Móveis",
		"Aparador",
		300
	],
	[
		4,
		"Móveis",
		"Colmeia",
		400
	],
	[
		4,
		"Decoração",
		"Decoração geral",
		400
	],
	[
		4,
		"Decoração",
		"Vaso",
		150
	],
	[
		4,
		"Decoração",
		"Plantinhas",
		150
	],
	[
		4,
		"Decoração",
		"Prateleira iluminada",
		150
	],
	[
		4,
		"Decoração",
		"Papel de parede",
		150
	]
].map(([p, t, n, v]) => ({
	p,
	t,
	n,
	v,
	ok: 0,
	pago: 0,
	data: "",
	o: ""
}));
var div = [
	[
		"Aluguel",
		"",
		210,
		1
	],
	[
		"Psicóloga",
		"",
		340,
		1
	],
	[
		"Médico TDAH",
		"",
		130,
		1
	],
	[
		"Remédio",
		"",
		40,
		1
	],
	[
		"Internet",
		"Lovizz",
		90,
		1
	],
	[
		"Elen",
		"",
		20,
		1
	],
	[
		"Internet",
		"",
		90,
		1
	],
	[
		"Médico TDAH",
		"",
		130,
		1
	],
	[
		"Venvanse + farmácia",
		"",
		180,
		1
	],
	[
		"Psicóloga",
		"",
		470,
		1
	],
	[
		"Créditos",
		"Tim",
		100,
		1
	],
	[
		"Shopee",
		"",
		50,
		1
	],
	[
		"Luz agosto",
		"",
		120,
		1
	],
	[
		"Aluguel",
		"Setembro",
		1975,
		1
	],
	[
		"Montagem de móveis",
		"",
		480,
		1
	],
	[
		"Gabi",
		"",
		70,
		1
	],
	[
		"Pai julho",
		"",
		930,
		0
	],
	[
		"Pai agosto",
		"",
		1065,
		0
	],
	[
		"DASMEI",
		"Pendentes",
		270,
		0
	],
	[
		"Fatura PicPay",
		"",
		3250,
		0
	],
	[
		"Conta de energia atrasada",
		"",
		200,
		0
	],
	[
		"Exame de sangue",
		"",
		240,
		0
	],
	[
		"Contas de setembro",
		"Do plano antigo",
		220,
		0
	],
	[
		"Mami e papi",
		"Do plano antigo",
		200,
		0
	]
].map(([n, o, v, ok]) => ({
	n,
	o,
	v,
	ok,
	pago: ok ? v : 0,
	data: ""
}));
var defaultFinance = () => ({
	renda: 35e3,
	usdRate: DEFAULT_USD_RATE,
	inc: {
		1: 1,
		2: 1,
		3: 1,
		4: 1
	},
	g: [],
	ent: [],
	fxm: {},
	fixos,
	plano,
	div
});
var defaultMembers = () => [
	{
		id: "y",
		n: "Yusuke Nakamura",
		r: "Gerência",
		d: "Gerência do Estúdio Lumi. Recebe o relatório diário e é o único que altera a lista de mobília.",
		f: "Gerência geral\nAltera a lista de compras\nRecebe o relatório diário",
		g: ""
	},
	{
		id: "d",
		n: "Dominic Narasaki",
		r: "Gerência adjunta",
		d: "Define as prioridades do dia junto com Nicole, cuida da renderização e emite as justificativas de afastamento.",
		f: "Renderização\nPrioridades do dia\nJustificativa de afastamento",
		g: ""
	},
	{
		id: "n",
		n: "Nicole",
		r: "Colaboradora executora",
		d: "Executa as demandas: briefing, esboço, base de cor e iluminação.",
		f: "Briefing\nEsboço\nBase e iluminação",
		g: ""
	}
];
var defaultFns = () => [
	{
		f: "Renderização",
		w: "d",
		o: ""
	},
	{
		f: "Justificativa de afastamento",
		w: "d",
		o: "Só ele emite"
	},
	{
		f: "Alterar a lista de mobília",
		w: "y",
		o: ""
	},
	{
		f: "Prioridades e ordem do dia",
		w: "d",
		o: "Junto com Nicole"
	},
	{
		f: "Briefing, esboço e base",
		w: "n",
		o: ""
	}
];
var defaultSystem = () => ({
	m: defaultMembers(),
	fn: defaultFns(),
	dia: []
});
var defaultLife = () => ({
	ev: [],
	dia: [],
	est: {
		f: ["Geral"],
		n: []
	},
	cui: {
		f: ["Rituais"],
		n: []
	},
	ide: {
		f: ["Soltas"],
		n: []
	}
});
var defaultBoards = () => [{
	id: "emp",
	n: "Escritório",
	i: "Desk",
	s: [{
		n: "Assistentes",
		t: [
			{
				l: "Claude",
				u: "https://claude.ai",
				i: "Sparkles"
			},
			{
				l: "ChatGPT",
				u: "https://chatgpt.com",
				i: "MessageSquare"
			},
			{
				l: "Gemini",
				u: "https://gemini.google.com",
				i: "Gem"
			}
		]
	}, {
		n: "Burocrático",
		t: [{
			l: "NFS-e (Portal do Contribuinte)",
			u: "",
			i: "Receipt"
		}]
	}]
}, {
	id: "red",
	n: "Referência e redes",
	i: "Globe",
	s: [
		{
			n: "Boards",
			t: [{
				l: "Pinterest",
				u: "https://pinterest.com",
				i: "Pin"
			}]
		},
		{
			n: "Redes",
			t: [{
				l: "Instagram",
				u: "https://instagram.com",
				i: "Camera"
			}]
		},
		{
			n: "Sites",
			t: []
		}
	]
}];
var emptyState = () => ({
	migratedLegacy: false,
	clients: [],
	clientOrder: [],
	weekNotes: {},
	dayNotes: {},
	payments: [],
	looseTasks: [],
	timesheet: {
		jornada: 9,
		days: {}
	},
	flow: {},
	finance: defaultFinance(),
	life: defaultLife(),
	system: defaultSystem(),
	boards: defaultBoards(),
	companyTasks: []
});
function parse(key) {
	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function loadLegacy() {
	if (typeof localStorage === "undefined") return null;
	const fin = parse("fin26");
	const atelie = parse("atelie26");
	const vida = parse("vida26");
	const sis = parse("sis26");
	const boards = parse("boards26");
	const emp = parse("emp26");
	if (!fin && !atelie && !vida && !sis && !boards && !emp) return null;
	const base = emptyState();
	const next = {
		...base,
		migratedLegacy: true
	};
	if (atelie && Array.isArray(atelie.clients)) {
		next.clients = atelie.clients;
		next.clientOrder = next.clients.map((c) => c.id);
		next.weekNotes = atelie.weekNotes || {};
		next.dayNotes = atelie.dayNotes || {};
		next.payments = atelie.payments || [];
		next.looseTasks = atelie.looseTasks || [];
		next.timesheet = atelie.timesheet || base.timesheet;
		next.flow = atelie.flow || {};
	}
	if (fin) next.finance = {
		...base.finance,
		renda: Number(fin.renda) || base.finance.renda,
		inc: fin.inc || base.finance.inc,
		g: fin.g || [],
		ent: fin.ent || [],
		fxm: fin.fxm || {},
		fixos: fin.fixos || base.finance.fixos,
		plano: fin.plano || base.finance.plano,
		div: fin.div || base.finance.div
	};
	if (vida) next.life = {
		...base.life,
		...vida
	};
	if (sis) {
		next.system = {
			...base.system,
			...sis
		};
		next.system.m = (next.system.m || []).filter((m) => [
			"y",
			"d",
			"n"
		].includes(m.id));
	}
	if (boards?.b) next.boards = boards.b;
	if (Array.isArray(emp)) next.companyTasks = emp;
	return next;
}
function fromBackup(o) {
	const base = emptyState();
	const atelie = o.atelie || o.studio || o;
	const fin = o.fin || o.finance;
	const next = {
		...base,
		migratedLegacy: true
	};
	if (atelie && Array.isArray(atelie.clients)) {
		next.clients = atelie.clients;
		next.clientOrder = next.clients.map((c) => c.id);
		next.weekNotes = atelie.weekNotes || {};
		next.dayNotes = atelie.dayNotes || {};
		next.payments = atelie.payments || [];
		next.looseTasks = atelie.looseTasks || [];
		next.timesheet = atelie.timesheet || base.timesheet;
		next.flow = atelie.flow || {};
	}
	if (Array.isArray(o.clients)) {
		next.clients = o.clients;
		next.clientOrder = next.clients.map((c) => c.id);
	}
	if (fin && typeof fin === "object") next.finance = {
		...base.finance,
		...fin
	};
	if (o.finance && typeof o.finance === "object" && !fin) next.finance = {
		...base.finance,
		...o.finance
	};
	if (o.vida || o.life) next.life = {
		...base.life,
		...o.vida || o.life
	};
	if (o.sis || o.system) next.system = {
		...base.system,
		...o.sis || o.system
	};
	if (o.boards) {
		const b = o.boards;
		next.boards = Array.isArray(b) ? b : b.b || base.boards;
	}
	if (o.emp || o.companyTasks) next.companyTasks = o.emp || o.companyTasks;
	if (typeof o.migratedLegacy === "boolean") return {
		...base,
		...o,
		migratedLegacy: true
	};
	return next;
}
function brl(v) {
	return (v || 0).toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}
function usd(v) {
	return (v || 0).toLocaleString("en-US", {
		style: "currency",
		currency: "USD"
	});
}
function num(s) {
	if (typeof s === "number") return s;
	return parseFloat(String(s).replace(/\./g, "").replace(",", ".")) || 0;
}
function toBRL(usdValue, rate) {
	return Math.round((usdValue || 0) * rate * 100) / 100;
}
function pad2(n) {
	return String(n).padStart(2, "0");
}
function minutesToHM(m) {
	const sign = m < 0 ? "−" : "";
	const abs = Math.abs(Math.round(m));
	return `${sign}${Math.floor(abs / 60)}h${pad2(abs % 60)}`;
}
function parseDuration(v) {
	const s = String(v || "").trim().replace(",", ".");
	if (!s) return 0;
	if (s.includes(":")) {
		const [h, m] = s.split(":");
		return (Number(h) || 0) * 60 + (Number(m) || 0);
	}
	return Math.round((parseFloat(s) || 0) * 60);
}
function timeToMin(t) {
	if (!t) return null;
	return Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
}
function todayISO(d = /* @__PURE__ */ new Date()) {
	return format(d, "yyyy-MM-dd");
}
function parseDay(iso) {
	return parseISO(iso + "T12:00:00");
}
function formatBR(iso) {
	if (!iso) return "—";
	return format(parseDay(iso), "dd/MM/yyyy");
}
function formatLong(iso) {
	return format(parseDay(iso), "EEEE, d 'de' MMMM", { locale: ptBR });
}
function monthLabel(year, month) {
	return format(new Date(year, month, 1), "MMMM yyyy", { locale: ptBR });
}
function weekKey(iso) {
	return format(startOfWeek(parseDay(iso), { weekStartsOn: 0 }), "yyyy-MM-dd");
}
function weekRange(iso) {
	const s = startOfWeek(parseDay(iso), { weekStartsOn: 0 });
	const e = endOfWeek(parseDay(iso), { weekStartsOn: 0 });
	return {
		start: format(s, "yyyy-MM-dd"),
		end: format(e, "yyyy-MM-dd")
	};
}
function inMonth(iso, month) {
	return iso && +iso.slice(5, 7) === month;
}
function monthGrid(year, month) {
	const startWeekday = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const cells = [];
	for (let i = 0; i < startWeekday; i++) {
		const d = new Date(year, month, 1 - (startWeekday - i));
		cells.push({
			iso: format(d, "yyyy-MM-dd"),
			inMonth: false,
			date: d
		});
	}
	for (let day = 1; day <= daysInMonth; day++) {
		const d = new Date(year, month, day);
		cells.push({
			iso: format(d, "yyyy-MM-dd"),
			inMonth: true,
			date: d
		});
	}
	while (cells.length % 7 !== 0) {
		const last = cells[cells.length - 1].date;
		const d = addDays(last, 1);
		cells.push({
			iso: format(d, "yyyy-MM-dd"),
			inMonth: false,
			date: d
		});
	}
	const weeks = [];
	for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
	return weeks;
}
var WEEKDAYS = [
	"Dom",
	"Seg",
	"Ter",
	"Qua",
	"Qui",
	"Sex",
	"Sáb"
];
var MONTHS_PT = [
	"Janeiro",
	"Fevereiro",
	"Março",
	"Abril",
	"Maio",
	"Junho",
	"Julho",
	"Agosto",
	"Setembro",
	"Outubro",
	"Novembro",
	"Dezembro"
];
function clientStage(c) {
	return inferStage((c.tasks || []).filter((t) => t.done).map((t) => t.type), c.manualStage);
}
function clientProgress(c) {
	const total = (c.tasks || []).length;
	const done = (c.tasks || []).filter((t) => t.done).length;
	return {
		done,
		total,
		pct: total ? Math.round(done / total * 100) : 0
	};
}
function allTasks(s) {
	const out = [];
	s.clients.forEach((c) => {
		(c.tasks || []).forEach((t) => out.push({
			client: c,
			task: t
		}));
	});
	(s.looseTasks || []).forEach((lt) => {
		out.push({
			client: {
				id: "loose-" + lt.id,
				name: lt.title,
				isLoose: true
			},
			task: {
				id: lt.id,
				type: "Tarefa avulsa",
				hours: lt.hours || 0,
				done: !!lt.done,
				date: lt.date || "",
				startHour: lt.startHour
			},
			loose: lt
		});
	});
	return out;
}
function tasksOnDate(s, iso) {
	return allTasks(s).filter((x) => x.task.date === iso);
}
function forecastForTask(c, t) {
	const full = c.valueBRL || 0;
	if (c.pagamentoIntegralNoRender) return t.type === "Renderização" ? full : 0;
	if (t.type === "Esboços" || t.type === "Renderização") return full / 2;
	return 0;
}
function atelierForecast(s) {
	const rec = {
		10: 0,
		11: 0,
		12: 0
	};
	const prev = {
		10: 0,
		11: 0,
		12: 0
	};
	let tot = 0;
	s.clients.forEach((c) => {
		const f = c.valueBRL || 0;
		(c.tasks || []).forEach((t) => {
			if (!t.date || !t.date.startsWith("2026")) return;
			const v = forecastForTask({
				...c,
				valueBRL: f
			}, t);
			const m = +t.date.slice(5, 7);
			if (m in prev && m > 9) {
				prev[m] += v;
				tot += v;
			}
		});
	});
	s.payments.forEach((p) => {
		const m = +String(p.date).slice(5, 7);
		if (String(p.date).startsWith("2026") && m > 9) rec[m] += +p.value || 0;
	});
	return {
		prev,
		rec,
		tot
	};
}
function syncPayStatus(c) {
	const types = (c.tasks || []).filter((t) => t.done).map((t) => t.type);
	let status = c.payment.status;
	if (types.includes("Renderização")) status = "paid";
	else if (types.includes("Esboços") && !c.pagamentoIntegralNoRender) status = "half";
	return {
		...c,
		payment: {
			...c.payment,
			status
		}
	};
}
function workedMinutes(d) {
	const a = timeToMin(d.e1);
	const b = timeToMin(d.s1);
	const c = timeToMin(d.e2);
	const e = timeToMin(d.s2);
	let w = 0;
	if (a != null && b != null && b > a) w += b - a;
	else if (a != null && b == null && c == null && e != null && e > a) w += e - a;
	if (c != null && e != null && e > c) w += e - c;
	return w;
}
function isTimesheetOff(iso) {
	const w = (/* @__PURE__ */ new Date(iso + "T12:00:00")).getDay();
	return (w === 0 || w === 6) && iso >= "2026-10-15";
}
function tsTotals(s, iso) {
	const d = s.timesheet.days[iso];
	if (!d) return {
		w: 0,
		x: 0,
		t: 0,
		late: 0
	};
	const w = workedMinutes(d);
	const jor = isTimesheetOff(iso) ? 0 : s.timesheet.jornada * 60;
	const e1 = timeToMin(d.e1);
	return {
		w,
		x: Math.max(0, w - jor),
		t: (d.tasks || []).reduce((a, t) => a + parseDuration(t.h), 0),
		late: e1 != null && !isTimesheetOff(iso) ? Math.max(0, e1 - 480) : 0
	};
}
function tsWeekLate(s, iso) {
	const { start } = weekRange(iso);
	let late = 0;
	for (let i = 0; i < 7; i++) {
		const dt = /* @__PURE__ */ new Date(start + "T12:00:00");
		dt.setDate(dt.getDate() + i);
		const k = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
		late += tsTotals(s, k).late;
	}
	return late;
}
function refreshClientBRL(c, rate) {
	return {
		...c,
		valueBRL: toBRL(c.valueUSD || 0, rate)
	};
}
function orderedClients(s) {
	const map = new Map(s.clients.map((c) => [c.id, c]));
	const ordered = [];
	(s.clientOrder.length ? s.clientOrder : s.clients.map((c) => c.id)).forEach((id) => {
		const c = map.get(id);
		if (c) ordered.push(c);
	});
	s.clients.forEach((c) => {
		if (!ordered.includes(c)) ordered.push(c);
	});
	return ordered;
}
function sum(arr) {
	if (!arr.length) return 0;
	if (typeof arr[0] === "number") return arr.reduce((a, b) => a + b, 0);
	return arr.reduce((a, b) => a + (b.v || 0), 0);
}
function financePulse(s) {
	const fx = sum(s.finance.fixos) * 3;
	const dv = s.finance.div.filter((x) => !x.ok).reduce((a, x) => a + x.v, 0);
	const fal = (p) => s.finance.plano.filter((x) => x.p === p && !x.ok).reduce((a, x) => a + x.v, 0);
	const pl = [
		1,
		2,
		3,
		4
	].reduce((a, p) => a + (s.finance.inc[p] ? fal(p) : 0), 0);
	const tot = fx + dv + pl;
	return {
		fx,
		dv,
		pl,
		tot,
		sob: s.finance.renda - tot,
		fal
	};
}
function ensureDay(s, iso) {
	if (!s.timesheet.days[iso]) s.timesheet.days[iso] = {
		e1: "",
		s1: "",
		e2: "",
		s2: "",
		tasks: []
	};
	return s.timesheet.days[iso];
}
function pageBag(s, bag) {
	if (bag === "dia") return s.life.dia;
	if (bag === "sdia") return s.system.dia;
	return s.life[bag].n;
}
function lumiStorage() {
	if (typeof window === "undefined") return {
		getItem: () => null,
		setItem: () => {},
		removeItem: () => {}
	};
	return {
		getItem: (name) => localStorage.getItem(name) ?? localStorage.getItem("nara-os"),
		setItem: (name, value) => localStorage.setItem(name, value),
		removeItem: (name) => localStorage.removeItem(name)
	};
}
var useNara = create()(persist((set, get) => ({
	...emptyState(),
	hydrate: () => {
		if (get().migratedLegacy) return;
		const legacy = loadLegacy();
		if (legacy) set({
			...legacy,
			migratedLegacy: true
		});
		else set({ migratedLegacy: true });
	},
	replaceAll: (s) => set({
		...emptyState(),
		...s,
		migratedLegacy: true
	}),
	importBackup: (raw) => {
		if (!raw || typeof raw !== "object") return;
		set({
			...fromBackup(raw),
			migratedLegacy: true
		});
	},
	exportBackup: () => {
		const { hydrate: _h, replaceAll: _r, importBackup: _i, exportBackup: _e, ...rest } = get();
		return rest;
	},
	upsertClient: (c) => set((s) => {
		const rate = s.finance.usdRate;
		const next = refreshClientBRL(c, rate);
		const i = s.clients.findIndex((x) => x.id === next.id);
		return {
			clients: i >= 0 ? s.clients.map((x, k) => k === i ? next : x) : [...s.clients, next],
			clientOrder: s.clientOrder.includes(next.id) ? s.clientOrder : [...s.clientOrder, next.id]
		};
	}),
	deleteClient: (id) => set((s) => ({
		clients: s.clients.filter((c) => c.id !== id),
		clientOrder: s.clientOrder.filter((x) => x !== id)
	})),
	setClientOrder: (ids) => set({ clientOrder: ids }),
	setClientStage: (id, stage) => set((s) => ({ clients: s.clients.map((c) => c.id === id ? {
		...c,
		manualStage: stage
	} : c) })),
	patchTask: (clientId, taskId, patch) => set((s) => ({ clients: s.clients.map((c) => {
		if (c.id !== clientId) return c;
		const tasks = c.tasks.map((t) => t.id === taskId ? {
			...t,
			...patch
		} : t);
		return syncPayStatus({
			...c,
			tasks
		});
	}) })),
	setTaskDate: (clientId, taskId, date) => get().patchTask(clientId, taskId, { date }),
	toggleTaskDone: (clientId, taskId) => set((s) => ({ clients: s.clients.map((c) => {
		if (c.id !== clientId) return c;
		const tasks = c.tasks.map((t) => t.id === taskId ? {
			...t,
			done: !t.done
		} : t);
		return syncPayStatus({
			...c,
			tasks
		});
	}) })),
	addLoose: (t) => set((s) => ({ looseTasks: [...s.looseTasks, t] })),
	patchLoose: (id, patch) => set((s) => ({ looseTasks: s.looseTasks.map((t) => t.id === id ? {
		...t,
		...patch
	} : t) })),
	deleteLoose: (id) => set((s) => ({ looseTasks: s.looseTasks.filter((t) => t.id !== id) })),
	moveMany: (refs, patch) => set((s) => {
		let clients = s.clients;
		let looseTasks = s.looseTasks;
		for (const r of refs) if (r.loose) looseTasks = looseTasks.map((t) => t.id === r.taskId ? {
			...t,
			...patch
		} : t);
		else clients = clients.map((c) => {
			if (c.id !== r.clientId) return c;
			const tasks = c.tasks.map((t) => t.id === r.taskId ? {
				...t,
				...patch
			} : t);
			return syncPayStatus({
				...c,
				tasks
			});
		});
		return {
			clients,
			looseTasks
		};
	}),
	setDayNote: (iso, text) => set((s) => ({ dayNotes: {
		...s.dayNotes,
		[iso]: text
	} })),
	setWeekNote: (iso, text) => set((s) => ({ weekNotes: {
		...s.weekNotes,
		[iso]: text
	} })),
	addPayment: (p) => set((s) => ({ payments: [...s.payments, {
		...p,
		id: uid()
	}] })),
	deletePayment: (id) => set((s) => ({ payments: s.payments.filter((p) => p.id !== id) })),
	setTimesheetField: (iso, field, value) => set((s) => {
		const days = { ...s.timesheet.days };
		const d = { ...days[iso] || {
			e1: "",
			s1: "",
			e2: "",
			s2: "",
			tasks: []
		} };
		d[field] = value;
		days[iso] = d;
		return { timesheet: {
			...s.timesheet,
			days
		} };
	}),
	setJornada: (n) => set((s) => ({ timesheet: {
		...s.timesheet,
		jornada: n
	} })),
	addTsTask: (iso) => set((s) => {
		const days = { ...s.timesheet.days };
		const d = { ...days[iso] || {
			e1: "",
			s1: "",
			e2: "",
			s2: "",
			tasks: []
		} };
		d.tasks = [...d.tasks || [], {
			n: "",
			s: "",
			h: "",
			o: ""
		}];
		days[iso] = d;
		return { timesheet: {
			...s.timesheet,
			days
		} };
	}),
	patchTsTask: (iso, i, patch) => set((s) => {
		const days = { ...s.timesheet.days };
		const d = { ...days[iso] || ensureDay(s, iso) };
		d.tasks = d.tasks.map((t, k) => k === i ? {
			...t,
			...patch
		} : t);
		days[iso] = d;
		return { timesheet: {
			...s.timesheet,
			days
		} };
	}),
	delTsTask: (iso, i) => set((s) => {
		const days = { ...s.timesheet.days };
		const d = { ...days[iso] || ensureDay(s, iso) };
		d.tasks = d.tasks.filter((_, k) => k !== i);
		days[iso] = d;
		return { timesheet: {
			...s.timesheet,
			days
		} };
	}),
	setFlow: (key, item, on) => set((s) => ({ flow: {
		...s.flow,
		[key]: {
			...s.flow[key] || {},
			[item]: on
		}
	} })),
	clearFlow: (key) => set((s) => ({ flow: {
		...s.flow,
		[key]: {}
	} })),
	patchFinance: (patch) => set((s) => ({ finance: {
		...s.finance,
		...patch
	} })),
	setFixo: (i, patch) => set((s) => ({ finance: {
		...s.finance,
		fixos: s.finance.fixos.map((x, k) => k === i ? {
			...x,
			...patch
		} : x)
	} })),
	addFixo: () => set((s) => ({ finance: {
		...s.finance,
		fixos: [...s.finance.fixos, {
			n: "Novo",
			c: "",
			v: 0,
			o: ""
		}]
	} })),
	delFixo: (i) => set((s) => ({ finance: {
		...s.finance,
		fixos: s.finance.fixos.filter((_, k) => k !== i)
	} })),
	setFxm: (key, patch) => set((s) => ({ finance: {
		...s.finance,
		fxm: {
			...s.finance.fxm,
			[key]: {
				...s.finance.fxm[key] || {},
				...patch
			}
		}
	} })),
	addPlano: (item) => set((s) => ({ finance: {
		...s.finance,
		plano: [...s.finance.plano, item]
	} })),
	patchPlano: (i, patch) => set((s) => ({ finance: {
		...s.finance,
		plano: s.finance.plano.map((x, k) => k === i ? {
			...x,
			...patch
		} : x)
	} })),
	delPlano: (i) => set((s) => ({ finance: {
		...s.finance,
		plano: s.finance.plano.filter((_, k) => k !== i)
	} })),
	addExpense: (e) => set((s) => ({ finance: {
		...s.finance,
		g: [...s.finance.g, e]
	} })),
	patchExpense: (i, patch) => set((s) => ({ finance: {
		...s.finance,
		g: s.finance.g.map((x, k) => k === i ? {
			...x,
			...patch
		} : x)
	} })),
	delExpense: (i) => set((s) => ({ finance: {
		...s.finance,
		g: s.finance.g.filter((_, k) => k !== i)
	} })),
	addIncome: (e) => set((s) => ({ finance: {
		...s.finance,
		ent: [...s.finance.ent, e]
	} })),
	patchIncome: (i, patch) => set((s) => ({ finance: {
		...s.finance,
		ent: s.finance.ent.map((x, k) => k === i ? {
			...x,
			...patch
		} : x)
	} })),
	delIncome: (i) => set((s) => ({ finance: {
		...s.finance,
		ent: s.finance.ent.filter((_, k) => k !== i)
	} })),
	addDivida: (d) => set((s) => ({ finance: {
		...s.finance,
		div: [...s.finance.div, d]
	} })),
	patchDivida: (i, patch) => set((s) => ({ finance: {
		...s.finance,
		div: s.finance.div.map((x, k) => k === i ? {
			...x,
			...patch
		} : x)
	} })),
	delDivida: (i) => set((s) => ({ finance: {
		...s.finance,
		div: s.finance.div.filter((_, k) => k !== i)
	} })),
	setUsdRate: (n) => set((s) => ({
		finance: {
			...s.finance,
			usdRate: n
		},
		clients: s.clients.map((c) => refreshClientBRL(c, n))
	})),
	addLifeEvent: (e) => set((s) => ({ life: {
		...s.life,
		ev: [...s.life.ev, e]
	} })),
	patchLifeEvent: (id, patch) => set((s) => ({ life: {
		...s.life,
		ev: s.life.ev.map((x) => x.id === id ? {
			...x,
			...patch
		} : x)
	} })),
	delLifeEvent: (id) => set((s) => ({ life: {
		...s.life,
		ev: s.life.ev.filter((x) => x.id !== id)
	} })),
	upsertPage: (bag, page) => set((s) => {
		const list = pageBag(s, bag);
		const i = list.findIndex((x) => x.id === page.id);
		const next = i >= 0 ? list.map((x, k) => k === i ? page : x) : [...list, page];
		if (bag === "dia") return { life: {
			...s.life,
			dia: next
		} };
		if (bag === "sdia") return { system: {
			...s.system,
			dia: next
		} };
		return { life: {
			...s.life,
			[bag]: {
				...s.life[bag],
				n: next
			}
		} };
	}),
	patchPage: (bag, id, patch) => set((s) => {
		const list = pageBag(s, bag).map((x) => x.id === id ? {
			...x,
			...patch
		} : x);
		if (bag === "dia") return { life: {
			...s.life,
			dia: list
		} };
		if (bag === "sdia") return { system: {
			...s.system,
			dia: list
		} };
		return { life: {
			...s.life,
			[bag]: {
				...s.life[bag],
				n: list
			}
		} };
	}),
	delPage: (bag, id) => set((s) => {
		const list = pageBag(s, bag).filter((x) => x.id !== id);
		if (bag === "dia") return { life: {
			...s.life,
			dia: list
		} };
		if (bag === "sdia") return { system: {
			...s.system,
			dia: list
		} };
		return { life: {
			...s.life,
			[bag]: {
				...s.life[bag],
				n: list
			}
		} };
	}),
	addFolder: (cat, name) => set((s) => ({ life: {
		...s.life,
		[cat]: {
			...s.life[cat],
			f: [...s.life[cat].f, name]
		}
	} })),
	renameFolder: (cat, i, name) => set((s) => {
		const old = s.life[cat].f[i];
		const f = s.life[cat].f.map((x, k) => k === i ? name : x);
		const n = s.life[cat].n.map((p) => p.f === old ? {
			...p,
			f: name
		} : p);
		return { life: {
			...s.life,
			[cat]: {
				f,
				n
			}
		} };
	}),
	delFolder: (cat, i) => set((s) => {
		const name = s.life[cat].f[i];
		return { life: {
			...s.life,
			[cat]: {
				f: s.life[cat].f.filter((_, k) => k !== i),
				n: s.life[cat].n.filter((p) => p.f !== name)
			}
		} };
	}),
	patchMember: (i, patch) => set((s) => ({ system: {
		...s.system,
		m: s.system.m.map((x, k) => k === i ? {
			...x,
			...patch
		} : x)
	} })),
	addFn: () => set((s) => ({ system: {
		...s.system,
		fn: [...s.system.fn, {
			f: "Nova função",
			w: "n",
			o: ""
		}]
	} })),
	patchFn: (i, patch) => set((s) => ({ system: {
		...s.system,
		fn: s.system.fn.map((x, k) => k === i ? {
			...x,
			...patch
		} : x)
	} })),
	delFn: (i) => set((s) => ({ system: {
		...s.system,
		fn: s.system.fn.filter((_, k) => k !== i)
	} })),
	setBoards: (b) => set({ boards: b }),
	addCompanyTask: (t) => set((s) => ({ companyTasks: [...s.companyTasks, t] })),
	patchCompanyTask: (id, patch) => set((s) => ({ companyTasks: s.companyTasks.map((x) => x.id === id ? {
		...x,
		...patch
	} : x) })),
	delCompanyTask: (id) => set((s) => ({ companyTasks: s.companyTasks.filter((x) => x.id !== id) }))
}), {
	name: "lumi-os",
	storage: createJSONStorage(() => lumiStorage()),
	skipHydration: true,
	partialize: (s) => {
		const omit = /* @__PURE__ */ new Set([
			"hydrate",
			"replaceAll",
			"importBackup",
			"exportBackup"
		]);
		const out = {};
		for (const [k, v] of Object.entries(s)) {
			if (typeof v === "function" || omit.has(k)) continue;
			out[k] = v;
		}
		return out;
	}
}));
//#endregion
export { monthGrid as A, useNara as B, cn as C, formatLong as D, formatBR as E, todayISO as F, tsTotals as I, tsWeekLate as L, num as M, orderedClients as N, inMonth as O, tasksOnDate as P, uid as R, clientStage as S, forecastForTask as T, weekKey as V, allTasks as _, FIXED_TASKS as a, clamp as b, MOODS as c, SHOP_TIPOS as d, SOCIAL_PLATFORMS as f, WEEKDAYS as g, TS_STAGES as h, EXPENSE_CATS as i, monthLabel as j, minutesToHM as k, PRIORITY as l, STUDIO_NAME as m, Button as n, LIFE_CATS as o, STUDIO_MONTHS as p, COMPANY_TYPES as r, MONTHS_PT as s, APP_NAME as t, PROCESS_STEPS as u, atelierForecast as v, financePulse as w, clientProgress as x, brl as y, usd as z };
