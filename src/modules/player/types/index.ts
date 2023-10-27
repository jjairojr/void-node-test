import { LOLQueueName, LOLRegion } from '../../lol/interfaces';

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
