import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlayerSession } from '../entities/player-session.entity';
import { PlayerService } from './player.service';
import { CreatePlayerSessionDto } from '../dto/create-player-session.dto';

@Injectable()
export class PlayerSessionService {
    constructor(
        @InjectRepository(PlayerSession)
        private readonly sessionRepo: Repository<PlayerSession>,
        private readonly playerService: PlayerService,
    ) { }

    async createSessionUsingEmail(dto: CreatePlayerSessionDto & { email: string }) {
        const player = await this.playerService.findByEmail(dto.email);
        if (!player) throw new NotFoundException('Player not found with given email');

        const session = this.sessionRepo.create({
            sessionId: dto.sessionId,
            websocketClientId: dto.websocketClientId,
            isOnline: dto.isOnline ?? false,
            playerId: player.id,
        });

        return await this.sessionRepo.save(session);
    }
}
