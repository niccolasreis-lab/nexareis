# Confirmação de entrega do formulário

## Verificação local

Na raiz do repositório, com Node.js 24:

```powershell
node --version
npm ci
npm test
npm run typecheck
npm run build
```

Os testes substituem o `fetch` por respostas simuladas e avaliam as expressões do workflow com dados sintéticos em uma VM. Não usam credenciais nem enviam mensagens. Validar JSON e expressões **não comprova importação, execução ou compatibilidade com a versão instalada do n8n**.

## Contrato e arquivos

- `lib/contactSubmission.ts`: um POST `application/json` por tentativa, sem beacon, `no-cors` ou repetição automática. Confirma somente HTTP 2xx com JSON legível, objeto não nulo e não array, cujo `ok` seja o booleano `true`.
- O prazo de 15 segundos cobre a requisição, a leitura do corpo e a validação. Além do timer de abort, o prazo absoluto é conferido com `performance.now()` para rejeitar uma confirmação atrasada mesmo se o callback do timer estiver pendente. Timeout, cancelamento, rede, CORS, HTTP de erro ou confirmação inválida preservam os campos em `components/ContactForm.tsx`. Submissões simultâneas são bloqueadas.
- `workflow-n8n-chamaai.json`: export com JSON válido e o `webhookId` existente, necessário para manter o caminho integral em uma importação limpa pelo CLI. Preserva POST `/webhook/chamaai-lead`, campos, aliases, CORS e a sequência Webhook → Telegram → Respond to Webhook. A precedência `currentPain || mensagem` foi alinhada ao workflow publicado, preservando os dois aliases.
- Telegram continua em `typeVersion: 1.1`, com HTML explícito e escape de `&`, `<` e `>` nos valores externos. A URL do botão fica em `inlineKeyboard.rows[].row.buttons[].additionalFields.url`.
- O responder retorna `{ "ok": true }` com HTTP 200 somente quando a saída Telegram possui `ok === true`; confirmação negativa ou ausente retorna `{ "ok": false }` com HTTP 502. Erros lançados pelo Telegram interrompem a execução antes do responder; não habilitar continuação ou retries. No teste real do n8n 2.34.1, falha HTTP e desconexão do Telegram produziram HTTP 200 com corpo vazio. O cliente rejeita essa resposta por falta de JSON com `ok: true`; não depende de um status 500 para reconhecer a falha.

Não há idempotência nesta etapa. **Um timeout pode ocorrer depois de o Telegram aceitar a mensagem**; abortar no navegador não desfaz a entrega no servidor. Isso não autoriza replay automático. Uma nova tentativa manual pode duplicar o contato.

## Validação isolada e publicação

1. Exportar o workflow ativo para backup antes de qualquer substituição. Registrar a versão instalada do n8n e a associação das credenciais Telegram; o arquivo versionado não contém essas credenciais.
2. Importar uma cópia em ambiente isolado, sem ativar o endpoint de produção. Preservar as versões dos nós e verificar os campos no editor. Confirmar que a credencial Telegram da versão instalada oferece **Base URL**; esse campo foi verificado no código oficial do n8n 1.100.1, que suporta o nó 1.1. Usar credencial fictícia cuja Base URL aponte para um simulador da Bot API acessível pelo n8n, sem acesso ao Telegram real. Se o campo não existir, interromper esse procedimento e preparar outra forma de isolamento; não usar credenciais reais para contornar a limitação.
3. O simulador deve aceitar GET `/bot<TOKEN_FICTICIO>/getMe`, usado no teste da credencial, e devolver HTTP 200 com `{ "ok": true, "result": { "id": 1, "is_bot": true, "first_name": "Teste", "username": "teste_bot" } }`. Para POST `/bot<TOKEN_FICTICIO>/sendMessage`, devolver os casos abaixo. Usar a Test URL exibida pelo Webhook e dados sintéticos. Verificar execução, resposta e quantidade de chamadas ao simulador.

| Resposta simulada Telegram | Resultado esperado do webhook |
| --- | --- |
| HTTP 200, `{ "ok": true, "result": { "message_id": 1 } }` | HTTP 200, `{ "ok": true }` |
| HTTP 200, `{ "ok": false }` | HTTP 502, `{ "ok": false }` |
| HTTP 200, `{}` | HTTP 502, `{ "ok": false }` |
| HTTP 500 ou desconexão | Erro antes do responder; no n8n 2.34.1 local, HTTP 200 com corpo vazio; cliente rejeita a confirmação |
| Resposta atrasada além de 15 segundos | Frontend sem sucesso, dados preservados e sem segunda chamada automática |

4. Testar também nomes e mensagens com `<`, `>`, `&`, colchetes e crases. Conferir que chegam escapados no payload HTML do simulador e que o botão contém somente a URL `wa.me` gerada dos dígitos do telefone.
5. Validar no navegador o POST e a leitura do JSON, incluindo CORS, a partir de `https://www.nexareis.com.br`, `https://nexareis.com.br` e `https://nexareis.vercel.app`, usando o ambiente isolado. Um OPTIONS bem-sucedido sozinho não confirma CORS da resposta POST. Não alterar a política existente sem verificar outros consumidores desse endpoint.
6. Publicar o workflow validado **antes do frontend**, preservando a associação das credenciais reais. Publicar o frontend pelos mecanismos já usados no projeto. Conferir a configuração efetiva de `VITE_CONTACT_WEBHOOK_URL`. Validar POST e CORS nos três domínios após publicação; qualquer teste de produção com envio real deve ser deliberado e identificado como teste.
7. Em caso de falha, restaurar o backup do workflow e a versão anterior do frontend pelos mecanismos do ambiente. Não reenviar contatos automaticamente para tentar resolver uma confirmação incerta.

## Estado desta entrega — 05/10/2026

- 33 testes passaram, incluindo confirmação atrasada com callback do timer pendente e confirmação válida imediatamente antes do limite; checagem TypeScript e build passaram.
- Navegador local com respostas simuladas: `ok: false` e timeout preservaram os campos e reativaram o botão; a tentativa de envio simultâneo gerou um único POST; o sucesso apareceu após `ok: true` e permitiu começar um formulário vazio. A desmontagem abortou a conexão pendente; uma nova montagem em React StrictMode enviou normalmente. O estado de erro foi inspecionado em desktop e viewport móvel de 390 px.
- A API autenticada identificou n8n 2.34.1. O workflow ativo foi exportado antes da alteração, com hash SHA-256, em `.n8n-backups.local/`, ignorada pelo Git. A chave da API não foi adicionada ao repositório.
- Uma instância local n8n 2.34.1 importou e publicou uma cópia com credencial fictícia e Bot API em loopback. Passaram 17 verificações reais: HTML, botão, aliases, JSON/HTTP, CORS, timeout, concorrência e ausência de repetição. Os registros de execução confirmaram que falhas lançadas param no Telegram, sem executar o responder. As dependências npm locais podem diferir da imagem hospedada; o mock não comprova aceitação pelo Telegram real.
- O formulário foi integrado a essa instância local no navegador. A falha Telegram que gerou HTTP 200 vazio preservou os sete campos e reativou o botão; somente a confirmação positiva simulada exibiu sucesso.
- Uma rota temporária sem Telegram no servidor público retornou OPTIONS 204 e POST 200 com JSON e CORS para os três `Origin`. As respostas 502 observadas eram HTML sem cabeçalho CORS. Isso verifica a infraestrutura e o caminho de teste; não prova o POST em `chamaai-lead` nem o controle CORS pelo navegador nos domínios públicos. A rota temporária foi despublicada e removida, com export local para recuperação.
- O workflow corrigido foi publicado pela API às 13:58 BRT. A leitura posterior confirmou versão publicada igual à atual, parâmetros esperados e preservação de endpoint, `webhookId`, grafo, credenciais, chatId e binaryMode. O nome e `appendAttribution: false` existentes também foram mantidos.
- O frontend é entregue pela integração GitHub/Vercel depois do workflow. A confirmação do status do commit e dos bundles públicos fica registrada em `.n8n-backups.local/frontend-verification.json`. O endpoint efetivo do bundle anterior apontava ao webhook original.
- O acesso SSH à VPS continua recusado; a publicação do workflow foi feita pela API. Os testes não enviaram mensagens ao Telegram real e nenhum POST foi feito ao endpoint comercial real.

Referências: [comportamento do Respond to Webhook](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.respondtowebhook/#workflow-behavior), [credencial Telegram no n8n 1.100.1](https://github.com/n8n-io/n8n/blob/n8n%401.100.1/packages/nodes-base/credentials/TelegramApi.credentials.ts), [implementação da Bot API no n8n 1.100.1](https://github.com/n8n-io/n8n/blob/n8n%401.100.1/packages/nodes-base/nodes/Telegram/GenericFunctions.ts), [contrato da Bot API](https://core.telegram.org/bots/api#making-requests), [HTML do Telegram](https://core.telegram.org/bots/api#html-style).
