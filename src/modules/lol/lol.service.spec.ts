import { Test, TestingModule } from '@nestjs/testing';
import { LolService } from './lol.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntity } from '../queue/entities/queue.entity';

describe('LolService', () => {
  let lolService: LolService;
  let queueRepository: Repository<QueueEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LolService,
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
    }).compile();

    lolService = module.get<LolService>(LolService);
    queueRepository = module.get<Repository<QueueEntity>>(
      getRepositoryToken(QueueEntity),
    );
  });

  it('should be defined', () => {
    expect(lolService).toBeDefined();
    expect(queueRepository).toBeDefined();
  });

  it('should be able to get the region leaderboard', async () => {
    const result = await lolService.getLeaderboard({
      region: 'BR1',
    });

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
    const result = await lolService.getLeaderboardBySummonerName({
      summonerName: 'im Jonaas',
      region: 'BR1',
    });

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
