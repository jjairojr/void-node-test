import { Controller, Get, Param, Res, UseInterceptors } from '@nestjs/common';
import { LolService } from './lol.service';
import * as path from 'path';
import { LOLRegion } from './interfaces';
import { CacheInterceptor } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('lol')
export class LolController {
  constructor(private readonly lolService: LolService) {}

  @Get('/tier/:tier/image')
  getTierImage(@Param('tier') tier: string, @Res() res: any) {
    return res.sendFile(
      path.join(process.cwd(), `src/assets/lol/tiers/${tier}.png`),
    );
  }

  @Get('/leaderboard/summonerName/:summonerName/region/:region')
  async getLeaderboardBySummonerName(
    @Param('summonerName') summonerName: string,
    @Param('region') region: LOLRegion,
  ) {
    return this.lolService.getLeaderboardBySummonerName({
      summonerName,
      region,
    });
  }

  @Get('/leaderboard/region/:region')
  async getLeaderboard(@Param('region') region: LOLRegion) {
    return this.lolService.getLeaderboard({ region });
  }
}
