// VVC Gemini AI Chat Integration
// Communicates via server-side Cloudflare Pages Function (/api/chat)
// so no API keys are ever exposed in the browser bundle.

export interface ChatMessage {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

export async function askGemini(
  userPrompt: string,
  history: ChatMessage[] = []
): Promise<string> {
  const sanitizedHistory = history
    .filter((msg, idx) => !(idx === 0 && msg.sender === 'bot'))
    .slice(-8)
    .map((msg) => ({
      sender: msg.sender,
      text: msg.text,
    }));

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: userPrompt,
        history: sanitizedHistory,
      }),
    });

    if (!response.ok) {
      return getSmartLocalFallback(userPrompt);
    }

    const data = (await response.json()) as { reply?: string };
    const candidateText = data?.reply?.trim();

    if (candidateText) {
      return cleanOutput(candidateText);
    }

    return getSmartLocalFallback(userPrompt);
  } catch {
    return getSmartLocalFallback(userPrompt);
  }
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
