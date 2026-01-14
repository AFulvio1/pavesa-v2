/**
 * Centralized TypeScript Types
 *
 * This file contains all shared types for the PA.VE.SA. website.
 * Import from '@/types' using the path alias.
 */

// ===== LOCALE TYPES =====

/** Supported languages */
export type Locale = 'it' | 'en';

/** Default locale for the site */
export const DEFAULT_LOCALE: Locale = 'it';

/** All supported locales */
export const LOCALES: readonly Locale[] = ['it', 'en'] as const;

// ===== IMAGE TYPES =====

/** Basic image asset */
export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

/** Image with loading options */
export interface OptimizedImageProps extends ImageAsset {
  class?: string;
  aspectRatio?: string;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
}

// ===== CAROUSEL TYPES =====

/** Hero carousel slide data */
export interface CarouselSlide {
  weight: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  url: string;
}

/** Carousel slides array type */
export type CarouselData = CarouselSlide[];

// ===== SERVICE TYPES =====

/** Service card data for grid display */
export interface ServiceCardData {
  slug: string;
  title: string;
  summary: string;
  banner: string;
  alt: string;
  weight: number;
}

/** Service page frontmatter */
export interface ServiceFrontmatter {
  title: string;
  description: string;
  keywords?: string[];
  banner: string;
  alt: string;
  weight: number;
  summary: string;
  lang: Locale;
}

// ===== CLIENT/PROVIDER TYPES =====

/** Client or provider logo data */
export interface LogoData {
  name: string;
  image: string;
  url: string;
  alt: string;
}

/** Array of logos */
export type LogosArray = LogoData[];

// ===== NAVIGATION TYPES =====

/** Navigation menu item */
export interface MenuItem {
  name: string;
  url: string;
  identifier: string;
}

/** Navigation menu by locale */
export type LocalizedMenu = Record<Locale, MenuItem[]>;

// ===== WORK GALLERY TYPES =====

/** Work gallery phases */
export type WorkPhase = 'before' | 'during' | 'after';

/** Work gallery image */
export interface WorkImage {
  src: string;
  alt?: string;
  phase: WorkPhase;
}

// ===== PAGE TYPES =====

/** Base page frontmatter */
export interface PageFrontmatter {
  title: string;
  description: string;
  keywords?: string[];
  lang: Locale;
}

// ===== COMPONENT PROPS =====

/** Base props with locale support */
export interface LocaleProps {
  lang?: Locale;
}

/** SEO meta tags */
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noindex?: boolean;
}
