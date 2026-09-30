export type PayStatus = "notpaid" | "half" | "paid";

export const STAGE_TYPES = [
  "Moodboard/Referências",
  "Esboços",
  "Base",
  "Renderização",
  "Alteração",
] as const;
export type StageType = (typeof STAGE_TYPES)[number];

export const CLIENT_STAGES = [
  "Não iniciado",
  ...STAGE_TYPES,
  "Concluído",
] as const;
export type ClientStage = (typeof CLIENT_STAGES)[number];

export interface ClientTask {
  id: string;
  type: string;
  hours: number;
  date: string;
  done: boolean;
  startHour?: number;
  notes?: string;
}

export interface EstimateItem {
  label: string;
  minutes: number;
}

export interface Client {
  id: string;
  name: string;
  socialPlatform: string;
  socialHandle: string;
  description: string;
  valueUSD: number;
  valueBRL: number;
  notion: string;
  priority: { like: number; profit: number; urgency: number };
  payment: { status: PayStatus; date: string };
  pagamentoIntegralNoRender: boolean;
  notes: string;
  tasks: ClientTask[];
  elementsEstimate: EstimateItem[];
  manualStage?: ClientStage;
}

export interface LooseTask {
  id: string;
  title: string;
  date: string;
  hours: number;
  done: boolean;
  startHour?: number;
  notes?: string;
}

export interface Payment {
  id: string;
  date: string;
  clientId: string;
  clientName: string;
  value: number;
  method: string;
  note: string;
}

export interface TimesheetTask {
  n: string;
  s: string;
  h: string;
  o: string;
}

export interface TimesheetDay {
  e1: string;
  s1: string;
  e2: string;
  s2: string;
  tasks: TimesheetTask[];
}

export interface Timesheet {
  jornada: number;
  days: Record<string, TimesheetDay>;
}

export interface Expense {
  d: string;
  t: string;
  c: string;
  v: number;
  o?: string;
}

export interface Income {
  d: string;
  t: string;
  v: number;
}

export interface Fixo {
  n: string;
  c: string;
  v: number;
  o?: string;
}

export interface PlanoItem {
  p: number;
  t: string;
  n: string;
  v: number;
  ok: number;
  pago: number;
  data: string;
  o?: string;
}

export interface Divida {
  n: string;
  o: string;
  v: number;
  ok: number;
  pago: number;
  data: string;
}

export interface MonthFixoOverride {
  v?: number | "";
  p?: number;
  o?: string;
}

export interface FinanceState {
  renda: number;
  usdRate: number;
  inc: Record<1 | 2 | 3 | 4, 0 | 1>;
  g: Expense[];
  ent: Income[];
  fxm: Record<string, MonthFixoOverride>;
  fixos: Fixo[];
  plano: PlanoItem[];
  div: Divida[];
}

export interface LifeEvent {
  id: string;
  d: string;
  t: string;
  c: string;
  tm: string;
  done: number;
}

export interface CollageItem {
  t: "img" | "lnk";
  s?: string;
  u?: string;
  l?: string;
  e?: string;
  host?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
}

export interface NotebookPage {
  id: string;
  f?: string;
  t?: string;
  txt: string;
  mood?: string;
  song?: string;
  it: CollageItem[];
}

export interface Catalog {
  f: string[];
  n: NotebookPage[];
}

export interface LifeState {
  ev: LifeEvent[];
  dia: NotebookPage[];
  est: Catalog;
  cui: Catalog;
  ide: Catalog;
}

export interface Member {
  id: "y" | "d" | "n";
  n: string;
  r: string;
  d: string;
  f: string;
  g: string;
}

export interface SystemFn {
  f: string;
  w: string;
  o: string;
}

export interface SystemState {
  m: Member[];
  fn: SystemFn[];
  dia: NotebookPage[];
}

export interface Shortcut {
  l: string;
  u: string;
  i: string;
  img?: string;
  sys?: string;
}

export interface BoardSection {
  n: string;
  t: Shortcut[];
}

export interface Board {
  id: string;
  n: string;
  i: string;
  s: BoardSection[];
}

export interface CompanyTask {
  id: string;
  d: string;
  k: string;
  t: string;
  done: number;
}

export interface NaraState {
  migratedLegacy: boolean;
  clients: Client[];
  clientOrder: string[];
  weekNotes: Record<string, string>;
  dayNotes: Record<string, string>;
  payments: Payment[];
  looseTasks: LooseTask[];
  timesheet: Timesheet;
  flow: Record<string, Record<string, boolean>>;
  finance: FinanceState;
  life: LifeState;
  system: SystemState;
  boards: Board[];
  companyTasks: CompanyTask[];
}

export type TaskRef = {
  taskId: string;
  clientId: string;
  loose: boolean;
};
