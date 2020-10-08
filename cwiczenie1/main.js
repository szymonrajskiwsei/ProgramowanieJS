// 1. Pobierz ref do obiektu
// const firstImg = document.getElementById('firstImage');
// const firstImg = document.querySelector('img');

// 2. zapisz zdarzenie do onClick

// firstImg.onclick = showLightbox;
// firstImg.addEventListener('click', showLightbox);

// function showLightbox(ev)
// {
//     console.log(ev.target.src);
// }



// pobierz wszystkie elementy gallery
let selectedImgIndex; // przechowuje wszystkie grafiki z .gallery

const images = document.querySelectorAll('.gallery img');
for (let index = 0; index < images.length; index++)
{
    const img = images[index];
    img.addEventListener('click', showLightbox);
    img.addEventListener('click', hideLightbox);
}

function showLightbox(ev)
{
    // pobranie poprzedniego elementu
    const prevEl = ev.target.prevElementSibling;
    const nextEl = ev.target.nextElementSibling;

    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;

    img.src = imgUrl;

    lightbox.classList.add('visible');
    console.log(ev.target.src);
}

// schować element po kliknięciu w szare TO DO
// opisy do zdjęć
// przejście graficzne
// counter dla grafiki

function hideLightbox(ev)
{

}