import {openDatabase, enablePromise} from 'react-native-sqlite-storage';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'myapp.db', location: 'default'});
};
