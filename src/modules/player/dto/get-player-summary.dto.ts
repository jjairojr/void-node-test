import { LOLQueueId, LOLRegion } from '../../lol/interfaces';

export type GetPlayerSummaryDTO = {
  region: LOLRegion;

  summonerName: string;

  queueId: LOLQueueId;
};
