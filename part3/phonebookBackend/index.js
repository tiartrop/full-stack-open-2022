const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const logger = morgan((tokens, req, res) => {
  let postContent = "";
  if (req.method === "POST") {
    postContent = JSON.stringify(req.body);
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    postContent,
  ].join(" ");
});

app.use(express.json());

app.use(logger);

app.use(cors());

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

const randomId = () => {
  const id = Math.floor(Math.random() * 999999999999999);
  return id;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  }

  for (let person of persons) {
    if (body.name === person.name) {
      return res.status(400).json({
        error: "name must be unique",
      });
    }
  }

  const note = {
    id: randomId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(note);

  res.json(note);
});

app.get("/info", (req, res) => {
  res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
  `);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
