import FavoritWaroengkuIdb from '../src/scripts/data/favoritwaroengku-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonCont = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Remove Liking A Waroengku', () => {
    beforeEach(async () => {
        addLikeButtonCont();
        await FavoritWaroengkuIdb.putWaroengku({ id: 1 });
    });

    afterEach(async () => {
        await FavoritWaroengkuIdb.deleteWaroengku(1);
    });

    it('should display unlike widget when the waroengku has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
        expect(document.querySelector('[aria-label="unlike this waroengku"]'))
            .toBeTruthy();
    });

    it('should not display like widget when the waroengku has been liked', async () => {
        await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
        expect(document.querySelector('[aria-label="like this waroengku"]'))
            .toBeFalsy();
    });

    it('should be able to remove liked waroengku from the list', async () => {
        await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
        document.querySelector('[aria-label="unlike this waroengku"]').dispatchEvent(new Event('click'));
        expect(await FavoritWaroengkuIdb.getAllWaroengku()).toEqual([]);
    });

    it('should not throw error if the unliked waroengku is not in the list', async () => {
        await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
        await FavoritWaroengkuIdb.deleteWaroengku(1);
        document.querySelector('[aria-label="unlike this waroengku"]').dispatchEvent(new Event('click'));
        expect(await FavoritWaroengkuIdb.getAllWaroengku()).toEqual([]);
    });
});
