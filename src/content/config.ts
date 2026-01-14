import { defineCollection, z } from 'astro:content';
import { LOCALES } from '../types';

/** Zod schema for locale validation */
const localeSchema = z.enum(LOCALES);

/** Base schema fields shared across content types */
const baseSchema = {
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string()).optional(),
  lang: localeSchema,
};

/**
 * Pages collection
 * Generic pages like about, contact, privacy
 */
const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseSchema,
  }),
});

/**
 * Services collection
 * Service detail pages with banner images and summaries
 */
const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    ...baseSchema,
    banner: z.string().min(1),
    alt: z.string().min(1),
    weight: z.number().int().positive(),
    summary: z.string().min(1),
  }),
});

export const collections = {
  pages: pagesCollection,
  services: servicesCollection,
};
