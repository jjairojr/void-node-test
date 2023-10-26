import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LOLRegion } from '../types';
import { QueueEntity } from '../../queue/entities/queue.entity';

@Entity({ name: 'players' })
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  summonerName: string;

  @Column()
  accountId: string;

  @Column()
  region: LOLRegion;

  @OneToMany((type) => QueueEntity, (queue) => queue.player)
  queues: QueueEntity[];
}
