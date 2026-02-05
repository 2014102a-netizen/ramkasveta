/**
 * Config exports
 */

export { siteConfig } from './site';
export type { SiteConfig } from './site';

export {
  archetypes,
  archetypeDescriptions,
  collections,
  products,
  getProductsByArchetype,
  getProductsByCollection,
  getProductById,
  getCollectionBySlug,
} from './products';
export type { Archetype } from './products';
