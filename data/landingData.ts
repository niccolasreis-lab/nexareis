import { Bot, Code2, Workflow, Tv, Users, ShoppingCart, HelpCircle } from 'lucide-react';
import { ManagerFeedback } from '../types';

export interface ProductDetail {
  id: string;
  name: string;
  url: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  segments: string[];
  tagColor: string;
  accentColor: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface SegmentInfo {
  id: string;
  name: string;
  problem: string;
  solution: string;
  product: string;
  example: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// 12. METRICS AND RESULTS - Centralized metrics object for easy customization
export const METRICS: Metric[] = [
  { value: "[15+]", label: "Produtos em operação" },
  { value: "[120+]", label: "Telas gerenciadas simultaneamente" },
  { value: "[50k+]", label: "Atendimentos organizados por mês" },
  { value: "[70%]", label: "Redução de tempo de espera em filas" },
  { value: "[400h+]", label: "Horas de trabalho manual automatizadas" }
];

// 6. ECOSYSTEM OF PRODUCTS - Detailed features of ChamaAí Food, ChamaAí Gestão de Filas, and SignageFlow
export const PRODUCTS: ProductDetail[] = [
  {
    id: "chamaai-food",
    name: "ChamaAí Food",
    url: "https://chamaaifood.com.br/pilot",
    category: "Operação de delivery e retiradas",
    title: "Pedidos organizados. Retiradas sem confusão.",
    description: "O ChamaAí Food organiza o andamento dos pedidos e exibe informações claras para equipes, clientes e entregadores em tempo real.",
    features: [
      "Painel de acompanhamento de pedidos automatizado",
      "Sincronização instantânea com status do preparo",
      "Identificação legível e organizada por número do pedido",
      "Separação visual de pedidos em 'Em Preparo' e 'Prontos'",
      "Visualização otimizada para televisores ou monitores no balcão",
      "Redução drástica de perguntas e ruído no balcão de entrega",
      "Melhor fluxo de atendimento e expedição física",
      "Experiência profissional e organizada para entregadores e motoboys",
      "Suporte a alto volume operacional sem atraso ou travamentos"
    ],
    segments: ["Restaurantes", "Docerias", "Padarias", "Supermercados", "Dark Kitchens"],
    tagColor: "border-[#00D4FF] text-[#00D4FF] bg-[#00D4FF]/10",
    accentColor: "#00D4FF"
  },
  {
    id: "chamaai-filas",
    name: "ChamaAí — Gestão de Filas",
    url: "https://chamaai-nine.vercel.app/",
    category: "Atendimento e gestão de filas",
    title: "Cada atendimento, no momento certo.",
    description: "O ChamaAí digitaliza a retirada de senhas, a chamada de clientes e o acompanhamento do atendimento de forma eficiente e humanizada.",
    features: [
      "Emissão e controle inteligente de senhas sequenciais",
      "Painel de chamadas sonoro e visual integrado para telas",
      "Gestão de operadores e múltiplos guichês simultâneos",
      "Triagem inteligente de tipos de atendimento (Normal, Preferencial)",
      "Painel administrativo em tempo real para supervisores",
      "Relatórios detalhados de tempo médio de espera e produtividade",
      "Personalização visual da marca nos painéis de chamada",
      "Suporte para totens físicos de autoatendimento e tablets",
      "Integração via API com sistemas legados de ERP ou prontuário"
    ],
    segments: ["Supermercados", "Clínicas", "Laboratórios", "Órgãos Públicos", "Recepções"],
    tagColor: "border-[#C5F467] text-[#C5F467] bg-[#C5F467]/10",
    accentColor: "#C5F467"
  },
  {
    id: "signageflow",
    name: "SignageFlow",
    url: "https://signageflow.com.br/",
    category: "Gestão de mídia indoor",
    title: "Conteúdo organizado. Telas sincronizadas.",
    description: "O SignageFlow centraliza a operação de mídia indoor, permitindo organizar conteúdos, campanhas, preços, playlists e telas em diferentes pontos.",
    features: [
      "Gerenciamento remoto de conteúdos e arquivos de mídia",
      "Criação e agendamento de campanhas sazonais ou horárias",
      "Organização e ordenação flexível de playlists de exibição",
      "Gestão centralizada de telas geograficamente distribuídas",
      "Distribuição inteligente de conteúdo por unidade ou região",
      "Atualização dinâmica de preços e produtos em tempo real",
      "Confirmação e monitoramento remoto do conteúdo em exibição",
      "Controle fino de permissões de usuários e segurança de acesso",
      "Operação multiloja e suporte a televisores em cascata"
    ],
    segments: ["Varejo", "Redes de Lojas", "Supermercados", "Franquias", "Academia"],
    tagColor: "border-[#FF6B35] text-[#FF6B35] bg-[#FF6B35]/10",
    accentColor: "#FF6B35"
  }
];

// 7. PRODUCT COMPARISON DATA
export const COMPARISON_ROWS = [
  {
    product: "ChamaAí Food",
    operation: "Pedidos e retiradas",
    audience: "Restaurantes, docerias, mercados e delivery",
    hardware: "Televisão de balcão e monitor de preparo",
    benefit: "Fim do tumulto na entrega"
  },
  {
    product: "ChamaAí — Gestão de Filas",
    operation: "Filas e atendimentos",
    audience: "Lojas, clínicas, recepções e órgãos públicos",
    hardware: "Totens de senha, guichês e telas na recepção",
    benefit: "Atendimento ágil e mensurável"
  },
  {
    product: "SignageFlow",
    operation: "Conteúdo e mídia indoor",
    audience: "Varejo, redes de lojas e estabelecimentos comerciais",
    hardware: "Televisores promocionais e menus digitais",
    benefit: "Telas de oferta sincronizadas em tempo real"
  }
];

// 8. CUSTOM SOLUTIONS SERVICES
export const CUSTOM_SERVICES = [
  { title: "Sistemas Web", desc: "Plataformas de alta performance construídas sob medida para a sua operação comercial ou administrativa." },
  { title: "Plataformas SaaS", desc: "Desenvolvimento de produtos de software por assinatura (Software as a Service) escaláveis e multi-inquilino." },
  { title: "Dashboards Operacionais", desc: "Painéis de controle visuais em tempo real para tomada de decisões rápidas de gerentes e diretores." },
  { title: "Integração de APIs", desc: "Conexão de sistemas legados, ERPs, CRMs e APIs terceiras em um fluxo contínuo de informação sem perdas." },
  { title: "Soluções para Telas e Totens", desc: "Aplicações otimizadas para hardware físico, como televisores, totens de autoatendimento e tablets." },
  { title: "Automação Operacional", desc: "Substituição de rotinas de preenchimento manual por fluxos de dados seguros, rápidos e monitorados." }
];

// 9. DEVELOPMENT PROCESS - Steps
export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Entendemos o processo atual, os gargalos físicos ou lógicos e as pessoas envolvidas no fluxo de trabalho diário."
  },
  {
    number: "02",
    title: "Arquitetura",
    description: "Definimos detalhadamente os fluxos de dados, regras de negócio, APIs necessárias e a estrutura técnica ideal."
  },
  {
    number: "03",
    title: "Experiência",
    description: "Criamos protótipos de alta fidelidade, designs de interface polidos e jornadas focadas no dia a dia da operação."
  },
  {
    number: "04",
    title: "Desenvolvimento",
    description: "Construímos a aplicação robusta com código limpo, bancos de dados escaláveis, segurança de acesso e integrações."
  },
  {
    number: "05",
    title: "Implantação",
    description: "Configuramos o ambiente de produção em nuvem, treinamos operadores e acompanhamos a transição em tempo real."
  },
  {
    number: "06",
    title: "Evolução",
    description: "Analisamos o uso prático, extraímos métricas de desempenho e aprimoramos o software com melhorias contínuas."
  }
];

// 11. INDUSTRY SECTIONS - Dynamic sector interactions
export const INDUSTRIES: SegmentInfo[] = [
  {
    id: "supermercados",
    name: "Supermercados",
    problem: "Filas tumultuadas nos caixas e balcão de frios, além de dificuldades para atualizar promoções físicas de forma unificada nas prateleiras.",
    solution: "Sistemas de senha e chamada digital combinados com telas de mídia indoor integradas para ofertas instantâneas.",
    product: "ChamaAí — Gestão de Filas & SignageFlow",
    example: "Um painel de senhas no açougue reduz filas físicas enquanto as TVs exibem as ofertas do dia do SignageFlow."
  },
  {
    id: "restaurantes-docerias",
    name: "Restaurantes e Docerias",
    problem: "Falta de comunicação entre cozinha, balcão e motoboys, gerando perguntas incessantes e atrasos na entrega dos pedidos prontos.",
    solution: "Exibição clara e automatizada do status do pedido em tela de alta resolução visível para todos no estabelecimento.",
    product: "ChamaAí Food",
    example: "Uma TV no hall exibe 'Pronto' com o número do pedido, permitindo que o motoboy retire o pacote e saia sem gerar filas internas."
  },
  {
    id: "clinicas-recepcoes",
    name: "Clínicas e Recepções",
    problem: "Pacientes confusos quanto à sua ordem de chamada, longas esperas em pé e ausência de relatórios de produtividade médica ou de recepção.",
    solution: "Triagem de senhas preferenciais e chamadas na TV com som direcional e painel administrativo de tempo médio.",
    product: "ChamaAí — Gestão de Filas",
    example: "Totem inteligente emite senha de triagem, que é chamada na tela principal, medindo exatamente a eficiência de cada guichê."
  },
  {
    id: "varejo-redes",
    name: "Varejo e Redes de Lojas",
    problem: "Alto custo e lentidão para trocar cartazes promocionais impressos, e dificuldade de sincronizar anúncios em dezenas de filiais.",
    solution: "Gerenciamento centralizado de telas indoor, com atualização de campanhas, preços e ofertas via nuvem em segundos.",
    product: "SignageFlow",
    example: "A matriz altera o preço de um calçado no painel do SignageFlow, e instantaneamente 50 lojas atualizam a oferta em suas vitrines digitais."
  },
  {
    id: "processos-manuais",
    name: "Processos Manuais",
    problem: "Erros de digitação, planilhas perdidas, controle de dados offline e lentidão nas respostas operacionais do dia a dia das equipes.",
    solution: "Desenvolvimento sob medida de painéis, bancos de dados, fluxos inteligentes de automação e controle seguro de acessos.",
    product: "Sistemas Customizados",
    example: "Um portal administrativo web conecta a entrada de pedidos físicos com faturamento e despacho automático em nuvem."
  }
];

// 10. DIFFERENTIALS - High-impact concepts
export const DIFFERENTIALS = [
  {
    num: "01",
    title: "Orientado a Problemas Reais",
    desc: "Não vendemos inovação vazia. Observamos a sua rotina comercial física para criar soluções que removem fricção operacional real."
  },
  {
    num: "02",
    title: "Ecossistema Integrado",
    desc: "Nossos produtos conversam entre si e com seus sistemas. Telas, painéis de senha e displays operam em sincronia perfeita."
  },
  {
    num: "03",
    title: "Interface Simples para Equipes",
    desc: "Projetamos para quem está na ponta. Nossos sistemas exigem treinamento mínimo e são operados com extrema facilidade por qualquer funcionário."
  },
  {
    num: "04",
    title: "Arquitetura Própria Escalável",
    desc: "Por sermos donos e desenvolvedores da nossa stack, garantimos que os sistemas se mantenham rápidos mesmo com alto tráfego."
  },
  {
    num: "05",
    title: "Implantação e Suporte Próximos",
    desc: "Fornecemos acompanhamento próximo na hora de ligar os sistemas físicos no seu estabelecimento e suporte técnico contínuo."
  }
];

// 16. FAQ QUESTIONS - Fully accessible accordion questions
export const FAQS: FAQItem[] = [
  {
    question: "A Nexa Reis desenvolve sistemas sob medida?",
    answer: "Sim, além de oferecermos nossa suíte de produtos (ChamaAí Food, ChamaAí — Gestão de Filas, SignageFlow), nós desenvolvemos softwares específicos, painéis de controle, bancos de dados e automações customizadas de acordo com as regras de negócio de sua operação."
  },
  {
    question: "Os produtos podem ser personalizados?",
    answer: "Com certeza. Nossos sistemas SaaS permitem personalizar cores, logotipos, fontes e comportamentos de chamada (como sons, triagem de senhas e layout de visualização) para refletirem a marca de sua empresa."
  },
  {
    question: "É possível integrar com sistemas existentes?",
    answer: "Sim. Nossas soluções contam com APIs robustas preparadas para receber e enviar dados para os seus sistemas existentes (ERPs, CRMs, sistemas de ponto de venda ou prontuários médicos), garantindo que a informação circule sem redigitação manual."
  },
  {
    question: "Os sistemas funcionam em televisão, tablet e computador?",
    answer: "Sim, todas as nossas interfaces são responsivas e adaptadas para o hardware correspondente: painéis de chamada e painéis de retirada de pedidos funcionam perfeitamente em Smart TVs convencionais (ou via TV Box); painéis de operador rodam em computadores ou tablets de qualquer tamanho."
  },
  {
    question: "A Nexa Reis oferece acompanhamento de implantação?",
    answer: "Sim. Entendemos que a transição digital exige cuidado. Acompanhamos a instalação física, configuração das telas, testes operacionais e treinamento básico de suas equipes para garantir uma operação sem sustos desde o primeiro dia."
  },
  {
    question: "Existe cobrança de mensalidade?",
    answer: "Para nossos produtos SaaS (ChamaAí e SignageFlow), trabalhamos com planos mensais recorrentes flexíveis com base no número de telas, operadores ou senhas chamadas. Para desenvolvimento de sistemas sob medida, o modelo de orçamento é estabelecido em escopo fechado ou contratos de evolução de produto."
  },
  {
    question: "Os produtos atendem a várias unidades ou franquias?",
    answer: "Sim, nossos sistemas são multitenant e multi-unidade. Você pode gerenciar dezenas de lojas, filiais ou clínicas a partir de uma única conta administrativa central, com níveis finos de permissão para gerentes locais e operadores."
  },
  {
    question: "É possível criar ou solicitar uma demonstração?",
    answer: "Sim. Disponibilizamos demonstrações interativas abertas de nossos principais produtos. Você pode testá-los diretamente clicando nos links ao longo desta página ou preenchendo o formulário de contato para que um consultor monte um cenário exclusivo para sua empresa."
  },
  {
    question: "Como funciona o suporte pós-implantação?",
    answer: "Oferecemos suporte técnico estruturado com canais de comunicação diretos no WhatsApp e e-mail. Nossos planos de suporte garantem SLAs rápidos para que sua operação de atendimento ou exibição promocional nunca pare de funcionar."
  },
  {
    question: "A Nexa Reis atende empresas de quais segmentos?",
    answer: "Atendemos principalmente redes de varejo, supermercados, clínicas de saúde, hospitais, laboratórios, restaurantes, padarias, docerias, agências de publicidade e qualquer empresa de atendimento ao público ou que necessite automatizar processos analógicos."
  }
];

export const managerFeedbacks: ManagerFeedback[] = [
  {
    id: "mercantil-santa-paula",
    company: "Mercantil Santa Paula",
    companyUrl: "https://www.mercantilsantapaula.com.br/",
    segment: "Varejo alimentar",
    managerName: "Sr. Luiz",
    managerRole: "Gestor Geral",
    quote: "Facilitou muito nosso atendimento, organizando as filas e também vendo em tempo real os preços dos queijos",
    context: "O Mercantil Santa Paula escolheu soluções da Nexa Reis para organizar o atendimento ao público e aprimorar a gestão dos conteúdos exibidos em suas telas.",
    products: [
      {
        name: "ChamaAí",
        url: "https://chamaai-nine.vercel.app/"
      },
      {
        name: "SignageFlow",
        url: "https://signageflow.com.br/"
      }
    ],
    logo: "/images/clients/mercantil-santa-paula.png",
    managerPhoto: "",
    companyImages: [],
    productImages: [],
    approved: true
  }
];

