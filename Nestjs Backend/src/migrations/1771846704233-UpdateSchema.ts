import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1771846704233 implements MigrationInterface {
    name = 'UpdateSchema1771846704233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_1fa70d92c557f96218823a9f079"`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "admin_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_1fa70d92c557f96218823a9f079" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_1fa70d92c557f96218823a9f079"`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "admin_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_1fa70d92c557f96218823a9f079" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
