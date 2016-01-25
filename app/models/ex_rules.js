const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExRules = new Schema({
  title: String,
  name: String,
  season: Number,
  episode: Number
});

mongoose.model('ExRules', ExRules);