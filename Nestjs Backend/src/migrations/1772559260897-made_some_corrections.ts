import { MigrationInterface, QueryRunner } from "typeorm";

export class MadeSomeCorrections1772559260897 implements MigrationInterface {
    name = 'MadeSomeCorrections1772559260897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "REL_5b3e94bd2aedc184f9ad8c1043"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "order_id" uuid`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "UQ_b2f7b823a21562eeca20e72b006" UNIQUE ("order_id")`);
        await queryRunner.query(`CREATE INDEX "idx_tracking_shipment_id" ON "tracking" ("shipment_id") `);
        await queryRunner.query(`CREATE INDEX "idx_shipments_client_id" ON "shipments" ("client_id") `);
        await queryRunner.query(`CREATE INDEX "idx_orders_customerId" ON "orders" ("customerId") `);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`DROP INDEX "public"."idx_orders_customerId"`);
        await queryRunner.query(`DROP INDEX "public"."idx_shipments_client_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_tracking_shipment_id"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "UQ_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "payment_id" integer`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "REL_5b3e94bd2aedc184f9ad8c1043" UNIQUE ("payment_id")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_5b3e94bd2aedc184f9ad8c10439" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
