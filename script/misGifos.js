let misGifosParsed = JSON.parse(localStorage.getItem('misGifos')); 
const misGifosSinContenido = document.getElementById('misGifosSinContenido');
const misGifosCont = document.getElementById('misGifosCont');

if(localStorage.getItem('misGifos') != null && localStorage.getItem('misGifos') != '[]') {
    misGifosSinContenido.style.display = 'none';
};

console.log(misGifosParsed);

async function getMisGifs (x) {
    const apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
    const ID = x;
    const url = `https://api.giphy.com/v1/gifs/${ID}?api_key=${apiKey}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    const miGifUrl = resultado.data.images.downsized.url;

    const gif = { 
        url: miGifUrl,
        title: '',
        username: 'Luciano_Ghitta',
        images: resultado.data.images
    };

    const gifImg = document.createElement('img');
    gifImg.classList.add('gif');
    gifImg.src = miGifUrl;
    gifImg.addEventListener('click', () => {
        expandGif(gif)
    })

    const gifBox = document.createElement('div');
    gifBox.classList.add('gifBox');

    const gifOverlay = document.createElement('div');
    gifOverlay.classList.add('gifOverlay');
    gifOverlay.classList.add('hidden');

    const deleteBtn = document.createElement('img');
    deleteBtn.classList.add('hov');
    deleteBtn.src = './src/icon-trash.svg';
    deleteBtn.id = 'icon-trash';
    
    deleteBtn.addEventListener(('click'), () => {
        const gifIndex = misGifosParsed.indexOf(ID);  
        misGifosParsed.splice(gifIndex, 1);
        console.log(misGifosParsed);
        localStorage.setItem('misGifos', JSON.stringify(misGifosParsed));

    });


    const downloadBtn = document.createElement('img');
    downloadBtn.classList.add('hov');
    downloadBtn.src = './src/downloadBtn.svg';
    downloadBtn.id = 'downloadBtn';
    downloadBtn.addEventListener('click', () => {
        downloadEvent(gif); 
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
    userName.textContent = gif.username;
    const gifName = document.createElement('p');
    gifName.textContent = gif.title;



    gifOverlay.appendChild(deleteBtn);
    gifOverlay.appendChild(downloadBtn);
    gifOverlay.appendChild(expandBtn);
    gifInfo.appendChild(userName);
    gifInfo.appendChild(gifName);
    gifOverlay.appendChild(gifInfo);
    gifBox.appendChild(gifImg);
    gifBox.appendChild(gifOverlay);
    misGifosCont.appendChild(gifBox);

    gifBox.addEventListener('mouseenter', ()=> {
        gifOverlay.classList.remove('hidden')
        gifOverlay.classList.add('gifOverlayLayout')

    });
    gifBox.addEventListener('mouseleave', ()=> {
        gifOverlay.classList.remove('gifOverlayLayout')
        gifOverlay.classList.add('hidden')
    });
};

misGifosParsed.map((gifId)=> {
    getMisGifs(gifId);
}); 

