import {
  LOLContinentRegion,
  LOLContinentRegionEnum,
  LOLQueueIdEnum,
  LOLRegion,
  LOLRegionEnum,
  SummonerSpellName,
} from '../../modules/lol/interfaces';

export const regionToContinentRegionMap: Record<LOLRegion, LOLContinentRegion> =
  {
    [LOLRegionEnum.BR1]: LOLContinentRegionEnum.AMERICAS,
    [LOLRegionEnum.LA1]: LOLContinentRegionEnum.AMERICAS,
    [LOLRegionEnum.LA2]: LOLContinentRegionEnum.AMERICAS,
    [LOLRegionEnum.NA1]: LOLContinentRegionEnum.AMERICAS,
    [LOLRegionEnum.EUN1]: LOLContinentRegionEnum.EUROPE,
    [LOLRegionEnum.EUW1]: LOLContinentRegionEnum.EUROPE,
    [LOLRegionEnum.RU]: LOLContinentRegionEnum.EUROPE,
    [LOLRegionEnum.TR1]: LOLContinentRegionEnum.EUROPE,
    [LOLRegionEnum.KR]: LOLContinentRegionEnum.ASIA,
    [LOLRegionEnum.JP1]: LOLContinentRegionEnum.ASIA,
    [LOLRegionEnum.OC1]: LOLContinentRegionEnum.SEA,
    [LOLRegionEnum.PH2]: LOLContinentRegionEnum.SEA,
    [LOLRegionEnum.SG2]: LOLContinentRegionEnum.SEA,
    [LOLRegionEnum.TH2]: LOLContinentRegionEnum.SEA,
    [LOLRegionEnum.TW2]: LOLContinentRegionEnum.SEA,
    [LOLRegionEnum.VN2]: LOLContinentRegionEnum.SEA,
  };

export const queueIdToQueueTypeMap: Record<number, LOLQueueIdEnum> = {
  420: LOLQueueIdEnum.RANKED_SOLO_5x5,
  440: LOLQueueIdEnum.RANKED_FLEX_SR,
  430: LOLQueueIdEnum.NORMAL_BLIND_PICK,
  400: LOLQueueIdEnum.NORMAL_DRAFT_PICK,
  450: LOLQueueIdEnum.ARAM,
  0: LOLQueueIdEnum.ALL,
};

export const queueTypeToQueueIdMap: Record<LOLQueueIdEnum, number> = {
  [LOLQueueIdEnum.RANKED_SOLO_5x5]: 420,
  [LOLQueueIdEnum.RANKED_FLEX_SR]: 440,
  [LOLQueueIdEnum.NORMAL_BLIND_PICK]: 430,
  [LOLQueueIdEnum.NORMAL_DRAFT_PICK]: 400,
  [LOLQueueIdEnum.ARAM]: 450,
  [LOLQueueIdEnum.ALL]: 0,
};

export const summonerSpellIdToSummonerNameMap: Record<
  number,
  SummonerSpellName
> = {
  21: SummonerSpellName.Barrier,
  1: SummonerSpellName.Cleanse,
  3: SummonerSpellName.Exhaust,
  4: SummonerSpellName.Flash,
  6: SummonerSpellName.Ghost,
  7: SummonerSpellName.Heal,
  14: SummonerSpellName.Ignite,
  11: SummonerSpellName.Smite,
  12: SummonerSpellName.Teleport,
  31: SummonerSpellName.PoroToss,
  32: SummonerSpellName.Mark,
  13: SummonerSpellName.Unknown,
};
