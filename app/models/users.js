"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const async = require('asyncawait/async');
// const await = require('asyncawait/await');
const Users = new Schema({
  email: String,
  password: String,
  shows: Array,
  jobs: Array,
  providerData: Object,
  providerUserId: String,
  providerType: String,
  token: String
});

Users.statics.findByToken = async function (token) {
  return await this.model('Users').findOne({ token: token }).exec();
};

Users.statics.findOrCreate = async function (query) {
  let Model = this.model('Users');
  let user = await Model.findOne(query).exec();
  return user || Model({});
};

mongoose.model('Users', Users);