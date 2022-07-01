import { itActsAsFavoriteWaroengkuModel } from './contract/favoriteWaroengkuContract';
import FavoritWaroengkuIdb from '../src/scripts/data/favoritwaroengku-idb';

describe('Favorite Waroengku Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await FavoritWaroengkuIdb.getAllWaroengku()).forEach(async (waroeng) => {
            await FavoritWaroengkuIdb.deleteWaroengku(waroeng.id);
        });
    });
    itActsAsFavoriteWaroengkuModel(FavoritWaroengkuIdb);
});
