import Sequelize from "sequelize";

export default class User extends Sequelize.Model {
    static init(sequelize) {
        super.init(
            {
                name: { type: Sequelize.STRING, allowNull: false },
                email: { type: Sequelize.STRING, allowNull: false, unique: true },
                password_hash: { type: Sequelize.STRING, allowNull: false },
                admin: { type: Sequelize.BOOLEAN, defaultValue: false },
            },
            {
                sequelize,
                tableName: "users",
            }
        );
    }
}