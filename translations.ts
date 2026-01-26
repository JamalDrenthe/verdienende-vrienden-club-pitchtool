import { Language } from './types';

interface TranslationContent {
  nav: {
    home: string;
    ecosystem: string;
    other: string;
    pitch: string;
    about: string;
    settings: string;
    proOn: string;
    proOff: string;
  };
  home: {
    pill: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    cta: string;
    promiseTitle: string;
    promiseText: string;
    system: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  nl: {
    nav: {
      home: 'Home',
      ecosystem: 'Ecosysteem',
      other: 'Overige Motoren',
      pitch: 'Pitch',
      about: 'Over',
      settings: 'Instellingen',
      proOn: 'Pro Aan',
      proOff: 'Pro Uit'
    },
    home: {
      pill: 'Verdienende Vrienden Club',
      titlePrefix: 'Ons',
      titleHighlight: 'Ecosysteem',
      subtitle: 'Start de reis: bekijk de volledige financiële motor die arbeid omzet in vermogen.',
      cta: 'Naar de motor',
      promiseTitle: 'De Belofte',
      promiseText: 'Wij bieden geen snel rijk worden. Wij bieden een',
      system: 'systeem',
    }
  },
  en: {
    nav: {
      home: 'Home',
      ecosystem: 'Ecosystem',
      other: 'Other Engines',
      pitch: 'Pitch',
      about: 'About',
      settings: 'Settings',
      proOn: 'Pro On',
      proOff: 'Pro Off'
    },
    home: {
      pill: 'Earning Friends Club',
      titlePrefix: 'Our',
      titleHighlight: 'Ecosystem',
      subtitle: 'Start the journey: view the complete financial engine that converts labor into wealth.',
      cta: 'To the engine',
      promiseTitle: 'The Promise',
      promiseText: 'We do not offer get-rich-quick schemes. We offer a',
      system: 'system',
    }
  }
};