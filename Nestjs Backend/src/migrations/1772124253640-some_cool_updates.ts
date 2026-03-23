import { MigrationInterface, QueryRunner } from "typeorm";

export class SomeCoolUpdates1772124253640 implements MigrationInterface {
    name = 'SomeCoolUpdates1772124253640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments" ADD "status" character varying NOT NULL DEFAULT 'CREATED'`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shipments" ALTER COLUMN "delivered_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments" ALTER COLUMN "delivered_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "status"`);
    }

}
