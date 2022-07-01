import FavoriteWaroengkuSearchPresenter from '../src/scripts/views/pages/liked-waroengku/favorite-movie-search-presenter';
import FavoritWaroengkuIdb from '../src/scripts/data/favoritwaroengku-idb';
import FavoriteWaroengkuSearchView from '../src/scripts/views/pages/liked-waroengku/favorite-waroengku-search-view';

describe('Searching waroengku', () => {
    let presenter;
    let favoriteWaroengku;
    let view;

    const searchWaroengku = (query) => {
        const queryElement = document.getElementById('query');
        queryElement.value = query;
        queryElement.dispatchEvent(new Event('change'));
    };

    const setWaroengkuSearchCont = () => {
        view = new FavoriteWaroengkuSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    const constructPresent = () => {
        favoriteWaroengku = spyOnAllFunctions(FavoritWaroengkuIdb);
        presenter = new FavoriteWaroengkuSearchPresenter({
            favoriteWaroengku,
            view,
        });
    };

    beforeEach(() => {
        setWaroengkuSearchCont();
        constructPresent();
    });

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchWaroengku('waroengku a');

            expect(presenter.latestQuery)
                .toEqual('waroengku a');
        });

        it('should ask the model to search for waroengku', () => {
            searchWaroengku('waroengku a');
            expect(favoriteWaroengku.searchWaroengku)
                .toHaveBeenCalledWith('waroengku a');
        });

        it('should show the found waroengku', () => {
            presenter._showFoundWaroengku([{ id: 1 }]);
            expect(document.querySelectorAll('.waroeng-item').length)
                .toEqual(1);

            presenter._showFoundWaroengku([{
                id: 1,
                title: 'Satu',
            }, {
                id: 2,
                title: 'Dua',
            }]);
            expect(document.querySelectorAll('.waroeng-item').length)
                .toEqual(2);
        });

        it('should show the title of the found movies', () => {
            presenter._showFoundWaroengku([{
                id: 1,
                title: 'Satu',
            }]);
            expect(document.querySelectorAll('.waroeng__title')
                .item(0).textContent)
                .toEqual('Satu');
        });

        it('should show - when the waroengku returned does not contain a title', (done) => {
            document.getElementById('waroeng').addEventListener('waroeng:updated', () => {
                const waroengkuTitles = document.querySelectorAll('.waroeng__title');
                expect(waroengkuTitles.item(0).textContent).toEqual('-');
                done();
            });

            favoriteWaroengku.searchWaroengku.withArgs('waroengku a').and.returnValues([
                { id: 444 },
            ]);

            searchWaroengku('waroengku a');
        });
    });

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchWaroengku(' ');
            expect(presenter.latestQuery.length)
                .toEqual(0);

            searchWaroengku('    ');
            expect(presenter.latestQuery.length)
                .toEqual(0);

            searchWaroengku('');
            expect(presenter.latestQuery.length)
                .toEqual(0);

            searchWaroengku('\t');
            expect(presenter.latestQuery.length)
                .toEqual(0);
        });

        it('should show all favorite waroengku', () => {
            searchWaroengku('    ');
            expect(favoriteWaroengku.getAllWaroengku)
                .toHaveBeenCalled();
        });
    });

    describe('When no favorite waroengku could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('waroeng').addEventListener('waroeng:updated', () => {
                expect(document.querySelectorAll('.waroeng-item__not__found').length).toEqual(1);
                done();
            });
            favoriteWaroengku.searchWaroengku.withArgs('waroengku a').and.returnValues([]);
            searchWaroengku('waroengku a');
        });

        it('should not show any waroengku', (done) => {
            document.getElementById('waroeng').addEventListener('waroeng:updated', () => {
                expect(document.querySelectorAll('.waroeng-item').length)
                    .toEqual(0);
                done();
            });
            favoriteWaroengku.searchWaroengku.withArgs('waroengku a')
                .and
                .returnValues([]);

            searchWaroengku('waroengku a');
        });
    });
});
