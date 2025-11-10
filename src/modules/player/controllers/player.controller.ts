import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PlayerService } from '../services/player.service';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { Player } from '../entities/player.entity';

@ApiTags('Players')
@Controller('players')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new player' })
    @ApiBody({ type: CreatePlayerDto, description: 'Player creation payload' })
    @ApiResponse({
        status: 201,
        description: 'Player created successfully',
        schema: {
            example: {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                activationStatus: true,
                displayId: 'P009',
                createdAt: '2025-11-11T00:00:00.000Z',
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Email already exists' })
    async createPlayer(@Body() dto: CreatePlayerDto): Promise<Player> {
        return this.playerService.createPlayer(dto);
    }

}
