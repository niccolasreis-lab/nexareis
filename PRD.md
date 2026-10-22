# Nexa Reis — requisitos e critérios de aceite

Atualizado em 22/10/2026. Esta entrega é uma branch de revisão, sem autorização de merge ou publicação em produção.

## Objetivo

Profissionalizar a apresentação comercial preservando a identidade, os quatro produtos, as integrações e os fluxos existentes. Criar uma página complementar de Nícolas Reis para recrutadores, com informações confirmadas pelo responsável.

## Requisitos

| Área | Critério de aceite | Entrega |
| --- | --- | --- |
| Navegação | IDs únicos após carregar seções adiadas; âncoras corretas em todas as páginas; menu por teclado | Implementado; validar no preview Vercel |
| Contato | Validação, timeout, confirmação legível, concorrência bloqueada, dados preservados e alternativa WhatsApp | Cliente testado com servidor simulado; entrega real pendente |
| Antispam e idempotência | Validação e limites no servidor; impedir duplicação após confirmação incerta | Pendente no ambiente n8n; bloqueia homologação integral |
| Credibilidade | Nenhuma métrica sem evidência, sem garantias absolutas | Números removidos; publicação futura exige evidência e revisão |
| Perfil | Nome, localização, experiência e formação conforme prompt | Página em `/nicolas-reis` com fotografia enviada pelo responsável como marca d’água no topo |
| Projetos pessoais | Problema, público, funções, tecnologia comprovada, capturas reais, autoria e status | Fichas definitivas dependem de confirmação; links corporativos preservados |
| Interesses | Caminhos para recrutador e empresa | Implementado na landing e no perfil |
| Interface | Identidade preservada, seis larguras, foco visível e movimento reduzido | Testes automatizados de navegador e revisão visual |
| SEO | Metadados e canonical por rota, sitemap e dados estruturados reais | HTML com metadados gerado no build; conteúdo React ainda client-side |
| Segurança | Sem chave privada no bundle; dependências auditadas | Define de chave removido; dependências atualizadas |
| Qualidade | Typecheck, testes, build e navegador, com evidências | Scripts e CI adicionados |
| QR Code | URL definitiva aprovada e publicada antes de gerar SVG/PNG | Não iniciado: depende de aprovação e produção |

## Conteúdo confirmado

Fonte: prompt do responsável de 22/10/2026. Nome Nícolas Reis; Administração e Tecnologia da Informação; São Paulo – SP; telefone (11) 93710-5501; Instagram @nicolasreis.tech. Mercantil Santa Paula desde janeiro/2018 e progressão de cargos exatamente informada. Anhanguera: ADS, 2º semestre cursando. Informática CETEF/2015 e Manutenção de Microcomputadores Seven Computadores/2015.

Não foram atribuídas competências, responsabilidades ou tecnologias de projetos pessoais sem confirmação. A fotografia enviada foi copiada sem alterações de pixels ou remoção de marcas, mantendo proporções e fisionomia.

## Projeto visual aplicado

Aplicação da skill local `.agents/skills/frontend-design/SKILL.md`, exigida por AGENTS.md. Paleta existente: fundo #050505, cartões #101010, superfície clara #F5F5F2, ciano #00D4FF, azul #0066FF e texto #C7C7C2. Inter para leitura, Space Grotesk para títulos, JetBrains Mono mantida em detalhes existentes. Perfil com apresentação à esquerda e caminhos por interesse à direita; em celular, fluxo vertical. Experiência e formação em listas, sem métricas decorativas. Critério: informação profissional legível e continuidade com a marca; sem redesenho da landing.

## Fora desta publicação

Merge e deploy de produção não automáticos. QR Code e currículo definitivo somente depois da aprovação do perfil em produção. Não alterar workflows ativos sem acesso, backup e validação controlada.
