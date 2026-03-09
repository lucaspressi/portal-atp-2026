import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">🏐 ATP 2026</h1>
          <p className="text-gray-600">Portal de Gestão de Treinos</p>
        </div>
        
        <Card>
          <CardContent className="pt-6 space-y-4">
            <p className="text-center text-sm text-gray-500 mb-4">
              Em produção, o login será via Clerk (Google, Email).
              <br />Para demo, escolha um acesso:
            </p>

            <Button className="w-full h-12 text-base" asChild>
              <Link href="/dashboard">
                Entrar como Admin
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full h-12 text-base" asChild>
              <Link href="/portal">
                Entrar como Aluno (Javi)
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-gray-400 mt-6">
          © 2026 ATP - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}