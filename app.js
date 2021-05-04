const auth = "563492ad6f91700001000001796a2f8e7d8d41999574abe8c28e8046";

const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

const more = document.querySelector(".more");

let page = 1;
let fetchLink;
let currentSearch;


//Event listiners

searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
})


more.addEventListener("click", loadMore);

function updateInput(e) {
    searchValue = e.target.value;
}


async function fetchApi(url) {
    const datafetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await datafetch.json();
    return data;
}

function generatePictures(data) {
    data.photos.forEach(photo => {
        //console.log(photo);
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `
        <div class ="gallery-info">
            <p>${photo.photographer}</p>
            <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>`;
        gallery.append(galleryImg);
    });
}


async function curatedPhotos() {
    fetchLink = "https://api.pexels.com/v1/curated?per_page=20&page=1";
    const data = await fetchApi(fetchLink);
    //console.log(data);
    generatePictures(data);
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=20&page=1`;
    const data = await fetchApi(fetchLink);
    //console.log(data);
    generatePictures(data);
}

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore() {
    console.log(currentSearch);
    page++
    if (currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=20&page=${page}`;
    }
    else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=20&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePictures(data);
}


curatedPhotos();
