import type { ReactNode } from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("grid gap-1.5", className)}>
      <Label>{label}</Label>
      {children}
    </label>
  );
}
