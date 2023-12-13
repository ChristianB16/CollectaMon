// app.js

const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const pokeUrl = "http://localhost:5000";

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/client", express.static(path.resolve(__dirname + "/../client/")));

// Page listener (router file)
const router = require("./router.js");
router(app);

// Service listener (services.js)
const services = require("./services.js");
services(app);

// Start web server
const port = 5000;
app.listen(port, function (err) {
  if (err) throw err;

  console.log(`Server listening on port: ${port}`);
  console.log(`Server URL: ${pokeUrl}`);
});
