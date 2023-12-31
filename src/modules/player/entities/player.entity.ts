import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QueueEntity } from '../../queue/entities/queue.entity';
import { LOLRegion } from 'src/modules/lol/interfaces';

@Entity({ name: 'players' })
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'summoner_name' })
  summonerName: string;

  @Index({ unique: true })
  @Column({ name: 'account_id' })
  accountId: string;

  @Column()
  region: LOLRegion;

  @OneToMany(() => QueueEntity, (queue) => queue.player, {
    cascade: true,
  })
  queues: QueueEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
