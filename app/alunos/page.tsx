import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Phone } from "lucide-react";
import { getUsuarios, getCreditos } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export default async function AlunosPage() {
  const [usuarios, creditos] = await Promise.all([
    getUsuarios(),
    getCreditos(),
  ]);

  // Calcula saldo de créditos para cada usuário
  const saldos: Record<string, { geral: number; pessoal: number }> = {};
  creditos.forEach((c) => {
    if (!saldos[c.uid]) saldos[c.uid] = { geral: 0, pessoal: 0 };
    const tiposGeral = ["CHUVA_CANCELADA", "CANCEL_ABIERTO_PAGADO", "RECOVERY_FALTA_GERAL", "USO_CRED_ABIERTO", "USO_CRED_RECOVERY"];
    const tiposPessoal = ["FALTA_FECHADO", "RECOVERY_FALTA_PERS"];
    if (tiposGeral.includes(c.tipo)) saldos[c.uid].geral += c.delta;
    if (tiposPessoal.includes(c.tipo)) saldos[c.uid].pessoal += c.delta;
  });

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
            <Link href="/alunos" className="text-blue-600 font-medium border-b-2 border-blue-600 py-3 whitespace-nowrap">Alunos</Link>
            <Link href="/creditos" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Créditos</Link>
            <Link href="/pacotes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Pacotes</Link>
            <Link href="/sessoes" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Sessões</Link>
            <Link href="/mensalidades" className="text-gray-500 hover:text-gray-700 py-3 whitespace-nowrap">Mensalidades</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <Users className="h-6 w-6" />
          Alunos ({usuarios.length})
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {usuarios.map((u) => {
            const s = saldos[u.uid] || { geral: 0, pessoal: 0 };
            return (
              <Card key={u.uid} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{u.nome}</h3>
                      <p className="text-xs text-gray-400">{u.nomeNorm}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Phone className="h-3 w-3" />
                    +{u.telefone}
                  </div>
                  <p className="text-xs font-mono text-gray-300 mb-3">{u.uid}</p>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className={`text-lg font-bold ${s.geral > 0 ? "text-green-600" : s.geral < 0 ? "text-red-600" : "text-gray-300"}`}>
                        {s.geral}
                      </div>
                      <div className="text-xs text-gray-500">Cred. Gerais</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className={`text-lg font-bold ${s.pessoal > 0 ? "text-purple-600" : "text-gray-300"}`}>
                        {s.pessoal}
                      </div>
                      <div className="text-xs text-gray-500">Cred. Pessoais</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}