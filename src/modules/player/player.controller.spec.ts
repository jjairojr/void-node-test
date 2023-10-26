import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';

describe('PlayerController', () => {
  let controller: PlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [PlayerService],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the PlayerService with the correct parameters', async () => {
    const result = await controller.getPlayerSummary('BR1', 'cachocoudet', 420);

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
});
