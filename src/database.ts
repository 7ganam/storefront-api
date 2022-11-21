import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST_TEST,
  POSTGRES_DB_TEST,
  POSTGRES_USER_TEST,
  POSTGRES_PASSWORD_TEST,
  ENV,
} = process.env;

let client: Pool;

if (ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST_TEST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER_TEST,
    password: POSTGRES_PASSWORD_TEST,
  });
}

if (ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

//@ts-ignore
export default client;
