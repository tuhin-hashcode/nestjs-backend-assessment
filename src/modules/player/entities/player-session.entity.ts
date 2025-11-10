import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Player } from './player.entity';

@Entity({ name: 'player_session' })
export class PlayerSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'session_id' })
    sessionId: string;

    @Column({ name: 'websocket_client_id' })
    websocketClientId: string;

    @Column({ name: 'is_online', default: false })
    isOnline: boolean;

    @Column({ name: 'player_id' })
    playerId: number;

    @ManyToOne(() => Player, (player) => player.sessions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'player_id' })
    player: Player;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
