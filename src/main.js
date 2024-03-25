'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImg } from './js/pixabay-api';

const gallerySimple = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// fetchImg()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));
const btn = document.querySelector('button[type="submit"]');
const imgList = document.querySelector('.images-list');
const form = document.querySelector('.js-form');
const jsInput = document.querySelector('input[name="js-input"]');
const loader = document.querySelector('.loader');
loader.style.display = 'none';

form.addEventListener('submit', searchForm);


function searchForm(evt) {
  evt.preventDefault();
  loader.style.display = 'block';
  const inputValue = evt.currentTarget.elements['js-input'].value;
  if (!inputValue) {
    btn.disabled = true;
    iziToast.show({
      message: 'Please, enter the value!',
    });
  } else {
    fetchImg(inputValue)
      .then(res => {
       
        if (res.total === 0) {
          iziToast.show({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            backgroundColor: 'rgb(239, 64, 64)',
          });
        } else {
          
          imgList.innerHTML = '';
          imgList.insertAdjacentHTML('beforeend', createMarkup(res.hits));
          gallerySimple.refresh();
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        
        loader.style.display = 'none';
      });
  }
}

function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery__item">
        <div class="gallery__card">
          <a href="${largeImageURL}" class="gallery-card__link"
            ><img src="${webformatURL}" alt="${tags}" class="gallery-card__image"
          /></a>
          <div class="gallery-card__description">
            <p class="gallery-card__text">Likes <span>${likes}</span></p>
            <p class="gallery-card__text">Views <span>${views}</span></p>
            <p class="gallery-card__text">Comments <span>${comments}</span></p>
            <p class="gallery-card__text">Downloads <span>${downloads}</span></p>
          </div>
        </div>
      </li>`;
      }
    )
    .join('');
}

jsInput.addEventListener('input', function () {
  btn.disabled = false;
});

imgList.addEventListener('click', function (evt) {
  evt.preventDefault();
});