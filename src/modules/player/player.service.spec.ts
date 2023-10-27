import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { Repository } from 'typeorm';
import { LOLQueueId } from '../lol/interfaces';
import { QueueEntity } from '../queue/entities/queue.entity';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';

describe('PlayerService', () => {
  let playerService: PlayerService;
  let playerRepository: Repository<PlayerEntity>;
  let queueRepository: Repository<QueueEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
        {
          provide: getRepositoryToken(PlayerEntity),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(QueueEntity),
          useValue: {},
        },
      ],
    }).compile();

    playerService = module.get<PlayerService>(PlayerService);
    playerRepository = module.get<Repository<PlayerEntity>>(
      getRepositoryToken(PlayerEntity),
    );
    queueRepository = module.get<Repository<QueueEntity>>(
      getRepositoryToken(QueueEntity),
    );
  });

  it('should be defined', () => {
    expect(playerService).toBeDefined();
    expect(playerRepository).toBeDefined();
    expect(queueRepository).toBeDefined();
  });

  it('should be able to get player summary', async () => {
    const result = await playerService.getPlayerSummary({
      region: 'BR1',
      summonerName: 'cachocoudet',
      queueId: 420,
    });

    expect(result).toEqual([
      {
        KDA: 1,
        region: 'BR1',
        summonerName: 'CACHOCOUDET',
        accountId: 'vB2nsAKqpKjLu7Y8Y0zhinr2SbpWKjJo6Xw1sSD-ztM',
        avgCSPerMinute: 7.779578606158833,
        avgVisionScore: 1.2,
        leaguePoints: 147,
        losses: 173,
        queueType: 'RANKED_SOLO_5x5',
        rank: {
          image: 'http://localhost:3000/lol/tier/master/image',
          name: 'MASTER',
        },
        wins: 187,
      },
    ]);
  });

  it('should NOT be able to get player summary with wrong queueId', async () => {
    try {
      await playerService.getPlayerSummary({
        region: 'BR1',
        summonerName: 'cachocoudet',
        queueId: 123 as LOLQueueId,
      });

      throw new Error('Should not reach this point');
    } catch (error) {
      expect(error.message).toEqual(
        'These player do not have games in this queueType',
      );
    }
  });

  it('should be able to get player recent matches ', async () => {
    const result = await playerService.getPlayerRecentMatches({
      region: 'BR1',
      summonerName: 'cachocoudet',
      queueId: 420,
      page: 1,
      limit: 10,
    });

    expect(result).toEqual([
      {
        summoners: ['Flash', 'Ignite'],
        gameDuration: 1234,
        champion: 'Ahri',
        kills: 2,
        csPerMinute: 7.779578606158833,
        deaths: 3,
        assists: 1,
        KDA: 1,
      },
      {
        summoners: ['Flash', 'Ignite'],
        gameDuration: 1234,
        champion: 'Ahri',
        kills: 2,
        csPerMinute: 7.779578606158833,
        deaths: 3,
        assists: 1,
        KDA: 1,
      },
    ]);
  });
});
