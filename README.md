# 🏐 Portal ATP 2026

Sistema web moderno para gestão de treinos de vôlei, integrado diretamente com Google Sheets.

## ✨ Funcionalidades

### Para Administradores
- 📊 **Dashboard em tempo real** com estatísticas da planilha
- 👥 **Gestão de alunos** (116 cadastrados)
- ✅ **Registro de presenças** (Recovery, Fechados, Abertos)
- 💰 **Controle de créditos** automático
- 📦 **Gestão de pacotes** de treinos
- 💳 **Controle de mensalidades**
- 🚨 **Alertas** de pendências

### Para Alunos
- 👤 **Portal pessoal** com histórico de treinos
- 💳 **Consulta de créditos** (gerais e pessoais)
- 📅 **Acompanhamento** de presenças

## 🚀 Tecnologias

- **Next.js 14** (App Router + Server Components)
- **TypeScript**
- **Tailwind CSS**
- **Google Sheets API** (via CSV público)
- **shadcn/ui** (componentes)

## 📋 Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Planilha Google Sheets pública (ou com acesso concedido)

## 🛠️ Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/portal-atp-2026.git
cd portal-atp-2026
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure a planilha (opcional):**
   
   Por padrão, o sistema usa a planilha compartilhada. Para usar sua própria planilha, edite o arquivo `lib/google-sheets.ts` e altere:
   ```typescript
   const SHEET_ID = "1bbhkrbnnBJIck5qxAR13b96RfBn1aLtFfyio0rUgCRw"; // Sua planilha
   ```

4. **Execute em desenvolvimento:**
```bash
npm run dev
```

5. **Acesse:** http://localhost:3000

## 📊 Estrutura da Planilha

O sistema espera as seguintes abas no Google Sheets:

| Aba | Descrição |
|-----|-----------|
| `usuarios` | Lista de alunos com UID, nome, telefone |
| `presenças` | Registro de presenças em treinos |
| `creditos` | Movimentação de créditos |
| `pacotes_2026` | Pacotes de treinos ativos |
| `grupos_mensalidades` | Controle de mensalidades |
| `sessoes` | Sessões de treino programadas |
| `usuarios_pendentes` | UIDs pendentes de resolução |

## 🌐 Deploy

### Vercel (Recomendado)

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Importe o repositório GitHub
3. O deploy será automático!

```bash
# Ou via CLI:
npm i -g vercel
vercel --prod
```

## 🔐 Configurando sua própria planilha

1. Crie uma cópia da planilha modelo
2. Compartilhe como **"Qualquer pessoa com o link pode ver"**
3. Copie o ID da planilha (trecho entre `/d/` e `/edit` na URL)
4. Substitua no arquivo `lib/google-sheets.ts`

## 📝 Scripts disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm start        # Servidor de produção
```

## 📁 Estrutura do Projeto

```
portal-atp-2026/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Painel administrativo
│   ├── portal/            # Portal do aluno
│   ├── presencas/         # Lista de presenças
│   ├── alunos/            # Lista de alunos
│   ├── creditos/          # Lista de créditos
│   ├── pacotes/           # Lista de pacotes
│   ├── sessoes/           # Lista de sessões
│   ├── mensalidades/      # Lista de mensalidades
│   └── page.tsx           # Landing page
├── components/
│   └── ui/                # Componentes shadcn/ui
├── lib/
│   └── google-sheets.ts   # Integração com Sheets
├── types/
│   └── index.ts           # Tipos TypeScript
└── public/                # Assets estáticos
```

## 💰 Custos

| Serviço | Custo |
|---------|-------|
| Vercel (Hobby) | Grátis |
| Google Sheets | Grátis |
| **Total** | **€0** |

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Projeto privado - ATP 2026

---

Desenvolvido com ❤️ para ATP 2026