let video = document.getElementById('video');
const comenzarBtn = document.getElementById('comenzar');
const grabarBtn = document.getElementById('grabar');
const finalizarBtn = document.getElementById('finalizar');
const subirGifoBtn = document.getElementById('subirGifo');
const crearPaso1 = document.getElementById('crearPaso1');
const crearPaso2 = document.getElementById('crearPaso2');
const paso1 = document.getElementById('paso1');
const paso2 = document.getElementById('paso2');
const paso3 = document.getElementById('paso3');
const timer = document.getElementById('timer');
const repetir = document.getElementById('repetir');

let misGifos;
if(localStorage.getItem('misGifos') !== null){
    misGifos = JSON.parse(localStorage.getItem('misGifos'));
} else {
    misGifos = new Array;
}

console.log(misGifos);

crearPaso1.classList.add('crearPaso');
video.classList.add('hidden');
crearPaso2.classList.add('hidden');
grabarBtn.classList.add('hidden');
finalizarBtn.classList.add('hidden');
subirGifoBtn.classList.add('hidden');
timer.classList.add('hidden');
repetir.classList.add('hidden');


function capturarVideo (){
    paso1.classList.add('pasoActivo');
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    }).then (stream => {
        paso1.classList.remove('pasoActivo');
        paso2.classList.add('pasoActivo');
        video.classList.remove('hidden');
        crearPaso2.classList.remove('crearPaso');
        crearPaso2.classList.add('hidden');
        comenzarBtn.classList.add('hidden');
        grabarBtn.classList.remove('hidden');
        timer.classList.remove('hidden');
        video.srcObject = stream;
        video.play();

        let recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function () {
                console.log('started')
            }
        });
        let timeInterval;
        grabarBtn.addEventListener('click', () => {
            timeInterval = setInterval(cuentaSegundos, 1000);
            grabarBtn.classList.add('hidden');
            finalizarBtn.classList.remove('hidden');
            recorder.startRecording();
        });

        finalizarBtn.addEventListener('click', ()=> {
            clearInterval(timeInterval);
            timer.classList.add('hidden');
            repetir.classList.remove('hidden');
            finalizarBtn.classList.add('hidden');
            subirGifoBtn.classList.remove('hidden');
            repetir.classList.remove('hidden');
            recorder.stopRecording();
        });

        repetir.addEventListener('click', ()=> {
            repetir.classList.add('hidden');
            timer.classList.remove('hidden');
            subirGifoBtn.classList.add('hidden');
            grabarBtn.classList.remove('hidden');
            timer.innerHTML = '00:00:00';
            segundosTotales = 0;
            recorder.reset();
        })


        subirGifoBtn.addEventListener('click', () => {
            paso2.classList.remove('pasoActivo');
            paso3.classList.add('pasoActivo');
            subirGifoBtn.classList.add('hidden');

            let form = new FormData();
            form.append('file', recorder.getBlob(), 'myGif.gif');
            console.log(form.get('file'));

            const apiKey = 'cQpVQAK3NDI6Fwdv9fVjKuWSECsaWeUr';
            const url = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;
            fetch(url, {
                method: 'POST',
                body: form,
            })
            .then(response => response.json())
            .then(result => {
                alert('GIFO subido :)');
                console.log('Success:', result);
                let idDeMiGif = result.data.id;
                misGifos.push(idDeMiGif);
                console.log(misGifos);
                localStorage.setItem('misGifos', JSON.stringify(misGifos));
            });
        })

    }).catch(error => {
        console.error('Error:', error);
    });
}


comenzarBtn.addEventListener('click', ()=> {
    crearPaso1.classList.remove('crearPaso');
    crearPaso1.classList.add('hidden');
    crearPaso2.classList.remove('hidden');
    crearPaso2.classList.add('crearPaso');
    
    capturarVideo();
})

let segundosTotales = 0;
function cuentaSegundos() {
    segundosTotales++;
    let horas = Math.floor(segundosTotales / 3600);
    let minutos = Math.floor((segundosTotales - horas * 3600) / 60);
    let segundos = segundosTotales - (horas * 3600 + minutos * 60);
    if (horas < 10)
        horas = "0" + horas;
    if (minutos < 10)
        minutos = "0" + minutos;
    if (segundos < 10)
        segundos = "0" + segundos;
    timer.innerHTML = horas + ":" + minutos + ":" + segundos;
}
