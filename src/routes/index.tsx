import { createFileRoute } from "@tanstack/react-router";
import { HojePage } from "@/features/hoje";

export const Route = createFileRoute("/")({ component: HojePage });
