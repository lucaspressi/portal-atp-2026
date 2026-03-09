import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Calendar } from "lucide-react";
import { getPacotes } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export default async function PacotesPage() {
  const pacotes = await getPacotes();

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
            <Link href="/creditos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Créditos</Link>
            <Link href="/pacotes" className="text-blue-600 font-medium border-b-2 border-blue-600 py-3 whitespace-nowrap">Pacotes</Link>
            <Link href="/sessoes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Sessões</Link>
            <Link href="/mensalidades" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Mensalidades</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Package className="h-6 w-6" />
          Pacotes ({pacotes.length})
        </h2>

        {pacotes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pacotes.map((p) => {
              const pctUsado = p.creditosMax > 0 ? ((p.creditosMax - p.creditosRestantes) / p.creditosMax) * 100 : 0;
              return (
                <Card key={p.packId} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{p.nome}</h3>
                        <p className="text-xs font-mono text-gray-400">{p.packId}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        p.status === "ATIVO" ? "bg-green-100 text-green-800" :
                        p.status === "COMPLETO" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>{p.status}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Créditos</span>
                        <span className="font-medium">{p.creditosMax - p.creditosRestantes}/{p.creditosMax}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${pctUsado >= 100 ? "bg-blue-500" : pctUsado >= 75 ? "bg-yellow-500" : "bg-green-500"}`}
                          style={{ width: `${Math.min(pctUsado, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{p.creditosRestantes} restantes</p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-3.5 w-3.5" />
                        {p.inicio} → {p.fim}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Valor</span>
                        <span className="font-semibold text-green-600">{p.valor},00 €</span>
                      </div>
                      <div className="text-xs text-gray-400">{p.alerta}</div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card><CardContent className="py-12 text-center text-gray-400">Nenhum pacote cadastrado</CardContent></Card>
        )}
      </main>
    </div>
  );
}