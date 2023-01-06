const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ipl',
  password: 'VisualBasics99',
  port: 5432,
});

const login = (params) => {
  let values = [];
  let sql = '';

  if (params.userName && params.password) {
    values = [params.userName, params.password];
    sql = 'SELECT user_id FROM users WHERE user_name=$1 AND password=$2';
  }

  return new Promise(function (resolve, reject) {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results && results.rows);
    })
  })
}

const executeQuery = (params) => {
  const sql = params.query;
  const userName = params.userName;
  const password = params.password;

  const userSpecificPool = new Pool({
    user: userName,
    host: 'localhost',
    database: 'ipl',
    password: password,
    port: 5432,
  });

  return new Promise(function (resolve, reject) {
    userSpecificPool.query(sql, (error, results) => {
      if (error) {
        reject(error);
      }
      else if (!sql) {
        reject({ detail: "No SQL entered" });
      }
      resolve(results && results.rows);
    })
  })
}

module.exports = {
  login,
  executeQuery
}