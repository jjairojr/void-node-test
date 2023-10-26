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
    const region = 'br1';
    const name = 'brtt';

    const result = await playerService.findByRegionAndName({ region, name });

    expect(result).toEqual({
      name: 'brTT',
      image: `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/28.png`,
    });
  });
});
