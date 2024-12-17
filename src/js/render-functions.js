export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      image =>
        `<li class="gallery-item">
        <div class="img-div">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img src="${image.webformatURL}"
        alt="${image.tags}"/>
        </a>
        </div>
        <div class="descr-list">
        <div class="descr-item">
        <b class="info">Likes</b>
        <span class="value">${image.likes}</span>
        </div>
        <div class="descr-item">
        <b class="info">Views</b>
        <span class="value">${image.views}</span>
        </div>
        <div class="descr-item">
        <b class="info">Comments</b>
        <span class="value">${image.comments}</span>
        </div>
        <div class="descr-item">
        <b class="info">Downloads</b>
        <span class="value">${image.downloads}</span>
        </div>
        </div>
        </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}