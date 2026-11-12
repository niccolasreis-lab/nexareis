import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ImageOff, ShoppingBasket } from 'lucide-react';
import { projectCases, isProjectId } from '../data/projectCases';
import '../styles/growth.css';
export function ProjectDetail() {
  const { projectId = '' } = useParams();
  const [failedImage, setFailedImage] = useState('');
  if (!isProjectId(projectId)) return <article className="growth-page"><div className="growth-shell"><h1>Projeto não encontrado</h1><Link to="/#produtos" className="growth-inline-link">Conhecer os projetos</Link></div></article>;
  const project = projectCases[projectId];
  return <article className="growth-page project-detail">
    <div className="growth-shell">
      <Link to="/#produtos" className="growth-back"><ArrowLeft size={17} aria-hidden="true" /> Todos os projetos</Link>
      <header className="project-intro"><div><h1>{project.name}</h1><p className="project-heading">{project.heading}</p><p className="growth-intro">{project.summary}</p><div className="project-actions"><Link className="growth-button" to={'/orcamento?necessidade=' + projectId}>Avaliar para minha empresa <ArrowUpRight size={17} aria-hidden="true" /></Link>{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="growth-inline-link">Abrir demonstração <ArrowUpRight size={17} aria-hidden="true" /></a>}</div></div><p className="project-audience"><strong>Para operações como</strong>{project.audience}</p></header>
      <figure className="project-capture">
        {project.image ? (failedImage === projectId ? <div className="project-image-fallback" role="img" aria-label={'Imagem de ' + project.name + ' indisponível'}><ImageOff size={32} aria-hidden="true" /><p>A imagem não carregou. Você pode continuar conhecendo o projeto abaixo.</p></div> : <img src={project.image} alt={project.alt} width={960} height={659} decoding="async" fetchPriority="high" onError={() => setFailedImage(projectId)} />) : <div className="project-catalog-flow"><ShoppingBasket size={40} aria-hidden="true" /><ol><li>Catálogo</li><li>Pedido</li><li>Conferência</li><li>Entrega</li></ol></div>}
        <figcaption>{project.caption}</figcaption>
      </figure>
      <div className="project-story"><section><h2>A rotina que o projeto atende</h2><p>{project.problem}</p></section><section><h2>Como a solução se apresenta</h2><p>{project.solution}</p></section></div>
      <section className="project-flow"><h2>O caminho da operação</h2><ol>{project.steps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}</ol></section>
      <section className="project-next"><div><h2>Faz sentido para sua empresa?</h2><p>Conte qual parte da sua rotina precisa de atenção. Vamos avaliar o escopo e as condições de implantação.</p></div><Link to={'/orcamento?necessidade=' + projectId} className="growth-button">Preparar meu orçamento <ArrowUpRight size={17} aria-hidden="true" /></Link></section>
      <nav className="project-other" aria-label="Outros projetos">{Object.entries(projectCases).filter(([id]) => id !== projectId).map(([id, item]) => <Link key={id} to={'/projetos/' + id}>{item.name} <ArrowUpRight size={16} aria-hidden="true" /></Link>)}</nav>
    </div>
  </article>;
}
