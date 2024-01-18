import knex from 'knex';
import knexConfig from '../config/database.js';

let conn;

const knexService = () => {
  if (!conn) {
    conn = knex(knexConfig);
    return conn;
  }
  return conn;
};

export default knexService();