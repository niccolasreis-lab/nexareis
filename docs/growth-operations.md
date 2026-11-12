# Contato, orçamento, projetos e métricas

Publicado em produção em 12/11/2026, após os PRs #4, #5 e #6. A validação pelo domínio público está registrada em [production-release-2026-11-12.md](production-release-2026-11-12.md).

## Fluxo de contato

Navegador → API de mesma origem → armazenamento persistente → fila de notificação → integração existente.

O formulário só apresenta “Solicitação registrada” após receber confirmação de gravação e um protocolo. A confirmação não promete entrega ou leitura no WhatsApp. Os campos e as opções existentes foram preservados, incluindo contato geral e parcerias. O prazo máximo da requisição é de 15 segundos, e os campos permanecem preenchidos em caso de erro.

A mesma tentativa reutiliza a chave de idempotência. O receptor também deduplica conteúdo idêntico durante dez minutos, inclusive entre abas e chamadas concorrentes. Reutilizar uma chave para dados diferentes retorna 409. Não há reenvio automático após resultado incerto da notificação; o contato continua disponível para revisão administrativa.

Pedidos na fila aguardam processamento. A confirmação da integração não equivale à confirmação de leitura pelo destinatário. Pedidos rejeitados ou de resultado incerto exigem revisão administrativa, sem reenvio automático. A instalação, as credenciais, os backups e a recuperação são mantidos no registro administrativo privado.

Contatos aceitos e métricas agregadas têm retenção de 90 dias; o painel mostra os últimos 30. Contatos não resolvidos permanecem para revisão administrativa. As métricas não incluem dados do formulário nem identificam visitantes. A configuração interna do receptor não é exposta pelo site.

## Orçamento e páginas de projetos

`/orcamento` faz uma indicação determinística pela tarefa escolhida. Não atribui preço, prazo, compatibilidade garantida ou resultado financeiro. As duas escolhas preparam a mensagem do WhatsApp ou preenchem os campos já existentes do formulário. O envio exige uma ação posterior do visitante.

Páginas individuais: `/projetos/chamaai-food`, `/projetos/chamaai-filas`, `/projetos/signageflow`, `/projetos/cesta-esperta`. Capturas reaproveitadas do próprio projeto, com identificação de demonstração ou página pública. CestaEsperta permanece identificado como ilustrativo, sem link de demonstração inventado. Os destinos públicos antigos continuam disponíveis.

## Medição

Eventos: páginas vistas, projetos consultados, demonstrações abertas, cliques no WhatsApp, orçamento guiado concluído e contatos confirmados no site. Interações não representam pessoas únicas nem garantem vendas. Produção e prévia ficam separadas. Queries, fragmentos, mensagens, e-mails, nomes e telefones não são dimensões válidas.

A medição registra LCP, INP e CLS do carregamento do documento. O painel mostra número de amostras, média e quantidade dentro dos limites bons; não calcula p75 e não certifica aprovação nos Core Web Vitals. Respeita Do Not Track e Global Privacy Control. Falhas na coleta não bloqueiam navegação ou formulário.

O painel `/metricas` exige uma chave administrativa própria, mantida apenas na memória da página. A chave não é gravada em cookies, armazenamento do navegador ou URL. O painel está marcado para não indexação, e a API exige autenticação independentemente dessa marcação.

## Reversão

As alterações são reversíveis pelo Git e pelo rollback do deployment. Preservar os dados persistentes até encerrar a revisão dos pedidos. Os procedimentos e os acessos necessários para a operação ficam no registro administrativo privado.
