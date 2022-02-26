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

  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute('style', 'white-space: pre;');
  for (const key in newBook) {
    card.textContent += newBook[key] + "\r\n";
  }

  container.appendChild(card);
}

addBookToLibrary("Harry Potter", "JKR", "200", "45");
addBookToLibrary("Hobbits", "Madeline", "300", "95");
