import FavoritWaroengkuIdb from '../../data/favoritwaroengku-idb';
import WKTemplate from '../templates/wk-templates';

const WKWhistlist = {
  async render() {
    return `
        <div class="container">
        <h2 class="title-container">Favorite Restaurant</h2>

        <section id="wishlist-waroengku"></section>
        </div>
      `;
  },

  async afterRender() {
    const data = await FavoritWaroengkuIdb.getAllWaroengku();
    const WhistlistWkCont = document.querySelector('#wishlist-waroengku');
    if (data.length === 0) {
      WhistlistWkCont.innerHTML = `
      Empty favorite Waroengku. Put one, by clicking heart button in the detail page.
      `;
    }
    data.forEach((waroengku) => {
      WhistlistWkCont.innerHTML += WKTemplate(waroengku);
    });
  },
};

export default WKWhistlist;
