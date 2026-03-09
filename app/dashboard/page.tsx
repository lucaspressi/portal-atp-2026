import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp, Users, Package, AlertCircle,
  ClipboardList, Plus, AlertTriangle, Info,
  Calendar, ArrowRight, BarChart3
} from "lucide-react";
import { getDashboardStats, getPresencas, getSessoes } from "@/lib/google-sheets";

function getTipoBadge(tipo: string) {
  const map: Record<string, { label: string; color: string }> = {
    PACOTE: { label: "Pacote", color: "bg-green-100 text-green-800" },
    AVULSO: { label: "Avulso", color: "bg-blue-100 text-blue-800" },
    RECUP_ABIERTO: { label: "Recup.", color: "bg-purple-100 text-purple-800" },
    RECOVERY_PRESENTE: { label: "Recovery ✓", color: "bg-cyan-100 text-cyan-800" },
    RECOVERY_FALTA: { label: "Recovery ✗", color: "bg-orange-100 text-orange-800" },
    FECHADO_PRESENTE: { label: "Fechado ✓", color: "bg-emerald-100 text-emerald-800" },
    FECHADO_FALTA: { label: "Falta", color: "bg-red-100 text-red-800" },
    PENDENTE_UID: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  };
  const m = map[tipo] || { label: tipo || "—", color: "bg-gray-100 text-gray-800" };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${m.color}`}>{m.label}</span>;
}

function formatEuro(val: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(val);
}

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [stats, presencas, sessoes] = await Promise.all([
    getDashboardStats(),
    getPresencas(),
    getSessoes(),
  ]);

  // Últimas presenças (mais recentes primeiro)
  const ultimasPresencas = [...presencas].reverse().slice(0, 10);
  const maxCount = stats.presencasPorDia.length > 0
    ? Math.max(...stats.presencasPorDia.map((d) => d.count))
    : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="text-3xl">🏐</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ATP 2026</h1>
                <p className="text-sm text-gray-500">Painel Administrativo</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700">DADOS REAIS</span>
              <Link href="/portal" className="text-sm text-blue-600 hover:text-blue-800">
                Portal Aluno →
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <Link href="/dashboard" className="text-blue-600 font-medium border-b-2 border-blue-600 py-3 whitespace-nowrap">Dashboard</Link>
            <Link href="/presencas" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Presenças</Link>
            <Link href="/alunos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Alunos</Link>
            <Link href="/creditos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Créditos</Link>
            <Link href="/pacotes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Pacotes</Link>
            <Link href="/sessoes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Sessões</Link>
            <Link href="/mensalidades" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Mensalidades</Link>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatEuro(stats.faturamento)}</div>
              <p className="text-xs text-muted-foreground">total registrado</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Presenças</CardTitle>
              <ClipboardList className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.presencasMes}</div>
              <p className="text-xs text-muted-foreground">registros na planilha</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alunos</CardTitle>
              <Users className="h-4 w-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsuarios}</div>
              <p className="text-xs text-muted-foreground">cadastrados</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacotes Ativos</CardTitle>
              <Package className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pacotesAtivos}</div>
              <p className="text-xs text-muted-foreground">em andamento</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendências</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.pendencias}</div>
              <p className="text-xs text-muted-foreground">UIDs não resolvidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2" asChild><Link href="/presencas"><ClipboardList className="h-4 w-4" />Ver Presenças</Link></Button>
              <Button variant="outline" className="gap-2" asChild><Link href="/alunos"><Users className="h-4 w-4" />Ver Alunos</Link></Button>
              <Button variant="outline" className="gap-2" asChild><Link href="/creditos">Créditos</Link></Button>
              <Button variant="outline" className="gap-2" asChild><Link href="/pacotes"><Package className="h-4 w-4" />Pacotes</Link></Button>
            </div>
          </CardContent>
        </Card>

        {/* Chart + Sessões */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gráfico de presenças por dia */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Presenças por Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.presencasPorDia.length > 0 ? (
                <div className="flex items-end gap-2 h-48">
                  {stats.presencasPorDia.map((d, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 gap-1">
                      <span className="text-xs font-medium text-gray-600">{d.count}</span>
                      <div
                        className="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600 min-h-[4px]"
                        style={{ height: `${(d.count / maxCount) * 160}px` }}
                        title={`${d.diaLabel || d.dia}: ${d.count} presenças`}
                      />
                      <span className="text-xs text-gray-400">{d.dia}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-8">Sem dados de presença</p>
              )}
            </CardContent>
          </Card>

          {/* Sessões */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Sessões ({sessoes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessoes.map((s, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{s.tipoEntreno}</span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          s.status === "REALIZADO" ? "bg-green-100 text-green-800" :
                          s.status === "CANCELADO" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>{s.status}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {s.data} • {s.hora} • {s.entrenador}
                      </p>
                      <p className="text-xs text-gray-400 font-mono">{s.entrenoId}</p>
                    </div>
                  </div>
                ))}
                {sessoes.length === 0 && (
                  <p className="text-gray-400 text-center py-4">Nenhuma sessão</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Últimas Presenças */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Últimas Presenças
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/presencas">Ver todas →</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase">Hora</th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase">Aluno</th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase">Entrenador</th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase">Pago</th>
                    <th className="pb-3 text-xs font-medium text-gray-500 uppercase">Treino ID</th>
                  </tr>
                </thead>
                <tbody>
                  {ultimasPresencas.map((p, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 text-sm">{p.data}</td>
                      <td className="py-3 text-sm text-gray-600">{p.horario}</td>
                      <td className="py-3 text-sm font-medium">{p.nomes}</td>
                      <td className="py-3 text-sm text-gray-600">{p.entrenador}</td>
                      <td className="py-3">{getTipoBadge(p.tipo)}</td>
                      <td className="py-3 text-sm">{parseFloat(p.pago) > 0 ? `${p.pago} €` : "—"}</td>
                      <td className="py-3 text-xs font-mono text-gray-400">{p.entrenoId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}