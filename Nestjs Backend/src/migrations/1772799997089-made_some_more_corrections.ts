import { MigrationInterface, QueryRunner } from "typeorm";

export class MadeSomeMoreCorrections1772799997089 implements MigrationInterface {
    name = 'MadeSomeMoreCorrections1772799997089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."shipments_driver_status_enum" AS ENUM('PENDING', 'ACCEPTED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "shipments" ADD "driver_status" "public"."shipments_driver_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`ALTER TYPE "public"."payments_payment_method_enum" RENAME TO "payments_payment_method_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_method_enum" AS ENUM('COD', 'UPI', 'CARD', 'NETBANKING')`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "payment_method" TYPE "public"."payments_payment_method_enum" USING "payment_method"::"text"::"public"."payments_payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_method_enum_old"`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "order_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "pincode" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "pincode"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "pincode" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "order_id" DROP NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_method_enum_old" AS ENUM('COD', 'PREPAID', 'ACCOUNT')`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "payment_method" TYPE "public"."payments_payment_method_enum_old" USING "payment_method"::"text"::"public"."payments_payment_method_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_method_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payments_payment_method_enum_old" RENAME TO "payments_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipments" DROP COLUMN "driver_status"`);
        await queryRunner.query(`DROP TYPE "public"."shipments_driver_status_enum"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "role" character varying NOT NULL DEFAULT 'customer'`);
    }

}
