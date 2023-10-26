import { Module } from '@nestjs/common';
import { LolService } from './lol.service';
import { LolController } from './lol.controller';

@Module({
  controllers: [LolController],
  providers: [LolService],
})
export class LolModule {}
