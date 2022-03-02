const container = document.getElementById("container");
const newButton = document.getElementById("new");
const warning = document.getElementById("warning");

const form = document.querySelector("form");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formStatus = document.getElementById("status");

const Library = [];

let editIndex = -1;
let editFocus = false;
let currentIndex;
let resetIndex = 0;
let tr = document.querySelector("tr");

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function displayLibrary() {
  //reset display to 0
  for (let i = 0; i < resetIndex; i++) {
    tr = tr.nextElementSibling;
    for (let i = 0; i < 5; i++) {
      tr.deleteCell(0);
    }
  }
  resetIndex++;

  //then fill the display with new Library entry
  for (let i = 0; i < Library.length; i++) {
    const card = container.insertRow();
    card.className = "card";
    for (const key in Library[i]) {
      const cell = card.insertCell();
      cell.textContent = Library[i][key];
    }
    card.insertCell();
    addEdit(card);
  }
}

function addEdit(rowCard) {
  const card = rowCard;
  const button = document.createElement("button");
  editIndex++;
  button.textContent = "edit";
  button.className = "edit-" + editIndex;
  card.lastChild.appendChild(button);

  button.addEventListener("click", () => {
    console.log("helloooo");
    if (editFocus) {
      editFocus = false;
      styleFocus(editFocus, currentIndex);
      form.reset();
      return;
    }

    editFocus = true;
    currentIndex = button.className.slice(5);
    styleFocus(editFocus, currentIndex);

    formTitle.value = Library[currentIndex].title;
    formAuthor.value = Library[currentIndex].author;
    formPages.value = Library[currentIndex].pages;
    formStatus.value = Library[currentIndex].status;
  });
}

function editLibrary(button) {
  if (editFocus) {
    editFocus = false;
    styleFocus(editFocus, currentIndex);
    currentIndex = undefined;
    form.reset();
    return;
  }

  editFocus = true;
  currentIndex = button.className.slice(5);
  styleFocus(editFocus, currentIndex);

  formTitle.value = Library[currentIndex].title;
  formAuthor.value = Library[currentIndex].author;
  formPages.value = Library[currentIndex].pages;
  formStatus.value = Library[currentIndex].status;

  //rewrite the library with the data
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  Library.push(newBook);

  displayLibrary();
}

function styleFocus(isInFocus, index) {
  const card = document.getElementsByClassName("card")[index];
  if (isInFocus) {
    card.style.filter = "brightness(80%)";
    card.style.border = "solid blue";
  } else {
    card.style.filter = "brightness(100%)";
    card.style.border = "none";
  }
}

function submitBook(index) {
  const title = formTitle.value;
  let author = formAuthor.value;
  let pages = formPages.value;
  const status = formStatus.value;

  if (title.length == 0) {
    warning.style.display = "block";
    return;
  }
  warning.style.display = "none";

  if (author.length == 0) author = "-";
  if (pages.length == 0) pages = "-";

  if (editFocus) {
    editFocus = false;
    console.log("delete library with index " + currentIndex);
    styleFocus(editFocus, currentIndex);
    container.deleteRow(currentIndex);
  }

  addBookToLibrary(title, author, pages, status);
  form.reset();
}

newButton.addEventListener("click", submitBook);

// sample book
addBookToLibrary("Harry Potter", "JKR", "200", "Completed");
addBookToLibrary("Hobbits", "Madeline", "300", "Reading");
addBookToLibrary("Adeleine", "John", "12", "Plan To Read");
addBookToLibrary("What a Wonderful Day", "Plure", "110", "Reading");
addBookToLibrary("You (not)", "Hera", "24", "On Hold");
