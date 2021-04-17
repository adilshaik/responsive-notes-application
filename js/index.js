console.log("This is my notes app. Index.js");
showNotes();

//To add the title and note
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    let addTitle = document.getElementById('addTitle');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    addTxt.value = '';
    addTitle.value = '';
    localStorage.setItem('notes', JSON.stringify(notesObj));
    console.log(notesObj);
    showNotes();
});


//To show the note
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id='${index}' onclick = 'deleteNote(this.id)' class="btn btn-primary">Delete Note</button>
                    </div>
                </div>`;
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `There are no notes. Please use 'Add note' above.`;
    }
};


//For deleting a note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

//For searching a note
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let searchVal = search.value;
    // console.log(searchVal);
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(searchVal)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })
});