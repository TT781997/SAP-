# Conteúdo e recolha documental do SAP Atlas

O Atlas inclui uma biblioteca pesquisável em `knowledge.html`, fichas para as 258 entradas comerciais e nove guias explicados com afirmações e fontes revistas. O mapa Picture e o explorador abrem essas fichas e usam a mesma curadoria.

## O que foi efetivamente recolhido

A recolha de 12/10/2026 abrange todos os ficheiros Markdown dos 36 repositórios documentais SAP-docs identificados, exemplos SAP e documentação/automação publicada por Microsoft, Google, AWS e SUSE no GitHub. São 45 repositórios e 14 903 documentos e man pages, conservados por revisão Git, caminho, hash e licença. O texto original é consultável na biblioteca; não se executam comandos, macros, notebooks ou instruções presentes nas fontes.

O sitemap do Architecture Center forneceu 119 artigos, todos recolhidos. A SAP identifica 61 como arquivados; são excluídos da pesquisa por omissão e continuam disponíveis com esse estado. Os 121 artigos do pacote anterior permanecem no corpus histórico; não são confundidos com a recolha atual.

O índice público do Help Portal contém 1 493 entradas e foi atualizado. O serviço público de pesquisa foi consultado para cada produto com correspondência documental, conservando versão e produto dos resultados. Todos os PDFs públicos devolvidos pelas consultas registadas são tentados, sem aceder a documentos com bloqueio ou autenticação. Foram recolhidos e analisados 373 PDFs (50 684 páginas). Uma das 374 ligações devolvidas pelo índice redireciona para o shell HTML, e essa limitação fica registada. A contagem, os hashes, páginas, secções e falhas estão em `research/refresh-2026-10-12/help-public-guides.json` e `public/knowledge/manifest.json`.

Foi feita uma pesquisa exata no GitHub para cada uma das 258 entradas comerciais. Os primeiros cinco candidatos e o total de resultados ficam registados. Um resultado de pesquisa é um candidato; não é promovido automaticamente a prova técnica.

## Âmbito, versões e direitos de reutilização

A existência de um documento não demonstra que a ficha esteja completa. A cobertura distingue afirmações revistas para o âmbito indicado, secções documentais encontradas por título, descrição comercial e revisão por fazer. A classificação automática de secções é uma ajuda para descobrir documentos; não valida o seu conteúdo. Só a curadoria explícita acrescenta afirmações ao mapa.

As fichas IBP usam guias primários da versão 2502 e distinguem o workshop TechEd 2024, os templates Excel e o exemplo Prophet descontinuado. O índice também contém IBP 2608; não se transpõe automaticamente a configuração 2502 para essa versão. APO usa o guia de operações 7.0 EHP4, com edição do documento de 2016, e distingue o cenário Windows/Azure do guia Microsoft. Estes documentos não confirmam suporte atual da instalação.

O texto licenciado dos repositórios é conservado em arquivos JSON/gzip com a licença e atribuição originais. O leitor mostra esse texto com `textContent`, sem interpretar HTML ou executar instruções. Os arquivos conservam os textos originais; a vista de leitura remove comentários e marcação editorial sem interpretar HTML. Os textos não foram traduzidos; os resumos e a organização do Atlas são derivados e identificados pela data da revisão. SAP-docs e MicrosoftDocs usam CC BY 4.0; os restantes arquivos conservam as respetivas licenças. Os PDFs SAP reservam direitos de reprodução: ficam num cache local ignorado, e o site publica metadados, secções, resumos revistos e a ligação original. Não publica cópias integrais desses PDFs.

O exemplo IBP/Prophet está marcado `NO LONGER SUPPORTED`. O workshop contém uma opção que desativa validação TLS e acessos de formação expirados. Esses elementos ficam identificados na fonte e não são copiados para configuração executável do Atlas.

## Reproduzir

O build normal usa os dados publicados no repositório, sem rede, autenticação ou dependência Python adicional:

```bash
npm run test:knowledge
npm run test:picture
npm run build
```

Para obter novamente a documentação nas revisões Git fixadas e reconstruir o índice:

```bash
python3 scripts/collect_knowledge_sources.py --output-directory /tmp/sap-source-repos
python3 scripts/build_knowledge.py --sources-directory /tmp/sap-source-repos
python3 scripts/integrate_knowledge.py
npm run build
```

Os repositórios descarregados são fontes, não novos projetos da aplicação. O coletor usa sparse checkout para obter prosa/licenças e nunca executa código upstream. Valida a revisão de um cache existente e recusa substituí-lo se estiver noutra revisão. O coletor foi executado e repetido com o cache deste ambiente.

`python3 scripts/collect_sap_help.py` retoma os PDFs das consultas registadas e requer `pdftotext` do Poppler. `python3 scripts/search_sap_github.py` retoma as pesquisas GitHub. Os resultados desta revisão são fixados na pasta de 12/10; iniciar uma nova revisão implica nova data, inventário e revisão das associações. A curadoria é declarada em `research/knowledge-curation.json`; referências ausentes ou ambíguas impedem a integração.

## Pendências reais

O catálogo comercial `www.sap.com` respondeu 403 do próprio site. As descrições e capacidades de 09/10 foram preservadas; não são apresentadas como reconfirmadas em 12/10.

AWS Docs, Microsoft Learn e Google Cloud estão bloqueados pela allowlist em execução. Os domínios adicionais foram guardados no rascunho das definições do ambiente; guardar/publicar esse rascunho é necessário para aplicar a alteração. Os repositórios oficiais desses publishers foram recolhidos pelo GitHub.

A pesquisa de PDFs guarda até cinco resultados por consulta de produto, em inglês; não percorre todas as versões, idiomas ou tópicos do Help Portal. As páginas HTML de documentação devolvem o shell JavaScript. SAP Notes e manuais que exigem conta não foram recolhidos. As lacunas por produto estão visíveis nas fichas. Não se deve declarar o conteúdo de todo o ecossistema SAP completo com base nas contagens de documentos.
