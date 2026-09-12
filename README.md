# Mapa do Ecossistema SAP — v3 (340 serviços, i18n, Vercel)

SPA React + Vite, 100% client-side, sem backend. `src/data.js` é a fonte
única — 340 serviços, 7 camadas, 7 clusters, 3 presets.

## Deploy

```
npm i
npm run dev       # desenvolvimento local
npm run build     # gera dist/
npx vercel --yes  # deploy (framework Vite, output dist/, sem variáveis de ambiente)
```

`vercel.json` já tem o rewrite SPA (`/(.*) → /index.html`), necessário para
o preview não dar 404 no refresh de uma rota.

## O que está completo nesta entrega

- **Catálogo dos 340 serviços em `src/data.js`** (248 do catálogo base +
  92 da vaga "A-Z" / Business Suite / Cloud ERP), todos os campos
  obrigatórios (`id, nome, camada, tipo, cenarios, oQueFaz, paraQueServe,
  exemploReal, ligaA, nesteCenario`), validado (`node validar.mjs`): ids
  únicos, todo `ligaA` resolve, 7 clusters consistentes (os novos membros
  Business Network — `bn-asset`, `bn-commerce`, `bn-freight`, `bn-gtt`,
  `bn-traceability`, `bn-planning`, `bn-scc` — e CX — `mirakl`, `cdp`,
  `knowledge-central`, `territory-quota`, `spend-analytics` — foram
  adicionados às listas `CLUSTERS` correspondentes para a consistência
  bidireccional passar), os 12 `LEGADO_IDS` válidos, espinhas ≤6 hops.
  **Duas correcções feitas ao colar o lote de 92**: o brief usava `None`
  (Python) em vez de `null` (JS) no campo `cluster` de ~75 cards — corrigido
  na transcrição, senão o build rebentava com `ReferenceError: None is not
  defined`; e havia uma vírgula a mais entre o fim do catálogo de 248 e o
  início do novo lote, que criava um buraco no array (`[...,obj,,obj,...]`)
  — removida.
- **Modelo de ligações corrigido** (secção 1 do brief, a marcar como bug a
  corrigir de iterações anteriores): zero edges por defeito; hover/selecção
  mostra só as ligações de 1.º grau desse card, no máximo 8, prioridade
  para activo/recomendado, com chip "+N ligações no drawer" quando há mais;
  linhas ortogonais (elbow, 3 segmentos) com label no meio — nunca diagonais
  a atravessar camadas; toggle "Só espinha do cenário" com a sequência fixa
  de ≤6 hops por preset; botão "Limpar selecção".
- **Busca corrigida** (secção 8): normalização NFD + remoção de
  diacríticos + colapso de espaços/hífenes + prefixo "sap" opcional;
  `aliases[]` e `satelitesHelp` indexados; ranking por exact-match antes de
  substring, para "SCI" devolver `sci` antes de `Integration Suite` e "S4"
  devolver `s4hana` antes de `s4-any`. Testado com os casos do brief
  ("SAP For me", "sap for me", "forme", "SCI", "S4") — ver `validar.mjs`.
- **Drawer** com a ordem exacta de secções, incluindo a nova "Satélites no
  índice Help" (condicional, split por `;`).
- **7 clusters** (spend/cx/supply/finance-ext colapsados por defeito;
  pme/runtimes/dados-ext expandidos).
- **Selector de infraestrutura L0 com 4 opções** (AWS/Azure/GCP/SCI).
- **i18n**: mecanismo completo (`src/i18n/`), selector no header,
  persistido em `localStorage("sap-map-lang")`, fallback campo-a-campo
  para PT-PT com aviso na consola (nunca string vazia), não perde
  card/preset/pesquisa ao mudar de língua. `ui`, `presets` e `layers`
  traduzidos a 100% nas 5 línguas (PT/EN/FR/DE/ES).
- **Conteúdo dos 340 serviços traduzido para inglês** (`src/i18n/en.js`):
  nome/tipo/oQueFaz/paraQueServe/exemploReal/nesteCenario/naoConfundir de
  todos os 340, validado 1:1 contra os ids de `data.js` (zero em falta,
  zero incompletos). PT e EN estão ambos completos.
- Ficheiros Vercel exactos (`vercel.json`, scripts do `package.json`,
  `vite.config.js` com `base:"/"` e `outDir:"dist"`).
- Zero ficheiros Python/Streamlit no repositório (verificado).

## O que fica para uma próxima iteração (não está nesta entrega)

Dado o tamanho real do pedido, priorizei terminar bem uma língua de cada
vez em vez de espalhar a tradução por quatro e não terminar nenhuma.
Ficou por fazer:

1. **Tradução do conteúdo dos 340 serviços para FR/DE/ES.** PT e EN estão
   ambos completos e validados; `services` em `fr.js/de.js/es.js` continua
   vazio, com fallback correcto para PT-PT (`tServico()` já testado). São
   mais ~4000 blocos de texto técnico (3 línguas × 340 serviços × ~4-7
   campos) — o mesmo trabalho que já foi feito para inglês, repetido para
   as outras três.
2. **Vista "Esquema" — 2 de N diagramas construídos.** Toggle Mapa|Esquema
   no header, motor React Flow (`@xyflow/react`) com nós/arestas próprios
   (`src/schematics/nodes.jsx`) replicando fielmente a linguagem visual dos
   diagramas reais do SAP Architecture Center que me mandaste: caixas
   aninhadas com cabeçalho ícone+título, "pills" para os serviços, setas
   com etiqueta de protocolo (HTTPS/MCP/A2A), divisor "NETWORK". Construí
   **"Generative AI on SAP BTP"** com o cenário "Basic Prompting" (técnica
   de esbater tudo o que não está no caminho activo — a mesma tela, cores
   diferentes) e **"Safety Inspection"** (técnica alternativa de legenda
   "Focus Components" com borda magenta, sem esbater o resto). Ambos os
   ficheiros de dados (`src/schematics/genai-btp.js`,
   `safety-inspection.js`) estão validados (ids únicos, todas as arestas
   resolvem) e confirmei por SSR que a `EsquemaView` monta sem excepções
   (o `@xyflow/react` 12.x não parte em Node, ao contrário do que seria de
   esperar dado usar `ResizeObserver`). Ficam por fazer os restantes
   esquemas do plano original (Azure RISE, SCI RISE, S/4 Public simples,
   interior do BTP, Build+BPA, Joule Studio, camadas do S/4 Private) — o
   motor já está pronto para os receber, é "só" continuar a popular
   `src/schematics/` com o mesmo padrão.

## Decisão de interpretação a assinalar

O brief contradiz-se num ponto: a secção 1 diz explicitamente "zero edges
por defeito" (e lista isto como correcção a um erro de iterações
anteriores), mas a secção 4 ("Estado inicial") pede edges de governação
já visíveis entre 6 ids específicos sem nada seleccionado. Priorizei a
regra da secção 1 — está mais desenvolvida, é repetida, e é apresentada
como o fix de um problema concreto — pelo que o canvas arranca mesmo sem
nenhuma ligação desenhada. `IDS_GOVERNANCA_INICIAL` continua definido em
`data.js` caso queiras reverter esta escolha.

## Validação

```
node validar.mjs   # estrutura do catálogo + casos de teste da busca
npm run build      # build de produção
```
