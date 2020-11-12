
const localStorageNotesKey = 'notes';
let notes;

notes = JSON.parse(localStorage.getItem(localStorageNotesKey));
if(notes == null)
{
    localStorage.setItem(localStorageNotesKey, JSON.stringify([]));
}

class Note
{
    constructor(title, content, color, pinned)
    {
        this.title = title;
        this.content = content;
        this.color = color;
        this.pinned = pinned;
        this.date = new Date();
    }
}

class PrintNotes
{
    constructor(notes)
    {
        this.notes = notes;
    }

    printNotes()
    {
        for(let note of notes)
        {
            addNote(note);     
        }
    }
}

function onNewNote()
{
    notes = JSON.parse(localStorage.getItem(localStorageNotesKey));

    const title = document.querySelector('#noteTitle').value;
    const content = document.querySelector('#noteContent').value;
    const color = document.querySelector('#noteColor').value;
    let pin = document.querySelector('#pin');
    let isPinned = false;
    if(pin.checked) isPinned = true;

    note = new Note(title, content, color, isPinned, new Date);

    notes.push(note);
    localStorage.setItem(localStorageNotesKey, JSON.stringify(notes));
    addNote(note);
}

const toggleModal = () => { document.querySelector('.modal').classList.toggle('hidden'); }
const toggleModalEdit = () => { document.querySelector('.modalEdit').classList.toggle('hiddenEdit'); }

document.querySelector('#btnAddNote').addEventListener('click', onNewNote);
document.querySelector('#btnNewNote').addEventListener('click', toggleModal);
document.querySelector('#btnAddNote').addEventListener('click', toggleModal);
document.querySelector('.modal__close-bar span').addEventListener('click', toggleModal);
document.querySelector('.modal__edit__close-bar span').addEventListener('click', toggleModalEdit);

localStorage.setItem(localStorageNotesKey, JSON.stringify(notes)); // na tekst
notes = JSON.parse(localStorage.getItem(localStorageNotesKey)); // na obiekt
notes.map(note =>
{
     note.createDate = new Date(note.createDate);
     return note;
});

function addNote(note)
{
    const htmlSection = document.createElement('section');
    const htmlTitle = document.createElement('h3');
    const htmlContent = document.createElement('p');
    const htmlDate = document.createElement('h4');
    const btnDelete = document.createElement('button');
    const btnEdit = document.createElement('button');
    const btnPin = document.createElement('button');

    htmlSection.style.backgroundColor = note.color;

    htmlSection.classList.add('note');
    btnDelete.classList.add('btnNoteDelete');
    btnEdit.classList.add('btnNoteEdit');
    btnPin.classList.add('btnNotePin');

    btnDelete.innerHTML = "&#9747";
    btnEdit.innerHTML = "&#9997";
    btnPin.innerHTML = "&#128204";

    htmlTitle.innerHTML = note.title;
    htmlContent.innerHTML = note.content;
    htmlDate.innerHTML = "Utworzono: " + note.createDate.toLocaleString();

    htmlSection.appendChild(htmlTitle);
    htmlSection.appendChild(htmlDate);
    htmlSection.appendChild(htmlContent);
    
    htmlSection.appendChild(btnDelete);
    htmlSection.appendChild(btnEdit);
    htmlSection.appendChild(btnPin);

    const otherNotes = document.querySelector('.otherNotes');
    const importantNotes = document.querySelector('.importantNotes');

    if(note.pinned) importantNotes.appendChild(htmlSection);
    else otherNotes.appendChild(htmlSection);

    btnDelete.addEventListener('click', () => deleteNote(note, notes, htmlSection));
    btnPin.addEventListener('click', () => pinNote(note, htmlSection));
    btnEdit.addEventListener('click', () => editNote(note, htmlSection));
}

function deleteNote(myNote, noteList, objHtmlNote)
{
    const noteTitle = myNote.title;
    noteList = JSON.parse(localStorage.getItem(localStorageNotesKey));

    const newNoteList = noteList.filter(note => note.title !== noteTitle);
    localStorage.setItem(localStorageNotesKey, JSON.stringify(newNoteList));

    objHtmlNote.remove();
}

function editNote(myNote, objHtmlNote)
{
    const newContent = prompt("Change content for " + myNote.title + " note");
    myNote.content = newContent;
    localStorage.setItem(localStorageNotesKey, JSON.stringify(notes));
}

function pinNote(myNote, objHtmlNote)
{
    if(myNote.pinned) myNote.pinned = false;
    else myNote.pinned = true;

    localStorage.setItem(localStorageNotesKey, JSON.stringify(notes));
    
    objHtmlNote.remove();
    addNote(myNote);
}

let show = new PrintNotes(notes);
show.printNotes();
