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
    const region = 'br1';
    const name = 'brtt';

    const result = await controller.findByRegionAndName(region, name);

    expect(result).toEqual({
      name: 'brTT',
      image: `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/28.png`,
    });
  });
});
