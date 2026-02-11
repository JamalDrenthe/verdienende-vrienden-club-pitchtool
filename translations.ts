import { Language } from './types';

interface TranslationContent {
  nav: {
    home: string;
    ecosystem: string;
    pitch: string;
    basis: string;
    bonus: string;
    passief: string;
    join: string;
    settings: string;
    proOn: string;
    proOff: string;
  };
  home: {
    pill: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
    featuresTitle: string;
    features: { title: string; desc: string }[];
    promiseTitle: string;
    promiseText: string;
    system: string;
    promiseSuffix: string;
  };
  pitch: {
    badge: string;
    title1: string;
    titleHighlight1: string;
    title2: string;
    titleHighlight2: string;
    title3: string;
    subtitle: string;
    cta: string;
    cards: { num: string; title: string; desc: string }[];
  };
  basis: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    calcTitle: string;
    calcSubtitle: string;
    hoursLabel: string;
    hoursMin: string;
    hoursFull: string;
    resultLabel: string;
    cta: string;
    steps: { num: string; title: string; text: string }[];
  };
  bonus: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    subtitle: string;
    calcTitle: string;
    calcSubtitle: string;
    placementsLabel: string;
    placementsTarget: string;
    resultLabel: string;
    cta: string;
    cards: { title: string; text: string }[];
  };
  passief: {
    badge: string;
    titlePrefix: string;
    titleSuffix: string;
    titleHighlight: string;
    subtitle: string;
    portfolioTitle: string;
    portfolioSubtitle: string;
    referralTitle: string;
    referralDesc: string;
    candidatesLabel: string;
    amountLabel: string;
    miningTitle: string;
    miningDesc1: string;
    miningDesc2: string;
    estateTitle: string;
    estateDesc1: string;
    estateDesc2: string;
    activate: string;
    active: string;
    graphTitle: string;
    graphSubtitle: string;
    totalReceived: string;
    overMonths: string;
    month: string;
    passiveIncome: string;
    perMonth: string;
    months12: string;
    yearLabel: string;
    totalLabel: string;
    cta: string;
  };
  join: {
    badgeText: string;
    title: string;
    subtitle: string;
    sectionPersonal: string;
    firstName: string;
    lastName: string;
    postalCode: string;
    houseNumber: string;
    age: string;
    sectionContact: string;
    email: string;
    phone: string;
    sectionBusiness: string;
    companyName: string;
    kvk: string;
    consultantEmail: string;
    sectionCV: string;
    cvDrop: string;
    cvFormats: string;
    sectionVerification: string;
    submitVerified: string;
    submitUnverified: string;
    disclaimer: string;
  };
}

export const translations: Record<Language, TranslationContent> = {
  nl: {
    nav: {
      home: 'Home',
      ecosystem: 'Ecosysteem',
      pitch: 'Pitch',
      basis: 'Basis',
      bonus: 'Bonus',
      passief: 'Passief',
      join: 'Join',
      settings: 'Back',
      proOn: 'Pro Aan',
      proOff: 'Pro Uit'
    },
    home: {
      pill: 'Verdienende Vrienden Club',
      titlePrefix: 'Ontwerp Je ',
      titleHighlight: 'Financiële Vrijheid',
      titleSuffix: '',
      subtitle: 'Van dagelijkse inzet naar groeiend vermogen. Drie pijlers, één motor — volledig in jouw handen.',
      cta: 'Start de reis',
      ctaSecondary: 'Bekijk het model',
      stats: [
        { value: '€30', label: 'per uur basis' },
        { value: '€300', label: 'per plaatsing' },
        { value: '€3K+', label: 'passief/maand' },
      ],
      featuresTitle: 'Hoe het werkt',
      features: [
        { title: 'Quality Calls', desc: 'Verdien €30/uur met kwalitatieve acquisitie voor topbedrijven.' },
        { title: 'Recruitment Bonus', desc: '€300 per succesvolle plaatsing. Direct uitbetaald.' },
        { title: 'Passief Inkomen', desc: 'Bouw een motor die maandelijks groeit — zonder plafond.' },
      ],
      promiseTitle: 'De Belofte',
      promiseText: 'Wij bieden geen snel rijk worden. Wij bieden een',
      system: 'systeem',
      promiseSuffix: '. Een transparante, geautomatiseerde weg om je dagelijkse inzet rechtstreeks en efficiënt te laten resulteren in groeiend, tastbaar eigen vermogen.',
    },
    pitch: {
      badge: 'De Pitch',
      title1: 'Wanneer ',
      titleHighlight1: 'checkte',
      title2: ' je voor het laatst ',
      titleHighlight2: 'in met je inzicht',
      title3: '?',
      subtitle: 'Drie pijlers. Eén motor. Jouw financiële vrijheid begint hier.',
      cta: 'Bekijk het verdienmodel',
      cards: [
        { num: '01', title: 'CEO van je route', desc: 'Geen hiërarchie. Jij bepaalt je eigen succes en tempo. Geen limieten op wat je kunt bereiken.' },
        { num: '02', title: 'Direct Verdienen', desc: '€30 per uur, €300 per deal. Geen wachttijden, pure beloning voor prestatie.' },
        { num: '03', title: 'Passief Bouwen', desc: 'Creëer inkomen voor de lange termijn. Bouw een motor die blijft draaien.' },
      ],
    },
    basis: {
      badge: 'Stap 1',
      titlePrefix: 'De Basis: ',
      titleHighlight: 'Quality Calls',
      subtitle: 'Je eerste inkomstenbron. Stabiel, direct en gegarandeerd.',
      calcTitle: 'Rekenmodule Basis',
      calcSubtitle: 'Sleep de slider om je inkomen te berekenen',
      hoursLabel: 'Uren per maand',
      hoursMin: '40 (min)',
      hoursFull: '160 (full)',
      resultLabel: 'Maandelijks Basisinkomen',
      cta: 'Naar Bonus & Groei',
      steps: [
        { num: '01', title: 'Onboarding & Start', text: 'De eerste maand staat in het teken van onboarding. Je start direct met Quality Calls (QC) voor ons netwerk van 150+ bedrijven.' },
        { num: '02', title: 'Jouw Tarief', text: 'Je ontvangt een vast tarief van €30 per uur voor uitgevoerde kwaliteitscontroles.' },
        { num: '03', title: 'De Voorwaarden', text: 'Een QC (gesprek + administratie + close) duurt max 1 uur. Minimum target: 40 QC\'s per maand.' },
      ],
    },
    bonus: {
      badge: 'Stap 2',
      titlePrefix: 'De Bonus: ',
      titleHighlight: 'Recruitment',
      subtitle: 'Schaal je inkomen op met succesvolle plaatsingen.',
      calcTitle: 'Rekenmodule Bonus',
      calcSubtitle: 'Bereken je maandelijkse bonusinkomsten',
      placementsLabel: 'Plaatsingen per maand',
      placementsTarget: '5 (target)',
      resultLabel: 'Maandelijkse Bonus',
      cta: 'Ontdek Passief Inkomen',
      cards: [
        { title: 'Fase 2: Training & Werving', text: 'In de 1e week van maand 2 krijg je intensieve training (leadgeneratie, pre-close, after-sales). Daarna ga je 3 weken zelf recruiten.' },
        { title: 'Het Doel', text: 'Jouw target is 120 netto plaatsingen per jaar (60 per seizoen).' },
        { title: 'De Beloning', text: 'Per succesvolle plaatsing ontvang je direct €300,- bonus. Gevolgd door 1-3 maanden onboardingstijd voor jouw kandidaten.' },
      ],
    },
    passief: {
      badge: 'Stap 3',
      titlePrefix: 'Het ',
      titleHighlight: 'Passieve',
      titleSuffix: ' Inkomen',
      subtitle: 'Bouw je portfolio op en kijk hoe het groeit. Combineer programma\'s voor maximaal rendement.',
      portfolioTitle: 'Stel je portfolio samen',
      portfolioSubtitle: 'Activeer programma\'s en pas aan',
      referralTitle: 'Referral',
      referralDesc: 'Elke kandidaat die via jou netto all-in gaat levert maandelijks passief inkomen op.',
      candidatesLabel: 'Aantal kandidaten (jaar)',
      amountLabel: 'Bedrag per kandidaat',
      miningTitle: 'Mining',
      miningDesc1: 'Elke maand komt er 1 mining computer bij via platforms als Grover, Boastplug & Musicgateway.',
      miningDesc2: 'Je verdient per computer €50/mnd passief. Dit groeit cumulatief mee met elke nieuwe unit.',
      estateTitle: 'Real Estate',
      estateDesc1: 'Elke maand wordt er 1 vastgoedmodule toegevoegd via WoningVry & Partners.',
      estateDesc2: 'Per module ontvang je €50/mnd aan huurinkomsten. Na 4 bezichtigingen/mnd bouw je gestaag een vastgoedportfolio op.',
      activate: 'Activeer',
      active: 'Actief',
      graphTitle: 'Groei over',
      graphSubtitle: 'Projectie op basis van je selectie',
      totalReceived: 'Totaal ontvangen',
      overMonths: 'over',
      month: 'Maand',
      passiveIncome: 'passief inkomen',
      perMonth: '/mnd',
      months12: '12 maanden',
      yearLabel: 'jaar',
      totalLabel: 'totaal',
      cta: 'Join The Club',
    },
    join: {
      badgeText: 'OPEN VOOR INTAKE',
      title: 'Join The Club',
      subtitle: 'Voor volledige toegang tot VVC is een intake vereist.',
      sectionPersonal: 'Persoonlijke gegevens',
      firstName: 'Voornaam *',
      lastName: 'Achternaam *',
      postalCode: 'Postcode',
      houseNumber: 'Huisnummer',
      age: 'Leeftijd',
      sectionContact: 'Contact',
      email: 'E-mail *',
      phone: 'Telefoonnummer *',
      sectionBusiness: 'Zakelijk',
      companyName: 'Bedrijfsnaam',
      kvk: 'KVK-nummer',
      consultantEmail: 'E-mail consultant *',
      sectionCV: 'Upload CV',
      cvDrop: 'Sleep je CV hierheen of klik om te uploaden',
      cvFormats: 'PDF, DOC of DOCX — max 5MB',
      sectionVerification: 'Verificatie',
      submitVerified: 'Aanvraag Verzenden →',
      submitUnverified: 'Voltooi verificatie om te versturen',
      disclaimer: 'Door te versturen ga je akkoord met onze voorwaarden en privacybeleid.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      ecosystem: 'Ecosystem',
      pitch: 'Pitch',
      basis: 'Basis',
      bonus: 'Bonus',
      passief: 'Passive',
      join: 'Join',
      settings: 'Back',
      proOn: 'Pro On',
      proOff: 'Pro Off'
    },
    home: {
      pill: 'Earning Friends Club',
      titlePrefix: 'Design Your ',
      titleHighlight: 'Financial Freedom',
      titleSuffix: '',
      subtitle: 'From daily effort to growing wealth. Three pillars, one engine — entirely in your hands.',
      cta: 'Start the journey',
      ctaSecondary: 'View the model',
      stats: [
        { value: '€30', label: 'per hour base' },
        { value: '€300', label: 'per placement' },
        { value: '€3K+', label: 'passive/month' },
      ],
      featuresTitle: 'How it works',
      features: [
        { title: 'Quality Calls', desc: 'Earn €30/hr with quality acquisition for top companies.' },
        { title: 'Recruitment Bonus', desc: '€300 per successful placement. Paid out directly.' },
        { title: 'Passive Income', desc: 'Build an engine that grows monthly — no ceiling.' },
      ],
      promiseTitle: 'The Promise',
      promiseText: 'We do not offer get-rich-quick schemes. We offer a',
      system: 'system',
      promiseSuffix: '. A transparent, automated path to directly and efficiently convert your daily efforts into growing, tangible equity.',
    },
    pitch: {
      badge: 'The Pitch',
      title1: 'When was the last time you thought about ',
      titleHighlight1: 'designing',
      title2: ' your ',
      titleHighlight2: 'dream career',
      title3: '?',
      subtitle: 'Three pillars. One engine. Your financial freedom starts here.',
      cta: 'View the earning model',
      cards: [
        { num: '01', title: 'CEO of your path', desc: 'No hierarchy. You determine your own success and pace. No limits on what you can achieve.' },
        { num: '02', title: 'Earn Directly', desc: '€30 per hour, €300 per deal. No waiting times, pure performance-based rewards.' },
        { num: '03', title: 'Build Passively', desc: 'Create long-term income. Build an engine that keeps running.' },
      ],
    },
    basis: {
      badge: 'Step 1',
      titlePrefix: 'The Basis: ',
      titleHighlight: 'Quality Calls',
      subtitle: 'Your first income source. Stable, direct and guaranteed.',
      calcTitle: 'Basis Calculator',
      calcSubtitle: 'Drag the slider to calculate your income',
      hoursLabel: 'Hours per month',
      hoursMin: '40 (min)',
      hoursFull: '160 (full)',
      resultLabel: 'Monthly Base Income',
      cta: 'To Bonus & Growth',
      steps: [
        { num: '01', title: 'Onboarding & Start', text: 'The first month is all about onboarding. You start immediately with Quality Calls (QC) for our network of 150+ companies.' },
        { num: '02', title: 'Your Rate', text: 'You receive a fixed rate of €30 per hour for completed quality checks.' },
        { num: '03', title: 'The Conditions', text: 'A QC (call + admin + close) takes max 1 hour. Minimum target: 40 QCs per month.' },
      ],
    },
    bonus: {
      badge: 'Step 2',
      titlePrefix: 'The Bonus: ',
      titleHighlight: 'Recruitment',
      subtitle: 'Scale your income with successful placements.',
      calcTitle: 'Bonus Calculator',
      calcSubtitle: 'Calculate your monthly bonus income',
      placementsLabel: 'Placements per month',
      placementsTarget: '5 (target)',
      resultLabel: 'Monthly Bonus',
      cta: 'Discover Passive Income',
      cards: [
        { title: 'Phase 2: Training & Recruitment', text: 'In week 1 of month 2 you receive intensive training (lead generation, pre-close, after-sales). Then you recruit for 3 weeks.' },
        { title: 'The Goal', text: 'Your target is 120 net placements per year (60 per season).' },
        { title: 'The Reward', text: 'For each successful placement you receive €300 bonus directly. Followed by 1-3 months onboarding time for your candidates.' },
      ],
    },
    passief: {
      badge: 'Step 3',
      titlePrefix: '',
      titleHighlight: 'Passive',
      titleSuffix: ' Income',
      subtitle: 'Build your portfolio and watch it grow. Combine programs for maximum returns.',
      portfolioTitle: 'Build your portfolio',
      portfolioSubtitle: 'Activate programs and customize',
      referralTitle: 'Referral',
      referralDesc: 'Every candidate who goes all-in through you generates monthly passive income.',
      candidatesLabel: 'Number of candidates (year)',
      amountLabel: 'Amount per candidate',
      miningTitle: 'Mining',
      miningDesc1: 'Every month 1 mining computer is added via platforms like Grover, Boastplug & Musicgateway.',
      miningDesc2: 'You earn €50/month per computer passively. This grows cumulatively with each new unit.',
      estateTitle: 'Real Estate',
      estateDesc1: 'Every month 1 real estate module is added via WoningVry & Partners.',
      estateDesc2: 'Per module you receive €50/month in rental income. After 4 viewings/month you steadily build a property portfolio.',
      activate: 'Activate',
      active: 'Active',
      graphTitle: 'Growth over',
      graphSubtitle: 'Projection based on your selection',
      totalReceived: 'Total received',
      overMonths: 'over',
      month: 'Month',
      passiveIncome: 'passive income',
      perMonth: '/mo',
      months12: '12 months',
      yearLabel: 'year',
      totalLabel: 'total',
      cta: 'Join The Club',
    },
    join: {
      badgeText: 'OPEN FOR INTAKE',
      title: 'Join The Club',
      subtitle: 'Full access to VVC requires an intake.',
      sectionPersonal: 'Personal details',
      firstName: 'First name *',
      lastName: 'Last name *',
      postalCode: 'Postal code',
      houseNumber: 'House number',
      age: 'Age',
      sectionContact: 'Contact',
      email: 'Email *',
      phone: 'Phone number *',
      sectionBusiness: 'Business',
      companyName: 'Company name',
      kvk: 'Chamber of Commerce nr.',
      consultantEmail: 'Consultant email *',
      sectionCV: 'Upload CV',
      cvDrop: 'Drop your CV here or click to upload',
      cvFormats: 'PDF, DOC or DOCX — max 5MB',
      sectionVerification: 'Verification',
      submitVerified: 'Submit Application →',
      submitUnverified: 'Complete verification to submit',
      disclaimer: 'By submitting you agree to our terms and privacy policy.',
    },
  }
};