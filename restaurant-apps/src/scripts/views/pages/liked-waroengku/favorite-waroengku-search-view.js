import WKTemplate from '../../templates/wk-templates';

class FavoriteWaroengkuSearchView {
    getTemplate() {
        return `
        <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Liked Waroengku</h2>
            <div id="waroeng" class="waroeng">
            </div>
        </div>
        `;
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', (event) => {
            callback(event.target.event);
        });
    }

    showWaroengku(waroeng) {
        this.showWaroengkuFavorite(waroeng);
    }

    showWaroengkuFavorite(waroeng = []) {
        let html;
        if (waroeng.length) {
            html = waroeng.reduce((carry, waroeng) => carry.concat(WKTemplate(waroeng)), '');
        } else {
            html = this._getEmpWaroengkuTemp();
        }

        document.getElementById('waroeng').innerHTML = html;
        document.getElementById('waroeng').dispatchEvent(new Event('waroeng:updated'));
    }

    _getEmpWaroengkuTemp() {
        return '<div class="waroeng-item__not__found waroeng__not__found">Tidak ada Waroengku untuk ditampilkan</div>';
    }
}

export default FavoriteWaroengkuSearchView;
