import {getDBConnection} from '.';

export const initializeApp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await getDBConnection();

      await db.executeSql(`
        CREATE TABLE IF NOT EXISTS users(
            id integer PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phoneNumber TEXT NOT NULL,
            password TEXT NOT NULL
        );
        `);
      resolve(null);
    } catch (error) {
      reject(error);
    }
  });
};
