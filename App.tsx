import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Stats } from './components/Stats';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="bg-nexa-navy text-white selection:bg-nexa-cyan selection:text-nexa-navy">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        
        {/* Value Proposition / About Section Wrapper */}
        <section id="sobre" className="py-24 bg-nexa-slate900 relative">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-nexa-blue/10 to-nexa-cyan/5 border border-nexa-blue/20 rounded-3xl p-8 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Por que escolher a NexaReis?</h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10">
                Nós não apenas entregamos código. Entregamos inteligência de negócio. 
                Combinamos metodologias ágeis, arquitetura robusta e design centrado no usuário para 
                criar soluções que realmente resolvem problemas complexos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="p-6 bg-nexa-navy/50 rounded-xl">
                    <h3 className="font-bold text-nexa-cyan text-xl mb-2">Agilidade</h3>
                    <p className="text-sm text-gray-400">Entregas contínuas e feedback rápido.</p>
                 </div>
                 <div className="p-6 bg-nexa-navy/50 rounded-xl">
                    <h3 className="font-bold text-nexa-cyan text-xl mb-2">Segurança</h3>
                    <p className="text-sm text-gray-400">Proteção de dados e compliance desde o dia 1.</p>
                 </div>
                 <div className="p-6 bg-nexa-navy/50 rounded-xl">
                    <h3 className="font-bold text-nexa-cyan text-xl mb-2">Escalabilidade</h3>
                    <p className="text-sm text-gray-400">Sistemas prontos para crescer com você.</p>
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