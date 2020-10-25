let valueKey = 0;
const rightImgIndex = valueKey + 1;
const leftImgIndex = valueKey - 1;

const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

leftArrow.addEventListener('click', prevImg);
rightArrow.addEventListener('click', nextImg);

const images = document.querySelectorAll('.gallery img');

for (let index = 0; index < images.length; index++)
{
    const img = images[index];
    img.addEventListener('click', hideLightbox);
    img.addEventListener('click', showLightbox); 
}

function showLightbox(ev)
{
    // pobranie poprzedniego elementu
    const prevEl = ev.target.previousElementSibling;
    const nextEl = ev.target.nextElementSibling;

    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');
    const imgUrl = ev.target.src;
    const imgAlt = ev.target.alt;

    img.src = imgUrl;
    img.alt = imgAlt;

    lightbox.classList.add('visible');
    lightbox.addEventListener('click', hideLightbox);
    
}

// 1 schować element po kliknięciu w szare TO DO --
// 2 opisy do zdjęć
// 3 przejście graficzne
// 4 counter dla grafiki

function hideLightbox()
{
    const lightbox = document.querySelector('.lightbox');
    if(lightbox.classList.contains('visible'))
    {
        lightbox.classList.remove('visible');
        lightbox.removeEventListener('click', hideLightbox);
    }
}

function prevImg(ev)
{ 
    const prevEl = ev.target.previousElementSibling;

    const lightbox = document.querySelector('.lightbox');
    const img = document.querySelector('.lightbox img');

    lightbox.removeEventListener('click', hideLightbox)

    console.log("To jest lewo");
    console.log(prevEl);
}

function nextImg(ev)
{
    console.log("To jest prawo");
}
/*let keyValue = 0; 
const images = document.querySelectorAll('.gallery img');

const main = () =>
{
        images.forEach(image =>
        {
            image.addEventListener('click', image =>
            {
                console.log(image.dataset.key);
                keyValue = parseInt(image.dataset.key);
                const imgLightbox = document.querySelector('.lightbox img');
                imgLightbox.src = image.src;
            });
        });

        document.querySelector('.right').addEventListener('click', () =>
        {
            images.forEach(image =>
            {
                if(image.dataset.key == (keyValue + 1))
                {
                    const imgLightBox = document.querySelector('.lightbox img');
                    imgLightBox.src = image.src;
                }
            })
        });

        document.querySelector('.left').addEventListener('click', () =>
        {
            images.forEach(image =>
            {
                if(image.dataset.key == (keyValue - 1))
                {
                    const imgLightBox = document.querySelector('.lightbox img');
                    imgLightBox.src = image.src;
                }
            })
        });
}

document.addEventListener('DOMContentLoaded', main);*/