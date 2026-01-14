/**
 * Typed Data Imports
 *
 * This file provides typed exports for all JSON data files.
 * Use these imports instead of direct JSON imports for type safety.
 */

import type { CarouselData, LogosArray } from '../types';

// Import raw JSON data
import carouselJson from './carousel.json';
import clientsJson from './clients.json';
import providersJson from './providers.json';

/**
 * Hero carousel slides data
 * Sorted by weight for display order
 */
export const carouselSlides: CarouselData = carouselJson;

/**
 * Client logos for display
 */
export const clientLogos: LogosArray = clientsJson;

/**
 * Provider/supplier logos for display
 */
export const providerLogos: LogosArray = providersJson;

/**
 * Get carousel slides sorted by weight
 */
export function getSortedCarouselSlides(): CarouselData {
  return [...carouselSlides].sort((a, b) => a.weight - b.weight);
}

/**
 * Get a specific carousel slide by URL
 */
export function getCarouselSlideByUrl(url: string): CarouselData[number] | undefined {
  return carouselSlides.find(slide => slide.url === url);
}
