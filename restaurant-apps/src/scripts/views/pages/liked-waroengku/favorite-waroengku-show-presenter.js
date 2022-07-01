class FavoriteWaroengkuShowPresenter {
    constructor({ view, favoriteWaroengku }) {
      this._view = view;
      this._favoriteWaroengku = favoriteWaroengku;

      this._showFavoriteWaroengku();
    }

    async _showFavoriteWaroengku() {
      const waroeng = await this._favoriteWaroengku.getAllWaroengku();
      this._displayWaroengku(waroeng);
    }

    _displayWaroengku(waroeng) {
      this._view._showFavoriteWaroengku(waroeng);
    }
  }

  export default FavoriteWaroengkuShowPresenter;
