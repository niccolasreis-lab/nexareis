# NexaReis: auditoria, animações e acabamento

## Escopo

Refinamento incremental da versão do PR #4, partindo de `2538bfb036367cc14fd81fbbeb119f14838b07a3`. Preservar a paleta aprovada, a fotografia, os quatro projetos, o histórico, as quatro âncoras, os formulários, os destinos e os contratos de integração. A sequência autorizada é `audit`, `animate`, `polish`, seguida de verificação.

Impeccable 4.8.2 e Web Design Guidelines 1.0.0 foram adicionadas no escopo do projeto. As fontes estão fixadas por commit em `.agents/skill-sources.json`; o código das skills não entra no bundle do site. O contexto automático reconheceu o sistema existente e permitiu refinamentos pontuais. Nenhum hook automático foi ativado. Não havia uma crítica anterior armazenada para esta página.

## 1. Audit: diagnóstico antes das correções

O sistema visual expressa a identidade aprovada. Não há evidência que justifique uma reconstrução. A fotografia original, as diferenças entre capturas públicas e demonstração e os destinos dos projetos continuam explícitos. Não foram identificados bloqueios P0 nesta revisão de código.

| Dimensão | Nota qualitativa inicial | Evidência e limite |
| --- | --- | --- |
| Acessibilidade | 3/4 | Foco, nomes, teclado e movimento reduzido já tinham cobertura; seleção de texto e variantes locais dos botões mereciam ajuste. Não é certificação WCAG. |
| Performance | 3/4 | Imagens responsivas e rotas divididas; cada cartão ainda repetia uma entrada automática com observação de viewport. Métricas de campo não medidas. |
| Temas | 2/4 | Componentes isolados corretamente; seleção de texto e superfície do navegador ainda herdavam o tema comercial. |
| Responsividade | 3/4 | Seis larguras previamente verificadas; links do menu e do rodapé tinham menos de 44 px de altura. |
| Integridade da implementação | 3/4 | Conteúdo e identidade coerentes; transições genéricas e shimmer redundante no botão compartilhado. |
| Total | 14/20 | Bom sistema existente, com ajustes localizados. |

As notas expressam julgamento qualitativo deste escopo, não uma medição universal de qualidade ou segurança.

### Achados priorizados

- **P2: seleção pouco legível no perfil claro.** A regra global mantinha texto quase branco sobre uma seleção translúcida também clara. Corrigir a combinação no escopo pessoal e no menu claro. Recomendação: `polish`.
- **P2: alvos de toque pequenos.** Links móveis tinham altura de texto; links do rodapé pessoal usavam 36 px e os ícones sociais 36 x 36 px. Elevar para 44 px. É melhoria de conforto; não se infere uma violação de WCAG AA apenas por estar abaixo de 44 px. Recomendação: `polish`.
- **P2: movimento do controle compartilhado sem variante local explícita.** `MotionConfig` já existia; o botão ainda declarava hover/tap com transformações e aceitava feedback também quando desabilitado. Tornar a decisão local explícita, preservando a mudança de cor e o foco. Recomendação: `animate`.
- **P3: ritmo e tipografia.** O menu escalonava sete links e a ação final; cartões repetiam entradas ao rolar; o nome usava tracking de -0,065 em e alguns apoios usavam 10-11 px. Reduzir esperas, retirar entradas redundantes e melhorar apoios pontuais. Recomendação: `animate`, terminando em `polish`.

## 2. Animate: movimento com uma função

- A abertura do menu mantém os links legíveis desde o primeiro quadro. O conjunto acomoda 6 px em 180 ms, sem atraso individual dos links. Fechamento e reabertura podem ser interrompidos.
- Botões respondem em 160 ms, com desaceleração e sem spring. Hover e tap não alteram a escala sob movimento reduzido nem quando desabilitados. Cor e foco continuam dando retorno.
- A apresentação preserva sua entrada existente. Os projetos ficam visíveis de imediato e mantêm o hover leve das capturas, sem observadores de entrada para cada cartão.
- Nenhuma animação controla envio, confirmação ou navegação. Não foi adicionada biblioteca de movimento.

## 3. Polish: acabamento localizado

- Seleção do texto pessoal usa verde sobre amarelo. Cor da barra do navegador, esquema nativo e scrollbar acompanham o perfil e voltam ao tema comercial ao navegar.
- Links do menu, botões compartilhados, ícones sociais e links do rodapé móvel possuem alvos de pelo menos 44 px onde ajustados.
- O nome mantém o tamanho e a composição, com espaçamento menos comprimido. Apoios de experiência e catálogo recebem 12 px; títulos usam balanceamento e descrições usam distribuição de texto quando suportada.
- O botão herda o foco visível existente. O shimmer redundante foi retirado. Cabeçalho e links usam transições de propriedades explícitas.

A referência aprovada continua sendo a autoridade: círculo amarelo, enquadramento da foto, cabeçalhos e rótulos existentes são preservados. Regras genéricas não autorizam alterar conteúdo ou a direção visual por conta própria.

## Verificação e evidências

A revisão mecânica do Impeccable foi executada uma vez nos seis arquivos de interface alterados e não retornou achados. Isso não substitui o teste renderizado. A revisão complementar da Vercel orientou foco, toque, seleção, transições e tema.

O CI executa TypeScript, build, os 33 testes de unidade/contrato, 33 verificações de navegador e a auditoria ampliada. As novas verificações cobrem contraste da seleção, retorno do tema entre rotas, nome sem recorte em 320/390 px, alvos de toque, variante reduzida dos botões e interrupção do menu. Uma gravação real do navegador e a captura do menu acompanham as evidências, sem gerar imagens simuladas.

Resultados e capturas pertencem ao commit da execução, disponível nos [checks do PR #4](https://github.com/niccolasreis-lab/nexareis/pull/4/checks). A suíte intercepta ou bloqueia POSTs; nenhum lead ou mensagem real é enviado.

## Limites preservados

A produção não é publicada por este refinamento. Entrega real de WhatsApp/n8n, antispam e idempotência do receptor, aparelhos físicos e leitores de tela continuam com os limites registrados na auditoria anterior. Gradientes e sobreposições da página comercial podem exigir avaliação manual de contraste. Não se altera o backend nem se presume que o scan visual o certifica.
