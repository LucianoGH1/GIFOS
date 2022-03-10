const btnSliderLeft = document.getElementById('btn-slider-left');
const btnSliderRight = document.getElementById('btn-slider-right');
const gifCont = document.getElementById('gifCont');
const apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
const gifsUrl = [];
const trendingTermsCont = document.getElementById('trendingTermsCont');
const trending_topics = document.getElementById('trending_topics');


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
        const gif = { 
            url: g.images.downsized.url,
            title: g.title,
            userName: g.username,
            images: g.images
        };
        const gifImg = document.createElement('img');
        gifImg.src = g.images.downsized.url;
        gifImg.classList.add('gif');
        gifImg.addEventListener('click', () => {
            expandGif(gif)
        })
        
        const gifBox = document.createElement('div');
        gifBox.classList.add('gifBox');

        const gifOverlay = document.createElement('div');
        gifOverlay.classList.add('gifOverlay');
        gifOverlay.classList.add('hidden');

        const favBtn = document.createElement('img');
        if (favGifos.find((fav) => fav.url == gif.url)) {
            favBtn.src = './src/favBtn-active.svg';
        } else {
            favBtn.src = './src/favBtn.svg';   
        }
        favBtn.id = 'favBtn';
        favBtn.classList.add('hov');

        favBtn.addEventListener('click', () => {  //agregar esto a favoritos.js
            addToFavs (gif, favBtn);
        })
        
        const downloadBtn = document.createElement('img');
        downloadBtn.classList.add('hov');
        downloadBtn.src = './src/downloadBtn.svg';
        downloadBtn.id = 'downloadBtn';
        downloadBtn.addEventListener('click', () => {
            downloadEvent(g); 
        });

        const expandBtn = document.createElement('img');
        expandBtn.classList.add('hov');
        expandBtn.src = './src/expandBtn.svg';
        expandBtn.id = 'expandBtn';
        expandBtn.addEventListener('click', () => {
            expandGif(gif);
        })

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
        gifBox.appendChild(gifImg);
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

async function getTrendingTerms () {
    const url = `http://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    const arr = resultado.data;
    const trendingTerms = arr.slice(0,5)
    
    let x = 1;
    trendingTerms.map(term => {
        const trendingLink = document.createElement('a');
        trendingLink.textContent = term;
        trendingLink.addEventListener('click', () => {
            const q = trendingLink.textContent;
            getSearch(q);
            trending_topics.classList.add('hidden')
        })
        trendingTermsCont.appendChild(trendingLink);


        if (x < 5) {
            const comaSeparadora = document.createElement('p');
            comaSeparadora.textContent = ', ';
            trendingTermsCont.appendChild(comaSeparadora);
        }
        x++;
    })

}
if (trendingTermsCont != null) {
    getTrendingTerms ()

}

function addToFavs (gif, favBtn) {
    if (favGifos.find((fav) => fav.url == gif.url)) {
        console.log('gif eliminado de favoritos');
        favGifosParsed = JSON.parse(localStorage.getItem('favGifos'));
        let gifIndex = favGifosParsed.indexOf(favGifosParsed.find((fav) => fav.title == gif.title));

        favGifos = JSON.parse(localStorage.getItem('favGifos'));
        favGifos.splice(gifIndex, 1);
        localStorage.setItem('favGifos', JSON.stringify(favGifos))
        favBtn.src = './src/favBtn.svg';   

    } else {
        console.log('gif agregado a favs');
        favGifos.push(gif);              
        console.log(favGifos);
        localStorage.setItem('favGifos', JSON.stringify(favGifos))
        favBtn.src = './src/favBtn-active.svg';
        console.log(favBtn.src);
    }
}
function downloadEvent(gif){
    (async () => {
        let a = document.createElement('a');
        let response = await fetch(`${gif.images.original.url}`);
        let file = await response.blob();
        a.download = gif.id;
        a.href = window.URL.createObjectURL(file);
        a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
        a.click();
    })();
}

function expandGif(gif) {
    const popUpCont = document.createElement('div');
    const popUpGifCard = document.createElement('div');
    const closeBtn = document.createElement('img');
    const popUpGif = document.createElement('img');
    const popUpInfoAndBtns = document.createElement('div');
    const popUpInfo = document.createElement('div');
    const popUpTitle = document.createElement('p');
    const popUpUser = document.createElement('p');
    const popUpBtns = document.createElement('div');
    const favBtn = document.createElement('img');
    const downloadBtn = document.createElement('img');
    const body = document.getElementById('body');
    
    popUpCont.classList.add('popUpCont');
    closeBtn.classList.add('closeBtn');
    popUpGifCard.classList.add('popUpGifCard');
    popUpGif.classList.add('popUpGif');
    popUpInfoAndBtns.classList.add('popUpInfoAndBtns');
    popUpInfo.classList.add('popUpInfo');
    popUpBtns.classList.add('popUpBtns');
    downloadBtn.classList.add('hov');
    favBtn.classList.add('hov');

    popUpGif.src = gif.url;
    closeBtn.src = './src/close.svg';
    popUpTitle.textContent = `${gif.title}`;
    popUpUser.textContent = `${gif.userName}`;
    if (favGifos.find((fav) => fav.url == gif.url)) {
        favBtn.src = './src/favBtn-active.svg';
    } else {
        favBtn.src = './src/favBtn.svg';   
    }
    downloadBtn.src = './src/downloadBtn.svg';

    favBtn.addEventListener('click', () => {
        addToFavs(gif, favBtn)
    })
    downloadBtn.addEventListener('click', () => {
        downloadEvent(gif)
    })

    closeBtn.addEventListener('click', () => {
        const popup = document.querySelector('.popUpCont');
        popup.parentElement.removeChild(popup);
    })



    body.appendChild(popUpCont);
    popUpCont.appendChild(popUpGifCard);
    popUpCont.appendChild(closeBtn);
    popUpGifCard.appendChild(popUpGif);
    popUpGifCard.appendChild(popUpInfoAndBtns);
    popUpInfoAndBtns.appendChild(popUpInfo);
    popUpInfoAndBtns.appendChild(popUpBtns);
    popUpInfo.appendChild(popUpTitle);
    popUpInfo.appendChild(popUpUser);
    popUpBtns.appendChild(favBtn);
    popUpBtns.appendChild(downloadBtn);
    
}


btnSliderLeft.onclick = function() {
    gifCont.scrollLeft -= 790;
}
btnSliderRight.onclick = function() {
    gifCont.scrollLeft += 790;
}




