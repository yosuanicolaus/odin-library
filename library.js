const container = document.getElementById("container");
const Library = [];

function Book(title, author, pages, progress) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.progress = progress;
}

function addBookToLibrary(title, author, pages, progress) {
  const newBook = new Book(title, author, pages, progress);
  Library.push(newBook);

  const card = container.insertRow();
  card.className = "card";
  for (const key in newBook) {
    const cell = card.insertCell();
    cell.textContent = newBook[key];
  }
}

addBookToLibrary("Harry Potter", "JKR", "200", "Completed");
addBookToLibrary("Hobbits", "Madeline", "300", "Reading");

const newButton = document.getElementById("new");
newButton.addEventListener("click", () => {
  //TODO: Implement Form Popup here
});
