import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeInUsersTable1643379678029 implements MigrationInterface {
    name = 'ChangeInUsersTable1643379678029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "updateOn" TO "updatedOn"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "updatedOn" TO "updateOn"`);
    }

}
