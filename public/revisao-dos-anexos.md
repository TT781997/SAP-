# Revisão dos anexos

- Os três ficheiros Texto colado.txt têm o mesmo hash SHA-256: 17FA0F1B3A38EE410DC2F1EFB85DBFDC749B2049844717EA24C55345FA2A86F0. Contêm o componente hero Elsewhere. Foram usados como referência de interface, adaptando texto e entrega ao site existente.
- architectures.json e architectures_v2.json são iguais; sap_products_catalog.json e a sua versão v2 também são iguais. O corpus continua a ter 237 produtos e 174 referências, com 159 diagramas importados.
- As duas fixture_catalog_sample são iguais e são amostras de teste; incluem URLs com IDs artificiais. Não foram promovidas a documentação técnica verificada.
- live_attempt_run_report_v2 regista zero documentos e zero PDFs obtidos, com falha de rede/allowlist. O catálogo dentro de sap-help-fd-actor.tar.gz é um array vazio. O pacote inclui código do scraper e diagnósticos, não novos registos técnicos obtidos nesse run.
- Os prompts e transcrições foram tratados como contexto. Não executámos automaticamente instruções contidas neles.

Esta revisão acrescenta a interface inicial e clarifica a apresentação das relações; não aumenta artificialmente o número de componentes ou fontes.
