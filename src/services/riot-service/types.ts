import {
  LOLQueueId,
  LOLQueueName,
  LOLRegion,
} from '../../modules/lol/interfaces';

export type GetPlayerResponse = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type GetPlayerRankDTO = {
  id: string;
  region: LOLRegion;
};

export type GetPlayerRankResponse = {
  leagueId: string;
  queueType: LOLQueueName;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}[];

export type GetMatchesByPlayerIdDTO = {
  puuid: string;
  region: LOLRegion;
  startIndex: number;
  limit: number;
  queueId: LOLQueueId;
};

export type GetMatchesByPlayerIdResponse = Array<string>;

export type GetMatchDetailsByMatchIdDTO = {
  matchId: string;
  region: LOLRegion;
};

export type GetMatchDetailsByMatchIdResponse = {
  info: {
    gameCreation: number;
    gameDuration: number;
    gameEndTimestamp: number;
    gameId: number;
    gameMode: string;
    gameName: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: {
      summonerName: string;

      perks: unknown;
      summoner1Id: number;
      summoner2Id: number;
      championName: string;
      puuid: string;
      kills: number;
      deaths: number;
      assists: number;
      totalMinionsKilled: number;
      challenges: {
        visionScorePerMinute: number;
      };
    }[];
    platformId: string;
    queueId: number;
    teams: unknown[][];
    tournamentCode: string;
  };
};

export type GetPlayerSummaryDTO = {
  region: LOLRegion;

  summonerName: string;

  queueId: LOLQueueId;
};
