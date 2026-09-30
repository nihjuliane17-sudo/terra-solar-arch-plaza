import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { emptyState } from "./defaults";
import { fromBackup, loadLegacy } from "./legacy";
import { refreshClientBRL, syncPayStatus } from "./derived";
import { uid } from "./utils";
import type {
  Client,
  ClientStage,
  CompanyTask,
  LooseTask,
  NaraState,
  Payment,
  TaskRef,
} from "./types";

type Actions = {
  hydrate: () => void;
  replaceAll: (s: NaraState) => void;
  importBackup: (raw: unknown) => void;
  exportBackup: () => NaraState;
  upsertClient: (c: Client) => void;
  deleteClient: (id: string) => void;
  setClientOrder: (ids: string[]) => void;
  setClientStage: (id: string, stage: ClientStage) => void;
  patchTask: (
    clientId: string,
    taskId: string,
    patch: Partial<Client["tasks"][number]>,
  ) => void;
  setTaskDate: (clientId: string, taskId: string, date: string) => void;
  toggleTaskDone: (clientId: string, taskId: string) => void;
  addLoose: (t: LooseTask) => void;
  patchLoose: (id: string, patch: Partial<LooseTask>) => void;
  deleteLoose: (id: string) => void;
  moveMany: (refs: TaskRef[], patch: { date?: string; startHour?: number; hours?: number }) => void;
  setDayNote: (iso: string, text: string) => void;
  setWeekNote: (iso: string, text: string) => void;
  addPayment: (p: Omit<Payment, "id">) => void;
  deletePayment: (id: string) => void;
  setTimesheetField: (
    iso: string,
    field: "e1" | "s1" | "e2" | "s2",
    value: string,
  ) => void;
  setJornada: (n: number) => void;
  addTsTask: (iso: string) => void;
  patchTsTask: (
    iso: string,
    i: number,
    patch: Partial<NaraState["timesheet"]["days"][string]["tasks"][number]>,
  ) => void;
  delTsTask: (iso: string, i: number) => void;
  setFlow: (key: string, item: string, on: boolean) => void;
  clearFlow: (key: string) => void;
  patchFinance: (patch: Partial<NaraState["finance"]>) => void;
  setFixo: (i: number, patch: Partial<NaraState["finance"]["fixos"][number]>) => void;
  addFixo: () => void;
  delFixo: (i: number) => void;
  setFxm: (key: string, patch: NaraState["finance"]["fxm"][string]) => void;
  addPlano: (item: NaraState["finance"]["plano"][number]) => void;
  patchPlano: (
    i: number,
    patch: Partial<NaraState["finance"]["plano"][number]>,
  ) => void;
  delPlano: (i: number) => void;
  addExpense: (e: NaraState["finance"]["g"][number]) => void;
  patchExpense: (i: number, patch: Partial<NaraState["finance"]["g"][number]>) => void;
  delExpense: (i: number) => void;
  addIncome: (e: NaraState["finance"]["ent"][number]) => void;
  patchIncome: (i: number, patch: Partial<NaraState["finance"]["ent"][number]>) => void;
  delIncome: (i: number) => void;
  addDivida: (d: NaraState["finance"]["div"][number]) => void;
  patchDivida: (i: number, patch: Partial<NaraState["finance"]["div"][number]>) => void;
  delDivida: (i: number) => void;
  setUsdRate: (n: number) => void;
  addLifeEvent: (e: NaraState["life"]["ev"][number]) => void;
  patchLifeEvent: (id: string, patch: Partial<NaraState["life"]["ev"][number]>) => void;
  delLifeEvent: (id: string) => void;
  upsertPage: (
    bag: "dia" | "sdia" | "est" | "cui" | "ide",
    page: NaraState["life"]["dia"][number],
  ) => void;
  patchPage: (
    bag: "dia" | "sdia" | "est" | "cui" | "ide",
    id: string,
    patch: Partial<NaraState["life"]["dia"][number]>,
  ) => void;
  delPage: (bag: "dia" | "sdia" | "est" | "cui" | "ide", id: string) => void;
  addFolder: (cat: "est" | "cui" | "ide", name: string) => void;
  renameFolder: (cat: "est" | "cui" | "ide", i: number, name: string) => void;
  delFolder: (cat: "est" | "cui" | "ide", i: number) => void;
  patchMember: (i: number, patch: Partial<NaraState["system"]["m"][number]>) => void;
  addFn: () => void;
  patchFn: (i: number, patch: Partial<NaraState["system"]["fn"][number]>) => void;
  delFn: (i: number) => void;
  setBoards: (b: NaraState["boards"]) => void;
  addCompanyTask: (t: CompanyTask) => void;
  patchCompanyTask: (id: string, patch: Partial<CompanyTask>) => void;
  delCompanyTask: (id: string) => void;
};

function ensureDay(s: NaraState, iso: string) {
  if (!s.timesheet.days[iso]) {
    s.timesheet.days[iso] = { e1: "", s1: "", e2: "", s2: "", tasks: [] };
  }
  return s.timesheet.days[iso];
}

function pageBag(s: NaraState, bag: "dia" | "sdia" | "est" | "cui" | "ide") {
  if (bag === "dia") return s.life.dia;
  if (bag === "sdia") return s.system.dia;
  return s.life[bag].n;
}

function lumiStorage() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return {
    getItem: (name: string) =>
      localStorage.getItem(name) ?? localStorage.getItem("nara-os"),
    setItem: (name: string, value: string) => localStorage.setItem(name, value),
    removeItem: (name: string) => localStorage.removeItem(name),
  };
}

export const useNara = create<NaraState & Actions>()(
  persist(
    (set, get) => ({
      ...emptyState(),
      hydrate: () => {
        const cur = get();
        if (cur.migratedLegacy) return;
        const legacy = loadLegacy();
        if (legacy) set({ ...legacy, migratedLegacy: true });
        else set({ migratedLegacy: true });
      },
      replaceAll: (s) => set({ ...emptyState(), ...s, migratedLegacy: true }),
      importBackup: (raw) => {
        if (!raw || typeof raw !== "object") return;
        set({ ...fromBackup(raw as Record<string, unknown>), migratedLegacy: true });
      },
      exportBackup: () => {
        const s = get();
        const {
          hydrate: _h,
          replaceAll: _r,
          importBackup: _i,
          exportBackup: _e,
          ...rest
        } = s;
        void _h;
        void _r;
        void _i;
        void _e;
        return rest as unknown as NaraState;
      },
      upsertClient: (c) =>
        set((s) => {
          const rate = s.finance.usdRate;
          const next = refreshClientBRL(c, rate);
          const i = s.clients.findIndex((x) => x.id === next.id);
          const clients =
            i >= 0
              ? s.clients.map((x, k) => (k === i ? next : x))
              : [...s.clients, next];
          const clientOrder = s.clientOrder.includes(next.id)
            ? s.clientOrder
            : [...s.clientOrder, next.id];
          return { clients, clientOrder };
        }),
      deleteClient: (id) =>
        set((s) => ({
          clients: s.clients.filter((c) => c.id !== id),
          clientOrder: s.clientOrder.filter((x) => x !== id),
        })),
      setClientOrder: (ids) => set({ clientOrder: ids }),
      setClientStage: (id, stage) =>
        set((s) => ({
          clients: s.clients.map((c) =>
            c.id === id ? { ...c, manualStage: stage } : c,
          ),
        })),
      patchTask: (clientId, taskId, patch) =>
        set((s) => ({
          clients: s.clients.map((c) => {
            if (c.id !== clientId) return c;
            const tasks = c.tasks.map((t) =>
              t.id === taskId ? { ...t, ...patch } : t,
            );
            return syncPayStatus({ ...c, tasks });
          }),
        })),
      setTaskDate: (clientId, taskId, date) =>
        get().patchTask(clientId, taskId, { date }),
      toggleTaskDone: (clientId, taskId) =>
        set((s) => ({
          clients: s.clients.map((c) => {
            if (c.id !== clientId) return c;
            const tasks = c.tasks.map((t) =>
              t.id === taskId ? { ...t, done: !t.done } : t,
            );
            return syncPayStatus({ ...c, tasks });
          }),
        })),
      addLoose: (t) => set((s) => ({ looseTasks: [...s.looseTasks, t] })),
      patchLoose: (id, patch) =>
        set((s) => ({
          looseTasks: s.looseTasks.map((t) =>
            t.id === id ? { ...t, ...patch } : t,
          ),
        })),
      deleteLoose: (id) =>
        set((s) => ({ looseTasks: s.looseTasks.filter((t) => t.id !== id) })),
      moveMany: (refs, patch) =>
        set((s) => {
          let clients = s.clients;
          let looseTasks = s.looseTasks;
          for (const r of refs) {
            if (r.loose) {
              looseTasks = looseTasks.map((t) =>
                t.id === r.taskId ? { ...t, ...patch } : t,
              );
            } else {
              clients = clients.map((c) => {
                if (c.id !== r.clientId) return c;
                const tasks = c.tasks.map((t) =>
                  t.id === r.taskId ? { ...t, ...patch } : t,
                );
                return syncPayStatus({ ...c, tasks });
              });
            }
          }
          return { clients, looseTasks };
        }),
      setDayNote: (iso, text) =>
        set((s) => ({ dayNotes: { ...s.dayNotes, [iso]: text } })),
      setWeekNote: (iso, text) =>
        set((s) => ({ weekNotes: { ...s.weekNotes, [iso]: text } })),
      addPayment: (p) =>
        set((s) => ({ payments: [...s.payments, { ...p, id: uid() }] })),
      deletePayment: (id) =>
        set((s) => ({ payments: s.payments.filter((p) => p.id !== id) })),
      setTimesheetField: (iso, field, value) =>
        set((s) => {
          const days = { ...s.timesheet.days };
          const d = { ...(days[iso] || { e1: "", s1: "", e2: "", s2: "", tasks: [] }) };
          d[field] = value;
          days[iso] = d;
          return { timesheet: { ...s.timesheet, days } };
        }),
      setJornada: (n) =>
        set((s) => ({ timesheet: { ...s.timesheet, jornada: n } })),
      addTsTask: (iso) =>
        set((s) => {
          const days = { ...s.timesheet.days };
          const d = { ...(days[iso] || { e1: "", s1: "", e2: "", s2: "", tasks: [] }) };
          d.tasks = [...(d.tasks || []), { n: "", s: "", h: "", o: "" }];
          days[iso] = d;
          return { timesheet: { ...s.timesheet, days } };
        }),
      patchTsTask: (iso, i, patch) =>
        set((s) => {
          const days = { ...s.timesheet.days };
          const d = { ...(days[iso] || ensureDay(s, iso)) };
          d.tasks = d.tasks.map((t, k) => (k === i ? { ...t, ...patch } : t));
          days[iso] = d;
          return { timesheet: { ...s.timesheet, days } };
        }),
      delTsTask: (iso, i) =>
        set((s) => {
          const days = { ...s.timesheet.days };
          const d = { ...(days[iso] || ensureDay(s, iso)) };
          d.tasks = d.tasks.filter((_, k) => k !== i);
          days[iso] = d;
          return { timesheet: { ...s.timesheet, days } };
        }),
      setFlow: (key, item, on) =>
        set((s) => ({
          flow: {
            ...s.flow,
            [key]: { ...(s.flow[key] || {}), [item]: on },
          },
        })),
      clearFlow: (key) =>
        set((s) => ({ flow: { ...s.flow, [key]: {} } })),
      patchFinance: (patch) =>
        set((s) => ({ finance: { ...s.finance, ...patch } })),
      setFixo: (i, patch) =>
        set((s) => ({
          finance: {
            ...s.finance,
            fixos: s.finance.fixos.map((x, k) => (k === i ? { ...x, ...patch } : x)),
          },
        })),
      addFixo: () =>
        set((s) => ({
          finance: {
            ...s.finance,
            fixos: [...s.finance.fixos, { n: "Novo", c: "", v: 0, o: "" }],
          },
        })),
      delFixo: (i) =>
        set((s) => ({
          finance: {
            ...s.finance,
            fixos: s.finance.fixos.filter((_, k) => k !== i),
          },
        })),
      setFxm: (key, patch) =>
        set((s) => ({
          finance: {
            ...s.finance,
            fxm: { ...s.finance.fxm, [key]: { ...(s.finance.fxm[key] || {}), ...patch } },
          },
        })),
      addPlano: (item) =>
        set((s) => ({ finance: { ...s.finance, plano: [...s.finance.plano, item] } })),
      patchPlano: (i, patch) =>
        set((s) => ({
          finance: {
            ...s.finance,
            plano: s.finance.plano.map((x, k) => (k === i ? { ...x, ...patch } : x)),
          },
        })),
      delPlano: (i) =>
        set((s) => ({
          finance: {
            ...s.finance,
            plano: s.finance.plano.filter((_, k) => k !== i),
          },
        })),
      addExpense: (e) =>
        set((s) => ({ finance: { ...s.finance, g: [...s.finance.g, e] } })),
      patchExpense: (i, patch) =>
        set((s) => ({
          finance: {
            ...s.finance,
            g: s.finance.g.map((x, k) => (k === i ? { ...x, ...patch } : x)),
          },
        })),
      delExpense: (i) =>
        set((s) => ({
          finance: { ...s.finance, g: s.finance.g.filter((_, k) => k !== i) },
        })),
      addIncome: (e) =>
        set((s) => ({ finance: { ...s.finance, ent: [...s.finance.ent, e] } })),
      patchIncome: (i, patch) =>
        set((s) => ({
          finance: {
            ...s.finance,
            ent: s.finance.ent.map((x, k) => (k === i ? { ...x, ...patch } : x)),
          },
        })),
      delIncome: (i) =>
        set((s) => ({
          finance: { ...s.finance, ent: s.finance.ent.filter((_, k) => k !== i) },
        })),
      addDivida: (d) =>
        set((s) => ({ finance: { ...s.finance, div: [...s.finance.div, d] } })),
      patchDivida: (i, patch) =>
        set((s) => ({
          finance: {
            ...s.finance,
            div: s.finance.div.map((x, k) => (k === i ? { ...x, ...patch } : x)),
          },
        })),
      delDivida: (i) =>
        set((s) => ({
          finance: { ...s.finance, div: s.finance.div.filter((_, k) => k !== i) },
        })),
      setUsdRate: (n) =>
        set((s) => ({
          finance: { ...s.finance, usdRate: n },
          clients: s.clients.map((c) => refreshClientBRL(c, n)),
        })),
      addLifeEvent: (e) => set((s) => ({ life: { ...s.life, ev: [...s.life.ev, e] } })),
      patchLifeEvent: (id, patch) =>
        set((s) => ({
          life: {
            ...s.life,
            ev: s.life.ev.map((x) => (x.id === id ? { ...x, ...patch } : x)),
          },
        })),
      delLifeEvent: (id) =>
        set((s) => ({
          life: { ...s.life, ev: s.life.ev.filter((x) => x.id !== id) },
        })),
      upsertPage: (bag, page) =>
        set((s) => {
          const list = pageBag(s, bag);
          const i = list.findIndex((x) => x.id === page.id);
          const next = i >= 0 ? list.map((x, k) => (k === i ? page : x)) : [...list, page];
          if (bag === "dia") return { life: { ...s.life, dia: next } };
          if (bag === "sdia") return { system: { ...s.system, dia: next } };
          return { life: { ...s.life, [bag]: { ...s.life[bag], n: next } } };
        }),
      patchPage: (bag, id, patch) =>
        set((s) => {
          const list = pageBag(s, bag).map((x) =>
            x.id === id ? { ...x, ...patch } : x,
          );
          if (bag === "dia") return { life: { ...s.life, dia: list } };
          if (bag === "sdia") return { system: { ...s.system, dia: list } };
          return { life: { ...s.life, [bag]: { ...s.life[bag], n: list } } };
        }),
      delPage: (bag, id) =>
        set((s) => {
          const list = pageBag(s, bag).filter((x) => x.id !== id);
          if (bag === "dia") return { life: { ...s.life, dia: list } };
          if (bag === "sdia") return { system: { ...s.system, dia: list } };
          return { life: { ...s.life, [bag]: { ...s.life[bag], n: list } } };
        }),
      addFolder: (cat, name) =>
        set((s) => ({
          life: { ...s.life, [cat]: { ...s.life[cat], f: [...s.life[cat].f, name] } },
        })),
      renameFolder: (cat, i, name) =>
        set((s) => {
          const old = s.life[cat].f[i];
          const f = s.life[cat].f.map((x, k) => (k === i ? name : x));
          const n = s.life[cat].n.map((p) => (p.f === old ? { ...p, f: name } : p));
          return { life: { ...s.life, [cat]: { f, n } } };
        }),
      delFolder: (cat, i) =>
        set((s) => {
          const name = s.life[cat].f[i];
          return {
            life: {
              ...s.life,
              [cat]: {
                f: s.life[cat].f.filter((_, k) => k !== i),
                n: s.life[cat].n.filter((p) => p.f !== name),
              },
            },
          };
        }),
      patchMember: (i, patch) =>
        set((s) => ({
          system: {
            ...s.system,
            m: s.system.m.map((x, k) => (k === i ? { ...x, ...patch } : x)),
          },
        })),
      addFn: () =>
        set((s) => ({
          system: {
            ...s.system,
            fn: [...s.system.fn, { f: "Nova função", w: "n", o: "" }],
          },
        })),
      patchFn: (i, patch) =>
        set((s) => ({
          system: {
            ...s.system,
            fn: s.system.fn.map((x, k) => (k === i ? { ...x, ...patch } : x)),
          },
        })),
      delFn: (i) =>
        set((s) => ({
          system: { ...s.system, fn: s.system.fn.filter((_, k) => k !== i) },
        })),
      setBoards: (b) => set({ boards: b }),
      addCompanyTask: (t) =>
        set((s) => ({ companyTasks: [...s.companyTasks, t] })),
      patchCompanyTask: (id, patch) =>
        set((s) => ({
          companyTasks: s.companyTasks.map((x) =>
            x.id === id ? { ...x, ...patch } : x,
          ),
        })),
      delCompanyTask: (id) =>
        set((s) => ({
          companyTasks: s.companyTasks.filter((x) => x.id !== id),
        })),
    }),
    {
      name: "lumi-os",
      storage: createJSONStorage(() => lumiStorage()),
      skipHydration: true,
      partialize: (s) => {
        const omit = new Set([
          "hydrate",
          "replaceAll",
          "importBackup",
          "exportBackup",
        ]);
        const out: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(s)) {
          if (typeof v === "function" || omit.has(k)) continue;
          out[k] = v;
        }
        return out as unknown as NaraState;
      },
    },
  ),
);
