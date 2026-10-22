/** Verified personal history and contact details; no unconfirmed individual project credits. */
export const nicolasProfile = {
  name: 'Nícolas Reis',
  city: 'São Paulo – SP',
  whatsapp: 'https://wa.me/5511937105501',
  phone: '(11) 93710-5501',
  instagram: 'https://www.instagram.com/nicolasreis.tech/',
  instagramHandle: '@nicolasreis.tech',
  github: 'https://github.com/niccolasreis-lab',
  portrait: '/images/team/nicolas-reis.jpg',
  experience: [
    {
      period: 'Setembro de 2021 — atualmente',
      role: 'Encarregado Administrativo',
      details: 'Rotinas administrativas, acompanhamento de processos internos e apoio à organização das atividades operacionais.',
    },
    {
      period: 'Novembro de 2020 — setembro de 2021',
      role: 'Operador de Atendimento de Loja',
      details: 'Atendimento ao público e apoio às rotinas de funcionamento e operação da loja.',
    },
    {
      period: 'Janeiro de 2019 — novembro de 2020',
      role: 'Balconista',
      details: 'Atendimento direto aos clientes e suporte às atividades diárias do balcão.',
    },
    {
      period: 'Janeiro de 2018 — dezembro de 2018',
      role: 'Ajudante Geral',
      details: 'Apoio aos supervisores, empacotamento de mercadorias, atendimento ao cliente e colaboração com as demandas operacionais da loja.',
    },
  ],
  courses: [
    { name: 'Análise e Desenvolvimento de Sistemas', institution: 'Faculdade Anhanguera', period: '2º semestre — cursando' },
    { name: 'Informática', institution: 'CETEF', period: '2015' },
    { name: 'Manutenção de Microcomputadores', institution: 'Seven Computadores', period: '2015' },
  ],
} as const;
