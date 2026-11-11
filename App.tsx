import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { Header } from './components/Header';
import { scrollToSection } from './lib/navigation';
import { Footer } from './components/Footer';
import { RouteMetadata } from './components/RouteMetadata';
import { Link } from 'react-router-dom';
import { Home } from './pages/Home';

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
    const resolveTarget = () => {
      if (!document.getElementById(targetId)) return false;
      if (scheduled) return true;
      scheduled = true;
      observer?.disconnect();
      // Let menu cleanup and React commit finish before transferring focus.
      frame = requestAnimationFrame(() => scrollToSection(targetId, { focus: true }));
      return true;
    };
    if (!resolveTarget()) {
      observer = new MutationObserver(resolveTarget);
      observer.observe(document.getElementById('main-content') ?? document.body, { childList: true, subtree: true });
    }
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); };
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

