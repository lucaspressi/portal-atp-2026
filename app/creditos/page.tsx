import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, ArrowUp, ArrowDown } from "lucide-react";
import { getCreditos } from "@/lib/google-sheets";

function getTipoBadge(tipo: string) {
  const map: Record<string, { label: string; color: string }> = {
    CHUVA_CANCELADA: { label: "Chuva/Cancel", color: "bg-sky-100 text-sky-800" },
    FALTA_FECHADO: { label: "Falta Fechado", color: "bg-red-100 text-red-800" },
    CANCEL_ABIERTO_PAGADO: { label: "Cancel Pago", color: "bg-amber-100 text-amber-800" },
    USO_CRED_ABIERTO: { label: "Uso Aberto", color: "bg-blue-100 text-blue-800" },
    USO_CRED_RECOVERY: { label: "Uso Recovery", color: "bg-cyan-100 text-cyan-800" },
    RECOVERY_FALTA_PERS: { label: "Rec. Pessoal", color: "bg-purple-100 text-purple-800" },
    RECOVERY_FALTA_GERAL: { label: "Rec. Geral", color: "bg-green-100 text-green-800" },
  };
  const m = map[tipo] || { label: tipo || "—", color: "bg-gray-100 text-gray-800" };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${m.color}`}>{m.label}</span>;
}

export const dynamic = "force-dynamic";

export default async function CreditosPage() {
  const creditos = await getCreditos();
  const lista = [...creditos].reverse();

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
            <Link href="/presencas" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Presenças</Link>
            <Link href="/alunos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Alunos</Link>
            <Link href="/creditos" className="text-blue-600 font-medium border-b-2 border-blue-600 py-3 whitespace-nowrap">Créditos</Link>
            <Link href="/pacotes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Pacotes</Link>
            <Link href="/sessoes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Sessões</Link>
            <Link href="/mensalidades" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Mensalidades</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <CreditCard className="h-6 w-6" />
          Créditos ({lista.length})
        </h2>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aluno</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">UID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Delta</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treino Origem</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treino Uso</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Obs</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((c, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{c.data}</td>
                      <td className="px-4 py-3 text-sm font-medium capitalize">{c.nomeNorm}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-400">{c.uid}</td>
                      <td className="px-4 py-3">{getTipoBadge(c.tipo)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 font-bold ${c.delta > 0 ? "text-green-600" : "text-red-600"}`}>
                          {c.delta > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                          {c.delta > 0 ? `+${c.delta}` : c.delta}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-400">{c.treinoIdOrigem || "—"}</td>
                      <td className="px-4 py-3 text-xs font-mono text-gray-400">{c.treinoIdUso || "—"}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{c.obs || "—"}</td>
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