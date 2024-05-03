import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Establish connection to the database using .env credentials
const { DB, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
export const options = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB,
};

var connection = mysql.createConnection(options);

connection.connect((error) => {
  if (error != null && error.message) {
    console.log("Cannot connect to the database...");
    console.log(error.message);
    process.exit(-1);
  }
});

export function query(q) {
  return new Promise((resolve, reject) => {
    connection.query(q, (err, result, fields) => {
      if (err) {
        return reject({ error: err });
      }
      return resolve({ result, fields });
    });
  });
}

export default connection;
