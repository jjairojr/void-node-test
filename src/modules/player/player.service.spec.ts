import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { LOLQueueId } from './types';

describe('PlayerService', () => {
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerService],
    }).compile();

    playerService = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(playerService).toBeDefined();
  });

  it('should call the Riot service with the correct parameters', async () => {
    const result = await playerService.getPlayerSummary({
      region: 'BR1',
      summonerName: 'cachocoudet',
      queueId: 420,
    });

    expect(result).toEqual([
      {
        KDA: 1,
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

  it('should call the Riot service with the correct parameters but with dont existed queueId', async () => {
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
});
