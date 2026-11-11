/**
 * CRMos Bi-directionele Bridge Client voor Pitch Tool
 * Communiceert vlekkeloos met CRMos API (https://crmos.one/api/v1)
 * met automatische bridge token authenticatie.
 */

const CRMOS_BASE_URL = 'https://crmos.one/api/v1';
const CRMOS_API_KEY = 'crm_live_vvc_verdienende_vrienden_club_2026';

let cachedBridgeToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Haalt een geldig Firebase Bearer ID-token op voor CRMos via de bridge service-account
 */
export async function getCrmosBridgeToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedBridgeToken && now < tokenExpiresAt - 60000) {
    return cachedBridgeToken;
  }

  try {
    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsBPKp7i7Cd959bF8hZzTDtV_V_7cI9Xo',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'vvc-sync-test@crmos.one',
          password: 'VvcSyncTest2026!',
          returnSecureToken: true,
        }),
      }
    );

    if (!res.ok) {
      console.warn('CRMos bridge auth warning (status):', res.status);
      return null;
    }

    const data = await res.json();
    cachedBridgeToken = data.idToken;
    tokenExpiresAt = now + (parseInt(data.expiresIn || '3600', 10) * 1000);
    return cachedBridgeToken;
  } catch (err) {
    console.warn('CRMos bridge auth fetch notice:', err);
    return null;
  }
}

export interface PitchCandidatePayload {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode?: string;
  houseNumber?: string;
  age?: string;
  companyName?: string;
  kvk?: string;
  partnerId?: string | null;
  partnerEmail?: string;
  partnerName?: string;
  partnerCode?: string | null;
  hours?: number;
  placements?: number;
  referrals?: number;
  refValue?: number;
  basisIncome?: number;
  bonusIncome?: number;
  passiveMonthly?: number;
  grandTotal?: number;
  grandAnnual?: number;
  verified?: boolean;
  cvName?: string;
  notes?: string;
}

/**
 * Slaat de kandidaat op in localStorage als offline veilige cache
 */
function cacheCandidateLocally(candidate: PitchCandidatePayload & { savedAt: string }) {
  try {
    const raw = localStorage.getItem('vvc_pitch_candidates');
    const list: any[] = raw ? JSON.parse(raw) : [];
    // Voeg toe of update
    const idx = list.findIndex((c) => c.email === candidate.email || (candidate.id && c.id === candidate.id));
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...candidate };
    } else {
      list.unshift(candidate);
    }
    localStorage.setItem('vvc_pitch_candidates', JSON.stringify(list.slice(0, 100)));
  } catch (e) {
    console.warn('LocalStorage save notice:', e);
  }
}

/**
 * Upsert kandidaat direct naar CRMos Contacts API
 */
export async function syncCandidateToCrmos(candidate: PitchCandidatePayload): Promise<{ success: boolean; data?: any }> {
  // Sla altijd lokaal op ter beveiliging
  cacheCandidateLocally({
    ...candidate,
    savedAt: new Date().toISOString(),
  });

  const token = await getCrmosBridgeToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-CRMOS-API-KEY': CRMOS_API_KEY,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const tags = ['#vvc', '#pitchtool'];
  if (candidate.partnerCode) {
    tags.push(`#partner:${candidate.partnerCode.toLowerCase()}`);
  }
  if (candidate.verified) {
    tags.push('#voice-verified');
  }

  const body = {
    first_name: candidate.firstName.trim(),
    last_name: candidate.lastName.trim(),
    email: candidate.email.trim().toLowerCase(),
    phone: candidate.phone.trim(),
    company: candidate.companyName?.trim() || 'Verdienende Vrienden Club Kandidaat',
    status: 'lead',
    tags,
    notes: candidate.notes || `Aangemeld via Pitch Tool. Doel: €${candidate.grandTotal || 0}/mnd.`,
    custom_fields: {
      firestore_candidate_id: candidate.id || null,
      postal_code: candidate.postalCode?.trim() || null,
      house_number: candidate.houseNumber?.trim() || null,
      age: candidate.age?.trim() || null,
      kvk: candidate.kvk?.trim() || null,
      partner_id: candidate.partnerId || null,
      partner_email: candidate.partnerEmail || null,
      partner_name: candidate.partnerName || null,
      partner_code: candidate.partnerCode || null,
      hours: candidate.hours || 0,
      placements: candidate.placements || 0,
      referrals: candidate.referrals || 0,
      basis_income: candidate.basisIncome || 0,
      bonus_income: candidate.bonusIncome || 0,
      passive_monthly: candidate.passiveMonthly || 0,
      monthly_goal: candidate.grandTotal || 0,
      annual_goal: candidate.grandAnnual || 0,
      voice_verified: !!candidate.verified,
      cv_name: candidate.cvName || null,
      submitted_at: new Date().toISOString(),
    },
  };

  try {
    const res = await fetch(`${CRMOS_BASE_URL}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    } else {
      console.warn('CRMos upsert returned status:', res.status);
      return { success: false };
    }
  } catch (err) {
    console.warn('CRMos network sync notice:', err);
    return { success: false };
  }
}
