type ContactIntent = Partial<Record<'segmento' | 'necessidade' | 'mensagem', string>>;
let pending: ContactIntent | null = null;
export function prepareContact(intent: ContactIntent) {
  pending = intent;
  window.dispatchEvent(new CustomEvent('nexa:contact-intent', { detail: intent }));
}
export function consumeContactIntent() { const intent = pending; pending = null; return intent; }
