import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatação de datas
export function formatDate(date: string | Date): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

// Normalização de nomes (igual ao Google Apps Script)
export function normalizeName(s: string): string {
  if (!s) return "";
  let t = s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  t = t.replace(/\batp\b/g, " ");
  t = t.replace(/[^a-z0-9 ]+/g, " ");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

// Formatação de telefone
export function formatPhone(phone: string): string {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  return phone;
}

// Cores para badges de tipo
export function getTipoColor(tipo: string): string {
  const colors: Record<string, string> = {
    PACOTE: "bg-green-100 text-green-800 border-green-200",
    AVULSO: "bg-blue-100 text-blue-800 border-blue-200",
    RECUP_ABIERTO: "bg-purple-100 text-purple-800 border-purple-200",
    FECHADO_PRESENTE: "bg-emerald-100 text-emerald-800 border-emerald-200",
    FECHADO_FALTA: "bg-red-100 text-red-800 border-red-200",
    RECOVERY_PRESENTE: "bg-cyan-100 text-cyan-800 border-cyan-200",
    RECOVERY_FALTA: "bg-orange-100 text-orange-800 border-orange-200",
    PENDENTE_UID: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };
  return colors[tipo] || "bg-gray-100 text-gray-800 border-gray-200";
}

// Labels para tipos
export function getTipoLabel(tipo: string): string {
  const labels: Record<string, string> = {
    PACOTE: "Pacote",
    AVULSO: "Avulso",
    RECUP_ABIERTO: "Recup. Crédito",
    FECHADO_PRESENTE: "Presente (Fechado)",
    FECHADO_FALTA: "Falta (Fechado)",
    RECOVERY_PRESENTE: "Presente (Recovery)",
    RECOVERY_FALTA: "Falta (Recovery)",
    PENDENTE_UID: "Pendente UID",
  };
  return labels[tipo] || tipo;
}

// Verifica se uma data é hoje
export function isToday(date: string | Date): boolean {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

// Verifica se uma data é futura
export function isFuture(date: string | Date): boolean {
  const d = new Date(date);
  return d > new Date();
}

// Agrupa array por chave
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

// Ordena por data
export function sortByDate<T>(array: T[], key: keyof T, order: "asc" | "desc" = "desc"): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(a[key] as string).getTime();
    const dateB = new Date(b[key] as string).getTime();
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}