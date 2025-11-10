import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class DefaultMigration1762793181936 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "player",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    { name: "name", type: "varchar" },
                    { name: "email", type: "varchar", isUnique: true },
                    { name: "activation_status", type: "boolean", default: true },
                    { name: "display_id", type: "varchar", isUnique: true },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        await queryRunner.createTable(
            new Table({
                name: "player_session",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    { name: "session_id", type: "varchar" },
                    { name: "websocket_client_id", type: "varchar" },
                    { name: "is_online", type: "boolean", default: false },
                    { name: "player_id", type: "int" },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "player_session",
            new TableForeignKey({
                columnNames: ["player_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "player",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.query(`
            INSERT INTO player (name, email, activation_status, display_id)
            VALUES
            ('Alice', 'alice@example.com', true, 'P001'),
            ('Bob', 'bob@example.com', true, 'P002'),
            ('Charlie', 'charlie@example.com', false, 'P003'),
            ('David', 'david@example.com', true, 'P004'),
            ('Eve', 'eve@example.com', false, 'P005');
        `);

        await queryRunner.query(`
            INSERT INTO player_session (session_id, websocket_client_id, is_online, player_id)
            VALUES
            ('S001', 'WS001', true, 1),
            ('S002', 'WS002', false, 1),
            ('S003', 'WS003', true, 2),
            ('S004', 'WS004', false, 3),
            ('S005', 'WS005', true, 3),
            ('S006', 'WS006', true, 4),
            ('S007', 'WS007', false, 5);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("player_session");
        const foreignKey = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf("player_id") !== -1
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("player_session", foreignKey);
        }

        await queryRunner.dropTable("player_session");
        await queryRunner.dropTable("player");
    }
}
