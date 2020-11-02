//okno dodawania notatki
const toggleModal = () => 
{
    document.querySelector('.modal').classList.toggle('hidden');
}

document.querySelector('#btnNewNote').addEventListener('click', toggleModal);
document.querySelector('#btnAddNote').addEventListener('click', toggleModal);
document.querySelector('.modal__close-bar span').addEventListener('click', toggleModal);

const localStorageNotesKey = 'notes';
let notes = [];

document.querySelector('#btnAddNote').addEventListener('click', onNewNote);

function onNewNote()
{
    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    console.log(title, content);

    alert("xD");

    const note =
    {
        title: 'nowa notatka',
        content: 'treść',
        color: '#ff0000',
        pinned: false,
        createDate: new Date()
    };

    notes.push(note);
}
/*

// tablica zapisana w local storage
localStorage.setItem(localStorageNotesKey, JSON.stringify(notes)); // na tekst

// odczyt tablicy notatek
/*notes = JSON.parse(localStorage.getItem(localStorageNotesKey)); // na obiekt
notes.notes.map(note =>
{
    note.createDate = new Date(note.createDate);
    return note;
});

/*zmiana html-a z js - sposób niefajny
for(let note of notes){
    const htmlNote = `
        <section class="note">
        <h1>${note.title}</h1>
        <p>${note.content}</p>
        <h4>${note.createDate.toLocaleString()}</h4>
        </section>
    `;
    const main = document.querySelector('main');
    main.innerHTML += htmlNote;
}*/

for(let note of notes){

    const htmlSection = document.createElement('section');
    const htmlTitle = document.createElement('h1');
    const htmlContent = document.createElement('p');
    const htmlDate = document.createElement('h4');

    htmlSection.classList.add('note');
    htmlTitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlDate.innerHTML = note.createDate.toLocaleString();

    htmlSection.appendChild(htmlTitle);
    htmlSection.appendChild(htmlContent);
    htmlSection.appendChild(htmlDate);

    const main = document.querySelector('main');
    main.appendChild(htmlSection);
}

// usuwanie elementów
// main.removeChild();