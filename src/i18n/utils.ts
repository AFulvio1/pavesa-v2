import type { Locale } from '../types';

/** Language display names */
export const languages: Record<Locale, string> = {
  it: 'Italiano',
  en: 'English',
} as const;

/** Default language for the site */
export const defaultLang: Locale = 'it';

/** All translation strings organized by locale */
export const ui = {
  it: {
    'nav.home': 'Home',
    'nav.toggle': 'Attiva Navigazione',
    'nav.goToHomepage': 'vai alla homepage',

    'contact.title': 'Contatti',
    'contact.form': 'Modulo di contatto',
    'contact.name': 'Il tuo nome',
    'contact.email': 'La tua email',
    'contact.message': 'Il tuo messaggio',
    'contact.send': 'Invia Messaggio',
    'contact.goTo': 'Vai alla pagina contatti',
    'contact.addrTitle': 'Indirizzo',

    'service.readMore': 'Leggi tutto',
    'service.continueReading': 'Continua lettura',
    'service.goToPage': 'vai alla pagina dedicata',

    'cta.experience': 'Più di 10 anni di esperienza',
    'cta.contact': 'contattaci',

    'footer.privacy': 'Privacy & Cookie Policy',
    'footer.copyright': 'Copyright © 2012-2024. PA.VE.SA. s.r.l. - Tutti Diritti Riservati.',
    'footer.vat': 'P. IVA: 01617240708',
    'footer.cciaa': 'CCIAA: 36097',

    'clients.title': 'alcuni dei nostri clienti',
    'providers.title': 'fornitori',

    'error.404.title': 'Errore 404: Pagina non trovata',
    'error.404.message': 'Siamo spiacenti – questa pagina non è più qui',
    'error.404.home': 'Vai alla homepage',

    'about.title': 'Chi siamo',
    'recent.posts': 'Articoli recenti',

    'work.before': 'PRIMA',
    'work.during': 'DURANTE',
    'work.after': 'DOPO',
  },
  en: {
    'nav.home': 'Home',
    'nav.toggle': 'Toggle Navigation',
    'nav.goToHomepage': 'go to homepage',

    'contact.title': 'Contact',
    'contact.form': 'Contact form',
    'contact.name': 'Your Name',
    'contact.email': 'Your Email',
    'contact.message': 'Your Message',
    'contact.send': 'Send Message',
    'contact.goTo': 'Go to contact page',
    'contact.addrTitle': 'Address',

    'service.readMore': 'Read more',
    'service.continueReading': 'Continue reading',
    'service.goToPage': 'go to dedicated page',

    'cta.experience': 'More than 10 years of experience',
    'cta.contact': 'contact us',

    'footer.privacy': 'Privacy & Cookie Policy',
    'footer.copyright': 'Copyright © 2012-2024. PA.VE.SA. s.r.l. - All Rights Reserved.',
    'footer.vat': 'VAT: 01617240708',
    'footer.cciaa': 'CCIAA: 36097',

    'clients.title': 'some of our clients',
    'providers.title': 'suppliers',

    'error.404.title': 'Error 404: Page not found',
    'error.404.message': 'We are sorry – this page is not here anymore',
    'error.404.home': 'Go to homepage',

    'about.title': 'About us',
    'recent.posts': 'Recent posts',

    'work.before': 'BEFORE',
    'work.during': 'DURING',
    'work.after': 'AFTER',
  },
} as const;

/** Type for all available translation keys */
export type TranslationKey = keyof typeof ui[typeof defaultLang];

/** Type for the translation function */
export type TranslationFunction = (key: TranslationKey) => string;

/**
 * Extract locale from URL pathname
 * @param url - The current URL
 * @returns The detected locale or default
 */
export function getLangFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as Locale;
  return defaultLang;
}

/**
 * Create a translation function for a specific locale
 * @param lang - The locale to use
 * @returns A function that translates keys
 */
export function useTranslations(lang: Locale): TranslationFunction {
  return function t(key: TranslationKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Get the route segment from a URL
 * @param url - The current URL
 * @returns The last path segment or undefined
 */
export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = url.pathname;
  const parts = pathname?.split('/');
  const path = parts.pop() || parts.pop();

  if (path === undefined) {
    return undefined;
  }

  return path;
}

/**
 * Generate a localized path
 * @param path - The base path (without locale prefix)
 * @param lang - The target locale
 * @returns The localized path
 */
export function getLocalizedPath(path: string, lang: Locale): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

/**
 * Check if a locale is valid
 * @param lang - The locale to check
 * @returns True if valid
 */
export function isValidLocale(lang: string): lang is Locale {
  return lang in ui;
}

const serviceSlugMapITtoEN: Record<string, string> = {
  'impermeabilizzazione-poliurea': 'waterproofing-polyurea',
  'lavori-edili': 'building-works',
  'pavimenti': 'flooring',
  'sabbiatura': 'sandblasting',
  'verniciatura': 'painting',
  'vetrificazione': 'vitrification',
};

const serviceSlugMapENtoIT: Record<string, string> = {
  'waterproofing-polyurea': 'impermeabilizzazione-poliurea',
  'building-works': 'lavori-edili',
  'flooring': 'pavimenti',
  'sandblasting': 'sabbiatura',
  'painting': 'verniciatura',
  'vitrification': 'vetrificazione',
};

/**
 * Get the equivalent path in the other language
 * Handles all pages and slug translations dynamically
 */
export function getAlternateLanguagePath(currentPath: string, currentLang: Locale): string {
  // Normalize path (remove trailing slash)
  const path = currentPath === '/' ? '/' : currentPath.replace(/\/$/, '');

  if (currentLang === 'it') {
    // Convert IT path to EN
    if (path === '/' || path === '') return '/en/';
    if (path.startsWith('/azienda')) return '/en/about' + path.slice(8);
    if (path.startsWith('/servizi')) {
      const slug = path.slice(9); // extract slug after '/servizi/'
      if (slug && serviceSlugMapITtoEN[slug]) {
        return `/en/services/${serviceSlugMapITtoEN[slug]}`;
      }
      return '/en/services';
    }
    if (path.startsWith('/contatti')) return '/en/contact';
    if (path.startsWith('/privacy')) return '/en/privacy';
    return '/en' + (path.startsWith('/') ? path : '/' + path);
  } else {
    // Convert EN path to IT
    if (path === '/en' || path === '/en/') return '/';
    if (path.startsWith('/en/about')) return '/azienda' + path.slice(9);
    if (path.startsWith('/en/services')) {
      const slug = path.slice(13); // extract slug after '/en/services/'
      if (slug && serviceSlugMapENtoIT[slug]) {
        return `/servizi/${serviceSlugMapENtoIT[slug]}`;
      }
      return '/servizi';
    }
    if (path.startsWith('/en/contact')) return '/contatti';
    if (path.startsWith('/en/privacy')) return '/privacy';
    return path.replace('/en', '') || '/';
  }
}

