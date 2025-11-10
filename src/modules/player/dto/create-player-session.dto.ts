import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlayerSessionDto {
    @ApiProperty({ example: 'S200', description: 'Session ID' })
    @IsString()
    sessionId: string;

    @ApiProperty({ example: 'WS200', description: 'WebSocket client ID' })
    @IsString()
    websocketClientId: string;

    @ApiProperty({ example: true, description: 'Is online', required: false })
    @IsOptional()
    @IsBoolean()
    isOnline?: boolean;

    @ApiProperty({ example: 'john@example.com', description: 'Player email to link session' })
    @IsString()
    email: string;
}
