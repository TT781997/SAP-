# Conteúdo e recolha documental do SAP Atlas

Revisão de 13/10/2026. `knowledge.html` reúne fichas para 258 entradas comerciais, nove guias explicados com afirmações citadas e uma biblioteca de 16 168 documentos. O Picture e o explorador usam a mesma curadoria. Estes números descrevem a recolha; não demonstram que todas as edições, funções ou regiões SAP tenham sido revistas.

## Fontes recolhidas

| Fonte | Resultado e âmbito |
| --- | --- |
| GitHub SAP e parceiros | 14 903 documentos Markdown/man pages, 45 repositórios com revisão, caminho, hash e licença. Inclui os 36 repositórios SAP-docs identificados, exemplos SAP e documentação/automação Microsoft, Google, AWS e SUSE. |
| Architecture Center | 119 artigos do sitemap, todos recolhidos; 61 arquivados pela SAP e ocultos por omissão. O corpus anterior permanece identificado como histórico. |
| Help Portal | Índice de 1 493 entradas atualizado em 13/10. Mais 744 tópicos atuais de 70 namespaces, com produto e versão conferidos nas respostas públicas. |
| Guias PDF SAP | 373 PDFs, 50 684 páginas, das consultas registadas em 12/10. Uma ligação adicional devolveu o shell HTML e não foi contada como PDF recolhido. |
| AWS/Microsoft | As 29 fontes oficiais ligadas no mapa foram consultadas diretamente em 13/10. |
| Pesquisa GitHub | Consulta exata para cada uma das 258 entradas comerciais, com até cinco candidatos guardados. Um candidato não é promovido automaticamente a prova técnica. |

Os originais são tratados como fontes de informação. Não se executam comandos, macros, notebooks ou instruções presentes nesses documentos.

## Revisão de produtos e versões

Todas as 258 entradas foram comparadas com o índice atual. A associação principal exige título exato único ou alias único; documentação que apenas menciona o produto fica relacionada. Isso corrige, por exemplo, a precedência de um guia Concur sobre SAP ERP.

Há 139 referências principais. Commerce Cloud e Extended Warehouse Management têm aliases ambíguos; Application Interface Framework e Translation Hub têm títulos partilhados por diferentes namespaces. Essas quatro associações ficam por resolver, em vez de selecionar uma edição arbitrária. Outras entradas não têm uma associação principal inequívoca. Os candidatos estão registados em `research/finish-2026-10-13/version-review.json`.

Os IDs de versão são comparados por referência. Uma diferença não estabelece cronologia, incompatibilidade ou fim de suporte. A biblioteca oculta outras versões por omissão e permite incluí-las explicitamente. A versão instalada, o contrato e o suporte da organização exigem confirmação própria.

As revisões Git dos 45 repositórios foram conferidas: 43 sem alterações; as mudanças globais de `MicrosoftDocs/azure-docs` não afetaram `articles/sap`; um ficheiro de Cloud Identity Services foi atualizado na nova revisão. O inventário conserva os commits e as datas reais de recolha.

## IBP e APO

O ponto principal do guia IBP 2608 HFC5, edição 1.6 de 09/10/2026, foi lido antes da recusa de acesso. A ficha separa áreas funcionais, aplicações e licenças. Explica foundation e advanced supply e as condições para novas subscrições posteriores a 20/04/2026. Contratos anteriores remetem para um guia distinto; não se deduz uma migração automática de licenças. O índice de 1 246 tópicos desse guia foi conservado, mas não se apresenta como 1 246 tópicos lidos.

Os procedimentos IBP 2502 conservam essa versão. O workshop TechEd 2024, os templates Excel e o exemplo Prophet descontinuado têm âmbito explícito. O exemplo contém `NO LONGER SUPPORTED`; o workshop inclui acessos de formação expirados e uma opção que desativa TLS. Esses elementos são identificados na fonte e não são copiados para configuração executável.

APO usa o guia de operações 7.0 EHP4, com edição documental de 2016, e distingue o cenário Windows/Azure do guia Microsoft. A coincidência com a referência 7.0.4 do índice não confirma suporte atual da instalação. As notas centrais, de restrições e de correções referidas pelos manuais não foram lidas quando exigiam acesso indisponível.

## Direitos e cobertura editorial

O texto licenciado dos repositórios é conservado em JSON/gzip com atribuição e licença originais. SAP-docs e MicrosoftDocs usam CC BY 4.0; os restantes arquivos mantêm as respetivas licenças. O leitor usa `textContent`, sem interpretar HTML nem executar instruções. A vista remove marcação editorial sem alterar os arquivos originais. A documentação conserva a língua original; a organização e os resumos do Atlas são derivados com a data da revisão.

Os PDFs SAP e as páginas de publishers sem licença de redistribuição ficam em caches locais ignorados. O site publica metadados, secções, citações e ligação original, não cópias integrais desses manuais. A cobertura distingue afirmações revistas, secções encontradas por título, descrição comercial e revisão específica por fazer. Uma classificação automática de secções não valida o conteúdo. Só a curadoria explícita acrescenta afirmações ao mapa.

## Acessos que continuam indisponíveis

`public/knowledge/completion-review.json` regista o estado `external-access-required`, as ambiguidades e as ações externas necessárias:

- `www.sap.com` devolveu 403 do próprio site. As descrições comerciais de 09/10 continuam identificadas pela data original.
- Os endpoints públicos `deliverableMetadata` e `pagecontent` permitiram ler 744 tópicos. Depois, a SAP passou a devolver HTML `Access Denied`/403, inclusive para páginas públicas anteriormente acessíveis. Esta recusa não prova falta de credenciais. O coletor interrompe novos pedidos ao receber 403.
- Google Cloud redireciona para `docs.cloud.google.com`, bloqueado na verificação deste ambiente. Esse hostname, `me.sap.com` e `support.sap.com` foram guardados no rascunho de rede. Guardar um rascunho não aplica nem publica a configuração.
- Não há sessão SAP autorizada configurada para SAP Notes ou manuais protegidos. Uma referência a uma nota não é apresentada como uma nota consultada.

Não se percorrem todas as versões, línguas e tópicos do Help Portal. A pesquisa inicial de PDFs guarda até cinco resultados por produto; a revisão de tópicos atuais guarda até vinte resultados por consulta. As lacunas por produto continuam explícitas. Recolher mais metadados não elimina a necessidade de revisão editorial.

## Reproduzir e validar

O site usa os dados publicados no repositório sem scraping ou autenticação durante o build:

```bash
npm run test:versions
npm run test:knowledge
npm run test:picture
npm run build
```

Para reconstruir o corpus Git nas revisões fixadas e reaplicar a revisão documental versionada:

```bash
python3 scripts/collect_knowledge_sources.py --output-directory /tmp/sap-source-repos
python3 scripts/build_knowledge.py --sources-directory /tmp/sap-source-repos
python3 scripts/review_sap_versions.py
python3 scripts/finish_sap_knowledge.py
npm run build
```

O coletor usa sparse checkout para obter prosa/licenças, não executa código upstream, valida a revisão do cache e recusa substituí-lo se estiver noutra revisão. Os repositórios de fontes não são novos projetos da aplicação. A integração a partir dos metadados versionados pode ser repetida sem rede.

`collect_sap_help.py` retoma as consultas PDF e requer `pdftotext`/Poppler. `search_sap_github.py` retoma as pesquisas GitHub. Os snapshots de 12/10 e 13/10 ficam separados. A curadoria está em `research/knowledge-curation.json`; referências ausentes ou ambíguas impedem a integração.

`collect_current_sap_help.py` lê apenas tópicos públicos publicados em PRODUCTION. Confere produto, versão e tópico e recusa fallback e respostas fora de PRODUCTION. Os originais ficam em `research/finish-2026-10-13/help-cache` e `html-cache`, ambos ignorados. Só depois de uma alteração real de acesso se deve usar `--retry-denied` para retomar respostas 403; não se deve repetir pedidos recusados sem essa alteração. Não contornar autenticação ou os controlos do publisher.

A validação inclui hashes e licenças do corpus, referências, associações de produto/versão, estados históricos, build e testes de interface em Chromium. O build não depende dos caches privados da recolha.
