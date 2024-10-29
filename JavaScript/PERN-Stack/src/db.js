import pg from 'pg';

export const pool = new pg.Pool({
   port: 5432,
   host: 'localhost',
   user: 'postgres',
   password: '1234',
   database: 'PERN' 
});

pool.on('connect', () => {
   console.log('connected to the db');
});