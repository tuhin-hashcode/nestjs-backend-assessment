import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entities/player.entity';
import { CreatePlayerDto } from '../dto/create-player.dto';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player)
        private readonly playerRepo: Repository<Player>,
    ) { }

    async createPlayer(dto: CreatePlayerDto): Promise<Player> {
        const existing = await this.playerRepo.findOne({ where: { email: dto.email } });
        if (existing) {
            throw new BadRequestException('Email already exists');
        }

        const existingDisplayId = await this.playerRepo.findOne({ where: { displayId: dto.displayId } });
        if (existingDisplayId) {
            throw new BadRequestException('Display Id already exists');
        }

        const player = this.playerRepo.create(dto);
        return await this.playerRepo.save(player);
    }

    async findByEmail(email: string): Promise<Player | null> {
        return await this.playerRepo.findOne({ where: { email } });
    }
}
