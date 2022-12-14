const fs = require("fs");
const uuid = require("../helpers/uuid");
const express = require("express");
const router = express.Router();

//api get request
router.get("/", (req, res) => {
  //communicates to the user that a GET request was made
  console.log("Execute GET notes request");

  //reads the db.json file
  let data = fs.readFileSync("./db/db.json", "utf-8");

  //turns the readable db.json file into a object
  res.json(JSON.parse(data));
});

//api post request
router.post("/", (req, res) => {
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

//api DELETE request
router.delete("/:id", (req, res) => {
  //declares the id of the request
  const id = req.params.id;

  //declares the data in the db.json file at readable code
  let data = fs.readFileSync("./db/db.json", "utf-8");

  //declares the data variable and parses the data into objects
  parsedNotes = [].concat(JSON.parse(data));

  //filters the parsedData by filtering out the selected id
  const parsedData = parsedNotes.filter((data) => data.id !== id);

  //writes back to the db.json file with new parsedDate
  fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  //shows data back to the user
  res.json(parsedData);

  console.log(`Note ${req.method}, Success`);
});

module.exports = router;
