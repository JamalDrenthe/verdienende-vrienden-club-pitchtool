import { LucideIcon } from 'lucide-react';

export interface EcosystemNode {
  id: string;
  title: string;
  subtitle: string;
  shortRole: string;
  description: string;
  why: string;
  icon: LucideIcon;
  color: string; // Tailwind color class piece, e.g., 'cyan-400'
  position: { top: string; left: string };
  metrics?: string[];
}

export type PageView = 'home' | 'ecosystem' | 'other' | 'pitch' | 'about' | 'pro';

export type Language = 'nl' | 'en';

export interface NavItem {
  id: PageView;
  label: string;
  icon?: LucideIcon;
}