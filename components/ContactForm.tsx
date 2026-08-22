import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { Phone, Mail, MapPin, Building, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

interface FormState {
  nome: string;
  empresa: string;
  email: string;
  whatsapp: string;
  segmento: string;
  necessidade: string;
  mensagem: string;
}

const INITIAL_STATE: FormState = {
  nome: '',
  empresa: '',
  email: '',
  whatsapp: '',
  segmento: '',
  necessidade: '',
  mensagem: ''
};

const CONTACT_WEBHOOK_URL =
  import.meta.env.VITE_CONTACT_WEBHOOK_URL ||
  'https://1-n8n.n3hukr.easypanel.host/webhook/nexareis/formularios';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const handleContactIntent = (event: Event) => {
      const intent = (event as CustomEvent<Partial<FormState>>).detail;
      if (!intent) return;

      setForm((current) => ({ ...current, ...intent }));
      setErrors({});
      setSubmitSuccess(false);
      setSubmitError('');
    };

    window.addEventListener('nexa:contact-intent', handleContactIntent);
    return () => window.removeEventListener('nexa:contact-intent', handleContactIntent);
  }, []);

  // Mask function for Brazilian WhatsApp / Phone formatting
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setForm({ ...form, whatsapp: formatted });
    if (errors.whatsapp) setErrors({ ...errors, whatsapp: undefined });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name as keyof FormState]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};
    
    if (!form.nome.trim()) newErrors.nome = "O nome completo é obrigatório.";
    if (!form.empresa.trim()) newErrors.empresa = "O nome da empresa é obrigatório.";
    
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    }

    // Phone length check for Brazilian numbers
    const cleanPhone = form.whatsapp.replace(/\D/g, '');
    if (!form.whatsapp.trim()) {
      newErrors.whatsapp = "O WhatsApp é obrigatório.";
    } else if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      newErrors.whatsapp = "Insira um número de WhatsApp com DDD (10 ou 11 dígitos).";
    }

    if (!form.segmento) newErrors.segmento = "Selecione o seu segmento comercial.";
    if (!form.necessidade) newErrors.necessidade = "Selecione o seu tipo de necessidade.";
    if (!form.mensagem.trim()) newErrors.mensagem = "Escreva uma breve mensagem sobre seu projeto.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formulario: 'Contato Comercial NexaReis',
          origem: window.location.href,
          ...form
        }),
        signal: controller.signal
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true) {
        throw new Error('Não foi possível confirmar o recebimento da mensagem.');
      }

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setForm(INITIAL_STATE);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        error instanceof DOMException && error.name === 'AbortError'
          ? 'O envio demorou mais que o esperado. Verifique sua conexão e tente novamente.'
          : 'Não foi possível enviar sua mensagem agora. Tente novamente em alguns instantes.'
      );
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <section id="contato" className="py-28 bg-[#F5F5F2] text-[#050505] relative overflow-hidden border-t border-[#EBEBE6]">
      <div className="absolute inset-0 grid-lines opacity-[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Institutional Contacts and Value proposition */}
          <div className="lg:col-span-5 text-left">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-blue font-bold block mb-4">
              Contato Comercial
            </span>
            <h2 className="title-editorial text-[#050505] uppercase mb-6">
              Comece a otimizar <br />
              sua operação <span className="text-brand-blue font-bold">hoje.</span>
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#666662] leading-relaxed mb-10 font-light">
              Nossa equipe de engenheiros e designers de produto está pronta para entender seus processos manuais e desenhar as soluções sob medida que economizam tempo e aumentam seus lucros. Preencha o formulário e responderemos em até 24 horas úteis.
            </p>

            {/* Direct contact badges */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#EBEBE6]">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-[9px] uppercase tracking-wider text-gray-sec font-bold">Envie um e-mail</h4>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="font-sans text-sm font-semibold text-[#050505] hover:text-brand-blue transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#EBEBE6]">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-[9px] uppercase tracking-wider text-gray-sec font-bold">WhatsApp Comercial</h4>
                  <a href={CONTACT_INFO.social.whatsapp} target="_blank" rel="noreferrer" className="font-sans text-sm font-semibold text-[#050505] hover:text-brand-blue transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#EBEBE6]">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/5 text-brand-blue flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-mono text-[9px] uppercase tracking-wider text-gray-sec font-bold">Localização</h4>
                  <a href={CONTACT_INFO.mapsUrl} target="_blank" rel="noreferrer" className="font-sans text-sm font-medium text-[#555550] hover:text-brand-blue transition-colors">
                    {CONTACT_INFO.address}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form Block */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border border-[#EBEBE6] shadow-sm relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-left"
                    noValidate
                  >
                    <h3 className="font-display text-lg font-bold text-[#050505] uppercase tracking-tight mb-6">
                      Apresente seu projeto comercial
                    </h3>

                    {/* Nome & Empresa Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="nome" className="font-mono text-[10px] uppercase tracking-widest text-gray-sec font-bold">
                          Seu Nome Completo *
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            id="nome"
                            name="nome"
                            value={form.nome}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-[#F5F5F2] border rounded-xl text-sm text-[#050505] focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors ${
                              errors.nome ? 'border-red-400' : 'border-[#EBEBE6]'
                            }`}
                            placeholder="Ex: João da Silva"
                          />
                        </div>
                        {errors.nome && <span className="text-[10px] text-red-500 font-sans mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.nome}</span>}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="empresa" className="font-mono text-[10px] uppercase tracking-widest text-gray-sec font-bold">
                          Nome da Empresa *
                        </label>
                        <div className="relative">
                          <input 
                            type="text" 
                            id="empresa"
                            name="empresa"
                            value={form.empresa}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-[#F5F5F2] border rounded-xl text-sm text-[#050505] focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors ${
                              errors.empresa ? 'border-red-400' : 'border-[#EBEBE6]'
                            }`}
                            placeholder="Ex: Minha Empresa Ltda"
                          />
                        </div>
                        {errors.empresa && <span className="text-[10px] text-red-500 font-sans mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.empresa}</span>}
                      </div>
                    </div>

                    {/* E-mail & WhatsApp Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-gray-sec font-bold">
                          E-mail Corporativo *
                        </label>
                        <div className="relative">
                          <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 bg-[#F5F5F2] border rounded-xl text-sm text-[#050505] focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors ${
                              errors.email ? 'border-red-400' : 'border-[#EBEBE6]'
                            }`}
                            placeholder="Ex: joao@empresa.com"
                          />
                        </div>
                        {errors.email && <span className="text-[10px] text-red-500 font-sans mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="whatsapp" className="font-mono text-[10px] uppercase tracking-widest text-gray-sec font-bold">
                          WhatsApp de Contato *
                        </label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            id="whatsapp"
                            name="whatsapp"
                            value={form.whatsapp}
                            onChange={handlePhoneChange}
                            className={`w-full px-4 py-3 bg-[#F5F5F2] border rounded-xl text-sm text-[#050505] focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors ${
                              errors.whatsapp ? 'border-red-400' : 'border-[#EBEBE6]'
                            }`}
                            placeholder="(88) 99999-9999"
                          />
                        </div>
                        {errors.whatsapp && <span className="text-[10px] text-red-500 font-sans mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.whatsapp}</span>}
                      </div>
                    </div>

                    {/* Segmento & Necessidade selectors Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="segmento" className="font-mono text-[10px] uppercase tracking-widest text-gray-sec font-bold">
                          Seu Segmento Comercial *
                        </label>
                        <select 
                          id="segmento"
                          name="segmento"
                          value={form.segmento}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-[#F5F5F2] border rounded-xl text-sm text-[#050505] focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors appearance-none cursor-pointer ${
                            errors.segmento ? 'border-red-400' : 'border-[#EBEBE6]'
                          }`}
                        >
                          <option value="">Selecione...</option>
                          <option value="supermercados">Supermercados / Lojas</option>
                          <option value="restaurantes">Restaurantes / Docerias</option>
                          <option value="clinicas">Clínicas / Laboratórios</option>
                          <option value="varejo">Varejo / Franquias</option>
                          <option value="outros">Outros Processos Manuais</option>
                        </select>
                        {errors.segmento && <span className="text-[10px] text-red-500 font-sans mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.segmento}</span>}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="necessidade" className="font-mono text-[10px] uppercase tracking-widest text-gray-sec font-bold">
                          Tipo de Necessidade *
                        </label>
                        <select 
                          id="necessidade"
                          name="necessidade"
                          value={form.necessidade}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-[#F5F5F2] border rounded-xl text-sm text-[#050505] focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors appearance-none cursor-pointer ${
                            errors.necessidade ? 'border-red-400' : 'border-[#EBEBE6]'
                          }`}
                        >
                          <option value="">Selecione...</option>
                          <option value="chamaai-food">ChamaAí Food (Delivery)</option>
                          <option value="chamaai-filas">ChamaAí Gestão de Filas</option>
                          <option value="signageflow">SignageFlow (Mídia Indoor)</option>
                          <option value="cesta-esperta">CestaEsperta (Catálogo, Pedidos e Logística)</option>
                          <option value="sob-medida">Sistema Customizado Sob Medida</option>
                          <option value="outros">Outras dúvidas ou parcerias</option>
                        </select>
                        {errors.necessidade && <span className="text-[10px] text-red-500 font-sans mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.necessidade}</span>}
                      </div>
                    </div>

                    {/* Mensagem TextBox */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="mensagem" className="font-mono text-[10px] uppercase tracking-widest text-gray-sec font-bold">
                        Como podemos ajudar o seu negócio? *
                      </label>
                      <textarea 
                        id="mensagem"
                        name="mensagem"
                        rows={4}
                        value={form.mensagem}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-[#F5F5F2] border rounded-xl text-sm text-[#050505] focus:outline-none focus:ring-1 focus:ring-brand-blue transition-colors resize-none ${
                          errors.mensagem ? 'border-red-400' : 'border-[#EBEBE6]'
                        }`}
                        placeholder="Conte-nos brevemente sobre os gargalos do seu processo operacional atual..."
                      />
                      {errors.mensagem && <span className="text-[10px] text-red-500 font-sans mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.mensagem}</span>}
                    </div>

                    {/* Submission button with loader */}
                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full py-4 bg-[#050505] text-white hover:bg-black font-semibold uppercase tracking-wider"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-brand-cyan" />
                          Enviando proposta...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Enviar Proposta Operacional <Send className="w-4 h-4" />
                        </span>
                      )}
                    </Button>

                    {submitError && (
                      <div
                        role="alert"
                        className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center flex flex-col items-center justify-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-500 animate-[bounce_1s_1]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    
                    <div className="max-w-md">
                      <h3 className="font-display text-2xl font-black text-[#050505] uppercase tracking-tight mb-2">
                        Mensagem Recebida!
                      </h3>
                      <p className="font-sans text-sm text-gray-sec leading-relaxed">
                        Agradecemos o seu contato. Nossa equipe de engenharia e modelagem operacional já foi notificada e entrará em contato com você via e-mail ou WhatsApp em até 24 horas úteis.
                      </p>
                    </div>

                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="font-mono text-xs text-brand-blue font-bold hover:underline cursor-pointer"
                    >
                      Enviar nova mensagem
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
