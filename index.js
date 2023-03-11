const express = require("express");
const app = express();

app.use(express.json());

let books = [
  {
    "id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "publication_year": 1960,
    "ISBN": "978-0446310789",
    "price": 10.99,
    "num_pages": 281,
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "publication_year": 1949,
    "ISBN": "978-0451524935",
    "price": 9.99,
    "num_pages": 328,
  },
  {
    "id": 3,
    "title": "Pride and Prejudice",
    "author": "Jane Austen",
    "publication_year": 1813,
    "ISBN": "978-0141439518",
    "price": 8.99,
    "num_pages": 432,
  },
  {
    "id": 4,
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "publication_year": 1979,
    "ISBN": "978-0345391803",
    "price": 7.99,
    "num_pages": 208,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/books", (req, res) => {
  res.json(books);
});

const generateId = () => {
  const maxId = books.length > 0 ? Math.max(...books.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/books", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const book = {
    content: body.content,
    read: body.read || false,
    id: generateId(),
  };

  books = books.concat(book);
  res.json(book);
});

app.put("/api/books/:id", (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    return res.status(404).end();
  } else {
    books[index] = updatedBook;
    res.json(updatedBook);
  }
});

app.get("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/books/:id", (req, res) => {
  const id = Number(req.params.id);
  books = books.filter((book) => book.id !== id);
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
