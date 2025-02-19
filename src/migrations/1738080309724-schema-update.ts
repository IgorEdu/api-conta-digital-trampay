import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1738080309724 implements MigrationInterface {
    name = 'SchemaUpdate1738080309724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transfer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_sender" character varying NOT NULL, "account_receiver" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "balance" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_efef1e5fdbe318a379c06678c51" UNIQUE ("user_id"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "external_transfer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "account_id" character varying NOT NULL, "external_bank" character varying NOT NULL, "external_agency" character varying NOT NULL, "external_account" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "status" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3916bdf4644fc5a88d9f61636f5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "external_transfer"`);
        await queryRunner.query(`DROP TABLE "account"`);
        await queryRunner.query(`DROP TABLE "transfer"`);
    }

}
