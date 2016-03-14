const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Job = new Schema({
  user_id: String,
  weekend: Boolean,
  weekdays: Boolean,
  time: String
});

mongoose.model('Job', Job);
