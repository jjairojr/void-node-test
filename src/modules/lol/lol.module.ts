import { Module } from '@nestjs/common';
import { LolService } from './lol.service';
import { LolController } from './lol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueEntity } from '../queue/queue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueueEntity])],
  controllers: [LolController],
  providers: [LolService],
})
export class LolModule {}
