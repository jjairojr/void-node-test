import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/player/player.module';

@Module({
  imports: [PlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
