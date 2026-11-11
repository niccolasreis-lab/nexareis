# Auditoria do NexaReis e refinamento do portfólio — 11/11/2026

## Escopo e evidência

Revisão do código da interface e das integrações declaradas no repositório, das oito rotas públicas, navegação, menu móvel, formulários, currículo, responsividade, imagens, acessibilidade automatizada, dependências e animações. As correções estão no PR #4, sem publicação em produção.

As evidências executáveis ficam em `qa/browser-results.json`, `qa/portfolio-audit.json` e `qa/accessibility-audit.json`, gerados no CI. As capturas desktop/mobile e o PDF de teste acompanham o artefato do mesmo commit. O resultado remoto e o SHA estão nos [checks do PR](https://github.com/niccolasreis-lab/nexareis/pull/4/checks).

## Achados e correções

| Área | Achado anterior | Correção | Verificação |
| --- | --- | --- | --- |
| Navegação | Cabeçalho marcava Início na rota pessoal. | Indicador e `aria-current` limitados à página e seção corretas. | Troca entre perfil e produtos, com posição e estado ativo. |
| Âncoras | Espera fixa de 100 ms podia perder uma seção carregada depois e repetição do mesmo fragmento não atualizava a rolagem. | Aguarda a presença do destino, cancela observação ao navegar e atende cliques repetidos. | Página carregada com atraso e quatro destinos em três larguras. |
| Teclado | Destino recebia rolagem, mas não o foco de leitura. | Foco programático no destino, fora da ordem de Tab, sem pular o cabeçalho fixo. | Foco, posição, repetição e navegação entre rotas. |
| Menu móvel | Conteúdo de fundo permanecia navegável por tecnologias assistivas; voltar no histórico não fechava o menu. | Fundo temporariamente `inert`, restauração ao fechar e fechamento ao mudar a localização. | Tab, Escape, retorno de foco, histórico e restauração de `inert`. |
| Celular | Apresentação empilhada adiava a fotografia; rodapé institucional muito longo. | Composição compacta com a foto ao lado do nome e rodapé reorganizado, preservando destinos. | 320–1440 px, texto ampliado e capturas comparáveis. |
| Leitura | Categorias, legendas e alguns apoios tinham 10–11 px; quatro cartões deixavam as capturas pequenas no desktop. | Apoios principais com 12 px, descrições com 14 px e dois cartões por linha no desktop. | Inspeção visual e Axe nas rotas públicas. |
| Imagens | Retrato original de 333 KB era enviado também para telas pequenas. | Versões WebP de 400, 800 e 1147 px, mantendo o JPEG original e a proporção. | Recurso escolhido, tamanho e retorno ao JPEG se WebP falhar. |
| Falhas de mídia | Uma captura não carregada deixava apenas a imagem quebrada. | Estado de prévia indisponível com nome e acesso ao projeto preservado. | Falha de rede simulada, sem alterar o link. |
| Semântica | Logo decorativo e marca gigante duplicavam informação; rodapé usava cabeçalhos de nível 4. | SVG/wordmark decorativos ocultos da leitura assistiva e títulos de grupos em nível 2. | Acessibilidade automatizada sem excluir elementos da análise. |
| Movimento | Feedback da seção tinha brilho amplo e longa duração; cursor personalizado não combinava com a superfície clara. | Entrada de 8 px em 550 ms, feedback de seção de 720 ms, cartões suaves e cursor nativo na rota pessoal. | Hover limitado a 1,025; movimento reduzido sem animações em execução. |
| Dependências | Scan reportou uma vulnerabilidade alta no Zod instalado. | Zod fixado em 4.6.6 e lockfile atualizado; Axe adicionado apenas como ferramenta de desenvolvimento. | `npm audit`: zero vulnerabilidades reportadas após a atualização. |

## Segurança e contratos

O alerta [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) afeta Zod anterior a 4.6.6. Não foram encontrados imports de Zod no código da aplicação; a correção é preventiva da dependência instalada, sem evidência de exploração neste projeto.

Não foram encontrados usos de `eval`, `innerHTML` ou `dangerouslySetInnerHTML` nos componentes e bibliotecas revisados. O feedback de gestores usa armazenamento local do navegador; sua aprovação local não comprova autorização de um depoimento ou um backend administrativo. O conteúdo existente foi preservado.

Formulários e exports n8n mantêm os contratos anteriores: mesmos endpoints e aliases, timeout de 15 segundos, uma requisição por vez, confirmação legível `ok: true`, preservação dos campos em falha e ausência de retry automático. As suítes interceptam ou bloqueiam POSTs e não enviam mensagens reais. Nenhuma credencial foi adicionada.

## Movimento

- Uma entrada curta na apresentação e uma acomodação leve de cada cartão ao entrar na área visível.
- Zoom de 2,5% apenas nas capturas, em dispositivos com mouse. Não há movimento decorativo contínuo.
- Destaque curto ao selecionar uma seção, preservando as quatro âncoras.
- Botões e ícones respondem em 200–400 ms. `prefers-reduced-motion` desliga as transições e transformações decorativas.
- A animação não controla salvamento, envio, navegação ou confirmação de formulários.

## Limites e pendências externas

A auditoria automatizada não certifica conformidade WCAG completa. Leitores de tela e aparelhos físicos ainda precisam de avaliação humana. A suíte verifica WCAG 2 A/AA, 2.1 AA e 2.2 AA com Axe e registra separadamente os casos que exigem revisão manual.

A prévia Vercel continua protegida. A revisão visual utiliza o build de produção renderizado no CI, sem criar links públicos ou alterar a proteção.

Não foram feitas chamadas reais aos receptores de contato. Entrega final no WhatsApp, antispam no servidor e deduplicação persistente continuam exigindo validação do serviço n8n em execução. Os exports não comprovam esses controles; bloqueio simultâneo no navegador não substitui idempotência no receptor.

Métricas de campo, redes lentas reais, 404 HTTP do fallback SPA e políticas operacionais de backup não são comprovadas por este refinamento de interface. Não houve alteração nesses serviços ou publicação em produção.
