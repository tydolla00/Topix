import { Pool } from "pg";

const pool = new Pool();

export const query = (text: string, params: any, callback?: any) => {
  return pool.query(text, params, callback);
};

export const queryNoCall = async (text: string, params?: any) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};
