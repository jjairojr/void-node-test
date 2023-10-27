import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { PlayerEntity } from './entities/player.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LOLQueueId } from '../lol/interfaces';
import { QueueEntity } from '../queue/entities/queue.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('PlayerController', () => {
  let controller: PlayerController;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },

        PlayerService,
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
    controller = module.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(playerService).toBeDefined();
  });

  it('should call the PlayerService and get player summary with the correct parameters', async () => {
    const result = await controller.getPlayerSummary('BR1', 'cachocoudet', 420);

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

  it('should call the PlayerService with the correct parameters', async () => {
    try {
      await controller.getPlayerSummary(
        'BR1',
        'cachocoudet',
        123 as LOLQueueId,
      );

      throw new Error('Should not reach this point');
    } catch (error) {
      expect(error.message).toEqual(
        'These player do not have games in this queueType',
      );
    }
  });

  it('should be able to get player recent matches ', async () => {
    const result = await controller.getPlayerRecentMatches(
      'BR1',
      'cachocoudet',
      420,
      '1',
      '20',
    );

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
