import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/player/player.module';
import { LolModule } from './modules/lol/lol.module';

@Module({
  imports: [PlayerModule, LolModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
