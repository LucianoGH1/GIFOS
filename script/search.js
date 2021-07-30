//VARIABLES GLOBALES
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const resultTitle = document.getElementById('resultTitle');
const verMas = document.getElementById('verMas');
const sugContainer = document.getElementById('sugContainer');
const iconSearch = document.getElementById('icon-search');
let offset = 0;
let q;

//FUNCIONES
async function getSearch(q) {
    let apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12&offset=${offset}`;
    let respuesta = await fetch(url);
    let resultado = await respuesta.json();

    resultTitle.textContent = q;
    for (let index = 0; index < 12; index++) {
        let gifCont = document.createElement('div');
        let img = document.createElement('img');
        let gifOverlay = document.createElement('div');
        img.src = resultado.data[index].images.downsized.url;
        img.classList.add('gif');
        gifOverlay.classList.add('gifOverlay');
        gifCont.classList.add('gifBox')
        gifCont.appendChild(img);
        gifCont.appendChild(gifOverlay);

        searchResults.appendChild(gifCont);
    }
    verMas.style.display = ('unset');
}

async function autoComplete(q) {
    let apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${q}`
    let respuesta = await fetch(url);
    let resultado = await respuesta.json();
    let sugerencias = resultado.data;
    sugerencias.forEach(sug => {
        let sugerencia = document.createElement('p');
        sugerencia.textContent = sug.name;
        sugerencia.classList.add('sugerencia');
        sugContainer.appendChild(sugerencia);
        sugerencia.addEventListener('click', () => {
            console.log(sugerencia.textContent);
            searchInput.value = sugerencia.textContent;
            q = sugerencia.textContent;
            while (searchResults.firstElementChild) {
                searchResults.firstElementChild.remove();
            };
            getSearch(q);
            sugContainer.classList.add('hidden');

        })
    });

}

//EVENTOS

verMas.addEventListener('click', () => {
    offset += 12;
    getSearch(q)
});

searchBtn.addEventListener('click', () => {
    if (iconSearch.src === './img/icon-search.svg') {
        while (searchResults.firstElementChild) {
            searchResults.firstElementChild.remove();
        }
        q = searchInput.value;
        offset = 0;
        getSearch(q);
    } else {
        sugContainer.classList.add('hidden');
        iconSearch.src = './img/icon-search.svg';
        searchInput.value = '';
    }
});

searchInput.addEventListener('keydown', () => {
    while (sugContainer.firstElementChild) {
        sugContainer.firstElementChild.remove();
    }
    q = searchInput.value;
    sugContainer.classList.remove('hidden');
    autoComplete(q);

});
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        console.log('success');
        while (searchResults.firstElementChild) {
            searchResults.firstElementChild.remove();
        }
        q = searchInput.value;
        offset = 0;
        getSearch(q);
    }
});

searchInput.addEventListener('keyup', () => {
    if (searchInput.value !== '') {
        console.log('succsess');
        iconSearch.src = './img/close.svg';
    }
})
