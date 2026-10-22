# Relatório de QA — Nexa Reis

Data: 22/10/2026. Branch `audit/nexa-professional-2026-10-22`. Resultado: validação local aprovada para revisão; homologação completa e produção não aprovadas.

## História verificada

Visitante escolhe produtos/serviços ou perfil profissional; navega por páginas e seções; preenche contato; cliente envia ao webhook e só apresenta sucesso após HTTP 2xx com JSON `{ok:true}`. O limite navegador → receptor foi simulado; entrega no WhatsApp não foi comprovada nesta sessão.

## Baseline remota

Conectores GitHub e Vercel confirmaram main `94d5d41a42e7987be4fc2c8d5ab707713f950590`, alias `www.nexareis.com.br`, deployment `dpl_8Gsma3YyzSjNQMgmvt1HAuzLoWVV`, ambiente production, READY, com o mesmo SHA. Status GitHub: Vercel success. Nenhum workflow CI próprio existia na baseline. Nenhum merge ou deploy de produção foi executado.

## Ambiente e comandos

Node 24.19.0, npm 11.9.0. Chromium 153 via binário temporário, Playwright 1.56.1. Download padrão do Chromium falhou neste ambiente; utilizado binário de pacote npm, fora do repositório e sem desabilitar a segurança web no teste final.

```sh
npm ci
npm run typecheck
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:browser
npm audit
```

Localmente o script de navegador usou `NEXA_CHROMIUM_EXECUTABLE=/tmp/chromium`. Em CI a instalação padrão do Playwright é usada. O script sobe e encerra seu próprio servidor de preview. Nenhuma credencial é necessária para os testes locais.

## Evidências

Rodada final: **28/28 verificações de navegador passaram**, além dos 29 testes unitários. Os quatro produtos foram selecionados; os links de demonstração foram conferidos e o CTA do CestaEsperta preencheu a intenção de contato, sem envio real.

| Verificação | Resultado | Limite |
| --- | --- | --- |
| Baseline: typecheck, 29 testes, build | Passaram antes de editar | Não existia cobertura do navegador no repo |
| Typecheck final | Passou | Não substitui teste funcional |
| Testes node:test | 29/29 passaram | Fetch e expressões do workflow simulados |
| Build final | Passou, Vite 6.4.5 | Gera metadados estáticos para 7 rotas |
| Layout | Home, perfil e serviço em 320/360/390/768/1024/1440 px | Chromium; sem dispositivos físicos |
| IDs | Sem duplicações após carregar seções adiadas | Inclui logos e blocos do cliente |
| Navegação | Desktop, lateral com Enter, menu móvel, Escape, retorno de foco e links entre rotas | Comparação da posição da seção com offset de cabeçalho |
| Rotas | Seis rotas internas, reload e HTML/canonical específico | Servidor local; Vercel exige conferência do preview |
| Contato inválido | Sem POST e foco no primeiro campo inválido | Validação do cliente |
| Contato negativo | HTTP com `{ok:false}` preserva os sete campos; oferece WhatsApp | POST interceptado |
| Contato positivo e concorrência | Um POST enquanto pendente; sucesso só após confirmação; novo formulário vazio | POST interceptado; não comprova WhatsApp |
| Timeout/cancelamento | Testes unitários cobrem 15 s, corpo JSON, callback atrasado, bloqueio e cancelamento | Tempo simulado nos testes unitários |
| Movimento reduzido | Scroll automático, cursor padrão, parallax e animações decorativas reduzidos | Não há certificação de acessibilidade integral |
| Links externos | Seis destinos responderam HTTP 200 | HTTP 200 não comprova login nem fluxos dos produtos |
| Segurança | npm audit: zero vulnerabilidades após atualização | Estado da base npm naquele momento; não é pentest |
| Produção no browser local | ERR_EMPTY_RESPONSE | O fetch HTTP da produção respondeu 200; inspeção visual pública indisponível neste ambiente |

Resultados reproduzíveis: `qa/browser-results.json`, `qa/external-links.json`. Capturas `qa/home-390.png`, `qa/home-1440.png`, `qa/nicolas-390.png`, `qa/nicolas-1440.png` são geradas pelo teste e disponibilizadas como artefatos do CI; não versionadas. A página pessoal foi visualmente inspecionada em 390 e 1440 px. Capturas de página inteira da home exigem percorrer seções para disparar os reveals existentes; o script faz esse percurso antes de capturar.

## Falhas encontradas durante o teste e resolução

1. Depois do lazy loading surgiam IDs adicionais repetidos em logos, galeria, quote e badges do cliente. IDs de navegação ficaram exclusivos; marcações de instâncias visuais viraram `data-component`.
2. HTML de rotas secundárias era o HTML raiz no preview. Adicionados arquivos por rota, rewrites explícitos na Vercel e espelhamento no preview. Validação compara também HTML cru, não apenas DOM após React.
3. Botões dentro de links de produto/serviço. Convertidos em links estilizados; destinos preservados.
4. Classes antigas sem definição na página de serviço. Aplicado layout responsivo com tokens já existentes.
5. A verificação de início da home inicialmente esperava offset de 96 px, mas a seção inicial fica corretamente em 0 px. Corrigida a expectativa do teste; não alterado o layout para satisfazer teste incorreto.
6. Espera de foco móvel passou a aguardar o frame do navegador, evitando medir antes de `requestAnimationFrame` do menu.

## Performance observada

Baseline: chunk principal 291,68 kB (84,38 kB gzip), react-vendor 32,69 kB (11,67 kB gzip), motion 139,33 kB (46,26 kB gzip), CSS 74,41 kB (11,96 kB gzip).

Final: chunk principal 296,28 kB (85,74 kB gzip), react-vendor 49,88 kB (17,62 kB gzip), motion 139,66 kB (46,37 kB gzip), CSS 76,44 kB (12,28 kB gzip). Perfil separado 5,69 kB (1,84 kB gzip). Atualização de segurança do roteador aumentou o vendor; não é uma alegação de melhoria de bundle ou Core Web Vitals. Imagens do cliente mantêm dimensões e lazy loading. Sem medida de campo, rede lenta ou aparelhos modestos.

## Limitações que impedem aprovação completa

- Sem execuções do n8n ou prova de entrega real ao destinatário. Contrato atual confirma aceitação pela API, não leitura.
- Sem idempotência no receptor ou proteção antispam comprovada. Limites de comprimento no navegador não substituem o servidor.
- Informações de autoria/status/stack/capturas dos projetos pessoais ainda não fornecidas. Fotografia recebida e integrada na atualização abaixo.
- Sem testes físicos de Android/iOS, leitor de tela ou leitura de QR Code.
- Conteúdo ainda client-side; apenas os metadados estão no HTML estático. Rota desconhecida pode ser soft 404 pelo fallback SPA.
- CI e preview remotos devem ser conferidos no SHA da branch depois do PR. A configuração de domínio e produção permanece intocada.

## Plano de publicação e rollback

Após resolver bloqueios e obter aprovação: confirmar SHA e checks do PR; realizar merge deliberado; verificar build Vercel e alias por SHA; testar URL pública, rotas diretas, mobile e contato controlado com confirmação no destino. Em regressão, restaurar o deployment de produção anterior registrado acima e verificar aliases novamente. Não executar rollback ou promoção automaticamente.

## Verificação remota registrada

Primeiro commit de revisão: `5c8f34a4569227076fc35f6f73d1b845555aa5bd`. Job `verify` do GitHub Actions concluiu com sucesso no run `39817439793` (instalação, typecheck, testes, build, navegador e upload dos artefatos). Preview Vercel `dpl_5BjfL2E8QZNZiqtXZKPEzReMxgaz` ficou READY com o mesmo SHA. Fetch autenticado de `/nicolas-reis` retornou HTTP 200 e metadados específicos no HTML, comprovando o rewrite nessa versão.

Revisão posterior fixa Node em `24.x` para evitar mudança automática de major sinalizada pelo log da Vercel. Instalação limpa, typecheck, 29 testes e build passaram novamente, com os mesmos hashes dos bundles. Conferir CI e deployment do head atualizado antes de aprovar o PR.

## Fotografia integrada — 22/10/2026

O responsável forneceu `1000850421.jpg` (1147 × 1536 px; 332.791 bytes). O arquivo foi copiado integralmente para `public/images/team/nicolas-reis.jpg`. SHA-256 de ambos: `156700620823710a8ddbacfed84c66cd64236aa2321fede9f4434b4705dec54a`. Não foram aplicados retoques, recortes nem remoção de marcas. O layout mantém a proporção, com alt e dimensões explícitas.

Typecheck, 29 testes, build e 28 verificações de navegador passaram novamente. Em cada uma das seis larguras, o teste do perfil aguarda a imagem visível ser decodificada e confere sua largura natural. Capturas em 390 e 1440 px revisadas visualmente. Chunk do perfil após a foto: 6,21 kB (1,99 kB gzip); imagem mantida sem recompressão conforme o arquivo enviado. CI e preview da atualização devem ser conferidos no novo SHA. Produção não alterada.

## Revisão da apresentação: marca d’água

A fotografia permanece com o mesmo hash do upload. Agora é decoração de fundo restrita à introdução, com opacidade 10% abaixo de 1024 px e 18% no desktop, máscara de degradê e proporção preservada. Não recebe cliques nem aparece na árvore acessível; por isso o alt foi alterado para vazio. O teste de imagem nas seis larguras confere decode, largura natural, aria-hidden e pointer-events. A navegação de interesses fica abaixo da apresentação para não cobrir o rosto. Validar o head atualizado no CI/preview antes de aprovação.

Validação da marca d’água: typecheck, 29 testes unitários, build e 28 verificações de navegador passaram. Capturas de 390 e 1440 px revisadas; sem rolagem horizontal nas seis larguras.
