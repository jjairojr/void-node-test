import { Test, TestingModule } from '@nestjs/testing';
import { LolController } from './lol.controller';
import { LolService } from './lol.service';

describe('LolController', () => {
  let controller: LolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LolController],
      providers: [LolService],
    }).compile();

    controller = module.get<LolController>(LolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
