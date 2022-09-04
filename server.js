//library variables
const express = require("express");
const path = require("path");
const router = require("./routes/index.js");

const app = express();

//local host PORT or deployed Application PORT
const PORT = process.env.PORT || 3001;

//middleware that parses json files and values
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);
app.use(express.static("public"));

//notes html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//index html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});
