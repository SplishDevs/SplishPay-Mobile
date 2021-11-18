import {ResultSet} from 'react-native-sqlite-storage';
import {getDBConnection} from '.';

export const executeSql = (sql: string, param?: any[]): Promise<ResultSet> => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await (await getDBConnection()).executeSql(sql, param);
      const result = payload[0];
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
