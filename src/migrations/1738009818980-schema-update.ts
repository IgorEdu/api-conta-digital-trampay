import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1738009818980 implements MigrationInterface {
    name = 'SchemaUpdate1738009818980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfer" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transfer" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfer" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "transfer" DROP COLUMN "status"`);
    }

}
