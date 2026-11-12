import { projectCases } from '../data/projectCases.ts';

export const ORIGIN = 'https://www.nexareis.com.br';
export const routeMetadata: Record<string, { title: string; description: string }> = {
  '/orcamento': { title: 'Orçamento guiado para sua empresa | Nexa Reis', description: 'Escolha o tipo de negócio e a rotina que deseja organizar. Conheça uma solução da Nexa Reis e prepare o resumo para conversar sobre sua operação.' },
  ...Object.fromEntries(Object.entries(projectCases).map(([id, project]) => ['/projetos/' + id, { title: project.name + ' | Projetos Nexa Reis', description: project.summary }])),
  '/': { title: 'Sites, sistemas e automação empresarial | Nexa Reis', description: 'Sites profissionais, sistemas sob medida e automações para empresas. Conheça os produtos e soluções da Nexa Reis em São Paulo.' },
  '/curriculo': { title: 'Currículo de Nícolas Reis | Administração e Tecnologia', description: 'Currículo de Nícolas Reis, com experiência administrativa, formação na Anhanguera e cursos de informática. Formato A4 para impressão ou PDF.' },
  '/nicolas-reis': { title: 'Nícolas Reis | Fundador da Nexa Reis e Tecnologia', description: 'Portfólio profissional de Nícolas Reis, fundador da Nexa Reis e criador de sistemas, com experiência administrativa e formação em Análise e Desenvolvimento de Sistemas.' },
  '/servicos/automacao': { title: 'Automação empresarial | Nexa Reis', description: 'Organize processos e reduza tarefas repetitivas com automações planejadas para sua empresa.' },
  '/servicos/sistemas': { title: 'Sistemas personalizados | Nexa Reis', description: 'Sistemas desenvolvidos conforme os processos e necessidades da sua empresa.' },
  '/servicos/integracao': { title: 'Integração de sistemas | Nexa Reis', description: 'Conecte ferramentas para compartilhar informações e reduzir a redigitação de dados.' },
  '/servicos/nexa-solutions': { title: 'Nexa Solutions | Nexa Reis', description: 'Conheça as ferramentas da Nexa Reis para gestão e acompanhamento de processos.' },
  '/servicos/nexa-data': { title: 'Nexa Data | Nexa Reis', description: 'Converse sobre dados e integração de informações para sua empresa.' },
};

