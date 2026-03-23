import { MigrationInterface, QueryRunner } from "typeorm";

export class MadeSomeCorrections1772702609606 implements MigrationInterface {
    name = 'MadeSomeCorrections1772702609606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "amount" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_method"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_method_enum" AS ENUM('COD', 'PREPAID', 'ACCOUNT')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "payment_method" "public"."payments_payment_method_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_status"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_payment_status_enum" AS ENUM('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'REFUNDED')`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "payment_status" "public"."payments_payment_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "paid_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "paid_at" DROP DEFAULT`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b2f7b823a21562eeca20e72b00" ON "payments" ("order_id") `);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_b2f7b823a21562eeca20e72b006"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2f7b823a21562eeca20e72b00"`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "paid_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "paid_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_status"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "payment_status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "payment_method"`);
        await queryRunner.query(`DROP TYPE "public"."payments_payment_method_enum"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "payment_method" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_b2f7b823a21562eeca20e72b006" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
