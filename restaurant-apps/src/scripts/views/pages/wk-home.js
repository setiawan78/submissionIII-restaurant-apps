import WaroengKuSource from '../../data/waroengku-source';
import Loaded from '../templates/load';
import WKTemplate from '../templates/wk-templates';

const WKHome = {
  async render() {
    return `
            <div class="container">
                <div id="loading"></div>

                <div id="main-container">
                <h1 tabindex="0" class="main-content__title">Explore Restaurant</h1>

                <section id="waroengku"></section>
                </div>
            </div>
      `;
  },

  async afterRender() {
    const loading = document.querySelector('#loading');
    const mainContainer = document.querySelector('#main-container');
    const listContainer = document.querySelector('#waroengku');

    mainContainer.style.display = 'none';
    loading.innerHTML = Loaded();
    try {
      const data = await WaroengKuSource.WaroengKuList();
      data.restaurants.forEach((restaurant) => {
        listContainer.innerHTML += WKTemplate(restaurant);
      });

      loading.style.display = 'none';
      mainContainer.style.display = 'block';
    } catch (err) {
      console.error(err);

      mainContainer.style.display = 'block';
      loading.style.display = 'none';
      listContainer.innerHTML = `Error: ${err.message}`;
    }
  },
};

export default WKHome;
