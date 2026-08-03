import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tv, 
  ExternalLink, 
  ArrowRight, 
  FileText, 
  Check, 
  AlertCircle, 
  Settings, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Volume2, 
  Sparkles, 
  Lock,
  Save,
  HelpCircle,
  ThumbsUp,
  X
} from 'lucide-react';
import { ManagerFeedback } from '../types';
import { managerFeedbacks as initialFeedbacks } from '../data/landingData';

// ==========================================
// 1. CLIENT LOGO COMPONENT
// ==========================================
export const ClientLogo: React.FC<{ src?: string; alt?: string; className?: string }> = ({
  src = '/images/clients/mercantil-santa-paula.png',
  alt = 'Logo do Mercantil Santa Paula',
  className = "w-16 h-16",
}) => {
  return (
    <div className={`relative ${className} flex-shrink-0 select-none`} id="client-logo-msp">
      <img src={src} alt={alt} className="h-full w-full object-contain drop-shadow-md" />
    </div>
  );
};

// ==========================================
// 2. CLIENT PRODUCT BADGE
// ==========================================
export const ClientProductBadge: React.FC<{ name: string; url: string }> = ({ name, url }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noreferrer" 
      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-brand-cyan/10 hover:border-brand-cyan/30 text-xs text-gray-sec hover:text-white transition-all duration-300"
      id={`badge-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
      <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">{name}</span>
      <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100" />
    </a>
  );
};

// ==========================================
// 3. MANAGER QUOTE COMPONENT
// ==========================================
export const ManagerQuote: React.FC<{ quote: string; manager: string; role: string }> = ({ quote, manager, role }) => {
  const isPlaceholder = quote === "[INSERIR FEEDBACK REAL DO GESTOR DO MERCANTIL SANTA PAULA]";
  
  return (
    <div className="relative p-8 rounded-3xl bg-[#0c0c0c] border border-white/5 overflow-hidden" id="manager-quote-container">
      {/* Decorative quotes graphic */}
      <div className="absolute top-4 left-4 font-serif text-8xl text-white/[0.02] leading-none select-none pointer-events-none">
        “
      </div>
      
      <div className="relative z-10">
        {isPlaceholder ? (
          <div className="py-4 px-2 border border-dashed border-brand-cyan/20 bg-brand-cyan/[0.02] rounded-xl flex flex-col items-center justify-center text-center">
            <span className="font-mono text-[10px] tracking-wider text-brand-cyan font-bold uppercase mb-1">
              [ AGUARDANDO DEPOIMENTO REAL ]
            </span>
            <p className="font-sans text-xs text-gray-sec italic max-w-md">
              O depoimento deste gestor será publicado de forma destacada após validação e aprovação operacional.
            </p>
          </div>
        ) : (
          <p className="font-sans text-sm sm:text-base text-gray-light leading-relaxed italic mb-6">
            “{quote}”
          </p>
        )}
        
        <div className="mt-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-brand-cyan font-bold uppercase">
            {manager !== "[NOME DO GESTOR]" ? manager.charAt(0) : "G"}
          </div>
          <div>
            <h5 className="font-display font-bold text-xs sm:text-sm text-white">{manager}</h5>
            <p className="font-sans text-[10px] text-gray-sec tracking-wide">{role} — Mercantil Santa Paula</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. CASE STUDY METRICS COMPONENT
// ==========================================
interface MetricItem {
  value: string;
  label: string;
}

export const CaseStudyMetrics: React.FC<{ approved: boolean; customMetrics?: MetricItem[] }> = ({ approved, customMetrics }) => {
  // If not approved and no custom override, we should hide metrics completely on the live page.
  // Section 43: "Caso não existam dados reais, ocultar completamente o bloco de métricas. Não exibir placeholders no site publicado."
  const metricsToUse = customMetrics || [
    { value: "[DADO A CONFIRMAR]", label: "atendimentos organizados" },
    { value: "[DADO A CONFIRMAR]", label: "telas gerenciadas" },
    { value: "[DADO A CONFIRMAR]", label: "conteúdos publicados" }
  ];

  const hasPlaceholders = metricsToUse.some(m => m.value.includes("[DADO"));

  if (hasPlaceholders && approved) {
    // Hide completely on live/published site when metrics are placeholders
    return null;
  }

  return (
    <div className="mt-8 border-t border-white/5 pt-8" id="case-study-metrics">
      <h5 className="font-mono text-[9px] uppercase tracking-widest text-brand-cyan font-bold mb-4">
        Indicadores da Operação {hasPlaceholders && <span className="text-amber-500 font-sans italic text-[8px]">(Modo Rascunho)</span>}
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metricsToUse.map((metric, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white/[0.01] border border-white/5">
            <span className={`block font-display text-lg sm:text-xl font-bold ${
              metric.value.includes("[DADO") ? 'text-amber-500 font-mono text-xs' : 'text-white'
            }`}>
              {metric.value}
            </span>
            <span className="block font-sans text-[10px] text-gray-sec mt-1 uppercase tracking-wider leading-tight">
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 5. CASE STUDY GALLERY COMPONENT (High-Fidelity Interactive Mockups)
// ==========================================
export const CaseStudyGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chamaai' | 'signageflow'>('chamaai');
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [signageOfferIndex, setSignageOfferIndex] = useState(0);

  // Offers to cycle on SignageFlow TV mockup
  const Offers = [
    { item: "Melancia Inteira", price: "R$ 14,90", desc: "Direto do produtor", color: "from-emerald-950 to-green-900", accent: "text-green-400" },
    { item: "Pão de Queijo Mineiro", price: "R$ 2,49", desc: "Fornada quente a cada hora", color: "from-amber-950 to-orange-950", accent: "text-amber-400" },
    { item: "Arroz Integral Camil 1kg", price: "R$ 6,89", desc: "Oferta especial de mercearia", color: "from-blue-950 to-slate-900", accent: "text-blue-400" }
  ];

  useEffect(() => {
    if (activeTab === 'signageflow') {
      const interval = setInterval(() => {
        setSignageOfferIndex((prev) => (prev + 1) % Offers.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const triggerChamaAiAudio = () => {
    setSoundPlaying(true);
    // Simple Web Audio API synthesiser for a premium ticket buzzer beep
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      // Traditional dual-tone bell sound (ding-dong)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.3);

      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gainNode2 = audioCtx.createGain();
        osc2.connect(gainNode2);
        gainNode2.connect(audioCtx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(440.00, audioCtx.currentTime); // A4
        gainNode2.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        osc2.start(audioCtx.currentTime);
        osc2.stop(audioCtx.currentTime + 0.4);
      }, 250);

    } catch (e) {
      console.log("Audio not supported or blocked.");
    }
    setTimeout(() => setSoundPlaying(false), 800);
  };

  return (
    <div className="w-full flex flex-col gap-6" id="casestudy-gallery-root">
      
      {/* Tab Selector */}
      <div className="flex gap-2 p-1.5 bg-white/[0.02] border border-white/5 rounded-full max-w-xs">
        <button
          onClick={() => setActiveTab('chamaai')}
          className={`flex-1 py-2 px-4 rounded-full font-sans text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            activeTab === 'chamaai' 
              ? 'bg-white text-black font-bold shadow-md' 
              : 'text-gray-sec hover:text-white hover:bg-white/5'
          }`}
        >
          ChamaAí Filas
        </button>
        <button
          onClick={() => setActiveTab('signageflow')}
          className={`flex-1 py-2 px-4 rounded-full font-sans text-[10px] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
            activeTab === 'signageflow' 
              ? 'bg-white text-black font-bold shadow-md' 
              : 'text-gray-sec hover:text-white hover:bg-white/5'
          }`}
        >
          SignageFlow
        </button>
      </div>

      {/* Screen Frame Mockup */}
      <div className="relative rounded-3xl bg-[#080808] border border-white/10 p-4 shadow-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9.5]">
        
        {/* TV Glare/Reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none z-20" />
        
        {/* Ambient Glow behind the TV */}
        <div className={`absolute inset-0 transition-all duration-1000 blur-[80px] opacity-15 pointer-events-none ${
          activeTab === 'chamaai' ? 'bg-brand-cyan/40' : 'bg-brand-blue/40'
        }`} />

        {/* Outer Bezel indicator */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          <span className="font-mono text-[7px] text-gray-sec uppercase tracking-widest font-black">NEXA REIS DISPLAY</span>
        </div>

        {/* ----------------- CHAMAAÍ PANEL INTERFACE ----------------- */}
        <AnimatePresence mode="wait">
          {activeTab === 'chamaai' && (
            <motion.div
              key="chamaai"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full bg-[#030712] rounded-xl border border-white/5 overflow-hidden p-6 flex flex-col justify-between relative"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-brand-cyan/25 flex items-center justify-center font-bold font-mono text-[10px] text-brand-cyan">A</div>
                  <span className="font-display text-[10px] text-white tracking-widest uppercase font-black">CHAMA-AÍ FILAS</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[8px] text-gray-sec block">PAINEL DE SENHAS</span>
                  <span className="font-sans text-[10px] font-bold text-white uppercase">M. SANTA PAULA</span>
                </div>
              </div>

              {/* Main Ticket Call Panel */}
              <div className="flex-1 flex flex-col items-center justify-center py-6 text-center">
                <motion.div 
                  animate={soundPlaying ? { scale: [1, 1.05, 1], rotate: [0, -1, 1, -1, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`px-8 py-4 sm:px-12 sm:py-6 rounded-2xl border transition-colors duration-300 ${
                    soundPlaying 
                      ? 'bg-brand-cyan/15 border-brand-cyan/60 shadow-[0_0_20px_rgba(0,212,255,0.2)]' 
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest text-brand-cyan font-bold block mb-1">SENHA EM ATENDIMENTO</span>
                  <h1 className="font-sans text-5xl sm:text-6xl font-black text-white tracking-tight mb-2">
                    A-104
                  </h1>
                  <span className="font-mono text-[10px] text-gray-sec uppercase tracking-widest font-semibold">
                    GUICHÊ <strong className="text-white">03</strong>
                  </span>
                </motion.div>
                
                {/* Trigger call button - Interaction element */}
                <button
                  onClick={triggerChamaAiAudio}
                  className="mt-4 px-4 py-1.5 rounded-full bg-brand-cyan text-black font-sans text-[9px] tracking-widest uppercase font-black hover:bg-white hover:text-black transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 z-20"
                >
                  <Volume2 className="w-3 h-3" />
                  Simular Chamada Sonora
                </button>
              </div>

              {/* Ticket History Track footer */}
              <div className="border-t border-white/5 pt-4">
                <span className="font-mono text-[8px] text-gray-sec block uppercase tracking-widest mb-2 font-bold text-left">Últimas Chamadas</span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { num: "A-103", g: "01", active: false },
                    { num: "P-044", g: "03", active: false },
                    { num: "A-102", g: "02", active: false },
                    { num: "A-101", g: "01", active: false }
                  ].map((hist, idx) => (
                    <div key={idx} className="p-2 rounded bg-white/[0.01] border border-white/5">
                      <span className="font-sans font-black text-white text-xs block">{hist.num}</span>
                      <span className="font-mono text-[7px] text-gray-sec block">GUI {hist.g}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ----------------- SIGNAGEFLOW INTERFACE ----------------- */}
          {activeTab === 'signageflow' && (
            <motion.div
              key="signageflow"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full rounded-xl border border-white/5 overflow-hidden flex flex-col justify-between relative"
            >
              {/* Dynamic background slide color */}
              <div className={`absolute inset-0 bg-gradient-to-br ${Offers[signageOfferIndex].color} transition-all duration-700`} />
              
              <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between">
                {/* Promo Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4 text-brand-cyan" />
                    <span className="font-display text-[9px] text-white tracking-widest uppercase font-black">SIGNAGE-FLOW</span>
                  </div>
                  <div className="bg-brand-cyan text-black px-2.5 py-0.5 rounded font-mono text-[8px] uppercase tracking-wider font-black">
                    OFERTAS SANTA PAULA
                  </div>
                </div>

                {/* Offer slide contents */}
                <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4 py-3 text-left">
                  <div className="max-w-xs">
                    <span className="font-mono text-[8px] uppercase tracking-widest text-brand-cyan font-bold block mb-1">
                      {Offers[signageOfferIndex].desc}
                    </span>
                    <h2 className="font-sans text-xl sm:text-2xl font-black text-white leading-tight uppercase">
                      {Offers[signageOfferIndex].item}
                    </h2>
                    <div className="h-0.5 w-12 bg-brand-cyan mt-3" />
                  </div>
                  
                  {/* Huge Price Tag */}
                  <div className="p-4 sm:p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md text-right relative min-w-[140px]">
                    <span className="font-mono text-[7px] text-gray-sec uppercase tracking-widest block">Preço Exclusivo</span>
                    <h3 className={`font-sans text-2xl sm:text-3xl font-black ${Offers[signageOfferIndex].accent} tracking-tight`}>
                      {Offers[signageOfferIndex].price}
                    </h3>
                    <span className="font-mono text-[8px] text-white/50">pág. à vista / un.</span>
                  </div>
                </div>

                {/* Loading/Playlist Timeline bar */}
                <div>
                  <div className="flex justify-between font-mono text-[7px] text-white/60 mb-1">
                    <span>PLAYLIST: SUPERMERCADO_PROMO_V1</span>
                    <span>ATUALIZADO REMOTAMENTE</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      key={signageOfferIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="h-full bg-brand-cyan" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

// ==========================================
// 6. FEEDBACK APPROVAL STATUS BADGE
// ==========================================
export const FeedbackApprovalStatus: React.FC<{ status: string }> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case 'Aprovado para publicação':
        return { bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400', label: 'Aprovado para Publicação' };
      case 'Aguardando aprovação':
        return { bg: 'bg-amber-500/15 border-amber-500/30 text-amber-400', label: 'Aguardando Aprovação' };
      case 'Rascunho':
        return { bg: 'bg-blue-500/15 border-blue-500/30 text-blue-400', label: 'Rascunho / Interno' };
      case 'Não publicar':
        return { bg: 'bg-rose-500/15 border-rose-500/30 text-rose-400', label: 'Não Publicar' };
      default:
        return { bg: 'bg-white/5 border-white/10 text-gray-sec', label: status };
    }
  };

  const config = getStyles();

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-wider font-semibold ${config.bg}`} id="feedback-approval-badge">
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{config.label}</span>
    </div>
  );
};

// ==========================================
// 7. FEEDBACK COLLECTION FORM COMPONENT (Section 36 & 37)
// ==========================================
interface FeedbackCollectionFormProps {
  onClose: () => void;
  onSave: (feedback: ManagerFeedback) => void;
  editingFeedback?: ManagerFeedback | null;
}

export const FeedbackCollectionForm: React.FC<FeedbackCollectionFormProps> = ({ onClose, onSave, editingFeedback }) => {
  const [formData, setFormData] = useState({
    managerName: editingFeedback?.managerName || '',
    managerRole: editingFeedback?.managerRole || '',
    company: editingFeedback?.company || '',
    segment: editingFeedback?.segment || '',
    quote: editingFeedback?.quote || '',
    context: editingFeedback?.context || '',
    productsUsed: editingFeedback?.products?.map(p => p.name).join(', ') || 'ChamaAí, SignageFlow',
    
    // Questionnaire / Context inputs (Section 36 & 37)
    desafioAnterior: '',
    motivoContratacao: '',
    experienciaImplantacao: '',
    principalBeneficio: '',
    resultadoObservado: '',
    recomendaria: 'Sim',
    
    // Authorisations (Section 36 & 44)
    autorizacaoPublicacao: true,
    autorizacaoNome: true,
    autorizacaoFoto: false,
    autorizacaoLogotipo: true,
    
    status: editingFeedback ? (editingFeedback.approved ? 'Aprovado para publicação' : 'Aguardando aprovação') : 'Aguardando aprovação',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const prods = formData.productsUsed.split(',').map(p => {
        const trimmed = p.trim();
        return {
          name: trimmed,
          url: trimmed.toLowerCase().includes('chama') 
            ? 'https://chamaai-nine.vercel.app/' 
            : 'https://signageflow.com.br/'
        };
      });

      const updatedFeedback: ManagerFeedback = {
        id: editingFeedback?.id || formData.company.toLowerCase().replace(/\s+/g, '-'),
        company: formData.company,
        companyUrl: formData.company.toLowerCase().includes('santa paula') 
          ? 'https://www.mercantilsantapaula.com.br/' 
          : undefined,
        segment: formData.segment,
        managerName: formData.managerName,
        managerRole: formData.managerRole,
        quote: formData.quote,
        context: formData.context,
        products: prods,
        logo: editingFeedback?.logo || '/images/clients/mercantil-santa-paula.png',
        approved: formData.status === 'Aprovado para publicação' && formData.autorizacaoPublicacao,
        publishedAt: formData.status === 'Aprovado para publicação' ? new Date().toISOString().split('T')[0] : undefined
      };

      onSave(updatedFeedback);
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      id="feedback-modal-root"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative text-left"
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b border-white/5 pb-4 mb-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-cyan font-bold block mb-1">
              {editingFeedback ? 'Editar Registro' : 'Novo Coletor de Feedback'}
            </span>
            <h3 className="font-display font-bold text-lg text-white">
              {editingFeedback ? `Configurar Feedback: ${editingFeedback.company}` : 'Registrar Depoimento e Operação'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/5 text-gray-sec hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
          
          {/* Section 1: Core Fields */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-cyan font-bold border-b border-white/5 pb-2">
              1. Identificação de Operação
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-gray-light font-bold">Nome do Gestor *</label>
                <input 
                  type="text" 
                  required
                  value={formData.managerName}
                  onChange={e => setFormData({...formData, managerName: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                  placeholder="Ex: Nicolas Santapaula"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-gray-light font-bold">Cargo do Gestor *</label>
                <input 
                  type="text" 
                  required
                  value={formData.managerRole}
                  onChange={e => setFormData({...formData, managerRole: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                  placeholder="Ex: Diretor de Operações"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-gray-light font-bold">Empresa Cliente *</label>
                <input 
                  type="text" 
                  required
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                  placeholder="Ex: Mercantil Santa Paula"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-gray-light font-bold">Segmento Operacional *</label>
                <input 
                  type="text" 
                  required
                  value={formData.segment}
                  onChange={e => setFormData({...formData, segment: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                  placeholder="Ex: Varejo alimentar"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[11px] text-gray-light font-bold">Produtos Adquiridos (Separados por vírgula) *</label>
              <input 
                type="text" 
                required
                value={formData.productsUsed}
                onChange={e => setFormData({...formData, productsUsed: e.target.value})}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                placeholder="Ex: ChamaAí, SignageFlow"
              />
            </div>
          </div>

          {/* Section 2: Questionnaire (Section 36 & 37) */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-cyan font-bold border-b border-white/5 pb-2">
              2. Perguntas ao Gestor (Sistematização e Prova Social)
            </h4>
            
            <div className="space-y-1.5">
              <label className="font-sans text-[11px] text-gray-light">Desafio / Problema Anterior (Antes da Implantação)</label>
              <textarea 
                rows={2}
                value={formData.desafioAnterior}
                onChange={e => setFormData({...formData, desafioAnterior: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors resize-none"
                placeholder="Ex: Filas confusas e falta de sincronização das ofertas de mídia promocional indoor..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[11px] text-gray-light">Por que escolheu as soluções Nexa Reis?</label>
              <textarea 
                rows={2}
                value={formData.motivoContratacao}
                onChange={e => setFormData({...formData, motivoContratacao: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors resize-none"
                placeholder="Ex: Pela facilidade de operação na ponta pelas equipes de caixa e balcão..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[11px] text-gray-light">Como foi a experiência de Implantação?</label>
              <textarea 
                rows={2}
                value={formData.experienciaImplantacao}
                onChange={e => setFormData({...formData, experienciaImplantacao: e.target.value})}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors resize-none"
                placeholder="Ex: Instalação física rápida, equipe técnica acompanhou de perto e realizou treinamento..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-gray-light font-bold">Principal Benefício Percebido *</label>
                <input 
                  type="text" 
                  required
                  value={formData.principalBeneficio}
                  onChange={e => setFormData({...formData, principalBeneficio: e.target.value})}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                  placeholder="Ex: Organização e menos ruído no atendimento"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[11px] text-gray-light">Recomendaria a solução?</label>
                <select 
                  value={formData.recomendaria}
                  onChange={e => setFormData({...formData, recomendaria: e.target.value})}
                  className="w-full px-4 py-2.5 bg-[#0f0f0f] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors cursor-pointer"
                >
                  <option value="Sim">Sim, com certeza</option>
                  <option value="Não">Não recomendaria</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Depoimento Formal */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-cyan font-bold border-b border-white/5 pb-2">
              3. Depoimento Formal (Quote Oficial)
            </h4>
            
            <div className="space-y-1.5">
              <label className="font-sans text-[11px] text-gray-light font-bold">Feedback / Citação do Gestor *</label>
              <textarea 
                rows={3}
                required
                value={formData.quote}
                onChange={e => setFormData({...formData, quote: e.target.value})}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors resize-none"
                placeholder="Citação do gestor que será exibida entre aspas no site principal..."
              />
              <span className="text-[10px] text-gray-sec block italic">
                Caso use "[INSERIR FEEDBACK REAL...]", o sistema exibirá uma etiqueta de aguardando aprovação na live.
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-sans text-[11px] text-gray-light">Descrição / Contexto Geral</label>
              <input 
                type="text"
                value={formData.context}
                onChange={e => setFormData({...formData, context: e.target.value})}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors"
                placeholder="Ex: O Mercantil Santa Paula utiliza o ChamaAí e o SignageFlow..."
              />
            </div>
          </div>

          {/* Section 4: Authorisations & Status (Section 36 & 44) */}
          <div className="bg-white/[0.01] border border-white/5 p-4 rounded-2xl space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-cyan font-bold border-b border-white/5 pb-2">
              4. Termos, Autorizações & Publicação
            </h4>

            {/* Checkboxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2.5 text-xs text-gray-light cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={formData.autorizacaoPublicacao}
                  onChange={e => setFormData({...formData, autorizacaoPublicacao: e.target.checked})}
                  className="rounded border-white/10 text-brand-cyan focus:ring-brand-cyan bg-white/5"
                />
                <span>Autorizo publicação do feedback</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-gray-light cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={formData.autorizacaoNome}
                  onChange={e => setFormData({...formData, autorizacaoNome: e.target.checked})}
                  className="rounded border-white/10 text-brand-cyan focus:ring-brand-cyan bg-white/5"
                />
                <span>Autorizo uso do meu nome e cargo</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-gray-light cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={formData.autorizacaoLogotipo}
                  onChange={e => setFormData({...formData, autorizacaoLogotipo: e.target.checked})}
                  className="rounded border-white/10 text-brand-cyan focus:ring-brand-cyan bg-white/5"
                />
                <span>Autorizo uso do logotipo da empresa</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-gray-light cursor-pointer select-none opacity-60">
                <input 
                  type="checkbox" 
                  disabled
                  checked={formData.autorizacaoFoto}
                  className="rounded border-white/10 text-brand-cyan bg-white/5"
                />
                <span>Autorizo fotografia (A confirmar)</span>
              </label>
            </div>

            {/* Status Select (Section 36) */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <label className="font-sans text-[11px] text-brand-cyan font-bold">Estado / Status de Aprovação</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0f0f0f] border border-brand-cyan/20 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-colors cursor-pointer font-bold"
              >
                <option value="Rascunho">Rascunho</option>
                <option value="Aguardando aprovação">Aguardando aprovação</option>
                <option value="Aprovado para publicação">Aprovado para publicação (Exibir no Site)</option>
                <option value="Não publicar">Não publicar</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-white/10 text-xs text-gray-sec hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-brand-cyan hover:bg-white text-black text-xs font-bold transition-all cursor-pointer flex items-center gap-2 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Registro</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// ==========================================
// 8. TESTIMONIALS GRID COMPONENT
// ==========================================
export const TestimonialsGrid: React.FC<{ 
  feedbacks: ManagerFeedback[]; 
  onEdit: (feedback: ManagerFeedback) => void;
  isAdmin: boolean;
}> = ({ feedbacks, onEdit, isAdmin }) => {
  if (feedbacks.length <= 1 && !isAdmin) {
    // If only Mercantil Santa Paula is registered (and approved), we hide the secondary grid 
    // to keep the layout premium instead of displaying empty spaces. (Section 40)
    return null;
  }

  return (
    <div className="mt-20 border-t border-white/5 pt-16" id="secondary-testimonials-grid">
      <div className="text-left mb-10">
        <h4 className="font-display font-bold text-lg text-white uppercase tracking-wider">
          Outras Operações Sincronizadas
        </h4>
        <p className="font-sans text-xs text-gray-sec mt-1">
          Histórias de gestores que simplificaram processos com software Nexa Reis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbacks.map((fb) => (
          <div 
            key={fb.id} 
            className="p-6 rounded-3xl bg-white/[0.01] border border-white/5 relative flex flex-col justify-between hover:border-white/10 transition-all duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-display font-bold text-sm text-white">{fb.company}</h5>
                  <span className="font-sans text-[10px] text-brand-cyan tracking-wider uppercase font-semibold">{fb.segment}</span>
                </div>
                {isAdmin && (
                  <button 
                    onClick={() => onEdit(fb)}
                    className="p-1 px-2.5 rounded bg-white/5 text-[9px] font-mono text-brand-cyan hover:bg-brand-cyan/15 transition-all cursor-pointer"
                  >
                    Editar
                  </button>
                )}
              </div>
              <p className="font-sans text-xs text-gray-light italic leading-relaxed mb-4">
                “{fb.quote}”
              </p>
            </div>
            <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
              <span className="font-sans text-[10px] text-gray-sec">
                {fb.managerName} — {fb.managerRole}
              </span>
              <div className="flex gap-1.5">
                {fb.products.map((p, idx) => (
                  <span key={idx} className="font-mono text-[8px] bg-white/5 text-gray-light px-2 py-0.5 rounded-full border border-white/5">
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 9. FEATURED CLIENT CASE (Section 32, 33, 34, 35, 38, 39, 43, 44)
// ==========================================
interface FeaturedClientCaseProps {
  feedback: ManagerFeedback;
  onEdit?: () => void;
  isAdmin?: boolean;
}

export const FeaturedClientCase: React.FC<FeaturedClientCaseProps> = ({ feedback, onEdit, isAdmin }) => {
  
  const handleScrollToContact = () => {
    const el = document.getElementById('contato');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative" id="featured-client-case-root">
      
      {/* 1. DESKTOP EDITORIAL GRID LAYOUT */}
      <div className="hidden lg:grid grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Column (Visuals & Gallery) */}
        <div className="col-span-5 space-y-6">
          <div className="relative rounded-3xl overflow-hidden bg-[#0c0c0c] border border-white/5 p-6 space-y-6 shadow-xl">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-brand-cyan animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-brand-cyan font-bold">CLIENTE EM DESTAQUE</span>
              </div>
              
              <ClientLogo src={feedback.logo} alt={`Logo do ${feedback.company}`} className="w-12 h-12" />
            </div>

            {/* Real establishment photo */}
            <div className="relative h-44 rounded-2xl bg-neutral-900 border border-white/5 overflow-hidden">
              <img
                src="/images/clients/mercantil-santa-paula-storefront.png"
                alt="Entrada do Mercantil Santa Paula na Rua da alfandega, 415"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              <div className="absolute inset-0 grid-lines opacity-10" />
              <div className="absolute bottom-3 left-4 text-left">
                <h6 className="font-display font-black text-white text-xs uppercase tracking-widest">ESTABELECIMENTO REAL</h6>
                <span className="font-sans text-[9px] text-gray-light block">Rua da alfandega, 415 — São Paulo, SP</span>
              </div>
            </div>

            {/* Dynamic Systems Interactive TV Screen */}
            <CaseStudyGallery />
          </div>
        </div>

        {/* Right Column (Editorial contents) */}
        <div className="col-span-7 space-y-8">
          <div>
            <h3 className="font-mono text-[10px] tracking-widest uppercase text-brand-cyan font-bold mb-2">
              ESTUDO DE CASO: {feedback.company.toUpperCase()}
            </h3>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight leading-tight">
              Tecnologia aplicada onde a operação acontece.
            </h2>
            <p className="font-sans text-sm text-gray-light leading-relaxed mt-4 font-light">
              O Mercantil Santa Paula escolheu soluções da Nexa Reis para organizar o atendimento ao público e aprimorar a gestão dos conteúdos exibidos em suas telas.
            </p>
          </div>

          {/* Solution context grid (Section 33 & 34) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            {/* ChamaAí Segment block */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center font-mono text-[9px] text-brand-cyan font-bold">01</div>
                <h4 className="font-display font-bold text-sm text-white">Mais organização no atendimento.</h4>
              </div>
              <p className="font-sans text-[11px] sm:text-xs text-gray-sec leading-relaxed font-light">
                O ChamaAí foi incorporado à operação do Mercantil Santa Paula para apoiar a organização de filas, senhas e chamadas de atendimento.
              </p>
              <ul className="text-[10px] text-gray-sec space-y-1.5 pt-2">
                {["Retirada e organização de senhas", "Painel de atendimento em TVs", "Melhor visibilidade da ordem"].map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 font-sans">
                    <Check className="w-3 h-3 text-brand-cyan flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SignageFlow Segment block */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center font-mono text-[9px] text-brand-blue font-bold">02</div>
                <h4 className="font-display font-bold text-sm text-white">Conteúdo nas telas da loja.</h4>
              </div>
              <p className="font-sans text-[11px] sm:text-xs text-gray-sec leading-relaxed font-light">
                O SignageFlow foi adotado para centralizar e organizar os conteúdos exibidos nas telas do Mercantil Santa Paula.
              </p>
              <ul className="text-[10px] text-gray-sec space-y-1.5 pt-2">
                {["Programação de ofertas sazonais", "Criação e edição de playlists", "Atualização remota unificada"].map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 font-sans">
                    <Check className="w-3 h-3 text-brand-blue flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Products used badges list */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-gray-sec font-bold pt-1 pr-1">Produtos:</span>
            {feedback.products.map((p, i) => (
              <ClientProductBadge key={i} name={p.name} url={p.url} />
            ))}
          </div>

          {/* Testimonial Quote component */}
          <ManagerQuote 
            quote={feedback.quote} 
            manager={feedback.managerName} 
            role={feedback.managerRole} 
          />

          {/* Metrics Indicator with safety filter */}
          <CaseStudyMetrics approved={feedback.approved} />

          {/* Premium CTA Row (Section 39) */}
          <div className="pt-6 border-t border-white/5 flex flex-wrap gap-3">
            <button 
              onClick={handleScrollToContact}
              className="px-6 py-2.5 rounded-full bg-brand-cyan hover:bg-white text-black font-sans text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              Quero digitalizar minha operação
            </button>
            <a 
              href="https://chamaai-nine.vercel.app/" 
              target="_blank" 
              rel="noreferrer" 
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold transition-all border border-white/10 flex items-center gap-1.5"
            >
              Conhecer o ChamaAí
            </a>
            <a 
              href="https://signageflow.com.br/" 
              target="_blank" 
              rel="noreferrer" 
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-semibold transition-all border border-white/10 flex items-center gap-1.5"
            >
              Conhecer o SignageFlow
            </a>
            {isAdmin && onEdit && (
              <button 
                onClick={onEdit}
                className="px-4 py-2 rounded-full border border-dashed border-brand-cyan/40 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-bold hover:bg-brand-cyan/10 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                Editar Dados do Case
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 2. MOBILE ORDERED EDITORIAL LAYOUT (Section 38 - Mobile Guidelines) */}
      <div className="flex lg:hidden flex-col gap-6 text-left" id="mobile-client-case-editorial">
        {/* Mobile Step 1: Label / Tag */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1 bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-brand-cyan" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-cyan font-bold">CLIENTE EM DESTAQUE</span>
          </div>
          
          <ClientLogo src={feedback.logo} alt={`Logo do ${feedback.company}`} className="w-10 h-10" />
        </div>

        {/* Mobile Step 2: Client Name */}
        <div>
          <span className="font-mono text-[9px] text-brand-cyan font-semibold block uppercase">Estudo de Caso</span>
          <h3 className="font-display font-black text-2xl text-white uppercase mt-0.5">
            {feedback.company}
          </h3>
        </div>

        {/* Mobile Step 3: Main interactive screen gallery */}
        <CaseStudyGallery />

        {/* Mobile Step 4: Context */}
        <div className="space-y-2">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
            Tecnologia aplicada onde a operação acontece.
          </h4>
          <p className="font-sans text-xs text-gray-sec leading-relaxed font-light">
            O Mercantil Santa Paula escolheu soluções da Nexa Reis para organizar o atendimento ao público e aprimorar a gestão dos conteúdos exibidos em suas telas.
          </p>
        </div>

        {/* Mobile Step 5: Products used badge list */}
        <div className="space-y-2 border-t border-white/5 pt-4">
          <span className="font-mono text-[9px] uppercase tracking-wider text-gray-sec font-bold block">Soluções integradas:</span>
          <div className="flex flex-wrap gap-2">
            {feedback.products.map((p, i) => (
              <ClientProductBadge key={i} name={p.name} url={p.url} />
            ))}
          </div>
        </div>

        {/* Mobile Step 6 & 7: Testimonial & Manager */}
        <ManagerQuote 
          quote={feedback.quote} 
          manager={feedback.managerName} 
          role={feedback.managerRole} 
        />

        {/* Mobile Step 8: Gallery of products and checklist of features */}
        <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 space-y-4">
          <div className="space-y-1">
            <span className="font-mono text-[8px] text-brand-cyan uppercase tracking-widest block font-bold">CHAMA-AÍ ATENDIMENTO</span>
            <p className="font-sans text-[11px] text-gray-light font-light">
              Utilizado para retirada inteligente de senhas de atendimento, guichê de chamada de clientes e display em televisão principal.
            </p>
          </div>

          <div className="space-y-1 pt-3 border-t border-white/5">
            <span className="font-mono text-[8px] text-brand-blue uppercase tracking-widest block font-bold">SIGNAGE-FLOW CONTEÚDO</span>
            <p className="font-sans text-[11px] text-gray-light font-light">
              Utilizado para organização de playlists promocionais e ofertas diárias enviadas de forma remota para as Smart TVs do supermercado.
            </p>
          </div>
        </div>

        {/* Mobile Metrics block (Section 43) */}
        <CaseStudyMetrics approved={feedback.approved} />

        {/* Mobile Step 9: CTA Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button 
            onClick={handleScrollToContact}
            className="w-full py-3 rounded-xl bg-brand-cyan text-black font-sans text-xs font-bold transition-all cursor-pointer text-center"
          >
            Quero digitalizar minha operação
          </button>
          
          <a 
            href="https://chamaai-nine.vercel.app/" 
            target="_blank" 
            rel="noreferrer" 
            className="w-full py-3 rounded-xl bg-white/5 text-white border border-white/10 font-sans text-xs font-semibold text-center block"
          >
            Conhecer o ChamaAí
          </a>
          
          <a 
            href="https://signageflow.com.br/" 
            target="_blank" 
            rel="noreferrer" 
            className="w-full py-3 rounded-xl bg-white/5 text-white border border-white/10 font-sans text-xs font-semibold text-center block"
          >
            Conhecer o SignageFlow
          </a>

          {isAdmin && onEdit && (
            <button 
              onClick={onEdit}
              className="w-full py-2.5 rounded-xl border border-dashed border-brand-cyan/40 bg-brand-cyan/5 text-brand-cyan text-xs font-mono font-bold text-center cursor-pointer"
            >
              Configurar Case (Admin)
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

// ==========================================
// 10. MAIN SECTION CONTAINER COMPONENT
// ==========================================
export const ManagerFeedbackSection: React.FC<{ sectionId?: string }> = ({ sectionId = 'feedback-gestores' }) => {
  const [feedbacks, setFeedbacks] = useState<ManagerFeedback[]>(() => {
    const saved = localStorage.getItem('nexa_manager_feedbacks');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          // If the saved state has the old placeholder name, overwrite with the new initialFeedback
          return parsed.map((item: ManagerFeedback) => {
            if (item.id === 'mercantil-santa-paula' && (item.managerName === '[NOME DO GESTOR]' || !item.approved)) {
              const defaultMsp = initialFeedbacks.find(f => f.id === 'mercantil-santa-paula');
              return defaultMsp ? defaultMsp : item;
            }
            return item;
          });
        }
      } catch (e) {
        console.error("Error reading feedbacks from storage", e);
      }
    }
    return initialFeedbacks;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState<ManagerFeedback | null>(null);

  // Sync state with localstorage
  const saveFeedbacks = (updatedList: ManagerFeedback[]) => {
    setFeedbacks(updatedList);
    localStorage.setItem('nexa_manager_feedbacks', JSON.stringify(updatedList));
  };

  const handleSaveFeedback = (savedItem: ManagerFeedback) => {
    const index = feedbacks.findIndex(f => f.id === savedItem.id);
    let newList = [...feedbacks];
    if (index !== -1) {
      newList[index] = savedItem;
    } else {
      newList.push(savedItem);
    }
    saveFeedbacks(newList);
  };

  const handleResetToDefault = () => {
    if (window.confirm("Deseja resetar os dados do case para os valores de rascunho originais?")) {
      localStorage.removeItem('nexa_manager_feedbacks');
      setFeedbacks(initialFeedbacks);
    }
  };

  // Live feedbacks are approved feedbacks
  const liveFeedbacks = feedbacks.filter(f => f.approved === true);
  
  // In development, the prompt wants us to allow previewing unapproved testimonials (Section 41)
  const displayFeedbacks = isAdmin ? feedbacks : liveFeedbacks;

  // Let's get the main featured case "Mercantil Santa Paula"
  // If there's an edited version, we use that; else the default
  const mspCase = feedbacks.find(f => f.id === 'mercantil-santa-paula') || initialFeedbacks[0];

  return (
    <section id={sectionId} className="py-32 bg-[#050505] text-white border-t border-white/5 relative overflow-hidden" aria-label="Feedback de Gestores e Clientes">
      
      {/* Structural Editorial grid line design */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-brand-cyan/[0.02] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] rounded-full bg-brand-blue/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Admin/Developer Console Bar (Fulfills Section 41: preview draft mode) */}
        <div className="mb-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-cyan font-bold block">Console do Desenvolvedor / Operador</span>
              <span className="font-sans text-[11px] text-gray-sec block">
                {isAdmin 
                  ? 'Visualizando todos os registros (Aprovados + Rascunhos)' 
                  : 'Exibindo apenas feedbacks aprovados pelo gestor (Público)'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            {/* Toggle Admin Preview Mode */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-4 py-2 rounded-full font-mono text-[9px] uppercase tracking-widest font-black transition-all cursor-pointer flex items-center gap-2 ${
                isAdmin 
                  ? 'bg-brand-cyan text-black font-bold shadow-lg shadow-brand-cyan/10' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              {isAdmin ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {isAdmin ? 'Modo Preview: Ligado' : 'Entrar Modo Preview'}
            </button>

            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    setEditingFeedback(mspCase);
                    setIsFormOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-[9px] uppercase tracking-widest font-black transition-all text-white cursor-pointer"
                >
                  Configurar MSP
                </button>
                <button
                  onClick={handleResetToDefault}
                  title="Resetar dados para o padrão de rascunho"
                  className="p-2 rounded-full bg-white/5 hover:bg-rose-500/15 hover:text-rose-400 border border-white/10 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-left mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
            <ThumbsUp className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brand-cyan font-bold">
              Prova Social & Validação Prática
            </span>
          </div>

          <h2 className="title-editorial text-white uppercase mb-6 leading-tight">
            Quem vive a operação <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue font-extrabold">percebe a diferença.</span>
          </h2>
          
          <p className="font-sans text-gray-sec text-base sm:text-lg font-light max-w-3xl leading-relaxed">
            Gestores e equipes compartilham como os produtos da Nexa Reis passaram a fazer parte de suas operações, trazendo sincronia física e lógica para o dia a dia.
          </p>
        </div>

        {/* 1. FEATURED CLIENT CASE (Section 40: "Enquanto existir apenas um depoimento aprovado, apresentar o Mercantil Santa Paula em uma composição ampla e individual.") */}
        <div className="relative">
          {/* Header indicator for draft state in admin mode */}
          {isAdmin && !mspCase.approved && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-amber-500 text-black px-4 py-1.5 rounded-full font-mono text-[8px] uppercase tracking-widest font-black shadow-lg">
              <AlertCircle className="w-3 h-3" />
              <span>Preview: Registro Não Publicado no Ar (Approved: False)</span>
            </div>
          )}

          {/* Render MSP Case if we are in admin mode, OR if it has been marked as approved */}
          {(mspCase.approved || isAdmin) ? (
            <FeaturedClientCase 
              feedback={mspCase} 
              onEdit={() => {
                setEditingFeedback(mspCase);
                setIsFormOpen(true);
              }}
              isAdmin={isAdmin}
            />
          ) : (
            <div className="py-16 px-6 border border-dashed border-white/10 rounded-3xl bg-white/[0.01] text-center flex flex-col items-center justify-center max-w-2xl mx-auto">
              <Lock className="w-8 h-8 text-brand-cyan mb-4 opacity-85" />
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-2">Aguardando Aprovação do Gestor</h4>
              <p className="font-sans text-xs text-gray-sec max-w-md mb-6">
                Os detalhes do estudo de caso do Mercantil Santa Paula estão em fase de validação operacional e serão exibidos publicamente em instantes. Use o <strong>Modo Preview</strong> acima para pré-visualizar as telas interativas!
              </p>
              <button
                onClick={() => setIsAdmin(true)}
                className="px-5 py-2 rounded-full bg-brand-cyan text-black font-sans text-xs font-bold hover:bg-white transition-all cursor-pointer"
              >
                Ativar Pré-Visualização
              </button>
            </div>
          )}
        </div>

        {/* 2. SECONDARY TESTIMONIALS GRID (Renders any additional submitted feedbacks) */}
        <TestimonialsGrid 
          feedbacks={displayFeedbacks.filter(f => f.id !== 'mercantil-santa-paula')} 
          onEdit={(fb) => {
            setEditingFeedback(fb);
            setIsFormOpen(true);
          }}
          isAdmin={isAdmin}
        />

      </div>

      {/* 3. MODAL FEEDBACK COLLECTION FORM */}
      <AnimatePresence>
        {isFormOpen && (
          <FeedbackCollectionForm 
            onClose={() => {
              setIsFormOpen(false);
              setEditingFeedback(null);
            }}
            onSave={handleSaveFeedback}
            editingFeedback={editingFeedback}
          />
        )}
      </AnimatePresence>

    </section>
  );
};
