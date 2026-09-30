import type {
  Board,
  FinanceState,
  LifeState,
  Member,
  NaraState,
  SystemFn,
  SystemState,
} from "./types";
import { DEFAULT_USD_RATE } from "./constants";

const fixos: FinanceState["fixos"] = (
  [
    ["Aluguel", "Moradia", 1650],
    ["Comida", "Alimentação", 650],
    ["Gatos", "Gatos", 120],
    ["Gás", "Casa", 40],
    ["Luz", "Casa", 200],
    ["Internet", "Casa", 90],
    ["Parcela Rede", "Parcelas", 135],
    ["Rede móvel", "Celular", 35],
    ["Farmácia", "Saúde", 25],
    ["DASMEI", "Impostos", 90],
    ["Básico de limpeza", "Casa", 60],
    ["Venvanse 50mg", "Saúde", 180],
  ] as [string, string, number][]
).map(([n, c, v]) => ({ n, c, v, o: "" }));

const plano: FinanceState["plano"] = (
  [
    [1, "Eletro", "Geladeira", 2200],
    [1, "Eletro", "Cooktop", 360],
    [1, "Eletro", "Máquina de lavar", 2600],
    [1, "Móveis", "Cadeiras", 270],
    [1, "Móveis", "Mesa", 630],
    [1, "Cozinha", "Kit louça", 150],
    [1, "Cozinha", "Kit cozinha", 150],
    [1, "Quarto", "Base box", 660],
    [1, "Banheiro", "Lixeira", 100],
    [1, "Banheiro", "Varal", 70],
    [1, "Ateliê", "Escrivaninha", 200],
    [1, "Gatos", "Gatos (itens)", 200],
    [2, "Eletro", "Airfryer", 260],
    [2, "Eletro", "Liquidificador", 90],
    [2, "Eletro", "Ferro de passar", 80],
    [2, "Móveis", "Sofá", 1300],
    [2, "Cozinha", "Panela de pressão", 200],
    [2, "Quarto", "Cômoda", 700],
    [2, "Quarto", "Cortina / cobertores", 600],
    [2, "Quarto", "Lençol impermeável", 45],
    [2, "Banheiro", "Móvel de banheiro", 200],
    [2, "Banheiro", "Organizador", 60],
    [3, "Eletro", "TV", 2350],
    [3, "Eletro", "Forno", 900],
    [3, "Eletro", "Secador", 200],
    [3, "Móveis", "Rack", 500],
    [3, "Móveis", "Estante", 230],
    [3, "Móveis", "Poltrona", 250],
    [3, "Móveis", "Mesa de centro", 180],
    [3, "Móveis", "Sapateira", 160],
    [3, "Quarto", "Penteadeira", 500],
    [3, "Quarto", "Criado-mudo", 100],
    [3, "Quarto", "Saia de cama", 40],
    [3, "Quarto", "Abajur", 80],
    [3, "Quarto", "Mantinha", 50],
    [3, "Decoração", "Tapetes", 100],
    [3, "Decoração", "Tapete", 25],
    [3, "Decoração", "Tapetes (2º)", 120],
    [3, "Decoração", "Linho", 20],
    [3, "Outros", "Cesto de bambu", 70],
    [4, "Móveis", "Aparador", 300],
    [4, "Móveis", "Colmeia", 400],
    [4, "Decoração", "Decoração geral", 400],
    [4, "Decoração", "Vaso", 150],
    [4, "Decoração", "Plantinhas", 150],
    [4, "Decoração", "Prateleira iluminada", 150],
    [4, "Decoração", "Papel de parede", 150],
  ] as [number, string, string, number][]
).map(([p, t, n, v]) => ({ p, t, n, v, ok: 0, pago: 0, data: "", o: "" }));

const div: FinanceState["div"] = (
  [
    ["Aluguel", "", 210, 1],
    ["Psicóloga", "", 340, 1],
    ["Médico TDAH", "", 130, 1],
    ["Remédio", "", 40, 1],
    ["Internet", "Lovizz", 90, 1],
    ["Elen", "", 20, 1],
    ["Internet", "", 90, 1],
    ["Médico TDAH", "", 130, 1],
    ["Venvanse + farmácia", "", 180, 1],
    ["Psicóloga", "", 470, 1],
    ["Créditos", "Tim", 100, 1],
    ["Shopee", "", 50, 1],
    ["Luz agosto", "", 120, 1],
    ["Aluguel", "Setembro", 1975, 1],
    ["Montagem de móveis", "", 480, 1],
    ["Gabi", "", 70, 1],
    ["Pai julho", "", 930, 0],
    ["Pai agosto", "", 1065, 0],
    ["DASMEI", "Pendentes", 270, 0],
    ["Fatura PicPay", "", 3250, 0],
    ["Conta de energia atrasada", "", 200, 0],
    ["Exame de sangue", "", 240, 0],
    ["Contas de setembro", "Do plano antigo", 220, 0],
    ["Mami e papi", "Do plano antigo", 200, 0],
  ] as [string, string, number, number][]
).map(([n, o, v, ok]) => ({ n, o, v, ok, pago: ok ? v : 0, data: "" }));

export const defaultFinance = (): FinanceState => ({
  renda: 35000,
  usdRate: DEFAULT_USD_RATE,
  inc: { 1: 1, 2: 1, 3: 1, 4: 1 },
  g: [],
  ent: [],
  fxm: {},
  fixos,
  plano,
  div,
});

export const defaultMembers = (): Member[] => [
  {
    id: "y",
    n: "Yusuke Nakamura",
    r: "Gerência",
    d: "Gerência do Estúdio Lumi. Recebe o relatório diário e é o único que altera a lista de mobília.",
    f: "Gerência geral\nAltera a lista de compras\nRecebe o relatório diário",
    g: "",
  },
  {
    id: "d",
    n: "Dominic Narasaki",
    r: "Gerência adjunta",
    d: "Define as prioridades do dia junto com Nicole, cuida da renderização e emite as justificativas de afastamento.",
    f: "Renderização\nPrioridades do dia\nJustificativa de afastamento",
    g: "",
  },
  {
    id: "n",
    n: "Nicole",
    r: "Colaboradora executora",
    d: "Executa as demandas: briefing, esboço, base de cor e iluminação.",
    f: "Briefing\nEsboço\nBase e iluminação",
    g: "",
  },
];

export const defaultFns = (): SystemFn[] => [
  { f: "Renderização", w: "d", o: "" },
  { f: "Justificativa de afastamento", w: "d", o: "Só ele emite" },
  { f: "Alterar a lista de mobília", w: "y", o: "" },
  { f: "Prioridades e ordem do dia", w: "d", o: "Junto com Nicole" },
  { f: "Briefing, esboço e base", w: "n", o: "" },
];

export const defaultSystem = (): SystemState => ({
  m: defaultMembers(),
  fn: defaultFns(),
  dia: [],
});

export const defaultLife = (): LifeState => ({
  ev: [],
  dia: [],
  est: { f: ["Geral"], n: [] },
  cui: { f: ["Rituais"], n: [] },
  ide: { f: ["Soltas"], n: [] },
});

export const defaultBoards = (): Board[] => [
  {
    id: "emp",
    n: "Escritório",
    i: "Desk",
    s: [
      {
        n: "Assistentes",
        t: [
          { l: "Claude", u: "https://claude.ai", i: "Sparkles" },
          { l: "ChatGPT", u: "https://chatgpt.com", i: "MessageSquare" },
          { l: "Gemini", u: "https://gemini.google.com", i: "Gem" },
        ],
      },
      {
        n: "Burocrático",
        t: [{ l: "NFS-e (Portal do Contribuinte)", u: "", i: "Receipt" }],
      },
    ],
  },
  {
    id: "red",
    n: "Referência e redes",
    i: "Globe",
    s: [
      {
        n: "Boards",
        t: [{ l: "Pinterest", u: "https://pinterest.com", i: "Pin" }],
      },
      {
        n: "Redes",
        t: [{ l: "Instagram", u: "https://instagram.com", i: "Camera" }],
      },
      { n: "Sites", t: [] },
    ],
  },
];

export const emptyState = (): NaraState => ({
  migratedLegacy: false,
  clients: [],
  clientOrder: [],
  weekNotes: {},
  dayNotes: {},
  payments: [],
  looseTasks: [],
  timesheet: { jornada: 9, days: {} },
  flow: {},
  finance: defaultFinance(),
  life: defaultLife(),
  system: defaultSystem(),
  boards: defaultBoards(),
  companyTasks: [],
});
