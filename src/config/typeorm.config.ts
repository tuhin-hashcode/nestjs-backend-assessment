import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface ExtendedTypeOrmOptions {
    seeds?: string[];
    factories?: string[];
    cli?: {
        migrationsDir?: string;
    };
}

export const typeOrmConfigFactory = (configService: ConfigService): TypeOrmModuleOptions & ExtendedTypeOrmOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_DB'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
    factories: [__dirname + '/factories/**/*{.ts,.js}'],
    cli: {
        migrationsDir: __dirname + '/migrations/',
    },
});
