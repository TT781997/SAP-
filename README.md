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
