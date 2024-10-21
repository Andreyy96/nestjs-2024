import { MigrationInterface, QueryRunner } from "typeorm";

export class IsActiveDefaultFalse1729206862621 implements MigrationInterface {
    name = 'IsActiveDefaultFalse1729206862621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`);
    }

}
