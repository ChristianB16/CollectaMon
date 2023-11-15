const path = require("path");

//page listeners
var router = function (app) {
  app.get("/", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/index.html"));
  });

  app.get("/home", function (req, res) {
    res.status(200).sendFile(path.join(__dirname + "/../client/index.html"));
  });

  app.get("/enterData", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/enterData.html"));
  });

  app.get("/ViewData", function (req, res) {
    res
      .status(200)
      .sendFile(path.join(__dirname + "/../client/viewData.html"));
  });
};

module.exports = router;
