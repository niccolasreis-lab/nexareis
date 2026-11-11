import { routeMetadata } from './routeMetadata';
import { isProjectId } from '../data/projectCases';
export type InterestEvent = 'page_view' | 'project_view' | 'demo_click' | 'whatsapp_click' | 'quote_complete' | 'contact_registered';
export const canMeasure = () => typeof navigator !== 'undefined' && navigator.doNotTrack !== '1' && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl !== true;
export function trackInterest(event: InterestEvent, product = '', path = window.location.pathname) {
  if (!canMeasure() || !Object.hasOwn(routeMetadata, path)) return;
  const safeProduct = isProjectId(product) || product === 'sob-medida' ? product : '';
  void fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event, product: safeProduct, path }), keepalive: true, credentials: 'omit' }).catch(() => {});
}
let vitalsStarted = false;
export function startVitals() {
  if (vitalsStarted || !canMeasure()) return;
  vitalsStarted = true;
  const initialPath = window.location.pathname;
  if (!Object.hasOwn(routeMetadata, initialPath)) return;
  void import('web-vitals').then(({ onCLS, onINP, onLCP }) => {
    const sent = new Set<string>();
    const report = ({ name, value, id }: { name: string; value: number; id: string }) => {
      if (!canMeasure() || sent.has(id)) return;
      sent.add(id);
      void fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: name, value, path: initialPath }), keepalive: true, credentials: 'omit' }).catch(() => {});
    };
    onCLS(report); onINP(report); onLCP(report);
  }).catch(() => {});
}
