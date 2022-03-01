const container = document.getElementById("container");
const newButton = document.getElementById("new");
const warning = document.getElementById("warning");
const Library = [];

let editIndex = -1;

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  Library.push(newBook);

  const card = container.insertRow();
  card.className = "card";
  for (const key in newBook) {
    const cell = card.insertCell();
    cell.textContent = newBook[key];
  }

  let edit = card.insertCell();
  let button = document.createElement("button");
  button.textContent = "edit";
  edit.appendChild(button);

  editIndex++;
  button.className = "edit-" + editIndex;
  button.addEventListener("click", () => {
    console.log(button.className.slice(5));
    //darken the library with that index

    //fill the form and grab focus there

    //rewrite the library with the data
  });
}

newButton.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  const status = document.getElementById("status").value;

  if (title.length == 0) {
    warning.style.display = "block";
    return;
  }
  warning.style.display = "none";

  if (author.length == 0) author = "-";
  if (pages.length == 0) pages = "-";

  addBookToLibrary(title, author, pages, status);
  document.querySelector("form").reset();
});

// sample book
addBookToLibrary("Harry Potter", "JKR", "200", "Completed");
addBookToLibrary("Hobbits", "Madeline", "300", "Reading");
