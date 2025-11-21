import initSqlJs from "sql.js";

// Read a SQLite file (ArrayBuffer) and return rows from a query
export async function readSqlite<T = any>(
  fileBuffer: ArrayBuffer,
  query: string
): Promise<T[]> {
  const SQL = await initSqlJs({
    locateFile: (file) => `/sql-wasm.wasm`, // Vite will serve this file
  });

  const db = new SQL.Database(new Uint8Array(fileBuffer));
  const result = db.exec(query);

  if (result.length === 0) return [];

  // Convert result → array of objects
  const { columns, values } = result[0];

  return values.map((row) => {
    const obj: any = {};
    row.forEach((value, i) => {
      obj[columns[i]] = value;
    });
    return obj as T;
  });
}
