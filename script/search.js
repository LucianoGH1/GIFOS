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
    const gifData = resultado.data;
    resultTitle.textContent = q;

    for (let index = 0; index < 12; index++) {
        const g = resultado.data[index];
        console.log(g);
        const gif = document.createElement('img');
        gif.src = g.images.downsized.url;
        gif.classList.add('gif');

        const gifBox = document.createElement('div');
        gifBox.classList.add('gifBox')
        
        const gifOverlay = document.createElement('div');
        gifOverlay.classList.add('gifOverlay');
        gifOverlay.classList.add('hidden')
        
        const favGif = { url: gif.attributes.src.nodeValue };
        const favBtn = document.createElement('img');
        if (favGifos.find((fav) => fav.url == favGif.url)) {
            favBtn.src = './src/favBtn-active.svg';
        } else {
            favBtn.src = './src/favBtn.svg';   
        }
        favBtn.id = 'favBtn';
        favBtn.classList.add('hov');
        favBtn.addEventListener('click', () => {
            if (favGifos.find((fav) => fav.url == favGif.url)) {
                console.log('gif ya esta en favoritos');
            } else {
                localStorage.getItem('favGifos')
                favGifos.push(favGif);              
                console.log(favGifos);
                localStorage.setItem('favGifos', JSON.stringify(favGifos));
                favBtn.src = './src/favBtn-active.svg';
            }
        })
        
        const downloadBtn = document.createElement('img');
        downloadBtn.src = './src/downloadBtn.svg';
        downloadBtn.id = 'downloadBtn';
        downloadBtn.classList.add('hov');
        
        const expandBtn = document.createElement('img');
        expandBtn.src = './src/expandBtn.svg';
        expandBtn.id = 'expandBtn';
        expandBtn.classList.add('hov');
        
        
        const userName = document.createElement('p');
        userName.textContent = g.username;
        
        const gifName = document.createElement('p');
        gifName.textContent = g.title;
        
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
    hover = document.querySelectorAll(".hov");
    hoverChangeImg(hover);
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
        while (searchResults.firstElementChild) {
            searchResults.firstElementChild.remove();
        }
        q = searchInput.value;
        offset = 0;
        getSearch(q);
        sugContainer.classList.add('hidden');
    }
});

searchInput.addEventListener('keyup', () => {
    if (searchInput.value !== '') {
        iconSearch.src = './src/close.svg';
    }
})

