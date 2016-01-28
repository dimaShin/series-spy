const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExRules = new Schema({
  title: String,
  ru: String,
  en: String,
  season: Number,
  episode: Number
});

mongoose.model('ExRules', ExRules);
//
//const seeds = require('./ex_rules_seeds');
//seeds.map(seed => {
//  "use strict";
//
//  mongoose.model('ExRules').create(seed);
//});