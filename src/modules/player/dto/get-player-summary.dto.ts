import { LOLQueueId, LOLRegion } from '../types';

export type GetPlayerSummaryDTO = {
  region: LOLRegion;

  summonerName: string;

  queueId: LOLQueueId;
};
