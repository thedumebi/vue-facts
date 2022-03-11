import { config } from "dotenv";
config();

const dbConfig = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "rakuten",
    host: "127.0.0.1",
    storage: "./database.sqlite3",
    dialect: "sqlite",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgresql",
    logging: false,
  },
};

export default dbConfig;
