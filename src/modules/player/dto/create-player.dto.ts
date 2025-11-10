import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
    @ApiProperty({ example: 'John Doe', description: 'Player full name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'john@example.com', description: 'Unique player email' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: true, description: 'Activation status', required: false })
    @IsOptional()
    @IsBoolean()
    activationStatus?: boolean;

    @ApiProperty({ example: 'P009', description: 'Display ID' })
    @IsString()
    displayId: string;
}
