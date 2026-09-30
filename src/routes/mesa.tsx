import { createFileRoute } from "@tanstack/react-router";
import { MesaPage } from "@/features/mesa";

export const Route = createFileRoute("/mesa")({ component: MesaPage });
