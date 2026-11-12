import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { socialImages } from '../data/socialImages.ts';
import { projectCases } from '../data/projectCases.ts';

const layouts = {
  nexareis: { title: ['Nexa Reis'], description: 'Sites, sistemas e automações para empresas.', flow: [], category: 'Tecnologia para empresas' },
  'chamaai-food': { title: ['ChamaAí', 'Food'], flow: ['Em preparo', 'Prontos', 'Retirada'], category: 'Pedidos e retiradas' },
  'chamaai-filas': { title: ['ChamaAí —', 'Gestão de Filas'], flow: ['Senhas', 'Chamadas', 'Atendimento'], category: 'Atendimento e filas' },
  signageflow: { title: ['SignageFlow'], flow: ['Conteúdos', 'Playlists', 'Telas'], category: 'Mídia para telas' },
  'cesta-esperta': { title: ['CestaEsperta'], flow: ['Catálogo', 'Pedido', 'Entrega'], category: 'Fluxo ilustrativo' },
};
const cards = Object.entries(socialImages).map(([id, image]) => ({
  id, ...image, ...layouts[id], description: layouts[id].description || projectCases[id].summary,
}));
const result = spawnSync('python3', ['scripts/render-social-images.py'], {
  cwd: fileURLToPath(new URL('..', import.meta.url)), input: JSON.stringify(cards), encoding: 'utf8',
});
if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
