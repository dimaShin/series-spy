const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Schedule = new Schema({
  user_id: String,
  time: String
});

mongoose.model('Schedule', Schedule);
