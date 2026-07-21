import React from 'react';
import { Hero } from '../components/Hero';
import { Manifesto } from '../components/Manifesto';
import { ProductShowcase } from '../components/ProductShowcase';
import { ProductComparison } from '../components/ProductComparison';
import { CustomSolutions } from '../components/CustomSolutions';
import { DevelopmentProcess } from '../components/DevelopmentProcess';
import { IndustrySelector } from '../components/IndustrySelector';
import { MetricsGrid } from '../components/MetricsGrid';
import { AboutSection } from '../components/AboutSection';
import { ManagerFeedbackSection } from '../components/ManagerFeedbackSection';
import { FAQAccordion } from '../components/FAQAccordion';
import { ContactForm } from '../components/ContactForm';
import { SectionIndicator } from '../components/SectionIndicator';

export const Home: React.FC = () => {
  return (
    <>
      {/* Section Side Navigation Indicator (Tracks user scroll position) */}
      <SectionIndicator />

      {/* 1. Hero Section - TV, Monitor & Laptop interactive mockups */}
      <Hero />

      {/* 2. Manifesto - Transition to White-Soft background, Asymmetric editorial grid */}
      <Manifesto />

      {/* 3. Portfólio de Produtos - ChamaAí Food, ChamaAí Filas & SignageFlow dynamic tabs */}
      <ProductShowcase />

      {/* 4. Tabela de Comparação Visual */}
      <ProductComparison />

      {/* 5. Soluções Customizadas Sob Medida */}
      <CustomSolutions />

      {/* 6. Processo de Desenvolvimento - Horizontal Desktop, Vertical Mobile */}
      <DevelopmentProcess />

      {/* 7. Seletor de Segmentos Atendidos - Interactive click operational states */}
      <IndustrySelector />

      {/* 8. Métricas e Resultados - High impact metrics array */}
      <MetricsGrid />

      {/* 9. Sobre a Nexa Reis - Institutional and tech stack showcase */}
      <AboutSection />

      {/* 10. Feedback de Gestores e Clientes - Prova social com controle admin */}
      <ManagerFeedbackSection />

      {/* 11. FAQ Accordion - 10 ARIA accessible accordion Q&As */}
      <FAQAccordion />

      {/* 11. CTA Final / Lead Capturing validated form */}
      <ContactForm />
    </>
  );
};
