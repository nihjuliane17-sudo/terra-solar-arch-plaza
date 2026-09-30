import { createFileRoute } from "@tanstack/react-router";
import { DinheiroPage } from "@/features/dinheiro";

export const Route = createFileRoute("/dinheiro")({ component: DinheiroPage });
