import { LOLQueueName } from 'src/modules/player/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { PlayerEntity } from '../player/entities/player.entity';

@Entity({ name: 'queues' })
export class QueueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: LOLQueueName;

  @Column({ name: 'league_points' })
  leaguePoints: number;

  @Column({ type: 'decimal', name: 'win_rate', precision: 5, scale: 2 })
  winRate: number;

  @Column()
  wins: number;

  @Column()
  losses: number;

  @ManyToOne(() => PlayerEntity, (player) => player.queues)
  player: PlayerEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}