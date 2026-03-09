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

3. **Configure a planilha:**

   Copie o arquivo de exemplo:
   ```bash
   cp .env.local.example .env.local
   ```

   Edite `.env.local` e adicione o ID da sua planilha:
   ```env
   GOOGLE_SHEET_ID=1bbhkrbnnBJIck5qxAR13b96RfBn1aLtFfyio0rUgCRw
   ```

   > 💡 **Como encontrar o ID da planilha:**
   > - Abra a planilha no Google Sheets
   > - Copie o trecho entre `/d/` e `/edit` da URL:
   > - `https://docs.google.com/spreadsheets/d/`**`SEU_ID_AQUI`**`/edit`

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
3. **Configure a variável de ambiente:**
   - Vá em "Settings" → "Environment Variables"
   - Adicione: `GOOGLE_SHEET_ID` = `seu-id-da-planilha`
4. O deploy será automático!

Ou via CLI:
```bash
npm i -g vercel
vercel --prod
# Adicione a variável quando perguntado
```

## 🔐 Configurando sua própria planilha

1. Crie uma cópia da planilha modelo
2. Compartilhe como **"Qualquer pessoa com o link pode ver"**
3. Copie o ID da planilha (trecho entre `/d/` e `/edit` na URL)
4. Adicione ao `.env.local`:
   ```env
   GOOGLE_SHEET_ID=seu-id-aqui
   ```

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
│   ├── google-sheets.ts   # Integração com Sheets
│   └── utils.ts           # Utilitários
├── types/
│   └── index.ts           # Tipos TypeScript
├── .env.local             # Configurações locais (não commitado)
├── .env.local.example     # Exemplo de configuração
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