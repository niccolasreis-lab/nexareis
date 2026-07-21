import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
}

export enum ContactStatus {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface ManagerFeedback {
  id: string;
  company: string;
  companyUrl?: string;
  segment: string;
  managerName: string;
  managerRole: string;
  quote: string;
  context?: string;
  products: {
    name: string;
    url: string;
  }[];
  logo?: string;
  managerPhoto?: string;
  companyImages?: string[];
  productImages?: string[];
  approved: boolean;
  publishedAt?: string;
}