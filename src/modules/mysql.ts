import mysql from "mysql2/promise";
import mysqlOPtion from "../config";
const pool = mysql.createPool(mysqlOPtion.mysql);
export default pool;