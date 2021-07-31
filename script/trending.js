const btnSliderLeft = document.getElementById('btn-slider-left');
const btnSliderRight = document.getElementById('btn-slider-right');
const gifCont = document.getElementById('gifCont');
const apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
const gifsUrl = [];



async function getTrending() {
    const url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    const gifsData = resultado.data;

    gifsData.map(gif => { //crea los elementos img para cada gif trending
        const tgif = document.createElement('img');
        tgif.src = gif.images.downsized.url;
        tgif.classList.add('gif');

        const gifBox = document.createElement('div');
        gifBox.classList.add('gifBox');

        const gifOverlay = document.createElement('div');
        gifOverlay.classList.add('gifOverlay');
        gifOverlay.classList.add('hidden');

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

        

        gifOverlay.appendChild(favBtn);
        gifOverlay.appendChild(downloadBtn);
        gifOverlay.appendChild(expandBtn);
        gifOverlay.appendChild(userName);
        gifOverlay.appendChild(gifName);
        gifBox.appendChild(tgif);
        gifBox.appendChild(gifOverlay);
        gifCont.appendChild(gifBox);

        gifBox.addEventListener('mouseenter', ()=> {
            gifOverlay.classList.remove('hidden')
            gifOverlay.classList.add('gifOverlayLayout')

        })
        gifBox.addEventListener('mouseleave', ()=> {
            gifOverlay.classList.remove('gifOverlayLayout')
            gifOverlay.classList.add('hidden')
        })
    });
}

async function searches() {
    const url = `http://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

}
searches();
getTrending();

btnSliderLeft.onclick = function() {
    gifCont.scrollLeft -= 790;
}
btnSliderRight.onclick = function() {
    gifCont.scrollLeft += 790;
}
