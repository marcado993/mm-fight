export type WeightClass =
  | "Paja" | "Mosca" | "Gallo" | "Pluma" | "Ligero"
  | "Superligero" | "Welter" | "Superwelter" | "Mediano"
  | "Semipesado" | "Pesado";

export type Style = "Striker" | "Grappler" | "Mixto";
export type Level = "Amateur" | "Pro";
export type Province = "Pichincha" | "Guayas" | "Azuay" | "Manabí" | "El Oro" | "Tungurahua";

export interface Fighter {
  id: string;
  name: string;
  nickname: string;
  photo: string;
  city: string;
  province: Province;
  gym: string;
  gymId: string;
  style: Style;
  level: Level;
  weightClass: WeightClass;
  weightLbs: number;
  rank: number;
  proRecord: { w: number; l: number; d: number };
  amateurRecord: { w: number; l: number; d: number };
  age: number;
  height: string;
  reach: string;
  strikingPower: number;
  grappling: number;
  conditioning: number;
  achievements: string[];
  fightHistory: FightResult[];
}

export interface FightResult {
  opponent: string;
  result: "W" | "L" | "D";
  method: string;
  event: string;
  date: string;
}

export interface Gym {
  id: string;
  name: string;
  tagline: string;
  city: string;
  province: Province;
  address: string;
  logo: string;
  coverPhoto: string;
  coaches: string[];
  totalWins: number;
  totalLosses: number;
  totalDraws: number;
  koRate: number;
  reputationScore: number;
  activeFighters: number;
  activeTitles: number;
  fighters: string[]; // fighter IDs
  rivalry?: string;   // rival gymId
  lat: number;        // latitude
  lng: number;        // longitude
}

export interface Challenge {
  id: string;
  fromFighterId: string;
  fromGymId: string;
  toFighterId: string;
  toGymId: string;
  status: "pending" | "accepted" | "rejected" | "scheduled";
  weightClass: WeightClass;
  proposedDate?: string;
  proposedVenue?: string;
  message?: string;
  createdAt: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  city: string;
  province: Province;
  type: "Nacional" | "Regional" | "Selectivo";
  status: "upcoming" | "live" | "completed";
  mainEvent?: string;
  fights: EventFight[];
}

export interface EventFight {
  fighter1: string;
  fighter2: string;
  weightClass: WeightClass;
  result?: { winner: string; method: string };
}

// ──────────────────────────────────────────────
// FIGHTERS
// ──────────────────────────────────────────────
export const fighters: Fighter[] = [
  {
    id: "f1",
    name: "Marlon Vera",
    nickname: "Chito",
    photo: "/fighters/chito.jpg",
    city: "Chone",
    province: "Manabí",
    gym: "Team Oyama",
    gymId: "g1",
    style: "Mixto",
    level: "Pro",
    weightClass: "Gallo",
    weightLbs: 135,
    rank: 1,
    proRecord: { w: 23, l: 8, d: 1 },
    amateurRecord: { w: 8, l: 1, d: 0 },
    age: 31,
    height: "5'7\"",
    reach: "68\"",
    strikingPower: 92,
    grappling: 88,
    conditioning: 95,
    achievements: ["Top 10 UFC Bantamweight", "ROC Champion 2019", "LFA Veteran"],
    fightHistory: [
      { opponent: "Cory Sandhagen", result: "L", method: "KO", event: "UFC 292", date: "2023-08-12" },
      { opponent: "Dominick Cruz", result: "W", method: "KO/TKO", event: "UFC Mexico", date: "2023-04-22" },
      { opponent: "Song Yadong", result: "L", method: "Decisión", event: "UFC 280", date: "2022-10-22" },
    ],
  },
  {
    id: "f2",
    name: "Andrés Silva",
    nickname: "La Víbora",
    photo: "/fighters/silva.jpg",
    city: "Guayaquil",
    province: "Guayas",
    gym: "Iron Core Syndicate",
    gymId: "g2",
    style: "Striker",
    level: "Pro",
    weightClass: "Ligero",
    weightLbs: 155,
    rank: 2,
    proRecord: { w: 14, l: 2, d: 0 },
    amateurRecord: { w: 10, l: 0, d: 0 },
    age: 27,
    height: "5'10\"",
    reach: "72\"",
    strikingPower: 96,
    grappling: 74,
    conditioning: 88,
    achievements: ["Campeón Nacional Ligero 2023", "Selectivo Guayas 2022", "10-0 Amateur"],
    fightHistory: [
      { opponent: "Carlos Morán", result: "W", method: "KO Rnd 1", event: "Warrior Series 03", date: "2024-01-15" },
      { opponent: "Diego Almeida", result: "W", method: "Decisión", event: "Selectivo Guayas", date: "2023-11-05" },
    ],
  },
  {
    id: "f3",
    name: "Diego Almeida",
    nickname: "El Toro",
    photo: "/fighters/almeida.jpg",
    city: "Quito",
    province: "Pichincha",
    gym: "Guayas Warriors Elite",
    gymId: "g3",
    style: "Grappler",
    level: "Pro",
    weightClass: "Welter",
    weightLbs: 170,
    rank: 3,
    proRecord: { w: 18, l: 3, d: 0 },
    amateurRecord: { w: 12, l: 2, d: 1 },
    age: 29,
    height: "5'11\"",
    reach: "74\"",
    strikingPower: 78,
    grappling: 97,
    conditioning: 90,
    achievements: ["Campeón Welter Pichincha 2022-2023", "BJJ Black Belt", "ADCC Ecuador 2021"],
    fightHistory: [
      { opponent: "Pablo Romero", result: "W", method: "Submission", event: "Circuit EC 04", date: "2024-02-10" },
      { opponent: "Andrés Silva", result: "L", method: "Decisión", event: "Selectivo Guayas", date: "2023-11-05" },
    ],
  },
  {
    id: "f4",
    name: "Luis Caicedo",
    nickname: "El Cañón",
    photo: "/fighters/caicedo.jpg",
    city: "Guayaquil",
    province: "Guayas",
    gym: "Iron Core Syndicate",
    gymId: "g2",
    style: "Striker",
    level: "Amateur",
    weightClass: "Pesado",
    weightLbs: 205,
    rank: 1,
    proRecord: { w: 0, l: 0, d: 0 },
    amateurRecord: { w: 9, l: 1, d: 0 },
    age: 24,
    height: "6'2\"",
    reach: "78\"",
    strikingPower: 98,
    grappling: 62,
    conditioning: 82,
    achievements: ["Campeón Amateur Pesado Guayas 2024", "Deportista del Año Guayaquil 2023"],
    fightHistory: [
      { opponent: "Jhon Mora", result: "W", method: "KO Rnd 1", event: "Amateur Night 12", date: "2024-03-08" },
    ],
  },
  {
    id: "f5",
    name: "Carlos Morán",
    nickname: "El Rayo",
    photo: "/fighters/moran.jpg",
    city: "Cuenca",
    province: "Azuay",
    gym: "Azuay Fight Club",
    gymId: "g4",
    style: "Mixto",
    level: "Pro",
    weightClass: "Ligero",
    weightLbs: 155,
    rank: 4,
    proRecord: { w: 11, l: 4, d: 1 },
    amateurRecord: { w: 7, l: 2, d: 0 },
    age: 26,
    height: "5'9\"",
    reach: "70\"",
    strikingPower: 85,
    grappling: 83,
    conditioning: 87,
    achievements: ["Finalista Nacional Ligero 2023", "Campeón Regional Azuay"],
    fightHistory: [
      { opponent: "Andrés Silva", result: "L", method: "KO Rnd 1", event: "Warrior Series 03", date: "2024-01-15" },
    ],
  },
  {
    id: "f6",
    name: "Sebastián Reyes",
    nickname: "El Fantasma",
    photo: "/fighters/reyes.jpg",
    city: "Quito",
    province: "Pichincha",
    gym: "Team Oyama",
    gymId: "g1",
    style: "Grappler",
    level: "Amateur",
    weightClass: "Mediano",
    weightLbs: 185,
    rank: 2,
    proRecord: { w: 0, l: 0, d: 0 },
    amateurRecord: { w: 12, l: 0, d: 1 },
    age: 22,
    height: "6'0\"",
    reach: "75\"",
    strikingPower: 75,
    grappling: 94,
    conditioning: 91,
    achievements: ["Invicto Amateur Mediano", "Campeón Nacional Amateur 2024"],
    fightHistory: [
      { opponent: "Mateo López", result: "W", method: "Submission Rnd 2", event: "Amateur Series 08", date: "2024-03-22" },
    ],
  },
];

// ──────────────────────────────────────────────
// GYMS
// ──────────────────────────────────────────────
export const gyms: Gym[] = [
  {
    id: "g1",
    name: "Team Oyama",
    tagline: "Forjando campeones desde las bases, no fabricamos peleadores, creamos guerreros.",
    city: "Quito",
    province: "Pichincha",
    address: "Av. América N34-56, Quito",
    logo: "/gyms/oyama-logo.png",
    coverPhoto: "/gyms/oyama-cover.jpg",
    coaches: ["Mateo \"El Toro\" Cruz", "Javier Reyes"],
    totalWins: 142,
    totalLosses: 38,
    totalDraws: 7,
    koRate: 68,
    reputationScore: 9.8,
    activeFighters: 18,
    activeTitles: 4,
    fighters: ["f1", "f6"],
    rivalry: "g2",
    lat: -0.2201,
    lng: -78.5123,
  },
  {
    id: "g2",
    name: "Iron Core Syndicate",
    tagline: "Acero forja acero. No entrenamos peleadores, construimos armas de destrucción masiva para la jaula.",
    city: "Guayaquil",
    province: "Guayas",
    address: "Cdla. Kennedy Norte, Guayaquil",
    logo: "/gyms/iron-core-logo.png",
    coverPhoto: "/gyms/iron-core-cover.jpg",
    coaches: ["Roberto \"Iron\" Gómez", "Sandra Ríos"],
    totalWins: 118,
    totalLosses: 45,
    totalDraws: 3,
    koRate: 72,
    reputationScore: 9.4,
    activeFighters: 14,
    activeTitles: 2,
    fighters: ["f2", "f4"],
    rivalry: "g1",
    lat: -2.1894,
    lng: -79.8891,
  },
  {
    id: "g3",
    name: "Guayas Warriors Elite",
    tagline: "72% de efectividad. El squad que domina el sur del país.",
    city: "Guayaquil",
    province: "Guayas",
    address: "Urdesa Central, Guayaquil",
    logo: "/gyms/warriors-logo.png",
    coverPhoto: "/gyms/warriors-cover.jpg",
    coaches: ["Felipe \"Phoenix\" Andrade"],
    totalWins: 87,
    totalLosses: 31,
    totalDraws: 5,
    koRate: 54,
    reputationScore: 8.7,
    activeFighters: 10,
    activeTitles: 1,
    fighters: ["f3"],
    rivalry: "g4",
    lat: -2.2150,
    lng: -79.9010,
  },
  {
    id: "g4",
    name: "Azuay Fight Club",
    tagline: "Desde Los Andes para el mundo. Cuenca produce campeones.",
    city: "Cuenca",
    province: "Azuay",
    address: "El Ejido, Cuenca",
    logo: "/gyms/azuay-logo.png",
    coverPhoto: "/gyms/azuay-cover.jpg",
    coaches: ["Jorge \"Condor\" Vásquez"],
    totalWins: 62,
    totalLosses: 28,
    totalDraws: 4,
    koRate: 61,
    reputationScore: 8.1,
    activeFighters: 8,
    activeTitles: 1,
    fighters: ["f5"],
    rivalry: "g3",
    lat: -2.9006,
    lng: -79.0045,
  },
];

// ──────────────────────────────────────────────
// CHALLENGES
// ──────────────────────────────────────────────
export const challenges: Challenge[] = [
  {
    id: "c1",
    fromFighterId: "f2",
    fromGymId: "g2",
    toFighterId: "f3",
    toGymId: "g3",
    status: "pending",
    weightClass: "Ligero",
    message: "Ya no hay excusas. Acepta el reto, \"El Toro\".",
    createdAt: "2026-04-20T14:30:00Z",
  },
  {
    id: "c2",
    fromFighterId: "f4",
    fromGymId: "g2",
    toFighterId: "f6",
    toGymId: "g1",
    status: "accepted",
    weightClass: "Pesado",
    proposedDate: "2026-05-15",
    proposedVenue: "Coliseo Voltaire Paladines, Guayaquil",
    message: "Iron Core vs Team Oyama. Que empiece.",
    createdAt: "2026-04-18T09:00:00Z",
  },
  {
    id: "c3",
    fromFighterId: "f5",
    fromGymId: "g4",
    toFighterId: "f2",
    toGymId: "g2",
    status: "rejected",
    weightClass: "Ligero",
    message: "Cuenca viene a cobrarse la revancha.",
    createdAt: "2026-04-15T11:20:00Z",
  },
  {
    id: "c4",
    fromFighterId: "f6",
    fromGymId: "g1",
    toFighterId: "f4",
    toGymId: "g2",
    status: "scheduled",
    weightClass: "Mediano",
    proposedDate: "2026-05-28",
    proposedVenue: "Arena Quito, Pichincha",
    message: "Selectivo nacional. El Fantasy le enseña al Cañón a caer.",
    createdAt: "2026-04-10T16:00:00Z",
  },
];

// ──────────────────────────────────────────────
// EVENTS
// ──────────────────────────────────────────────
export const events: Event[] = [
  {
    id: "e1",
    name: "Warrior Series 05",
    date: "2026-04-28",
    venue: "Coliseo Voltaire Paladines",
    city: "Guayaquil",
    province: "Guayas",
    type: "Nacional",
    status: "upcoming",
    mainEvent: "Vera vs Silva II",
    fights: [
      { fighter1: "Andrés Silva", fighter2: "Carlos Morán", weightClass: "Ligero" },
      { fighter1: "Luis Caicedo", fighter2: "Jhon Mora", weightClass: "Pesado" },
      { fighter1: "Sebastián Reyes", fighter2: "Mateo López", weightClass: "Mediano" },
    ],
  },
  {
    id: "e2",
    name: "Selectivo Nacional MMA 2026",
    date: "2026-05-15",
    venue: "Arena Quito",
    city: "Quito",
    province: "Pichincha",
    type: "Selectivo",
    status: "upcoming",
    mainEvent: "Clasificatorio Top 5 Nacional",
    fights: [
      { fighter1: "Diego Almeida", fighter2: "Pablo Romero", weightClass: "Welter" },
      { fighter1: "Luis Caicedo", fighter2: "Sebastián Reyes", weightClass: "Pesado" },
    ],
  },
  {
    id: "e3",
    name: "Circuit EC 04",
    date: "2026-02-10",
    venue: "Coliseo Mayor Rumiñahui",
    city: "Quito",
    province: "Pichincha",
    type: "Regional",
    status: "completed",
    mainEvent: "Almeida vs Romero",
    fights: [
      {
        fighter1: "Diego Almeida",
        fighter2: "Pablo Romero",
        weightClass: "Welter",
        result: { winner: "Diego Almeida", method: "Submission Rnd 2" },
      },
    ],
  },
  {
    id: "e4",
    name: "Copa Guayas MMA",
    date: "2026-06-21",
    venue: "Centro de Convenciones Simón Bolívar",
    city: "Guayaquil",
    province: "Guayas",
    type: "Regional",
    status: "upcoming",
    fights: [],
  },
];

// Helpers
export const getFighterById = (id: string) => fighters.find((f) => f.id === id);
export const getGymById = (id: string) => gyms.find((g) => g.id === id);
export const getFightersByGym = (gymId: string) => fighters.filter((f) => f.gymId === gymId);
export const getChallengesByFighter = (fighterId: string) =>
  challenges.filter((c) => c.fromFighterId === fighterId || c.toFighterId === fighterId);

// ──────────────────────────────────────────────
// PROVINCIAL LEAGUES
// ──────────────────────────────────────────────
export interface ProvinceLeague {
  id: string;
  name: string;
  province: Province;
  shortName: string;
  icon: string;          // emoji icon
  color: string;         // CSS gradient
  activeFighters: number;
  gyms: number;
  nextEvent?: string;
  champion?: string;
}

export const provincialLeagues: ProvinceLeague[] = [
  {
    id: "l1",
    name: "Guayas Combate",
    province: "Guayas",
    shortName: "GUAYAS",
    icon: "🌊",
    color: "linear-gradient(135deg, #1a3a6b, #0d2040)",
    activeFighters: 48,
    gyms: 12,
    nextEvent: "2026-04-28",
    champion: "Andrés Silva",
  },
  {
    id: "l2",
    name: "Pichincha Elite",
    province: "Pichincha",
    shortName: "PICHINCHA",
    icon: "⛰️",
    color: "linear-gradient(135deg, #2d1a6b, #180d40)",
    activeFighters: 54,
    gyms: 15,
    nextEvent: "2026-05-15",
    champion: "Diego Almeida",
  },
  {
    id: "l3",
    name: "Azuay Fighters",
    province: "Azuay",
    shortName: "AZUAY",
    icon: "🏔️",
    color: "linear-gradient(135deg, #1a4a2e, #0d2718)",
    activeFighters: 22,
    gyms: 6,
    nextEvent: "2026-05-20",
    champion: "Carlos Morán",
  },
  {
    id: "l4",
    name: "Manabí Combat",
    province: "Manabí",
    shortName: "MANABÍ",
    icon: "🥊",
    color: "linear-gradient(135deg, #6b1a1a, #400d0d)",
    activeFighters: 31,
    gyms: 8,
    champion: "Marlon Vera",
  },
  {
    id: "l5",
    name: "El Oro MMA",
    province: "El Oro",
    shortName: "EL ORO",
    icon: "⭐",
    color: "linear-gradient(135deg, #5a4a00, #2d2500)",
    activeFighters: 18,
    gyms: 5,
  },
  {
    id: "l6",
    name: "Tungurahua Fight",
    province: "Tungurahua",
    shortName: "TUNGUR.",
    icon: "🌋",
    color: "linear-gradient(135deg, #4a1a00, #250d00)",
    activeFighters: 14,
    gyms: 4,
  },
];
