import { getImages } from './js/pixabay-api.js';
import { render } from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imagesList = document.querySelector('.images-list');
const searchForm = document.querySelector('.search-form'); 
const searchBar = document.querySelector('.search-settings');
const loading = document.querySelector('.loading-text');


searchForm.addEventListener('submit', search);

function search(event) {
  event.preventDefault();
  loading.classList.toggle('visually-hidden');
  const query = searchBar.value.trim();
  getImages(query)
    .then(images => {
      loading.classList.toggle('visually-hidden');
      imagesList.innerHTML = '';
      imagesList.insertAdjacentHTML('beforeend', render(images));
      const lightbox = new SimpleLightbox('.images-list a', {
        nav: true,
        captions: true,
        captionsData: 'alt',
        captionDelay: 200,
      });
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    });
  searchBar.value = '';
}