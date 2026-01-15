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
    <section id="contato" className="py-24 relative overflow-hidden">
      {/* Background blobs for this section */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-nexa-blue/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-nexa-orange/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side Copy */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Vamos Construir o <br/>
              <span className="text-gradient">Futuro Juntos?</span>
            </motion.h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Pronto para otimizar sua operação? Preencha o formulário e nossa equipe de especialistas entrará em contato em até 24 horas para uma consultoria inicial gratuita.
            </p>

            <div className="bg-nexa-slate800/30 border border-nexa-slate800 rounded-2xl p-8 mb-8">
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <MessageSquare className="text-nexa-cyan" size={20} /> Preferência por WhatsApp?
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Se preferir uma conversa mais rápida, chame nosso time comercial diretamente.
              </p>
              <Button variant="outline" className="w-full sm:w-auto" onClick={openWhatsApp}>
                Falar no WhatsApp
              </Button>
            </div>
          </div>

          {/* Right Side Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-nexa-slate900 border border-nexa-slate800 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
          >
             {status === ContactStatus.SUCCESS && (
                <div className="absolute inset-0 bg-nexa-slate900 z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-green-500 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Mensagem Recebida!</h3>
                  <p className="text-gray-400">Obrigado pelo contato. Retornaremos em breve.</p>
                </div>
              )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Nome Completo *</label>
                  <input 
                    {...register('name')}
                    className="w-full bg-nexa-navy border border-nexa-slate800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-nexa-blue focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    placeholder="Seu nome"
                  />
                  {errors.name && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.name.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Email Corporativo *</label>
                  <input 
                    {...register('email')}
                    className="w-full bg-nexa-navy border border-nexa-slate800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-nexa-blue focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    placeholder="voce@empresa.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.email.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Telefone *</label>
                  <input 
                    {...register('phone')}
                    className="w-full bg-nexa-navy border border-nexa-slate800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-nexa-blue focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    placeholder="(00) 00000-0000"
                  />
                  {errors.phone && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.phone.message}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Empresa</label>
                  <input 
                    {...register('company')}
                    className="w-full bg-nexa-navy border border-nexa-slate800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-nexa-blue focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                    placeholder="Nome da sua empresa"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Serviço de Interesse *</label>
                <select 
                  {...register('service')}
                  className="w-full bg-nexa-navy border border-nexa-slate800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-nexa-blue focus:border-transparent outline-none transition-all"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="automacao">Automação Empresarial (RPA)</option>
                  <option value="desenvolvimento">Sistemas Personalizados</option>
                  <option value="integracao">Integração de Sistemas</option>
                  <option value="outros">Outros</option>
                </select>
                {errors.service && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.service.message}</span>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Mensagem *</label>
                <textarea 
                  {...register('message')}
                  rows={4}
                  className="w-full bg-nexa-navy border border-nexa-slate800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-nexa-blue focus:border-transparent outline-none transition-all placeholder:text-gray-600 resize-none"
                  placeholder="Conte um pouco sobre seu desafio..."
                />
                {errors.message && <span className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.message.message}</span>}
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={status === ContactStatus.SUBMITTING}
              >
                {status === ContactStatus.SUBMITTING ? (
                   <span className="flex items-center gap-2">
                     <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                     Enviando...
                   </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Enviar Solicitação <Send size={18} />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};