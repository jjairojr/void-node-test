import { LOLQueueName } from '../../lol/interfaces';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PlayerEntity } from '../../player/entities/player.entity';

@Entity({ name: 'queues' })
export class QueueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  type: LOLQueueName;

  @Column({ name: 'league_points' })
  leaguePoints: number;

  @Column({ type: 'decimal', name: 'win_rate', precision: 5, scale: 2 })
  winRate: number;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @Column({ name: 'player_id' })
  playerId: string;

  @ManyToOne(() => PlayerEntity, (player) => player.queues)
  @JoinColumn({
    name: 'player_id',
    referencedColumnName: 'id',
  })
  player: PlayerEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
