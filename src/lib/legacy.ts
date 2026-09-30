import { emptyState } from "./defaults";
import type { NaraState } from "./types";

function parse(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loadLegacy(): Partial<NaraState> | null {
  if (typeof localStorage === "undefined") return null;
  const fin = parse("fin26") as Record<string, unknown> | null;
  const atelie = parse("atelie26") as Record<string, unknown> | null;
  const vida = parse("vida26") as Record<string, unknown> | null;
  const sis = parse("sis26") as Record<string, unknown> | null;
  const boards = parse("boards26") as { b?: NaraState["boards"] } | null;
  const emp = parse("emp26") as NaraState["companyTasks"] | null;
  if (!fin && !atelie && !vida && !sis && !boards && !emp) return null;

  const base = emptyState();
  const next: NaraState = { ...base, migratedLegacy: true };

  if (atelie && Array.isArray(atelie.clients)) {
    next.clients = atelie.clients as NaraState["clients"];
    next.clientOrder = next.clients.map((c) => c.id);
    next.weekNotes = (atelie.weekNotes as NaraState["weekNotes"]) || {};
    next.dayNotes = (atelie.dayNotes as NaraState["dayNotes"]) || {};
    next.payments = (atelie.payments as NaraState["payments"]) || [];
    next.looseTasks = (atelie.looseTasks as NaraState["looseTasks"]) || [];
    next.timesheet =
      (atelie.timesheet as NaraState["timesheet"]) || base.timesheet;
    next.flow = (atelie.flow as NaraState["flow"]) || {};
  }
  if (fin) {
    next.finance = {
      ...base.finance,
      renda: Number(fin.renda) || base.finance.renda,
      inc: (fin.inc as NaraState["finance"]["inc"]) || base.finance.inc,
      g: (fin.g as NaraState["finance"]["g"]) || [],
      ent: (fin.ent as NaraState["finance"]["ent"]) || [],
      fxm: (fin.fxm as NaraState["finance"]["fxm"]) || {},
      fixos: (fin.fixos as NaraState["finance"]["fixos"]) || base.finance.fixos,
      plano: (fin.plano as NaraState["finance"]["plano"]) || base.finance.plano,
      div: (fin.div as NaraState["finance"]["div"]) || base.finance.div,
    };
  }
  if (vida) next.life = { ...base.life, ...(vida as Partial<NaraState["life"]>) };
  if (sis) {
    next.system = {
      ...base.system,
      ...(sis as Partial<NaraState["system"]>),
    };
    next.system.m = (next.system.m || []).filter((m) =>
      ["y", "d", "n"].includes(m.id),
    ) as NaraState["system"]["m"];
  }
  if (boards?.b) next.boards = boards.b;
  if (Array.isArray(emp)) next.companyTasks = emp;
  return next;
}

export function fromBackup(o: Record<string, unknown>): NaraState {
  const base = emptyState();
  const atelie = (o.atelie || o.studio || o) as Record<string, unknown>;
  const fin = (o.fin || o.finance) as Record<string, unknown> | undefined;
  const next: NaraState = { ...base, migratedLegacy: true };

  if (atelie && Array.isArray(atelie.clients)) {
    next.clients = atelie.clients as NaraState["clients"];
    next.clientOrder = next.clients.map((c) => c.id);
    next.weekNotes = (atelie.weekNotes as NaraState["weekNotes"]) || {};
    next.dayNotes = (atelie.dayNotes as NaraState["dayNotes"]) || {};
    next.payments = (atelie.payments as NaraState["payments"]) || [];
    next.looseTasks = (atelie.looseTasks as NaraState["looseTasks"]) || [];
    next.timesheet =
      (atelie.timesheet as NaraState["timesheet"]) || base.timesheet;
    next.flow = (atelie.flow as NaraState["flow"]) || {};
  }
  if (Array.isArray(o.clients)) {
    next.clients = o.clients as NaraState["clients"];
    next.clientOrder = next.clients.map((c) => c.id);
  }
  if (fin && typeof fin === "object") {
    next.finance = { ...base.finance, ...(fin as Partial<NaraState["finance"]>) };
  }
  if (o.finance && typeof o.finance === "object" && !fin) {
    next.finance = {
      ...base.finance,
      ...(o.finance as Partial<NaraState["finance"]>),
    };
  }
  if (o.vida || o.life)
    next.life = {
      ...base.life,
      ...((o.vida || o.life) as Partial<NaraState["life"]>),
    };
  if (o.sis || o.system)
    next.system = {
      ...base.system,
      ...((o.sis || o.system) as Partial<NaraState["system"]>),
    };
  if (o.boards) {
    const b = o.boards as { b?: NaraState["boards"] } | NaraState["boards"];
    next.boards = Array.isArray(b) ? b : b.b || base.boards;
  }
  if (o.emp || o.companyTasks)
    next.companyTasks = (o.emp || o.companyTasks) as NaraState["companyTasks"];
  if (typeof o.migratedLegacy === "boolean") {
    /* nara native backup */
    return { ...base, ...(o as unknown as NaraState), migratedLegacy: true };
  }
  return next;
}
