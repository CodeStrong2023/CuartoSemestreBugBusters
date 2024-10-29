import pg from 'pg';
import { PG_DB, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from './config.js';

export const pool = new pg.Pool({
   port: PG_PORT,
   host: PG_HOST,
   user: PG_USER,
   password: PG_PASSWORD,
   database: PG_DB 
});

pool.on('connect', () => {
   console.log('connected to the db');
});