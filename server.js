//library variables
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");

const app = express();

//local host PORT or deployed Application PORT
const PORT = process.env.PORT || 3001;

//middleware that parses json files and values
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//notes html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//index html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//api get request
app.get("/api/notes", (req, res) => {
  //communicates to the user that a GET request was made
  console.log("Execute GET notes request");

  //reads the db.json file
  let data = fs.readFileSync("./db/db.json", "utf-8");

  //turns the readable db.json file into a object
  res.json(JSON.parse(data));
});

//api post request
app.post("/api/notes", (req, res) => {
  //new object of the body and makes an id for the new note
  const newNote = {
    ...req.body,
    id: uuid(),
  };

  //communicates to the user of the POST request
  console.log("Executed POST request for new notes");

  //reads the db.json file
  let data = fs.readFileSync("./db/db.json", "utf-8");

  //parses the data
  const dataJSON = JSON.parse(data);

  //pushes the data into the array of objects in the db.json file
  dataJSON.push(newNote);

  //writes the dataJSON into the db.json file
  fs.writeFile("./db/db.json", JSON.stringify(dataJSON), (err) => {
    //logs error when it occurs to the user
    if (err) {
      console.error(err);
      return;
    }
  });

  //logs to the user of a successful note added
  console.log("Success,note added");

  //data is POSTed to the ui
  res.json(data);
});

//TODO:api DELETE request
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  let data = fs.readFileSync("./db/db.json", "utf-8");

  parsedNotes = [].concat(JSON.parse(data));

  const parsedData = parsedNotes.filter((data) => data.id !== id);

  fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  res.json(parsedData);

  console.log(`Note ${req.method}, Success`);
});

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
