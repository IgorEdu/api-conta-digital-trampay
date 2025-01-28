import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1738016663225 implements MigrationInterface {
    name = 'SchemaUpdate1738016663225'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "external_transfer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_id" character varying NOT NULL, "external_bank" character varying NOT NULL, "external_agency" character varying NOT NULL, "external_account" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "status" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3916bdf4644fc5a88d9f61636f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transfer" ADD "status" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfer" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TABLE "external_transfer"`);
    }

}
