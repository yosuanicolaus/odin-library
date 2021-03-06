const container = document.getElementById("container");
const newButton = document.getElementById("new");
const warning = document.getElementById("warning");

const form = document.querySelector("form");
const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formStatus = document.getElementById("status");

const Library = [];

let editFocus = false;
let currentIndex;

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function resetDisplay(length = 0) {
  for (let i = 0; i < Library.length + length; i++) {
    const card = document.getElementsByClassName("card");
    if (card[0] == undefined) break;
    card[0].remove();
  }
}

function displayLibrary(length) {
  resetDisplay(length);

  for (let i = 0; i < Library.length; i++) {
    const card = container.insertRow();
    card.className = "card";
    for (const key in Library[i]) {
      const cell = card.insertCell();
      cell.textContent = Library[i][key];
    }
    card.insertCell();
    addEdit(card, i);
    addDelete(card, i);
  }
}

function addEdit(card, index) {
  const button = document.createElement("button");
  button.textContent = "edit";
  button.className = "edit-" + index;
  card.lastChild.appendChild(button);

  button.addEventListener("click", () => {
    if (editFocus) {
      editFocus = false;
      styleFocus(editFocus, currentIndex);
      form.reset();
      return;
    }

    editFocus = true;
    currentIndex = index;
    styleFocus(editFocus, index);

    formTitle.value = Library[index].title;
    formAuthor.value = Library[index].author;
    formPages.value = Library[index].pages;
    formStatus.value = Library[index].status;
  });
}

function addDelete(card, index) {
  const button = document.createElement("button");
  button.textContent = "delete";
  card.lastChild.appendChild(button);

  button.addEventListener("click", () => {
    Library.splice(index, 1);
    displayLibrary(1);
  });
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

function addBookToLibrary(
  title,
  author,
  pages,
  status,
  index = Library.length,
  remove = 0
) {
  const newBook = new Book(title, author, pages, status);
  Library.splice(index, remove, newBook);
  displayLibrary();
}

function submitBook() {
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
    styleFocus(editFocus, currentIndex);
    addBookToLibrary(title, author, pages, status, currentIndex, 1);
  } else {
    addBookToLibrary(title, author, pages, status);
  }

  form.reset();
}

newButton.addEventListener("click", submitBook);

// sample book
addBookToLibrary("Harry Potter", "JKR", "200", "Completed");
addBookToLibrary("Hobbits", "Madeline", "300", "Reading");
addBookToLibrary("Adeleine", "John", "12", "Plan To Read");
addBookToLibrary("What a Wonderful Day", "Plure", "110", "Reading");
addBookToLibrary("You (not)", "Hera", "24", "On Hold");
