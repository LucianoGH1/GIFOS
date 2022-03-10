let favGifosParsed = JSON.parse(localStorage.getItem('favGifos'));
const favoritosCont = document.getElementById('favoritosCont');
const favoritosSinContenido = document.getElementById('favoritosSinContenido');

if (localStorage.getItem('favGifos') != '[]') {
    favoritosSinContenido.style.display = 'none';
}

favGifosParsed.map((fav) => {
    const favGif = document.createElement('img');
    favGif.src = fav.url;
    favGif.classList.add('gif');
    favGif.addEventListener('click', () => {
        expandGif(fav)
    })

    const gifBox = document.createElement('div');
    gifBox.classList.add('gifBox');

    const gifOverlay = document.createElement('div');
    gifOverlay.classList.add('gifOverlay');
    gifOverlay.classList.add('hidden');

    const favBtn = document.createElement('img');

    if (favGifos.find((fav) => fav.url == favGif.src)) {
        favBtn.src = './src/favBtn-active.svg';
    } else {
        favBtn.src = './src/favBtn.svg';   
    }

    favBtn.addEventListener('click', () => { 
        if (favGifos.find((fav) => fav.url == favGif.src)) {
            const favIndex = favGifosParsed.indexOf(fav); 
            favGifos.splice(favIndex, 1);
            console.log(favGifos);
            localStorage.setItem('favGifos', JSON.stringify(favGifos))
            favBtn.src = './src/favBtn.svg';   
        } else {
            
            
        }
    })
    favBtn.id = 'favBtn';
    favBtn.classList.add('hov');

    const downloadBtn = document.createElement('img');
    downloadBtn.classList.add('hov');
    downloadBtn.src = './src/downloadBtn.svg';
    downloadBtn.id = 'downloadBtn';
    downloadBtn.addEventListener('click', () => {
        console.log(fav.images.original.url);
        downloadEvent(fav); 
    });

    const expandBtn = document.createElement('img');
    expandBtn.classList.add('hov');
    expandBtn.src = './src/expandBtn.svg';
    expandBtn.id = 'expandBtn';
    expandBtn.addEventListener('click', () => {
        expandGif(fav);
    })

    const gifInfo = document.createElement('div');
    const userName = document.createElement('p');
    userName.textContent = fav.username;
    const gifName = document.createElement('p');
    gifName.textContent = fav.title;

    gifOverlay.appendChild(favBtn);
    gifOverlay.appendChild(downloadBtn);
    gifOverlay.appendChild(expandBtn);
    gifInfo.appendChild(userName);
    gifInfo.appendChild(gifName);
    gifOverlay.appendChild(gifInfo);
    gifBox.appendChild(favGif);
    gifBox.appendChild(gifOverlay);

    gifBox.addEventListener('mouseenter', ()=> {
        gifOverlay.classList.remove('hidden')
        gifOverlay.classList.add('gifOverlayLayout')

    });
    gifBox.addEventListener('mouseleave', ()=> {
        gifOverlay.classList.remove('gifOverlayLayout')
        gifOverlay.classList.add('hidden')
    });




    favoritosCont.appendChild(gifBox);
})