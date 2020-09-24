const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("body-parser");
const { v4: uuidv4 } = require("uuid");
// import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// HTML Routes
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// Api Routes
app.get("/api/notes", function (req, res) {
  let rawData = fs.readFileSync("db/db.json");
  res.send(JSON.parse(rawData));
});

app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  let rawData = fs.readFileSync("db/db.json");
  let jsonData = JSON.parse(rawData);
  newNote.id = uuidv4();
  jsonData.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(jsonData));
  return res.send(jsonData);
});

// app.delete("/api/notes/:id", function (req, res) {
//   let rawData = fs.readFileSync("db.json");
//   let jsonData = JSON.parse(rawData);
// });

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
