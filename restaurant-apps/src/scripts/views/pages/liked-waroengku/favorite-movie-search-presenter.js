class FavoriteWaroengkuSearchPresenter {
    constructor({ favoriteWaroengku, view }) {
      this._view = view;
      this._listenToSearchRequestByUser();
      this._favoriteWaroengku = favoriteWaroengku;
    }

    _listenToSearchRequestByUser() {
      this._view.runWhenUserIsSearching((latestQuery) => {
        this._searchMovies(latestQuery);
      });
    }

    async _searchWaroengku(latestQuery) {
      this._latestQuery = latestQuery.trim();

      let foundWaroengku;
      if (this.latestQuery.length > 0) {
        foundWaroengku = await this._favoriteWaroengku._searchWaroengku(this.latestQuery);
      } else {
        foundWaroengku = await this._favoriteWaroengku.getAllWaroengku();
      }

      this._showFoundWaroengku(foundWaroengku);
    }

    _showFoundWaroengku(waroeng) {
      this._view._showFoundWaroengku(waroeng);
    }

    get latestQuery() {
      return this._latestQuery;
    }
  }

export default FavoriteWaroengkuSearchPresenter;
