import type { ClientStage, StageType } from "./types";
export { CLIENT_STAGES } from "./types";

export const APP_NAME = "Lumi";
export const STUDIO_NAME = "Estúdio Lumi";
export const DEFAULT_USD_RATE = 4.5;

export const SOCIAL_PLATFORMS = [
  "Instagram",
  "Twitter/X",
  "TikTok",
  "Bluesky",
  "Discord",
  "Outro",
];

export const PAY_METHODS = [
  "Pix",
  "Cartão",
  "Dinheiro",
  "Transferência",
  "Outro",
];

export const FIXED_TASKS: StageType[] = [
  "Moodboard/Referências",
  "Esboços",
  "Base",
  "Renderização",
];

export const TS_STAGES = [
  "Coleta de briefing",
  "Organização",
  "Esboço",
  "Base de cor",
  "Iluminação",
  "Renderização",
  "Alteração",
  "Outro",
];

export const EXPENSE_CATS = [
  "Mercado e comida",
  "Casa e mobília",
  "Gatos",
  "Saúde",
  "Transporte",
  "Lazer",
  "Ateliê e trabalho",
  "Contas",
  "Outros",
];

export const SHOP_TIPOS = [
  "Eletro",
  "Móveis",
  "Cozinha",
  "Quarto",
  "Banheiro",
  "Decoração",
  "Gatos",
  "Ateliê",
  "Outros",
];

export const PRIORITY = {
  1: { label: "Essencial", hint: "o que a casa precisa agora" },
  2: { label: "Importante", hint: "entra se a renda aguentar" },
  3: { label: "Desejável", hint: "conforto, não urgência" },
  4: { label: "Depois", hint: "fica para o próximo ciclo" },
} as const;

export const LIFE_CATS = [
  "Cuidado pessoal",
  "Estudos",
  "Passeios",
  "Compromissos",
  "Consultas",
  "Outros",
];

export const MOODS = [
  { id: "sereno", label: "Sereno" },
  { id: "bem", label: "Bem" },
  { id: "foco", label: "Foco" },
  { id: "neutro", label: "Neutro" },
  { id: "cansada", label: "Cansada" },
  { id: "pesado", label: "Pesado" },
  { id: "distante", label: "Distante" },
  { id: "crise", label: "Crise" },
];

export const COMPANY_TYPES = [
  "Post",
  "Story",
  "Pagamento",
  "Imposto / Nota",
  "Outro",
];

export const PROCESS_STEPS: {
  n: string;
  title: string;
  clause: string;
  sub: string;
  items: string[];
}[] = [
  {
    n: "01",
    title: "Coleta de briefing",
    clause: "6.1",
    sub: "Dois minutos cronometrados, com música",
    items: [
      "Abrir a conversa do cliente",
      "Capturar prints, traduções e referências",
      "Cronômetro de 2 minutos + música",
      "Referência de elogios anteriores à vista",
    ],
  },
  {
    n: "02",
    title: "Organização do material",
    clause: "6.2",
    sub: "Um único local de trabalho",
    items: [
      "Reunir tudo em um só lugar (Notion, se preferir)",
      "Só começar o processo criativo depois disso",
    ],
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
      "Proporções resolvidas antes de lapidar",
    ],
  },
  {
    n: "04",
    title: "Base de cor e iluminação",
    clause: "6.4",
    sub: "Obrigatoriamente em cor",
    items: [
      "Base em cor — nunca em preto e branco",
      "Cores organizadas em cenário e personagem",
      "Iluminação em camadas separadas",
    ],
  },
  {
    n: "05",
    title: "Renderização",
    clause: "6.5",
    sub: "Etapa final e mais técnica",
    items: [
      "Renderizar (majoritariamente com Dominic)",
      "Marcar a renderização como concluída na agenda",
    ],
  },
  {
    n: "06",
    title: "Regra de foco",
    clause: "6.6",
    sub: "Vale durante o processo inteiro",
    items: [
      "Nunca mais de 10 minutos no mesmo ponto",
      "Alternar entre áreas e elementos",
      "Zoom só quando o detalhe realmente exigir",
    ],
  },
  {
    n: "07",
    title: "Cronometragem e relatório",
    clause: "7",
    sub: "Até o fim do expediente",
    items: [
      "Cronometrar o tempo de cada etapa, sem pressão",
      "Registrar no ponto",
      "Deixar claro o que ficou pendente",
    ],
  },
];

export function inferStage(doneTypes: string[], manual?: ClientStage): ClientStage {
  if (manual) return manual;
  if (doneTypes.includes("Renderização") && !doneTypes.includes("Alteração")) {
    return "Concluído";
  }
  const order: StageType[] = [
    "Alteração",
    "Renderização",
    "Base",
    "Esboços",
    "Moodboard/Referências",
  ];
  for (const s of order) {
    if (doneTypes.includes(s)) {
      if (s === "Alteração") return "Alteração";
      if (s === "Renderização") return "Concluído";
      if (s === "Base") return "Renderização";
      if (s === "Esboços") return "Base";
      return "Esboços";
    }
  }
  return "Não iniciado";
}

export const STUDIO_MONTHS = [
  { year: 2026, month: 6, label: "Julho" },
  { year: 2026, month: 7, label: "Agosto" },
  { year: 2026, month: 8, label: "Setembro" },
  { year: 2026, month: 9, label: "Outubro" },
  { year: 2026, month: 10, label: "Novembro" },
  { year: 2026, month: 11, label: "Dezembro" },
];
