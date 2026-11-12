# Publicação de produção — 12/11/2026

As alterações aprovadas foram publicadas em `https://www.nexareis.com.br`, após os PRs #4, #5 e #6.

## Validação

- [CI de main 43201115319](https://github.com/niccolasreis-lab/nexareis/actions/runs/43201115319): aprovado, com 112 verificações — 43 testes de código/contrato, 10 do receptor, 33 verificações de navegador, 16 da auditoria do portfólio e 10 da extensão comercial.
- Navegador público: orçamento em duas etapas indicou SignageFlow e preencheu o formulário com segmento, necessidade e mensagem corretos. As páginas de Nícolas Reis e SignageFlow renderizaram com os links e a imagem original preservados.
- Um contato sintético, explicitamente identificado como teste técnico, foi enviado pelo formulário público com a opção existente “Outras dúvidas ou parcerias”. A tela confirmou “Solicitação registrada” e apresentou o protocolo.
- Foi confirmado um único registro persistente para esse teste e a entrega de sua notificação ao destino comercial configurado. O fluxo completo passou pela API pública e pela integração existente. Leitura não foi comprovada. Não foram enviados testes adicionais após a confirmação.
- As outras três páginas de projetos e `/metricas` responderam HTTP 200. O painel recebeu a marcação de não indexação; a API de métricas rejeitou uma chave inválida com 401 e aceitou o acesso administrativo com 200 e `ok:true`. Nenhuma credencial foi incluída neste registro.
- Os eventos do teste apareceram nas métricas de produção. As contagens incluem QA e não representam visitantes únicos, clientes ou vendas reais.

## Correções encontradas na publicação

O PR #5 preservou a compatibilidade com `necessidade=outros`, já presente no formulário anterior. O receptor aceita esse valor apenas como necessidade de contato, sem criar um produto ou rota fictícia. Um teste agora compara todas as opções reais do formulário com a validação do receptor.

O PR #6 corrigiu a resolução dos imports TypeScript no JavaScript empacotado da função Vercel com `rewriteRelativeImportExtensions`. O novo teste compila e importa a entrada em um diretório contendo somente JavaScript, cobrindo a falha de inicialização encontrada em produção. Após a correção, a tentativa anterior foi reenviada com a mesma chave de idempotência e concluída com sucesso, preservando os campos.

## Continuidade

As integrações existentes foram preservadas. A operação interna, os backups e a recuperação permanecem no registro administrativo privado. Os comportamentos públicos e as regras de medição estão em [growth-operations.md](growth-operations.md).

Esta evidência cobre a publicação e o contato técnico descritos acima. A confirmação do formulário comprova gravação; a confirmação de entrega foi conferida separadamente para a mensagem técnica.
