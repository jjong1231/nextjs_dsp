// lib/db.ts
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // use_pure: false, // 이 부분은 더 이상 필요하지 않습니다.
});

export default db;