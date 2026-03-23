import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPickuptimeColumnShipmentEntity1772528344154 implements MigrationInterface {
    name = 'AddedPickuptimeColumnShipmentEntity1772528344154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments" ADD "pickup_scheduled_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "pickup_scheduled_at"`);
    }

}
