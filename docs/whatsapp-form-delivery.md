# Formulários enviados por WhatsApp

Atualização de 9 de outubro de 2026. Substitui a entrega Telegram descrita em `contact-delivery.md`; aquela documentação registra a etapa anterior.

## Configuração publicada

- Credencial existente: `Assistente do Ni`, tipo `evolutionApi`. A chave permanece somente no n8n.
- Instância consultada na Evolution API: `Assistente do Ni`, estado `open`.
- Destino fixo: `5511937105501`. Campos do formulário nunca definem o destinatário.
- Workflows: `tJJ0ZjS3sbzFdvSg` (`chamaai-lead`, utilizado pelo bundle atual do site) e `sZVb0DyKUpIAJX0B` (`nexareis/formularios`). Endpoints e IDs dos webhooks foram preservados.
- Sequência: Webhook → preparação existente, quando aplicável → HTTP autenticado com a credencial Evolution → validar aceitação → resposta JSON.
- O nó HTTP usa `POST /message/sendText/Assistente%20do%20Ni`, corpo JSON com `number`, `text` e `linkPreview: false`, prazo de 10 segundos e nenhuma repetição automática.

O teste da credencial na versão npm 1.0.4 do nó Evolution usa deliberadamente `/erro` quando o servidor termina em `/`. O envio dessa implementação concatena a URL do servidor com a rota. Por isso os workflows usam HTTP Request com autenticação `predefinedCredentialType: evolutionApi` e URL explícita, sem modificar a credencial. Fonte: [implementação do nó Evolution](https://github.com/oriondesign2015/n8n-nodes-evolution-api).

## Confirmação e falhas

A resposta confirma `ok: true` e `success: true` somente se a API retornar ID de mensagem não vazio, `fromMe: true`, destinatário `5511937105501@s.whatsapp.net` e estado `PENDING`, `SERVER_ACK`, `DELIVERY_ACK`, `READ` ou `PLAYED`. Resposta incompleta, destinatário divergente ou estado não aceito retorna HTTP 502 com os dois indicadores falsos. Erros HTTP, rede ou timeout interrompem o fluxo antes da resposta de confirmação.

Essa confirmação significa aceitação da mensagem pela API, não prova de entrega ou leitura pelo destinatário. `PENDING` foi observado nos dois envios de teste aceitos. O site continua exigindo HTTP 2xx e `ok: true`, mantendo campos em falhas. Uma ausência de confirmação pode ocorrer após aceitação, portanto não há replay automático.

O fluxo comercial geral mantém sua validação de campos obrigatórios e os labels existentes. O fluxo ChamaAí mantém aliases e campos opcionais. Mensagens são texto simples; os valores externos não são interpretados como HTML. Os exports importáveis incluem referências à credencial existente, sem chave: `workflow-n8n-chamaai.json` e `workflow-n8n-formularios.json`.

## Verificação realizada

- Backups dos workflows anteriores em `.n8n-backups.local/`, ignorada pelo Git.
- 29 testes isolados com `node:test`: transporte do frontend, prazo, concorrência, aliases, campos, destino fixo e confirmação positiva/negativa.
- Rotas temporárias com os mesmos nós executaram dois POSTs contendo dados sintéticos e mensagem identificada como teste. Ambos retornaram HTTP 200, `ok: true`, `success: true`, `delivery: whatsapp` e ID de mensagem; o cabeçalho CORS refletiu `https://www.nexareis.com.br`.
- Os dois workflows de produção foram publicados; leitura posterior confirmou versão atual igual à versão ativa. Não foi necessário alterar nem republicar o frontend.
- As rotas e a consulta temporárias foram desativadas/removidas após a verificação. Não foram enviados formulários reais de clientes durante os testes.

Limite: os POSTs de envio foram executados nas cópias temporárias, não nos endpoints comerciais; a correspondência dos nós publicados foi verificada pela API. A leitura no WhatsApp depende do aparelho e não foi comprovada.
