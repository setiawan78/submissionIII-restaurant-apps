import FavoriteWaroengkuSearchView from '../src/scripts/views/pages/liked-waroengku/favorite-waroengku-search-view';
import FavoriteWaroengkuShowPresenter from '../src/scripts/views/pages/liked-waroengku/favorite-waroengku-show-presenter';
import FavoritWaroengkuIdb from '../src/scripts/data/favoritwaroengku-idb';

describe('Showing all favorite waroengku', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteWaroengkuSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no waroengku have been liked', () => {
        it('should ask for the favorite waroengku', () => {
            const favoriteWaroengku = spyOnAllFunctions(FavoritWaroengkuIdb);
            new FavoriteWaroengkuShowPresenter({
                view,
                favoriteWaroengku,
            });
            expect(favoriteWaroengku.getAllWaroengku).toHaveBeenCalledTimes(1);
        });

        it('should show the information that no waroengku have been liked', (done) => {
            document.getElementById('waroeng').addEventListener('waroeng:updated', () => {
                expect(document.querySelectorAll('.waroeng-item__not__found').length)
                    .toEqual(1);
                done();
            });
            const favoriteWaroengku = spyOnAllFunctions(FavoritWaroengkuIdb);
            favoriteWaroengku.getAllWaroengku.and.returnValues([]);

            new FavoriteWaroengkuShowPresenter({
                view,
                favoriteWaroengku,
            });
        });
    });

    describe('When favorite waroengku exist', () => {
        it('should show the waroengku', (done) => {
            document.getElementById('waroeng').addEventListener('waroeng:updated', () => {
                expect(document.querySelectorAll('.waroeng-item').length).toEqual(2);
                done();
            });

            const favoriteWaroengku = spyOnAllFunctions(FavoritWaroengkuIdb);
            favoriteWaroengku.getAllWaroengku.and.returnValues([
                {
                    id: 11, title: 'A', vote_average: 3, overview: 'Sebuah Waroengku A',
                },
                {
                    id: 22, title: 'B', vote_average: 4, overview: 'Sebuah Waroengku B',
                },
            ]);
            new FavoriteWaroengkuShowPresenter({
                view,
                favoriteWaroengku,
            });
        });
    });
});
