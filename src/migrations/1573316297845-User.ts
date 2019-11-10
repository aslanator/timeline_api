import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1573316297845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "login",
                    type: "varchar",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar"
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user')
    }


}
