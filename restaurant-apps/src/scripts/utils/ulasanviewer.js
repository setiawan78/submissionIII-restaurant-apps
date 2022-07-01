import WaroengKuSource from '../data/waroengku-source';

const PostinganUlasan = async (url, name, review) => {
    const InputDataUlasan = {
        id: url.id,
        name,
        review,
    };

    const ulasanCont = document.querySelector('.detail-review');
    const date = new Date().toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const UlasanBaru = `
        <div class="detail-review-item">
        <div class="review-header">
            <p class="review-name">${name}</p>

            <p class="review-date">${date}</p>
        </div>

        <div class="review-body">
            ${review}
        </div>
        </div>
    `;

    const UlasanResp = await WaroengKuSource.Review_WaroengKu(InputDataUlasan);
    console.log(
        '🚀 ~ file: post-review.js ~ line 33 ~ PostReview ~ reviewResponse',
        UlasanResp,
    );
    ulasanCont.innerHTML += UlasanBaru;
};

export default PostinganUlasan;
