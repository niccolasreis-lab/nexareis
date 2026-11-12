import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackInterest, startVitals } from '../lib/analytics';
import { demoProject } from '../lib/interestLinks';
export function InterestTracking() {
  const { pathname } = useLocation();
  useEffect(() => {
    trackInterest('page_view', '', pathname);
    if (pathname.startsWith('/projetos/')) trackInterest('project_view', pathname.split('/')[2], pathname);
    startVitals();
  }, [pathname]);
  useEffect(() => {
    const clicked = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href);
      if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') trackInterest('whatsapp_click', link.dataset.interestProduct || '');
      const product = demoProject(link.href);
      if (product) trackInterest('demo_click', product);
    };
    document.addEventListener('click', clicked);
    return () => document.removeEventListener('click', clicked);
  }, []);
  return null;
}
