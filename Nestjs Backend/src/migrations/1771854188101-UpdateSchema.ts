import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1771854188101 implements MigrationInterface {
    name = 'UpdateSchema1771854188101'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "Name"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "Email"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "Password"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "Phone_number"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "Business_name"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "Business_Type"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "Default_pickup_location"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "COD_enabled"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "is_Approved"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "phone_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "business_name" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "business_type" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "default_pickup_location" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "cod_enabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "is_approved" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "is_approved"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "cod_enabled"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "default_pickup_location"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "business_type"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "business_name"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "is_Approved" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "COD_enabled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "Default_pickup_location" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "Business_Type" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "Business_name" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "Phone_number" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "Password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "Email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "Name" character varying NOT NULL`);
    }

}
