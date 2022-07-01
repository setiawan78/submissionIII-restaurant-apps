import UrlParser from '../../routes/url-parser';
import Loaded from '../templates/load';
import WaroengKuSource from '../../data/waroengku-source';
import TemplatesDetail from '../templates/templates-detail';
import PostinganUlasan from '../../utils/ulasanviewer';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { sendDataToWebsocket } from '../../utils/websocket-initiator';
import FavoritWaroengkuIdb from '../../data/favoritwaroengku-idb';

const WKDetail = {
  async render() {
    return `
      <div class="container">
      <div id="loading"></div>

      <div class="like" id="likeButtonContainer"></div>

      <div id="main-container">
        <h2 class="title-container">Waroengku Detail</h2>

        <section id="detail-sect"></section>

        <div class="form-review">
          <form autocomplete="on">
            <div class="mb-3">
              <label for="inp-nama" class="form-label">Nama</label>
              <input type="text" class="form-control" id="inp-nama" minlength="3" placeholder="Your name..." required>
            </div>

            <div class="mb-3">
              <label for="inp-ulasan" class="form-label">Ulasan</label>
              <input type="text" class="form-control" id="inp-ulasan" minlength="3" placeholder="Your review..." required>
            </div>
            <button id="submit-ulasanviewer" type="submit" class="submit-btnulasan">Submit Ulasan</button>
          </form>
        </div>
        </div>
        </div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loading = document.querySelector('#loading');
    const mainContainer = document.querySelector('#main-container');
    const detaillWaroeng = document.querySelector('#detail-sect');

    mainContainer.style.display = 'none';
    loading.innerHTML = Loaded();
    try {
      const data = await WaroengKuSource.Detail_WaroengKu(url.id);
      console.info(data);
      detaillWaroeng.innerHTML += TemplatesDetail(data.restaurant);

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        data,
      });

      mainContainer.style.display = 'block';
      loading.style.display = 'none';
      const btnSubmitReview = document.querySelector('#submit-ulasanviewer');
      const Inputname = document.querySelector('#inp-nama');
      const Inputulasan = document.querySelector('#inp-ulasan');
      btnSubmitReview.addEventListener('click', async (e) => {
        e.preventDefault();

        await PostinganUlasan(url, Inputname.value, Inputulasan.value);

        sendDataToWebsocket({
          name: Inputname.value,
          review: Inputulasan.value,
        });

        Inputname.value = '';
        Inputulasan.value = '';
      });
    } catch (err) {
      console.error(err);
      mainContainer.style.display = 'block';
      loading.style.display = 'none';
      detaillWaroeng.innerHTML = `Error: ${err.message}`;
    }

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteWaroengku: FavoritWaroengkuIdb,
      waroengku: {
        id: waroengku.id,
        name: data.waroengku.name,
        description: data.waroengku.description,
        pictureId: data.waroengku.pictureId,
        city: data.waroengku.city,
        rating: data.waroengku.rating,
      },
    });
  },
};

export default WKDetail;
