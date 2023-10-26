import { LOLQueueId, LOLRegion } from '../types';

export type GetPlayerRecentMatchesDTO = {
  region: LOLRegion;

  summonerName: string;

  queueId: LOLQueueId;

  page: number;

  limit: number;
};
