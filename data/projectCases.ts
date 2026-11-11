export const projectCases = {
  'chamaai-food': {
    name: 'ChamaAí Food', heading: 'Do preparo à retirada, um pedido de cada vez.',
    summary: 'Um painel para acompanhar os pedidos e comunicar quando estão prontos para retirada.',
    problem: 'No balcão e na cozinha, a equipe precisa saber o que está em preparo e o cliente precisa entender quando retirar o pedido.',
    solution: 'O ChamaAí Food organiza a apresentação dos pedidos por etapa e oferece uma visualização voltada à expedição.',
    steps: ['Acompanhar os pedidos em preparo', 'Identificar os pedidos prontos', 'Orientar a retirada pelo painel'],
    audience: 'Restaurantes, lanchonetes, docerias e operações com retirada.',
    image: '/images/portfolio/chamaai-food.webp', alt: 'Painel de demonstração do ChamaAí Food com pedidos em preparo e prontos', caption: 'Captura real da demonstração. Os pedidos e nomes são fictícios.',
    demo: 'https://chamaaifood.nexareis.com.br/pilot',
  },
  'chamaai-filas': {
    name: 'ChamaAí — Gestão de Filas', heading: 'Um atendimento com a chamada à vista.',
    summary: 'Organização de senhas, operação do atendimento e chamada dos clientes em um painel.',
    problem: 'Em uma recepção ou balcão, clientes e atendentes precisam acompanhar a ordem de atendimento com clareza.',
    solution: 'O ChamaAí reúne a gestão da fila e a chamada de senhas, conectando a rotina do operador à informação exibida ao público.',
    steps: ['Organizar a espera por senhas', 'Operar as chamadas no atendimento', 'Exibir a senha ao público'],
    audience: 'Recepções, clínicas, laboratórios, supermercados e balcões de atendimento.',
    image: '/images/portfolio/chamaai-filas.webp', alt: 'Página pública de apresentação do ChamaAí Gestão de Filas', caption: 'Captura real da página pública de apresentação do projeto.',
    demo: 'https://chamaai.nexareis.com.br',
  },
  'signageflow': {
    name: 'SignageFlow', heading: 'A programação das suas telas em um só lugar.',
    summary: 'Gestão de mídia e playlists para conteúdos exibidos em TVs e outras telas.',
    problem: 'Atualizar o conteúdo de várias telas exige organizar os arquivos, as playlists e o que cada ponto deve exibir.',
    solution: 'O SignageFlow propõe uma gestão central dos conteúdos e de sua distribuição para as telas da operação.',
    steps: ['Organizar as mídias', 'Montar playlists para a programação', 'Acompanhar o conteúdo destinado às telas'],
    audience: 'Varejo, supermercados, franquias e espaços com comunicação em telas.',
    image: '/images/portfolio/signageflow.webp', alt: 'Página pública do SignageFlow com uma prévia de conteúdo em TV', caption: 'Captura real da página pública de apresentação do projeto.',
    demo: 'https://signageflow.nexareis.com.br',
  },
  'cesta-esperta': {
    name: 'CestaEsperta', heading: 'Do catálogo ao pedido, com a operação em contexto.',
    summary: 'Um projeto voltado à organização do catálogo, dos pedidos e da entrega.',
    problem: 'Uma operação de vendas precisa apresentar os produtos e conferir as condições do pedido antes de encaminhar a entrega.',
    solution: 'O CestaEsperta conecta a proposta de catálogo e pedidos à rotina de conferência e entrega. O escopo de implantação é avaliado com cada empresa.',
    steps: ['Apresentar o catálogo de produtos', 'Organizar o pedido para conferência', 'Acompanhar as informações de entrega'],
    audience: 'Supermercados e operações de venda com catálogo e entrega.',
    image: '', alt: '', caption: 'Representação ilustrativa do fluxo. Este projeto não possui demonstração pública vinculada.',
    demo: '',
  },
} as const;
export type ProjectId = keyof typeof projectCases;
export const isProjectId = (value: string): value is ProjectId => Object.hasOwn(projectCases, value);
