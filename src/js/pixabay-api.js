import { inputSearch, showLoader } from '../main';


export function fetchPhotoFromPixabay() {
    const inputValueForForm = inputSearch.value.trim().split(',').join('+');
    const searchParams = new URLSearchParams({
        key: "42993354-9366f462d179fd9692b03d8e1",
        q: [inputValueForForm],
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    });
    showLoader();
    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }
        );
}