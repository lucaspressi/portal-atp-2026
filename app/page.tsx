import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, Users, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏐</span>
            <span className="font-bold text-xl text-gray-900">ATP 2026</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link href="/portal">Portal Aluno</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Admin</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Sistema em Produção
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Gestão de Treinos
            <span className="block text-blue-600">de Vôlei</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Controle completo de presenças, créditos, pacotes e mensalidades. 
            Moderno, rápido e acessível de qualquer dispositivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8 h-12" asChild>
              <Link href="/dashboard">
                Painel Admin →
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 h-12" asChild>
              <Link href="/portal">
                Portal do Aluno
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          Funcionalidades
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          Tudo que você precisa para gerenciar os treinos da ATP
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Presenças</h3>
                <p className="text-gray-500 text-sm">
                  Registre presenças em treinos abertos, fechados e recovery.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Créditos</h3>
                <p className="text-gray-500 text-sm">
                  Controle automático de créditos gerais e pessoais.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Portal Aluno</h3>
                <p className="text-gray-500 text-sm">
                  Alunos acompanham créditos e histórico em tempo real.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Segurança</h3>
                <p className="text-gray-500 text-sm">
                  Autenticação Clerk com roles admin/aluno.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">42</div>
              <div className="text-gray-500 mt-1">Alunos Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600">1.250€</div>
              <div className="text-gray-500 mt-1">Faturamento/Mês</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600">12</div>
              <div className="text-gray-500 mt-1">Pacotes Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600">0€</div>
              <div className="text-gray-500 mt-1">Custo do Portal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🏐</span>
            <span className="font-bold text-white text-xl">ATP 2026</span>
          </div>
          <p className="text-sm">
            © 2026 ATP - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}