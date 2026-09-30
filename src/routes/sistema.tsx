import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sistema")({
  beforeLoad: () => {
    throw redirect({ to: "/vida", search: { tab: "casa" } });
  },
  component: () => null,
});
