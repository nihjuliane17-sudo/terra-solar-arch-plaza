import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  Building2,
  CalendarDays,
  Download,
  Menu,
  Moon,
  Smartphone,
  Sun,
  Upload,
  Wallet,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { APP_NAME, STUDIO_NAME } from "@/lib/constants";
import { useNara } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Hoje", icon: CalendarDays },
  { to: "/trabalho", label: "Trabalho", icon: Briefcase },
  { to: "/dinheiro", label: "Dinheiro", icon: Wallet },
  { to: "/vida", label: "Vida", icon: BookOpen },
  { to: "/mesa", label: "Mesa", icon: Building2 },
] as const;

function useDusk() {
  const [dusk, setDusk] = useState(false);
  useEffect(() => {
    setDusk(document.documentElement.classList.contains("dusk"));
  }, []);
  const toggle = () => {
    const next = !document.documentElement.classList.contains("dusk");
    document.documentElement.classList.toggle("dusk", next);
    localStorage.setItem("lumi-theme", next ? "dusk" : "day");
    setDusk(next);
  };
  return { dusk, toggle };
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map((item) => {
        const active =
          item.to === "/"
            ? pathname === "/"
            : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onClick}
            className={cn(
              "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function BackupButtons({ compact }: { compact?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const exportBackup = useNara((s) => s.exportBackup);
  const importBackup = useNara((s) => s.importBackup);

  const save = () => {
    const data = JSON.stringify(exportBackup(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `lumi-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Backup salvo");
  };

  const load = async (file: File) => {
    try {
      const o = JSON.parse(await file.text());
      importBackup(o);
      toast("Backup restaurado");
    } catch {
      toast("Arquivo inválido");
    }
  };

  return (
    <div className={cn("flex", compact ? "gap-1" : "flex-col gap-1")}>
      <Button variant="ghost" size={compact ? "icon" : "sm"} onClick={save} title="Salvar backup">
        <Download />
        {compact ? null : "Salvar backup"}
      </Button>
      <Button
        variant="ghost"
        size={compact ? "icon" : "sm"}
        onClick={() => inputRef.current?.click()}
        title="Abrir backup"
      >
        <Upload />
        {compact ? null : "Abrir backup"}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void load(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}

function InstallButton({ compact }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [promptEvent, setPromptEvent] = useState<{ prompt: () => Promise<void> } | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as unknown as { prompt: () => Promise<void> });
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (promptEvent) {
      await promptEvent.prompt();
      setPromptEvent(null);
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="ghost"
        size={compact ? "icon" : "sm"}
        onClick={() => void install()}
        title="Instalar neste aparelho"
      >
        <Smartphone />
        {compact ? null : "Instalar"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Usar em qualquer aparelho</DialogTitle>
          <DialogDescription>
            Lumi é um site. Abra este mesmo endereço no celular ou no computador — não precisa de
            arquivo zip.
          </DialogDescription>
          <div className="mt-4 space-y-3 text-sm leading-relaxed">
            <p>
              <span className="font-medium">No celular.</span> Abra o menu do navegador e escolha
              Adicionar à tela inicial. No iPhone: Compartilhar → Adicionar à Tela de Início.
            </p>
            <p>
              <span className="font-medium">No computador.</span> Use o mesmo endereço. Para levar
              os dados de um aparelho ao outro, Salvar backup aqui e Abrir backup no outro.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col px-4 py-6">
      <Link to="/" onClick={onNavigate} className="mb-8 px-2">
        <div className="font-display text-2xl tracking-tight">{APP_NAME}</div>
        <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {STUDIO_NAME}
        </div>
      </Link>
      <NavLinks onClick={onNavigate} />
      <div className="mt-auto flex flex-col gap-1 pt-6">
        <InstallButton />
        <BackupButtons />
      </div>
    </div>
  );
}

function Splash() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-display text-4xl tracking-tight">{APP_NAME}</p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {STUDIO_NAME}
        </p>
      </div>
    </div>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [menu, setMenu] = useState(false);
  const { dusk, toggle } = useDusk();
  const hydrate = useNara((s) => s.hydrate);

  useEffect(() => {
    const theme = localStorage.getItem("lumi-theme") || localStorage.getItem("nara-theme");
    if (theme === "dusk") document.documentElement.classList.add("dusk");
    void useNara.persist.rehydrate();
    hydrate();
    setReady(true);
  }, [hydrate]);

  if (!ready) return <Splash />;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Toaster
        theme="system"
        position="bottom-right"
        toastOptions={{
          className: "!bg-card !text-foreground !border-border !shadow-card",
        }}
      />
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-56 border-r border-border bg-card/70 md:block">
        <Sidebar />
      </aside>

      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/85 px-3 backdrop-blur-sm md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setMenu(true)} aria-label="Menu">
          <Menu />
        </Button>
        <span className="font-display text-lg">{APP_NAME}</span>
        <div className="flex items-center">
          <InstallButton compact />
          <BackupButtons compact />
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Tema">
            {dusk ? <Sun /> : <Moon />}
          </Button>
        </div>
      </header>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="p-0">
          <Sidebar onNavigate={() => setMenu(false)} />
        </SheetContent>
      </Sheet>

      <div className="md:pl-56">
        <div className="hidden items-center justify-end gap-1 px-6 pt-5 md:flex">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Tema">
            {dusk ? <Sun /> : <Moon />}
          </Button>
        </div>
        <main className="mx-auto w-full max-w-[92rem] px-3 pb-24 pt-6 md:px-6 md:pt-2">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] md:hidden">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="flex h-14 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] text-muted-foreground"
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
