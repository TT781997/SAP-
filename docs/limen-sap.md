# Limen aplicado ao SAP Atlas

## O que está integrado

O pacote MIT de `overment/limen` foi incorporado sem alterações em `vendor/limen`, fixado no commit `102b009ad1c035f49fbde54f5e23c73eb6b01db7`. `UPSTREAM.json` regista a origem e `LICENSE` conserva a licença. A interface SAP é montada por um adaptador; as futuras atualizações do pacote devem preservar a revisão e repetir as validações.

O Picture original permite seleção de grupos e produtos, pesquisa, relações direcionais, destaques, percursos ordenados com visitas repetidas e camadas encadeadas. Escape e Back fecham a camada superior; URLs conservam a seleção e a pilha. O adaptador acrescenta detalhes funcionais, fontes e filhos de componentes às camadas, traduz os controlos principais e oferece um regresso ao explorador técnico.

A vista inclui todas as 258 entradas comerciais do corpus, os componentes técnicos, 337 relações existentes e cinco percursos pedagógicos: organização BTP, login BTP, IBP, APO e pedido ERP. A organização comercial é distinta da decomposição técnica. Agrupamentos, planos e percursos não criam relações de rede nem comprovam licenciamento, alojamento ou disponibilidade por região. O conteúdo continua parcial, com proveniência dos anexos; não houve nova recolha online completa.

O vídeo do X não pôde ser consultado devido ao bloqueio de rede. Os comportamentos acima foram implementados e validados a partir do código e da documentação do Limen. A equivalência exata com o vídeo ainda não foi verificada.

## Construir e abrir

```bash
npm install --package-lock=false
npm run test:picture
npm run build
npm run dev
```

Abrir «Mapa de produtos · Picture» no explorador ou «Mapa Picture» na página inicial. O build gera `public/sap-picture.html` e `public/sap-picture-model.json`, depois o Vite copia-os para `dist/`. O ficheiro HTML é autónomo; o renderizador não faz chamadas a modelos. O link de regresso e as fontes documentais exigem o site ou Internet. O dataset Markdown em `.limen/picture` e as páginas geradas são ignorados pelo Git; fontes e gerador permanecem versionados. Não editar outputs.

O vocabulário nativo Limen descreve dependências de código. O adaptador guarda `sap-relation` nos metadados e restaura os rótulos SAP no modelo publicado. Assim, localização, trust e autenticação não aparecem falsamente como dependências de código. Para a página SAP, usar `npm run picture:build`; `npm run limen -- picture build --strict` serve como validação estrutural do dataset nativo.

## Fluxo de agentes

O projeto tem visão em `spec/vision.md`, quadro em `spec/build.md`, prática de implementação em `.agents/limen/styleguide.md` e extensões Limen para Pi/OMP. Pi 1.1.0 está instalado; OMP e Herdr são opcionais e não foram instalados.

```bash
npm run agents:doctor -- --provider openai-codex
npm run agents
```

No Pi, usar `/login` para autenticar um provider e selecionar um modelo disponível. Conservar credenciais apenas no armazenamento de autenticação suportado; nunca em ficheiros versionados ou no chat. O wrapper reutiliza um armazenamento Pi existente; na ausência dele usa `.limen/pi-agent`. O provider/modelo de worker e reviewer devem ser registados no quadro. O check atual devolveu `not_ready`; nenhum job autenticado foi executado.

Depois da autenticação, dar ao coordenador uma tarefa como: «Aprofunda a integração SAP IBP com ERP usando a documentação por versão, conserva fontes e limites, prepara o candidato e pede revisão». O coordenador usa tickets, inicia workers, lê logs e inicia a revisão. Jobs Limen correm em worktrees próprios quando o utilizador invoca este workflow; tarefas cloud normais usam o checkout existente.

Comandos de operação:

```bash
npm run limen -- ticket new 'Resultado verificável para um produto SAP' --touches sap-ibp
npm run limen -- jobs
npm run limen -- status
npm run limen -- spawn --engine pi --provider PROVIDER --model MODELO --thinking high --detached --label F001-ibp 'Executar o ticket F001; conservar fontes e validar o resultado.'
npm run limen -- diff ID_DO_JOB
npm run limen -- wait ID_DO_JOB
```

Substituir provider/modelo pelos valores autenticados; não são credenciais. O wrapper recusa execução Pi sem autenticação ou escolha de modelo. Antes de `limen land`, rever candidato, checks e resultado do reviewer e obter a decisão humana de merge. Não existe merge automático nesta integração.

As duas tarefas iniciais são planeadas: documentação IBP/APO e trust/regiões BTP. Não foram marcadas como concluídas.

## Monitorização real

```bash
npm run picture:live
npm run dev
```

O primeiro comando inicia o monitor local na porta 4747. O segundo permite consultar `/sap-live/` através do proxy Vite. O monitor publica eventos SSE dos ficheiros reais de `.limen/jobs`, com o leitor de atividade original do Limen. Não inicia agentes por abrir a página e não inventa jobs ativos. A página estática publicada inclui o mapa e os tickets do build; a atividade em direto exige este processo local. Processos não sobrevivem necessariamente a novas tarefas cloud.

## Validação efetuada

Cinco testes automatizados verificam cobertura do catálogo, relações e endpoints, ordem e repetição dos percursos, integridade do modelo e inserção segura do JSON. Build e dataset estrito passaram. Chromium validou pesquisa IBP, fontes nas camadas, camadas aninhadas, Escape, restauro, percurso BTP, Global Account → Subaccount, tarefas planeadas, ecrã estreito e ligação ao monitor. A atividade reportou zero jobs, coerente com o estado real. A execução de um worker foi bloqueada por `not_ready`, antes de criar um job.
