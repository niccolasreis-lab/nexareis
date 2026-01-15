import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './Button';
import { ContactStatus } from '../types';
import { Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Schema Definition
const contactSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Digite um e-mail válido'),
  phone: z.string().min(10, 'Digite um telefone válido'),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecione um serviço de interesse'),
  message: z.string().min(20, 'A mensagem deve ter pelo menos 20 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<ContactStatus>(ContactStatus.IDLE);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus(ContactStatus.SUBMITTING);
    // Simulate API call
    setTimeout(() => {
      console.log('Form Data:', data);
      setStatus(ContactStatus.SUCCESS);
      reset();
      
      // Reset status after a delay
      setTimeout(() => setStatus(ContactStatus.IDLE), 5000);
    }, 1500);
  };

  const openWhatsApp = () => {
    const text = "Olá, gostaria de falar com um especialista da NexaReis.";
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contato" className="section-py" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background blobs for this section */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '24rem', height: '24rem', backgroundColor: 'rgba(0, 102, 255, 0.05)', borderRadius: '50%', filter: 'blur(100px)', zIndex: -10 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '24rem', height: '24rem', backgroundColor: 'rgba(255, 107, 53, 0.05)', borderRadius: '50%', filter: 'blur(100px)', zIndex: -10 }} />

      <div className="container">
        <div className="contact-grid">
          
          {/* Left Side Copy */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="section-title"
            >
              Vamos Construir o <br/>
              <span className="text-gradient">Futuro Juntos?</span>
            </motion.h2>
            <p style={{ fontSize: '1.125rem', color: '#9ca3af', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Pronto para otimizar sua operação? Preencha o formulário e nossa equipe de especialistas entrará em contato em até 24 horas para uma consultoria inicial gratuita.
            </p>

            <div className="contact-info-box">
              <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare className="text-cyan" style={{ color: 'var(--color-cyan)' }} size={20} /> Preferência por WhatsApp?
              </h4>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem' }}>
                Se preferir uma conversa mais rápida, chame nosso time comercial diretamente.
              </p>
              <Button variant="outline" style={{ width: '100%', maxWidth: '200px' }} onClick={openWhatsApp}>
                Falar no WhatsApp
              </Button>
            </div>
          </div>

          {/* Right Side Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="form-card"
          >
             {status === ContactStatus.SUCCESS && (
                <div className="success-overlay">
                  <div style={{ width: '4rem', height: '4rem', backgroundColor: 'rgba(34, 197, 94, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <CheckCircle2 style={{ color: '#22c55e', width: '2rem', height: '2rem' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>Mensagem Recebida!</h3>
                  <p style={{ color: '#9ca3af' }}>Obrigado pelo contato. Retornaremos em breve.</p>
                </div>
              )}

            <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative', zIndex: 10 }}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Nome Completo *</label>
                  <input 
                    {...register('name')}
                    className="form-input"
                    placeholder="Seu nome"
                  />
                  {errors.name && <span className="error-msg"><AlertCircle size={12}/> {errors.name.message}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Email Corporativo *</label>
                  <input 
                    {...register('email')}
                    className="form-input"
                    placeholder="voce@empresa.com"
                  />
                  {errors.email && <span className="error-msg"><AlertCircle size={12}/> {errors.email.message}</span>}
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Telefone *</label>
                  <input 
                    {...register('phone')}
                    className="form-input"
                    placeholder="(00) 00000-0000"
                  />
                  {errors.phone && <span className="error-msg"><AlertCircle size={12}/> {errors.phone.message}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Empresa</label>
                  <input 
                    {...register('company')}
                    className="form-input"
                    placeholder="Nome da sua empresa"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Serviço de Interesse *</label>
                <select 
                  {...register('service')}
                  className="form-select"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="automacao">Automação Empresarial (RPA)</option>
                  <option value="desenvolvimento">Sistemas Personalizados</option>
                  <option value="integracao">Integração de Sistemas</option>
                  <option value="outros">Outros</option>
                </select>
                {errors.service && <span className="error-msg"><AlertCircle size={12}/> {errors.service.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Mensagem *</label>
                <textarea 
                  {...register('message')}
                  rows={4}
                  className="form-textarea"
                  style={{ resize: 'none' }}
                  placeholder="Conte um pouco sobre seu desafio..."
                />
                {errors.message && <span className="error-msg"><AlertCircle size={12}/> {errors.message.message}</span>}
              </div>

              <Button 
                type="submit" 
                style={{ width: '100%' }}
                size="lg"
                disabled={status === ContactStatus.SUBMITTING}
              >
                {status === ContactStatus.SUBMITTING ? (
                   <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <span style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></span>
                     Enviando...
                   </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Enviar Solicitação <Send size={18} />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
};