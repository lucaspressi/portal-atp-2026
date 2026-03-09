// ==========================================
// LEITOR DE DADOS — GOOGLE SHEETS ONLINE
// ==========================================
// Busca dados direto da planilha Google Sheets
// via endpoint público CSV (sem credenciais)
// ==========================================

import type {
  Usuario,
  Presenca,
  Credito,
  Pacote,
  GrupoMensalidade,
  Sessao,
  DashboardStats,
} from "@/types";

// ID da planilha vem do .env.local
const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";

// Cache em memória por aba (TTL 30s para dev, 120s para prod)
const CACHE_TTL = process.env.NODE_ENV === "production" ? 120_000 : 30_000;
const _cache: Record<string, { data: Record<string, string>[]; ts: number }> = {};

// ==========================================
// PARSE CSV
// ==========================================
function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.trim());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      if (headers[j]) {
        row[headers[j]] = (values[j] || "").trim();
      }
    }
    rows.push(row);
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ==========================================
// FETCH DE ABA DO GOOGLE SHEETS
// ==========================================
async function fetchSheet(sheetName: string): Promise<Record<string, string>[]> {
  if (!SHEET_ID) {
    console.error("GOOGLE_SHEET_ID não configurado no .env.local");
    return [];
  }

  const now = Date.now();
  if (_cache[sheetName] && now - _cache[sheetName].ts < CACHE_TTL) {
    return _cache[sheetName].data;
  }

  const encodedName = encodeURIComponent(sheetName);
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodedName}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { "Accept": "text/csv" },
    });

    if (!res.ok) {
      console.error(`Erro ao buscar aba "${sheetName}": HTTP ${res.status}`);
      return _cache[sheetName]?.data || [];
    }

    const csv = await res.text();
    const data = parseCSV(csv);
    _cache[sheetName] = { data, ts: now };
    return data;
  } catch (error) {
    console.error(`Erro ao buscar aba "${sheetName}":`, error);
    return _cache[sheetName]?.data || [];
  }
}

// ==========================================
// USUÁRIOS (116 registros)
// ==========================================
export async function getUsuarios(): Promise<Usuario[]> {
  const rows = await fetchSheet("usuarios");
  return rows
    .filter((r) => r.UID)
    .map((r) => ({
      uid: r.UID,
      nome: r.Nome || "",
      nomeNorm: r.Nome_norm || "",
      telefone: r.Telefone || "",
      telefoneNorm: r.Telefone_norm || "",
      aliases: r.Aliases || "",
      status: r.Status || "ativo",
    }));
}

export async function getUsuarioByUID(uid: string): Promise<Usuario | null> {
  const usuarios = await getUsuarios();
  return usuarios.find((u) => u.uid === uid) || null;
}

// ==========================================
// PRESENÇAS
// ==========================================
export async function getPresencas(): Promise<Presenca[]> {
  const rows = await fetchSheet("presenças");
  return rows
    .filter((r) => r.Data)
    .map((r) => ({
      data: r.Data || "",
      horario: r.Horario || "",
      nomes: r.Nomes || "",
      pago: (r.Pago || "0").replace(",", "."),
      observacoes: r.Observaciones || "",
      entrenador: r.Entrenador || "",
      nivelTreino: r["Nivel Treino"] || "",
      uid: r.UID || "",
      tipo: (r.Tipo || "") as Presenca["tipo"],
      credito: r.Credito || "",
      entrenoId: r["Entreno ID"] || "",
      packId: r.PackID || "",
    }));
}

export async function getPresencasByUID(uid: string): Promise<Presenca[]> {
  const presencas = await getPresencas();
  return presencas.filter((p) => p.uid === uid);
}

// ==========================================
// CRÉDITOS
// ==========================================
export async function getCreditos(): Promise<Credito[]> {
  const rows = await fetchSheet("creditos");
  return rows
    .filter((r) => r.UID)
    .map((r) => ({
      data: (r.Data || "").split(" ")[0], // pega só a data, sem hora
      uid: r.UID,
      nomeNorm: r.Nome_norm || "",
      tipo: r.Tipo || "",
      delta: parseInt(r.Delta) || 0,
      treinoIdOrigem: r.TreinoID_Origem || "",
      treinoIdUso: r.TreinoID_Uso || "",
      obs: r.Obs || "",
      validade: r.Validade || "",
    }));
}

export async function getCreditosByUID(uid: string): Promise<Credito[]> {
  const creditos = await getCreditos();
  return creditos.filter((c) => c.uid === uid);
}

export async function calcularSaldo(uid: string) {
  const creditos = await getCreditosByUID(uid);
  let geral = 0;
  let pessoal = 0;

  creditos.forEach((c) => {
    const tiposGeral = [
      "CHUVA_CANCELADA",
      "CANCEL_ABIERTO_PAGADO",
      "RECOVERY_FALTA_GERAL",
      "USO_CRED_ABIERTO",
      "USO_CRED_RECOVERY",
    ];
    const tiposPessoal = ["FALTA_FECHADO", "RECOVERY_FALTA_PERS"];
    if (tiposGeral.includes(c.tipo)) geral += c.delta;
    if (tiposPessoal.includes(c.tipo)) pessoal += c.delta;
  });

  return { geral, pessoal };
}

// ==========================================
// PACOTES
// ==========================================
export async function getPacotes(): Promise<Pacote[]> {
  const rows = await fetchSheet("pacotes_2026");
  return rows
    .filter((r) => {
      // Headers têm espaço extra: "PackID " — trimamos
      const id = (r["PackID"] || r["PackID "] || "").trim();
      return id !== "";
    })
    .map((r) => {
      // Trata headers com espaço extra
      const get = (key: string) => (r[key] || r[key + " "] || "").trim();
      return {
        packId: get("PackID"),
        uid: get("UID"),
        nome: get("Nome"),
        nomeNorm: get("Nome_norm"),
        creditosMax: parseInt(get("CreditosMax")) || 0,
        inicio: get("Inicio").split(" ")[0],
        fim: get("Fim").split(" ")[0],
        valor: parseFloat(get("Valor")) || 0,
        creditosRestantes: parseInt(get("Creditos Restantes")) || 0,
        status: (get("Status") || "") as Pacote["status"],
        alerta: get("Alerta"),
      };
    });
}

export async function getPacotesByUID(uid: string): Promise<Pacote[]> {
  const pacotes = await getPacotes();
  return pacotes.filter((p) => p.uid === uid);
}

// ==========================================
// SESSÕES
// ==========================================
export async function getSessoes(): Promise<Sessao[]> {
  const rows = await fetchSheet("sessoes");
  return rows
    .filter((r) => r.EntrenoID)
    .map((r) => ({
      entrenoId: r.EntrenoID,
      data: r.Data || "",
      hora: r.Hora || "",
      entrenador: r.Entrenador || "",
      nivelTreino: r.NivelTreino || "",
      tipoEntreno: r.TipoEntreno || "",
      grupo: r.Grupo || "",
      status: (r.Status || "") as Sessao["status"],
    }));
}

// ==========================================
// GRUPOS MENSALIDADES
// ==========================================
export async function getGruposMensalidades(): Promise<GrupoMensalidade[]> {
  const rows = await fetchSheet("grupos_mensalidades");
  return rows
    .filter((r) => r.UID)
    .map((r) => ({
      mes: r.Mes || "",
      grupo: r.Grupo || "",
      uid: r.UID,
      nome: r.Nome || "",
      valor: (r.Valor || "0").replace(",", "."),
      estado: (r.Estado || "") as GrupoMensalidade["estado"],
      pagoEm: r.PagoEm || "",
      obs: r.Obs || "",
      credGerais: r["Cred Gerais"] || "0",
      credPers: r["Cred Pers"] || "0",
      credRecuperados: r["Cred Recuperados"] || "0",
    }));
}

// ==========================================
// USUARIOS PENDENTES
// ==========================================
export async function getUsuariosPendentes() {
  const rows = await fetchSheet("usuarios_pendentes");
  return rows
    .filter((r) => r["Nome (como apareceu)"])
    .map((r) => ({
      nome: r["Nome (como apareceu)"] || "",
      primeiraData: r.Primeira_data || "",
      origem: r.Origem || "",
      resolvido: r["Resolvido?"] || "",
      observacoes: r["Observações"] || "",
      nomeNorm: r.Nome_norm || "",
      uidResolvido: r.UID_resolvido || "",
    }));
}

// ==========================================
// DASHBOARD STATS
// ==========================================
export async function getDashboardStats(): Promise<DashboardStats> {
  const [usuarios, presencas, pacotes, creditos, pendentes] = await Promise.all([
    getUsuarios(),
    getPresencas(),
    getPacotes(),
    getCreditos(),
    getUsuariosPendentes(),
  ]);

  // Faturamento total
  const faturamento = presencas.reduce(
    (acc, p) => acc + (parseFloat(p.pago) || 0),
    0
  );

  // Pacotes ativos
  const pacotesAtivos = pacotes.filter((p) => p.status === "ATIVO").length;

  // Pendências
  const pendencias = pendentes.filter((p) => p.resolvido !== "SIM").length;

  // Presenças agrupadas por data
  const porDia: Record<string, number> = {};
  presencas.forEach((p) => {
    porDia[p.data] = (porDia[p.data] || 0) + 1;
  });

  // Ordena por data
  const presencasPorDia = Object.entries(porDia)
    .map(([dia, count]) => {
      const parts = dia.split("/");
      const diaNum = parseInt(parts[0]) || 0;
      return { dia: diaNum, diaLabel: dia, count };
    })
    .sort((a, b) => a.dia - b.dia);

  return {
    faturamento,
    presencasMes: presencas.length,
    pacotesAtivos,
    pendencias,
    totalUsuarios: usuarios.length,
    presencasPorDia,
  };
}