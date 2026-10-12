# Corpus SAP para estruturar o Atlas

## Estado real da recolha

Em 11 de outubro de 2026, os três sites solicitados responderam com `Tunnel connection failed: 403 Forbidden` no proxy do ambiente. Não existe uma nova recolha online concluída. Os domínios `www.sap.com`, `help.sap.com` e `architecture.learning.sap.com` foram guardados no rascunho da configuração de rede; a alteração tem de ser guardada nas definições do ambiente antes de retomar.

Enquanto o acesso está bloqueado, foi organizado o conteúdo do ZIP fornecido pelo utilizador. A data de origem declarada é 9 de outubro de 2026. Os hashes de todas as 121 páginas HTML de arquitetura coincidem com os hashes dos metadados do pacote. Isto confirma consistência interna do pacote, não a atualidade nem uma verificação independente junto da SAP.

## Ficheiros estruturados

Disponíveis em `public/sap-corpus/`, incluídos na compilação e acessíveis como ficheiros JSON:

| Ficheiro | Conteúdo | Alcance |
|---|---|---|
| `commercial-products.json` | 258 entradas, URLs, grupo alfabético e campos comerciais originais, incluindo descrições | Índice A–Z do pacote; não todo o texto das páginas de produto |
| `documentation-products.json` | 1 493 nomes, IDs, aliases, URLs e indicação de ocultação | Metadados do índice; não os manuais completos |
| `documentation-hierarchy.json` | Taxonomia documental, níveis e relações pai/filho | Estrutura editorial da documentação; não dependências técnicas |
| `reference-architectures.json` | 121 artigos: texto, títulos hierárquicos, ligações, imagens, metadados e SHA-256 | Texto dos artigos HTML incluídos; imagens e documentos externos não descarregados |
| `product-documentation-candidates.json` | Correspondências comerciais/documentais já existentes | Candidatos por nome/alias; edição por validar |
| `manifest.json` | Origem, data, contagens e limites da extração | `liveVerified: false` |

Os HTML originais de arquitetura foram preservados em `research/snapshots/2026-10-09/`, por SHA-256. Não são publicados como páginas executáveis do Atlas. Os resultados de acesso atuais estão em `research/live/manifest.json`.

## Modelo de organização proposto

Manter entidades distintas para **família de produto**, **oferta comercial**, **edição**, **versão**, **guia documental**, **arquitetura de referência**, **componente técnico**, **relação** e **afirmação com evidência**. Uma relação editorial pai/filho no Help Portal não demonstra que um componente aloja, chama ou depende de outro.

Cada afirmação técnica deverá guardar: sujeito, relação, objeto, edição/versão, cenário de deployment, provider, região, condição, URL da fonte, secção ou trecho de suporte, data da recolha e estado de validação. Estados sugeridos: extraído da fonte, candidato por correspondência, validado para o âmbito indicado, não confirmado e histórico. Não transformar «não confirmado» em «indisponível».

Organizar os conteúdos em: aplicações de negócio; ERP/ABAP/HANA; dados e analytics; integração e APIs; desenvolvimento e BTP; identidade e segurança; IA; infraestrutura e operação. A classificação é uma camada do Atlas a validar, não uma taxonomia atribuída automaticamente à SAP.

Separar sempre infraestrutura operada pelo cliente, RISE gerido pela SAP e plataforma BTP gerida pela SAP. Menções a AWS, Azure ou GCP num artigo não comprovam alojamento, suporte, exclusividade ou disponibilidade regional. Correspondências entre produtos e documentação exigem validação de edição.

## Reproduzir e retomar

Sem dependências Python adicionais:

```bash
cd /workspace/SAP-
python3 scripts/collect_sap.py --archive '/caminho/SAP-Atlas-projeto-completo(1).zip'
python3 scripts/collect_sap.py --live --max-pages 20
```

A importação do ZIP utiliza também `public/research-data.js`, já presente no projeto. A recolha online guarda bytes originais, texto, ligações, hashes, erros e URLs pendentes. Respeita `robots.txt`, limita o âmbito aos três hosts e às rotas de produto/documentação, usa uma pausa entre pedidos e interrompe perante uma negação de acesso. Páginas já recolhidas são reutilizadas. Retomar após a correção da rede repete apenas páginas não recolhidas e pedidos pendentes. Sem `--max-pages`, percorre as URLs descobertas nesse âmbito.

O Help Portal é uma aplicação dinâmica. Este coletor HTML assinala páginas com pouco texto para extração por navegador/API; não se deve declarar que todos os tópicos de todos os manuais foram recolhidos. Depois de o acesso funcionar, será necessário inspecionar os endpoints e a paginação atuais dos três índices, confirmar o inventário de URLs e validar a cobertura de tópicos, versões, idiomas, PDFs e diagramas antes de afirmar completude. Links que exigem login ou outros domínios ficam fora deste coletor.
