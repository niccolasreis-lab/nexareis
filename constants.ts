import { NavItem, ServiceItem, StatItem } from './types';
import { Bot, Code2, Workflow, Zap, Database, Cpu } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '#home' },
  { label: 'Produtos', href: '#produtos' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Processo', href: '#processo' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'FAQ', href: '#faq' },
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
  name: 'Nexa Reis Automation',
  url: 'https://www.nexareis.com.br',
  phone: '+55 11 93710-5501',
  whatsappRaw: '5511937105501',
  email: 'niccolasreis@gmail.com',
  address: 'Atendimento em São Paulo, SP',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=S%C3%A3o+Paulo%2C+SP',
  social: {
    linkedin: 'https://linkedin.com/company/nexareisautomation',
    instagram: 'https://instagram.com/nexareisautomation',
    whatsapp: 'https://wa.me/5511937105501'
  }
};
