import { growthProxy } from '../server/growthProxy.ts';
export default { fetch(request: Request) { return growthProxy(request); } };
