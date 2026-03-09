// ==========================================
// TIPOS DO SISTEMA ATP 2026
// ==========================================

export interface Usuario {
  uid: string;
  nome: string;
  nomeNorm: string;
  telefone: string;
  telefoneNorm: string;
  aliases: string;
  status: string;
}

export interface Presenca {
  data: string;        // DD/MM/YYYY
  dataISO?: string;    // YYYY-MM-DD
  horario: string;     // HH:MM
  nomes: string;
  pago: string;
  observacoes: string;
  entrenador: string;
  nivelTreino: string;
  uid: string;
  tipo: "PACOTE" | "AVULSO" | "RECUP_ABIERTO" | "FECHADO_PRESENTE" | "FECHADO_FALTA" | "RECOVERY_PRESENTE" | "RECOVERY_FALTA" | "PENDENTE_UID" | string;
  credito: string;
  entrenoId: string;
  packId: string;
}

export interface Credito {
  data: string;        // DD/MM/YYYY
  dataISO?: string;    // YYYY-MM-DD
  uid: string;
  nomeNorm: string;
  tipo: "FALTA_FECHADO" | "CHUVA_CANCELADA" | "CANCEL_ABIERTO_PAGADO" | "USO_CRED_ABIERTO" | "USO_CRED_RECOVERY" | "RECOVERY_FALTA_PERS" | "RECOVERY_FALTA_GERAL" | string;
  delta: number;
  treinoIdOrigem: string;
  treinoIdUso: string;
  obs: string;
  validade: string;
}

export interface Pacote {
  packId: string;
  uid: string;
  nome: string;
  nomeNorm: string;
  creditosMax: number;
  inicio: string;
  fim: string;
  valor: number;
  creditosRestantes: number;
  status: "ATIVO" | "CANCELADO" | "INATIVO" | "COMPLETO" | string;
  alerta: string;
}

export interface GrupoMensalidade {
  mes: string;
  grupo: string;
  uid: string;
  nome: string;
  valor: string;
  estado: "PENDENTE" | "PAGO" | string;
  pagoEm: string;
  obs: string;
  credGerais: string;
  credPers: string;
  credRecuperados: string;
}

export interface Sessao {
  entrenoId: string;
  data: string;
  hora: string;
  entrenador: string;
  nivelTreino: string;
  tipoEntreno: string;
  grupo: string;
  status: "REALIZADO" | "CANCELADO" | string;
}

export interface DashboardStats {
  faturamento: number;
  presencasMes: number;
  pacotesAtivos: number;
  pendencias: number;
  totalUsuarios: number;
  presencasPorDia: { dia: number; diaLabel?: string; count: number }[];
}

export interface SaldoCredito {
  geral: number;
  pessoal: number;
}

export interface UsuarioPendente {
  nome: string;
  primeiraData: string;
  origem: string;
  resolvido: string;
  observacoes: string;
  nomeNorm: string;
  uidResolvido: string;
}