import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1771846585634 implements MigrationInterface {
    name = 'UpdateSchema1771846585634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "Default_pickup_location" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "Default_pickup_location" SET NOT NULL`);
    }

}
