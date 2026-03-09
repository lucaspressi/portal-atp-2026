import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { getPresencas } from "@/lib/google-sheets";

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

export const dynamic = "force-dynamic";

export default async function PresencasPage() {
  const presencas = await getPresencas();
  const lista = [...presencas].reverse(); // mais recentes primeiro

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏐</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ATP 2026</h1>
              <p className="text-sm text-gray-500">Painel Administrativo</p>
            </div>
          </Link>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Dashboard</Link>
            <Link href="/presencas" className="text-blue-600 font-medium border-b-2 border-blue-600 py-3 whitespace-nowrap">Presenças</Link>
            <Link href="/alunos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Alunos</Link>
            <Link href="/creditos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Créditos</Link>
            <Link href="/pacotes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Pacotes</Link>
            <Link href="/sessoes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Sessões</Link>
            <Link href="/mensalidades" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Mensalidades</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6" />
            Presenças ({lista.length})
          </h2>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aluno</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entrenador</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pago</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treino ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Obs</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((p, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{p.data}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.horario}</td>
                      <td className="px-4 py-3 text-sm font-medium">{p.nomes}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-400">{p.uid}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.entrenador}</td>
                      <td className="px-4 py-3">{getTipoBadge(p.tipo)}</td>
                      <td className="px-4 py-3 text-sm">{parseFloat(p.pago) > 0 ? `${p.pago} €` : "—"}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-400">{p.entrenoId}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-[200px] truncate">{p.observacoes || "—"}</td>
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