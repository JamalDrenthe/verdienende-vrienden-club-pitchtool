import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
  signInWithCustomToken,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore";

// Centraal VVC Firebase Project (vvc-dev)
export const firebaseConfig = {
  apiKey: "AIzaSyDDB2YIivG4WdG3ro8Y0Gf05Ym_YvagEJQ",
  authDomain: "vvc-dev.firebaseapp.com",
  projectId: "vvc-dev",
  storageBucket: "vvc-dev.firebasestorage.app",
  appId: "1:525163730462:web:1b8c922324689406aec00f",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export interface VvcUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: string;
  partnerCode?: string;
}

/**
 * Luistert naar auth-state en verwerkt SSO-handoff tokens veilig via URL hash fragment (#sso_token=...).
 * Hash fragments worden nooit meegestuurd naar servers of gelogd in access logs / Referer headers.
 */
export function initAuthListener(onUserChange: (user: VvcUser | null) => void): () => void {
  if (typeof window !== "undefined") {
    // Strip legacy ?sso_token query parameter direct uit URL zonder deze te verwerken of loggen
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("sso_token")) {
      searchParams.delete("sso_token");
      const cleanSearch = searchParams.toString();
      window.history.replaceState(
        {},
        document.title,
        `${window.location.pathname}${cleanSearch ? `?${cleanSearch}` : ""}${window.location.hash}`
      );
    }

    // Lees SSO token uitsluitend uit het URL hash fragment (#sso_token=...)
    const rawHash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    if (rawHash) {
      const hashParams = new URLSearchParams(rawHash);
      const ssoToken = hashParams.get("sso_token");
      if (ssoToken) {
        // Verwijder token onmiddellijk uit de URL/browsergeschiedenis vóór verificatie
        hashParams.delete("sso_token");
        const remainingHash = hashParams.toString();
        const cleanUrl = `${window.location.pathname}${window.location.search}${remainingHash ? `#${remainingHash}` : ""}`;
        window.history.replaceState({}, document.title, cleanUrl);

        signInWithCustomToken(auth, ssoToken).catch(() => {
          console.warn("SSO token verificatie overgeslagen of verlopen.");
        });
      }
    }
  }

  return onAuthStateChanged(auth, (firebaseUser: User | null) => {
    if (!firebaseUser) {
      onUserChange(null);
      return;
    }

    const vvcUser: VvcUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "VVC Partner",
      photoURL: firebaseUser.photoURL,
      partnerCode: firebaseUser.email ? firebaseUser.email.split("@")[0].toUpperCase() : firebaseUser.uid.substring(0, 8).toUpperCase(),
    };

    onUserChange(vvcUser);
  });
}

/**
 * Inloggen met Google
 */
export async function loginWithGoogle(): Promise<VvcUser> {
  const result = await signInWithPopup(auth, googleProvider);
  const u = result.user;
  return {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName || u.email?.split("@")[0] || "VVC Partner",
    photoURL: u.photoURL,
    partnerCode: u.email ? u.email.split("@")[0].toUpperCase() : u.uid.substring(0, 8).toUpperCase(),
  };
}

/**
 * Inloggen met Email & Wachtwoord
 */
export async function loginWithEmail(email: string, pass: string): Promise<VvcUser> {
  const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
  const u = result.user;
  return {
    uid: u.uid,
    email: u.email,
    displayName: u.displayName || u.email?.split("@")[0] || "VVC Partner",
    photoURL: u.photoURL,
    partnerCode: u.email ? u.email.split("@")[0].toUpperCase() : u.uid.substring(0, 8).toUpperCase(),
  };
}

/**
 * Uitloggen
 */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/**
 * Slaat een kandidaat realtime op in VVC Firestore
 */
export async function savePitchCandidateToFirestore(candidateData: Record<string, any>): Promise<string> {
  const candidateId = `cand_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const candidateRef = doc(db, "candidates", candidateId);
  
  try {
    await setDoc(candidateRef, {
      ...candidateData,
      id: candidateId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      source: "vvc-pitchtool",
      stage: candidateData.stage || "Contact Gelegd",
      status: "active",
    }, { merge: true });
  } catch (fsErr) {
    console.warn("Firestore candidate write skipped (rules/permissions):", fsErr);
  }

  return candidateId;
}

