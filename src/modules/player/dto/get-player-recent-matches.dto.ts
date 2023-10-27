import { LOLQueueId, LOLRegion } from '../../lol/interfaces';

export type GetPlayerRecentMatchesDTO = {
  region: LOLRegion;

  summonerName: string;

  queueId: LOLQueueId;

  page: number;

  limit: number;
};
