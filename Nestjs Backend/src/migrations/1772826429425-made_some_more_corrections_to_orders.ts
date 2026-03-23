import { MigrationInterface, QueryRunner } from "typeorm";

export class MadeSomeMoreCorrectionsToOrders1772826429425 implements MigrationInterface {
    name = 'MadeSomeMoreCorrectionsToOrders1772826429425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "delivery_otp" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "otp_expires_at" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "otp_expires_at"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "delivery_otp"`);
    }

}
