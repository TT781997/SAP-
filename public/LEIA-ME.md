# SAP Atlas · arquitetura técnica

Versão de 8 de outubro de 2026.

Abra index.html no navegador para a página inicial. Clique em Explorar arquitetura para abrir explorer.html. O mapa e os diagramas estão incluídos no pacote e não precisam de um servidor ou conta cloud. As fontes externas e as fontes tipográficas necessitam de Internet; sem elas é usada a fonte do sistema.

## O que mudou

- 164 blocos/grupos e 174 relações técnicas com direção e ação definida.
- Cada relação apresenta origem, destino, função, protocolo/transporte, segurança, condição e fontes.
- Grupos internos, vizinhos externos, entradas e saídas, filtros por tipo de relação e rótulos clicáveis.
- Inventários por fornecedor: AWS (18 componentes), Azure (19), Google Cloud (15).
- Comparação de 15 funções: compute, SO, rede, firewall, persistência, partilhas, conectividade, VIP/HA, identidade, observabilidade, backup, automação e disponibilidade.
- ERP/ABAP/HANA decompostos em PAS/AAS, ASCS/Message Server/Enqueue Server, ERS, DB primária/secundária/DR, volumes, cluster e fencing.
- BTP, runtimes alternativos, CAP, destinos, identidade, Cloud Connector, Integration Suite, Edge Integration Cell e AI Core.
- Fronteiras RISE próprias de cada provider, separadas da instalação IaaS que o cliente opera.
- Catálogo original: 237 produtos e 174 referências. 159 draw.io importados em 166 páginas.

## Utilizar

Selecione um grupo na árvore. Cada bloco tem um ícone de função. Um clique num bloco apresenta detalhes; um duplo clique abre as partes. Clique no número L01, L02… ou no percurso de uma relação para consultar o que faz. Use Ligações para consultar uma tabela com origem, destino, ação e protocolo. As listas Entradas/Saídas também abrem a ligação. Esc sobe um nível; / abre a pesquisa.

Selecione o provider e use Inventário para consultar recursos, pré-requisitos, configuração/operação e responsabilidade. O inventário pode ser exportado em JSON. Alternativas de storage, conectividade e runtime não têm de ser usadas simultaneamente.

A direção segue a ação: um host aloja software, um cliente chama uma API, um agente grava backups. «Compõe» descreve estrutura, não tráfego de rede. A seta que inicia um túnel não afirma que os dados só possam circular nesse sentido.

## Proveniência e alcance

As 92 fontes são ligadas às fichas e relações. O mapa técnico é uma síntese de padrões documentados; não é uma certificação de uma instalação específica. Os ficheiros fornecidos foram tratados como dados e referências.

Os diagramas importados conservam conectores e pontas explícitos, com disposição reorganizada. Dos 1615 conectores, 1561 não têm rótulo textual no XML e 25 referem endpoints que não são vértices importados. A interface assinala estas lacunas; não inventa protocolos/funções para as preencher.

Os 237 produtos do catálogo não estão todos decompostos ao nível de serviços internos. Os registos de negócio ainda sem aprofundamento têm essa indicação. Esta versão aprofunda o stack ERP/HANA, integração, BTP, IA e infraestrutura de três clouds.

Os valores finais de tamanho de VM, IOPS/throughput, portas, revisões de HANA, versões de SO, região e âmbito RISE dependem do sistema. As fichas distinguem requisitos obrigatórios, condicionais e alternativas e ligam às matrizes/guias relevantes.

## Ficheiros

- index.html, technical.js e CSS: aplicação editável, sem etapa de compilação.
- technical-data.js: dados carregados pela aplicação.
- reference-data.js: diagramas do corpus incluídos para consulta offline.
- arquitetura-tecnica.json: exportação legível de dados e fontes.
- fontes.md: índice das fontes oficiais.
- validacao.json: contagens, verificações e limitações.

Não são criados recursos AWS/Azure/GCP nem executadas instalações SAP por esta aplicação.

## Atualização visual

Hero adaptado da referência Elsewhere fornecida: vídeo dia/noite, textos do projeto e som ambiente opcional. Os vídeos são carregados dos URLs externos incluídos na referência. O mapa conserva os componentes e dados, com tema claro, azuis SAP e ícones SVG. Os percursos das setas são ortogonais e têm portas separadas; a numeração corresponde à vista Ligações.

Consulte publicar.html para os passos detalhados de publicação manual no Netlify, teste de acesso, domínio, atualização e resolução de problemas. A criação do guia não significa que o site foi publicado.

## Integração SAP e cloud providers

Um segundo clique no pai da árvore recolhe as partes e, quando o mapa está nesse grupo, regressa ao nível acima. Os grupos têm indicador de abertura e estado acessível.

BTP: a subaccount associa-se a uma região; a infraestrutura do provider suporta a plataforma operada pela SAP. O exemplo Cloud Foundry apresenta runtime e aplicação CAP. AWS eu10 / Frankfurt é um exemplo documentado; confirme disponibilidade dos planos e serviços. A relação de localização e a de alojamento não representam tráfego.

Cada provider inclui uma fronteira BTP gerida pela SAP, além do inventário IaaS original. A vista BTP mostra apenas o provider selecionado. Os recursos IaaS na conta do cliente são uma instalação separada; a integração com BTP exige API ou conectividade configurada, mesmo quando estão no mesmo provider. A ficha BTP inclui ligações navegáveis ao runtime, aplicação e Cloud Connector.

## Autenticação e produtos × clouds · 9 de outubro

Use «Login BTP · IAS» para abrir o percurso administrativo e o percurso da aplicação. O trust de plataforma é configurado no global account; o trust de business users é configurado na subaccount. IAS pode federar com Entra ID/outro IdP; XSUAA emite tokens no padrão CF da aplicação; role collections/scopes determinam autorização. IPS não é o serviço que executa o login. O IdP padrão e o IAS personalizado são alternativas de configuração, não etapas obrigatórias em sequência. Ferramentas e ambientes têm restrições próprias.

«Produtos × clouds» apresenta todos os 237 registos do catálogo, com coluna AWS, Azure e GCP, modelo, operação, condição e fontes. 31 registos têm evidência de combinação ou padrão de stack relacionado; 206 ainda não têm combinação documentada nesta revisão. A marca «Padrão do stack · por validar» não certifica uma funcionalidade S/4HANA específica. «Não confirmado» não significa indisponibilidade. Não foi concluída a decomposição técnica integral dos 237 registos.

Commerce 2211 tem Kubernetes/containers, Azure SQL e Blob identificados separadamente. HANA Cloud, Analytics Cloud, BDC/Datasphere, SuccessFactors, Document AI, Cloud Appliance Library, Integration Suite e Service Cloud Version 2 têm informação própria de providers. Não se assume que todos os serviços partilham a região da subaccount BTP. Adaptadores Azure Storage/Service Bus e Google Storage/Pub/Sub são ligações externas, não prova de alojamento nesses providers.

Foram tentadas as 237 páginas comerciais: 112 responderam com conteúdo legível nesta execução; as restantes exigem verificação alternativa. As referências comerciais foram preservadas.

## Expansão no mapa

Um clique num quadrado com partes expande os componentes no mesmo diagrama. Outro clique recolhe o grupo e os subgrupos. As ligações passam a apontar para os componentes visíveis; a vista principal permanece. A árvore lateral permite abrir uma vista isolada. A expansão fica guardada no endereço para recarregar a página. A vista geral contém nove domínios, incluindo ERP/HANA, produtos de negócio e os três providers, além de BTP.

174 blocos e 184 relações nesta revisão. Acrescentados SYSTEMDB/name server e tenant/index server em HANA, bem como Integration Advisor, Trading Partner Management, Open Connectors, advanced event mesh, Integration Assessment e Migration Assessment. Capacidades opcionais não são uma lista de serviços obrigatórios. A decomposição completa do catálogo ainda não está concluída. Os diagramas draw.io importados continuam a conservar a topologia da fonte, sem inventar hierarquia interna.

## Estrutura explícita dos produtos

Consulte estrutura-do-mapa.md. SAP S/4HANA está identificado na visão geral, com três edições. Os nomes e as classificações foram revistos; selecione «Fluxos e dependências», «Composição e alojamento» ou «Todas as relações». A vista geral inicial apresenta os produtos sem sobrepor todas as relações; expanda um produto para consultar as ligações.

## Atualização de 9 outubro 2026

As contagens históricas acima descrevem revisões anteriores. A versão atual contém 195 componentes, 327 relações e 104 fontes técnicas. Ver recolha-sap.md para a cobertura atual, os filtros e as limitações.
