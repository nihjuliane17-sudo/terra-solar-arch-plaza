export function brl(v: number) {
  return (v || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function usd(v: number) {
  return (v || 0).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function num(s: string | number) {
  if (typeof s === "number") return s;
  return parseFloat(String(s).replace(/\./g, "").replace(",", ".")) || 0;
}

export function toBRL(usdValue: number, rate: number) {
  return Math.round((usdValue || 0) * rate * 100) / 100;
}

export function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export function minutesToHM(m: number) {
  const sign = m < 0 ? "−" : "";
  const abs = Math.abs(Math.round(m));
  return `${sign}${Math.floor(abs / 60)}h${pad2(abs % 60)}`;
}

export function parseDuration(v: string) {
  const s = String(v || "").trim().replace(",", ".");
  if (!s) return 0;
  if (s.includes(":")) {
    const [h, m] = s.split(":");
    return (Number(h) || 0) * 60 + (Number(m) || 0);
  }
  return Math.round((parseFloat(s) || 0) * 60);
}

export function timeToMin(t: string) {
  if (!t) return null;
  return Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
}
