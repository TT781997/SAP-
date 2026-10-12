# Estrutura e significado do mapa

SAP S/4HANA → edições on-premise, Cloud Private Edition e Cloud Public Edition. São alternativas de oferta.

Na edição on-premise, a arquitetura de referência contém ABAP Platform (PAS, AAS, ASCS, ERS e a opção embedded do SAP Fiori front-end server), SAP HANA Database, SAP Web Dispatcher, filesystems e componentes HA. A edição privada referencia esse padrão técnico sem assumir que o cliente administra os hosts. A edição pública apresenta configuração de integração e trust IAS, sem aprovisionar VMs do cliente.

SAP Integration Suite contém capacidades de integração. SAP Cloud Identity Services contém Identity Authentication, Identity Provisioning, Identity Directory e Authorization Management. SAP Event Mesh e SAP AI Launchpad mantêm a identidade de serviços próprios. Dependências Git, container registry e object storage não são apresentadas como partes internas de SAP AI Core.

Os produtos de negócio têm o nome próprio na visão geral. AWS, Microsoft Azure e Google Cloud são fornecedores, não produtos SAP. Categorias de navegação e fronteiras lógicas estão identificadas como tal.

Fluxos e dependências: ações e pré-requisitos. Composição e alojamento: organização, edições alternativas, região e referência de arquitetura. As relações lógicas não representam tráfego. Cada seta inclui origem, destino, ação, protocolo, condição e fonte quando documentada.

Limitação: a presença no índice comercial não confirma disponibilidade por fornecedor. Consulte a matriz e a fonte específica da edição. Componentes ainda não decompostos não devem ser interpretados como produtos sem dependências.

# Recolha SAP e filtros de infraestrutura — 9 outubro 2026

## Cobertura verificada

- 258 entradas e URLs únicas no índice comercial SAP A–Z.
- 1 493 registos devolvidos pelo índice Help Portal: 1 260 com URL; destes, 1 236 não estão ocultos na taxonomia oficial.
- 121 rotas de arquitetura descobertas e 121 páginas legíveis.
- 143 produtos com candidato documental por correspondência exata de nome ou alias; é necessário validar a edição.
- 231 registos técnicos anteriores mantidos; 6 sem correspondência de URL no índice atual preservados no arquivo.

Os índices completos e as páginas de referência descobertas foram recolhidos. Não foram lidos todos os tópicos dos manuais Help Portal nem todas as subpáginas comerciais. Uma menção a AWS, Azure ou Google Cloud não demonstra alojamento, disponibilidade regional ou exclusividade.

## Como usar

Escolha Contexto on-premise para ver apenas infraestrutura local. AWS, Azure ou GCP mostram apenas recursos desse fornecedor. As duas pontas de cada ligação têm de pertencer ao âmbito visível. Produtos SAP geridos mantêm a sua identidade; não se tornam recursos da conta cloud do cliente.

Commerce Cloud 2211 tem uma regra de alojamento Azure documentada. Service Cloud Version 2 tem uma regra AWS com âmbito limitado ao guia dessa oferta. Quando o fornecedor escolhido difere, o produto mostra uma exceção com a fonte; a infraestrutura estrangeira fica excluída. Disponibilidade não confirmada não é apresentada como suporte ou proibição.

«Comparar clouds» e «Produtos × clouds» são vistas explícitas de comparação. Diagramas SAP originais conservam a topologia da fonte e não são reescritos como inventários filtrados.

O botão «Fontes SAP» permite pesquisar os três índices, abrir as fontes e exportar os metadados.

## Fontes de entrada

- https://www.sap.com/products/a-z.html
- https://help.sap.com/docs/all-products
- https://architecture.learning.sap.com/docs/ref-arch

Consulte fontes.md para as fontes técnicas de cada componente e ligação.
