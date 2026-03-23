import { MigrationInterface, QueryRunner } from "typeorm";

export class PhoneNoTypeChange1772548904036 implements MigrationInterface {
    name = 'PhoneNoTypeChange1772548904036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "phone_number" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "phone_number" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "phone_number" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "drivers" ALTER COLUMN "phone_number" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" ADD "phone_number" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" ALTER COLUMN "phone_number" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "phone_number" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "customers" ALTER COLUMN "phone_number" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "phone_number" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "phone_number" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "phone_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "phone_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "delivery_agents" ADD "phone_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drivers" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "drivers" ADD "phone_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admins" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "admins" ADD "phone_number" integer NOT NULL`);
    }

}
