import { Module } from '@nestjs/common';
import { PlayerModule } from './modules/player/player.module';
import { LolModule } from './modules/lol/lol.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './env';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
      username: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    PlayerModule,
    LolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
