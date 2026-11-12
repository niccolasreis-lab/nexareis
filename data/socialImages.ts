import type { ProjectId } from './projectCases';

export const SOCIAL_IMAGE_WIDTH = 1200;
export const SOCIAL_IMAGE_HEIGHT = 630;
export const SOCIAL_IMAGE_TYPE = 'image/png';

export const socialImages = {
  nexareis: { path: '/images/social/nexareis-v1.png', alt: 'Nexa Reis — sites, sistemas e automações para empresas.' },
  'chamaai-food': { path: '/images/social/chamaai-food-v1.png', alt: 'ChamaAí Food — pedidos em preparo, pedidos prontos e retirada.' },
  'chamaai-filas': { path: '/images/social/chamaai-filas-v1.png', alt: 'ChamaAí — Gestão de Filas: senhas, chamadas e atendimento.' },
  signageflow: { path: '/images/social/signageflow-v1.png', alt: 'SignageFlow — conteúdos, playlists e programação de telas.' },
  'cesta-esperta': { path: '/images/social/cesta-esperta-v1.png', alt: 'CestaEsperta — fluxo ilustrativo de catálogo, pedido e entrega.' },
} satisfies Record<ProjectId | 'nexareis', { path: string; alt: string }>;

export function socialImageForPath(path: string) {
  const id = path.replace(/\/$/, '').match(/^\/projetos\/([^/]+)$/)?.[1];
  return id && id !== 'nexareis' && Object.hasOwn(socialImages, id)
    ? socialImages[id as ProjectId]
    : socialImages.nexareis;
}
