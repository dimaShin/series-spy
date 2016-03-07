const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
  email: String,
  password: String
});

mongoose.model('Users', Users);