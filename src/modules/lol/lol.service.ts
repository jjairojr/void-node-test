import { Inject, Injectable } from '@nestjs/common';
import {
  GetLeaderBoardByRegionDTO,
  GetLeaderBoardBySummonerNameDTO,
  TLeaderboardByQueueType,
} from './dto/get-leaderboard-by-summoner-name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntity } from '../queue/entities/queue.entity';
import { LOLRegion } from './interfaces';

@Injectable()
export class LolService {
  constructor(
    @InjectRepository(QueueEntity)
    private readonly queueRepository: Repository<QueueEntity>,
  ) {}

  async getLeaderboardBySummonerName({
    region,
    summonerName,
  }: GetLeaderBoardBySummonerNameDTO) {
    const leaderBoardByQueueType: Record<string, TLeaderboardByQueueType> = {};

    const queues = await this.queueRepository.find({
      where: { player: { region } },
      relations: ['player'],
    });

    queues.forEach((queue) => {
      if (!leaderBoardByQueueType[queue.type]) {
        leaderBoardByQueueType[queue.type] = {
          players: [],
        };
      }

      leaderBoardByQueueType[queue.type].players.push({
        winRate: queue.winRate,
        leaguePoints: queue.leaguePoints,
        summonerName: queue.player.summonerName,
        region: queue.player.region,
      });
    });

    this.orderPlayersAndAddRanking({ leaderBoardByQueueType, region });

    const player = Object.keys(leaderBoardByQueueType).map((key) => {
      return leaderBoardByQueueType[key].players.filter(
        (player) => player.summonerName === summonerName,
      );
    });

    return player;
  }

  async getLeaderboard({ region }: GetLeaderBoardByRegionDTO) {
    const leaderBoardByQueueType: Record<string, TLeaderboardByQueueType> = {};

    const queues = await this.queueRepository.find({
      where: { player: { region } },
      relations: ['player'],
    });

    queues.forEach((queue) => {
      if (!leaderBoardByQueueType[queue.type]) {
        leaderBoardByQueueType[queue.type] = {
          players: [],
        };
      }

      leaderBoardByQueueType[queue.type].players.push({
        winRate: queue.winRate,
        leaguePoints: queue.leaguePoints,
        summonerName: queue.player.summonerName,
        region: queue.player.region,
      });
    });

    this.orderPlayersAndAddRanking({ leaderBoardByQueueType, region });

    return leaderBoardByQueueType;
  }

  private orderPlayersAndAddRanking({
    leaderBoardByQueueType,
    region,
  }: {
    leaderBoardByQueueType: Record<string, TLeaderboardByQueueType>;
    region: LOLRegion;
  }) {
    Object.keys(leaderBoardByQueueType).map((key) => {
      const regionPlayers = leaderBoardByQueueType[key].players.filter(
        (player) => player.region === region,
      );

      let sortedPlayers = regionPlayers.sort((a, b) => {
        if (a.leaguePoints > b.leaguePoints) return -1;
        if (a.leaguePoints < b.leaguePoints) return 1;
        return 0;
      });

      sortedPlayers.forEach((player, index) => {
        player.leaguePointsRank = index + 1;

        leaderBoardByQueueType[key].players.forEach((player, index) => {
          if (player.summonerName === player.summonerName) {
            leaderBoardByQueueType[key].players[index] = player;
          }
        });
      });

      sortedPlayers = sortedPlayers.sort((a, b) => {
        if (a.winRate > b.winRate) return -1;
        if (a.winRate < b.winRate) return 1;
        return 0;
      });

      sortedPlayers.forEach((player, index) => {
        player.winRateRank = index + 1;
        leaderBoardByQueueType[key].players.forEach((player, index) => {
          if (player.summonerName === player.summonerName) {
            leaderBoardByQueueType[key].players[index] = player;
          }
        });
      });

      return sortedPlayers;
    });
  }
}
