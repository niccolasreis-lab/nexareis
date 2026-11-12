import { ORIGIN } from './routeMetadata.ts';
import { socialImageForPath, SOCIAL_IMAGE_WIDTH, SOCIAL_IMAGE_HEIGHT, SOCIAL_IMAGE_TYPE } from '../data/socialImages.ts';

export function socialMetadata(path: string, meta: { title: string; description: string }) {
  const image = socialImageForPath(path);
  return {
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': ORIGIN + path,
    'og:image': ORIGIN + image.path,
    'og:image:secure_url': ORIGIN + image.path,
    'og:image:type': SOCIAL_IMAGE_TYPE,
    'og:image:width': String(SOCIAL_IMAGE_WIDTH),
    'og:image:height': String(SOCIAL_IMAGE_HEIGHT),
    'og:image:alt': image.alt,
    'twitter:card': 'summary_large_image',
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:image': ORIGIN + image.path,
    'twitter:image:alt': image.alt,
  };
}
