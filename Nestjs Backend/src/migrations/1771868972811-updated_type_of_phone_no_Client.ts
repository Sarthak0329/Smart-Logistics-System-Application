import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedTypeOfPhoneNoClient1771868972811 implements MigrationInterface {
    name = 'UpdatedTypeOfPhoneNoClient1771868972811'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "phone_number" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "phone_number" integer NOT NULL`);
    }

}
