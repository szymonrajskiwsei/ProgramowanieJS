const lightbox = document.createElement('div');
const menu = document.querySelector('.menu');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
let currentImg;
const img = document.createElement('img');

const images = [...document.querySelectorAll('img')]; // na tablice
images.forEach(image => {
    image.addEventListener('click', f => {

        currentImg = image.getAttribute("data-number");
        lightbox.classList.add('active');

        img.src = image.src;
        while(lightbox.firstChild)
        {
            lightbox.removeChild(lightbox.firstChild);
        }

        lightbox.appendChild(img);
        menu.classList.add('menu__active');
        lightbox.appendChild(menu);
        console.log(currentImg);
    });
});

console.log(images);

btnPrev.addEventListener('click', () => {
    currentImg--;
    if(currentImg < 0) currentImg = 5;
    img.src = images[currentImg].src;
});

btnNext.addEventListener('click', () => {
    currentImg++;
    if(currentImg > 5) currentImg = 0;
    img.src = images[currentImg].src;
});

lightbox.addEventListener('click', f => {
    if(f.target != f.currentTarget) return;
    lightbox.classList.remove('active');
});