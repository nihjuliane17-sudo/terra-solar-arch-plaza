import { createFileRoute } from "@tanstack/react-router";
import { TrabalhoPage } from "@/features/trabalho";

export type TrabalhoSearch = {
  tab?: string;
  day?: string;
  edit?: string;
};

export const Route = createFileRoute("/trabalho")({
  validateSearch: (s: Record<string, unknown>): TrabalhoSearch => ({
    tab: typeof s.tab === "string" ? s.tab : undefined,
    day: typeof s.day === "string" ? s.day : undefined,
    edit: typeof s.edit === "string" ? s.edit : undefined,
  }),
  component: TrabalhoPage,
});
