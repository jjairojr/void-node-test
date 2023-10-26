import { Controller, Get, Param, Res } from '@nestjs/common';
import { LolService } from './lol.service';
import * as path from 'path';

@Controller('lol')
export class LolController {
  constructor(private readonly lolService: LolService) {}

  @Get('tier/:tier/image')
  getTierImage(@Param('tier') tier: string, @Res() res: any) {
    return res.sendFile(
      path.join(process.cwd(), `src/assets/lol/tiers/${tier}.png`),
    );
  }
}
