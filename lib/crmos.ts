/**
 * CRMos Bi-directionele Bridge Client voor Pitch Tool
 * Communiceert veilig met CRMos API (https://crmos.one/api/v1)
 * met veilige sessie-gebaseerde authenticatie.
 */

import { auth } from './firebase';

const CRMOS_BASE_URL = (import.meta.env.VITE_CRMOS_BASE_URL || 'https://crmos.one/api/v1').trim();
const CRMOS_API_KEY = (import.meta.env.VITE_CRMOS_API_KEY || '').trim();

/**
 * Haalt een geldig Firebase Bearer ID-token op als de partner is ingelogd
 */
export async function getCrmosBridgeToken(): Promise<string | null> {
  try {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  } catch (err) {
    console.warn('CRMos bridge auth token notice:', err);
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
 * Upsert kandidaat naar CRMos Contacts API indien geconfigureerd
 */
export async function syncCandidateToCrmos(candidate: PitchCandidatePayload): Promise<{ success: boolean; data?: any }> {
  const token = await getCrmosBridgeToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (CRMOS_API_KEY) {
    headers['X-CRMOS-API-KEY'] = CRMOS_API_KEY;
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
      console.warn('CRMos upsert status:', res.status);
      return { success: false };
    }
  } catch (err) {
    console.warn('CRMos sync notice:', err);
    return { success: false };
  }
}
