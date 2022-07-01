import FavoritWaroengkuIdb from '../src/scripts/data/favoritwaroengku-idb';
import * as TestFactories from './helpers/testFactories';

describe('Add Liking A Waroengku', () => {
    const addLikeButtonCont = () => {
        document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    };

    beforeEach(() => {
        addLikeButtonCont();
    });

    it('should show the like button when the waroengku has not been liked before', async () => {
    await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
    expect(document.querySelector('[aria-label="like this waroengku"]'))
        .toBeTruthy();
    });

    it('should not show the unlike button when the waroengku has not been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
        expect(document.querySelector('[aria-label="unlike this waroengku"]'))
            .toBeFalsy();
    });

    it('should be able to like the waroengku', async () => {
        await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        const waroeng = await FavoritWaroengkuIdb.getWaroengku(1);
        expect(waroeng).toEqual({ id: 1 });
        FavoritWaroengkuIdb.deleteWaroengku(1);
    });

    it('should not add a waroengku again when its already liked', async () => {
        await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
        await FavoritWaroengkuIdb.putWaroengku({ id: 1 });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect(await FavoritWaroengkuIdb.getAllWaroengku()).toEqual([{ id: 1 }]);
        FavoritWaroengkuIdb.deleteWaroengku(1);
    });

    it('should not add a waroengku when it has no id', async () => {
        await TestFactories.createLikeButtonPresenterWithWaroengku({ id: 1 });
        document.querySelector('#likeButton').dispatchEvent(new Event('click'));
        expect(await FavoritWaroengkuIdb.getAllWaroengku()).toEqual([]);
    });
});
