import { createFileRoute } from "@tanstack/react-router";
import { VidaPage } from "@/features/vida";

export type VidaSearch = {
  tab?: string;
  day?: string;
};

export const Route = createFileRoute("/vida")({
  validateSearch: (s: Record<string, unknown>): VidaSearch => ({
    tab: typeof s.tab === "string" ? s.tab : undefined,
    day: typeof s.day === "string" ? s.day : undefined,
  }),
  component: VidaPage,
});
