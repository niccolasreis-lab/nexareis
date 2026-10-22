# Progresso — Nexa Reis

## Baseline em 22/10/2026

- Repositório `niccolasreis-lab/nexareis`, branch padrão `main`.
- SHA: `94d5d41a42e7987be4fc2c8d5ab707713f950590`.
- Vercel: projeto `prj_TpvuKxxAqakiKg7l4bYZXTawL3ZH`, equipe `team_NdwNwUD6P6DYOgVegkqc1dhb`.
- Alias `www.nexareis.com.br` ligado a `dpl_8Gsma3YyzSjNQMgmvt1HAuzLoWVV`, READY, produção, mesmo SHA da main.
- Status GitHub disponível: Vercel success. Não existia `.github/workflows` na baseline.
- Baseline local: typecheck, 29 testes e build aprovados.

## Implementação

Branch: `audit/nexa-professional-2026-10-22`.

1. Corrigidos IDs e navegação; validação: typecheck, 29 testes e build.
2. Métricas sem fonte ocultadas, garantias revisadas, configuração de chave privada removida; validação repetida.
3. Perfil textual e entradas por interesse; validação repetida. Foto e fichas de autoria não publicadas sem confirmação.
4. Metadados estáticos, sitemap, rewrites, acessibilidade do formulário, movimento reduzido e semântica de links; verificações no navegador encontraram IDs adicionais em conteúdo adiado e retorno HTML genérico em rotas diretas. Corrigidos e retestados.
5. Atualizações de segurança das dependências; repetição de typecheck, testes, build, navegador e npm audit.
6. Rodada final local: typecheck, 29 testes, build e 28 verificações de navegador passaram. npm audit sem vulnerabilidades reportadas.
7. CI de PR com Node 24, instalação npm reprodutível, testes e artefatos de navegador. Sem merge ou publicação em produção.

## Próximos marcos

- Conferir PR, CI e preview por SHA.
- Revisar visual e texto com o responsável.
- Completar evidência real do contato e proteção de abuso/idempotência no n8n.
- Completar os dados confirmados de cada projeto pessoal; fotografia já recebida e integrada.
- Após aprovação explícita: publicar commit aprovado, conferir alias/SHA, smoke test e plano de rollback.
- Somente então: QR Code definitivo e testes de leitura, antes de integrar ao currículo.

Consulte QA_REPORT.md para evidências e PENDENCIAS.md para limitações. Esta etapa não representa homologação completa do produto.

## Revisão remota

- PR em rascunho: https://github.com/niccolasreis-lab/nexareis/pull/2
- Primeiro commit de revisão: `5c8f34a4569227076fc35f6f73d1b845555aa5bd`. GitHub Actions concluiu `verify` com sucesso (run `39817439793`), incluindo navegador e artefatos. Preview `dpl_5BjfL2E8QZNZiqtXZKPEzReMxgaz` READY, mesmo SHA; `/nicolas-reis` retornou HTTP 200 com title e canonical próprios.
- Log remoto alertou que `>=22.18.0` permitiria mudança automática de major do Node; fixado em `24.x`, mesma major usada nos testes e no CI.
- Conferir estado final de CI e preview no head atual do PR. Produção segue no SHA baseline.

## Foto recebida — 22/10/2026

Retrato enviado pelo responsável incluído em `public/images/team/nicolas-reis.jpg`, sem alterações no arquivo. Apresentação compacta no celular e maior no desktop, com dimensões explícitas para evitar deslocamentos durante o carregamento. A identidade visual e os caminhos para recrutadores e empresas foram preservados.

Validação da inclusão: typecheck, 29 testes, build e 28 verificações de navegador passaram; retrato carregou nas seis larguras e foi inspecionado em 390 e 1440 px.

## Foto como marca d’água — 22/10/2026

Por solicitação do responsável, retrato passou a compor o fundo apenas da apresentação pessoal. Arquivo original mantido; opacidade de 10% no celular e 18% no desktop, com máscara de degradê nas bordas. Imagem decorativa com alt vazio, aria-hidden e pointer-events desabilitados. Caminhos de interesse abaixo da apresentação para deixar o rosto visível e manter a leitura. Sem alteração de produção.

Validação da marca d’água: typecheck, 29 testes unitários, build e 28 verificações de navegador passaram. Capturas de 390 e 1440 px revisadas; sem rolagem horizontal nas seis larguras.

## Continuação — portfólio e currículo para impressão (22/10/2026)

- Branch `feat/nicolas-portfolio-curriculo-20261022` criada a partir do commit publicado `c9c11f893ffabc77319e0ad540e84bed9b9763a1`.
- Perfil pessoal: fotografia original em destaque além da marca-d'água, trajetória com descrições e links dos quatro produtos corporativos, sem atribuição individual não confirmada.
- Dados pessoais consolidados em `data/nicolasProfile.ts` para reutilização consistente.
- Rota `/curriculo`: versão A4 com foto, informações profissionais, cursos, indicação de Testemunha de Jeová e link JW.ORG no início. Comando do navegador para imprimir ou salvar como PDF; não é um PDF estático hospedado.
- Metadados e rewrite da rota adicionados; testes de regressão e verificação de PDF no navegador incluídos.
- Aguardam conferência de CI/preview e validação visual. Não houve merge ou deploy em produção nesta etapa.

## Confirmação do fundador e atualização visual — 22/10/2026

- O responsável confirmou ser o **fundador da Nexa Reis e criador dos projetos exibidos**.
- Hero da rota `/nicolas-reis` alinhado ao conceito do QR Code: “Conheça meu portfólio profissional”, subtítulo e identificação “Nícolas Reis — Administração e Tecnologia”.
- Adicionados quatro atalhos visuais internos: **Experiência, Projetos, Formação e Contato**, com âncoras para as seções.
- Removido o botão “Visualizar currículo para impressão” do perfil; rota `/curriculo` continua disponível separadamente.
- Endereço recomendado para o QR Code: `https://www.nexareis.com.br/nicolas-reis` (caminho no domínio oficial, sem novo subdomínio).
- Atualizados testes automatizados para refletir a autoria confirmada e a navegação.
- Não houve merge nem alteração em produção nesta revisão.
