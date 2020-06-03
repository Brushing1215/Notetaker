let notes = require("../db/db.json");
const fs = require("fs");
module.exports = function (app) {
  app.get("/api/tables", function (req, res) {
    res.json(tableData);
  });

  app.get("/api/notes", (req, res) => {
    res.json(notes);
  });

  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    if (notes.length) {
      newNote.id = notes[notes.length - 1].id + 1;
    } else {
      newNote.id = 1;
    }

    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
  app.delete("/api/notes/:id", (req, res) => {
    const deleteID = parseInt(req.params.id);
    let location;
    for (let i = 0; i < notes.length; i++) {
      if (notes.id === deleteID) {
        location = i;
      }
    }
    notes.splice(location, 1);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
};
