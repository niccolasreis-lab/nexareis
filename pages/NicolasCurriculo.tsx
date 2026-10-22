import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { nicolasProfile } from '../data/nicolasProfile';

/** Print-first résumé. The browser's Print dialog supports "Save as PDF". */
export const NicolasCurriculo: React.FC = () => (
  <div className="pt-32 pb-20 cv-route bg-[#11171e] min-h-screen">
    <div className="cv-screen-tools max-w-[850px] mx-auto px-5 mb-5 flex flex-wrap items-center justify-between gap-4">
      <Link to="/nicolas-reis" className="inline-flex items-center gap-2 text-gray-light hover:text-white">
        <ArrowLeft size={18} aria-hidden="true" /> Voltar ao portfólio
      </Link>
      <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 bg-brand-cyan text-[#071018] rounded-full px-5 py-3 font-semibold hover:bg-white transition-colors">
        <Printer size={18} aria-hidden="true" /> Imprimir / salvar como PDF
      </button>
    </div>
    <p className="cv-screen-tools mx-auto max-w-[850px] px-5 text-gray-light text-sm mb-6">
      Currículo em formato A4. Na janela de impressão, selecione “Salvar como PDF” ou sua impressora.
    </p>

    <article className="cv-print-layout mx-auto bg-white text-[#18202b] shadow-2xl w-full max-w-[794px] px-8 sm:px-12 py-10" aria-labelledby="cv-name">
      <div className="cv-top flex justify-between items-start gap-6 border-b-2 border-[#223047] pb-6">
        <div className="min-w-0">
          <p className="text-[11px] tracking-[0.14em] uppercase text-[#435b78] font-bold mb-2">Administração e Tecnologia</p>
          <h1 id="cv-name" className="font-sans font-bold tracking-tight text-3xl sm:text-4xl text-[#14223a] mb-2">Nícolas Reis</h1>
          <p className="text-[#314863] font-semibold text-sm mb-3">Encarregado Administrativo · Estudante de Análise e Desenvolvimento de Sistemas</p>
          <p className="font-semibold text-[12px] text-[#14223a]">Testemunha de Jeová · <a href="https://www.jw.org/pt/" className="underline underline-offset-2">www.jw.org</a></p>
          <p className="text-[12px] mt-3">{nicolasProfile.city} · {nicolasProfile.phone}</p>
          <p className="text-[12px] break-words">{nicolasProfile.instagramHandle} · www.nexareis.com.br/nicolas-reis</p>
        </div>
        <img src={nicolasProfile.portrait} alt="Foto de Nícolas Reis" width={1147} height={1536} className="w-[90px] sm:w-[115px] h-auto rounded-lg border border-[#cbd5df] flex-shrink-0" />
      </div>

      <section className="cv-section pt-5" aria-labelledby="cv-perfil">
        <h2 id="cv-perfil" className="cv-section-heading text-[#14223a] font-bold text-sm uppercase tracking-[0.10em] mb-2">Perfil profissional</h2>
        <p className="text-[12px] leading-relaxed">Profissional com trajetória no Mercantil Santa Paula desde 2018, iniciada em atividades operacionais e desenvolvida até o cargo atual de Encarregado Administrativo. Cursando Análise e Desenvolvimento de Sistemas na Anhanguera, com interesse em aproximar a organização administrativa das soluções tecnológicas.</p>
      </section>

      <section className="cv-section pt-5" aria-labelledby="cv-experiencia">
        <h2 id="cv-experiencia" className="cv-section-heading text-[#14223a] font-bold text-sm uppercase tracking-[0.10em] mb-3">Experiência profissional</h2>
        <p className="text-[12px] font-semibold mb-2">Mercantil Santa Paula · Janeiro de 2018 — atualmente</p>
        <ol className="space-y-2">
          {nicolasProfile.experience.map(({ period, role, details }) => (
            <li key={role} className="cv-job pl-3 border-l-2 border-[#b8c7d8]">
              <p className="font-semibold text-[12px]">{role} <span className="font-normal text-[#506078]">· {period}</span></p>
              <p className="text-[11px] leading-relaxed text-[#314358] mt-0.5">{details}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="cv-section pt-5" aria-labelledby="cv-formacao">
        <h2 id="cv-formacao" className="cv-section-heading text-[#14223a] font-bold text-sm uppercase tracking-[0.10em] mb-2">Formação e cursos</h2>
        <ul className="space-y-1">
          {nicolasProfile.courses.map(course => (
            <li key={course.name} className="text-[12px] leading-relaxed">
              <strong>{course.name}</strong> · {course.institution} · {course.period}
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-section pt-5" aria-labelledby="cv-competencias">
        <h2 id="cv-competencias" className="cv-section-heading text-[#14223a] font-bold text-sm uppercase tracking-[0.10em] mb-2">Conhecimentos e áreas de interesse</h2>
        <p className="text-[12px] leading-relaxed">Rotinas administrativas · Atendimento ao cliente · Organização operacional · Suporte e manutenção de computadores · Desenvolvimento web · Sistemas empresariais · Automação de processos</p>
      </section>
    </article>
  </div>
);
