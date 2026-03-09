import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getSessoes } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export default async function SessoesPage() {
  const sessoes = await getSessoes();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏐</span>
            <div><h1 className="text-2xl font-bold text-gray-900">ATP 2026</h1><p className="text-sm text-gray-500">Painel Administrativo</p></div>
          </Link>
        </div>
      </header>
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Dashboard</Link>
            <Link href="/presencas" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Presenças</Link>
            <Link href="/alunos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Alunos</Link>
            <Link href="/creditos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Créditos</Link>
            <Link href="/pacotes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Pacotes</Link>
            <Link href="/sessoes" className="text-blue-600 font-medium border-b-2 border-blue-600 py-3 whitespace-nowrap">Sessões</Link>
            <Link href="/mensalidades" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Mensalidades</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Calendar className="h-6 w-6" />
          Sessões ({sessoes.length})
        </h2>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entreno ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hora</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entrenador</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grupo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sessoes.map((s, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 text-xs font-mono">{s.entrenoId}</td>
                      <td className="px-4 py-3 text-sm">{s.data}</td>
                      <td className="px-4 py-3 text-sm">{s.hora}</td>
                      <td className="px-4 py-3 text-sm">{s.entrenador}</td>
                      <td className="px-4 py-3 text-sm">{s.tipoEntreno}</td>
                      <td className="px-4 py-3 text-sm">{s.grupo}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          s.status === "REALIZADO" ? "bg-green-100 text-green-800" :
                          s.status === "CANCELADO" ? "bg-red-100 text-red-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>{s.status}</span>
                      </td>
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