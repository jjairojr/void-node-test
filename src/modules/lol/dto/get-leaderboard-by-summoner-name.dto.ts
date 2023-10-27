import { LOLRegion } from '../../player/types';

export type GetLeaderBoardBySummonerNameDTO = {
  summonerName: string;
  region: LOLRegion;
};

export type GetLeaderBoardByRegionDTO = {
  region: LOLRegion;
};

export type TLeaderboardByQueueType = {
  players: Array<{
    winRate: number;
    leaguePoints: number;
    summonerName: string;
    region: string;
    winRateRank?: number;
    leaguePointsRank?: number;
  }>;
};
