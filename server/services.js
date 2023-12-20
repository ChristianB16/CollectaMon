const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const pokeUrl = "mongodb://localhost:27017";

const services = function (app) {

  app.post('/write-record', function (req, res) {
    var pokeData = {
      name: req.body.name,
      type: req.body.type,
      ability: req.body.ability,
      attack: req.body.attack,
      set: req.body.set,
      setNumber: req.body.setNumber,
      price: req.body.price
    };

    MongoClient.connect(pokeUrl, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("pokemon");

        dbo.collection("pokemon").insertOne(pokeData, function (err) {
          if (err) {
            return res.status(201).send(JSON.stringify({ msg: err }));
          } else {
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
          }
        });
      }
    });
  });

  app.get('/get-records', function (req, res) {
    MongoClient.connect(pokeUrl, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("pokemon");

        dbo.collection("pokemon").find().toArray(function (err, data) {
          if (err) {
            return res.status(201).send(JSON.stringify({ msg: err }));
          } else {
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS", pokeData: data }));
          }
        });
      }
    });
  });

  app.delete('/delete-records', function (req, res) {
    var pokemonName = req.query.name;

    var search = { name: pokemonName };

    MongoClient.connect(pokeUrl, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("pokemon");

        dbo.collection("pokemon").deleteOne(search, function (err) {
          if (err) {
            return res.status(201).send(JSON.stringify({ msg: err }));
          } else {
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
          }
        });
      }
    });
  });

  app.put('/update-record', function (req, res) {
    var cardID = req.body._id;
    var name = req.body.name;
    var type = req.body.type;
    var ability = req.body.ability;
    var attack = req.body.attack;
    var set = req.body.set;
    var setNumber = req.body.setNumber;
    var price = req.body.price;

    var cardObjectId = new ObjectId(cardID);
    var search = { _id: cardObjectId };
    var updateData = {
      $set: {
        name: name,
        type: type,
        ability: ability,
        attack: attack,
        set: set,
        setNumber: setNumber,
        price: price
      }
    };

    MongoClient.connect(pokeUrl, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("pokemon");

        dbo.collection("pokemon").updateOne(search, updateData, function (err) {
          if (err) {
            return res.status(201).send(JSON.stringify({ msg: err }));
          } else {
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }));
          }
        });
      }
    });
  });

  app.get('/sort-by-type', function (req, res) {
    var type = req.query.type;
    var search = (type === "") ? {} : { type: type };

    MongoClient.connect(pokeUrl, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("pokemon");

        dbo.collection("pokemon").find(search).toArray(function (err, data) {
          if (err) {
            return res.status(201).send(JSON.stringify({ msg: err }));
          } else {
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS", sortedCards: data }));
          }
        });
      }
    });
  });

  app.get('/get-recordsByType', function (req, res) {
    var type = req.query.type;

    var search = (type === "") ? {} : { type: type };
    MongoClient.connect(pokeUrl, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        return res.status(201).send(JSON.stringify({ msg: err }));
      } else {
        var dbo = client.db("pokemon");

        dbo.collection("pokemon").find(search).toArray(function (err, data) {
          if (err) {
            return res.status(201).send(JSON.stringify({ msg: err }));
          } else {
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS", pokeData: data }));
          }
        });
      }
    });
  });

};

module.exports = services;
