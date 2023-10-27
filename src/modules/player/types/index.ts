export enum LOLRegionEnum {
  BR1 = 'BR1',
  LA1 = 'LA1',
  LA2 = 'LA2',
  NA1 = 'NA1',
  EUN1 = 'EUN1',
  EUW1 = 'EUW1',
  RU = 'RU',
  TR1 = 'TR1',
  KR = 'KR',
  JP1 = 'JP1',
  OC1 = 'OC1',
  PH2 = 'PH2',
  SG2 = 'SG2',
  TH2 = 'TH2',
  TW2 = 'TW2',
  VN2 = 'VN2',
}

export enum LOLContinentRegionEnum {
  AMERICAS = 'AMERICAS',
  EUROPE = 'EUROPE',
  ASIA = 'ASIA',
  SEA = 'SEA',
  Unknown = 'Unknown',
}

export enum LOLQueueIdEnum {
  RANKED_SOLO_5x5 = 'RANKED_SOLO_5x5',
  RANKED_FLEX_SR = 'RANKED_FLEX_SR',
  NORMAL_BLIND_PICK = 'NORMAL_BLIND_PICK',
  NORMAL_DRAFT_PICK = 'NORMAL_DRAFT_PICK',
  ARAM = 'ARAM',
  ALL = 'ALL',
}

export type LOLQueueName = keyof typeof LOLQueueIdEnum;

export type LOLRegion = keyof typeof LOLRegionEnum;

export type LOLContinentRegion = keyof typeof LOLContinentRegionEnum;

export type LOLQueueId = 420 | 440 | 430 | 400 | 450 | 0;

export enum SummonerSpellName {
  Barrier = 'Barrier',
  Cleanse = 'Cleanse',
  Exhaust = 'Exhaust',
  Flash = 'Flash',
  Ghost = 'Ghost',
  Heal = 'Heal',
  Ignite = 'Ignite',
  Smite = 'Smite',
  Teleport = 'Teleport',
  Unknown = 'Unknown',
  PoroToss = 'PoroToss',
  Mark = 'Mark',
}

export type TFormattedPlayer = {
  region: LOLRegion;
  accountId: string;
  summonerName: string;
  rank: {
    name: string;
    image: string;
  };
  queueType: LOLQueueName;
  leaguePoints: number;
  wins: number;
  losses: number;
  KDA: number;
  avgVisionScore: number;
  avgCSPerMinute: number;
}[];
