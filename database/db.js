import mysql from "mysql2";

//TODO: Conexion con DB
export const conexion = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
});

//TODO: Probado la conexion
conexion.connect((error) => {
  if (!error) {
    console.log("DB is conecting");
  } else {
    throw error;
  }
});
