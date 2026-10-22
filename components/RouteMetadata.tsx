import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ORIGIN, routeMetadata } from '../lib/routeMetadata';

export function RouteMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const meta = routeMetadata[path as keyof typeof routeMetadata];
    const title = meta?.title || 'Página não encontrada | Nexa Reis';
    const description = meta?.description || 'Acesse a página inicial da Nexa Reis.';
    document.title = title;
    for (const [selector, content] of [
      ['meta[name="description"]', description], ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description], ['meta[property="og:url"]', ORIGIN + path],
      ['meta[name="twitter:title"]', title], ['meta[name="twitter:description"]', description],
      ['meta[name="robots"]', meta ? 'index,follow' : 'noindex,follow'],
    ]) document.querySelector(selector)?.setAttribute('content', content);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', ORIGIN + path);
    const structured = document.querySelector('script[type="application/ld+json"]');
    if (structured) structured.textContent = JSON.stringify(path === '/nicolas-reis' ? {
      '@context': 'https://schema.org', '@type': 'Person', name: 'Nícolas Reis', url: ORIGIN + path,
      jobTitle: 'Encarregado Administrativo', sameAs: ['https://www.instagram.com/nicolasreis.tech/'],
      address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
    } : { '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Nexa Reis', url: ORIGIN, telephone: '+55-11-93710-5501' });
  }, [pathname]);
  return null;
}
