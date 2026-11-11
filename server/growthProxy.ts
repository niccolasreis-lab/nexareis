import { createHmac } from 'node:crypto';

type Resource = 'contact' | 'events' | 'metrics';
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });

export async function growthProxy(request: Request, env: NodeJS.ProcessEnv = process.env): Promise<Response> {
  if (request.method !== 'POST') return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  const url = new URL(request.url);
  const resource = url.searchParams.get('resource') as Resource;
  if (!['contact', 'events', 'metrics'].includes(resource)) return json({ ok: false }, 404);
  const origin = request.headers.get('origin');
  if (origin && origin !== url.origin) return json({ ok: false }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ ok: false }, 415);
  if (Number(request.headers.get('content-length') || 0) > 16384) return json({ ok: false }, 413);
  const endpoint = env.NEXA_GROWTH_URL;
  const token = env.NEXA_GROWTH_TOKEN;
  if (!endpoint || !token) return json({ ok: false, error: 'contact_unavailable' }, 503);
  // Never accept an upstream URL or a notification recipient from visitor input.
  const upstream = new URL(endpoint);
  if (upstream.protocol !== 'https:' || upstream.username || upstream.password) return json({ ok: false }, 503);
  const reader = request.body?.getReader();
  let size = 0;
  const chunks: Uint8Array[] = [];
  try {
    if (!reader) return json({ ok: false }, 400);
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) { await reader.cancel(); return json({ ok: false }, 413); }
      chunks.push(value);
    }
    const body = Buffer.concat(chunks);
    JSON.parse(body.toString('utf8'));
    const client = createHmac('sha256', token).update(request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-real-ip') || 'unknown').digest('hex');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json', Authorization: 'Bearer ' + token,
      'X-Client-Key': client, 'X-Environment': env.VERCEL_ENV === 'production' ? 'production' : 'preview',
    };
    if (resource === 'contact') headers['Idempotency-Key'] = request.headers.get('idempotency-key') || '';
    if (resource === 'metrics') headers['X-Metrics-Key'] = request.headers.get('authorization')?.replace(/^Bearer /, '') || '';
    const response = await fetch(new URL('/' + resource, upstream), { method: 'POST', headers, body, signal: AbortSignal.timeout(10000), redirect: 'error' });
    const data: unknown = await response.json();
    // The private service's fixed, bounded JSON response carries no headers or credentials through.
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('invalid_receiver_response');
    return json(data, response.status);
  } catch (error) {
    if (error instanceof SyntaxError) return json({ ok: false }, 400);
    console.error('growth_receiver_unavailable', { resource });
    return json({ ok: false, error: 'receiver_unavailable' }, 503);
  } finally { reader?.releaseLock(); }
}
