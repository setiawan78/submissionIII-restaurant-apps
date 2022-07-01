import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DATABASE_NAME, DATABASE_VERSION, OBJECT_STORE_NAME } = CONFIG;

const dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
      autoIncrement: true,
     });
  },
});

const FavoritWaroengkuIdb = {
  async getWaroengku(id) {
    return (await dbPromise).get(OBJECT_STORE_NAME, id);
  },
  async getAllWaroengku() {
    return (await dbPromise).getAll(OBJECT_STORE_NAME);
  },
  async putWaroengku(waroeng) {
    return (await dbPromise).put(OBJECT_STORE_NAME, waroeng);
  },
  async deleteWaroengku(id) {
    return (await dbPromise).delete(OBJECT_STORE_NAME, id);
  },
};

export default FavoritWaroengkuIdb;
