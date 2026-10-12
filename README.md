# SAP Atlas

Aplicação de exploração da arquitetura SAP, AWS, Azure e Google Cloud, aplicada a partir dos pacotes SAP Atlas fornecidos. A página principal abre o explorador técnico, os inventários, as relações e as fontes documentais.

## Desenvolvimento

Requer Node.js 24 e npm. Sem backend, login ou variáveis de ambiente.

```bash
npm install --package-lock=false
npm run dev
npm run build
npm run preview
```

A compilação verifica também os tipos do código React anterior, conservado em `src/`. A aplicação principal é agora a versão estática SAP Atlas: `index.html`, `explorer.html` e `publicar.html`. Os scripts clássicos, estilos, dados e 159 diagramas ficam em `public/` e são copiados para `dist/` pelo Vite. Os scripts usam dados globais e conservam a ordem de carregamento original.

## Publicação

No Vercel, usar `npm run build` e o diretório `dist`. As três páginas estão incluídas na compilação. A configuração SPA existente permanece disponível. Nenhuma publicação automática é executada.

## Conteúdo e limitações

Os dois anexos contêm a mesma aplicação. Do pacote completo foram também incluídos os diagramas JSON de apoio; capturas de ecrã, históricos de recolha e scripts de revisão não fazem parte do site publicado.

O mapa e os dados funcionam localmente. Vídeos, áudio ambiente, fontes tipográficas e ligações documentais externas dependem da Internet. Os limites e a proveniência dos dados encontram-se em `public/LEIA-ME.md`, `public/fontes.md` e `public/validacao.json`. As contagens declaradas nesses documentos pertencem ao material fornecido.

## Navegação e planeamento

O painel de detalhes pode ser recolhido e reaberto no cabeçalho; a preferência é conservada no navegador. A navegação separa produtos/processos, plataforma/integração/identidade e infraestrutura/operação. O mapa mostra todas as relações por omissão; a vista BTP inclui um atalho para a estrutura de contas, distinguindo composição de tráfego.

A secção «Planeamento da cadeia logística» explica capacidades de SAP IBP e SAP APO a partir do catálogo fornecido, com ligações à documentação por versão. São sínteses funcionais, não uma validação da instalação, do licenciamento ou dos mecanismos de integração. Os agrupamentos de capacidades não representam tráfego ou componentes obrigatórios.

## Picture e agentes Limen

O [guia de integração](docs/limen-sap.md) explica o mapa Picture, o workflow de tarefas e a monitorização. O mapa é reconstruído por `npm run picture:build`; os checks estão em `npm run test:picture`. Para trabalhar com agentes, usar `npm run agents:doctor` e `npm run agents`, autenticar no Pi e selecionar provider/modelo antes de executar jobs. A execução autenticada continua pendente.
