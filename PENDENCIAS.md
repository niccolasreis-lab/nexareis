# Pendências e achados — 22/10/2026

## Bloqueios e trabalho restante

| Prioridade | Item | Impacto e próximo passo |
| --- | --- | --- |
| P1 | Recebimento real do contato | Cliente aceita HTTP 2xx e `{ok:true}`; não prova entrega/leitura no WhatsApp. Acessar execuções n8n e destino para um teste identificado. Nenhum contato real enviado nesta sessão. |
| P1 | Antispam no servidor | Webhook público chamado diretamente pelo navegador. Não há rate limit, desafio ou política de abuso comprovados nos exports. Validar limites de campos, rate limit persistente e política de origem no servidor; CORS sozinho não impede spam. |
| P1 | Idempotência de ponta a ponta | Bloqueio simultâneo no cliente existe. Timeout após aceite pode causar duplicação em nova tentativa manual. Implementar chave de idempotência e armazenamento no receptor antes de mudar contrato do frontend. |
| P1 | Preview e CI remotos | Conferir checks e deployment da branch com SHA exato. Validar reescritas de metadados em Vercel; preview local não comprova configuração remota. |
| P2 | Fotografia original | Não encontrada no repositório. Responsável deve fornecer original antes do bloco definitivo. Página textual não usa retrato artificial. |
| P2 | Fichas pessoais dos projetos | Confirmar participação efetiva, tecnologias, estado atual e capturas reais de ChamaAí Food, ChamaAí Filas, SignageFlow e CestaEsperta. Links corporativos existentes não comprovam autoria individual nem homologação completa. |
| P2 | Leitores de tela, contraste completo e aparelhos | Teclado, labels e foco testados no navegador; ainda falta avaliação assistiva manual completa, Android e iOS físicos. |
| P2 | Core Web Vitals e conteúdo pré-renderizado | Bundle medido; sem métricas de campo, Lighthouse ou redes lentas. Metadados estáticos entregues; conteúdo da página permanece React client-side. Avaliar SSG/SSR separadamente. |
| P2 | Rota desconhecida | Tela de não encontrado com noindex no cliente; fallback SPA pode devolver HTTP 200. Planejar 404 real sem quebrar rotas. |
| P3 | QR Code e currículo | Aguardar aprovação e URL em produção. Gerar SVG/PNG com margem de 4 módulos e contrastes adequados; testar leitura em Android/iOS e impressão antes de editar currículo. |

## Corrigido na branch

- IDs `sobre` duplicados; `feedback-gestores` duplicado após lazy loading; IDs fixos reutilizados em logos e blocos de cliente.
- Navegação de cabeçalho, rodapé e CTA fora da landing; controles laterais sem teclado.
- GitHub genérico no rodapé; links de ícones sem nome acessível.
- Métricas `[15+]`, `[120+]`, `[50k+]`, `[70%]`, `[400h+]` sem evidência. Lista esvaziada e grade oculta; publicação futura exige referência de evidência.
- Promessas de estabilidade vitalícia, suporte 24/7, escalabilidade garantida e aplicações 100% homologadas.
- Injeção potencial de GEMINI_API_KEY na configuração cliente (nenhum uso encontrado e nenhum segredo lido).
- Botões dentro de links, botões inertes em mockups e falta de identificação dos dados ilustrativos.
- Pulsos contínuos e flutuações decorativas; movimento reduzido e cursor padrão respeitados; parallax desabilitado com preferência reduzida.
- Classes inexistentes em detalhes de serviços; pequenos contrastes de labels em superfícies claras.
- Metadados de home em rotas secundárias; arquivos estáticos e rewrites explícitos adicionados.
- Dependências sinalizadas no npm audit: atualização do React Router 6 para 7.18.4, Vite para 6.4.5 e source-map-js para 1.2.2. Migração justificada por advisories; revisar a mudança de major no PR.

Nenhum dado de resultado foi substituído por estimativa. Depoimento existente marcado aprovado no repositório foi preservado; não foi obtida nova autorização independente de uso nesta sessão.
