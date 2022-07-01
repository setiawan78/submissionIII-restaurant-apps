import CONFIG from '../../globals/config';

const WKTemplate = (waroeng) => `
        <div class="card">
        
          <div class="img-container">
            <img class="c_image" crossorigin="anonymous" alt="${
          waroeng.name
        }" src="${CONFIG.BASE_IMAGE_URL + waroeng.pictureId}"/>
            <span class="c_rating">
              <i title="ratings" class="fa fa-star"></i>
              <span>${waroeng.rating}</span>
            </span>
          </div>

          <div class="card-content">
            <a href="#/waroeng/${waroeng.id}" class="card-a-tag">
            <h2 tabindex="0" class="judul-konten">${waroeng.name}</h2>
            </a>
            <p class="kota">${waroeng.city}</p>
            <p class="deskripsi">${waroeng.description}</p>
          </div>
        
        </div>
    `;

export default WKTemplate;
