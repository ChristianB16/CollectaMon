const fs = require("fs");
const path = require("path");
const DATABASE_FILE = path.join(__dirname, "files", "data.txt");

var services = function (app) {
  app.post("/write-record", function (req, res) {
    var pokeData = {
      name: req.body.name,
      type: req.body.type,
      ability: req.body.ability,
      attack: req.body.attack,
      set: req.body.set,
      setNumber: req.body.setNumber,
      price: req.body.price
    };

    var jsonObject = [];

    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          jsonObject = JSON.parse(data);
          jsonObject.push(pokeData);

          fs.writeFile(DATABASE_FILE, JSON.stringify(jsonObject), function (err) {
            if (err) {
              res.send(JSON.stringify({ msg: err }));
            } else {
              res.send(JSON.stringify({ msg: "SUCCESS" }));
            }
          });
        }
      });
    } else {
      jsonObject.push(pokeData);
      fs.writeFile(DATABASE_FILE, JSON.stringify(jsonObject), function (err) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          res.send(JSON.stringify({ msg: "SUCCESS" }));
        }
      });
    }
  });

  app.get("/get-records", function (req, res) {
    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          pokeData = JSON.parse(data);
          res.send(JSON.stringify({ msg: "SUCCESS", pokeData: pokeData }));
        }
      });
    } else {
      var data = [];
      res.send(JSON.stringify({ msg: "SUCCESS", pokeData: data }));
    }
  });

  //delete-record
  app.delete("/delete-record/:name", function (req, res) {
    var recordName = req.params.name;

    if (fs.existsSync(DATABASE_FILE)) {
      fs.readFile(DATABASE_FILE, "utf-8", function (err, data) {
        if (err) {
          res.send(JSON.stringify({ msg: err }));
        } else {
          var jsonObject = JSON.parse(data);

          // index of the record to delete
          var indexToDelete = jsonObject.findIndex(record => record.name === recordName);

          if (indexToDelete !== -1) {
            // remove record from the array
            jsonObject.splice(indexToDelete, 1);

            // write data back to the file
            fs.writeFile(DATABASE_FILE, JSON.stringify(jsonObject), function (err) {
              if (err) {
                res.send(JSON.stringify({ msg: err }));
              } else {
                res.send(JSON.stringify({ msg: "SUCCESS" }));
              }
            });
          } else {
            res.send(JSON.stringify({ msg: "record not found" }));
          }
        }
      });
    } else {
      res.send(JSON.stringify({ msg: "file not found" }));
    }
  });
};

module.exports = services;
