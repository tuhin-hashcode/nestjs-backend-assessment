import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreatePlayerSessionDto } from '../dto/create-player-session.dto';
import { PlayerSessionService } from '../services/player-session.service';
import { PlayerSession } from '../entities/player-session.entity';

@ApiTags('Player Sessions')
@Controller('player-sessions')
export class PlayerSessionController {
    constructor(private readonly sessionService: PlayerSessionService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new player session using player email' })
    @ApiBody({ type: CreatePlayerSessionDto, description: 'Player session creation payload with email' })
    @ApiResponse({
        status: 201,
        description: 'Player session created successfully',
        schema: {
            example: {
                id: 1,
                sessionId: 'S200',
                websocketClientId: 'WS200',
                isOnline: true,
                playerId: 1,
                createdAt: '2025-11-11T00:00:00.000Z',
            }
        }
    })
    @ApiResponse({ status: 404, description: 'Player not found with given email' })
    async createSession(
        @Body() body: CreatePlayerSessionDto & { email: string },
    ): Promise<PlayerSession> {
        return this.sessionService.createSessionUsingEmail(body);
    }

}
