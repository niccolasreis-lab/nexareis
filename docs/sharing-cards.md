# Capas de compartilhamento

As quatro páginas públicas de projetos têm capas próprias; as demais páginas
públicas usam a capa da Nexa Reis. A paleta clara e a marca existentes foram
preservadas. O CestaEsperta continua identificado como fluxo ilustrativo.

`data/socialImages.ts` define os caminhos e textos alternativos. O helper
`lib/socialMetadata.ts` mantém Open Graph e Twitter Cards consistentes tanto no
HTML gerado durante o build quanto na navegação React. As imagens usam URLs
HTTPS absolutas, PNG RGB de 1200 × 630 e nomes com versão. Os arquivos atuais
têm menos de 120 KB cada. Nenhum serviço de imagem é executado em produção.

O build gera os metadados nas 13 rotas públicas, antes da execução de
JavaScript. As rotas privadas não são exportadas. A navegação entre projetos
também atualiza a capa, inclusive ao voltar à página inicial. As regras de
roteamento existentes na Vercel não foram alteradas.

## Atualização das imagens

1. Ajuste os layouts em `scripts/generate-social-images.mjs`; os resumos dos
   projetos vêm de `data/projectCases.ts`.
2. Em um ambiente de desenvolvimento com Python, Pillow e fontTools, execute
   `npm run generate:social`.
3. Confira as cinco imagens em tamanho real e reduzido. Versione os PNGs de
   `public/images/social/`, os SVGs de `assets/social/` e a procedência gerada.
4. Ao substituir uma capa já publicada, incremente o nome da imagem e seu
   mapeamento para permitir a atualização dos caches dos aplicativos.
5. Execute `npm run typecheck`, `npm run build` e `npm test`. A verificação de
   crescimento no CI também confere os metadados durante a navegação React.

O renderizador usa tipografia e geometria da marca, sem fotografias ou telas
que sugiram resultados de clientes. A fonte Space Grotesk está incluída apenas
como insumo de desenvolvimento, com sua licença SIL OFL em
`scripts/assets/SpaceGrotesk-OFL.txt`. `assets/social/provenance.json` registra
origem, dimensões e hashes dos PNGs publicados.

Os testes verificam HTML sem JavaScript, unicidade das capas, conteúdo e
dimensões reais dos PNGs, escape de atributos e preservação de canonical e
dados estruturados. A inspeção de produção verifica as respostas HTTP das
páginas e imagens. Nenhuma mensagem real é enviada ao WhatsApp; a aparência
final e o cache de cada aplicativo dependem do próprio aplicativo.
