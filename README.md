# Mapa do Ecossistema SAP — v4 (340 serviços, 3 modos, i18n, Vercel)

SPA React + Vite, 100% client-side, sem backend. `src/data.js` é a fonte
única — 340 serviços, 7 camadas, 7 clusters, 3 presets.

Três modos, no toggle do header:
- **Mapa** — o atlas do portefólio, cards por camada.
- **Esquema** — diagramas de arquitectura em React Flow (4 construídos).
- **Construtor** — montar um landscape arrastando peças, com validação viva.

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
2. **Vista "Esquema" — 8 esquemas construídos, 5 por fazer.** É agora a
   vista inicial (secção 13/17: "o mapa é o atlas; o esquema é a aula").
   Contrato React Flow da secção 14: `colorMode="dark"`, `Background dots
   gap 24`, `MiniMap` colorido por domínio, `Controls`, `Panel` top-left com
   título + hero + selector, `sapEdge` custom (`getSmoothStepPath + BaseEdge
   + EdgeLabelRenderer`, label sempre visível), `hideAttribution: false`,
   ≤8 setas animadas por esquema (dashoffset em loop; `prefers-reduced-
   motion` desliga), hover num bloco esbate as setas não-incidentes, clique
   num bloco abre o MESMO drawer do catálogo (`data.cardId` validado contra
   os 340 ids), clique numa seta mostra a frase. O preset pré-selecciona o
   esquema (on-prem → `onprem`, GROW → `grow`, RISE → `rise-azure`); chips
   North Star / Prompting BTP / Events→Actions; filtro por domínio do
   Architecture Center; painel das 4 camadas North Star (cap. 3–6 do paper);
   botão "Ver portefólio".
   Em `src/schematics/`: `onprem`, `grow`, `rise-azure` (hub-spoke ①–⑪,
   DR, Private Link), `s4-public-simple`, `genai-btp` (39eb58 + cenário
   01aa03 Basic Prompting a esbater o resto), `joule-stack` (imagem 1 /
   North Star), `events-actions` (imagem 3 / 2a28bd — com a nota, confirmada
   no site, de que o framework CAP "não é produto standard"),
   `safety-inspection` (9ca181). Validados: ids únicos, arestas resolvem,
   `cardId` existem, ≤8 animadas. **Por fazer**: `rise-sci`, `btp-interior`,
   `bpa`, `private-layers`, `joule-studio`; zoom L1→L2; export SVG/PNG;
   breadcrumb; secção "Neste esquema" no drawer.

## Fontes lidas nesta iteração

- `architecture.learning.sap.com/docs/ref-arch` — 119 documentos, cinco
  domínios (AI & ML 37, App Dev & Automation 60, Data & Analytics 33,
  Integration 38, Operation & Security 25) e parceiros AWS / Azure / GCP /
  Databricks / IBM / Nvidia / Snowflake. Nota: a SAP tem lá um
  **Architecture Validator** próprio — vale a pena ver antes de investir
  mais no Construtor, para não duplicar.
- `.../docs/ai-native-north-star-architecture` — confirma as camadas
  User Experience → Process → Foundation (AI & data) → Platform, mais
  Integration/Security/Ethics & Governance, Ecosystem e Resilient and
  Sovereign Cloud. É o que fundamenta o esquema Joule.

## Construtor — montar um landscape SAP peça a peça (o "jogo de blocos")

Terceiro modo, no toggle **Mapa | Esquema | Construtor**. Tela cheia:
paleta à esquerda, 11 faixas L0..L10 ao centro, validação e sugestões à
direita.

- **Camadas L0..L10** (`src/builder/layers.js`): vista mais fina que as 7
  camadas do Mapa — separa Identidade/Segurança (L6), IA (L7), Agentes (L8)
  e UX (L9), que no catálogo estavam dentro de 'plataforma' e 'lob'. Os 340
  serviços têm todos uma camada atribuída (testado).
- **Arrastar e largar**: arrasta da paleta para a faixa. A faixa certa
  acende na cor da camada; a errada fica vermelha, abana e diz a que camada
  a peça pertence. Duplo-clique ou Enter coloca sem arrastar.
- **Ligações automáticas**: ao colocar uma peça, desenham-se as ligações
  válidas às peças já em tela, a partir do grafo `ligaA` do catálogo, com o
  traço do tipo de ligação (nativa/extensão/rede/governa).
- **Verificações em tempo real**: falta de infraestrutura L0, peças que
  precisam do BTP, peças isoladas, e peças que o preset escolhido considera
  fora de cenário ou legado. Cada aviso diz porquê e salta para a peça.
- **Sugestões com origem real**: ordenadas por quantos diagramas oficiais
  da SAP desenham essa peça junto das que já colocaste.
- **Arquitecturas de referência como ponto de partida**: 40 templates
  extraídos das arquitecturas publicadas pela SAP; carrega uma e altera.
- **Exportar** o landscape (peças, ligações, avisos) em JSON.

### De onde vêm os dados do Construtor

`src/builder/mined.js` é gerado a partir do repositório oficial
[SAP/architecture-center](https://github.com/SAP/architecture-center)
(Apache-2.0), que é a fonte do site architecture.learning.sap.com. Foram
lidos os **159 ficheiros `.drawio`** (o formato-fonte dos diagramas) e os
**125 documentos** de arquitectura de referência. Dos rótulos dos diagramas
extraíram-se os componentes e cruzaram-se com o nosso catálogo: **48
serviços** do catálogo aparecem em diagramas oficiais, gerando **162 pares
de co-ocorrência** (≥2 diagramas) e **40 templates**.

O emparelhamento exige correspondência por palavras inteiras — uma primeira
versão por subcadeia dava falsos positivos grosseiros (o rótulo "Network"
casava com *Supply Network Collaboration*, "User" com *User Experience
Management by Knoa*), inflacionando esses dois serviços para 55 e 29
diagramas. Com a correspondência apertada, os pares mais frequentes passam
a ser todos plausíveis: IAS+Integration Suite (32), IAS+Work Zone (31),
Datasphere+SAC (26), BDC+Datasphere (25).

`node validar-construtor.mjs` testa o motor actual: os 340 serviços têm
nível L0..L10, os 162 pares minerados e os 40 templates só referem ids do
catálogo, `podeLigar` respeita `ligaA` nos dois sentidos, `validar` apanha
falta de L0 e peças fora de cenário, `sugerir` nunca repete o que já está
colocado. Nota informativa: 36 dos 40 templates não desenham L0 — os
diagramas oficiais de BTP raramente mostram o hyperscaler, por isso ao
carregar um template o Construtor avisa "precisa de infraestrutura".

**Limite honesto:** só 48 dos 340 serviços são reconhecidos nos diagramas
oficiais, porque o Architecture Center cobre sobretudo BTP, integração,
dados e IA — não o portefólio LoB inteiro. Para os restantes serviços as
sugestões caem apenas no grafo `ligaA` do catálogo, sem reforço documental.

## Nota sobre duas sessões sobrepostas

Este repositório foi tocado por duas sessões que não se viram uma à outra:
uma construiu o Construtor, minerou o repo GitHub e escreveu primeiras
versões de `joule-stack` e `events-actions`; a seguinte (sem esse contexto)
reescreveu `nodes.jsx`, `EsquemaView.jsx` e esses dois esquemas ao contrato
da secção 14. A reescrita não toca no Construtor (que só importa de
`data.js`, `icons.js` e `builder/`). Ficou um `validar-construtor.mjs`
órfão a apontar para `src/construtor/regras.js` (iteração anterior) — foi
substituído por um que testa o motor real; e `viewBuilder` estava
duplicado nos 5 ficheiros i18n — limpo.

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
node validar.mjs             # estrutura do catálogo + casos de teste da busca
node validar-construtor.mjs  # regras de compatibilidade do Construtor
npm run build                # build de produção
```
