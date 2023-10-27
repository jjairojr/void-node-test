import { Test, TestingModule } from '@nestjs/testing';
import { LolController } from './lol.controller';
import { LolService } from './lol.service';
import { QueueEntity } from '../queue/entities/queue.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('LolController', () => {
  let lolController: LolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LolService,
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
        {
          provide: getRepositoryToken(QueueEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: '76a86d69-126b-4ead-9eea-e6f0ded16b43',
                type: 'RANKED_FLEX_SR',
                leaguePoints: 0,
                winRate: '0.44',
                wins: 4,
                losses: 5,
                playerId: '2247a76b-776b-4559-82ec-7f6d92a49d17',
                createdAt: '2023-10-27T18:15:04.247Z',
                updatedAt: ' 2023-10-27T18:15:04.247Z',
                deletedAt: null,
                player: {
                  id: '2247a76b-776b-4559-82ec-7f6d92a49d17',
                  summonerName: 'im Jonaas',
                  accountId: 'gmw4r-lrfKfCgbYvO0Yrwi5xLlX-KRcgE0_wURCdF5feLS8',
                  region: 'BR1',
                  deletedAt: null,
                },
              },
            ]),
          },
        },
      ],
      controllers: [LolController],
    }).compile();

    lolController = module.get<LolController>(LolController);
  });

  it('should be defined', () => {
    expect(lolController).toBeDefined();
  });

  it('should be able to get the region leaderboard', async () => {
    const result = await lolController.getLeaderboard('BR1');

    expect(result).toEqual({
      RANKED_FLEX_SR: {
        players: [
          {
            leaguePoints: 0,
            leaguePointsRank: 1,
            region: 'BR1',
            summonerName: 'im Jonaas',
            winRate: '0.44',
            winRateRank: 1,
          },
        ],
      },
    });
  });

  it('should be able to get summoner rank on leaderboard', async () => {
    const result = await lolController.getLeaderboardBySummonerName(
      'im Jonaas',
      'BR1',
    );

    expect(result).toEqual([
      [
        {
          leaguePoints: 0,
          leaguePointsRank: 1,
          region: 'BR1',
          summonerName: 'im Jonaas',
          winRate: '0.44',
          winRateRank: 1,
        },
      ],
    ]);
  });
});
