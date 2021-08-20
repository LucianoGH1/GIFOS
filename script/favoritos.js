const favGifosParsed = JSON.parse(localStorage.getItem('favGifos'));
const favoritosCont = document.getElementById('favoritosCont');



favGifosParsed.map((fav) => {
    const favGif = document.createElement('img');
    favGif.src = fav.url;
    favGif.classList.add('gif');

    const gifBox = document.createElement('div');
    gifBox.classList.add('gifBox');

    const gifOverlay = document.createElement('div');
    gifOverlay.classList.add('gifOverlay');
    gifOverlay.classList.add('hidden');

    const favBtn = document.createElement('img');
    if (favGifos.find((fav) => fav.url == favGif.url)) {
        favBtn.src = './src/favBtn-active.svg';
    } else {
        favBtn.src = './src/favBtn.svg';   
    }
    favBtn.id = 'favBtn';
    favBtn.classList.add('hov');

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