import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedTheRelationshipBtwShipmentItemAndOrderItemTables1772704756113 implements MigrationInterface {
    name = 'FixedTheRelationshipBtwShipmentItemAndOrderItemTables1772704756113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_items" DROP CONSTRAINT "FK_b1e3a2b7418f3ee9da38c50d2ae"`);
        await queryRunner.query(`ALTER TABLE "order_items" DROP COLUMN "shipment_item_id"`);
        await queryRunner.query(`ALTER TABLE "shipment_items" ADD "orderItem_id" uuid`);
        await queryRunner.query(`ALTER TABLE "shipment_items" ADD CONSTRAINT "FK_29711e7565e4c8115de07df89d3" FOREIGN KEY ("orderItem_id") REFERENCES "order_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shipment_items" DROP CONSTRAINT "FK_29711e7565e4c8115de07df89d3"`);
        await queryRunner.query(`ALTER TABLE "shipment_items" DROP COLUMN "orderItem_id"`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD "shipment_item_id" integer`);
        await queryRunner.query(`ALTER TABLE "order_items" ADD CONSTRAINT "FK_b1e3a2b7418f3ee9da38c50d2ae" FOREIGN KEY ("shipment_item_id") REFERENCES "shipment_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
