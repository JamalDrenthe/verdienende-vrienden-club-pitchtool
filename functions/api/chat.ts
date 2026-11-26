// Cloudflare Pages Function: Server-side Gemini AI Proxy for VVC Pitchtool
// Keeps GEMINI_API_KEY strictly server-side (never exposed in the client bundle).

interface Env {
  GEMINI_API_KEY?: string;
}

interface IncomingHistoryItem {
  sender?: string;
  text?: string;
}

interface ChatRequestBody {
  prompt?: unknown;
  history?: unknown;
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

const MODELS = ['gemini-2.5-flash-lite', 'gemini-2.0-flash', 'gemini-flash-latest'];
const MAX_PROMPT_LENGTH = 2000;
const MAX_HISTORY_ITEMS = 8;
const MAX_HISTORY_TEXT_LENGTH = 1500;

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

async function callGemini(
  apiKey: string,
  model: string,
  payload: Record<string, unknown>
): Promise<{ ok: boolean; status: number; text?: string }> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { ok: false, status: response.status };
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
  };

  const candidateText = data?.candidates?.[0]?.content?.parts
    ?.map((p) => p.text || '')
    .join('')
    .trim();

  if (!candidateText) {
    return { ok: false, status: 502 };
  }

  return { ok: true, status: 200, text: candidateText };
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const apiKey = context.env?.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return jsonResponse(
      { error: 'AI-assistent is momenteel niet geconfigureerd op de server.' },
      503
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await context.request.json()) as ChatRequestBody;
  } catch {
    return jsonResponse({ error: 'Ongeldige JSON payload.' }, 400);
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
    return jsonResponse(
      { error: `Prompt is verplicht en mag maximaal ${MAX_PROMPT_LENGTH} tekens bevatten.` },
      400
    );
  }

  const rawHistory = Array.isArray(body.history)
    ? (body.history as IncomingHistoryItem[])
    : [];

  const contents = rawHistory
    .filter(
      (msg, idx) =>
        !(idx === 0 && msg?.sender === 'bot') &&
        typeof msg?.text === 'string' &&
        msg.text.trim().length > 0
    )
    .slice(-MAX_HISTORY_ITEMS)
    .map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: (msg.text as string).trim().slice(0, MAX_HISTORY_TEXT_LENGTH) }],
    }));

  contents.push({
    role: 'user',
    parts: [{ text: prompt }],
  });

  const payload = {
    systemInstruction: {
      parts: [{ text: SYSTEM_INSTRUCTION }],
    },
    contents,
    generationConfig: {
      temperature: 0.6,
      topP: 0.95,
      maxOutputTokens: 600,
    },
  };

  try {
    for (const model of MODELS) {
      const result = await callGemini(apiKey, model, payload);
      if (result.ok && result.text) {
        return jsonResponse({ reply: result.text }, 200);
      }
      if (result.status !== 404) {
        break;
      }
    }

    return jsonResponse(
      { error: 'Geen geldig antwoord ontvangen van de AI-service.' },
      502
    );
  } catch {
    return jsonResponse(
      { error: 'Interne fout bij het verbinden met de AI-service.' },
      502
    );
  }
};
