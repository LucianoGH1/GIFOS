const btnSliderLeft = document.getElementById('btn-slider-left');
const btnSliderRight = document.getElementById('btn-slider-right');
const gifCont = document.getElementById('gifCont');
const apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
const gifsUrl = [];

let favGifos;
if(localStorage.getItem('favGifos') !== null){
    favGifos = JSON.parse(localStorage.getItem('favGifos'));
} else {
    favGifos = new Array;
}



async function getTrending() {
    const url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    const gifsData = resultado.data;

    gifsData.map(g => { //crea los elementos img para cada gif trending
        const gif = document.createElement('img');
        gif.src = g.images.downsized.url;
        gif.classList.add('gif');

        const gifBox = document.createElement('div');
        gifBox.classList.add('gifBox');

        const gifOverlay = document.createElement('div');
        gifOverlay.classList.add('gifOverlay');
        gifOverlay.classList.add('hidden');

        const favGif = { 
            url: gif.attributes.src.nodeValue,
            title: g.title,
            userName: g.username
        };
        const favBtn = document.createElement('img');
        if (favGifos.find((fav) => fav.url == favGif.url)) {
            favBtn.src = './src/favBtn-active.svg';
        } else {
            favBtn.src = './src/favBtn.svg';   
        }
        favBtn.id = 'favBtn';
        favBtn.classList.add('hov');

        favBtn.addEventListener('click', () => {  //agregar esto a favoritos.js
            if (favGifos.find((fav) => fav.url == favGif.url)) {
                console.log('gif ya esta en favoritos');
            } else {
                console.log('gif agregado a favs');
                localStorage.getItem('favGifos')
                favGifos.push(favGif);              
                console.log(favGifos);
                localStorage.setItem('favGifos', JSON.stringify(favGifos))
                favBtn.src = './src/favBtn-active.svg';
            }
        })
        

        const downloadBtn = document.createElement('img');
        downloadBtn.classList.add('hov');
        downloadBtn.src = './src/downloadBtn.svg';
        downloadBtn.id = 'downloadBtn';

        const expandBtn = document.createElement('img');
        expandBtn.classList.add('hov');
        expandBtn.src = './src/expandBtn.svg';
        expandBtn.id = 'expandBtn';

        const gifInfo = document.createElement('div');

        const userName = document.createElement('p');
        userName.textContent = g.username;
        const gifName = document.createElement('p');
        gifName.textContent = g.title;

        

        gifOverlay.appendChild(favBtn);
        gifOverlay.appendChild(downloadBtn);
        gifOverlay.appendChild(expandBtn);
        gifInfo.appendChild(userName);
        gifInfo.appendChild(gifName);
        gifOverlay.appendChild(gifInfo);
        gifBox.appendChild(gif);
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
    hover = document.querySelectorAll(".hov");
    hoverChangeImg(hover);
}

getTrending();



btnSliderLeft.onclick = function() {
    gifCont.scrollLeft -= 790;
}
btnSliderRight.onclick = function() {
    gifCont.scrollLeft += 790;
}



