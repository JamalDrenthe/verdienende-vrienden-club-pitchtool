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
      settings: 'Terug',
      proOn: 'Pro Aan',
      proOff: 'Pro Uit',
    },
    home: {
      pill: 'Verdienende Vrienden Club',
      titlePrefix: 'Inkomsten ',
      titleHighlight: 'Partner Model',
      titleSuffix: '',
      subtitle: 'Vast uurtarief, plaatsingsbonus en maandelijks passief inkomen.',
      cta: 'Start Berekening',
      ctaSecondary: 'Bekijk Model',
      stats: [
        { value: '€30', label: 'per uur basis' },
        { value: '€300 tot €500', label: 'per plaatsing' },
        { value: '€3K+', label: 'passief per maand' },
      ],
      featuresTitle: 'Hoe het werkt',
      features: [
        { title: 'Quality Calls', desc: 'Verdien €30 per uur met telefonische kwalificatie voor aangesloten partners.' },
        { title: 'Plaatsingsbonus', desc: '€300 per succesvolle kandidaat direct uitbetaald op factuur.' },
        { title: 'Passief Inkomen', desc: 'Vaste maandelijkse vergoeding van €25 per geplaatste kandidaat.' },
      ],
      promiseTitle: 'Voorwaarden',
      promiseText: 'Transparante afspraken en vaste tarieven per',
      system: 'gewerkt uur en gesloten deal',
      promiseSuffix: '. Maandelijkse uitbetaling zonder verrassingen.',
    },
    pitch: {
      badge: 'Partner Model',
      title1: 'Inkomsten als ',
      titleHighlight1: 'partner',
      title2: ' bij ',
      titleHighlight2: 'VVC',
      title3: '.',
      subtitle: 'Drie inkomstenbronnen binnen één overzichtelijk platform.',
      cta: 'Start Berekening',
      cards: [
        { num: '01', title: 'Vast Uurtarief', desc: 'Werk op flexibele uren met een gegarandeerde vergoeding van €30 per uur.' },
        { num: '02', title: 'Directe Bonussen', desc: '€300 per succesvolle kandidaat direct uitbetaald bij plaatsing.' },
        { num: '03', title: 'Passieve Stroom', desc: 'Bouw maandelijks terugkerend inkomen op per actieve relatie.' },
      ],
    },
    basis: {
      badge: 'Stap 1',
      titlePrefix: 'Basisvergoeding: ',
      titleHighlight: 'Quality Calls',
      subtitle: 'Vast inkomen op basis van gewerkte uren. Direct en gegarandeerd.',
      calcTitle: 'Basis Calculator',
      calcSubtitle: 'Bereken je maandelijkse basisinkomen',
      hoursLabel: 'Uren per week',
      hoursMin: '10u parttime',
      hoursFull: '40u fulltime',
      resultLabel: 'Maandelijks Basisinkomen',
      cta: 'Naar Plaatsingsbonus',
      steps: [
        { num: '01', title: 'Start en Instructie', text: 'Je start direct met Quality Calls voor het partnernetwerk van aangesloten bedrijven.' },
        { num: '02', title: 'Vast Uurtarief', text: 'Je ontvangt een vaste vergoeding van €30 per uur voor voltooide controles.' },
        { num: '03', title: 'Inzet en Planning', text: 'Bepaal zelf hoeveel uren per week je beschikbaar bent.' },
      ],
    },
    bonus: {
      badge: 'Stap 2',
      titlePrefix: 'Plaatsingsbonus: ',
      titleHighlight: 'Werving',
      subtitle: 'Verdien extra per succesvolle kandidaat of deal.',
      calcTitle: 'Bonus Calculator',
      calcSubtitle: 'Bereken je maandelijkse bonusinkomsten',
      placementsLabel: 'Plaatsingen per maand',
      placementsTarget: '5 deals gemiddeld',
      resultLabel: 'Maandelijkse Bonus',
      cta: 'Naar Passief Inkomen',
      cards: [
        { title: 'Selectie en Werving', text: 'Selecteer en begeleid geschikte kandidaten voor openstaande posities.' },
        { title: 'Vaste Bonus per Deal', text: 'Ontvang €300 netto bonus direct na afronding van de plaatsing.' },
        { title: 'Geen Plafond', text: 'Hoe meer succesvolle plaatsingen, hoe hoger je maandelijkse uitkering.' },
      ],
    },
    passief: {
      badge: 'Stap 3',
      titlePrefix: 'Passief ',
      titleSuffix: '',
      titleHighlight: 'Inkomen',
      subtitle: 'Bouw een terugkerende maandelijkse cashflow op.',
      portfolioTitle: 'Jouw Portfolio',
      portfolioSubtitle: 'Overzicht van actieve modules',
      referralTitle: 'Kandidaten Portfolio',
      referralDesc: 'Elke kandidaat via jou levert maandelijks passief inkomen op.',
      candidatesLabel: 'Aantal kandidaten per jaar',
      amountLabel: 'Bedrag per kandidaat',
      miningTitle: 'Compute Modules',
      miningDesc1: 'Actieve hardware units binnen het netwerk.',
      miningDesc2: 'Vaste uitkering van €50 per maand per actieve module.',
      estateTitle: 'Vastgoed Modules',
      estateDesc1: 'Participatie in vastgoed projecten via partners.',
      estateDesc2: 'Vaste vergoeding van €50 per maand per module.',
      activate: 'Activeren',
      active: 'Actief',
      graphTitle: 'Inkomensgroei',
      graphSubtitle: 'Prognose op basis van jouw selectie',
      totalReceived: 'Totaal Uitbetaald',
      overMonths: 'over',
      month: 'Maand',
      passiveIncome: 'passief per maand',
      perMonth: ' per maand',
      months12: '12 maanden',
      yearLabel: 'Jaar',
      totalLabel: 'totaal',
      cta: 'JOIN',
    },
    join: {
      badgeText: 'DIRECTE AANMELDING',
      title: 'Aanmelden als Partner',
      subtitle: 'Vul je gegevens in voor directe koppeling met CRMos.',
      sectionPersonal: 'Persoonlijke Gegevens',
      firstName: 'Voornaam *',
      lastName: 'Achternaam *',
      postalCode: 'Postcode',
      houseNumber: 'Huisnummer',
      age: 'Leeftijd',
      sectionContact: 'Contactgegevens',
      email: 'E-mailadres *',
      phone: 'Telefoonnummer *',
      sectionBusiness: 'Zakelijke Gegevens',
      companyName: 'Bedrijfsnaam optioneel',
      kvk: 'KVK nummer optioneel',
      consultantEmail: 'Consultant e-mail optioneel',
      sectionCV: 'Curriculum Vitae',
      cvDrop: 'Sleep je CV hierheen of klik om te uploaden',
      cvFormats: 'PDF, DOC of DOCX (maximaal 5MB)',
      sectionVerification: 'Verificatie',
      submitVerified: 'Aanmelding Versturen',
      submitUnverified: 'Vul alle verplichte velden in',
      disclaimer: 'Door te verzenden ga je akkoord met onze partnervoorwaarden.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      ecosystem: 'Ecosystem',
      pitch: 'Pitch',
      basis: 'Base',
      bonus: 'Bonus',
      passief: 'Passive',
      join: 'Join',
      settings: 'Back',
      proOn: 'Pro On',
      proOff: 'Pro Off',
    },
    home: {
      pill: 'Verdienende Vrienden Club',
      titlePrefix: 'Partner ',
      titleHighlight: 'Earning Model',
      titleSuffix: '',
      subtitle: 'Guaranteed hourly rate, placement bonuses, and monthly passive residuals.',
      cta: 'Start Calculation',
      ctaSecondary: 'View Model',
      stats: [
        { value: '€30', label: 'per hour base' },
        { value: '€300 to €500', label: 'per placement' },
        { value: '€3K+', label: 'passive per month' },
      ],
      featuresTitle: 'How it works',
      features: [
        { title: 'Quality Calls', desc: 'Earn €30 per hour conducting quality checks for partner companies.' },
        { title: 'Placement Bonus', desc: '€300 per successful candidate paid directly on invoice.' },
        { title: 'Passive Income', desc: 'Fixed monthly fee of €25 per active candidate.' },
      ],
      promiseTitle: 'Terms',
      promiseText: 'Clear agreements and fixed rates per',
      system: 'hour worked and deal closed',
      promiseSuffix: '. Monthly payments without surprises.',
    },
    pitch: {
      badge: 'Partner Model',
      title1: 'Earnings as a ',
      titleHighlight1: 'partner',
      title2: ' at ',
      titleHighlight2: 'VVC',
      title3: '.',
      subtitle: 'Three direct income streams inside one unified platform.',
      cta: 'Start Calculation',
      cards: [
        { num: '01', title: 'Fixed Hourly Rate', desc: 'Work flexible hours with a guaranteed fee of €30 per hour.' },
        { num: '02', title: 'Direct Bonuses', desc: '€300 per successful candidate paid immediately upon placement.' },
        { num: '03', title: 'Passive Stream', desc: 'Build steady recurring monthly income per active candidate.' },
      ],
    },
    basis: {
      badge: 'Step 1',
      titlePrefix: 'Base Salary: ',
      titleHighlight: 'Quality Calls',
      subtitle: 'Direct income based on hours worked. Guaranteed and verifiable.',
      calcTitle: 'Base Calculator',
      calcSubtitle: 'Calculate your monthly base earnings',
      hoursLabel: 'Hours per week',
      hoursMin: '10h parttime',
      hoursFull: '40h fulltime',
      resultLabel: 'Monthly Base Income',
      cta: 'To Placement Bonus',
      steps: [
        { num: '01', title: 'Start & Onboarding', text: 'You start immediately with Quality Calls for partner companies in the network.' },
        { num: '02', title: 'Fixed Rate', text: 'You receive a fixed rate of €30 per hour for completed quality checks.' },
        { num: '03', title: 'Schedule & Availability', text: 'Decide your own weekly hours and availability.' },
      ],
    },
    bonus: {
      badge: 'Step 2',
      titlePrefix: 'Placement Bonus: ',
      titleHighlight: 'Recruitment',
      subtitle: 'Earn extra per successful candidate or deal.',
      calcTitle: 'Bonus Calculator',
      calcSubtitle: 'Calculate your monthly bonus earnings',
      placementsLabel: 'Placements per month',
      placementsTarget: '5 deals average',
      resultLabel: 'Monthly Bonus',
      cta: 'To Passive Income',
      cards: [
        { title: 'Selection & Placement', text: 'Select and guide qualified candidates for open positions.' },
        { title: 'Fixed Fee per Deal', text: 'Receive €300 net bonus directly upon completed placement.' },
        { title: 'No Cap', text: 'More successful placements mean higher monthly payouts.' },
      ],
    },
    passief: {
      badge: 'Step 3',
      titlePrefix: 'Passive ',
      titleSuffix: '',
      titleHighlight: 'Income',
      subtitle: 'Build recurring monthly cashflow.',
      portfolioTitle: 'Your Portfolio',
      portfolioSubtitle: 'Overview of active modules',
      referralTitle: 'Candidate Portfolio',
      referralDesc: 'Every candidate placed through you yields monthly passive income.',
      candidatesLabel: 'Candidates per year',
      amountLabel: 'Amount per candidate',
      miningTitle: 'Compute Modules',
      miningDesc1: 'Active compute hardware units inside the network.',
      miningDesc2: 'Fixed payout of €50 per month per active module.',
      estateTitle: 'Real Estate Modules',
      estateDesc1: 'Participation in real estate projects via partners.',
      estateDesc2: 'Fixed payout of €50 per month per module.',
      activate: 'Activate',
      active: 'Active',
      graphTitle: 'Income Projection',
      graphSubtitle: 'Projection based on your parameters',
      totalReceived: 'Total Payout',
      overMonths: 'over',
      month: 'Month',
      passiveIncome: 'passive per month',
      perMonth: ' per month',
      months12: '12 months',
      yearLabel: 'Year',
      totalLabel: 'total',
      cta: 'JOIN',
    },
    join: {
      badgeText: 'DIRECT APPLICATION',
      title: 'Apply as Partner',
      subtitle: 'Enter your details for direct CRMos registration.',
      sectionPersonal: 'Personal Information',
      firstName: 'First name *',
      lastName: 'Last name *',
      postalCode: 'Postal code',
      houseNumber: 'House number',
      age: 'Age',
      sectionContact: 'Contact Details',
      email: 'Email *',
      phone: 'Phone number *',
      sectionBusiness: 'Business Details',
      companyName: 'Company name optional',
      kvk: 'Chamber of Commerce nr optional',
      consultantEmail: 'Consultant email optional',
      sectionCV: 'Curriculum Vitae',
      cvDrop: 'Drop your CV here or click to upload',
      cvFormats: 'PDF, DOC or DOCX (max 5MB)',
      sectionVerification: 'Verification',
      submitVerified: 'Submit Application',
      submitUnverified: 'Fill in required fields',
      disclaimer: 'By submitting you agree to our partner terms.',
    },
  },
};
