import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCoulumnDeletedUser1730804343789 implements MigrationInterface {
    name = 'AddCoulumnDeletedUser1730804343789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deleted" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted"`);
    }

}
