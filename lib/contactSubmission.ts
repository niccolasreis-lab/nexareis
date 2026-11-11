export const CONTACT_TIMEOUT_MS = 15_000;

export const CONTACT_SUBMIT_ERROR =
  'Não foi possível confirmar o envio. Seus dados foram mantidos. Você também pode entrar em contato pelo WhatsApp.';

export type ContactReceipt = { registered: true; receipt: string };

/** One request at a time; only a readable server acknowledgement confirms delivery. */
export class ContactSubmission {
  private activeController: AbortController | null = null;

  get isPending(): boolean {
    return this.activeController !== null;
  }

  cancel(): void {
    this.activeController?.abort();
  }

  async submit(url: string, payload: Record<string, string>, requestKey?: string): Promise<ContactReceipt | void> {
    if (this.isPending) {
      throw new Error('A contact submission is already in progress.');
    }

    const controller = new AbortController();
    const deadline = performance.now() + CONTACT_TIMEOUT_MS;
    this.activeController = controller;
    const timeout = setTimeout(() => controller.abort(), CONTACT_TIMEOUT_MS);
    const checkDeadline = () => {
      // A busy event loop can deliver promise callbacks before an overdue timer.
      if (performance.now() >= deadline) controller.abort();
      controller.signal.throwIfAborted();
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: requestKey ? { 'Content-Type': 'application/json', 'Idempotency-Key': requestKey } : { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      checkDeadline();
      if (!response.ok) {
        throw new Error(`Contact submission returned HTTP ${response.status}.`);
      }

      const acknowledgement: unknown = await response.json();
      checkDeadline();
      if (
        acknowledgement === null ||
        typeof acknowledgement !== 'object' ||
        Array.isArray(acknowledgement) ||
        !('ok' in acknowledgement) ||
        acknowledgement.ok !== true
      ) {
        throw new Error('The server did not confirm the contact submission.');
      }
      checkDeadline();
      if ('registered' in acknowledgement && acknowledgement.registered === true) {
        if (!('receipt' in acknowledgement) || typeof acknowledgement.receipt !== 'string' || !/^NR-[A-F0-9]{16}$/.test(acknowledgement.receipt)) throw new Error('Invalid contact receipt.');
        return { registered: true, receipt: acknowledgement.receipt };
      }
    } finally {
      clearTimeout(timeout);
      // Release any unread response body after a rejection.
      controller.abort();
      this.activeController = null;
    }
  }
}

