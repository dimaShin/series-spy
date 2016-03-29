const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
  email: String,
  password: String,
  shows: Array,
  jobs: Array,
  providerData: Object
});

mongoose.model('Users', Users);