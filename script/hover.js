let hover = document.querySelectorAll(".hov");

const hoverChangeImg = (arr) => {    
    arr.forEach(element => {
        element.addEventListener('mouseover', () => {
            if(element.attributes.src.textContent != './src/favBtn-active.svg') {
                element.src = `src/${element.id}-hover.svg`
            }

        });
        element.addEventListener('mouseout', () => {  
            if(element.attributes.src.textContent != './src/favBtn-active.svg') {
                element.src = `src/${element.id}.svg`;
            }
            
        });
    });
}



