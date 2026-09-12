# Mapa do Ecossistema SAP — v3 (248 serviços, i18n, Vercel)

SPA React + Vite, 100% client-side, sem backend. `src/data.js` é a fonte
única — 248 serviços, 7 camadas, 7 clusters, 3 presets.

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

- **Catálogo dos 248 serviços em `src/data.js`**, todos os campos
  obrigatórios (`id, nome, camada, tipo, cenarios, oQueFaz, paraQueServe,
  exemploReal, ligaA, nesteCenario`), validado (`node validar.mjs`): ids
  únicos, todo `ligaA` resolve, 7 clusters consistentes, os 12
  `LEGADO_IDS` válidos, espinhas ≤6 hops.
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
- **Conteúdo dos 248 serviços traduzido para inglês** (`src/i18n/en.js`):
  nome/tipo/oQueFaz/paraQueServe/exemploReal/nesteCenario/naoConfundir de
  todos os 248, validado 1:1 contra os ids de `data.js` (zero em falta,
  zero incompletos). PT e EN estão ambos completos.
- Ficheiros Vercel exactos (`vercel.json`, scripts do `package.json`,
  `vite.config.js` com `base:"/"` e `outDir:"dist"`).
- Zero ficheiros Python/Streamlit no repositório (verificado).

## O que fica para uma próxima iteração (não está nesta entrega)

Dado o tamanho real do pedido, priorizei terminar bem uma língua de cada
vez em vez de espalhar a tradução por quatro e não terminar nenhuma.
Ficou por fazer:

1. **Tradução do conteúdo dos 248 serviços para FR/DE/ES.** PT e EN estão
   ambos completos e validados; `services` em `fr.js/de.js/es.js` continua
   vazio, com fallback correcto para PT-PT (`tServico()` já testado). São
   mais ~3000 blocos de texto técnico (3 línguas × 248 serviços × ~4-7
   campos) — o mesmo trabalho que já foi feito para inglês, repetido para
   as outras três.
2. **Vista "Esquema"** (secções 12-14 do brief): os 8 diagramas de
   arquitectura com React Flow/@xyflow/react (Azure RISE, SCI RISE, S/4
   Public simples, interior do BTP, Build+BPA, Joule Studio, GenAI on BTP,
   camadas do S/4 Private) com contentores aninhados, setas etiquetadas
   animadas e toggle Mapa|Esquema. É, na prática, uma segunda aplicação
   completa; não foi iniciada.

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
