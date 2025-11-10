import { Module } from '@nestjs/common';
import { PlayerService } from './services/player.service';
import { PlayerController } from './controllers/player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerSession } from './entities/player-session.entity';
import { Player } from './entities/player.entity';
import { PlayerSessionService } from './services/player-session.service';
import { PlayerSessionController } from './controllers/player-session.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Player, PlayerSession])],
  providers: [PlayerService, PlayerSessionService],
  controllers: [PlayerController, PlayerSessionController],
  exports: [PlayerService, PlayerSessionService]
})
export class PlayerModule { }
