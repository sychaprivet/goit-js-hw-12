// import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImg } from './js/pixabay-api';
import { createGallery, clearGallery } from './js/render-functions';

const form = document.querySelector('.search-form');
const btn = document.querySelector('.newimg-btn');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
let lightbox = null;
let currentPage = 1;
let currentQuery = '';

loader.hidden = true;
btn.hidden = true;

form.addEventListener('submit', searchImg);

btn.addEventListener('click', addMoreImg);

async function searchImg(event) {
  event.preventDefault();
  currentQuery = event.target.elements.image.value.trim();
  currentPage = 1;
  if (!currentQuery) {
    iziToast.warning({
      message: 'Warning! The form is empty, please fill searching form.',
      position: 'topRight',
    });
    form.reset();
    return;
  }

  clearGallery();
  form.reset();
  btn.hidden = true;
  loader.hidden = false;

  try {
    const data = await fetchImg(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    if (data.hits.length === 15) {
      btn.hidden = false;
    }

    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery-link', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightbox.refresh();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error!',
      position: 'topRight',
    });
  } finally {
    loader.hidden = true;
  }
}

async function addMoreImg() {
  currentPage += 1;
  loader.hidden = false;
  try {
    const data = await fetchImg(currentQuery, currentPage);
    const maxPage = Math.ceil(data.totalHits / 15);
    createGallery(data.hits);
    lightbox.refresh();

    const firstCard = gallery.firstElementChild;
    if (firstCard) {
      const { height: cardHeight } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (currentPage === maxPage) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      btn.hidden = true;
    }
  } catch (error) {
    iziToast.error({
      message: 'Error!',
      position: 'topRight',
    });
  } finally {
    loader.hidden = true;
  }
}