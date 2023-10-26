import { LOLQueueName } from 'src/modules/player/types';
import { PlayerEntity } from '../../player/entities/player.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'queue' })
export class QueueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: LOLQueueName; // "normal", "ranked", "flex", etc.

  @Column()
  leaguePoints: number;

  @Column()
  winRate: number;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @ManyToOne((type) => PlayerEntity, (player) => player.queues)
  player: PlayerEntity;
}
