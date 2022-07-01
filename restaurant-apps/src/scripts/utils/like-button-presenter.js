// import FavoritWaroengkuIdb from '../data/favoritwaroengku-idb';
import { createLikeWaroengkuButtonTemplate, createUnLikedWaroengkuButtonTemplate } from '../views/templates/createlikebutton';

const LikeButtonPresenter = {
    async init({ likeButtonContainer, favoriteWaroengku, waroeng }) {
        this._likeButtonContainer = likeButtonContainer;
        this._waroeng = waroeng;
        this._favoriteWaroengku = favoriteWaroengku;
        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._waroeng;

        if (await this._isWaroengkuExist(id)) {
                this._renderLikedButtonTemplate();
        } else {
                this._renderLikeButtonTemplate();
        }
    },

    async _isWaroengkuExist(id) {
        const waroeng = await this._favoriteWaroengku.getWaroengku(id);
        return !!waroeng;
    },

    _renderLikeButtonTemplate() {
        this._likeButtonContainer.innerHTML = createLikeWaroengkuButtonTemplate();
        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteWaroengku.putWaroengku(this._waroengku);
            this._renderButton();
        });
    },

    _renderLikedButtonTemplate() {
        this._likeButtonContainer.innerHTML = createUnLikedWaroengkuButtonTemplate();
        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await this._favoriteWaroengku.deleteWaroengku(this._waroengku.id);
            this._renderButton();
        });
    },
};

export default LikeButtonPresenter;
