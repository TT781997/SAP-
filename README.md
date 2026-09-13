# Mapa do Ecossistema SAP

SPA pedagógica, 100 % client-side. Sem backend, sem login, sem variáveis de ambiente.

Do portátil até ao chão: o que os empregados precisam no ecrã, no mundo SAP.

## Stack

Vite + React 19 + Tailwind v4 + Zustand + React Flow (`@xyflow/react`).

## Local

```bash
npm i
npm run dev
npm run build
```

## GitHub → Vercel

1. Cria um repositório vazio no GitHub (sem README, para não haver conflito).
2. Neste pasta:

```bash
git init
git add .
git commit -m "Mapa do Ecossistema SAP"
git branch -M main
git remote add origin https://github.com/SEU-USER/SEU-REPO.git
git push -u origin main
```

3. Em [vercel.com/new](https://vercel.com/new) importa o repositório.

Definições que o Vercel detecta sozinho (Vite):

| Campo | Valor |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Root Directory | `.` (raiz do repo) |
| Environment Variables | nenhuma |

O `vercel.json` já tem o rewrite SPA (`/(.*) → /index.html`), necessário para o refresh não dar 404.

CLI, se preferires:

```bash
npx vercel --yes
```

## Uso

1. Escolhe o cenário (On-prem / GROW / RISE) — o esquema troca.
2. Escolhe o chão (Azure / AWS / GCP / SCI) no RISE.
3. Clica um bloco para o detalhe (o que faz, o que liga, o que depende).
4. «Ver portefólio» abre o mapa de ~340 serviços por camada.
5. A lupa encontra «SAP For me», «SCI», acrónimos e aliases.

Língua por omissão: Português (PT-PT).
