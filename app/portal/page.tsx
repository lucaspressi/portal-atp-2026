import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, History, User, ArrowLeft } from "lucide-react";
import { getUsuarioByUID, getPresencasByUID, calcularSaldo } from "@/lib/google-sheets";

function getTipoBadge(tipo: string) {
  const map: Record<string, { label: string; color: string }> = {
    PACOTE: { label: "Pacote", color: "bg-green-100 text-green-800" },
    AVULSO: { label: "Avulso", color: "bg-blue-100 text-blue-800" },
    RECOVERY_PRESENTE: { label: "Recovery ✓", color: "bg-cyan-100 text-cyan-800" },
    FECHADO_PRESENTE: { label: "Presente ✓", color: "bg-emerald-100 text-emerald-800" },
    FECHADO_FALTA: { label: "Falta", color: "bg-red-100 text-red-800" },
    RECOVERY_FALTA: { label: "Recovery ✗", color: "bg-orange-100 text-orange-800" },
    RECUP_ABIERTO: { label: "Recup.", color: "bg-purple-100 text-purple-800" },
  };
  const m = map[tipo] || { label: tipo || "—", color: "bg-gray-100 text-gray-800" };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${m.color}`}>{m.label}</span>;
}

export const dynamic = "force-dynamic";

// Em produção: pegar UID do Clerk session. Demo: Javi
const DEMO_UID = "U-34638006031";

export default async function PortalPage() {
  const [usuario, presencas, saldo] = await Promise.all([
    getUsuarioByUID(DEMO_UID),
    getPresencasByUID(DEMO_UID),
    calcularSaldo(DEMO_UID),
  ]);

  const ultimosTreinos = [...presencas].reverse().slice(0, 10);
  const totalPresencas = presencas.filter(p =>
    ["FECHADO_PRESENTE", "RECOVERY_PRESENTE", "PACOTE", "AVULSO", "RECUP_ABIERTO"].includes(p.tipo)
  ).length;
  const totalFaltas = presencas.filter(p =>
    ["FECHADO_FALTA", "RECOVERY_FALTA"].includes(p.tipo)
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-3xl">🏐</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ATP 2026</h1>
                <p className="text-sm text-gray-500">Portal do Aluno</p>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-800">Admin →</Link>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />Início
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            👋 Olá, {usuario?.nome.replace("ATP ", "") || "Aluno"}!
          </h2>
          <p className="text-gray-500 mt-1">
            Acompanhe seus treinos e créditos
          </p>
          <p className="text-xs text-gray-300 mt-1 font-mono">{DEMO_UID}</p>
        </div>

        {/* Credits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className={saldo.geral > 0 ? "border-green-300 bg-gradient-to-br from-green-50 to-emerald-50" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />Créditos Gerais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-5xl font-bold ${saldo.geral > 0 ? "text-green-600" : saldo.geral < 0 ? "text-red-500" : "text-gray-300"}`}>
                {saldo.geral}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {saldo.geral > 0 ? "✅ Créditos disponíveis" : saldo.geral < 0 ? "⚠️ Saldo negativo" : "Sem créditos"}
              </p>
            </CardContent>
          </Card>

          <Card className={saldo.pessoal > 0 ? "border-purple-300 bg-gradient-to-br from-purple-50 to-violet-50" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <User className="h-4 w-4" />Créditos Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-5xl font-bold ${saldo.pessoal > 0 ? "text-purple-600" : "text-gray-300"}`}>
                {saldo.pessoal}
              </div>
              <p className="text-sm text-gray-500 mt-2">Gerados por faltas em treinos fechados</p>
            </CardContent>
          </Card>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">{presencas.length}</div>
            <div className="text-xs text-gray-500 mt-1">Total Registros</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-emerald-600">{totalPresencas}</div>
            <div className="text-xs text-gray-500 mt-1">Presenças</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-red-500">{totalFaltas}</div>
            <div className="text-xs text-gray-500 mt-1">Faltas</div>
          </Card>
        </div>

        {/* Histórico */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5" />Últimos Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ultimosTreinos.length > 0 ? (
              <div className="space-y-3">
                {ultimosTreinos.map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white rounded-lg border flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{t.data}</p>
                        <p className="text-sm text-gray-500">{t.entrenador} • {t.horario}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {parseFloat(t.pago) > 0 && (
                        <span className="text-sm text-green-600 font-semibold">{t.pago} €</span>
                      )}
                      {getTipoBadge(t.tipo)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="h-12 w-12 mx-auto mb-2" />
                <p>Nenhum treino registrado</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}