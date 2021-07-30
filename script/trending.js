const btnSliderLeft = document.getElementById('btn-slider-left');
const btnSliderRight = document.getElementById('btn-slider-right');
const gifCont = document.getElementById('gifCont');
const apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
let gifsUrl = [];

async function getTrending() {
    const url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    const gifsData = resultado.data;

    gifsData.map(gif => { //crea los elementos img para cada gif trending
        let tgif = document.createElement('img');
        let gifBox = document.createElement('div');
        let gifOverlay = document.createElement('div')

        tgif.src = gif.images.downsized.url;
        tgif.classList.add('gif');
        gifOverlay.classList.add('gifOverlay');
        gifBox.classList.add('gifBox')


        gifBox.appendChild(tgif);
        gifBox.appendChild(gifOverlay);
        gifCont.appendChild(gifBox);
    });
}

async function searches() {
    const url = `http://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    console.log(resultado);

}
searches();
getTrending();

btnSliderLeft.onclick = function() {
    gifCont.scrollLeft -= 790;
}
btnSliderRight.onclick = function() {
    gifCont.scrollLeft += 790;
}