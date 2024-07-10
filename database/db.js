const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/Pokemon`);

const pokemonSchema = new mongoose.Schema({
  Number: Number,
  Name: String,
  HP: Number,
  Attack: Number,
  Defense: Number,
  Sp_Attack: Number,
  Sp_Defense: Number,
  Speed: Number,
  Photo: String
});

const pokemon = new mongoose.model('Pokemon', pokemonSchema);

module.exports = pokemon;