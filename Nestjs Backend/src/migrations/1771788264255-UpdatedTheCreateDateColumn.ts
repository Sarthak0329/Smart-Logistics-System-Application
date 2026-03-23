import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedTheCreateDateColumn1771788264255 implements MigrationInterface {
    name = 'UpdatedTheCreateDateColumn1771788264255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admins" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}
