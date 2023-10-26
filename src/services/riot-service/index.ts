import { getApi } from '../api';
import {
  GetMatchDetailsByMatchIdDTO,
  GetMatchDetailsByMatchIdResponse,
  GetMatchesByPlayerIdDTO,
  GetMatchesByPlayerIdResponse,
  GetPlayerRankDTO,
  GetPlayerRankResponse,
  GetPlayerResponse,
  GetPlayerSummaryDTO,
} from './types';
import { regionToContinentRegionMap } from './constants';

class RiotService {
  async getPlayer({
    region,
    summonerName,
  }: Pick<GetPlayerSummaryDTO, 'region' | 'summonerName'>) {
    return await getApi(region).get<GetPlayerResponse>(
      `/summoner/v4/summoners/by-name/${summonerName}`,
    );
  }

  async getPlayerRank({ id, region }: GetPlayerRankDTO) {
    return getApi(region).get<GetPlayerRankResponse>(
      `/league/v4/entries/by-summoner/${id}`,
    );
  }

  async getMatchesByPlayerId({
    puuid,
    region,
    startIndex = 0,
    limit = 20,
    queueId,
  }: GetMatchesByPlayerIdDTO) {
    const queryQueueId = queueId ? `&queue=${queueId}` : '';
    return getApi(
      regionToContinentRegionMap[region],
    ).get<GetMatchesByPlayerIdResponse>(
      `/match/v5/matches/by-puuid/${puuid}/ids?start=${startIndex}&count=${limit}${queryQueueId}`,
    );
  }

  async getMatchDetailsByMatchId({
    matchId,
    region,
  }: GetMatchDetailsByMatchIdDTO) {
    return getApi(
      regionToContinentRegionMap[region],
    ).get<GetMatchDetailsByMatchIdResponse>(`/match/v5/matches/${matchId}`);
  }
}

export { RiotService };
