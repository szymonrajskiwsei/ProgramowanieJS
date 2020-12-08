const lightbox = document.createElement('div');
const menu = document.querySelector('.menu');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

const images = document.querySelectorAll('img');
images.forEach(image => {
    image.addEventListener('click', f => {

        lightbox.classList.add('active');
        const img = document.createElement('img');
        img.src = image.src;
        while(lightbox.firstChild)
        {
            lightbox.removeChild(lightbox.firstChild);
        }
        lightbox.appendChild(img);
        menu.classList.add('menu__active');
        lightbox.appendChild(menu);
    });
});

lightbox.addEventListener('click', f => {
    if(f.target != f.currentTarget) return;
    lightbox.classList.remove('active');
});