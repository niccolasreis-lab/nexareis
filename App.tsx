import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        
        {/* Value Proposition / About Section Wrapper */}
        <section id="sobre" className="section-py bg-slate900">
          <div className="container">
            <div className="value-box">
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Por que escolher a NexaReis?</h2>
              <p className="section-desc" style={{ maxWidth: '48rem', margin: '0 auto', marginBottom: '2.5rem', color: '#d1d5db' }}>
                Nós não apenas entregamos código. Entregamos inteligência de negócio. 
                Combinamos metodologias ágeis, arquitetura robusta e design centrado no usuário para 
                criar soluções que realmente resolvem problemas complexos.
              </p>
              <div className="value-grid">
                 <div className="value-item">
                    <h3 style={{ fontWeight: 'bold', color: 'var(--color-cyan)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Agilidade</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-400)' }}>Entregas contínuas e feedback rápido.</p>
                 </div>
                 <div className="value-item">
                    <h3 style={{ fontWeight: 'bold', color: 'var(--color-cyan)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Segurança</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-400)' }}>Proteção de dados e compliance desde o dia 1.</p>
                 </div>
                 <div className="value-item">
                    <h3 style={{ fontWeight: 'bold', color: 'var(--color-cyan)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Escalabilidade</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-400)' }}>Sistemas prontos para crescer com você.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;