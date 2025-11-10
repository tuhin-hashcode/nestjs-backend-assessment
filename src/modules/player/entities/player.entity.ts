import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
} from 'typeorm';
import { PlayerSession } from './player-session.entity';

@Entity({ name: 'player' })
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ name: 'activation_status', default: true })
    activationStatus: boolean;

    @Column({ name: 'display_id' })
    displayId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => PlayerSession, (session) => session.player, {
        cascade: true,
    })
    sessions: PlayerSession[];
}
