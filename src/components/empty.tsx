import type { ReactNode } from "react";

export function Empty({
  title,
  body,
  action,
}: {
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-dashed border-border px-6 py-12 text-center">
      <p className="font-display text-lg">{title}</p>
      {body ? (
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{body}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
