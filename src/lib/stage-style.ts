import type { ClientStage } from "./types";

export function stageTone(stage: string): "default" | "primary" | "ok" | "warn" {
  if (stage === "Concluído") return "ok";
  if (stage === "Alteração") return "warn";
  if (stage === "Renderização" || stage === "Base") return "primary";
  return "default";
}

export function payTone(status: string): "ok" | "warn" | "bad" {
  if (status === "paid") return "ok";
  if (status === "half") return "warn";
  return "bad";
}

export function payLabel(status: string) {
  if (status === "paid") return "Pago";
  if (status === "half") return "Sinal";
  return "Em aberto";
}

export const STAGE_DOT: Record<string, string> = {
  "Não iniciado": "bg-muted-foreground/40",
  "Moodboard/Referências": "bg-muted-foreground",
  Esboços: "bg-primary/70",
  Base: "bg-primary",
  Renderização: "bg-ok",
  Alteração: "bg-warn",
  Concluído: "bg-ok",
  "Tarefa avulsa": "bg-foreground/50",
};

export function stageShort(s: ClientStage | string) {
  const map: Record<string, string> = {
    "Não iniciado": "Fila",
    "Moodboard/Referências": "Moodboard",
    Esboços: "Esboço",
    Base: "Base",
    Renderização: "Render",
    Alteração: "Alteração",
    Concluído: "Pronto",
    "Tarefa avulsa": "Avulsa",
  };
  return map[s] || s;
}
