import { projectCases, isProjectId, type ProjectId } from '../data/projectCases';
import { CONTACT_INFO } from '../constants';
export const quoteSegments = [
  { id: 'supermercados', label: 'Supermercado ou mercado' },
  { id: 'restaurantes', label: 'Restaurante, lanchonete ou doceria' },
  { id: 'clinicas', label: 'Clínica, laboratório ou recepção' },
  { id: 'varejo', label: 'Loja, franquia ou varejo' },
  { id: 'outros', label: 'Outro tipo de negócio' },
] as const;
export const quoteNeeds = [
  { id: 'chamaai-food', label: 'Organizar pedidos em preparo e retirada', detail: 'Cozinha, balcão e expedição' },
  { id: 'chamaai-filas', label: 'Organizar a fila de atendimento', detail: 'Senhas e chamadas de clientes' },
  { id: 'signageflow', label: 'Atualizar o conteúdo de TVs e telas', detail: 'Mídias, playlists e comunicação' },
  { id: 'cesta-esperta', label: 'Organizar catálogo, pedidos e entrega', detail: 'Venda e conferência dos pedidos' },
  { id: 'sob-medida', label: 'Automatizar outra rotina da empresa', detail: 'Integrações ou um sistema sob medida' },
] as const;
export type QuoteNeed = typeof quoteNeeds[number]['id'];
export type QuoteSegment = typeof quoteSegments[number]['id'];
export function readQuote(search: string): { segment: QuoteSegment | ''; need: QuoteNeed | '' } {
  const params = new URLSearchParams(search);
  const segment = params.get('segmento') || '';
  const need = params.get('necessidade') || '';
  return {
    segment: quoteSegments.some(s => s.id === segment) ? segment as QuoteSegment : '',
    need: quoteNeeds.some(n => n.id === need) ? need as QuoteNeed : '',
  };
}
export function quoteResult(segment: QuoteSegment, need: QuoteNeed) {
  const segmentName = quoteSegments.find(s => s.id === segment)?.label;
  const needName = quoteNeeds.find(n => n.id === need)?.label;
  if (!segmentName || !needName) throw new Error('Escolha um segmento e uma necessidade.');
  const project = isProjectId(need) ? projectCases[need] : null;
  const name = project?.name || 'Solução sob medida';
  const message = `Olá! Gostaria de conversar com a Nexa Reis.\nMeu negócio: ${segmentName}.\nPreciso de ajuda para: ${needName.toLowerCase()}.\nQuero avaliar: ${name}.`;
  return { name, projectId: project ? need as ProjectId : null, description: project?.summary || 'Vamos entender a rotina que você quer organizar e avaliar um sistema ou uma integração para sua empresa.', message, whatsapp: `${CONTACT_INFO.social.whatsapp}?text=${encodeURIComponent(message)}` };
}
