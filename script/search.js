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

        const gif = document.createElement('img');
        gif.src = resultado.data[index].images.downsized.url;
        gif.classList.add('gif');

        const gifBox = document.createElement('div');
        gifBox.classList.add('gifBox')
        
        const gifOverlay = document.createElement('div');
        gifOverlay.classList.add('gifOverlay');
        gifOverlay.classList.add('hidden')
        
        
        const favBtn = document.createElement('img');
        favBtn.src = './src/favBtn.svg';
        favBtn.id = 'favBtn';
        
        const downloadBtn = document.createElement('img');
        downloadBtn.src = './src/downloadBtn.svg';
        downloadBtn.id = 'downloadBtn';
        
        const expandBtn = document.createElement('img');
        expandBtn.src = './src/expandBtn.svg';
        expandBtn.id = 'expandBtn';
        
        
        const userName = document.createElement('p');
        userName.textContent = 'Usuario';
        
        const gifName = document.createElement('p');
        gifName.textContent = 'Nombre del gif';
        
        const gifInfo = document.createElement('div');
        

        gifOverlay.appendChild(favBtn);
        gifOverlay.appendChild(downloadBtn);
        gifOverlay.appendChild(expandBtn);
        gifInfo.appendChild(userName);
        gifInfo.appendChild(gifName);
        gifOverlay.appendChild(gifInfo);
        gifBox.appendChild(gif);
        gifBox.appendChild(gifOverlay);
        searchResults.appendChild(gifBox);

        gifBox.addEventListener('mouseenter', ()=> {
            gifOverlay.classList.remove('hidden')
        })
        gifBox.addEventListener('mouseleave', ()=> {
            gifOverlay.classList.add('hidden')
        })
    }
    verMas.style.display = ('unset');
}

async function autoComplete(q) {
    const apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
    const url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${apiKey}&q=${q}`
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    const sugerencias = resultado.data;

    sugerencias.forEach(sug => {
        const sugerencia = document.createElement('p');
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
        iconSearch.src = './src/icon-search.svg';
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
        iconSearch.src = './src/close.svg';
    }
})

