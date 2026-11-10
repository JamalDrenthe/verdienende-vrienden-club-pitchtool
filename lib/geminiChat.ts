// VVC Gemini AI Chat Integration
// Powered by Google Gemini 3.5 Flash Lite

const GEMINI_API_KEY =
  (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

const MODEL_NAME = 'gemini-3.5-flash-lite';

export interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

const SYSTEM_INSTRUCTION = `Je bent de officiële VVC Assistent (Verdienende Vrienden Club). Je beantwoordt vragen van potentiële partners, closers en recruiters die toetreden tot de club.

HET VVC PARTNER MODEL (3 PIJLERS):
1. Pijler 1 (Uurvergoeding): Gegarandeerd €30 ex btw per gewerkt uur tijdens Quality Calls en acquisitie. Volledig flexibel in te plannen (bijv. 10 tot 40 uur per week).
2. Pijler 2 (Plaatsingsbonus): Vaste netto bonus van €300 per succesvolle kandidaat of afgeronde plaatsing. Direct uitbetaald. Geen plafond.
3. Pijler 3 (Passief Inkomen): Vaste vergoeding van €25 per maand per actieve geplaatste kandidaat. Dit telt cumulatief door zolang de kandidaat actief is (bijv. 10 kandidaten = €250/mnd, 120 kandidaten = €3.000/mnd, 240 kandidaten = €6.000/mnd).

AANVULLENDE DETAILS:
- Double Team Formule: Samenwerking tussen een Netwerker (deuropener) en een Closer (dealmaker). Directe fee-verdeling en gezamenlijke opbouw van passief inkomen.
- 13 actieve posities via Djobba.works: Onder andere High-Ticket Closer, Investor Relations Manager, 360 Recruiter, Quality Assurance Caller, Commercieel Medewerker.
- Intake & Toelating: Directe inschrijving via de 'JOIN' knop in de navigatie of /join. Na verificatie wordt het account klaargezet in CRMos.

COMMUNICATIE REGELS:
- Antwoord altijd in direct, krachtig en zakelijk Nederlands.
- Wees concreet en feitelijk. Reken getallen exact voor als de gebruiker vraagt om inkomsten of uren.
- Geen AI clichés of zwevende marketing (geen 'reis', 'motor', 'blauwdruk', 'sneeuwbaleffect').
- Geen em-dashes (—) of en-dashes (–). Gebruik dubbele punten, opsommingstekens of komma's.
- Houd antwoorden to the point en prettig leesbaar.`;

export async function askGemini(
  userPrompt: string,
  history: ChatMessage[] = []
): Promise<string> {
  const apiKey = GEMINI_API_KEY;

  if (!apiKey) {
    return 'Er is momenteel geen API sleutel geconfigureerd voor de AI assistent.';
  }

  // Build conversation contents (excluding initial greeting)
  const conversationHistory = history
    .filter((msg, idx) => !(idx === 0 && msg.sender === 'bot'))
    .slice(-8)
    .map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

  // Append latest user message
  conversationHistory.push({
    role: 'user',
    parts: [{ text: userPrompt }],
  });

  const payload = {
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    contents: conversationHistory,
    generationConfig: {
      temperature: 0.6,
      topP: 0.95,
      maxOutputTokens: 600,
    },
  };

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API request failed:', response.status, errText);

      // Fallback attempt with gemini-flash-latest if 404
      if (response.status === 404) {
        return await fallbackGeminiFlash(payload, apiKey);
      }
      return getSmartLocalFallback(userPrompt);
    }

    const data = await response.json();
    const candidateText =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: any) => p.text || '')
        .join('')
        .trim();

    if (candidateText) {
      return cleanOutput(candidateText);
    }

    return getSmartLocalFallback(userPrompt);
  } catch (error) {
    console.error('Gemini fetch error:', error);
    return getSmartLocalFallback(userPrompt);
  }
}

async function fallbackGeminiFlash(payload: any, apiKey: string): Promise<string> {
  try {
    const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;
    const res = await fetch(fallbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const d = await res.json();
      const txt = d?.candidates?.[0]?.content?.parts?.map((p: any) => p.text || '').join('').trim();
      if (txt) return cleanOutput(txt);
    }
  } catch (e) {
    console.error('Fallback error:', e);
  }
  return getSmartLocalFallback('');
}

function cleanOutput(text: string): string {
  return text
    .replace(/—/g, ', ')
    .replace(/–/g, '-')
    .replace(/€\s*(\d+),-/g, '€$1');
}

function getSmartLocalFallback(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('verdien') || q.includes('geld') || q.includes('salaris') || q.includes('tarief')) {
    return 'Het VVC verdienmodel bestaat uit drie duidelijke componenten:\n\n* Uurvergoeding: €30 per uur ex btw voor acquisitie en kwalificatie.\n* Plaatsingsbonus: €300 netto per succesvolle deal of plaatsing.\n* Passief inkomen: €25 per maand per actieve kandidaat.\n\nStel gerust een specifieke berekening voor jouw gewenste aantal uren of plaatsingen.';
  }
  if (q.includes('double') || q.includes('team') || q.includes('partner') || q.includes('duo')) {
    return 'De Double Team opzet koppelt een Netwerker (deuropener) aan een Closer (dealmaker). Beide partners verdelen de directe fee en bouwen gezamenlijk aan het maandelijks passief inkomen van €25 per kandidaat.';
  }
  if (q.includes('passief') || q.includes('kandidaat') || q.includes('25')) {
    return 'Elke kandidaat die via jou actief aan de slag gaat levert maandelijks €25 op zolang het traject loopt. Bij 120 actieve kandidaten per jaar is dat €3.000 per maand aan vast terugkerend inkomen.';
  }
  if (q.includes('join') || q.includes('aanmelden') || q.includes('intake') || q.includes('starten')) {
    return 'Aanmelden kan direct via de knop JOIN in de navigatiebalk. Vul je contactgegevens en optionele bedrijfsgegevens in om de intake in gang te zetten.';
  }
  return 'Ik kan alle vragen over het VVC partnermodel beantwoorden:\n\n* Gegarandeerde basis: €30 per uur\n* Plaatsingsbonus: €300 per deal\n* Passief inkomen: €25 per maand per kandidaat\n* Double Team samenwerking en intake procedure';
}
