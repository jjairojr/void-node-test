import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { PlayerService } from './player.service';
import { LOLQueueId, LOLRegion } from './types';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get(':summonerName/region/:region')
  getPlayerSummary(
    @Param('region') region: LOLRegion,
    @Param('summonerName') summonerName: string,
    @Query('queueId') queueId: LOLQueueId,
  ) {
    return this.playerService.getPlayerSummary({
      region,
      summonerName,
      queueId,
    });
  }

  @Get(':summonerName/region/:region/matches')
  getPlayerRecentMatches(
    @Param('region') region: LOLRegion,
    @Param('summonerName') summonerName: string,
    @Query('queueId') queueId: LOLQueueId,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    return this.playerService.getPlayerRecentMatches({
      region,
      summonerName,
      queueId,
      page: parsedPage,
      limit: parsedLimit,
    });
  }
}
