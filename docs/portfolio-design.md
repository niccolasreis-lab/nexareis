# Portfólio pessoal — adaptação visual

## Objetivo e escopo

Adaptar a referência aprovada de portfólio à página `/nicolas-reis`: fotografia original, nome em destaque, fundo creme, verde escuro, amarelo, contatos e projetos visuais. A página apresenta a trajetória administrativa e os projetos digitais de Nícolas Reis. Não modifica os fluxos comerciais, os dados pessoais centralizados, a rota de currículo ou as integrações.

## Direção visual

- Creme `#fff7e7`, papel `#fffcf5`, verde `#083e31`, amarelo `#f5bc39`, texto secundário `#51645a`, divisórias `#dcded0`.
- Space Grotesk nos títulos e Inter no texto, reutilizando as fontes existentes.
- Nome e retrato em duas colunas no desktop, composição vertical no celular. Um círculo amarelo valoriza a fotografia original, sem gerar outra imagem da pessoa.
- Abaixo da apresentação: faixa de contatos e competências, quatro atalhos preservados, projetos, experiência, formação e convite para conversar.
- Competências limitadas ao histórico conhecido: processos administrativos, atendimento e projetos de tecnologia. Nenhuma certificação, tecnologia pessoal, métrica de resultado ou depoimento novo foi inventado.
- Uma entrada suave na apresentação; feedback temporário nos quatro atalhos e seções. Preferência por movimento reduzido preservada.

## Isolamento

A folha `styles/portfolio.css` é carregada com a rota pessoal. Seletores próprios e atributos explícitos no cabeçalho, menu móvel e rodapé evitam trocar os tokens globais. Ao navegar para outra rota, esses atributos são removidos. Formulários, timeout, confirmação do receptor, endereços de envio, aliases de payload, URLs dos produtos, metadados e currículo A4 mantêm seus contratos.

## Origem das imagens

Capturas feitas em 11/11/2026, sem entrar em contas ou enviar formulários:

| Arquivo | Origem | Identificação na interface |
| --- | --- | --- |
| `chamaai-food.webp` | https://chamaaifood.nexareis.com.br/demo | Demonstração com dados fictícios |
| `chamaai-filas.webp` | https://chamaai.nexareis.com.br/ | Página pública do projeto |
| `signageflow.webp` | https://signageflow.nexareis.com.br/ | Página pública do projeto |

A demonstração do Food informa que roda localmente no navegador, sem criar ou alterar pedidos reais. Os dados presentes na captura são fictícios. As capturas das páginas públicas não comprovam homologação ou funcionamento interno dos produtos. Os três arquivos WebP somam aproximadamente 88 KB.

CestaEsperta mantém o link de solicitar informações e uma representação ilustrativa identificada, pois não há demonstração pública cadastrada. O retrato original e os dados de `nicolasProfile` não são alterados.

## Verificação

- TypeScript, build e 33 testes existentes aprovados localmente.
- A suíte de navegador foi adaptada para verificar o novo título e uma única fotografia original. As verificações de formulários, currículo e navegação foram preservadas.
- Foram acrescentadas verificações de carregamento das três capturas, manutenção dos destinos dos quatro projetos, navegação por teclado e isolamento das cores fora da rota pessoal.
- Chromium local indisponível por restrição do ambiente (`socket() failed: Operation not permitted`). Executar a suíte no GitHub Actions e revisar a prévia antes da publicação.
- Nenhum formulário real enviado; a suíte intercepta os POSTs dos webhooks.
