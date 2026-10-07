export type CurrencyCode = 'USD' | 'KES' | 'UGX' | 'RWF' | 'BIF';

export interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  format: (amount: number | string) => string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    label: 'USD ($)',
    symbol: '$',
    format: (amt) => (typeof amt === 'number' ? `$${amt}` : amt),
  },
  KES: {
    code: 'KES',
    label: 'KES (KSh)',
    symbol: 'KSh',
    format: (amt) => (typeof amt === 'number' ? `KSh ${amt.toLocaleString()}` : amt),
  },
  UGX: {
    code: 'UGX',
    label: 'UGX (USh)',
    symbol: 'USh',
    format: (amt) => (typeof amt === 'number' ? `USh ${amt.toLocaleString()}` : amt),
  },
  RWF: {
    code: 'RWF',
    label: 'RWF (FRw)',
    symbol: 'FRw',
    format: (amt) => (typeof amt === 'number' ? `FRw ${amt.toLocaleString()}` : amt),
  },
  BIF: {
    code: 'BIF',
    label: 'BIF (FBu)',
    symbol: 'FBu',
    format: (amt) => (typeof amt === 'number' ? `FBu ${amt.toLocaleString()}` : amt),
  },
};

export interface PlanBand {
  id: string;
  name: string;
  workersLabel: string;
  minWorkers: number;
  maxWorkers: number | null;
  prices: Record<CurrencyCode, number | 'Talk to us'>;
  description: string;
  isPopular?: boolean;
}

export const PLAN_BANDS: PlanBand[] = [
  {
    id: 'starter',
    name: 'Starter',
    workersLabel: '1–4 workers',
    minWorkers: 1,
    maxWorkers: 4,
    prices: {
      USD: 5,
      KES: 700,
      UGX: 20000,
      RWF: 7500,
      BIF: 20000,
    },
    description: 'For small workshops, individual retail locations, and emerging teams.',
  },
  {
    id: 'small',
    name: 'Small',
    workersLabel: '5–9 workers',
    minWorkers: 5,
    maxWorkers: 9,
    prices: {
      USD: 10,
      KES: 1400,
      UGX: 40000,
      RWF: 15000,
      BIF: 40000,
    },
    description: 'For established single-location teams needing reliable presence tracking.',
  },
  {
    id: 'growing',
    name: 'Growing',
    workersLabel: '10–19 workers',
    minWorkers: 10,
    maxWorkers: 19,
    prices: {
      USD: 15,
      KES: 2500,
      UGX: 60000,
      RWF: 22500,
      BIF: 60000,
    },
    description: 'For growing businesses managing shifts across one or several active sites.',
    isPopular: true,
  },
  {
    id: 'business-standard',
    name: 'Business Standard',
    workersLabel: '20–29 workers',
    minWorkers: 20,
    maxWorkers: 29,
    prices: {
      USD: 25,
      KES: 3500,
      UGX: 100000,
      RWF: 37500,
      BIF: 100000,
    },
    description: 'For businesses operating multiple branches, distribution points, or depots.',
  },
  {
    id: 'business-plus',
    name: 'Business Plus',
    workersLabel: '30–49 workers',
    minWorkers: 30,
    maxWorkers: 49,
    prices: {
      USD: 50,
      KES: 7000,
      UGX: 200000,
      RWF: 75000,
      BIF: 200000,
    },
    description: 'For medium organisations requiring consistent manager review across teams.',
  },
  {
    id: 'business-pro',
    name: 'Business Pro',
    workersLabel: '50–99 workers',
    minWorkers: 50,
    maxWorkers: 99,
    prices: {
      USD: 100,
      KES: 13500,
      UGX: 400000,
      RWF: 150000,
      BIF: 400000,
    },
    description: 'For multi-site organisations with rotating teams and shift schedules.',
  },
  {
    id: 'business-max',
    name: 'Business Max',
    workersLabel: '100–199 workers',
    minWorkers: 100,
    maxWorkers: 199,
    prices: {
      USD: 150,
      KES: 20500,
      UGX: 600000,
      RWF: 225000,
      BIF: 600000,
    },
    description: 'For large operational workforces requiring structured site presence.',
  },
  {
    id: 'custom',
    name: 'Custom',
    workersLabel: '200+ workers',
    minWorkers: 200,
    maxWorkers: null,
    prices: {
      USD: 'Talk to us',
      KES: 'Talk to us',
      UGX: 'Talk to us',
      RWF: 'Talk to us',
      BIF: 'Talk to us',
    },
    description: 'For 200+ workers, or fixed-duration needs like construction projects, events, and seasonal operations.',
  },
];

export const CORE_INCLUDED_FEATURES = [
  {
    title: 'Plan the work',
    description: 'Set the work your organisation expects and organise it across your Sites.',
  },
  {
    title: 'Keep attendance records together',
    description: 'Record workforce presence and maintain an attendance history for your organisation.',
  },
  {
    title: 'Understand what needs review',
    description: 'Give Managers clear information about planned work, recorded attendance and situations that need attention.',
  },
  {
    title: 'Give Workers access to their records',
    description: 'Workers can see their own attendance information with clarity and trust.',
  },
  {
    title: 'Standard adoption support',
    description: 'Human onboarding assistance normally within 24 hours, product documentation, and implementation guidance.',
  },
];

export const GUIDES_CATEGORIES = [
  {
    id: 'getting-started',
    title: 'Getting started',
    description: 'Set up your organisation and learn the first steps in Klockit.',
    articlesCount: 3,
  },
  {
    id: 'workers-invitations',
    title: 'Workers and invitations',
    description: 'Learn how Workers join your organisation and access their own records.',
    articlesCount: 4,
  },
  {
    id: 'sites-locations',
    title: 'Sites and work locations',
    description: 'Understand how your organisation represents its workplaces and approved work locations.',
    articlesCount: 3,
  },
  {
    id: 'planning-work',
    title: 'Planning work',
    description: 'Find guidance for organising expected work and work sessions across sites.',
    articlesCount: 2,
  },
  {
    id: 'recording-attendance',
    title: 'Recording attendance',
    description: 'Learn how supported arrival and departure methods work with QR codes.',
    articlesCount: 3,
    featured: true,
  },
  {
    id: 'manager-review',
    title: 'Manager review',
    description: 'Understand how Managers review attendance records and situations needing attention.',
    articlesCount: 2,
  },
  {
    id: 'attendance-records',
    title: 'Attendance records',
    description: 'Find and understand the presence records available to each role in your team.',
    articlesCount: 3,
  },
  {
    id: 'plans-billing',
    title: 'Plans and billing',
    description: 'Learn about workforce bands, subscriptions, receipts, and payment options.',
    articlesCount: 4,
  },
];

export type WorkerAttendanceStatus = 'At work now' | 'Completed' | 'Not yet arrived' | 'Needs attention';

export interface SampleAttendanceRecord {
  id: string;
  workerCode: string;
  workerName: string;
  initials: string;
  expectedSite: string;
  plannedTime: string;
  arrival: string;
  departure: string;
  status: WorkerAttendanceStatus;
  method: 'Site QR' | 'Worker QR' | 'Manual Worker Ref' | 'Manager Logged';
  details?: string;
  contextNote?: string;
}

export const SAMPLE_ATTENDANCE_DATA: SampleAttendanceRecord[] = [
  {
    id: 'REC-01',
    workerCode: 'W-FX-01',
    workerName: 'Amina Yusuf',
    initials: 'AY',
    expectedSite: 'Main Site',
    plannedTime: '07 Oct, 08:00 — 07 Oct, 16:00',
    arrival: '07:55',
    departure: '—',
    status: 'At work now',
    method: 'Site QR',
    details: 'Worker scanned the Site QR on their phone',
  },
  {
    id: 'REC-02',
    workerCode: 'W-FX-02',
    workerName: 'Grace Uwimana',
    initials: 'GU',
    expectedSite: 'Harbour Warehouse',
    plannedTime: '07 Oct, 08:00 — 07 Oct, 17:00',
    arrival: '07:58',
    departure: '—',
    status: 'At work now',
    method: 'Worker QR',
    details: 'Site device scanned the Worker QR',
  },
  {
    id: 'REC-03',
    workerCode: 'W-FX-03',
    workerName: 'Elena Kayitesi',
    initials: 'EK',
    expectedSite: 'Central Workshop',
    plannedTime: '07 Oct, 07:30 — 07 Oct, 12:00',
    arrival: '07:28',
    departure: '12:05',
    status: 'Completed',
    method: 'Site QR',
    details: 'Arrival and departure recorded',
  },
  {
    id: 'REC-04',
    workerCode: 'W-FX-04',
    workerName: 'Josiane Niyonzima',
    initials: 'JN',
    expectedSite: 'Parkway Yard',
    plannedTime: '07 Oct, 09:00 — 07 Oct, 17:30',
    arrival: '08:52',
    departure: '—',
    status: 'At work now',
    method: 'Worker QR',
    details: 'Site device scanned the Worker QR',
  },
  {
    id: 'REC-05',
    workerCode: 'W-FX-05',
    workerName: 'David Mwangi',
    initials: 'DM',
    expectedSite: 'Central Workshop',
    plannedTime: '07 Oct, 13:00 — 07 Oct, 21:00',
    arrival: '—',
    departure: '—',
    status: 'Not yet arrived',
    method: 'Site QR',
    details: 'Afternoon shift scheduled · Starts at 13:00',
  },
  {
    id: 'REC-06',
    workerCode: 'W-FX-06',
    workerName: 'Emmanuel Nkurunziza',
    initials: 'EN',
    expectedSite: 'Harbour Warehouse',
    plannedTime: '07 Oct, 08:00 — 07 Oct, 16:30',
    arrival: '09:15',
    departure: '—',
    status: 'Needs attention',
    method: 'Site QR',
    details: 'Arrival recorded after the planned start',
    contextNote: 'Manager review may add context for this attendance record',
  },
];
