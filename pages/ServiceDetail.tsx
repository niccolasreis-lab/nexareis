import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SERVICES, PRODUCT_HIGHLIGHTS } from '../constants';
import { Button } from '../components/Button';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  
  // Busca o serviço tanto em SERVICES quanto em PRODUCT_HIGHLIGHTS
  const service = [...SERVICES, ...PRODUCT_HIGHLIGHTS].find(s => s.id === serviceId);

  if (!service) {
    return (
      <div className="container section-py" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2 className="section-title">Serviço não encontrado</h2>
        <Link to="/">
          <Button variant="outline">Voltar para Home</Button>
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="bg-navy" style={{ minHeight: '100vh', paddingTop: '8rem' }}>
      <div className="container">
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gray-400)', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Voltar para Home
        </Link>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card-icon-box" style={{ width: '4rem', height: '4rem' }}>
              <Icon size={32} />
            </div>
            <h1 className="section-title" style={{ marginTop: '1.5rem' }}>{service.title}</h1>
            <p className="section-desc" style={{ textAlign: 'left', marginLeft: 0 }}>
              {service.description}
            </p>

            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>O que está incluído:</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Consultoria especializada', 'Implementação ágil', 'Suporte técnico 24/7', 'Escalabilidade garantida'].map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-gray-300)' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-cyan)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="form-card"
          >
            <h3 style={{ color: 'white', marginBottom: '1.5rem', textAlign: 'center' }}>Solicite um orçamento para este serviço</h3>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.875rem', marginBottom: '2rem', textAlign: 'center' }}>
              Nossos especialistas analisarão seu caso e enviarão uma proposta personalizada para <strong>{service.title}</strong>.
            </p>
            <Link to="/#contato">
              <Button variant="lime" size="lg" className="w-full font-bold">Ir para formulário de contato</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};