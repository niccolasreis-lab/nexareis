# Contato, orçamento, projetos e métricas

Implementação isolada na branch de prévia `design/nicolas-portfolio-20261111`, PR #4. O site público e os dois workflows existentes do n8n não foram alterados nesta etapa.

## Fluxo de contato

Navegador → `/api/contact` (Vercel, mesma origem) → receptor privado autenticado na VPS → SQLite persistente → fila local → webhook `chamaai-lead` existente → Evolution.

O formulário só apresenta “Solicitação registrada” após receber confirmação de gravação e um protocolo. A confirmação não promete entrega ou leitura no WhatsApp. Os aliases do payload, timeout absoluto de 15 segundos, rejeição de respostas sem `ok:true`, preservação dos campos em erro e variável opcional `VITE_CONTACT_WEBHOOK_URL` continuam compatíveis. A variável opcional permite voltar ao endpoint anterior, se necessário.

A mesma tentativa reutiliza a chave de idempotência. O receptor também deduplica conteúdo idêntico durante dez minutos, inclusive entre abas e chamadas concorrentes. Reutilizar uma chave para dados diferentes retorna 409. Não há reenvio automático após timeout ou resultado incerto do n8n; isso evita mensagens duplicadas. O contato continua no banco para revisão pelo responsável.

### Infraestrutura

- Serviço novo e independente: `nexareis-growth`, uma réplica, 96 MB de limite, 0,5 CPU de limite. Sem portas do host publicadas.
- Volume exclusivo: `nexareis-growth-data`, banco `/data/growth.sqlite3`, WAL.
- Rota HTTPS própria: `nexareis-growth.n3hukr.easypanel.host`; arquivo dinâmico separado `nexareis-growth.yaml`. Nenhuma configuração existente foi substituída; nenhum serviço existente precisou reiniciar.
- Credenciais em Docker Secrets. Nenhum segredo `VITE_*`, no repositório, no bundle ou nos logs de aplicação.
- `NEXA_GROWTH_URL` e `NEXA_GROWTH_TOKEN` configuradas somente para a branch de prévia na Vercel. Antes de publicar, configurar valores próprios do ambiente de produção e repetir a validação do formulário publicado.
- Código versionado em `services/growth/`; instalação atual em `/opt/nexareis-growth` na VPS.
- Eventos possuem limites de frequência e dimensões fechadas; notificações não aceitam URL ou destinatário enviados pelo visitante.

### Operação pelo proprietário

O painel `/metricas` exige a chave exclusiva em `/opt/nexareis-growth/metrics-access-key`, acessível ao administrador da VPS. Esta chave é diferente da credencial entre a Vercel e o receptor. Ela é digitada no painel e permanece apenas na memória da página, sem cookies, localStorage, sessionStorage ou URL. Não compartilhar a chave em links públicos. Consultar a chave pelo ambiente administrativo autorizado da VPS.

Pedidos `queued` aguardam o worker. `sending` está em processamento. `accepted` significa que o n8n devolveu o reconhecimento esperado. `rejected` e `uncertain` exigem revisão do proprietário. `sending` interrompido em uma reinicialização vira `uncertain`; não é reenviado.

Para recuperar os dados de contatos incertos, usar uma consulta administrativa local ao volume ou executar `python /app/admin.py pending` no contêiner exclusivo `nexareis-growth` com acesso administrativo. A saída contém dados pessoais e não deve ir para logs públicos ou commits. `admin.py summary` exibe apenas contagens e `admin.py backup --output /data/backups/AAAA-MM-DD.sqlite3` cria um snapshot consistente pelo mecanismo de backup do SQLite. Agendar cópias e retenção conforme a política operacional antes de produção; o volume persistente não substitui backup externo.

Contatos aceitos são removidos após 90 dias. Os não resolvidos ficam disponíveis para revisão e exclusão administrativa. Métricas agregadas ficam por 90 dias, e o painel mostra os últimos 30. Hashes temporários usados no limite de frequência expiram em até dez minutos; IPs brutos não são gravados pelo receptor. Não há identificação de visitantes, cookies analíticos ou dados de formulário nas métricas.

## Orçamento e páginas de projetos

`/orcamento` faz uma indicação determinística pela tarefa escolhida. Não atribui preço, prazo, compatibilidade garantida ou resultado financeiro. As duas escolhas preparam a mensagem do WhatsApp ou preenchem os campos já existentes do formulário. O envio exige uma ação posterior do visitante.

Páginas individuais: `/projetos/chamaai-food`, `/projetos/chamaai-filas`, `/projetos/signageflow`, `/projetos/cesta-esperta`. Capturas reaproveitadas do próprio projeto, com identificação de demonstração ou página pública. CestaEsperta permanece identificado como ilustrativo, sem link de demonstração inventado. Os destinos públicos antigos continuam disponíveis.

## Medição

Eventos: páginas vistas, projetos consultados, demonstrações abertas, cliques no WhatsApp, orçamento guiado concluído e contatos confirmados no site. Interações não representam pessoas únicas nem garantem vendas. Produção e prévia ficam separadas. URLs são reduzidas a rotas conhecidas; queries, fragmentos, mensagens, e-mails, nomes e telefones não são dimensões válidas.

`web-vitals` 6.2.3 carrega em chunk separado e registra LCP, INP e CLS do carregamento do documento. Soft navigations não são habilitadas. O painel mostra número de amostras, média e quantidade dentro dos limites bons; não calcula p75 e não certifica aprovação nos Core Web Vitals. Respeita Do Not Track e Global Privacy Control. Falhas na coleta não bloqueiam navegação ou formulário. Requisições de mesma origem podem usar a autenticação já existente da prévia protegida; o proxy não encaminha cookies ao receptor nem os grava nas métricas.

## Evidência do teste real

Foi enviada uma única notificação técnica identificada como teste ao destino comercial fixo já usado pelos workflows. Duas chamadas idênticas ao receptor retornaram o mesmo protocolo `NR-16B83F941BE6CD68`; o banco contém um único registro, no estado `accepted`. A Evolution registrou uma mensagem de saída para o destino esperado. O status inicial foi `PENDING`; a atualização da mesma mensagem posteriormente registrou `DELIVERY_ACK`. A entrega recebeu confirmação da Evolution; leitura não foi comprovada. Nenhum teste de CI envia mensagens reais.

## Reversão

A prévia é reversível pelo Git. Para desativar a nova camada, pode-se voltar ao webhook anterior pela variável `VITE_CONTACT_WEBHOOK_URL` e reconstruir a prévia. Para interromper a infraestrutura nova, remover somente o serviço `nexareis-growth` e seu arquivo de rota, preservando volume e segredos até encerrar a análise dos pedidos. Não remover volumes, alterar n8n ou reiniciar serviços de outros projetos.

Backup de verificação criado no volume em `/data/backups/growth-2026-11-11.sqlite3`. O teste de restauração retornou `PRAGMA integrity_check = ok` e recuperou o único contato sintético. O receptor em execução usa a imagem `nexareis-growth:20261112-1`, com o mesmo código versionado de deduplicação transacional.
