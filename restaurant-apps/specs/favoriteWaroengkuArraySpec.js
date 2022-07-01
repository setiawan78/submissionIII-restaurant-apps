import { itActsAsFavoriteWaroengkuModel } from './contract/favoriteWaroengkuContract';

let favoriteWaroengku = [];

const FavoriteWaroengkuArray = {
    getWaroengku(id) {
        if (!id) {
            return;
        }
        return favoriteWaroengku.find((waroeng) => waroeng.id === id);
    },

    getAllWaroengku() {
        return favoriteWaroengku;
    },

    putWaroengku(waroeng) {
        if (!waroeng.hasOwnProperty('id')) {
            return;
        }

        if (this.getWaroengku(waroeng.id)) {
            return;
        }
        favoriteWaroengku.push(waroeng);
    },

    deleteWaroengku(id) {
        favoriteWaroengku = favoriteWaroengku.filter((waroeng) => waroeng.id !== id);
    },

    searchWaroengku(query) {
        return this.getAllWaroengku()
            .filter((waroeng) => {
                const judulLoweredCaseWaroengku = (waroeng.title || '-').toLowerCase();
                const jammedJudulWaroengku = judulLoweredCaseWaroengku.replace(/\s/g, '');
                const lowCaseWuery = query.toLowerCase();
                const jammedQuery = lowCaseWuery.replace(/\s/g, '');
                return jammedJudulWaroengku.indexOf(jammedQuery) !== -1;
            });
    },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
    afterEach(() => favoriteWaroengku = []);
    itActsAsFavoriteWaroengkuModel(FavoriteWaroengkuArray);
});
