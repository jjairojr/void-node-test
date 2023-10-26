import { HttpException, Injectable } from '@nestjs/common';
import { RiotService } from '../../services/riot-service';
import { LOLRegion } from './types';
import { GetMatchesByPlayerIdResponse } from '../../services/riot-service/types';
import { GetPlayerSummaryDTO } from './dto/get-player-summary.dto';
import { GetPlayerRecentMatchesDTO } from './dto/get-player-recent-matches.dto';
import {
  queueIdToQueueTypeMap,
  queueTypeToQueueIdMap,
  summonerSpellIdToSummonerNameMap,
} from '../../services/riot-service/constants';

import { env } from '../../env';

@Injectable()
export class PlayerService {
  async getPlayerRecentMatches({
    region,
    summonerName,
    queueId,
    page,
    limit,
  }: GetPlayerRecentMatchesDTO) {
    const riotService = new RiotService();

    const { data: player } = await riotService.getPlayer({
      region,
      summonerName,
    });

    const startIndex = (page - 1) * limit;

    const { data: matches } = await riotService.getMatchesByPlayerId({
      startIndex,
      limit,
      puuid: player.puuid,
      region,
      queueId,
    });

    const { matchesDetails } = await this.getMatchesPlayerDetails({
      summonerPuuid: player.puuid,
      riotService,
      region,
      matches,
    });

    return matchesDetails;
  }

  async getPlayerSummary({
    region,
    summonerName,
    queueId,
  }: GetPlayerSummaryDTO) {
    const riotService = new RiotService();

    const { data: player } = await riotService.getPlayer({
      region,
      summonerName,
    });

    const { data: playersInfo } = await riotService.getPlayerRank({
      id: player.id,
      region,
    });

    const { data: matches } = await riotService.getMatchesByPlayerId({
      startIndex: 0,
      limit: 20,
      puuid: player.puuid,
      region,
      queueId,
    });

    const { averagesByQueueId } = await this.getMatchesPlayerDetails({
      summonerPuuid: player.puuid,
      riotService,
      region,
      matches,
    });

    const playerFilteredByQueueType = queueId
      ? playersInfo.filter((player) => {
          return player.queueType === queueIdToQueueTypeMap[queueId];
        })
      : playersInfo;

    if (!playerFilteredByQueueType.length) {
      throw new HttpException(
        'These player do not have games in this queueType',
        404,
      );
    }

    return playerFilteredByQueueType.map((player) => {
      return {
        rank: {
          name: player.tier,
          image: env.APP_URL + `/lol/tier/${player.tier.toLowerCase()}/image`,
        },
        queueType: player.queueType,
        leaguePoints: player.leaguePoints,
        wins: player.wins,
        losses: player.losses,
        KDA: averagesByQueueId[queueTypeToQueueIdMap[player.queueType]]?.avgKDA,
        avgVisionScore:
          averagesByQueueId[queueTypeToQueueIdMap[player.queueType]]
            ?.avgVisionScore,
        avgCSPerMinute:
          averagesByQueueId[queueTypeToQueueIdMap[player.queueType]]
            ?.avgCSPerMinute,
      };
    });
  }

  private async getMatchesPlayerDetails({
    summonerPuuid,
    region,
    matches,
    riotService,
  }: {
    summonerPuuid: string;
    region: LOLRegion;
    matches: GetMatchesByPlayerIdResponse;
    riotService: RiotService;
  }) {
    const queueIdStatistics: Record<
      number,
      {
        totalKills: number;
        totalDeaths: number;
        totalAssists: number;
        totalCSPerMinute: number;
        totalVisionScore: number;
        matchCount: number;
      }
    > = {};

    const matchesDetails = await Promise.all(
      matches.map(async (matchId) => {
        const { data: matchDetails } =
          await riotService.getMatchDetailsByMatchId({ region, matchId });

        const matchInfo = matchDetails.info;
        const totalMinutes = matchInfo.gameDuration / 60;
        const matchParticipants = matchInfo.participants;

        const summonerMatchInfo = matchParticipants.find(
          (participant) => participant.puuid === summonerPuuid,
        );

        const queueId = matchInfo.queueId;

        if (!queueIdStatistics[queueId]) {
          queueIdStatistics[queueId] = {
            totalKills: 0,
            totalDeaths: 0,
            totalAssists: 0,
            totalCSPerMinute: 0,
            totalVisionScore: 0,
            matchCount: 0,
          };
        }

        const csPerMinute = summonerMatchInfo.totalMinionsKilled / totalMinutes;

        queueIdStatistics[queueId].totalKills += summonerMatchInfo.kills;
        queueIdStatistics[queueId].totalDeaths += summonerMatchInfo.deaths;
        queueIdStatistics[queueId].totalAssists += summonerMatchInfo.assists;
        queueIdStatistics[queueId].totalCSPerMinute += csPerMinute;
        queueIdStatistics[queueId].totalVisionScore +=
          summonerMatchInfo.challenges?.visionScorePerMinute;
        queueIdStatistics[queueId].matchCount++;

        return {
          summoners: [
            summonerSpellIdToSummonerNameMap[summonerMatchInfo.summoner1Id],
            summonerSpellIdToSummonerNameMap[summonerMatchInfo.summoner2Id],
          ],
          gameDuration: matchInfo.gameDuration,
          champion: summonerMatchInfo.championName,
          kills: summonerMatchInfo.kills,
          csPerMinute,
          deaths: summonerMatchInfo.deaths,
          assists: summonerMatchInfo.assists,
          KDA:
            (summonerMatchInfo.kills + summonerMatchInfo.assists) /
            summonerMatchInfo.deaths,
        };
      }),
    );

    const averagesByQueueId: Record<
      number,
      {
        avgKDA: number;
        avgCSPerMinute: number;
        avgVisionScore: number;
      }
    > = {};

    for (const queueId in queueIdStatistics) {
      const stats = queueIdStatistics[queueId];
      averagesByQueueId[queueId] = {
        avgKDA: (stats.totalKills + stats.totalAssists) / stats.totalDeaths,
        avgCSPerMinute: stats.totalCSPerMinute / stats.matchCount,
        avgVisionScore: stats.totalVisionScore / stats.matchCount,
      };
    }

    return {
      averagesByQueueId,
      matchesDetails,
    };
  }
}
