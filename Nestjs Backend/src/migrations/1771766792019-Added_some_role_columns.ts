import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSomeRoleColumns1771766792019 implements MigrationInterface {
    name = 'AddedSomeRoleColumns1771766792019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "role" character varying NOT NULL DEFAULT 'client'`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "role" character varying NOT NULL DEFAULT 'driver'`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" ADD "role" character varying NOT NULL DEFAULT 'delivery_agent'`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "role" character varying NOT NULL DEFAULT 'customer'`);
        await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "role" SET DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "role"`);
    }

}
