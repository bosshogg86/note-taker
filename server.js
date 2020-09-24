const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// HTML Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Api Routes
app.get("/api/notes", (req, res) => {
  res.send(JSON.parse(fs.readFileSync("db/db.json")));
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  const notes = JSON.parse(fs.readFileSync("db/db.json"));
  note.id = uuidv4();
  notes.push(note);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.sendStatus(200);
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  let notes = JSON.parse(fs.readFileSync("db/db.json"));
  notes = notes.filter(note => note.id !== id);
  fs.writeFileSync("db/db.json", JSON.stringify(notes));
  res.sendStatus(200);
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
