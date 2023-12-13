const MongoClient = require("mongodb").MongoClient;
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
            return res.status(200).send(JSON.stringify({ msg: "SUCCESS", pokemon: data }));
          }
        });
      }
    });
  });

  app.delete('/delete-records', function (req, res) {
    var pokemonName = req.body.name;

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
};

module.exports = services;
