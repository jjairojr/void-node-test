import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';

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
      queueId: 450,
    });

    expect(result).toEqual({
      name: 'brTT',
      image: `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/28.png`,
    });
  });
});
