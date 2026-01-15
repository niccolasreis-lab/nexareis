import { NavItem, ServiceItem, StatItem } from './types';
import { Bot, Code2, Workflow, Zap, Database, Cpu } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'automacao',
    title: 'Automação Empresarial',
    description: 'Elimine tarefas repetitivas e libere sua equipe para atividades estratégicas com nossos robôs de software.',
    icon: Bot,
    link: '#contato'
  },
  {
    id: 'sistemas',
    title: 'Sistemas Personalizados',
    description: 'Softwares sob medida que se adaptam perfeitamente às necessidades e regras de negócio da sua empresa.',
    icon: Code2,
    link: '#contato'
  },
  {
    id: 'integracao',
    title: 'Integração de Sistemas',
    description: 'Conecte suas ferramentas (ERP, CRM, Marketing) e centralize informações em uma única plataforma.',
    icon: Workflow,
    link: '#contato'
  },
];

export const PRODUCT_HIGHLIGHTS: ServiceItem[] = [
  {
    id: 'nexa-solutions',
    title: 'Nexa Solutions',
    description: 'Nossa suíte proprietária de ferramentas para gestão ágil e monitoramento de processos.',
    icon: Zap,
    link: '#produtos'
  },
   {
    id: 'nexa-data',
    title: 'Nexa Data',
    description: 'Infraestrutura de dados escalável para suportar inteligência artificial e analytics.',
    icon: Database,
    link: '#produtos'
  },
];

export const STATS: StatItem[] = [
  { value: 500, suffix: '+', label: 'Processos Automatizados' },
  { value: 98, suffix: '%', label: 'Satisfação dos Clientes' },
  { value: 70, suffix: '%', label: 'Redução de Custos' },
  { value: 24, suffix: '/7', label: 'Sistemas Ativos' },
];

export const CONTACT_INFO = {
  phone: '+55 11 99999-9999',
  email: 'contato@nexareis.com.br',
  address: 'Av. Paulista, 1000 - São Paulo, SP',
  social: {
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    twitter: 'https://twitter.com'
  }
};