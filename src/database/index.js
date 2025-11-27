import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.cjs";
import User from "../app/models/User.js";

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    const env = process.env.NODE_ENV || "development";
    const config = databaseConfig[env];

    this.connection = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();