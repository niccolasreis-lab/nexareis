import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { Header } from './components/Header';
import { scrollToSection } from './lib/navigation';
import { Footer } from './components/Footer';
import { RouteMetadata } from './components/RouteMetadata';
import { Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { InterestTracking } from './components/InterestTracking';
const Quote = React.lazy(() => import('./pages/Quote').then(({ Quote }) => ({ default: Quote })));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail').then(({ ProjectDetail }) => ({ default: ProjectDetail })));
const Metrics = React.lazy(() => import('./pages/Metrics').then(({ Metrics }) => ({ default: Metrics })));

const NicolasCurriculo = React.lazy(() => import('./pages/NicolasCurriculo').then(({ NicolasCurriculo }) => ({ default: NicolasCurriculo })));

const NicolasReis = React.lazy(() => import('./pages/NicolasReis').then(({ NicolasReis }) => ({ default: NicolasReis })));

const ServiceDetail = React.lazy(() =>
  import('./pages/ServiceDetail').then(({ ServiceDetail }) => ({ default: ServiceDetail })),
);
const CustomCursor = React.lazy(() =>
  import('./components/CustomCursor').then(({ CustomCursor }) => ({ default: CustomCursor })),
);

// Componente para garantir que a página sempre role para o topo ao mudar de rota
function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    let targetId = hash.slice(1);
    try { targetId = decodeURIComponent(targetId); } catch { /* Keep malformed fragments harmless. */ }
    let frame = 0;
    let scheduled = false;
    let observer: MutationObserver | null = null;
    let resize: ResizeObserver | null = null;
    let followFrame = 0;
    const stopFollowing = () => { resize?.disconnect(); cancelAnimationFrame(followFrame); };
    const inputEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    const followLayout = () => {
      const main = document.getElementById('main-content');
      if (!main) return;
      let previousHeight = main.getBoundingClientRect().height;
      // Deferred sections can change the target's offset after the first scroll.
      // Follow those layout changes only until the visitor starts interacting.
      resize = new ResizeObserver(() => {
        const height = main.getBoundingClientRect().height;
        if (height === previousHeight) return;
        previousHeight = height;
        cancelAnimationFrame(followFrame);
        followFrame = requestAnimationFrame(() => scrollToSection(targetId, { behavior: 'auto' }));
      });
      resize.observe(main);
      inputEvents.forEach(type => window.addEventListener(type, stopFollowing, { passive: true, once: true }));
    };
    const resolveTarget = () => {
      if (!document.getElementById(targetId)) return false;
      if (scheduled) return true;
      scheduled = true;
      observer?.disconnect();
      // Let menu cleanup and React commit finish before transferring focus.
      frame = requestAnimationFrame(() => { scrollToSection(targetId, { focus: true }); followLayout(); });
      return true;
    };
    if (!resolveTarget()) {
      observer = new MutationObserver(resolveTarget);
      observer.observe(document.getElementById('main-content') ?? document.body, { childList: true, subtree: true });
    }
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); stopFollowing(); inputEvents.forEach(type => window.removeEventListener(type, stopFollowing)); };
  }, [pathname, hash, key]);
  return null;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageVariants}
              initial={reduceMotion ? false : "initial"}
              animate="animate"
              exit={reduceMotion ? undefined : "exit"}
              className="w-full"
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/servicos/:serviceId"
          element={
            <Suspense fallback={null}>
              <motion.div
                variants={pageVariants}
                initial={reduceMotion ? false : "initial"}
                animate="animate"
                exit={reduceMotion ? undefined : "exit"}
                className="w-full"
              >
                <ServiceDetail />
              </motion.div>
            </Suspense>
          }
        />
        <Route path="/orcamento" element={<Suspense fallback={<p className="pt-32 px-6" role="status">Carregando orçamento…</p>}><Quote /></Suspense>} />
        <Route path="/projetos/:projectId" element={<Suspense fallback={<p className="pt-32 px-6" role="status">Carregando projeto…</p>}><ProjectDetail /></Suspense>} />
        <Route path="/metricas" element={<Suspense fallback={<p className="pt-32 px-6" role="status">Carregando métricas…</p>}><Metrics /></Suspense>} />
        <Route path="/curriculo" element={<Suspense fallback={<p className="pt-32 px-6" role="status">Carregando currículo…</p>}><NicolasCurriculo /></Suspense>} />
        <Route path="/nicolas-reis" element={<Suspense fallback={<p className="pt-32 px-6" role="status">Carregando perfil…</p>}><NicolasReis /></Suspense>} />
        <Route path="*" element={<div className="max-w-7xl mx-auto px-6 pt-40 pb-24"><h1 className="font-display text-3xl mb-6">Página não encontrada</h1><Link to="/" className="text-brand-cyan underline">Voltar para a página inicial</Link></div>} />
      </Routes>
    </AnimatePresence>
  );
}

function DeferredCustomCursor() {
  const { pathname } = useLocation();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    setShouldLoad(false);
    if (pathname === '/nicolas-reis') return;
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timeoutId = window.setTimeout(() => setShouldLoad(true), 600);
    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  return pathname !== '/nicolas-reis' && shouldLoad ? (
    <Suspense fallback={null}>
      <CustomCursor />
    </Suspense>
  ) : null;
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <ScrollToTop />
      <RouteMetadata />
      <InterestTracking />
      <DeferredCustomCursor />
      <div className="app-root">
        <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </MotionConfig>
  );
}

export default App;

