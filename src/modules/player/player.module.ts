import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './entities/player.entity';
import { QueueEntity } from '../queue/queue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity, QueueEntity])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
