# Mapa do Ecossistema SAP

Aplicação web single-page, 100% client-side, que mapeia o ecossistema
tecnológico SAP em 6 camadas — de infraestrutura a LoB/SaaS/IA — através de
três cenários de adopção: **On-Premise Tradicional**, **Cloud Pública** e
**Híbrido (RISE with SAP)**.

Sem backend, sem APIs externas, sem login. Todos os dados vivem em
`src/data.js` e são compilados para um bundle estático.

## Como correr

```bash
npm i
npm run dev
```

Abre o URL que o Vite mostrar no terminal (por defeito `http://localhost:5173`).

Para gerar a versão de produção (ficheiros estáticos prontos a alojar em
qualquer servidor HTTP, sem Node):

```bash
npm run build
npm run preview   # opcional: pré-visualiza o build de produção localmente
```

## Como usar

- **Três botões de cenário** no topo alternam a "história" do diagrama —
  os cards e ligações relevantes ganham destaque, o resto atenua ou some.
- **"Mostrar legado"** revela, como fantasmas tracejados, os sistemas
  on-premise que um cenário cloud/híbrido deixa para trás (data center,
  HANA on-premise, S/4 any-premise, PI/PO).
- **Seletor de hyperscaler** (AWS/Azure/GCP) só é relevante em Cloud
  Pública e RISE — troca o card de infraestrutura L0 e o respectivo texto.
- **Clicar num card** abre o painel de detalhes à direita (ou em bottom-sheet
  em ecrãs < 1024px); os chips em "Relaciona-se com" saltam para o serviço
  ligado.
- **Clicar numa ligação** mostra a origem, o destino e o padrão de
  integração (API, evento, iFlow, replicação, etc.).
- **Pesquisa** no cabeçalho encontra um serviço por nome mesmo que esteja
  escondido no cenário actual.

## Editar o conteúdo (`src/data.js`)

Este é o único ficheiro que precisa de ser tocado para manter o conteúdo:

- `LAYERS` — as 6 camadas e a cor de cada uma.
- `SCENARIOS` — nome, frase do chip e resumo de cada cenário.
- `SERVICOS` — o catálogo completo. Cada serviço tem `oQueFaz`,
  `paraQueServe`, `exemploReal` (texto do painel) e `contextoPorCenario`
  (a frase "Neste cenário" para cada um dos 3 cenários).
- `TABELA_CENARIOS` — quem está *activo* ou *atenuado* em cada cenário;
  tudo o resto fica automaticamente *escondido*. Esta é a tabela a editar
  se quiseres mudar quem aparece onde.
- `classificarLigacao` — heurística (editável) que decide se uma ligação é
  "rede", "extensão" ou "nativa" consoante os ids dos dois extremos.

Para adicionar um serviço novo: acrescenta uma entrada em `SERVICOS`
(incluindo `contextoPorCenario` para os 3 cenários), escolhe um ícone
existente em `src/icons.js` (ou acrescenta um novo par
`chave: ÍconeLucide`), e decide em `TABELA_CENARIOS` onde deve aparecer
como activo/atenuado.

## Stack

React 19 + Vite 8, Tailwind CSS v4 (config "CSS-first" em `src/index.css`,
sem ficheiro `tailwind.config.js`), Framer Motion para as transições e
`lucide-react` para os ícones — sempre genéricos/geométricos, nunca
logótipos reais de marcas (SAP, AWS, Azure, GCP).

## Correr dentro do Streamlit

A app é React puro — o Streamlit não a executa nativamente, só a pode
**incorporar**. `streamlit_app.py` faz isso: lê o build de produção,
embebe o CSS e o JS compilados directamente no HTML (referências para
`/assets/...` quebrariam dentro do iframe) e mostra o resultado via
`st.iframe`, que mede a altura real do conteúdo.

```bash
npm i && npm run build   # streamlit_app.py corre isto sozinho se faltar dist/
pip install -r requirements.txt
streamlit run streamlit_app.py
```

Duas coisas a saber antes de decidir se isto é o caminho certo:

- É sempre um iframe: a app corre isolada dentro da página Streamlit, sem
  ligação entre o estado Python e o estado React (não dá, por exemplo,
  para ler o cenário seleccionado a partir de código Streamlit à volta).
  Para este mapa — que já é 100% autónomo — isso não perde funcionalidade
  nenhuma, só significa que o Streamlit está a servir de "moldura".
- Se só precisas de mostrar isto a alguém ou alojá-lo algures, sem
  precisares que viva dentro de uma app Streamlit existente, é mais
  simples pôr `dist/` (depois de `npm run build`) em qualquer alojamento
  estático — `npx serve dist`, Azure Static Web Apps, GitHub Pages, etc.
  — do que passar pelo Streamlit.
