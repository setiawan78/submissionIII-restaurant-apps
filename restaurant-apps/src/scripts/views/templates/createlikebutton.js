const createLikeWaroengkuButtonTemplate = () => `
    <button aria-label="like this waroeng" id="likeButton" class="like">
      <i class="far fa-heart" aria-hidden="true"></i>
    </button>
  `;

const createUnLikedWaroengkuButtonTemplate = () => `
    <button aria-label="unlike this waroeng" id="likeButton" class="like">
      <i class="fas fa-heart" aria-hidden="true"></i>
    </button>
  `;

  export { createLikeWaroengkuButtonTemplate, createUnLikedWaroengkuButtonTemplate };
