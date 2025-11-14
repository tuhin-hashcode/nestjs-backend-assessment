import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

@Module({
    providers: [
        {
            provide: 'DRIZZLE',
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const client = new Client({
                    host: config.get<string>('DATABASE_HOST'),
                    port: config.get<number>('DATABASE_PORT'),
                    user: config.get<string>('DATABASE_USER'),
                    password: config.get<string>('DATABASE_PASSWORD'),
                    database: config.get<string>('DATABASE_DB'),
                });

                await client.connect();

                return drizzle(client);
            },
        },
    ],
    exports: ['DRIZZLE'],
})
export class DrizzleModule { }
