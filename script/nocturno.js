const body = document.getElementById("body");
const nocBtn = document.getElementById("nocBtn");
const imgs = document.querySelectorAll(".img");


function cambiarImg() {
    imgs.forEach((img) => {
        const imgId = img.id;
        if(body.className.includes("nocturno")) {
            img.src = `./img/${imgId}-noc.svg`;
        } else {
            img.src = `./img/${imgId}.svg`;
        }
        
    })
}

nocBtn.addEventListener("click", ()=>{
    body.classList.toggle("nocturno");
    cambiarImg();
    
    if(body.className.includes("nocturno")) {
        nocBtn.textContent = "Modo diurno";
    } else {
        nocBtn.textContent = "Modo nocturno";
    }
});



