import CONFIG from '../../globals/config';

const TemplatesDetail = (waroeng) => `
  <div class="detail">
    <div class="img-container">
        <img class="detail-img" alt="${waroeng.name}" src="${
  CONFIG.BASE_IMAGE_URL + waroeng.pictureId
}"/>
    </div>

    <ul class="detail-info">
      <li>
        <i title="restaurant" class="fas fa-store-alt icon-primary"></i>
        <p class="detail-name-address-rating">${waroeng.name}</p>
        </li>

      <li>
        <i title="address" class="fas fa-map-marker-alt icon-primary"></i>
        <p class="detail-name-address-rating">${waroeng.address}, ${
  waroeng.city
}</p>
        </li>

      <li>
        <i title="ratings" class="fas fa-star icon-primary2"></i>
        <p class="detail-name-address-rating">${waroeng.rating}</p>
      </li>

      <li><p class="detail-desc">${waroeng.description}</p></li>
    </ul>

    <h3>Menu</h3>
    <div class="menu">
      <div class="menu-mkn">
        <h4>Makanan Menu:</h4>
        <ul>
          ${waroeng.menus.foods
            .map(
              (food, i) => `
                <li><p>${i + 1}) ${food.name}</p></li>
              `,
            )
            .join('')}
        <ul>
      </div>

      <div class="menu-mnm">
        <h4>Minuman Menu:</h4>
        <ul>
          ${waroeng.menus.drinks
            .map(
              (drink, i) => `
                <li><p>${i + 1}) ${drink.name}</p></li>
              `,
            )
            .join('')}
        <ul>
      </div>
    </div>

    <h3>Ulasan</h3>

    <div class="reviewer">
    ${waroeng.customerReviews
      .map(
        (ulasan) => `
          <div class="reviewer-item">
            <div class="reviewer-header">
              <p class="nama-viewer">${ulasan.name}</p>

              <p class="date-viewer">${ulasan.date}</p>
            </div>

            <div class="viewer">
              ${ulasan.review}
            </div>
          </div>
        `,
      )
      .join('')}
    </div>
  </div>
`;

export default TemplatesDetail;
