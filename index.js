// This is the addNote button
let addBtn = document.getElementById('addBtn');
// This is the add to important button
let impBtn = document.getElementById('impBtn');
// This is the noteCard section
let noteCard = document.getElementById("note");
// This is the importantNoteCard section
let impNoteCard = document.getElementById("impNote");
// This is the search input tag
let search = document.getElementById('searchTxt');


// These two functions are called at the beginning to show the added notes and important notes on reloading the page.
notesAppear();
impNotesAppear();

// Notes Section
// This event manages the localstorage and stores the added note in the localstorage in notes section
addBtn.addEventListener('click', (e) => {
    let notes = localStorage.getItem("notes");
    let notesTxt = document.getElementById('floatingTextarea2');
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(notesTxt.value);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    notesTxt.value = "";

    notesAppear();
})
// This function appears the added notes
function notesAppear() {
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if ((notes == null) || (notes == '[]')) {
        notesObj = [];
        noteCard.innerHTML = `<p>You don't have any notes to show yet! Please add notes to show😊</p>
        <hr>`
    }
    else {
        notesObj = JSON.parse(notes);
        let html = ""
        notesObj.forEach((element, index) => {
            html += `<div  class=" notescard my-2 mx-2 card" style="width: 20rem;">
    
            <div class="card-body">
                <h5 class="card-title">Note-${index + 1}</h5>
                <p class="card-text">${element}</p>
                <a onclick="noteDelete(${index})" class="btn btn-primary">Delete Note</a>
                <a onclick="delAll()"class="btn btn-primary">Delete All</a>
            </div>
        </div>`
        });
        noteCard.innerHTML = html;
    }
}
// This function deletes the added note
function noteDelete(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    notesAppear();
}
// This event filters the notes by search
search.addEventListener('input', (e) => {
    if (e.target.value != "") {
        let ctr = 0;
        let searchTxt = search.value;
        let notescard = document.getElementsByClassName('notescard')
        Array.from(notescard).forEach((element) => {
            let addedNotes = element.getElementsByTagName("p")[0].innerText;
            if (addedNotes.includes(searchTxt)) {
                element.style.display = 'block'
                ctr++;
            }
            else {
                element.style.display = 'none';
            }
        })
        if (ctr == 0) {
            noteCard.innerHTML = `<p>No items matched your search!</p>
        <hr>`
            impNoteCard.innerHTML = `<p>No items matched your search!</p>
        <hr>`
        }
    }
    else {
        notesAppear();
        impNotesAppear();
    }
});

// Important Notes Section
// This event manages the localstorage and stores the important notes in the localstorage in impNotes section
impBtn.addEventListener('click', (e) => {
    let notes = localStorage.getItem("impNotes");
    let notesTxt = document.getElementById('floatingTextarea2');
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(notesTxt.value)
    localStorage.setItem("impNotes", JSON.stringify(notesObj));
    notesTxt.value = "";
    impNotesAppear();
})


// This function appears the Important notes
function impNotesAppear() {
    let notes = localStorage.getItem("impNotes");
    let notesObj = [];
    if (notes == null || (notes == '[]')) {
        notesObj = [];
        impNoteCard.innerHTML = `<p>You don't have any important notes to show yet!😊</p>
        <hr>`
    }
    else {
        notesObj = JSON.parse(notes);
        let html = ""
        notesObj.forEach((element, index) => {
            html += `<div class="notescard my-2 mx-2 card" style="width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">Note-${index + 1}</h5>
                <p class="card-text">${element}</p>
                <a id="${index} "onclick="impNoteDelete(this.id)" class="btn btn-primary">Delete Note</a>
                <a  onclick="delImpAll()" class="btn btn-primary my-2">Delete All</a>
                
            </div>
        </div>`
        });
        impNoteCard.innerHTML = html;
    }
}

// This function deletes the important notes
function impNoteDelete(index) {
    let notes = localStorage.getItem("impNotes");
    let notesObj = [];
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("impNotes", JSON.stringify(notesObj));
    impNotesAppear();
}
// This function to delAll important notes
function delImpAll() {
    let delImpConfirm = confirm("Do you really want to delete all your important notes?")
    if (delImpConfirm == true) {
        localStorage.removeItem('impNotes')
        impNotesAppear();
    }
    else {
        impNotesAppear();
    }


}
// This function to delete all notes
function delAll() {
    let delConfirm = confirm("Do you really want to delete all your notes?")
    if (delConfirm == true) {
        localStorage.removeItem('notes');
        notesAppear();
    }
    else {
        notesAppear();
    }
}













