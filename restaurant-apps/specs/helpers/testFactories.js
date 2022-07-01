import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavoritWaroengkuIdb from '../../src/scripts/data/favoritwaroengku-idb';

const createLikeButtonPresenterWithWaroengku = async (waroeng) => {
    await LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        favoriteWaroengku: FavoritWaroengkuIdb,
        waroeng,
    });
};

export { createLikeButtonPresenterWithWaroengku };
